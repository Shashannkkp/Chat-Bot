import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cog8ToothIcon, PlusIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { CloseSideBarIcon, iconProps, OpenSideBarIcon } from "../svg";
import { useTranslation } from 'react-i18next';
import Tooltip from "./Tooltip";
import UserSettingsModal from './UserSettingsModal';
import ChatShortcuts from './ChatShortcuts';
import ConversationList from "./ConversationList";
const Sidebar = ({ className, isSidebarCollapsed, toggleSidebarCollapse }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
    const openSettingsDialog = () => {
        setSettingsModalVisible(true);
    };
    const handleNewChat = () => {
        navigate('/', { state: { reset: Date.now() } });
    };
    const handleOnClose = () => {
        setSettingsModalVisible(false);
    };
    return (_jsxs("div", { className: `${className} ${isSidebarCollapsed ? 'w-0' : 'w-auto'}`, children: [isSidebarCollapsed && (_jsx("div", { className: "absolute top-0 left-0 z-50", children: _jsx(Tooltip, { title: t('open-sidebar'), side: "right", sideOffset: 10, children: _jsx("button", { className: "flex px-3 min-h-[44px] py-1 gap-3 transition-colors duration-200 dark:text-white\r\n              cursor-pointer text-sm rounded-md border dark:border-white/20 hover:bg-gray-300 dark:hover:bg-gray-600\r\n              h-11 w-11 shrink-0 items-center justify-center bg-white dark:bg-transparent", onClick: toggleSidebarCollapse, children: _jsx(OpenSideBarIcon, {}) }) }) })), _jsx(UserSettingsModal, { isVisible: isSettingsModalVisible, onClose: handleOnClose }), _jsx("div", { className: "sidebar duration-500 transition-all h-full shrink-0 overflow-x-hidden dark:bg-gray-900", children: _jsx("div", { className: "h-full w-[260px]", children: _jsx("div", { className: "flex h-full min-h-0 flex-col ", children: _jsxs("div", { className: "scrollbar-trigger relative h-full flex-1 items-start border-white/20", children: [_jsx("h2", { className: "sr-only", children: "Chat history" }), _jsxs("nav", { className: "flex h-full flex-col p-2", "aria-label": "Chat history", children: [_jsxs("div", { className: "mb-1 flex flex-row gap-2", children: [_jsxs("button", { className: "flex px-3 min-h-[44px] py-1 items-center gap-3\r\n                       transition-colors duration-200 dark:text-white\r\n                       cursor-pointer text-sm rounded-md border dark:border-white/20 hover:bg-gray-500/10 h-11\r\n                       bg-white dark:bg-transparent grow overflow-hidden", onClick: handleNewChat, type: "button", children: [_jsx(PlusIcon, { ...iconProps }), _jsx("span", { className: "truncate", children: t('new-chat') })] }), _jsx(Tooltip, { title: t('open-settings'), side: "right", sideOffset: 10, children: _jsx("button", { type: "button", className: "flex px-3 min-h-[44px] py-1 gap-3 transition-colors duration-200 dark:text-white\r\n                      cursor-pointer text-sm rounded-md border dark:border-white/20 hover:bg-gray-500/10 h-11 w-11\r\n                      shrink-0 items-center justify-center bg-white dark:bg-transparent", onClick: openSettingsDialog, children: _jsx(Cog8ToothIcon, {}) }) }), _jsx(Tooltip, { title: t('close-sidebar'), side: "right", sideOffset: 10, children: _jsx("button", { className: "flex px-3 min-h-[44px] py-1 gap-3 transition-colors duration-200 dark:text-white\r\n                      cursor-pointer text-sm rounded-md border dark:border-white/20 hover:bg-gray-500/10\r\n                      h-11 w-11 shrink-0 items-center justify-center bg-white dark:bg-transparent", onClick: toggleSidebarCollapse, type: "button", children: _jsx(CloseSideBarIcon, {}) }) })] }), _jsxs(Link, { to: "/explore", className: "flex items-center m-2 dark:bg-gray-900 dark:text-gray-100 text-gray-900", children: [_jsx(Squares2X2Icon, { ...iconProps, className: "mt-1 mr-2" }), _jsx("span", { children: t('custom-chats-header') })] }), _jsx(ChatShortcuts, {}), _jsx(ConversationList, {})] })] }) }) }) })] }));
};
export default Sidebar;
