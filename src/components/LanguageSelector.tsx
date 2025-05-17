
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, Languages } from "lucide-react";
import { motion } from "framer-motion";

const languages = [
  { name: "English", code: "en" },
  { name: "Swahili", code: "sw" },
  { name: "Zulu", code: "zu" },
  { name: "Yoruba", code: "yo" },
  { name: "Igbo", code: "ig" },
  { name: "Hausa", code: "ha" },
  { name: "Amharic", code: "am" },
  { name: "Arabic", code: "ar" },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  
  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // In a real app, we would update the app's language here
    localStorage.setItem("preferredLanguage", languageCode);
  };
  
  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || "English";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-afri-dark border-muted">
        <div className="py-2 px-3 text-xs text-muted-foreground font-medium">
          Select Language
        </div>
        {languages.map((language) => (
          <DropdownMenuItem 
            key={language.code} 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleLanguageChange(language.code)}
          >
            <span>{language.name}</span>
            {selectedLanguage === language.code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="h-4 w-4" />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
