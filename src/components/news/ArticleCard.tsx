import { Article } from "@/types/news";
import { formatDistanceToNow } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { Bookmark, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact";
  isBookmarked?: boolean;
  onToggleBookmark?: (article: Article) => void;
}

const ArticleCard = ({ 
  article, 
  variant = "default",
  isBookmarked = false,
  onToggleBookmark 
}: ArticleCardProps) => {
  const { language, t } = useLanguage();
  const timeAgo = formatDistanceToNow(new Date(article.webPublicationDate), {
    addSuffix: true,
    locale: language === "de" ? de : enUS,
  });

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleBookmark?.(article);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareData = {
      title: article.webTitle,
      url: article.webUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(article.webUrl);
        toast.success(t.linkCopied);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        await navigator.clipboard.writeText(article.webUrl);
        toast.success(t.linkCopied);
      }
    }
  };

  if (variant === "compact") {
    return (
      <a
        href={article.webUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex gap-4 p-4 rounded-2xl bg-card/50 hover:bg-card border border-border/30 hover:border-border/60 transition-all duration-300 relative"
      >
        {article.fields?.thumbnail && (
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={article.fields.thumbnail}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-xs text-primary font-medium">
            {article.sectionName}
          </span>
          <h3 className="text-sm font-medium leading-snug mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {article.webTitle}
          </h3>
          <span className="text-xs text-muted-foreground mt-2 block">
            {timeAgo}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
          </button>
          {onToggleBookmark && (
            <button
              onClick={handleBookmarkClick}
              className="p-1.5 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Bookmark 
                className={`w-4 h-4 transition-colors ${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-primary'}`} 
              />
            </button>
          )}
        </div>
      </a>
    );
  }

  return (
    <a
      href={article.webUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card hover-lift group relative"
    >
      <div className="relative">
        {article.fields?.thumbnail && (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={article.fields.thumbnail}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          </button>
          {onToggleBookmark && (
            <button
              onClick={handleBookmarkClick}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Bookmark 
                className={`w-5 h-5 transition-colors ${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-primary'}`} 
              />
            </button>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-primary">
            {article.sectionName}
          </span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>

        <h3 className="text-lg font-serif font-medium leading-snug line-clamp-3 group-hover:text-primary transition-colors duration-300">
          {article.fields?.headline || article.webTitle}
        </h3>

        {article.fields?.trailText && (
          <p
            className="text-sm text-muted-foreground mt-3 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: article.fields.trailText }}
          />
        )}
      </div>
    </a>
  );
};

export default ArticleCard;