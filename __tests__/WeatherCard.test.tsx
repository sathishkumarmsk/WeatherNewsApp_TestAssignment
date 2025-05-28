import { render } from '@testing-library/react-native';
import React from 'react';
import WeatherCard from '../src/components/WeatherCard';

jest.mock('../src/components/LoadingSpinner', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: ({ text = 'Loading...' }) => <Text>{text}</Text>,
  };
});

jest.mock('../src/components/ErrorMessage', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');
  return {
    __esModule: true,
    default: ({ message, onRetry }) => (
      <>
        <Text>{message}</Text>
        <TouchableOpacity onPress={onRetry}>
          <Text>Try Again</Text>
        </TouchableOpacity>
      </>
    ),
  };
});

describe('WeatherCard', () => {
  const mockOnRefresh = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    const { getByText } = render(
      <WeatherCard
        data={null}
        loading={true}
        error={null}
        onRefresh={mockOnRefresh}
      />
    );
    
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders error state correctly', () => {
    const errorMessage = 'Failed to fetch weather data';
    const { getByText } = render(
      <WeatherCard
        data={null}
        loading={false}
        error={errorMessage}
        onRefresh={mockOnRefresh}
      />
    );
    
    expect(getByText(errorMessage)).toBeTruthy();
    expect(getByText('Try Again')).toBeTruthy();
  });
});