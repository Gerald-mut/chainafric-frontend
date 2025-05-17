
// Supported languages
export const LANGUAGES = [
  { name: "English", code: "en" },
  { name: "Swahili", code: "sw" },
  { name: "Zulu", code: "zu" },
  { name: "Yoruba", code: "yo" },
  { name: "Igbo", code: "ig" },
  { name: "Hausa", code: "ha" },
  { name: "Amharic", code: "am" },
  { name: "Arabic", code: "ar" },
];

// Get browser language
export const getBrowserLanguage = (): string => {
  const browserLang = navigator.language.split('-')[0];
  const isSupported = LANGUAGES.some(lang => lang.code === browserLang);
  return isSupported ? browserLang : 'en';
};

// Get user's preferred language from localStorage or browser
export const getUserLanguage = (): string => {
  const savedLanguage = localStorage.getItem('preferredLanguage');
  
  if (savedLanguage) {
    return savedLanguage;
  }
  
  return getBrowserLanguage();
};

// Set user's preferred language
export const setUserLanguage = (languageCode: string): void => {
  localStorage.setItem('preferredLanguage', languageCode);
};

// Get language name from code
export const getLanguageName = (code: string): string => {
  const language = LANGUAGES.find(lang => lang.code === code);
  return language ? language.name : 'English';
};
