import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import LoginPage from './src/Pages/login';
import HomePage from './src/Pages/home';
import SettingsPage from './src/Pages/settings';
import SignUpPage from './src/Pages/signUp';
import NotificationPage from './src/Pages/notification';
import AddPlantsPage from './src/Pages/addPlants';
import GraphsPage from './src/Pages/graphs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: [{ display: 'flex', height: 70 }, null],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Relátorios') {
            iconName = 'stats-chart';
          } else if (route.name === 'Criar') {
            iconName = 'add-circle';
          } else if (route.name === 'Notificacao') {
            iconName = 'notifications';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={35} color={color} />;
        },
        tabBarActiveTintColor: '#165B42',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="Relátorios" component={GraphsPage} options={{ headerShown: false }} />
      <Tab.Screen name="Criar" component={AddPlantsPage} options={{ headerShown: false }} />
      <Tab.Screen name="Notificacao" component={NotificationPage} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsPage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
