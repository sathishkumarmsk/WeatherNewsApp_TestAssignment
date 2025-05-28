
jest.mock('expo-linking', () => ({
    createURL: jest.fn(),
    openURL: jest.fn(),
  }));
  
  jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
    getCurrentPositionAsync: jest.fn().mockResolvedValue({
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    }),
    hasServicesEnabledAsync: jest.fn().mockResolvedValue(true),
    Accuracy: {
      Balanced: 3,
    },
  }));
  
  jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
  }));
  
  // Mock the Ionicons component
  jest.mock('@expo/vector-icons', () => ({
    Ionicons: ({ name, size, color, ...props }) => {
      const React = require('react');
      const { Text } = require('react-native');
      return React.createElement(Text, { ...props, testID: `icon-${name}` }, `Icon-${name}`);
    },
  }));
  
  // Mock the useColorScheme hook and other React Native modules
  jest.mock('react-native', () => {
    const reactNative = jest.requireActual('react-native');
    return {
      ...reactNative,
      useColorScheme: jest.fn(() => 'light'),
      Linking: {
        ...reactNative.Linking,
        openURL: jest.fn(),
        canOpenURL: jest.fn().mockResolvedValue(true),
      },
      // Mock Animated to avoid NativeAnimatedHelper issues
      Animated: {
        ...reactNative.Animated,
        timing: () => ({
          start: jest.fn(),
        }),
        spring: () => ({
          start: jest.fn(),
        }),
        Value: jest.fn(() => ({
          interpolate: jest.fn(),
          setValue: jest.fn(),
        })),
      },
    };
  });
  
  // Mock expo-router
  jest.mock('expo-router', () => ({
    router: {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    },
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    Stack: {
      Screen: 'Screen',
    },
  }));
  
  // Mock expo-status-bar
  jest.mock('expo-status-bar', () => ({
    StatusBar: 'StatusBar',
  }));
  
  // Mock styled-components
  jest.mock('styled-components/native', () => {
    const React = require('react');
    const { View, Text, TouchableOpacity, Image } = require('react-native');
    
    // Create a basic theme for testing
    const theme = {
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
        background: '#FFFFFF',
        surface: '#F2F2F7',
        text: '#000000',
        textSecondary: '#8E8E93',
        error: '#FF3B30',
        success: '#34C759',
        white: '#FFFFFF',
        border: '#E5E5EA',
        warning: '#FF9500',
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      },
      borderRadius: 12,
      fontSize: {
        small: 12,
        medium: 16,
        large: 20,
        xlarge: 28,
      },
    };
    
    // Create a simple styled function that passes props and theme
    const styled = {
      View: () => ({ children, ...props }) => <View {...props}>{children}</View>,
      Text: () => ({ children, ...props }) => <Text {...props}>{children}</Text>,
      TouchableOpacity: () => ({ children, ...props }) => <TouchableOpacity {...props}>{children}</TouchableOpacity>,
      Image: () => (props) => <Image {...props} />,
    };
    
    return {
      __esModule: true,
      default: styled,
      ThemeProvider: ({ children }) => React.cloneElement(children, { theme }),
    };
  });
  
  // Global console mock to reduce noise
  global.console = {
    ...console,
    warn: jest.fn(),
    error: jest.fn(),
    log: console.log,
  };