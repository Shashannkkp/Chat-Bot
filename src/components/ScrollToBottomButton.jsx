import { jsx as _jsx } from "react/jsx-runtime";
import { ArrowDownIcon } from '@heroicons/react/24/outline';
export const ScrollToBottomButton = ({ onClick }) => {
    return (_jsx("button", { children: _jsx("div", { className: "scroll-to-bottom-button", onClick: onClick, children: _jsx(ArrowDownIcon, { className: "h-4 w-4 text-black", strokeWidth: 2.5 }) }) }));
};
