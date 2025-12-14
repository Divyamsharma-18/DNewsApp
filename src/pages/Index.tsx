import { useState } from "react";
import { Twitter, Github } from "lucide-react";
import Header from "@/components/news/Header";
import CategoryNav from "@/components/news/CategoryNav";
import FeaturedArticle from "@/components/news/FeaturedArticle";
import ArticleGrid from "@/components/news/ArticleGrid";
import TrendingSidebar from "@/components/news/TrendingSidebar";
import { useGuardianNews } from "@/hooks/useGuardianNews";
import { useBookmarks } from "@/hooks/useBookmarks";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);

  const { data: articles = [], isLoading } = useGuardianNews(
    activeCategory,
    searchQuery
  );

  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

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
    }
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
            <h2 className="text-2xl font-serif font-medium">Your Bookmarks</h2>
            <p className="text-muted-foreground mt-1">
              {bookmarks.length} saved {bookmarks.length === 1 ? 'article' : 'articles'}
            </p>
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
              Results for "{searchQuery}"
            </h2>
            <p className="text-muted-foreground mt-1">
              {articles.length} articles found
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
                Powered by The Guardian API
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Made with ❤️ by{" "}
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
    </div>
  );
};
export default Index;