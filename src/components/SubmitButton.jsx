import { jsx as _jsx } from "react/jsx-runtime";
import { EllipsisHorizontalIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import './SubmitButton.css';
import Tooltip from "./Tooltip";
import { useTranslation } from 'react-i18next';
export const SubmitButton = ({ loading, disabled, name }) => {
    const { t } = useTranslation();
    const strokeColor = disabled ? 'currentColor' : 'white';
    return (_jsx(Tooltip, { title: t('send-message'), side: "top", sideOffset: 0, children: _jsx("button", { name: name, type: "submit", disabled: loading || disabled, className: "p-1 mr-2 rounded-md text-black dark:disabled:text-white/40 enabled:text-white dark:enabled:text-black enabled:bg-black dark:enabled:bg-white disabled:text-white/40 relative z-10", children: loading ? (_jsx(EllipsisHorizontalIcon, { className: "animate-ellipsis-pulse", width: 24, height: 24, stroke: strokeColor })) : (_jsx(PaperAirplaneIcon, { width: 24, height: 24 })) }) }));
};
