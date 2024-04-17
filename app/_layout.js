import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import "../global.css"
import { Slot, useSegments, useRouter } from "expo-router"
import { AuthContextProvider, useAuth } from '../context/authContext';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return;
  
    const inApp = segments[0] == '(app)';
    if (isAuthenticated && !inApp) {
      router.replace('home');
    } else if (!isAuthenticated) {
      router.replace('login');
    }
  }, [isAuthenticated])
  

  return <Slot/>;
}

export default function RootLAyout (){
  return (
    <AuthContextProvider>
      <MainLayout/>
    </AuthContextProvider>
  )
}