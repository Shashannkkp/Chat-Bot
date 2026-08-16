import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Sidebar from "./components/SideBar";
import MainPage from "./components/MainPage";
import './App.css';
import { ToastContainer } from "react-toastify";
import ExploreCustomChats from "./components/ExploreCustomChats";
import CustomChatEditor from './components/CustomChatEditor';
const App = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };
    const MainPageWithProps = (props) => (_jsx(MainPage, { className: 'main-content', isSidebarCollapsed: isSidebarCollapsed, toggleSidebarCollapse: toggleSidebarCollapse, ...props }));
    return (_jsx(BrowserRouter, { children: _jsx(I18nextProvider, { i18n: i18n, children: _jsxs("div", { className: "App dark:bg-gray-900 dark:text-gray-100", children: [_jsx(ToastContainer, {}), _jsxs("div", { className: "flex overflow-hidden w-full h-full relative z-0", children: [_jsx(Sidebar, { className: "sidebar-container shrink-0", isSidebarCollapsed: isSidebarCollapsed, toggleSidebarCollapse: toggleSidebarCollapse }), _jsx("div", { className: "grow h-full overflow-hidden", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MainPageWithProps, {}) }), _jsx(Route, { path: "/c/:id", element: _jsx(MainPageWithProps, {}) }), _jsx(Route, { path: "/explore", element: _jsx(ExploreCustomChats, {}) })
                                        // Use the wrapper for new routes
                                        , "// Use the wrapper for new routes", _jsx(Route, { path: "/g/:gid", element: _jsx(MainPageWithProps, {}) }), _jsx(Route, { path: "/g/:gid/c/:id", element: _jsx(MainPageWithProps, {}) }), _jsx(Route, { path: "/custom/editor", element: _jsx(CustomChatEditor, {}) }), _jsx(Route, { path: "/custom/editor/:id", element: _jsx(CustomChatEditor, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) })] })] }) }) }));
};
export default App;
