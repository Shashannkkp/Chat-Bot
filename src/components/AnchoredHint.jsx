import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// AnchoredHint.tsx
import { useContext } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { UserContext } from "../UserContext";
import { LightBulbIcon } from "@heroicons/react/24/outline";
const AnchoredHint = ({ content, children, side = "top", sideOffset = 5, open, close }) => {
    const { userSettings } = useContext(UserContext);
    const arrowClassName = userSettings.theme === 'dark'
        ? "dark:text-gray-100"
        : "text-gray-900";
    return (_jsx(RadixTooltip.Provider, { delayDuration: 0, children: _jsxs(RadixTooltip.Root, { open: open, children: [_jsx(RadixTooltip.Trigger, { asChild: true, children: children }), _jsx(RadixTooltip.Portal, { children: _jsxs(RadixTooltip.Content, { className: "relative rounded-lg border bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-800 dark:border-gray-300 p-1 shadow-xs transition-opacity max-w-xs", side: side, sideOffset: sideOffset, onPointerDown: close, children: [_jsxs("span", { className: "flex items-center whitespace-pre-wrap px-2 py-1 text-left font-medium normal-case text-sm", children: [_jsx(LightBulbIcon, { className: "w-8 h-8", "aria-hidden": "true" }), content] }), _jsx(RadixTooltip.Arrow, { className: arrowClassName })] }) })] }) }));
};
export default AnchoredHint;
