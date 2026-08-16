import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CubeIcon from "@heroicons/react/24/outline/CubeIcon";
const CustomChatSplash = ({ chatSettings, className, }) => {
    return (_jsxs("div", { className: `flex h-full flex-col items-center justify-center ${className}`, children: [_jsx("div", { className: "relative", children: _jsx("div", { className: "mb-3 h-20 w-20", children: _jsx("div", { className: "bg-white overflow-hidden rounded-full", children: (chatSettings.icon && chatSettings.icon.data) ? (_jsx("img", { src: chatSettings.icon.data, alt: "", className: "h-full w-full" })) : (_jsx(CubeIcon, { className: "h-full w-full text-gray-900 dark:text-gray-200" })) }) }) }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: "text-center text-2xl font-medium", children: chatSettings.name }), _jsx("div", { className: "max-w-md text-center text-sm font-normal", children: chatSettings.description })] })] }));
};
export default CustomChatSplash;
