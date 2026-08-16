import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useTranslation } from 'react-i18next';
const temperatureMarks = {
    '0': {
        label: _jsx("strong", { children: "0" }),
    },
    0.5: '0.5',
    1.0: '1.0',
    1.5: '1.5',
    2: {
        label: _jsx("strong", { children: "2" }),
    },
};
const TemperatureSlider = ({ value, onValueChange }) => {
    const { t } = useTranslation();
    const handleChange = (value) => {
        // Since your application expects a single number, ensure only a number is handled
        if (value === null) {
            onValueChange(null);
        }
        if (typeof value === 'number') {
            onValueChange(value);
        }
        else {
            // This branch should not be hit based on your current usage,
            // but it's here to satisfy TypeScript's checks and handle possible future range slider use cases.
            // Handle appropriately or log a warning/error as needed.
            console.warn("Unexpected value type", value);
        }
    };
    return (_jsxs("div", { id: "temperature", children: [_jsx("p", { className: 'mb-2', children: "Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We recommend altering this or top_p but not both." }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }, children: [_jsx("span", { className: 'text-gray-600', style: { alignSelf: 'flex-start', fontSize: '12px' }, children: t('deterministic-label') }), _jsx("span", { className: 'text-gray-600', style: { alignSelf: 'flex-end', fontSize: '12px' }, children: t('creative-label') })] }), _jsx(Slider, { className: 'w-auto mr-2 ml-2 mb-6', min: 0, max: 2, step: 0.1, value: value === null ? 1 : value, onChange: handleChange, marks: temperatureMarks, included: false })] }));
};
export default TemperatureSlider;
