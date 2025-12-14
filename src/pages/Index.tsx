import { useState } from "react";
import { Twitter, Github, Trash2, CheckSquare, Square } from "lucide-react";
import Header from "@/components/news/Header";
import CategoryNav from "@/components/news/CategoryNav";
import FeaturedArticle from "@/components/news/FeaturedArticle";
import ArticleGrid from "@/components/news/ArticleGrid";
import TrendingSidebar from "@/components/news/TrendingSidebar";
import { useGuardianNews } from "@/hooks/useGuardianNews";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);

  const { t } = useLanguage();

  const { data: articles = [], isLoading } = useGuardianNews(
    activeCategory,
    searchQuery
  );

  const { bookmarks, toggleBookmark, isBookmarked, clearAllBookmarks, removeMultipleBookmarks } = useBookmarks();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowBookmarks(false);
    if (query) {
      setActiveCategory("all");
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery("");
    setShowBookmarks(false);
  };

  const handleShowBookmarks = () => {
    setShowBookmarks(!showBookmarks);
    if (!showBookmarks) {
      setSearchQuery("");
      setSelectedBookmarks([]);
    }
  };

  const handleSelectAll = () => {
    if (selectedBookmarks.length === bookmarks.length) {
      setSelectedBookmarks([]);
    } else {
      setSelectedBookmarks(bookmarks.map(b => b.id));
    }
  };

  const handleToggleSelect = (articleId: string) => {
    setSelectedBookmarks(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedBookmarks.length === 0) {
      clearAllBookmarks();
    } else {
      removeMultipleBookmarks(selectedBookmarks);
    }
    setSelectedBookmarks([]);
    setShowDeleteDialog(false);
  };

  const featuredArticle = articles[0];
  const gridArticles = showBookmarks 
    ? bookmarks 
    : searchQuery 
      ? articles 
      : articles.slice(1, 13);
  const trendingArticles = articles.slice(1, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={handleSearch} 
        bookmarkCount={bookmarks.length}
        onShowBookmarks={handleShowBookmarks}
        showingBookmarks={showBookmarks}
      />
      <CategoryNav
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main className="container mx-auto px-6 py-8">
        {/* Bookmarks Header */}
        {showBookmarks && (
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-serif font-medium">{t.yourBookmarks}</h2>
                <p className="text-muted-foreground mt-1">
                  {bookmarks.length} {bookmarks.length === 1 ? t.savedArticle : t.savedArticles}
                </p>
              </div>
              {bookmarks.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/80 hover:bg-secondary text-sm font-medium transition-colors"
                  >
                    {selectedBookmarks.length === bookmarks.length ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                    {selectedBookmarks.length === bookmarks.length ? t.deselectAll : t.selectAll}
                  </button>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    {selectedBookmarks.length > 0 ? `${t.deleteSelected} (${selectedBookmarks.length})` : t.deleteAll}
                  </button>
                </div>
              )}
            </div>
            {bookmarks.length > 0 && selectedBookmarks.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {bookmarks.map((bookmark) => (
                  <button
                    key={bookmark.id}
                    onClick={() => handleToggleSelect(bookmark.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedBookmarks.includes(bookmark.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    {bookmark.webTitle.slice(0, 30)}...
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Featured Section - shows when not searching or viewing bookmarks */}
        {!searchQuery && !showBookmarks && featuredArticle && (
          <section className="mb-12 opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
            <FeaturedArticle 
              article={featuredArticle}
              isBookmarked={isBookmarked(featuredArticle.id)}
              onToggleBookmark={toggleBookmark}
            />
          </section>
        )}

        {/* Search Results Header */}
        {searchQuery && !showBookmarks && (
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-medium">
              {t.resultsFor} "{searchQuery}"
            </h2>
            <p className="text-muted-foreground mt-1">
              {articles.length} {t.articlesFound}
            </p>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <ArticleGrid 
              articles={gridArticles} 
              isLoading={isLoading && !showBookmarks}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
            />
          </div>

          {!showBookmarks && (
            <aside className="hidden lg:block">
              <div className="sticky top-40">
                <TrendingSidebar
                  articles={trendingArticles}
                  isLoading={isLoading}
                />
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">D</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {t.poweredBy}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {t.madeWith}{" "}
                <a
                  href="https://divyamsharma.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Divyam Sharma
                </a>
              </span>
              <span className="inline-flex items-center gap-0.5">
                <a
                  href="https://x.com/Heydivyamsharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X profile"
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-secondary transition-colors"
                  title="X"
                >
                  <Twitter className="w-4 h-4 relative top-[1.2px]" />
                </a>
                <a
                  href="https://github.com/Divyamsharma-18"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-secondary transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4 relative top-[2px]" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.deleteBookmarks}</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedBookmarks.length === 0 ? t.deleteConfirmAll : t.deleteConfirmSelected}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSelected} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {t.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;