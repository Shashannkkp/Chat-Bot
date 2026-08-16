import { toast } from "react-toastify";
export class NotificationService {
    static getEffectiveTheme = () => {
        let userTheme = localStorage.getItem('theme');
        if (!userTheme) {
            userTheme = 'system';
        }
        if (userTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return userTheme;
    };
    static handleUnexpectedError(err = new Error(), title = '', toastId) {
        const messagePrefix = title ? `${title}: ` : 'Unexpected error: ';
        const message = `${messagePrefix}${err.message || 'No error message provided'}`;
        toast.error(message, {
            toastId: toastId || 'error',
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: NotificationService.getEffectiveTheme(),
        });
    }
    static handleError(title = '', toastId) {
        toast.error(title, {
            toastId: toastId || 'error',
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: NotificationService.getEffectiveTheme(),
        });
    }
    static handleSuccess(title, toastId) {
        toast.success(title, {
            toastId: toastId || 'success',
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: NotificationService.getEffectiveTheme(),
        });
    }
}
