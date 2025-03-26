import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import api, { getToken, removeToken } from "@/utils/api";

interface User {
  name: string;
  email: string;
}

export default function Index() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users");
        setUser(response.data);
      } catch (error) {
        await removeToken();
        router.replace("/Login");
      }
    };

    fetchUser();
  }, []); // ✅ Runs only once when the component mounts

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      await removeToken();
      router.replace("/Login");
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <View>
      <Text>Welcome, {user?.name}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
