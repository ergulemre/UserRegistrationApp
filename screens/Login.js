import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const storedPassword = await SecureStore.getItemAsync('password');
      const storedIdentityNo = await SecureStore.getItemAsync('identityNo');

      if (password === storedPassword && storedIdentityNo == username) {
        setErrorMessage('');
        navigation.navigate('Home');
      } else {
        setErrorMessage('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error retrieving password:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 80}}>
      <Text style={{color: 'black', fontSize: 25,justifyContent: 'center', textAlign: 'center' }}>Welcome</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
        <TextInput
          style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10, width: 300 }}
          placeholder="IdentityNo (identityNo when signup)"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10, width: 300 }}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {errorMessage ? <Text style={{ color: 'red', marginBottom: 20 }}>{errorMessage}</Text> : null}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            height: 40,
            width: 130,
            borderRadius: 10,
            backgroundColor: '#1e1e1e',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#ffffffdd', justifyContent: 'center', alignItems: 'center' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{
            height: 40,
            width: 250,
            marginTop: 20,
            borderRadius: 10,
            backgroundColor: '#1e1e1e',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#ffffffdd', justifyContent: 'center', alignItems: 'center' }}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 25,
  },
});

export default LoginScreen;
