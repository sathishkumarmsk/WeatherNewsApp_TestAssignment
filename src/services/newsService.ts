import { NewsArticle } from '../types';

const API_KEY = '9937dd9494374a39a8a30ab1d8f9c327';
const BASE_URL = 'https://newsapi.org/v2';

export class NewsService {
  static async getTopHeadlines(country: string = 'us'): Promise<NewsArticle[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/top-headlines?country=${country}&apiKey=${API_KEY}&pageSize=20`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your News API configuration.');
        }
        if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please try again later.');
        }
        throw new Error(`News API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'error') {
        throw new Error(data.message || 'Failed to fetch news');
      }

      return data.articles
        .filter((article: any) => article.title && article.title !== '[Removed]')
        .map((article: any, index: number) => ({
          id: `${article.url}-${index}`,
          title: article.title,
          description: article.description || '',
          url: article.url,
          urlToImage: article.urlToImage || '',
          publishedAt: article.publishedAt,
          source: {
            name: article.source.name,
          },
          author: article.author,
          content: article.content,
        }));
    } catch (error) {
      console.error('Error fetching news data:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch news data. Please check your internet connection.');
    }
  }

  static async searchNews(query: string): Promise<NewsArticle[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&sortBy=publishedAt&pageSize=20`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your News API configuration.');
        }
        if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please try again later.');
        }
        throw new Error(`News API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'error') {
        throw new Error(data.message || 'Failed to search news');
      }

      return data.articles
        .filter((article: any) => article.title && article.title !== '[Removed]')
        .map((article: any, index: number) => ({
          id: `${article.url}-${index}`,
          title: article.title,
          description: article.description || '',
          url: article.url,
          urlToImage: article.urlToImage || '',
          publishedAt: article.publishedAt,
          source: {
            name: article.source.name,
          },
          author: article.author,
          content: article.content,
        }));
    } catch (error) {
      console.error('Error searching news:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to search news');
    }
  }
}