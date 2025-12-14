import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "de";

interface Translations {
  // Header
  appName: string;
  starOnGithub: string;
  search: string;
  searchPlaceholder: string;
  bookmarks: string;
  
  // Categories
  forYou: string;
  world: string;
  technology: string;
  business: string;
  sports: string;
  culture: string;
  science: string;
  environment: string;
  beauty: string;
  lifestyle: string;
  
  // Bookmarks
  yourBookmarks: string;
  savedArticles: string;
  savedArticle: string;
  selectAll: string;
  deselectAll: string;
  deleteAll: string;
  deleteSelected: string;
  deleteBookmarks: string;
  deleteConfirmAll: string;
  deleteConfirmSelected: string;
  cancel: string;
  delete: string;
  
  // Search
  resultsFor: string;
  articlesFound: string;
  
  // Trending
  trending: string;
  
  // Footer
  poweredBy: string;
  madeWith: string;
  
  // Article
  readMore: string;
  share: string;
  linkCopied: string;
  
  // Loading
  loading: string;
}

const translations: Record<Language, Translations> = {
  en: {
    appName: "DNewsApp",
    starOnGithub: "Star on GitHub",
    search: "Search",
    searchPlaceholder: "Search stories...",
    bookmarks: "Bookmarks",
    
    forYou: "For You",
    world: "World",
    technology: "Technology",
    business: "Business",
    sports: "Sports",
    culture: "Culture",
    science: "Science",
    environment: "Environment",
    beauty: "Beauty",
    lifestyle: "Lifestyle",
    
    yourBookmarks: "Your Bookmarks",
    savedArticles: "saved articles",
    savedArticle: "saved article",
    selectAll: "Select All",
    deselectAll: "Deselect All",
    deleteAll: "Delete All",
    deleteSelected: "Delete Selected",
    deleteBookmarks: "Delete Bookmarks",
    deleteConfirmAll: "Are you sure you want to delete all bookmarks? This action cannot be undone.",
    deleteConfirmSelected: "Are you sure you want to delete the selected bookmarks? This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    
    resultsFor: "Results for",
    articlesFound: "articles found",
    
    trending: "Trending Now",
    
    poweredBy: "Powered by The Guardian API",
    madeWith: "Made with ❤️ by",
    
    readMore: "Read More",
    share: "Share",
    linkCopied: "Link copied to clipboard!",
    
    loading: "Loading...",
  },
  de: {
    appName: "DNachrichtenApp",
    starOnGithub: "Stern auf GitHub",
    search: "Suchen",
    searchPlaceholder: "Geschichten suchen...",
    bookmarks: "Lesezeichen",
    
    forYou: "Für Dich",
    world: "Welt",
    technology: "Technologie",
    business: "Wirtschaft",
    sports: "Sport",
    culture: "Kultur",
    science: "Wissenschaft",
    environment: "Umwelt",
    beauty: "Schönheit",
    lifestyle: "Lebensstil",
    
    yourBookmarks: "Deine Lesezeichen",
    savedArticles: "gespeicherte Artikel",
    savedArticle: "gespeicherter Artikel",
    selectAll: "Alle auswählen",
    deselectAll: "Alle abwählen",
    deleteAll: "Alle löschen",
    deleteSelected: "Ausgewählte löschen",
    deleteBookmarks: "Lesezeichen löschen",
    deleteConfirmAll: "Möchten Sie wirklich alle Lesezeichen löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
    deleteConfirmSelected: "Möchten Sie wirklich die ausgewählten Lesezeichen löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
    cancel: "Abbrechen",
    delete: "Löschen",
    
    resultsFor: "Ergebnisse für",
    articlesFound: "Artikel gefunden",
    
    trending: "Aktuell im Trend",
    
    poweredBy: "Bereitgestellt von The Guardian API",
    madeWith: "Gemacht mit ❤️ von",
    
    readMore: "Weiterlesen",
    share: "Teilen",
    linkCopied: "Link in Zwischenablage kopiert!",
    
    loading: "Laden...",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language;
    if (stored && (stored === "en" || stored === "de")) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};