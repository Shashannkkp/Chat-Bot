import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ChatSettingsForm from "./ChatSettingsForm";
import chatSettingsDB, { getChatSettingsById } from "../service/ChatSettingsDB";
import Button from "./Button";
import { useTranslation } from 'react-i18next';
const CustomChatEditor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const isEditing = Boolean(id);
    const initialChatSettings = {
        id: isEditing ? parseInt(id) : Date.now(),
        author: 'user',
        icon: null,
        name: '',
        description: '',
        instructions: 'You are a helpful assistant.',
        model: null,
        seed: null,
        temperature: null,
        top_p: null
    };
    const { t } = useTranslation();
    const [chatSettings, setChatSettings] = useState(initialChatSettings);
    useEffect(() => {
        let stateChatSetting = location.state?.initialChatSetting;
        if (stateChatSetting) {
            stateChatSetting.id = Date.now();
            setChatSettings(stateChatSetting);
        }
        else if (isEditing && id) {
            const fetchChatSettings = async () => {
                const existingSettings = await getChatSettingsById(parseInt(id));
                if (existingSettings) {
                    setChatSettings(existingSettings);
                }
            };
            fetchChatSettings();
        }
        else {
            setChatSettings(initialChatSettings);
        }
    }, [id, isEditing, location.state]);
    const handleSave = async () => {
        if (isEditing) {
            await chatSettingsDB.chatSettings.update(chatSettings.id, chatSettings);
        }
        else {
            await chatSettingsDB.chatSettings.add(chatSettings);
        }
        navigate('/explore');
    };
    const handleCancel = () => {
        navigate('/explore');
    };
    const onChange = (updatedChatSettings) => {
        setChatSettings(updatedChatSettings);
    };
    return (_jsxs("div", { className: "h-full", children: [_jsx(ChatSettingsForm, { chatSettings: chatSettings, onChange: onChange }), _jsxs("div", { className: "flex justify-end space-x-4 px-8 mt-4 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto", children: [_jsx(Button, { onClick: handleSave, disabled: !chatSettings.name, variant: "primary", children: isEditing ? t('save-button') : t('create-button') }), _jsx(Button, { onClick: handleCancel, variant: "secondary", className: "mr-2", children: t('cancel-button') })] })] }));
};
export default CustomChatEditor;
