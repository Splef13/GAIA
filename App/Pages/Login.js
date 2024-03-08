import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Image source={require('../Assets/Image/logo.png')}
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
                placeholder="Usuário"
                value={username}
                onChangeText={text => setUsername(text)}
            />

            {/* ADD MOSTRAR SENHA */}
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />

            <TouchableOpacity style={styles.passwordButton}>
                <Text style={styles.passwordButtonText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            {/* ADD AUTENTICAÇÃO E ROTA PARA HOME */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={{ color: '#165B42', margin: 10 }}>OU</Text>

            {/* ADD ROTA PARA CRIAR CONTA */}
            <TouchableOpacity style={styles.createAccountButton}>
                <Text style={styles.createAccountButtonText}>Criar conta</Text>
            </TouchableOpacity>
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
    passwordButton: {
        borderColor: 'transparent',
        marginBottom: 35,
        width: '100%'
    },
    passwordButtonText:{
        color: '#165B42',
        fontSize: 14,
    }
});