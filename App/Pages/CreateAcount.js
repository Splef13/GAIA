import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';


export default function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
            <Text style={styles.title}>Cadastrar</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={text => setUsername(text)}
                keyboardType="email-address"
            />

            {/* ADD MOSTRAR SENHA */}
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry
            />

            {/* ADD AUTENTICAÇÃO E ROTA PARA HOME */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            {/* ADD ROTA PARA CRIAR CONTA */}
            <TouchableOpacity style={styles.accountButton}>
                <Text style={styles.accountButtonText}>Já tem uma conta?</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 35,
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
        marginTop: 30, 
        marginBottom: 40
    },
    buttonText: {
        color: '#eeeeee',
        fontSize: 16,
        fontWeight: 'bold',
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
    passwordButton: {
        borderColor: 'transparent',
        marginBottom: 35,
        width: '100%'
    },
    passwordButtonText: {
        color: '#165B42',
        fontSize: 14,
    }
});