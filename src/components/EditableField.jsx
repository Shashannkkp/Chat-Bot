import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import FormLabel from "./FormLabel";
import { useTranslation } from 'react-i18next';
export function EditableField({ id, label, value, defaultValue, defaultValueLabel, editorComponent: EditorComponent, onValueChange, readOnly, isModalLabel, }) {
    const [isEditing, setIsEditing] = useState(false);
    const effectiveValue = value !== undefined && value !== null ? value : defaultValue;
    const [tempValue, setTempValue] = useState(effectiveValue);
    const { t } = useTranslation();
    const isValueSet = () => {
        return value !== undefined && value !== null;
    };
    const handleEdit = () => {
        setIsEditing(true);
        setTempValue(effectiveValue);
    };
    const handleTempValueChange = (newValue) => {
        setTempValue(newValue);
    };
    const handleCancel = () => {
        setIsEditing(false);
        setTempValue(effectiveValue);
    };
    const handleOk = () => {
        onValueChange(tempValue);
        setIsEditing(false);
    };
    function toStringRepresentation(value) {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return String(value);
        }
        return JSON.stringify(value);
    }
    return (_jsxs("div", { className: "mb-4", children: [_jsx(FormLabel, { readOnly: readOnly, isEditing: isEditing, label: label, htmlFor: id, value: value, isModalLabel: isModalLabel }), !isEditing ? (_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400 text-sm mr-2", children: isValueSet() ? toStringRepresentation(effectiveValue) : `${defaultValueLabel} ${t('default-label')}` }), !readOnly && (_jsx("button", { className: "text-blue-500 hover:text-blue-700 text-sm", onClick: handleEdit, children: t('change-button') }))] })) : (_jsxs(_Fragment, { children: [_jsx(EditorComponent, { id: id, onValueChange: handleTempValueChange, value: tempValue }), _jsxs("div", { className: "flex justify-end space-x-2 mt-2", children: [_jsx("button", { className: "text-blue-500 hover:text-blue-700 text-sm", onClick: handleCancel, children: t('cancel-button') }), !readOnly && (_jsx("button", { className: "text-blue-500 hover:text-blue-700 text-sm", onClick: handleOk, children: t('ok-button') }))] })] }))] }));
}
