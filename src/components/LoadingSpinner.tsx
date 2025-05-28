import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props: { theme: { spacing: { xl: any; }; }; }) => props.theme.spacing.xl}px;
  min-height: 120px;
`;

const LoadingText = styled.Text`
  margin-top: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
  color: ${(props: { theme: { colors: { textSecondary: any; }; }; }) => props.theme.colors.textSecondary};
  font-size: ${(props: { theme: { fontSize: { medium: any; }; }; }) => props.theme.fontSize.medium}px;
  text-align: center;
`;

const IconContainer = styled.View`
  margin-bottom: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
`;

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'large';
  showIcon?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Loading...',
  size = 'large',
  showIcon = false,
}) => {
  return (
    <Container>
      {showIcon && (
        <IconContainer>
          <Ionicons name="refresh-outline" size={32} color="#007AFF" />
        </IconContainer>
      )}
      <ActivityIndicator size={size} color="#007AFF" />
      <LoadingText>{text}</LoadingText>
    </Container>
  );
};

export default LoadingSpinner;