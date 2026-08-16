import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import chatSettingsDB, { chatSettingsEmitter } from '../service/ChatSettingsDB';
import CubeIcon from '@heroicons/react/24/outline/CubeIcon';
const ChatShortcuts = () => {
    const [chatSettings, setChatSettings] = useState([]);
    const loadChatSettings = async () => {
        const filteredAndSortedChatSettings = await chatSettingsDB.chatSettings
            .where('showInSidebar').equals(1)
            .sortBy('name');
        setChatSettings(filteredAndSortedChatSettings);
    };
    const onDatabaseUpdate = (data) => {
        loadChatSettings();
    };
    useEffect(() => {
        chatSettingsEmitter.on('chatSettingsChanged', onDatabaseUpdate);
        loadChatSettings();
        return () => {
            chatSettingsEmitter.off('chatSettingsChanged', onDatabaseUpdate);
        };
    }, []);
    return (_jsx("div", { children: chatSettings.map((setting) => (_jsxs(Link, { to: `/g/${setting.id}`, className: "flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all hover:bg-gray-100 dark:hover:bg-gray-800", children: [_jsx("div", { className: "bg-white  overflow-hidden rounded-full", children: setting.icon?.data ? (_jsx("img", { src: setting.icon.data, alt: "", className: "bg-gray-100 dark:bg-gray-400", style: { width: 24, height: 24 } })) : (_jsx(CubeIcon, { className: "text-gray-900", style: { width: 24, height: 24 } })) }), _jsx("span", { className: "flex-1 overflow-hidden whitespace-nowrap text-ellipsis max-h-5 break-all relative dark:text-gray-100 text-gray-800", children: setting.name })] }, setting.id))) }));
};
export default ChatShortcuts;
