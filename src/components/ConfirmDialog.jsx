import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import Button from './Button';
import ReactDOM from 'react-dom';
const ConfirmDialog = ({ isOpen, message, confirmText, onConfirm, onCancel, confirmButtonVariant }) => {
    if (!isOpen) {
        return null;
    }
    return ReactDOM.createPortal((_jsx("div", { className: "fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full z-50", children: _jsx("div", { className: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-850", children: _jsxs("div", { className: "mt-3 text-center", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100", children: message }), _jsxs("div", { className: "flex justify-center space-x-4 items-center px-4 py-3", children: [_jsx(Button, { onClick: onConfirm, variant: confirmButtonVariant || "primary", children: confirmText }), _jsx(Button, { onClick: onCancel, variant: "secondary", children: "Cancel" })] })] }) }) })), document.getElementById('modal-root'));
};
export const useConfirmDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState({
        message: '',
        confirmText: 'OK',
        onConfirm: () => {
            setIsOpen(false);
        },
        onCancel: () => {
            setIsOpen(false);
        },
    });
    const showConfirmDialog = useCallback((options) => {
        setDialogProps({
            message: options.message,
            confirmText: options.confirmText || 'OK',
            onConfirm: options.onConfirm,
            onCancel: options.onCancel || (() => setIsOpen(false)),
            confirmButtonVariant: options.confirmButtonVariant,
        });
        setIsOpen(true);
    }, []);
    const handleConfirm = useCallback(() => {
        dialogProps.onConfirm();
        setIsOpen(false);
    }, [dialogProps]);
    const handleCancel = useCallback(() => {
        dialogProps.onCancel?.();
        setIsOpen(false);
    }, [dialogProps]);
    // Return showDialog function and Dialog component
    return {
        showConfirmDialog,
        ConfirmDialog: isOpen ? (_jsx(ConfirmDialog, { isOpen: isOpen, message: dialogProps.message, confirmText: dialogProps.confirmText, onConfirm: handleConfirm, onCancel: handleCancel, confirmButtonVariant: dialogProps.confirmButtonVariant })) : null,
        isOpen
    };
};
export default ConfirmDialog;
