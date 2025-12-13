import { Search } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-serif font-semibold tracking-tight">
              Newsfeed
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="animate-fade-in">
                <input
                  type="text"
                  placeholder="Search stories..."
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
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
