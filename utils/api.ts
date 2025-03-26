import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Works on Web and Mobile

const API_URL = "http://20.0.0.75/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Store token securely (Use AsyncStorage for all platforms)
export async function saveToken(token: string): Promise<void> {
  try {
    console.log("Saving Token:", token);
    await AsyncStorage.setItem("authToken", token); // ✅ Works on Web and Mobile
  } catch (error) {
    console.error("Error saving token:", error);
  }
}

// Retrieve token
export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem("authToken"); // ✅ Works on Web and Mobile
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

// Remove token
export async function removeToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem("authToken"); // ✅ Works on Web and Mobile
  } catch (error) {
    console.error("Error removing token:", error);
  }
}

// Attach token to requests
api.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error attaching token:", error);
  }

  return config;
});

export default api;
