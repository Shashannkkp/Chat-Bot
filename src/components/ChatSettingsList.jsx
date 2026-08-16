import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import CubeIcon from '@heroicons/react/24/outline/CubeIcon';
import './ExploreCustomChats.css';
import ChatSettingDropdownMenu from './ChatSettingDropdownMenu';
const ChatSettingsList = ({ chatSettings }) => {
    const navigate = useNavigate();
    const navigateToChatSetting = (id) => {
        navigate(`/g/${id}`, { state: { reset: Date.now() } });
    };
    return (_jsx("div", { className: "w-full chat-settings-grid", children: chatSettings.map((setting) => (_jsxs("div", { onClick: () => navigateToChatSetting(setting.id), className: "flex items-center gap-4 cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 relative", children: [_jsx("div", { className: "bg-transparent absolute top-0 right-0", children: _jsx(ChatSettingDropdownMenu, { chatSetting: setting, showTitle: false, showDelete: true, alignRight: true, className: "bg-transparent" }) }), _jsx("div", { className: "h-12 w-12 shrink-0", children: _jsx("div", { className: "bg-white overflow-hidden rounded-full", children: (setting.icon && setting.icon.data) ? (_jsx("img", { src: setting.icon.data, alt: "", className: "h-full w-full" })) : (_jsx(CubeIcon, { className: "h-full w-full text-gray-900" })) }) }), _jsxs("div", { className: "overflow-hidden", children: [_jsx("span", { className: "text-sm font-medium leading-tight line-clamp-2 text-gray-900 dark:text-gray-200", children: setting.name }), _jsx("span", { className: "text-xs line-clamp-3 text-gray-600 dark:text-gray-400", children: setting.description })] })] }, setting.id))) }));
};
export default ChatSettingsList;
