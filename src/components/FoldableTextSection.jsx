import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import "./FoldableTextSection.css"; // Make sure this is correctly imported
const FoldableTextSection = ({ content }) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const topOfDivRef = useRef(null); // Create a ref for the button
    const toggleSection = () => {
        const scrollPositionBeforeToggle = window.scrollY;
        const rectBeforeToggle = topOfDivRef.current?.getBoundingClientRect();
        setIsExpanded(!isExpanded);
        setTimeout(() => {
            if (rectBeforeToggle && topOfDivRef.current) {
                // Reference to the top of the component after expanding/collapsing
                const rectAfterToggle = topOfDivRef.current.getBoundingClientRect();
                // Calculate the difference in position
                const positionDiff = rectAfterToggle.top - rectBeforeToggle.top;
                // Correct the scroll position to maintain the view
                window.scrollTo({
                    top: scrollPositionBeforeToggle + positionDiff,
                    behavior: 'auto',
                });
            }
        }, 0);
    };
    const buttonStyles = {
        color: 'var(--primary)',
        cursor: 'pointer',
        userSelect: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem',
        outline: 'none',
    };
    const iconStyles = {
        width: '1em',
        height: '1em',
        marginRight: '0.5em',
    };
    const contentStyles = {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        maxHeight: isExpanded ? 'none' : '4.5em',
        overflow: 'hidden',
        paddingLeft: '0.5em', // Space between the line and the content
    };
    return (_jsxs("div", { ref: topOfDivRef, children: [_jsxs("div", { className: "wrapper", children: [_jsx("div", { className: "line", onClick: toggleSection }), _jsx("div", { style: contentStyles, children: content })] }), _jsx("button", { onClick: toggleSection, style: buttonStyles, "aria-expanded": isExpanded, children: isExpanded ? (_jsxs(_Fragment, { children: [_jsx(ChevronUpIcon, { style: iconStyles }), t('collapse')] })) : (_jsxs(_Fragment, { children: [_jsx(ChevronDownIcon, { style: iconStyles }), t('expand')] })) })] }));
};
export default FoldableTextSection;
