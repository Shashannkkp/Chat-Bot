import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const topPMarks = {
    '0': {
        label: _jsx("strong", { children: "0%" }),
    },
    0.25: '25%',
    0.5: '50%',
    0.75: '75%',
    1: {
        label: _jsx("strong", { children: "100%" }),
    },
};
const TopPSlider = ({ value, onValueChange }) => {
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
    return (_jsxs("div", { id: "top_p", children: [_jsx("p", { className: 'mb-2', children: "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both." }), _jsx(Slider, { className: 'w-auto mr-2 ml-2 mb-6', min: 0, max: 1, step: 0.1, value: value === null ? 1 : value, onChange: handleChange, marks: topPMarks, included: false })] }));
};
export default TopPSlider;
