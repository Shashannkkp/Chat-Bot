import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, Cog6ToothIcon, DocumentDuplicateIcon, EyeIcon, EyeSlashIcon, InformationCircleIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import ChatSettingsForm from './ChatSettingsForm';
import { useTranslation } from 'react-i18next';
import { deleteChatSetting, updateShowInSidebar } from '../service/ChatSettingsDB';
import { NotificationService } from "../service/NotificationService";
import ConversationService from '../service/ConversationService';
import { useConfirmDialog } from "./ConfirmDialog";
const ChatSettingDropdownMenu = ({ chatSetting, showTitle = true, showDelete = false, className, alignRight = false, }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { showConfirmDialog, ConfirmDialog } = useConfirmDialog();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const onAbout = (event) => {
        event.stopPropagation();
        setIsDialogOpen(true);
    };
    const onEdit = (event) => {
        navigate('/custom/editor/' + chatSetting?.id);
    };
    const onDuplicate = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (chatSetting) {
            const newChatSetting = { ...chatSetting, id: 0, name: `${chatSetting.name} (Copy)`, author: 'user' };
            navigate('/custom/editor/', { state: { initialChatSetting: newChatSetting } });
        }
    };
    const performDeleteChatSetting = async (gid) => {
        try {
            if (gid > 0) {
                try {
                    await ConversationService.deleteConversationsByGid(gid);
                }
                catch (error) {
                    console.error('Failed to delete related conversations:', error);
                    NotificationService.handleError('Failed to delete related conversations. Please try again.');
                    return;
                }
            }
            try {
                await deleteChatSetting(gid);
            }
            catch (error) {
                console.error('Failed to delete chat setting:', error);
                NotificationService.handleError('Failed to delete chat setting. Please try again.');
            }
        }
        catch (error) {
            console.error('Error during deletion process::', error);
            if (error instanceof Error) {
                NotificationService.handleUnexpectedError(error, "Failed to delete all conversations");
            }
            else {
                NotificationService.handleUnexpectedError(new Error('An unknown error occurred'), "Failed to delete all conversations");
            }
        }
    };
    const onDelete = async (event) => {
        event.stopPropagation();
        if (chatSetting) {
            const gid = chatSetting.id;
            const conversationCount = await ConversationService.countConversationsByGid(gid);
            if (conversationCount > 0 && gid > 0) {
                showConfirmDialog({
                    message: `Deleting this chat setting will also delete ${conversationCount} conversations associated with it. Do you want to proceed?`,
                    confirmText: 'Delete',
                    confirmButtonVariant: 'critical',
                    onConfirm: async () => {
                        await performDeleteChatSetting(gid);
                    },
                });
            }
            else {
                performDeleteChatSetting(gid);
            }
        }
    };
    const onHideFromSidebar = async (event) => {
        event.stopPropagation();
        if (chatSetting) {
            await updateShowInSidebar(chatSetting.id, 0);
        }
    };
    const toggleInSidebar = async (event) => {
        event.stopPropagation();
        if (chatSetting) {
            const newShowInSidebar = chatSetting.showInSidebar === 1 ? 0 : 1;
            await updateShowInSidebar(chatSetting.id, newShowInSidebar);
        }
    };
    const menuItemsClass = `absolute ${alignRight ? 'right-0' : 'left-0'} w-56 mt-2 origin-top-left bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 divide-y divide-gray-100 dark:divide-gray-600 rounded-md shadow-lg outline-hidden z-20`;
    return (_jsxs(Fragment, { children: [_jsx("div", { className: `inline-block relative text-left ${className}`, onClick: (event) => event.stopPropagation(), children: _jsx(Menu, { as: "div", children: ({ open }) => (_jsxs(_Fragment, { children: [_jsxs(Menu.Button, { style: { paddingTop: '.625rem', paddingBottom: '.625rem' }, className: "inline-flex px-3 text-md font-medium text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-800 rounded-md shadow-xs hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-hidden items-center", children: [_jsx("span", { children: showTitle && chatSetting ? chatSetting.name : '' }), _jsx(ChevronDownIcon, { className: `${open ? 'transform rotate-180' : ''} w-5 h-5`, "aria-hidden": "true" })] }), _jsx(Transition, { enter: "transition duration-100 ease-out", enterFrom: "transform scale-95 opacity-0", enterTo: "transform scale-100 opacity-100", leave: "transition duration-75 ease-out", leaveFrom: "transform scale-100 opacity-100", leaveTo: "transform scale-95 opacity-0", children: _jsx(Menu.Items, { className: menuItemsClass, children: _jsxs("div", { className: "py-1", children: [_jsx(Menu.Item, { children: ({ active }) => (_jsxs("button", { onClick: () => navigate(`/g/${chatSetting?.id}`, { state: { reset: Date.now() } }), className: `flex items-center w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`, children: [_jsx(PencilSquareIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" }), t('new-chat')] })) }), _jsx(Menu.Item, { children: ({ active }) => (_jsxs("button", { onClick: onAbout, className: `flex items-center w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`, children: [_jsx(InformationCircleIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" }), t('menu-about')] })) }), _jsx(Menu.Item, { children: ({ active }) => (_jsxs("button", { onClick: onEdit, disabled: chatSetting?.author === 'system', className: `flex items-center w-full text-left px-4 py-2 text-sm ${chatSetting?.author === 'system'
                                                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                                        : active
                                                            ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white'
                                                            : 'text-gray-700 dark:text-gray-300'}`, "aria-disabled": chatSetting?.author === 'system', children: [_jsx(Cog6ToothIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" }), t('menu-edit')] })) }), _jsx(Menu.Item, { children: ({ active }) => (_jsxs("button", { onClick: onDuplicate, className: `flex items-center w-full px-4 py-2 text-sm ${active
                                                        ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white'
                                                        : 'text-gray-700 dark:text-gray-300'}`, children: [_jsx(DocumentDuplicateIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" }), t('menu-duplicate')] })) }), _jsx(Menu.Item, { children: ({ active }) => (_jsxs("button", { onClick: toggleInSidebar, className: `flex items-center w-full px-4 py-2 text-sm ${active ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`, children: [chatSetting?.showInSidebar === 1 ? (_jsx(EyeSlashIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" })) : (_jsx(EyeIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" })), chatSetting?.showInSidebar === 1 ? t('hide-sidebar') : t('show-sidebar')] })) }), showDelete && (_jsx(Menu.Item, { children: ({ active }) => (_jsxs("button", { onClick: onDelete, disabled: chatSetting?.author === 'system', className: `flex items-center w-full px-4 py-2 text-sm ${chatSetting?.author === 'system'
                                                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                                        : active
                                                            ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white'
                                                            : 'text-gray-700 dark:text-gray-300'}`, children: [_jsx(TrashIcon, { className: "w-4 h-4 mr-3", "aria-hidden": "true" }), t('menu-delete')] })) }))] }) }) })] })) }) }), ConfirmDialog, _jsx(Transition.Root, { show: isDialogOpen, as: Fragment, children: _jsxs(Dialog, { as: "div", className: "relative z-10", onClose: () => setIsDialogOpen(false), children: [_jsx(Transition.Child, { as: Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0", children: _jsx("div", { className: "fixed inset-0 bg-black/30 transition-opacity" }) }), _jsx("div", { className: "fixed inset-0 overflow-y-auto", children: _jsx("div", { className: "flex min-h-full items-start justify-center p-4 text-center", style: { marginTop: '5vh' }, onClick: (event) => {
                                    // This prevents the backdrop click from propagating.
                                    event.stopPropagation();
                                }, children: _jsx(Transition.Child, { as: Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95", children: _jsxs(Dialog.Panel, { className: "relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all", children: [_jsx("div", { className: "absolute top-4 right-4", children: _jsx("button", { type: "button", className: "inline-flex justify-center p-2 text-gray-400 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400", onClick: () => setIsDialogOpen(false), children: _jsx(XMarkIcon, { className: "w-8 h-8", "aria-hidden": "true" }) }) }), _jsx("div", { className: "mt-2", children: _jsx(ChatSettingsForm, { readOnly: true, chatSettings: chatSetting }) })] }) }) }) })] }) })] }));
};
export default ChatSettingDropdownMenu;
