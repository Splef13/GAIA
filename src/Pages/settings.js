import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function SettingsPage() {
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 40, marginBottom: 30, fontSize: 16, fontWeight: 'bold' }}>Configurações</Text>
      <View style={[styles.itens, styles.shadowProp]}>
        <Text>E-mail:</Text>
        {/* COLOCAR PARA PUXAR O E-MAIL DO BANCO */}
        <Text
          style={{
            fontWeight: 'normal',
            color: '#939393'
          }}
        >user@email.com</Text>
      </View>
      <View style={[styles.itens, styles.shadowProp]}>
      <Pressable >
        <Text>Alterar Senha</Text>
      </Pressable>
      </View>
      <View style={[styles.itens, styles.shadowProp]}>
      <Pressable >
        <Text>Configurações de notificaçãos</Text>
      </Pressable>
      </View>
      <View style={[styles.itens, styles.shadowProp]}>
      <Pressable >
        <Text>Termos de uso</Text>
      </Pressable>
      </View>
      <View style={[styles.itens, styles.shadowProp]}>
      <Pressable >
        <Text style={{color: 'red'}}>Sair</Text>
      </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 16,
  },
  itens: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 8,
    padding: 16,
    elevation: 3
  },
  sair: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20
  },
});