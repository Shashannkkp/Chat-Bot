import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import './globalStyles.css';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./UserContext";
import App from "./App";
import './i18n'; // sideEffects: true
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(_jsx(React.StrictMode, { children: _jsx(UserProvider, { children: _jsx(App, {}) }) }));
