import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import AvatarFieldEditor from "./AvatarFieldEditor";
import 'rc-slider/assets/index.css';
import ModelSelect from './ModelSelect';
import TemperatureSlider from './TemperatureSlider';
import TopPSlider from './TopPSlider';
import { EditableField } from './EditableField';
import { useTranslation } from 'react-i18next';
import { NotificationService } from "../service/NotificationService";
import FormLabel from "./FormLabel";
import { DEFAULT_MODEL } from "../constants/appConstants";
const DUMMY_CHAT_SETTINGS = {
    id: Date.now(),
    author: 'user',
    icon: null,
    name: '',
    description: '',
    instructions: 'You are a helpful assistant.',
    model: null,
    seed: null,
    temperature: null,
    top_p: null
};
const ChatSettingsForm = ({ chatSettings, readOnly = false, onChange = undefined }) => {
    const [formData, setFormData] = useState(chatSettings || DUMMY_CHAT_SETTINGS);
    const { t } = useTranslation();
    useEffect(() => {
        if (onChange) {
            onChange(formData);
        }
    }, [formData]);
    useEffect(() => {
        setFormData(chatSettings || DUMMY_CHAT_SETTINGS);
    }, [chatSettings]);
    const onImageChange = (image) => {
        setFormData({ ...formData, icon: image });
    };
    const handleInputChange = (event) => {
        const { name, value, type } = event.target;
        if (type === 'number') {
            setFormData({ ...formData, [name]: value ? parseFloat(value) : null });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        NotificationService.handleSuccess('Form submitted successfully.');
    };
    return (_jsx("div", { className: "w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto pt-3", children: _jsxs("form", { onSubmit: handleSubmit, className: "bg-white dark:bg-gray-800 px-8 pt-6 pb-8 mb-4", children: [_jsx(AvatarFieldEditor, { readOnly: readOnly, image: formData?.icon ? formData.icon : { data: null, type: 'raster' }, onImageChange: onImageChange }), _jsxs("div", { className: "mb-4", children: [_jsx(FormLabel, { readOnly: readOnly, label: `${t('name-header')}${readOnly ? '' : ' *'}`, htmlFor: "name", value: formData.name || t('non-applicable') }), readOnly ?
                            _jsx("p", { className: "text-gray-700 dark:text-gray-300", children: formData.name || t('non-applicable') }) :
                            _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, required: !readOnly, onChange: handleInputChange, placeholder: t('enter-name-placeholder'), autoComplete: "name", className: "shadow-sm appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 leading-tight focus:outline-hidden focus:shadow-outline" })] }), _jsxs("div", { className: "mb-4", children: [_jsx(FormLabel, { readOnly: readOnly, label: t('description-header'), htmlFor: "description", value: formData.description || t('non-applicable') }), readOnly ?
                            _jsx("p", { className: "text-gray-700 dark:text-gray-300", children: formData.description || t('non-applicable') }) :
                            _jsx("textarea", { id: "description", name: "description", value: formData.description, onChange: handleInputChange, className: "shadow-sm appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 leading-tight focus:outline-hidden focus:shadow-outline" })] }), _jsxs("div", { className: "mb-4", children: [_jsx(FormLabel, { readOnly: readOnly, label: t('instructions-header'), htmlFor: "instructions", value: formData.instructions || t('non-applicable') }), readOnly ?
                            _jsx("p", { className: "text-gray-700 dark:text-gray-300", children: formData.instructions || t('non-applicable') }) :
                            _jsx("textarea", { id: "instructions", value: formData.instructions, name: "instructions", onChange: handleInputChange, className: "resize-y border rounded-sm overflow-y-auto h-56 w-full max-h-[60vh] md:max-h-[calc(100vh-300px)] shadow-sm appearance-none py-2 px-3 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 leading-tight focus:outline-hidden focus:shadow-outline" })] }), _jsx("div", { className: "mb-4", children: _jsx(EditableField, { readOnly: readOnly, id: "model", label: t('model-header'), value: formData.model, defaultValue: null, defaultValueLabel: DEFAULT_MODEL, editorComponent: (props) => _jsx(ModelSelect, { value: formData.model, onModelSelect: props.onValueChange, models: [], allowNone: true, allowNoneLabel: "Default" }), onValueChange: (value) => {
                            setFormData({ ...formData, model: value });
                        } }) }), _jsxs("div", { className: "mb-4", children: [_jsx(FormLabel, { readOnly: readOnly, label: t('seed-header'), htmlFor: "seed", value: formData.seed || t('non-applicable') }), readOnly ?
                            _jsx("p", { className: "text-gray-700 dark:text-gray-300", children: formData.seed || t('non-applicable') }) :
                            _jsx("input", { type: "number", id: "seed", name: "seed", onChange: handleInputChange, className: "shadow-sm appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 leading-tight focus:outline-hidden focus:shadow-outline" })] }), _jsx(EditableField, { readOnly: readOnly, id: "temperature", label: t('temperature-header'), value: formData.temperature, defaultValue: 1.0, defaultValueLabel: "1.0", editorComponent: TemperatureSlider, onValueChange: (value) => {
                        setFormData({ ...formData, temperature: value });
                    } }), _jsx(EditableField, { readOnly: readOnly, id: "top_p", label: t('top-p-header'), value: formData.top_p, defaultValue: 1.0, defaultValueLabel: "1.0", editorComponent: TopPSlider, onValueChange: (value) => {
                        setFormData({ ...formData, top_p: value });
                    } })] }) }));
};
export default ChatSettingsForm;
