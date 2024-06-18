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