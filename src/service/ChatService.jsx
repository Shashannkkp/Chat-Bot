import { modelDetails } from "../models/model";
import { GEMINI_API_KEY } from "../config";
import { CustomError } from "./CustomError";
import { CHAT_COMPLETIONS_BASE, MODELS_ENDPOINT } from "../constants/apiEndpoints";
import { CHAT_STREAM_DEBOUNCE_TIME, DEFAULT_MODEL } from "../constants/appConstants";
import { NotificationService } from '../service/NotificationService';
export class ChatService {
    static models = null;
    static abortController = null;
    static async mapChatMessagesToCompletionMessages(modelId, messages) {
        const model = await this.getModelById(modelId); // Retrieve the model details
        if (!model) {
            throw new Error(`Model with ID '${modelId}' not found`);
        }
        return messages.map((message) => {
            const contentParts = [{
                    type: 'text',
                    text: message.content
                }];
            if (model.image_support && message.fileDataRef) {
                message.fileDataRef.forEach((fileRef) => {
                    const fileUrl = fileRef.fileData.data;
                    if (fileUrl) {
                        const fileType = (fileRef.fileData.type.startsWith('image')) ? 'image_url' : fileRef.fileData.type;
                        contentParts.push({
                            type: fileType,
                            image_url: {
                                url: fileUrl
                            }
                        });
                    }
                });
            }
            return {
                role: message.role,
                content: contentParts,
            };
        });
    }
    static async sendMessage(messages, modelId) {
        const endpoint = `${CHAT_COMPLETIONS_BASE}/${modelId}:generate?key=${GEMINI_API_KEY}`;
        const headers = {
            "Content-Type": "application/json"
        };
        const inputText = messages.map((message) => `${message.role}: ${message.content}`).join("\n");
        const requestBody = {
            model: modelId,
            input: inputText,
        };
        const response = await fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (!response.ok) {
            const errMessage = data.error?.message || data.error || 'Unknown API error';
            throw new CustomError(errMessage, data);
        }
        return data.output_text ?? data.candidates?.[0]?.content ?? data.output?.[0]?.content ?? data.output?.content ?? '';
    }
    static lastCallbackTime = 0;
    static callDeferred = null;
    static accumulatedContent = ""; // To accumulate content between debounced calls
    static debounceCallback(callback, delay = CHAT_STREAM_DEBOUNCE_TIME) {
        return (content) => {
            this.accumulatedContent += content; // Accumulate content on each call
            const now = Date.now();
            const timeSinceLastCall = now - this.lastCallbackTime;
            if (this.callDeferred !== null) {
                clearTimeout(this.callDeferred);
            }
            this.callDeferred = window.setTimeout(() => {
                callback(this.accumulatedContent, []); // Pass the accumulated content to the original callback
                this.lastCallbackTime = Date.now();
                this.accumulatedContent = ""; // Reset the accumulated content after the callback is called
            }, delay - timeSinceLastCall < 0 ? 0 : delay - timeSinceLastCall); // Ensure non-negative delay
            this.lastCallbackTime = timeSinceLastCall < delay ? this.lastCallbackTime : now; // Update last callback time if not within delay
        };
    }
    static async sendMessageStreamed(chatSettings, messages, callback) {
        const modelId = chatSettings?.model ?? DEFAULT_MODEL;
        const responseText = await ChatService.sendMessage(messages, modelId);
        callback(responseText, []);
    }
    static cancelStream = () => {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
    };
    static getModels = () => {
        return ChatService.fetchModels();
    };
    static async getModelById(modelId) {
        try {
            const models = await ChatService.getModels();
            const foundModel = models.find(model => model.id === modelId);
            if (!foundModel) {
                throw new CustomError(`Model with ID '${modelId}' not found.`, {
                    code: 'MODEL_NOT_FOUND',
                    status: 404
                });
            }
            return foundModel;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Failed to get models:', error.message);
                throw new CustomError('Error retrieving models.', {
                    code: 'FETCH_MODELS_FAILED',
                    status: error.status || 500
                });
            }
            else {
                console.error('Unexpected error type:', error);
                throw new CustomError('Unknown error occurred.', {
                    code: 'UNKNOWN_ERROR',
                    status: 500
                });
            }
        }
    }
    static fetchModels = () => {
        if (this.models !== null) {
            return Promise.resolve(this.models);
        }
        const endpoint = `${MODELS_ENDPOINT}?key=${GEMINI_API_KEY}`;
        this.models = fetch(endpoint)
            .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error?.message || err.error || 'Failed to fetch models');
                });
            }
            return response.json();
        })
            .catch(err => {
            throw new Error(err.message || err);
        })
            .then(data => {
            const modelList = Array.isArray(data.data) ? data.data : [];
            const models = modelList.map(model => {
                const id = model.id ?? model.name ?? model.model ?? '';
                const details = modelDetails[id] || {
                    contextWindowSize: 0,
                    knowledgeCutoffDate: '',
                    imageSupport: false,
                    preferred: false,
                    deprecated: false,
                };
                return {
                    ...model,
                    id,
                    context_window: details.contextWindowSize,
                    knowledge_cutoff: details.knowledgeCutoffDate,
                    image_support: details.imageSupport,
                    preferred: details.preferred,
                    deprecated: details.deprecated,
                };
            });
            return models.sort((a, b) => b.id.localeCompare(a.id));
        });
        return this.models;
    };
}
