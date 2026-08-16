import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleLeftIcon, CheckIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ConversationService from "../service/ConversationService";
import { iconProps } from "../svg";
import { MAX_TITLE_LENGTH } from "../constants/appConstants";
const ConversationListItem = ({ convo, isSelected, loadConversations, setSelectedId }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(convo.title);
    const navigate = useNavigate();
    const acceptButtonRef = useRef(null);
    const saveEditedTitle = () => {
        ConversationService.updateConversationPartial(convo, { title: editedTitle })
            .then(() => {
            setIsEditingTitle(false);
            loadConversations(); // Reload conversations to reflect the updated title
        })
            .catch((error) => {
            console.error('Error updating conversation title:', error);
        });
    };
    const deleteConversation = () => {
        ConversationService.deleteConversation(convo.id)
            .then(() => {
            loadConversations(); // Reload conversations to reflect the deletion
        })
            .catch((error) => {
            console.error('Error deleting conversation:', error);
        });
    };
    const selectConversation = () => {
        if (isEditingTitle) {
            // If in edit mode, cancel edit mode and select the new conversation
            setIsEditingTitle(false);
            setEditedTitle(''); // Clear editedTitle
        }
        else {
            // If not in edit mode, simply select the conversation
        }
        setSelectedId(convo.id);
        if (!isEditingTitle) {
            const url = convo.gid ? `/g/${convo.gid}/c/${convo.id}` : `/c/${convo.id}`;
            navigate(url);
        }
    };
    const toggleEditMode = (convo) => {
        if (!isEditingTitle) {
            // Entering edit mode, initialize editedTitle with convo.title
            setEditedTitle(convo.title);
        }
        else {
            // Exiting edit mode, clear editedTitle
            setEditedTitle('');
        }
        setIsEditingTitle(!isEditingTitle);
    };
    const handleTitleInputKeyPress = (e, conversation) => {
        if (e.key === 'Enter') {
            // Save the edited title when Enter key is pressed
            saveEditedTitle();
        }
        else if (e.key === 'Escape') {
            setIsEditingTitle(false);
        }
    };
    const handleInputBlur = (e, conversation) => {
        if (acceptButtonRef.current) {
            saveEditedTitle();
        }
        // Check if the blur event was not caused by pressing the Enter key
        // If in edit mode and the input loses focus, cancel the edit
        setEditedTitle(conversation.title);
        setIsEditingTitle(false);
    };
    const handleContextMenu = (e) => {
        setIsEditingTitle(false);
    };
    if (isSelected) {
        return (_jsx("li", { className: "relative z-15", style: { opacity: 1, height: "auto" }, children: _jsxs("div", { role: "button", className: `relative flex py-3 px-3 items-center gap-3 rounded-md bg-gray-100 dark:bg-gray-800 cursor-pointer break-all pr-14 group`, children: [_jsx(ChatBubbleLeftIcon, { ...iconProps }), isEditingTitle ? (_jsx("div", { className: "flex items-center gap-3", children: _jsx("input", { type: "text", className: 'dark:bg-gray-800 dark:text-gray-100', value: editedTitle, onChange: (e) => setEditedTitle(e.target.value), onKeyDown: (e) => handleTitleInputKeyPress(e, convo), autoFocus: true, maxLength: MAX_TITLE_LENGTH, style: { width: "10em" }, onBlur: (e) => {
                                if (isEditingTitle) {
                                    handleInputBlur(e, convo);
                                }
                            } }) })) : (_jsx("div", { className: "relative flex-1 w-full text-left overflow-hidden whitespace-nowrap text-ellipsis max-h-5 break-all", children: convo.title })), _jsx("div", { className: "absolute flex right-1 z-10 dark:text-gray-300 text-gray-800", children: isEditingTitle ? (_jsxs(_Fragment, { children: [_jsx("button", { ref: acceptButtonRef, onClick: () => {
                                        saveEditedTitle();
                                    }, className: `p-1 hover:text-gray-400 dark:hover:text-white`, onContextMenu: handleContextMenu, children: _jsx(CheckIcon, { ...iconProps }) }), _jsx("button", { onClick: () => {
                                        setIsEditingTitle(false); // Exit edit mode without saving
                                        setEditedTitle(""); // Clear the edited title
                                    }, className: `p-1 hover:text-gray-400 dark:hover:text-white`, children: _jsx(XMarkIcon, { ...iconProps }) })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => toggleEditMode(convo), className: `p-1 hover:text-gray-400 dark:hover:text-white`, children: _jsx(PencilSquareIcon, { ...iconProps }) }), _jsx("button", { onClick: () => deleteConversation(), className: "p-1 hover:text-gray-400 dark:hover:text-white", children: _jsx(TrashIcon, { ...iconProps }) })] })) })] }) }, convo.id));
    }
    else {
        return (_jsx("li", { className: "relative z-15", style: { opacity: 1, height: "auto" }, children: _jsxs("button", { onClick: () => selectConversation(), type: "button", className: "relative flex w-full py-3 px-3 items-center gap-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-850 rounded-md cursor-pointer break-all", children: [_jsx(ChatBubbleLeftIcon, { ...iconProps }), _jsx("div", { className: "relative flex-1 overflow-hidden text-left whitespace-nowrap text-ellipsis max-h-5 break-all", children: convo.title })] }) }, convo.id));
    }
};
export default ConversationListItem;
