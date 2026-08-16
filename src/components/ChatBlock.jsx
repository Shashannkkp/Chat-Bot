import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { SparklesIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import MarkdownBlock from './MarkdownBlock';
import CopyButton, { CopyButtonMode } from "./CopyButton";
import { MessageType } from "../models/ChatCompletion";
import UserContentBlock from "./UserContentBlock";
import { UserContext } from "../UserContext";
const ChatBlock = ({ block, loading, isLastBlock }) => {
    const { userSettings } = useContext(UserContext);
    const fileDataRef = block.fileDataRef ?? [];
    const isError = block.messageType === MessageType.Error;
    const errorStyles = isError
        ? {
            backgroundColor: userSettings.theme === 'dark' ? 'rgb(50, 36, 36)' : '#F5E6E6',
            borderColor: 'red',
            borderWidth: '1px',
            borderRadius: '8px',
            padding: '10px'
        }
        : undefined;
    let roleIcon = null;
    if (block.role === 'user') {
        roleIcon = _jsx(UserCircleIcon, { width: 24, height: 24 });
    }
    else if (block.role === 'assistant') {
        roleIcon = _jsx(SparklesIcon, {}, `open-ai-logo-${block.id}`);
    }
    return (_jsx("div", { className: `group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 ${block.role === 'assistant' ? 'bg-custom-gray dark:bg-gray-900' : 'bg-white dark:bg-gray-850'}`, children: _jsxs("div", { className: "text-base md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w7xl p-2 flex lg:px-0 m-auto flex-col", children: [_jsxs("div", { className: "w-full flex", children: [_jsx("div", { className: "w-[30px] flex flex-col relative items-end mr-4", children: _jsx("div", { className: "relative flex h-[30px] w-[30px] p-0 rounded-xs items-center justify-center", children: roleIcon }) }), _jsx("div", { className: "relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-full", children: _jsx("div", { id: `message-block-${block.id}`, className: "flex grow flex-col gap-3", style: errorStyles, children: _jsx("div", { className: "min-h-[20px] flex flex-col items-start gap-4", children: _jsx("div", { className: "markdown prose w-full break-words dark:prose-invert light", children: block.role === 'user' ? (_jsx(UserContentBlock, { text: block.content, fileDataRef: fileDataRef })) : (_jsx(MarkdownBlock, { markdown: block.content, role: block.role, loading: loading })) }) }) }) })] }), !(isLastBlock && loading) && (_jsxs("div", { id: `action-block-${block.id}`, className: "flex justify-start items-center ml-10", children: [block.role === 'assistant' && (_jsx(TextToSpeechButton, { content: block.content })), _jsx("div", { className: "copy-button", children: _jsx(CopyButton, { mode: CopyButtonMode.Compact, text: block.content }) })] }))] }) }, `chat-block-${block.id}`));
};
export default ChatBlock;
