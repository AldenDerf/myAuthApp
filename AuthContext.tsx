import React, { createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Define the user type

interface User {
    name: string;
    email: string;
}

// Define the context type
interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: String, password: string) => Promise<void>;
    register: (name: String, email: String, password: String, c_password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: Boolean;
}

export const AuthContex = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const API_URL = `http://bghapis.test/api`;

    const login = async (email: string, password: string) => {
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/login`, {email, password});
            const {token, user} = response.data;

            await AsyncStorage.setItem('token', token);
            setToken(token);
            setUser({name, email});

        } catch (error) {
            console.error('Login error:', error.response?.data)
            alert('Login failed!, Check your credentials.');
        }
        setLoading(false);
    };

    const register = async (name: string, email: string, password: string, c_password: string) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/register`, {name, email, password, c_password});
            const {token, name: userName} = response.data.data;

            await AsyncStorage.setItem('token', token);
            setToken(token);
            setUser({name: userName, email});
        } catch (error) {
            console.error('Register error:', error.response?.data);
            alert('Registration failed! CHeck your details.');
        }
        setLoading(false);
    };

    const logout = async () => {
        try{
            await axios.post(`${API_URL}/logout`, {}, {
                headers: {
                    Aut
                }
            })
        }
    }
}