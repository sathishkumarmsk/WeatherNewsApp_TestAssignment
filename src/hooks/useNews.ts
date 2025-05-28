import { useState, useEffect, useCallback } from 'react';
import { NewsArticle, ApiResponse } from '../types';
import { NewsService } from '../services/newsService';
import { CacheService } from '../services/cacheService';

export const useNews = () => {
  const [newsData, setNewsData] = useState<ApiResponse<NewsArticle[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchNews = useCallback(async () => {
    try {
      setNewsData(prev => ({ ...prev, loading: true, error: null }));

      const cachedData = await CacheService.getNewsCache<NewsArticle[]>();
      if (cachedData && cachedData.length > 0) {
        setNewsData({
          data: cachedData,
          loading: false,
          error: null,
        });
        return;
      }

      const articles = await NewsService.getTopHeadlines();

      await CacheService.setNewsCache(articles);

      setNewsData({
        data: articles,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('News fetch error:', error);
      setNewsData({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }, []);

  const searchNews = useCallback(async (query: string) => {
    try {
      setNewsData(prev => ({ ...prev, loading: true, error: null }));

      const articles = await NewsService.searchNews(query);

      setNewsData({
        data: articles,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('News search error:', error);
      setNewsData({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    ...newsData,
    refetch: fetchNews,
    searchNews,
  };
};