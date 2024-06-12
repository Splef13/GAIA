import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EsqueceuSenha() {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleResetPassword = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 14,
                marginBottom: 50, 
                marginTop: 20, 
                textAlign: 'justify'
            }}>
                Para realizar a redefinição de senha, um link será enviado para o endereço de e-mail fornecido no campo.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        paddingHorizontal: 16,
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
        marginTop: 40
    },
    buttonText: {
        color: '#eeeeee',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
