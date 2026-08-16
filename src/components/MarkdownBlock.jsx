import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { visit } from 'unist-util-visit';
import "./MarkdownBlock.css";
// import SyntaxHighlighter from 'react-syntax-highlighter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import CopyButton from "./CopyButton";
import gfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { UserContext } from "../UserContext";
import { coldarkDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
function rehypeInlineCodeProperty() {
    return function (tree) {
        visit(tree, 'element', (node, index, parent) => {
            if (node.tagName === 'code') {
                const isInline = node.position && node.position.start.line === node.position.end.line;
                node.properties.dataInline = isInline;
                // console.log('Code element:', node);
                // console.log('Is inline:', isInline);
            }
        });
    };
}
const MarkdownBlock = ({ markdown, role, loading }) => {
    const { userSettings, setUserSettings } = useContext(UserContext);
    function inlineCodeBlock({ value, language }) {
        return (_jsx("code", { children: value }));
    }
    function codeBlock({ node, className, children, ...props }) {
        if (!children) {
            return null;
        }
        const value = String(children).replace(/\n$/, '');
        if (!value) {
            return null;
        }
        // Note: OpenAI does not always annotate the Markdown code block with the language
        // Note: In this case, we will fall back to plaintext
        const match = /language-(\w+)/.exec(className || '');
        let language = match ? match[1] : 'plaintext';
        const isInline = node.properties.dataInline;
        return isInline ? (inlineCodeBlock({ value: value, language })) : (_jsxs("div", { className: "relative border border-gray-200 dark:border-gray-800 rounded-md codeBlockContainer dark:bg-gray-850", children: [_jsx("div", { className: "flex items-center text-gray-900 dark:text-gray-200 bg-gray-200 dark:bg-gray-850 px-4 py-2 text-xs font-sans justify-between rounded-t-md", children: _jsx("span", { children: language }) }), _jsx("div", { className: "sticky top-9 md:top-[5.75rem]", children: _jsx("div", { className: "absolute bottom-0 right-2 flex h-8 items-center", children: _jsx(CopyButton, { className: "rounded-sm bg-gray-200 dark:bg-gray-850", text: children }) }) }), _jsx("div", { className: "overflow-y-auto", children: _jsx(SyntaxHighlighter, { language: language, style: userSettings.theme === 'dark' ? coldarkDark : oneLight, customStyle: {
                            margin: '0'
                        }, children: value }) })] }));
    }
    function customPre({ children, className, ...props }) {
        return (_jsx("pre", { className: `custom-pre-block ${className || ''}`, style: { overflow: 'visible' }, ...props, children: children }));
    }
    const renderers = {
        code: codeBlock,
        pre: customPre,
    };
    return (_jsxs("div", { children: [_jsx(ReactMarkdown, { remarkPlugins: [gfm, remarkMath], components: renderers, rehypePlugins: [rehypeKatex, rehypeInlineCodeProperty], children: markdown }), loading && _jsx("span", { className: "streaming-dot", children: "\u2022\u2022\u2022" })] }));
};
export default MarkdownBlock;
