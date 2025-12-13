import { useState, useEffect, useCallback } from "react";
import { Article } from "@/types/news";

const BOOKMARKS_KEY = "newsfeed-bookmarks";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Article[]>(() => {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = useCallback((article: Article) => {
    setBookmarks((prev) => {
      if (prev.some((a) => a.id === article.id)) return prev;
      return [article, ...prev];
    });
  }, []);

  const removeBookmark = useCallback((articleId: string) => {
    setBookmarks((prev) => prev.filter((a) => a.id !== articleId));
  }, []);

  const toggleBookmark = useCallback((article: Article) => {
    setBookmarks((prev) => {
      if (prev.some((a) => a.id === article.id)) {
        return prev.filter((a) => a.id !== article.id);
      }
      return [article, ...prev];
    });
  }, []);

  const isBookmarked = useCallback(
    (articleId: string) => bookmarks.some((a) => a.id === articleId),
    [bookmarks]
  );

  return { bookmarks, addBookmark, removeBookmark, toggleBookmark, isBookmarked };
};