import { jsx as _jsx } from "react/jsx-runtime";
const FormLabel = ({ readOnly, isEditing, label, htmlFor, value, isModalLabel }) => {
    const className = !isModalLabel ? "block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" : "";
    return readOnly || !isEditing ? (_jsx("span", { className: className, children: label })) : (_jsx("label", { className: className, htmlFor: htmlFor, children: label }));
};
export default FormLabel;
