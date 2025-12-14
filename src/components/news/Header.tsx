import { Search, Bookmark, Star } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  bookmarkCount: number;
  onShowBookmarks: () => void;
  showingBookmarks: boolean;
}

const Header = ({ onSearch, bookmarkCount, onShowBookmarks, showingBookmarks }: HeaderProps) => {
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
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>

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

            <button
              onClick={onShowBookmarks}
              className={`p-2 rounded-full transition-colors duration-200 relative ${showingBookmarks ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
              aria-label="Bookmarks"
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