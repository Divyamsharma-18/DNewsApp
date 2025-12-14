import { Article } from "@/types/news";
import { formatDistanceToNow } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { ArrowUpRight, Bookmark, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeaturedArticleProps {
  article: Article;
  isBookmarked?: boolean;
  onToggleBookmark?: (article: Article) => void;
}

const FeaturedArticle = ({ article, isBookmarked = false, onToggleBookmark }: FeaturedArticleProps) => {
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

      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={handleShare}
          className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
        </button>
        {onToggleBookmark && (
          <button
            onClick={handleBookmarkClick}
            className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Bookmark 
              className={`w-5 h-5 transition-colors ${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-primary'}`} 
            />
          </button>
        )}
      </div>

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
          <span>{t.readMore}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
};
export default FeaturedArticle;