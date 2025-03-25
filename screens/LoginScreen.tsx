import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { AuthContext } from '@/AuthContext';

const LoginScreen = ({ navigation}: {navigation: any}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);
    if(!authContext)return null;

    const {login, loading} = authContext;

    return (
        <View>
            <Text> Login Screen </Text>
            <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
            <TextInput placeholder='Password' value={password} onChangeText={setPassword} />
            <Button 
                title={loading ? "Logging in ..." : "Login"} 
                onPress={() => login(email, password)} 
            />

            <Button
                title="Register" onPress={() => navigation.navigate(`Register`)}
            />
        </View>
    );
}

export default LoginScreen;