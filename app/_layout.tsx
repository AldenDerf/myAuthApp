import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getToken } from "../utils/api";

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();

      if (!token) {
        setAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Don't render navigation until auth check is done
  if (loading) return null;

  return <Stack screenOptions={{ headerShown: false }} initialRouteName={authenticated ? "index" : "Login"} />;
}
