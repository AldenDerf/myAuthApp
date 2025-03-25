import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { AuthContext } from '@/AuthContext';

const RegisterScreem = ({navigation}: {navigation: any }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setCPassword] = useState('');
    const authContext = useContext(AuthContext);
    if(!authContext) return null;

    const {register, loading} = authContext;

    return (
        <View>
            <Text>Register</Text>
            <TextInput
                placeholder="Name" value={name} onChangeText={setName}
            />
            <TextInput
                placeholder='Email' value={email} onChangeText={setEmail}
            />
            <TextInput
                placeholder='Password' secureTextEntry value={password} onChangeText={setPassword}
            />
            <TextInput placeholder='Confirm Password' secureTextEntry value={c_password} onChangeText={setPassword} />

            <Button title={loading ? 'Registering...' : 'Register'} onPress={() => register(name, email, password, c_password)} />
            <Button title='Back to Login' onPress={() => navigation.navigate('Login')} />
        </View>
    );
}