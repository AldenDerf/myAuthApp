import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import api, { saveToken } from "../utils/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      await saveToken(response.data.data.token);
      Alert.alert("Success", "Logged in successfully!");
      router.replace("/");

      // Reset the navigation stack
    } catch (error: any) {
      Alert.alert("Error", error.response?.data.message || "Login failed");
      console.log(error);
    }
  };

  return (
    <View>
      <Text> Login Screen </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
