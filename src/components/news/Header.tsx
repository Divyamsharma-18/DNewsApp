import { Search, Bookmark, Star, Moon, Sun, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

interface HeaderProps {
  onSearch: (query: string) => void;
  bookmarkCount: number;
  onShowBookmarks: () => void;
  showingBookmarks: boolean;
}

const Header = ({ onSearch, bookmarkCount, onShowBookmarks, showingBookmarks }: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Check localStorage or default to dark
    const stored = localStorage.getItem('theme');
    const prefersDark = stored === 'dark' || (!stored && true);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            <h1 className="text-xl font-serif font-semibold tracking-tight">
              DNewsApp
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Divyamsharma-18/DNewsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-sm font-medium transition-colors duration-200"
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">{t.starOnGithub}</span>
            </a>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs font-medium uppercase">{language}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-fade-in z-50">
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors ${language === "en" ? "bg-primary/10 text-primary" : ""}`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => handleLanguageChange("de")}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors ${language === "de" ? "bg-primary/10 text-primary" : ""}`}
                  >
                    🇩🇪 Deutsch
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {searchOpen ? (
              <form onSubmit={handleSearch} className="animate-fade-in">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="search-input w-64"
                  autoFocus
                  onBlur={() => {
                    if (!searchValue) setSearchOpen(false);
                  }}
                />
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                aria-label={t.search}
              >
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
            )}

            <button
              onClick={onShowBookmarks}
              className={`p-2 rounded-full transition-colors duration-200 relative ${showingBookmarks ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
              aria-label={t.bookmarks}
            >
              <Bookmark className={`w-5 h-5 ${showingBookmarks ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {bookmarkCount > 9 ? '9+' : bookmarkCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;