import { View, Text } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationPage() {
  const ScheduleNotification = async()=>{
    const theNotification = await Notifications.scheduleNotificationAsync({
      content: {
        title: "GAIA",
        body: "Sua planta precisa ser regada🪴🚿",
      },
      trigger: {seconds: 2},
    });
    console.log(theNotification);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Notificar" onPress={ScheduleNotification} />
    </View>
  )
}