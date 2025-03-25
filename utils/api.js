import axios from "axios";

import * as SecureStore from "expo-secure-store";

 const API_URL = `http://bghapis.test/api`;

 const api = axios.create({
    baseURL: API_URL,
    headers: {"Content-Type": "application/json"},
 });

 // Store and retrieve tokens securely
 export async function saveToken(token) {
    await SecureStore.setItemAsync("authToken", token);
 }

 export async function getToken() {
    return await SecureStore.getItemAsync("authToken");
 }

 export async function removeToken() {
    await SecureStore.deleteItemAsync("authToken");
 }

 // Attach the token to requests
 api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization  = `Bearer ${token}`;
    }
    return config;
 });

 export default api;