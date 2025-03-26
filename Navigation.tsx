import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/Login";
import RegisterScreen from "./app/register";
import HomeScreen from "./app/Home";
import { AuthContext } from "./app/AuthContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { token } = authContext;

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
