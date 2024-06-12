import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AlterarSenha() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

    const handlePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 14,
                marginBottom: 50, 
                marginTop: 20, 
                textAlign: 'justify'
            }}>
                Para realizar a alteração da senha atual pressencha os campos.
            </Text>

            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Senha atual"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={hidePassword}
                />
            </View>

            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nova senha"
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    secureTextEntry={hidePassword}
                />
            </View>

            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar nova senha"
                    value={confirmNewPassword}
                    onChangeText={text => setConfirmNewPassword(text)}
                    secureTextEntry={hidePassword}
                />
            </View>

            <View style={styles.passwordButtonContainer}>
                <TouchableOpacity style={styles.passwordButton} onPress={handlePasswordVisibility}>
                    <Text style={{ fontSize: 14, color: '#165B42' }}>Mostrar Senha</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 80,
        flex: 1,
        backgroundColor: '#eeeeee',
        alignItems: 'center',
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
        elevation: 2,
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
        height: 40,
        alignItems: 'flex-end',
        marginRight: 10,

    },
    passwordButton: {
        borderColor: 'transparent',
        justifyContent: 'flex-end',
    },
});