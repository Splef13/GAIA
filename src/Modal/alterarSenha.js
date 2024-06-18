import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, updatePassword, getAuth } from 'firebase/auth';

export default function AlterarSenha() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const handlePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const handleUpdatePassword = async () => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, user.email, password);

            if (newPassword === confirmNewPassword) {
                try {
                    await updatePassword(auth.currentUser, newPassword);
                    alert('Senha atualizada com sucesso!');
                } catch (error) {
                    let errorMessage;
                    if (error.code === 'auth/requires-recent-login') {
                        errorMessage = 'Você precisa fazer login novamente para atualizar a senha';
                    } else {
                        errorMessage = `Erro ao atualizar a senha: ${error.message}`;
                    }
                    setError(errorMessage);
                }
            } else {
                setError('As senhas não coincidem');
            }
        } catch (error) {
            let errorMessage;
            if (error.code === 'auth/wrong-password') {
                errorMessage = 'Senha atual incorreta';
            } else {
                errorMessage = `Erro ao autenticar: ${error.message}`;
            }
            setError(errorMessage);
        }
    };

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

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

            {user && (
                <View>
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

                    <TouchableOpacity style={styles.passwordButton} onPress={handlePasswordVisibility}>
                        <Text style={{ fontSize: 14, color: '#165B42' }}>Mostrar Senha</Text>
                    </TouchableOpacity>
                </View>
            )}

            {error && <Text style={{ color: 'ed' }}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleUpdatePassword} disabled={!user}>
                <Text style={styles.buttonText}>Confirmar</Text>
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
        elevation: 2,
    },
    button: {
        backgroundColor: '#165B42',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 20
    },
    buttonText: {
        color: '#eeeeee',
        fontSize: 16,
        fontWeight: 'bold',
    },
    passwordInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    passwordButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 20,
        borderColor: '#165B42',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});