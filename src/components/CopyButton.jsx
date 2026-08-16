import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { iconProps } from "../svg";
import { useTranslation } from 'react-i18next';
import "./Button.css";
import Tooltip from "./Tooltip";
export var CopyButtonMode;
(function (CopyButtonMode) {
    CopyButtonMode["Normal"] = "normal";
    CopyButtonMode["Compact"] = "compact";
})(CopyButtonMode || (CopyButtonMode = {}));
const CopyButton = ({ text, mode = CopyButtonMode.Normal, className = '' }) => {
    const { t } = useTranslation();
    const [isCopied, setIsCopied] = useState(false);
    useEffect(() => {
        let timeoutId = null;
        if (isCopied) {
            timeoutId = setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isCopied]);
    const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        if (mode === CopyButtonMode.Compact) {
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    };
    const shouldWrapInTooltip = mode !== CopyButtonMode.Normal;
    const buttonContent = (_jsx(_Fragment, { children: isCopied ? (_jsxs(_Fragment, { children: [_jsx(CheckIcon, { ...iconProps }), mode === CopyButtonMode.Normal && _jsx("span", { children: t('copied') })] })) : (_jsxs(_Fragment, { children: [_jsx(ClipboardIcon, { ...iconProps }), mode === CopyButtonMode.Normal && _jsx("span", { children: t('copy-code') })] })) }));
    return shouldWrapInTooltip ? (_jsx(Tooltip, { title: t('copy-button'), side: "top", sideOffset: 0, children: _jsx("button", { className: `chat-action-button text-gray-400 inline-flex items-center justify-center p-1 ml-auto gap-2 ${className}`, onClick: handleCopyClick, children: buttonContent }) })) : (_jsx("button", { className: `chat-action-button text-gray-400 inline-flex items-center justify-center p-1 ml-auto gap-2 ${className}`, onClick: handleCopyClick, children: buttonContent }));
};
export default CopyButton;
