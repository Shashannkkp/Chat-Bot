import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SNIPPET_MARKERS } from "../constants/appConstants";
import FoldableTextSection from './FoldableTextSection';
import FileDataPreview from './FileDataPreview';
const UserContentBlock = ({ text, fileDataRef }) => {
    const preformattedTextStyles = {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    };
    const processText = (inputText) => {
        const sections = [];
        inputText.split(SNIPPET_MARKERS.begin).forEach((section, index) => {
            if (index === 0 && !section.includes(SNIPPET_MARKERS.end)) {
                sections.push(_jsx("div", { style: preformattedTextStyles, children: section }, `text-${index}`));
                return;
            }
            const endSnippetIndex = section.indexOf(SNIPPET_MARKERS.end);
            if (endSnippetIndex !== -1) {
                const snippet = section.substring(0, endSnippetIndex);
                sections.push(_jsx(FoldableTextSection, { content: snippet }, `foldable-${index}`));
                const remainingText = section.substring(endSnippetIndex + SNIPPET_MARKERS.end.length);
                if (remainingText) {
                    sections.push(_jsx("div", { style: preformattedTextStyles, children: remainingText }, `text-after-${index}`));
                }
            }
            else {
                sections.push(_jsx("div", { style: preformattedTextStyles, children: section }, `text-start-${index}`));
            }
        });
        return sections;
    };
    const content = processText(text);
    return (_jsxs("div", { children: [fileDataRef && fileDataRef.length > 0 &&
                _jsx(FileDataPreview, { fileDataRef: fileDataRef, readOnly: true }), _jsx("div", { children: content })] }));
};
export default UserContentBlock;
