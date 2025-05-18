
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';

// Import all translations
import en from '@/translations/en';
import sw from '@/translations/sw';
import zu from '@/translations/zu';
import yo from '@/translations/yo';
import ig from '@/translations/ig';
import ha from '@/translations/ha';
import am from '@/translations/am';
import ar from '@/translations/ar';

// Translation resources
const resources = {
  en,
  sw,
  zu,
  yo,
  ig,
  ha,
  am,
  ar,
};

export type TranslationKey = keyof typeof en;

export function useTranslation() {
  const selectedLanguage = useSelector((state: RootState) => state.userPreferences.language);
  const [translations, setTranslations] = useState(resources.en);

  useEffect(() => {
    // If the selected language exists in our resources, use it. Otherwise, default to English
    setTranslations(resources[selectedLanguage as keyof typeof resources] || resources.en);
  }, [selectedLanguage]);

  const t = (key: TranslationKey): string => {
    return translations[key] || key;
  };

  return { t, currentLanguage: selectedLanguage };
}
