import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import {useRouter} from "expo-router";
import api, { saveToken } from "../utils/api";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await api.post('/register', {name, email, password, c_password});
      await saveToken(response.data.token);
      Alert.alert("Success", "Registered successflly!");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data.message || "Registration failed");
    }
  };


  return (
    <View>
      <Text>Register</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address"/>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={c_password}
        onChangeText={setCPassword}
      />

      <Button
       title="Register"
        onPress={handleRegister}
      />
   
    </View>
  );
};

