import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Tooltip.tsx
import { useContext } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { UserContext } from "../UserContext";
const Tooltip = ({ title, children, side, sideOffset }) => {
    const { userSettings, setUserSettings } = useContext(UserContext);
    return (_jsx(RadixTooltip.Provider, { delayDuration: 400, children: _jsxs(RadixTooltip.Root, { children: [_jsx(RadixTooltip.Trigger, { asChild: true, children: children }), _jsx(RadixTooltip.Portal, { children: _jsx(RadixTooltip.Content, { className: "relative rounded-lg border bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-800 dark:border-gray-300 p-1 shadow-xs transition-opacity max-w-xs", side: side, sideOffset: sideOffset, children: _jsx("span", { className: "flex items-center whitespace-pre-wrap px-2 py-1 text-left font-medium normal-case text-sm", children: title }) }) })] }) }));
};
export default Tooltip;
