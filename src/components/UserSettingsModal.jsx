import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CircleStackIcon, Cog6ToothIcon, DocumentTextIcon, SpeakerWaveIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserContext } from '../UserContext';
import ModelSelect from './ModelSelect';
import { EditableField } from "./EditableField";
import './UserSettingsModal.css';
import { OPENAI_DEFAULT_SYSTEM_PROMPT } from "../config";
import ConversationService from "../service/ConversationService";
import { NotificationService } from "../service/NotificationService";
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import EditableInstructions from './EditableInstructions';
import { useConfirmDialog } from './ConfirmDialog';
import { DEFAULT_MODEL } from "../constants/appConstants";
var Tab;
(function (Tab) {
    Tab["GENERAL_TAB"] = "General";
    Tab["INSTRUCTIONS_TAB"] = "Instructions";
    Tab["STORAGE_TAB"] = "Storage";
})(Tab || (Tab = {}));
const UserSettingsModal = ({ isVisible, onClose }) => {
    const dialogRef = useRef(null);
    const { userSettings, setUserSettings } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState(Tab.GENERAL_TAB);
    const { showConfirmDialog, ConfirmDialog, isOpen } = useConfirmDialog();
    const [storageUsage, setStorageUsage] = useState();
    const [storageQuota, setStorageQuota] = useState();
    const [percentageUsed, setPercentageUsed] = useState();
    const { t } = useTranslation();
    const editableInstructionsRef = useRef(null);
    useEffect(() => {
        if (isVisible) {
            setActiveTab(Tab.GENERAL_TAB);
        }
    }, [isVisible]);
    const formatBytesToMB = (bytes) => {
        if (typeof bytes === 'undefined') {
            return;
        }
        const megabytes = bytes / 1024 / 1024;
        return `${megabytes.toFixed(2)} MB`;
    };
    const handleDeleteAllConversations = async () => {
        showConfirmDialog({
            message: 'Are you sure you want to delete all conversations? This action cannot be undone.',
            confirmText: 'Delete',
            confirmButtonVariant: 'critical',
            onConfirm: async () => {
                try {
                    await ConversationService.deleteAllConversations();
                    NotificationService.handleSuccess("All conversations have been successfully deleted.");
                }
                catch (error) {
                    console.error('Failed to delete all conversations:', error);
                    if (error instanceof Error) {
                        NotificationService.handleUnexpectedError(error, "Failed to delete all conversations");
                    }
                    else {
                        NotificationService.handleUnexpectedError(new Error('An unknown error occurred'), "Failed to delete all conversations");
                    }
                }
            },
        });
    };
    const handleClose = () => {
        const currentInstructions = editableInstructionsRef.current?.getCurrentValue();
        setUserSettings({ ...userSettings, instructions: currentInstructions || '' });
        onClose();
    };
    useEffect(() => {
        const closeModalOnOutsideClick = (event) => {
            if (!isOpen && dialogRef.current && !dialogRef.current.contains(event.target)) {
                handleClose();
            }
        };
        const closeOnEscape = (event) => {
            if (!isOpen && event.key === 'Escape') {
                handleClose();
            }
        };
        document.addEventListener('mousedown', closeModalOnOutsideClick);
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('mousedown', closeModalOnOutsideClick);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [handleClose]);
    useEffect(() => {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            navigator.storage.estimate().then(({ usage, quota }) => {
                setStorageUsage(usage);
                setStorageQuota(quota);
                if (typeof usage !== 'undefined' && typeof quota !== 'undefined') {
                    setPercentageUsed(((usage / quota) * 100));
                }
            }).catch(error => {
                console.error('Error getting storage estimate:', error);
            });
        }
        else {
            console.log('Storage Estimation API is not supported in this browser.');
        }
    }, []);
    const renderStorageInfo = (value) => value ?? t('non-applicable');
    return (_jsx(Transition, { show: isVisible, as: React.Fragment, children: _jsx("div", { className: "fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50 px-4", children: _jsx(Transition.Child, { as: React.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95", children: _jsxs("div", { ref: dialogRef, className: "flex flex-col bg-white dark:bg-gray-850 rounded-lg w-full max-w-md mx-auto overflow-hidden", style: { minHeight: "640px", minWidth: "43em" }, children: [_jsxs("div", { id: 'user-settings-header', className: "flex justify-between items-center border-b border-gray-200 p-4", children: [_jsx("h1", { className: "text-lg font-semibold", children: t('settings-header') }), _jsx("button", { onClick: handleClose, className: "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100", children: _jsx(XMarkIcon, { className: "h-8 w-8", "aria-hidden": "true" }) })] }), _jsxs("div", { id: 'user-settings-content', className: "flex flex-1", children: [_jsxs("div", { className: "border-r border-gray-200 flex flex-col", children: [_jsxs("div", { className: `cursor-pointer p-4 flex items-center ${activeTab === Tab.GENERAL_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''}`, onClick: () => setActiveTab(Tab.GENERAL_TAB), children: [_jsx(Cog6ToothIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" }), t('general-tab')] }), _jsxs("div", { className: `cursor-pointer p-4 flex items-center ${activeTab === Tab.INSTRUCTIONS_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''}`, onClick: () => setActiveTab(Tab.INSTRUCTIONS_TAB), children: [_jsx(DocumentTextIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" }), t('instructions-tab')] }), _jsxs("div", { className: `cursor-pointer p-4 flex items-center ${activeTab === Tab.SPEECH_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''}`, onClick: () => setActiveTab(Tab.SPEECH_TAB), children: [_jsx(SpeakerWaveIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" }), t('speech-tab')] }), _jsxs("div", { className: `cursor-pointer p-4 flex items-center ${activeTab === Tab.STORAGE_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''}`, onClick: () => setActiveTab(Tab.STORAGE_TAB), children: [_jsx(CircleStackIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" }), t('storage-tab')] })] }), _jsxs("div", { className: "flex-1 p-4 flex flex-col", children: [_jsx("div", { className: `${activeTab === Tab.GENERAL_TAB ? 'flex flex-col flex-1' : 'hidden'}`, children: _jsxs("div", { className: "border-b border-token-border-light pb-3 last-of-type:border-b-0", children: [_jsxs("div", { className: "flex items-center justify-between setting-panel", children: [_jsx("label", { htmlFor: "theme", children: t('theme-label') }), _jsxs("select", { id: 'theme', name: 'theme', className: "custom-select dark:custom-select border-gray-300 border rounded p-2\r\n                                dark:bg-gray-800 dark:text-white dark:border-gray-600", value: userSettings.userTheme, onChange: (e) => {
                                                                    setUserSettings({
                                                                        ...userSettings,
                                                                        userTheme: e.target.value
                                                                    });
                                                                }, children: [_jsx("option", { value: "dark", children: t('dark-option') }), _jsx("option", { value: "light", children: t('light-option') }), _jsx("option", { value: "system", children: t('system-option') })] })] }), _jsxs("div", { className: "flex items-center justify-between setting-panel", children: [userSettings.model ? (_jsx("label", { htmlFor: "model", children: t('model-header') })) : (_jsx("span", { children: t('model-header') })), _jsx(EditableField, { readOnly: false, id: "model", label: "", value: userSettings.model, defaultValue: null, defaultValueLabel: DEFAULT_MODEL, editorComponent: (props) => _jsx(ModelSelect, { value: userSettings.model, onModelSelect: props.onValueChange, models: [], allowNone: true, allowNoneLabel: "Default" }), onValueChange: (value) => {
                                                                    setUserSettings({ ...userSettings, model: value });
                                                                } })] })] }) }), _jsx("div", { className: `${activeTab === Tab.INSTRUCTIONS_TAB ? 'flex flex-col flex-1' : 'hidden'}`, children: _jsx("div", { className: "flex flex-col flex-1 border-b border-token-border-light pb-3 last-of-type:border-b-0", children: _jsx(EditableInstructions, { ref: editableInstructionsRef, initialValue: userSettings.instructions, placeholder: OPENAI_DEFAULT_SYSTEM_PROMPT, onChange: (text) => {
                                                        // setUserSettings({...userSettings, instructions: text});
                                                    }, className: "flex flex-col h-full" }) }) }), _jsx("div", { className: `${activeTab === Tab.SPEECH_TAB ? 'flex flex-col flex-1' : 'hidden'}`, children: _jsxs("div", { className: "flex flex-col flex-1", children: [_jsxs("div", { className: "setting-panel flex justify-between", children: [_jsx("label", { htmlFor: "speech-model", children: t('model-header') }), _jsxs("select", { id: "speech-model", className: "custom-select dark:custom-select border-gray-300 border rounded-sm p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600", value: userSettings.speechModel || undefined, onChange: (e) => setUserSettings({
                                                                    ...userSettings,
                                                                    speechModel: e.target.value
                                                                }), children: [_jsx("option", { value: "tts-1", children: "tts-1" }), _jsx("option", { value: "tts-1-hd", children: "tts-1-hd" })] })] }), _jsxs("div", { className: "setting-panel flex justify-between", children: [_jsx("label", { htmlFor: "voice", children: t('voice-header') }), _jsxs("select", { id: "voice", className: "custom-select dark:custom-select border-gray-300 border rounded-sm p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600", value: userSettings.speechVoice || undefined, onChange: (e) => setUserSettings({
                                                                    ...userSettings,
                                                                    speechVoice: e.target.value
                                                                }), children: [_jsx("option", { value: "alloy", children: "Alloy" }), _jsx("option", { value: "echo", children: "Echo" }), _jsx("option", { value: "fable", children: "Fable" }), _jsx("option", { value: "onyx", children: "Onyx" }), _jsx("option", { value: "nova", children: "Nova" }), _jsx("option", { value: "shimmer", children: "Shimmer" })] })] }), _jsxs("div", { className: "setting-panel flex items-center justify-between", children: [userSettings.speechSpeed ? (_jsx("label", { htmlFor: "speed", className: "mr-4", children: t('speed-header') })) : (_jsx("span", { className: "mr-4", children: t('speed-header') })), _jsx(EditableField, { readOnly: false, id: "speed", label: "", value: userSettings.speechSpeed, defaultValue: 1.0, defaultValueLabel: "1.0", editorComponent: SpeechSpeedSlider, onValueChange: (value) => setUserSettings({
                                                                    ...userSettings,
                                                                    speechSpeed: value
                                                                }) })] }), _jsxs("div", { className: "setting-panel", children: [_jsx("label", { htmlFor: "tts-test-area", children: t('tts-test-label') }), _jsx("textarea", { id: "tts-test-area", rows: 2, className: "shadow-xs p-2 mt-1 block w-full dark:text-gray-300 dark:bg-gray-700 sm:text-sm border border-gray-300 rounded-md", defaultValue: ttsText, onChange: (e) => setTtsText(e.target.value) }), _jsx(TextToSpeechButton, { content: ttsText })] })] }) }), _jsxs("div", { className: `${activeTab === Tab.STORAGE_TAB ? 'flex flex-col flex-1' : 'hidden'}`, children: [_jsx("h3", { className: "text-lg mb-4", children: t('storage-header') }), _jsxs("div", { className: "setting-panel", children: [_jsx("p", { children: "Chats are stored locally in your browser's IndexedDB." }), _jsxs("p", { children: ["Usage: ", `${renderStorageInfo(formatBytesToMB(storageUsage))} of
                    ${renderStorageInfo(formatBytesToMB(storageQuota))}
                    (${renderStorageInfo(percentageUsed ? `${percentageUsed.toFixed(2)}%` : undefined)})`] })] }), _jsxs("div", { className: "flex items-center justify-between setting-panel", children: [_jsx("span", { children: '' }), _jsxs("div", { children: [_jsx("button", { onClick: handleDeleteAllConversations, className: "mt-4 py-2 px-4 bg-red-500 text-white rounded-sm hover:bg-red-700", children: t('delete-all-chats-button') }), ConfirmDialog] })] })] })] })] })] }) }) }) }));
};
export default UserSettingsModal;
