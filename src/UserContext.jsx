import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useEffect, useState } from 'react';
const defaultUserSettings = {
    userTheme: 'system',
    theme: 'light',
    model: null,
    instructions: '',
    speechModel: 'tts-1',
    speechVoice: 'echo',
    speechSpeed: 1.0
};
const determineEffectiveTheme = (userTheme) => {
    if (userTheme === 'system' || !userTheme) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return userTheme;
};
export const UserContext = createContext({
    userSettings: defaultUserSettings,
    setUserSettings: () => {
    },
});
export const UserProvider = ({ children }) => {
    const [userSettings, setUserSettings] = useState(() => {
        const storedUserTheme = localStorage.getItem('theme');
        const userTheme = (storedUserTheme === 'light' || storedUserTheme === 'dark' || storedUserTheme === 'system') ? storedUserTheme : defaultUserSettings.userTheme;
        const model = localStorage.getItem('defaultModel') || defaultUserSettings.model;
        const instructions = localStorage.getItem('defaultInstructions') || defaultUserSettings.instructions;
        const speechModel = localStorage.getItem('defaultSpeechModel') || defaultUserSettings.speechModel;
        const speechVoice = localStorage.getItem('defaultSpeechVoice') || defaultUserSettings.speechVoice;
        const speechSpeedRaw = localStorage.getItem('defaultSpeechSpeed');
        const speechSpeed = speechSpeedRaw !== null ? Number(speechSpeedRaw) : defaultUserSettings.speechSpeed;
        const effectiveTheme = determineEffectiveTheme(userTheme);
        return {
            userTheme: userTheme,
            theme: effectiveTheme,
            model,
            instructions,
            speechModel,
            speechVoice,
            speechSpeed
        };
    });
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', mediaQueryChangeHandler);
        updateTheme();
        return () => {
            mediaQuery.removeEventListener('change', mediaQueryChangeHandler);
        };
    }, []);
    useEffect(() => {
        localStorage.setItem('theme', userSettings.userTheme);
    }, [userSettings.userTheme]);
    useEffect(() => {
        if (userSettings.model === null || userSettings.model === '') {
            localStorage.removeItem('defaultModel');
        }
        else {
            localStorage.setItem('defaultModel', userSettings.model);
        }
    }, [userSettings.model]);
    useEffect(() => {
        if (userSettings.instructions === '') {
            localStorage.removeItem('defaultInstructions');
        }
        else {
            localStorage.setItem('defaultInstructions', userSettings.instructions);
        }
    }, [userSettings.instructions]);
    useEffect(() => {
        const newEffectiveTheme = determineEffectiveTheme(userSettings.userTheme);
        setUserSettings(prevSettings => ({ ...prevSettings, theme: newEffectiveTheme }));
        if (newEffectiveTheme === 'dark') {
            document.body.classList.add('dark');
        }
        else {
            document.body.classList.remove('dark');
        }
    }, [userSettings.userTheme]);
    const mediaQueryChangeHandler = (e) => {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        if (userSettings.userTheme === 'system') {
            setUserSettings((prevSettings) => ({
                ...prevSettings,
                theme: newSystemTheme,
            }));
        }
    };
    const updateTheme = () => {
        const newEffectiveTheme = determineEffectiveTheme(userSettings.userTheme || 'system');
        if (newEffectiveTheme !== userSettings.theme) {
            setUserSettings((prevSettings) => ({ ...prevSettings, theme: newEffectiveTheme }));
        }
        if (newEffectiveTheme === 'dark') {
            document.body.classList.add('dark');
        }
        else {
            document.body.classList.remove('dark');
        }
    };
    useEffect(() => {
        if (userSettings.speechModel === null || userSettings.speechModel === '') {
            localStorage.removeItem('defaultSpeechModel');
        }
        else {
            localStorage.setItem('defaultSpeechModel', userSettings.speechModel);
        }
    }, [userSettings.speechModel]);
    useEffect(() => {
        if (userSettings.speechVoice === null || userSettings.speechVoice === '') {
            localStorage.removeItem('defaultSpeechVoice');
        }
        else {
            localStorage.setItem('defaultSpeechVoice', userSettings.speechVoice);
        }
    }, [userSettings.speechVoice]);
    useEffect(() => {
        if (userSettings.speechSpeed === null || userSettings.speechSpeed === undefined || userSettings.speechSpeed < 0.25 || userSettings.speechSpeed > 4.0) {
            localStorage.removeItem('defaultSpeechSpeed');
        }
        else {
            localStorage.setItem('defaultSpeechSpeed', String(userSettings.speechSpeed));
        }
    }, [userSettings.speechSpeed]);
    return (_jsx(UserContext.Provider, { value: { userSettings, setUserSettings }, children: children }));
};
