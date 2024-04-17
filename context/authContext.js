import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        setTimeout(() => {
            setIsAuthenticated(false); //ALTERAR ESTE ESTADO PARA QUE MUDE DA TELA DE LOOGIN PARA HOME
        }, 3000);
    }, [])

    const login = async (email, password)=>{
        try {
            // Lógica de login
        } catch (e) {
            // Tratamento de erro
        }
    }

    const logout = async (email, password)=>{
        try {
            // Lógica de logout
        } catch (e) {
            // Tratamento de erro
        }
    }

    const register = async (email, password)=>{
        try {
            // Lógica de registro
        } catch (e) {
            // Tratamento de erro
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}
