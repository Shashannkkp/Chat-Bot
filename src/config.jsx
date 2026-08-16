import env from './local.env.json';

export const GEMINI_API_KEY = env.gemini_api_key;
export const GEMINI_DEFAULT_MODEL = env.default_model;
export const GEMINI_DEFAULT_SYSTEM_PROMPT = env.default_system_prompt;

// Keep the existing OpenAI-style exports so the current chat service code still works.
export const OPENAI_API_KEY = env.gemini_api_key;
export const OPENAI_DEFAULT_MODEL = env.default_model;
export const OPENAI_DEFAULT_SYSTEM_PROMPT = env.default_system_prompt;
