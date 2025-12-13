import { Article } from "@/types/news";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight, Bookmark } from "lucide-react";

interface FeaturedArticleProps {
  article: Article;
  isBookmarked?: boolean;
  onToggleBookmark?: (article: Article) => void;
}

const FeaturedArticle = ({ article, isBookmarked = false, onToggleBookmark }: FeaturedArticleProps) => {
  const timeAgo = formatDistanceToNow(new Date(article.webPublicationDate), {
    addSuffix: true,
  });

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleBookmark?.(article);
  };

  return (
    <a
      href={article.webUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-3xl bg-card aspect-[16/9] md:aspect-[21/9] hover-lift"
    >
      {article.fields?.thumbnail ? (
        <img
          src={article.fields.thumbnail}
          alt={article.webTitle}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      {onToggleBookmark && (
        <button
          onClick={handleBookmarkClick}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <Bookmark 
            className={`w-5 h-5 transition-colors ${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-primary'}`} 
          />
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
            {article.sectionName}
          </span>
          <span className="text-sm text-muted-foreground">{timeAgo}</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-serif font-semibold leading-tight mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
          {article.fields?.headline || article.webTitle}
        </h2>

        {article.fields?.trailText && (
          <p
            className="text-muted-foreground text-sm md:text-base line-clamp-2 max-w-3xl"
            dangerouslySetInnerHTML={{ __html: article.fields.trailText }}
          />
        )}

        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground group-hover:text-primary transition-colors">
          <span>Read article</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
};

export default FeaturedArticle;