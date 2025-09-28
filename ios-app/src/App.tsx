import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Auth0Provider } from 'react-native-auth0';
import { StripeProvider } from '@stripe/stripe-react-native';
import SplashScreen from 'react-native-splash-screen';

// Screens
import SplashScreenComponent from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';
import SubscriptionsScreen from './screens/SubscriptionsScreen';
import SettingsScreen from './screens/SettingsScreen';

// Services
import { authService } from './services/authService';
import { notificationService } from './services/notificationService';

// Types
import { RootStackParamList, TabParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Auth0 Configuration
const auth0Config = {
  domain: 'vibecodes.us.auth0.com',
  clientId: 'OejuDvHhYdI5z7a2x6K3R5zWQxhy0gY2',
  audience: 'https://velour-backend.onrender.com/api'
};

// Stripe Configuration
const stripeConfig = {
  publishableKey: 'pk_live_your_stripe_publishable_key_here',
  merchantId: 'your_merchant_id'
};

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#333',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Icon name="message-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Subscriptions" 
        component={SubscriptionsScreen}
        options={{
          tabBarLabel: 'Subscriptions',
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Component
const App: React.FC = () => {
  useEffect(() => {
    // Hide splash screen after app loads
    SplashScreen.hide();
    
    // Initialize services
    notificationService.initialize();
    authService.initialize();
  }, []);

  return (
    <Auth0Provider domain={auth0Config.domain} clientId={auth0Config.clientId}>
      <StripeProvider publishableKey={stripeConfig.publishableKey}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              cardStyleInterpolator: ({ current, layouts }) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateX: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.width, 0],
                        }),
                      },
                    ],
                  },
                };
              },
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreenComponent} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    </Auth0Provider>
  );
};

export default App;
