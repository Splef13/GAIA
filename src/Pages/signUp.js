import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <Image source={require('../Assts/logo.png')}
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

            <View style={styles.passwordButtonContainer}>
                <TouchableOpacity style={styles.passwordButton} onPress={() => setHidePasswordConfirm(!hidePasswordConfirm)}>
                    <Icon name={hidePasswordConfirm ? 'eye-slash' : 'eye'} size={25} color="#165B42" />
                </TouchableOpacity>
            </View>

            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry={hidePasswordConfirm}
                />
            </View>

            {/* ADD AUTENTICAÇÃO */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', { screen: 'Home' })}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Pressable style={styles.accountButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.accountButtonText}>Já tem uma conta?</Text>
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
        marginBottom: 20
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