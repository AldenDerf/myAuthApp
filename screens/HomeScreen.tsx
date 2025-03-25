import React, {useContext} from "react";
import {View, Text, Button} from 'react-native';
import { AuthContext } from "@/AuthContext";

const HomeScreen = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) return null;

    const {user, logout} = authContext;

    return (
        <View>
            <Text>Welcome, {user?.name}</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}
export default HomeScreen;