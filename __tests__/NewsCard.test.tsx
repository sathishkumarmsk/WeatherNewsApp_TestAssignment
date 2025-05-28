import React from 'react';
import { render } from '@testing-library/react-native';
import NewsCard from '../src/components/NewsCard';
import { NewsArticle } from '../src/types';

// Mock the Linking module
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  return {
    ...rn,
    Linking: {
      ...rn.Linking,
      openURL: jest.fn(),
    },
  };
});

const mockNewsArticle = {
  id: '1',
  title: 'Test News Article',
  description: 'This is a test news article description',
  url: 'https://example.com/article',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: '2024-01-15T10:30:00Z',
  source: {
    name: 'Test Source',
  },
  author: 'John Doe',
  content: 'Full article content...',
} as NewsArticle;

describe('NewsCard', () => {
  it('renders basic news article information', () => {
    const { getByText } = render(<NewsCard article={mockNewsArticle} />);
    
    // Test that the basic information is rendered
    expect(getByText('Test News Article')).toBeTruthy();
  });
});