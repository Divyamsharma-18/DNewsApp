import { useState } from "react";
import Header from "@/components/news/Header";
import CategoryNav from "@/components/news/CategoryNav";
import FeaturedArticle from "@/components/news/FeaturedArticle";
import ArticleGrid from "@/components/news/ArticleGrid";
import TrendingSidebar from "@/components/news/TrendingSidebar";
import { useGuardianNews, useFeaturedNews } from "@/hooks/useGuardianNews";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: articles = [], isLoading } = useGuardianNews(
    activeCategory,
    searchQuery
  );
  const { data: featuredArticles = [], isLoading: featuredLoading } =
    useFeaturedNews();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setActiveCategory("all");
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery("");
  };

  const featuredArticle = featuredArticles[0];
  const gridArticles = searchQuery ? articles : articles.slice(0, 12);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      <CategoryNav
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main className="container mx-auto px-6 py-8">
        {/* Featured Section */}
        {!searchQuery && featuredArticle && (
          <section className="mb-12 opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
            <FeaturedArticle article={featuredArticle} />
          </section>
        )}

        {/* Search Results Header */}
        {searchQuery && (
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
            <ArticleGrid articles={gridArticles} isLoading={isLoading} />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-40">
              <TrendingSidebar
                articles={featuredArticles.slice(1, 6)}
                isLoading={featuredLoading}
              />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">N</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Powered by The Guardian API
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Newsfeed. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
