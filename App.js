import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserCircle, PlusCircle, ChartBar, Horse, House, Notification, BellSimple, Gear } from 'phosphor-react-native';


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
        tabBarStyle: [{ display: 'flex', height: 70, backgroundColor: "#165B42" }, null],
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <House size={35} color={color} />;
          } else if (route.name === 'Relátorios') {
            return <ChartBar size={35} color={color} />;
          } else if (route.name === 'Criar') {
            return <PlusCircle size={35} color={color} />;
          } else if (route.name === 'Notificacao') {
            return <BellSimple size={35} color={color} />;
          } else if (route.name === 'Settings') {
            return <Gear size={35} color={color} />;
          }
          return <UserCircle size={35} color={color} />;
        },
        tabBarActiveTintColor: '#FFF',
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
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
