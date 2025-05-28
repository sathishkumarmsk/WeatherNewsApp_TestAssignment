import React from 'react';
import { Linking, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { NewsArticle } from '../types';

const Card = styled.View`
  background-color: ${(props: { theme: { colors: { surface: any; }; }; }) => props.theme.colors.surface};
  border-radius: ${(props: { theme: { borderRadius: any; }; }) => props.theme.borderRadius}px;
  margin: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.12;
  shadow-radius: 5px;
  elevation: 6;
  overflow: hidden;
`;

const ImageContainer = styled.View`
  position: relative;
`;

const NewsImage = styled(Image)`
  width: 100%;
  height: 200px;
  background-color: ${(props: { theme: { colors: { background: any; }; }; }) => props.theme.colors.background};
`;

const ImagePlaceholder = styled.View`
  width: 100%;
  height: 200px;
  background-color: ${(props: { theme: { colors: { border: any; }; }; }) => props.theme.colors.border};
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  padding: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: ${(props: { theme: { fontSize: { medium: any; }; }; }) => props.theme.fontSize.medium}px;
  font-weight: bold;
  color: ${(props: { theme: { colors: { text: any; }; }; }) => props.theme.colors.text};
  margin-bottom: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
  line-height: 22px;
`;

const Description = styled.Text`
  font-size: ${(props: { theme: { fontSize: { small: number; }; }; }) => props.theme.fontSize.small + 2}px;
  color: ${(props: { theme: { colors: { textSecondary: any; }; }; }) => props.theme.colors.textSecondary};
  margin-bottom: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
  line-height: 20px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
  padding-top: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${(props: { theme: { colors: { border: any; }; }; }) => props.theme.colors.border};
`;

const SourceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Source = styled.Text`
  font-size: ${(props: { theme: { fontSize: string; }; }) => props.theme.fontSize.small}px;
  color: ${(props: { theme: { colors: { primary: any; }; }; }) => props.theme.colors.primary};
  font-weight: 600;
  margin-left: ${(props: { theme: { spacing: { xs: any; }; }; }) => props.theme.spacing.xs}px;
`;

const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Date = styled.Text`
  font-size: ${(props: { theme: { fontSize: string; }; }) => props.theme.fontSize.small}px;
  color: ${(props: { theme: { colors: { textSecondary: any; }; }; }) => props.theme.colors.textSecondary};
  margin-left: ${(props: { theme: { spacing: { xs: any; }; }; }) => props.theme.spacing.xs}px;
`;

const AuthorText = styled.Text`
  font-size: ${(props: { theme: { fontSize: string; }; }) => props.theme.fontSize.small}px;
  color: ${(props: { theme: { colors: { textSecondary: any; }; }; }) => props.theme.colors.textSecondary};
  font-style: italic;
  margin-top: ${(props: { theme: { spacing: { xs: any; }; }; }) => props.theme.spacing.xs}px;
`;

const ReadMoreContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
`;

const ReadMoreText = styled.Text`
  font-size: ${(props: { theme: { fontSize: string; }; }) => props.theme.fontSize.small}px;
  color: ${(props: { theme: { colors: { primary: any; }; }; }) => props.theme.colors.primary};
  font-weight: 600;
  margin-left: ${(props: { theme: { spacing: { xs: any; }; }; }) => props.theme.spacing.xs}px;
`;

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const handlePress = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffHours < 1) {
        return 'Just now';
      } else if (diffHours < 24) {
        return `${diffHours}h ago`;
      } else if (diffDays < 7) {
        return `${diffDays}d ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
      }
    } catch (error) {
      return 'Recently';
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card>
        <ImageContainer>
          {article.urlToImage ? (
            <NewsImage
              source={{ uri: article.urlToImage }}
              resizeMode="cover"
            />
          ) : (
            <ImagePlaceholder>
              <Ionicons 
                name="image-outline" 
                size={48} 
                color="#8E8E93" 
              />
            </ImagePlaceholder>
          )}
        </ImageContainer>
        
        <Content>
          <Title numberOfLines={3}>{article.title}</Title>
          
          {article.description && (
            <Description numberOfLines={3}>{article.description}</Description>
          )}
          
          {article.author && (
            <AuthorText numberOfLines={1}>By {article.author}</AuthorText>
          )}
          
          <Footer>
            <SourceContainer>
              <Ionicons name="newspaper-outline" size={14} color="#007AFF" />
              <Source numberOfLines={1}>{article.source.name}</Source>
            </SourceContainer>
            
            <DateContainer>
              <Ionicons name="time-outline" size={14} color="#8E8E93" />
              <Date>{formatDate(article.publishedAt)}</Date>
            </DateContainer>
          </Footer>
          
          <ReadMoreContainer>
            <ReadMoreText>Read more</ReadMoreText>
            <Ionicons name="chevron-forward" size={14} color="#007AFF" />
          </ReadMoreContainer>
        </Content>
      </Card>
    </TouchableOpacity>
  );
};

export default NewsCard;