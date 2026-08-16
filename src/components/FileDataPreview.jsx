import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NoSymbolIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from "react-i18next";
import Tooltip from './Tooltip';
import './FileDataPreview.css';
import { IMAGE_MAX_ZOOM } from "../constants/appConstants";
const FileDataPreview = ({ fileDataRef, removeFileData, readOnly = false, allowImageAttachment = true }) => {
    const { t } = useTranslation();
    const [viewedFileIndex, setViewedFileIndex] = useState(null);
    const [imageStyle, setImageStyle] = useState({});
    const determineAndSetImageStyle = (imgElement) => {
        const naturalWidth = imgElement.naturalWidth;
        const naturalHeight = imgElement.naturalHeight;
        const maxWidth = window.innerWidth * 0.8; // 80vw
        const maxHeight = window.innerHeight * 0.8; // 80vh
        const maxZoomFactor = IMAGE_MAX_ZOOM;
        let width = naturalWidth;
        let height = naturalHeight;
        // Calculate the zoom factor needed to fit the image within 80vw or 80vh
        const widthZoomFactor = maxWidth / naturalWidth;
        const heightZoomFactor = maxHeight / naturalHeight;
        const zoomFactor = Math.min(widthZoomFactor, heightZoomFactor, maxZoomFactor);
        width = naturalWidth * zoomFactor;
        height = naturalHeight * zoomFactor;
        setImageStyle({ width: `${width}px`, height: `${height}px` });
    };
    const handleRemoveFile = (event, index, fileRef) => {
        event.preventDefault();
        event.stopPropagation();
        if (removeFileData) {
            removeFileData(index, fileRef);
        }
    };
    const toggleViewFile = (index) => {
        if (viewedFileIndex === index) {
            setImageStyle({});
            setViewedFileIndex(null);
        }
        else {
            setViewedFileIndex(index);
        }
    };
    const handleNextPrev = (direction) => {
        if (direction === "next" && viewedFileIndex !== null) {
            const nextIndex = viewedFileIndex + 1 < fileDataRef.length ? viewedFileIndex + 1 : 0;
            toggleViewFile(nextIndex);
        }
        else if (direction === "prev" && viewedFileIndex !== null) {
            const prevIndex = viewedFileIndex - 1 >= 0 ? viewedFileIndex - 1 : fileDataRef.length - 1;
            toggleViewFile(prevIndex);
        }
    };
    const handleKeyDown = useCallback((event) => {
        if (event.key === 'ArrowRight') {
            handleNextPrev("next");
        }
        else if (event.key === 'ArrowLeft') {
            handleNextPrev("prev");
        }
        else if (event.key === 'Escape') {
            // Close the full view when Escape is pressed
            setViewedFileIndex(null);
        }
    }, [viewedFileIndex, fileDataRef.length]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    const renderFileData = (fileRef, index) => (_jsxs("div", { className: "file-data-tile group relative inline-block text-sm text-token-text-primary", children: [_jsx("div", { className: "relative overflow-hidden rounded-xl border border-token-border-light", children: _jsx("div", { className: "h-14 w-14", children: _jsx("button", { type: "button", "aria-haspopup": "dialog", "aria-expanded": "false", className: "h-full w-full focus:outline-hidden", onClick: () => fileRef.fileData && toggleViewFile(index), children: _jsx("span", { className: "flex items-center h-full w-full justify-center bg-gray-100 dark:bg-gray-900 bg-cover bg-center text-white", style: { backgroundImage: `url("${fileRef.fileData?.data}")` }, children: !allowImageAttachment && (_jsx(Tooltip, { title: t('model-does-not-support-images'), side: 'top', sideOffset: 25, children: _jsx("span", { children: _jsx(NoSymbolIcon, { className: "icon-sm absolute", width: "48", height: "48", style: {
                                            color: 'rgba(255, 0, 0, 0.75)',
                                            right: '50%',
                                            top: '50%',
                                            transform: 'translate(50%, -50%)'
                                        } }) }) })) }) }) }) }), !readOnly && (_jsx(Tooltip, { title: "Remove file", side: "top", sideOffset: 0, children: _jsx("button", { name: "remove-file", onClick: (e) => handleRemoveFile(e, index, fileRef), className: "remove-file-button absolute right-1 top-1 -translate-y-1/2 translate-x-1/2 rounded-full border p-0.5 md:opacity-0 dark:bg-black bg-white", children: _jsx(XMarkIcon, { className: "icon-sm", width: "24", height: "24" }) }) }))] }, index));
    const renderFullViewFile = () => viewedFileIndex !== null && createPortal(_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", onClick: () => setViewedFileIndex(null), style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, children: _jsxs("div", { className: "relative", children: [viewedFileIndex > 0 && (_jsx("button", { className: "absolute top-1/2 left-4 -translate-y-1/2 flex items-center justify-center bg-white/50 rounded-full shadow-lg border border-black", style: { width: '48px', height: '48px' }, onClick: (e) => {
                        e.stopPropagation();
                        handleNextPrev("prev");
                    }, children: _jsx(ChevronLeftIcon, { className: "h-6 w-6 text-black" }) })), _jsx("img", { src: fileDataRef[viewedFileIndex]?.fileData?.data ?? undefined, onLoad: (e) => determineAndSetImageStyle(e.currentTarget), style: {
                        ...imageStyle,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)'
                    }, alt: "Full view" }), viewedFileIndex < fileDataRef.length - 1 && (_jsx("button", { className: "absolute top-1/2 right-4 -translate-y-1/2 flex items-center justify-center bg-white/50 rounded-full shadow-lg border border-black", style: { width: '48px', height: '48px' }, onClick: (e) => {
                        e.stopPropagation();
                        handleNextPrev("next");
                    }, children: _jsx(ChevronRightIcon, { className: "h-6 w-6 text-black" }) }))] }) }), document.body);
    return (_jsxs("div", { className: "m-2 flex flex-wrap gap-2 px-2.5 md:pl-0 md:pr-4", children: [fileDataRef.map(renderFileData), renderFullViewFile()] }));
};
export default FileDataPreview;
