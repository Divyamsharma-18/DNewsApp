import { Article } from "@/types/news";
import { formatDistanceToNow } from "date-fns";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact";
}

const ArticleCard = ({ article, variant = "default" }: ArticleCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(article.webPublicationDate), {
    addSuffix: true,
  });

  if (variant === "compact") {
    return (
      <a
        href={article.webUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex gap-4 p-4 rounded-2xl bg-card/50 hover:bg-card border border-border/30 hover:border-border/60 transition-all duration-300"
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
      </a>
    );
  }

  return (
    <a
      href={article.webUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card hover-lift"
    >
      {article.fields?.thumbnail && (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={article.fields.thumbnail}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

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
