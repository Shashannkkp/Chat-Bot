import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import ChatSettingsList from './ChatSettingsList';
import chatSettingsDB, { chatSettingsEmitter } from '../service/ChatSettingsDB';
import { useTranslation } from 'react-i18next';
const ExploreCustomChats = () => {
    const [exampleChats, setExampleChats] = useState([]);
    const [myChats, setMyChats] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const fetchChatSettings = async (event) => {
        if (event) {
            const gid = event.gid;
            if (event.action === 'edit') {
                const updatedChat = await chatSettingsDB.chatSettings.get(gid);
                if (updatedChat) {
                    if (updatedChat.author === 'system') {
                        setExampleChats(prevChats => prevChats.map(chat => chat.id === gid ? updatedChat : chat));
                    }
                    else if (updatedChat.author === 'user') {
                        setMyChats(prevChats => prevChats.map(chat => chat.id === gid ? updatedChat : chat));
                    }
                }
            }
            else if (event.action === 'delete') {
                setExampleChats(prevChats => prevChats.filter(chat => chat.id !== gid));
                setMyChats(prevChats => prevChats.filter(chat => chat.id !== gid));
            }
        }
        else {
            const allChatSettings = await chatSettingsDB.chatSettings.orderBy('name').toArray();
            setExampleChats(allChatSettings.filter(chat => chat.author === 'system'));
            setMyChats(allChatSettings.filter(chat => chat.author === 'user'));
        }
    };
    useEffect(() => {
        fetchChatSettings();
        const listener = (event) => {
            if (event?.gid) {
                fetchChatSettings(event);
            }
            else {
                fetchChatSettings();
            }
        };
        chatSettingsEmitter.on('chatSettingsChanged', listener);
        return () => {
            chatSettingsEmitter.off('chatSettingsChanged', listener);
        };
    }, []);
    return (_jsx("div", { className: "flex justify-center items-center h-screen gap-4 md:gap-6 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w7xl p-4 lg:px-0 m-auto", children: _jsxs("div", { className: "w-full", children: [_jsx("h2", { className: "text-xl font-bold mb-2", children: t('example-chats') }), _jsx(ChatSettingsList, { chatSettings: exampleChats }), _jsx("h2", { className: "text-xl font-bold mt-8 mb-2", children: t('my-chats') }), _jsxs("button", { className: "flex items-center gap-2 p-2 mb-4 w-full text-left border border-transparent rounded-md hover:bg-gray-100 dark:hover:bg-gray-800", onClick: () => navigate('/custom/editor'), children: [_jsx("div", { className: "flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-dashed border-token-border-light bg-gray-100 dark:bg-gray-900 ", children: _jsx(PlusIcon, { className: "w-5 h-5 text-black dark:text-white" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Create a Custom Chat" }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Customize Chat Settings for a specific purpose." })] })] }), _jsx(ChatSettingsList, { chatSettings: myChats })] }) }));
};
export default ExploreCustomChats;
