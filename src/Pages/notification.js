import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationPage() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notifications.requestPermissionsAsync();
      setPermissionGranted(permission.granted);
    }
    requestPermission();
  }, []);

  const ScheduleNotification = async()=>{
    if (!permissionGranted) {
      alert("You need to grant permission to receive notifications");
      return;
    }

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
      <TouchableOpacity style={styles.button} onPress={ScheduleNotification}>
        <Text style={styles.buttonText}>Notificar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#165B42',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20
},
buttonText: {
    color: '#eeeeee',
    fontSize: 16,
    fontWeight: 'bold',
},
});