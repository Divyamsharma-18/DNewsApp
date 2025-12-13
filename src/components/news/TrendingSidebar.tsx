import { Article } from "@/types/news";
import ArticleCard from "./ArticleCard";
import { TrendingUp } from "lucide-react";

interface TrendingSidebarProps {
  articles: Article[];
  isLoading: boolean;
}

const TrendingSidebar = ({ articles, isLoading }: TrendingSidebarProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-serif font-medium">Trending Now</h3>
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse flex gap-4 p-4 rounded-2xl bg-card/50">
            <div className="w-20 h-20 bg-secondary rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-16 bg-secondary rounded" />
              <div className="h-4 bg-secondary rounded" />
              <div className="h-4 bg-secondary rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-serif font-medium">Trending Now</h3>
      </div>
      {articles.slice(0, 5).map((article, index) => (
        <div
          key={article.id}
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
        >
          <ArticleCard article={article} variant="compact" />
        </div>
      ))}
    </div>
  );
};

export default TrendingSidebar;
