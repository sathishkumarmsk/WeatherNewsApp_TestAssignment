import AsyncStorage from '@react-native-async-storage/async-storage';

export class CacheService {
  private static readonly CACHE_EXPIRY = 5 * 60 * 1000; 
  private static readonly WEATHER_CACHE_KEY = 'weather_data';
  private static readonly NEWS_CACHE_KEY = 'news_data';

  static async setCache<T>(key: string, data: T): Promise<void> {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }

  static async getCache<T>(key: string): Promise<T | null> {
    try {
      const cachedData = await AsyncStorage.getItem(key);
      if (!cachedData) {
        return null;
      }

      const { data, timestamp } = JSON.parse(cachedData);
      const isExpired = Date.now() - timestamp > this.CACHE_EXPIRY;

      if (isExpired) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting cache:', error);
      return null;
    }
  }

  static async clearCache(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  static async clearExpiredCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const now = Date.now();

      for (const key of keys) {
        try {
          const cachedData = await AsyncStorage.getItem(key);
          if (cachedData) {
            const { timestamp } = JSON.parse(cachedData);
            if (now - timestamp > this.CACHE_EXPIRY) {
              await AsyncStorage.removeItem(key);
            }
          }
        } catch (error) {
          await AsyncStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('Error clearing expired cache:', error);
    }
  }

  static async setWeatherCache<T>(data: T): Promise<void> {
    return this.setCache(this.WEATHER_CACHE_KEY, data);
  }

  static async getWeatherCache<T>(): Promise<T | null> {
    return this.getCache<T>(this.WEATHER_CACHE_KEY);
  }

  static async setNewsCache<T>(data: T): Promise<void> {
    return this.setCache(this.NEWS_CACHE_KEY, data);
  }

  static async getNewsCache<T>(): Promise<T | null> {
    return this.getCache<T>(this.NEWS_CACHE_KEY);
  }
}