import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useRef, useState } from 'react';
import ChatBlock from "./ChatBlock";
import ModelSelect from "./ModelSelect";
import { ChatService } from "../service/ChatService";
import { useTranslation } from 'react-i18next';
import Tooltip from "./Tooltip";
import { OPENAI_DEFAULT_SYSTEM_PROMPT } from "../config";
import { DEFAULT_INSTRUCTIONS } from "../constants/appConstants";
import { UserContext } from '../UserContext';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { NotificationService } from '../service/NotificationService';
const Chat = ({ chatBlocks, onChatScroll, allowAutoScroll, model, onModelChange, conversation, loading }) => {
    const { userSettings, setUserSettings } = useContext(UserContext);
    const { t } = useTranslation();
    const [models, setModels] = useState([]);
    const chatDivRef = useRef(null);
    useEffect(() => {
        ChatService.getModels()
            .then(models => {
            setModels(models);
        })
            .catch(err => {
            NotificationService.handleUnexpectedError(err, 'Failed to get list of models');
        });
    }, []);
    useEffect(() => {
        if (chatDivRef.current && allowAutoScroll) {
            chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
        }
    }, [chatBlocks]);
    useEffect(() => {
        const chatContainer = chatDivRef.current;
        if (chatContainer) {
            const isAtBottom = chatContainer.scrollHeight - chatContainer.scrollTop ===
                chatContainer.clientHeight;
            // Initially hide the button if chat is at the bottom
            onChatScroll(isAtBottom);
        }
    }, []);
    const findModelById = (id) => {
        return models.find(model => model.id === id);
    };
    const formatContextWindow = (context_window) => {
        if (context_window) {
            return Math.round(context_window / 1000) + 'k';
        }
        return '?k';
    };
    const handleScroll = () => {
        if (chatDivRef.current) {
            const scrollThreshold = 20;
            const isAtBottom = chatDivRef.current.scrollHeight -
                chatDivRef.current.scrollTop <=
                chatDivRef.current.clientHeight + scrollThreshold;
            // Notify parent component about the auto-scroll status
            onChatScroll(isAtBottom);
            // Disable auto-scroll if the user scrolls up
            if (!isAtBottom) {
                onChatScroll(false);
            }
        }
    };
    return (_jsx("div", { id: 'chat-container', ref: chatDivRef, className: "relative chat-container flex-1 overflow-auto", onScroll: handleScroll, children: _jsxs("div", { id: 'chat-container1', className: "relative chat-container1 flex flex-col items-center text-sm dark:bg-gray-900", children: [_jsx("div", { className: `flex w-full items-center justify-center gap-1 p-3 text-gray-500 dark:border-gray-900/50 dark:bg-gray-900 dark:text-gray-300 ${!(conversation === null) ? 'border-b border-black/10' : ''}`, children: _jsxs("div", { className: "flex items-center flex-row gap-1", children: [!conversation ? '' : (_jsx(Tooltip, { title: conversation.systemPrompt ?? userSettings.instructions ?? OPENAI_DEFAULT_SYSTEM_PROMPT ?? DEFAULT_INSTRUCTIONS, side: "bottom", sideOffset: 10, children: _jsx("span", { style: { marginLeft: '10px', fontSize: '0.85rem', color: '#6b7280' }, children: _jsx(InformationCircleIcon, { width: 20, height: 20, stroke: 'currentColor' }) }) })), _jsxs("span", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [t('model'), conversation && (_jsxs("span", { children: [_jsx("span", { style: { marginLeft: '0.25em' }, children: conversation.model }), _jsx(Tooltip, { title: t('context-window'), side: "bottom", sideOffset: 10, children: _jsx("span", { style: { marginLeft: '10px', fontSize: '0.85rem', color: '#6b7280' }, children: formatContextWindow(findModelById(conversation.model)?.context_window) }) }), _jsx(Tooltip, { title: t('knowledge-cutoff'), side: "bottom", sideOffset: 10, children: _jsx("span", { style: { marginLeft: '10px', fontSize: '0.85rem', color: '#6b7280' }, children: findModelById(conversation.model)?.knowledge_cutoff }) })] }))] }), !conversation && (_jsx("span", { className: "grow", style: { width: '50ch' }, children: _jsx(ModelSelect, { value: model, onModelSelect: onModelChange, models: models }) }))] }) }), chatBlocks.map((block, index) => (_jsx(ChatBlock, { block: block, loading: index === chatBlocks.length - 1 && loading, isLastBlock: index === chatBlocks.length - 1 }, `chat-block-${block.id}`))), _jsx("div", { className: "w-full h-24 shrink-0" })] }) }));
};
export default Chat;
