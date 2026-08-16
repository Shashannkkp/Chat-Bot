import { createContext, useContext } from 'react';
const ModelsContext = createContext({
    models: [],
    setModels: () => {
    },
});
export const useModelsContext = () => useContext(ModelsContext);
export default ModelsContext;
