import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
  register: (
    name: String,
    email: String,
    password: String,
    c_password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: Boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = `http://bghapis.test/api`;

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { token, name } = response.data;

      await AsyncStorage.setItem("token", token);
      setToken(token);
      setUser({name, email});
    } catch (error) {
      console.error("Login error:", error.response?.data);
      alert("Login failed!, Check your credentials.");
    }
    setLoading(false);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    c_password: string
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        c_password,
      });
      const { token, name: userName } = response.data.data;

      await AsyncStorage.setItem("token", token);
      setToken(token);
      setUser({ name: userName, email });
    } catch (error) {
      console.error("Register error:", error.response?.data);
      alert("Registration failed! CHeck your details.");
    }
    setLoading(false);
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await AsyncStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.response?.data);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  },[]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
        {children}
    </AuthContext.Provider>
  )
};
