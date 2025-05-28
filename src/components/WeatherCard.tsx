import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { WeatherData } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Card = styled.View`
  background-color: ${(props: { theme: { colors: { surface: any; }; }; }) => props.theme.colors.surface};
  border-radius: ${(props: { theme: { borderRadius: any; }; }) => props.theme.borderRadius}px;
  padding: ${(props: { theme: { spacing: { lg: any; }; }; }) => props.theme.spacing.lg}px;
  margin: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 8;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
`;

const Location = styled.Text`
  font-size: ${(props: { theme: { fontSize: { large: any; }; }; }) => props.theme.fontSize.large}px;
  font-weight: bold;
  color: ${(props: { theme: { colors: { text: any; }; }; }) => props.theme.colors.text};
  flex: 1;
`;

const MainWeatherContainer = styled.View`
  align-items: center;
  margin-bottom: ${(props: { theme: { spacing: { lg: any; }; }; }) => props.theme.spacing.lg}px;
`;

const Temperature = styled.Text`
  font-size: 56px;
  font-weight: bold;
  color: ${(props: { theme: { colors: { primary: any; }; }; }) => props.theme.colors.primary};
  text-align: center;
`;

const Description = styled.Text`
  font-size: ${(props: { theme: { fontSize: { medium: any; }; }; }) => props.theme.fontSize.medium}px;
  color: ${(props: { theme: { colors: { textSecondary: any; }; }; }) => props.theme.colors.textSecondary};
  text-align: center;
  text-transform: capitalize;
  margin-top: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
`;

const FeelsLikeContainer = styled.View`
  margin-top: ${(props: { theme: { spacing: { sm: any; }; }; }) => props.theme.spacing.sm}px;
  align-items: center;
`;

const FeelsLikeText = styled.Text`
  font-size: ${(props: { theme: { fontSize: { small: number; }; }; }) => props.theme.fontSize.small + 2}px;
  color: ${(props: { theme: { colors: { textSecondary: any; }; }; }) => props.theme.colors.textSecondary};
`;

const DetailsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${(props: { theme: { spacing: { lg: any; }; }; }) => props.theme.spacing.lg}px;
  padding-top: ${(props: { theme: { spacing: { md: any; }; }; }) => props.theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${(props: { theme: { colors: { border: any; }; }; }) => props.theme.colors.border};
`;

const DetailItem = styled.View`
  align-items: center;
  flex: 1;
`;

const DetailIcon = styled.View`
  margin-bottom: ${(props: { theme: { spacing: { xs: any; }; }; }) => props.theme.spacing.xs}px;
`;

const DetailLabel = styled.Text`
  font-size: ${(props: { theme: { fontSize: string; }; }) => props.theme.fontSize.small}px;
  color: ${(props: { theme: { colors: { textSecondary: any; }; }; }) => props.theme.colors.textSecondary};
  margin-bottom: ${(props: { theme: { spacing: { xs: any; }; }; }) => props.theme.spacing.xs}px;
  text-align: center;
`;

const DetailValue = styled.Text`
  font-size: ${(props: { theme: { fontSize: { medium: any; }; }; }) => props.theme.fontSize.medium}px;
  font-weight: bold;
  color: ${(props: { theme: { colors: { text: any; }; }; }) => props.theme.colors.text};
  text-align: center;
`;

interface WeatherCardProps {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  loading,
  error,
  onRefresh,
}) => {
  if (loading) {
    return (
      <Card>
        <LoadingSpinner />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <ErrorMessage message={error} onRetry={onRefresh} />
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear') || desc.includes('sunny')) return 'sunny';
    if (desc.includes('cloud')) return 'cloudy';
    if (desc.includes('rain')) return 'rainy';
    if (desc.includes('snow')) return 'snow';
    if (desc.includes('thunder')) return 'thunderstorm';
    if (desc.includes('mist') || desc.includes('fog')) return 'cloudy';
    return 'partly-sunny';
  };

  return (
    <Card>
      <Header>
        <Location numberOfLines={2}>{data.location}</Location>
        <Ionicons 
          name={getWeatherIcon(data.description)} 
          size={32} 
          color="#FFA500" 
        />
      </Header>

      <MainWeatherContainer>
        <Temperature>{data.temperature}°C</Temperature>
        <Description>{data.description}</Description>
        <FeelsLikeContainer>
          <FeelsLikeText>Feels like {data.feelsLike}°C</FeelsLikeText>
        </FeelsLikeContainer>
      </MainWeatherContainer>

      <DetailsContainer>
        <DetailItem>
          <DetailIcon>
            <Ionicons name="water" size={20} color="#007AFF" />
          </DetailIcon>
          <DetailLabel>Humidity</DetailLabel>
          <DetailValue>{data.humidity}%</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailIcon>
            <Ionicons name="speedometer" size={20} color="#007AFF" />
          </DetailIcon>
          <DetailLabel>Wind Speed</DetailLabel>
          <DetailValue>{data.windSpeed} m/s</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailIcon>
            <Ionicons name="eye" size={20} color="#007AFF" />
          </DetailIcon>
          <DetailLabel>Visibility</DetailLabel>
          <DetailValue>{data.visibility} km</DetailValue>
        </DetailItem>
      </DetailsContainer>
    </Card>
  );
};

export default WeatherCard;