import AsyncStorage from '@react-native-async-storage/async-storage';
import { CacheService } from '../src/services/cacheService';

describe('CacheService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set cache data correctly', async () => {
    const testData = { test: 'data' };
    const key = 'test_key';

    await CacheService.setCache(key, testData);

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('should return null for non-existent cache', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const result = await CacheService.getCache('non_existent_key');

    expect(result).toBeNull();
  });
});