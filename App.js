import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserCircle, PlusCircle, ChartBar, BellSimple, Gear, House } from 'phosphor-react-native';

import LoginPage from './src/Pages/login';
import HomePage from './src/Pages/home';
import SettingsPage from './src/Pages/settings';
import SignUpPage from './src/Pages/signUp';
import NotificationPage from './src/Pages/notification';
import AddPlantsPage from './src/Pages/addPlants';
import GraphsPage from './src/Pages/graphs';
import EsqueceuSenha from './src/Modal/esqueceuSenha';
import AlterarSenha from './src/Modal/alterarSenha';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: [{ display: 'flex', height: 70, backgroundColor: "#0f402e" }, null],
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case 'Home':
              return <House size={35} color={color} />;
            case 'Relátorios':
              return <ChartBar size={35} color={color} />;
            case 'Criar':
              return <PlusCircle size={35} color={color} />;
            case 'Notificacao':
              return <BellSimple size={35} color={color} />;
            case 'Settings':
              return <Gear size={35} color={color} />;
            default:
              return <UserCircle size={35} color={color} />;
          }
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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha}
          options={{ presentation: 'modal' }}
          options={{ title: 'Esqueceu a senha?', headerStyle: {backgroundColor: '#fff', }, headerTintColor: '#165B42', presentation: 'modal' }}
        />
        <Stack.Screen name="AlterarSenha" component={AlterarSenha}
          options={{ presentation: 'modal' }}
          options={{ title: 'Alterar Senha', headerStyle: {backgroundColor: '#fff', }, headerTintColor: '#165B42', presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
