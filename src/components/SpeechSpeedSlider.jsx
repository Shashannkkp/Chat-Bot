import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useTranslation } from 'react-i18next';
const speechSpeedMarks = {
    0.25: '0.25x',
    1: '1x',
    2: '2x',
    3: '3x',
    4: {
        label: _jsx("strong", { children: "4x" }),
    },
};
const SpeechSpeedSlider = ({ value, onValueChange }) => {
    const { t } = useTranslation();
    const handleChange = (value) => {
        if (value === null) {
            onValueChange(null);
        }
        if (typeof value === 'number') {
            onValueChange(value);
        }
        else {
            console.warn("Unexpected value type", value);
        }
    };
    return (_jsxs("div", { id: "speed", children: [_jsx("p", { className: 'mb-2', children: "Adjust the speech speed to your preference. Lower values will slow down the speech, while higher values will speed it up." }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }, children: [_jsx("span", { className: 'text-gray-600', style: { alignSelf: 'flex-start', fontSize: '12px' }, children: t('slower-label') }), _jsx("span", { className: 'text-gray-600', style: { alignSelf: 'flex-end', fontSize: '12px' }, children: t('faster-label') })] }), _jsx(Slider, { className: 'w-auto mr-2 ml-2 mb-6', min: 0.25, max: 4, step: 0.25, value: value === null ? 1 : value, onChange: handleChange, marks: speechSpeedMarks, included: false })] }));
};
export default SpeechSpeedSlider;
