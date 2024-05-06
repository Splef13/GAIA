import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function SettingsPage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Configurações</Text>
      <Pressable style={styles.button}>
        <Text style={{color:'#FFFFFF'}}>SAIR</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20
},
});