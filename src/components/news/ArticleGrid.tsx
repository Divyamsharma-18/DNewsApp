import { Article } from "@/types/news";
import ArticleCard from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
  isLoading: boolean;
  isBookmarked?: (id: string) => boolean;
  onToggleBookmark?: (article: Article) => void;
  columns?: 3 | 4;
}

const ArticleSkeleton = () => (
  <div className="article-card animate-pulse">
    <div className="aspect-[16/10] bg-secondary" />
    <div className="p-5 space-y-3">
      <div className="flex gap-2">
        <div className="h-3 w-16 bg-secondary rounded" />
        <div className="h-3 w-20 bg-secondary rounded" />
      </div>
      <div className="h-5 bg-secondary rounded w-full" />
      <div className="h-5 bg-secondary rounded w-3/4" />
      <div className="h-4 bg-secondary rounded w-full mt-2" />
      <div className="h-4 bg-secondary rounded w-2/3" />
    </div>
  </div>
);

// const ArticleGrid = ({ articles, isLoading, isBookmarked, onToggleBookmark }: ArticleGridProps) => {
//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Array.from({ length: 6 }).map((_, i) => (
const ArticleGrid = ({ articles, isLoading, isBookmarked, onToggleBookmark, columns = 3 }: ArticleGridProps) => {
  const gridClass = columns === 4 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  if (isLoading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: columns === 4 ? 8 : 6 }).map((_, i) => (
          <ArticleSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center pt-20 sm:pt-36">
        <p className="text-muted-foreground text-lg">No articles found</p>
        <p className="text-muted-foreground/70 text-sm mt-2">
          Try adjusting your search or category
        </p>
      </div>
    );
  }

  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className={gridClass}>
      {articles.map((article, index) => (
        <div
          key={article.id}
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
        >
          <ArticleCard 
            article={article} 
            isBookmarked={isBookmarked?.(article.id)}
            onToggleBookmark={onToggleBookmark}
          />
        </div>
      ))}
    </div>
  );
};

export default ArticleGrid;