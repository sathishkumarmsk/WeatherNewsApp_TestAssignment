import { useState, useEffect, useCallback } from 'react';
import { WeatherData, ApiResponse } from '../types';
import { WeatherService } from '../services/weatherService';
import { LocationService } from '../services/locationService';
import { CacheService } from '../services/cacheService';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<ApiResponse<WeatherData>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchWeatherByLocation = useCallback(async () => {
    try {
      setWeatherData(prev => ({ ...prev, loading: true, error: null }));
      const cachedData = await CacheService.getWeatherCache<WeatherData>();
      if (cachedData) {
        setWeatherData({
          data: cachedData,
          loading: false,
          error: null,
        });
        return;
      }


      const isLocationEnabled = await LocationService.isLocationEnabled();
      if (!isLocationEnabled) {
        throw new Error('Location services are disabled. Please enable them in your device settings.');
      }

      const location = await LocationService.getCurrentLocation();
      const weather = await WeatherService.getCurrentWeather(location);

      await CacheService.setWeatherCache(weather);

      setWeatherData({
        data: weather,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Weather fetch error:', error);
      setWeatherData({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }, []);

  const fetchWeatherByCity = useCallback(async (city: string) => {
    try {
      setWeatherData(prev => ({ ...prev, loading: true, error: null }));

      const weather = await WeatherService.getWeatherByCity(city);

      setWeatherData({
        data: weather,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Weather by city fetch error:', error);
      setWeatherData({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }, []);

  useEffect(() => {
    fetchWeatherByLocation();
  }, [fetchWeatherByLocation]);

  return {
    ...weatherData,
    refetch: fetchWeatherByLocation,
    fetchByCity: fetchWeatherByCity,
  };
};