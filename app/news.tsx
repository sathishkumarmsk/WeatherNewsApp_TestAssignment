import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, RefreshControl, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import ErrorMessage from '../src/components/ErrorMessage';
import LoadingSpinner from '../src/components/LoadingSpinner';
import NewsCard from '../src/components/NewsCard';
import { useNews } from '../src/hooks/useNews';
import { NewsArticle } from '../src/types';

const Container = styled.View`
  flex: 1;
  background-color: ${(props: { theme: { colors: { background: any; }; }; }) => props.theme.colors.background};
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props: { theme: { spacing: { xl: any; }; }; }) => props.theme.spacing.xl}px;
`;

const EmptyText = styled.Text`
  color: ${(props: { theme: { colors: { textSecondary: any; }; }; }) => props.theme.colors.textSecondary};
  font-size: ${(props: { theme: { fontSize: { medium: any; }; }; }) => props.theme.fontSize.medium}px;
  text-align: center;
`;

const HeaderContainer = styled.View`
  padding: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
  background-color: ${(props: { theme: { colors: { surface: any; }; }; }) => props.theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${(props: { theme: { colors: { border: any; }; }; }) => props.theme.colors.border};
`;

const HeaderText = styled.Text`
  font-size: ${(props: { theme: { fontSize: { large: any; }; }; }) => props.theme.fontSize.large}px;
  font-weight: bold;
  color: ${(props: { theme: { colors: { text: any; }; }; }) => props.theme.colors.text};
  text-align: center;
`;

const HeaderSubtext = styled.Text`
  font-size: ${(props: { theme: { fontSize: { small: number; }; }; }) => props.theme.fontSize.small + 2}px;
  color: ${(props: { theme: { colors: { textSecondary: any; }; }; }) => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${(props: { theme: { spacing: { xs: any; }; }; }) => props.theme.spacing.xs}px;
`;

export default function NewsScreen() {
  const { data, loading, error, refetch } = useNews();
  const colorScheme = useColorScheme();

  const renderNewsItem = ({ item }: { item: NewsArticle }) => (
    <NewsCard article={item} />
  );

  const renderEmptyComponent = () => (
    <EmptyContainer>
      <EmptyText>No news articles available</EmptyText>
    </EmptyContainer>
  );

  const renderHeader = () => (
    <HeaderContainer>
      <HeaderText>Latest Headlines</HeaderText>
      <HeaderSubtext>
        {data ? `${data.length} articles` : 'Loading articles...'}
      </HeaderSubtext>
    </HeaderContainer>
  );

  if (loading && !data) {
    return (
      <Container>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        {renderHeader()}
        <LoadingSpinner text="Loading news..." />
      </Container>
    );
  }

  if (error && !data) {
    return (
      <Container>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        {renderHeader()}
        <ErrorMessage message={error} onRetry={refetch} />
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <FlatList
        data={data || []}
        renderItem={renderNewsItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
}