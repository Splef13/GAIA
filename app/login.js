import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignUp from './singUp';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')}
        style={{
          width: 200,
          height: 200,
          marginTop: -20,
          marginBottom: 20
        }}
      />
      <Text style={styles.welcome}>Bem-vindo(a) ao</Text>
      <Text style={styles.title}>GAIA</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />

      <View style={styles.passwordButtonContainer}>
        <TouchableOpacity style={styles.passwordButton} onPress={() => setHidePassword(!hidePassword)}>
          <Icon name={hidePassword ? 'eye-slash' : 'eye'} size={25} color="#165B42" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={hidePassword}
        />
      </View>

      <TouchableOpacity style={styles.newPasswordButton}>
        <Text style={styles.newPasswordButtonText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      {/* ADD AUTENTICAÇÃO E ROTA PARA HOME */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>


       {/* VERIFICAR ESTA ROTA*/}
      <Pressable onPress={()=> router.push('SignUp')} style={styles.createAccountButton}>
        <Text style={styles.createAccountButtonText}>Criar conta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 35,
    color: "#165B42"
  },
  welcome: {
    fontSize: 32,
    fontWeight: 'bold',
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
  },
  button: {
    backgroundColor: '#165B42',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
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
    borderColor: 'transparent',
    marginBottom: 35,
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
    alignItems: 'flex-end',
    marginRight: 10,
  },
  passwordButton: {
    borderColor: 'transparent',
    width: 25,
    justifyContent: 'flex-end',
  },
});