import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomePage from './home';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handlePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const navigation = useNavigation();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = response.user;
      if (user) {
        console.log('User is signed in:', user);
        navigation.navigate('Main', { screen: 'Home' });
      } else {
        console.log('User is not signed in.');
        alert('Erro ao fazer login!');
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert('E-mail ou senha incorretos.');
      } else {
        alert('Erro ao fazer login!');
      }
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
      setHidePassword(true);
    }, [])
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require('../Assts/logo.png')}
          style={{
            width: 200,
            height: 200,
            marginTop: -20,
            marginBottom: 20
          }}
        />
        <Image source={require('../Assts/mo-removebg-preview.png')}
          style={{
            width: 200,
            height: 50,
            marginTop: 10,
            marginBottom: 20
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={hidePassword}
          />

        </View>

        <View style={styles.passwordButtonContainer}>
          <TouchableOpacity style={styles.passwordButton} onPress={handlePasswordVisibility}>
            <Text style={{ fontSize: 14, color: '#165B42' }}>Mostrar Senha</Text>
          </TouchableOpacity>
        </View>

        {/* ADD AUTENTICAÇÃO */}
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Pressable style={styles.createAccountButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.createAccountButtonText}>Criar conta</Text>
        </Pressable>

        <TouchableOpacity style={styles.newPasswordButton} onPress={() => navigation.navigate('EsqueceuSenha')}>
          <Text style={styles.newPasswordButtonText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 100
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 35,
    color: "#165B42"
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 55,
    borderColor: 'transparent',
    backgroundColor: "#ffffff",
    shadowColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    elevation: 2
  },
  button: {
    backgroundColor: '#165B42',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#eeeeee',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccountButton: {
    borderColor: 'transparent',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#165B42',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newPasswordButton: {
    alignItems: 'center',
    borderColor: 'transparent',
    marginTop: 45,
    width: '100%'
  },
  newPasswordButtonText: {
    color: '#165B42',
    fontSize: 14,
  },
  accountButton: {
    borderColor: 'transparent',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  accountButtonText: {
    color: '#165B42',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordButtonContainer: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    marginRight: 10,
    marginBottom: 40
  },
  passwordButton: {
    borderColor: 'transparent',
    justifyContent: 'flex-end',
  },
});