import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import WeatherCard from '../src/components/WeatherCard';
import { useTheme } from '../src/hooks/useTheme';
import { useWeather } from '../src/hooks/useWeather';

const Container = styled.View`
  flex: 1;
  background-color: ${(props: { theme: { colors: { background: any; }; }; }) => props.theme.colors.background};
`;

const ButtonContainer = styled.View`
  padding: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
  gap: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props: { theme: { colors: { primary: any; }; }; }) => props.theme.colors.primary};
  padding: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
  border-radius: ${(props: { theme: { borderRadius: any; }; }) => props.theme.borderRadius}px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const ButtonText = styled.Text`
  color: ${(props: { theme: { colors: { white: any; }; }; }) => props.theme.colors.white};
  font-size: ${(props: { theme: { fontSize: { medium: any; }; }; }) => props.theme.fontSize.medium}px;
  font-weight: bold;
  margin-left: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
`;

const ThemeButton = styled.TouchableOpacity`
  background-color: ${(props: { theme: { colors: { secondary: any; }; }; }) => props.theme.colors.secondary};
  padding: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
  border-radius: ${(props: { theme: { borderRadius: any; }; }) => props.theme.borderRadius}px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const HeaderContainer = styled.View`
  padding: ${(props: { theme: { spacing: { lg: any; }; }; }) => props.theme.spacing.lg}px;
  align-items: center;
  background-color: ${(props: { theme: { colors: { surface: any; }; }; }) => props.theme.colors.surface};
  margin: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
  border-radius: ${(props: { theme: { borderRadius: any; }; }) => props.theme.borderRadius}px;
`;

const AppTitle = styled.Text`
  font-size: ${(props: { theme: { fontSize: { xlarge: any; }; }; }) => props.theme.fontSize.xlarge}px;
  font-weight: bold;
  color: ${(props: { theme: { colors: { text: any; }; }; }) => props.theme.colors.text};
  margin-bottom: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
`;

const AppSubtitle = styled.Text`
  font-size: ${(props: { theme: { fontSize: { medium: any; }; }; }) => props.theme.fontSize.medium}px;
  color: ${(props: { theme: { colors: { textSecondary: any; }; }; }) => props.theme.colors.textSecondary};
  text-align: center;
`;

export default function HomeScreen() {
  const { data, loading, error, refetch } = useWeather();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleViewNews = () => {
    router.push('/news');
  };

  return (
    <Container>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        <HeaderContainer>
          <AppTitle>Weather & News</AppTitle>
          <AppSubtitle>Stay updated with weather and latest news</AppSubtitle>
        </HeaderContainer>

        <WeatherCard
          data={data}
          loading={loading}
          error={error}
          onRefresh={refetch}
        />

        <ButtonContainer>
          <Button onPress={handleViewNews}>
            <Ionicons name="newspaper-outline" size={24} color="#FFFFFF" />
            <ButtonText>View Latest News</ButtonText>
          </Button>

          <ThemeButton onPress={toggleTheme}>
            <Ionicons
              name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
              size={24}
              color="#FFFFFF"
            />
            <ButtonText>
              Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
            </ButtonText>
          </ThemeButton>
        </ButtonContainer>
      </ScrollView>
    </Container>
  );
}