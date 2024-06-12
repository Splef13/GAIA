import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function SettingsPage({ navigation }) {
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        // User is signed out.
        //...
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 40, marginBottom: 30, fontSize: 16, fontWeight: 'bold' }}>Configurações</Text>
      <View style={[styles.itens]}>
        <Text>E-mail:</Text>
        <Text
          style={{
            fontWeight: 'normal',
            color: '#939393'
          }}
        >{email}</Text>
      </View>
      <Pressable style={[styles.itens]} onPress={() => navigation.navigate('AlterarSenha')}>
        <Text>Alterar Senha</Text>
      </Pressable>
      <View style={[styles.itens]}>
        <Pressable >
          <Text>Configurações de notificaçãos</Text>
        </Pressable>
      </View>

      <Pressable style={[styles.itens]} onPress={() => navigation.navigate('TermosUso')}>
        <Text>Termos de uso</Text>
      </Pressable>
      <Pressable onPress={handleLogout} style={styles.itens}>
        <Text style={styles.sairText}>Sair</Text>
      </Pressable>
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
  sairText: {
    color: 'red',
    fontWeight: 'bold',
  },
});