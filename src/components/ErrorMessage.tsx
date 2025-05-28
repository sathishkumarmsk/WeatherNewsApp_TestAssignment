import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props: { theme: { spacing: { xl: any; }; }; }) => props.theme.spacing.xl}px;
  min-height: 120px;
`;

const ErrorIconContainer = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${(props: { theme: { colors: { error: any; }; }; }) => props.theme.colors.error}20;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
`;

const ErrorText = styled.Text`
  color: ${(props: { theme: { colors: { error: any; }; }; }) => props.theme.colors.error};
  font-size: ${(props: { theme: { fontSize: { medium: any; }; }; }) => props.theme.fontSize.medium}px;
  text-align: center;
  margin-bottom: ${(props: { theme: { spacing: { lg: any; }; }; }) => props.theme.spacing.lg}px;
  line-height: 22px;
  max-width: 280px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: ${(props: { theme: { colors: { primary: any; }; }; }) => props.theme.colors.primary};
  padding: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px ${(props: { theme: { spacing: { lg: any; }; }; }) => props.theme.spacing.lg}px;
  border-radius: ${(props: { theme: { borderRadius: any; }; }) => props.theme.borderRadius}px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const RetryButtonText = styled.Text`
  color: ${(props: { theme: { colors: { white: any; }; }; }) => props.theme.colors.white};
  font-weight: bold;
  font-size: ${(props: { theme: { fontSize: { medium: any; }; }; }) => props.theme.fontSize.medium}px;
  margin-left: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
`;

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <Container>
      <ErrorIconContainer>
        <Ionicons name="alert-circle-outline" size={32} color="#FF3B30" />
      </ErrorIconContainer>
      
      <ErrorText>{message}</ErrorText>
      
      <RetryButton onPress={onRetry}>
        <Ionicons name="refresh-outline" size={20} color="#FFFFFF" />
        <RetryButtonText>Try Again</RetryButtonText>
      </RetryButton>
    </Container>
  );
};

export default ErrorMessage;