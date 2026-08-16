import { OPENAI_API_KEY } from "../config";
import { CustomError } from "./CustomError";
import { MODELS_ENDPOINT, TTS_ENDPOINT } from "../constants/apiEndpoints";
export class SpeechService {
    static models = null;
    static async textToSpeech(text, settings) {
        const endpoint = `${TTS_ENDPOINT}?key=${OPENAI_API_KEY}`;
        const headers = {
            "Content-Type": "application/json",
        };
        if (text.length > 4096) {
            throw new Error("Input text exceeds the maximum length of 4096 characters.");
        }
        if (settings.speed < 0.25 || settings.speed > 4.0) {
            throw new Error("Speed must be between 0.25 and 4.0.");
        }
        const requestBody = {
            model: settings.id,
            voice: settings.voice,
            input: text,
            speed: settings.speed,
            response_format: "mp3",
        };
        const response = await fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            const err = await response.json();
            throw new CustomError(err.error.message, err);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }
    static getModels = () => {
        return SpeechService.fetchModels();
    };
    static async fetchModels() {
        if (this.models !== null) {
            return this.models;
        }
        try {
            const endpoint = `${MODELS_ENDPOINT}?key=${OPENAI_API_KEY}`;
            const response = await fetch(endpoint);
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error.message);
            }
            const data = await response.json();
            const models = data.data.filter((model) => model.id.includes("tts"));
            this.models = Promise.resolve(models);
            return models;
        }
        catch (err) {
            throw new Error(err.message || err);
        }
    }
}
