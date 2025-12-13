import { useQuery } from "@tanstack/react-query";
import { Article, GuardianResponse } from "@/types/news";

const API_KEY = "test"; // The Guardian provides a test key for development
const BASE_URL = "https://content.guardianapis.com";

export const useGuardianNews = (
  category: string = "",
  searchQuery: string = ""
) => {
  return useQuery({
    queryKey: ["guardian-news", category, searchQuery],
    queryFn: async (): Promise<Article[]> => {
      let url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=thumbnail,trailText,headline,standfirst&page-size=20`;

      if (category && category !== "all") {
        url += `&section=${category}`;
      }

      if (searchQuery) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url);
      const data: GuardianResponse = await response.json();

      if (data.response.status !== "ok") {
        throw new Error("Failed to fetch news");
      }

      return data.response.results;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedNews = () => {
  return useQuery({
    queryKey: ["guardian-featured"],
    queryFn: async (): Promise<Article[]> => {
      const url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=thumbnail,trailText,headline,standfirst&page-size=5&order-by=relevance&show-editors-picks=true`;

      const response = await fetch(url);
      const data: GuardianResponse = await response.json();

      if (data.response.status !== "ok") {
        throw new Error("Failed to fetch featured news");
      }

      return data.response.results;
    },
    staleTime: 5 * 60 * 1000,
  });
};
