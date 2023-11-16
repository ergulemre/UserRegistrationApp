// DrawerContent.js - Drawer content component
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const DrawerContent = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer Content</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeTab')}
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
        <Text style={{ color: '#ffffffdd', justifyContent: 'center', alignItems: 'center' }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserInformations')}
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
        <Text style={{ color: '#ffffffdd', justifyContent: 'center', alignItems: 'center' }}>User Informations</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
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
        <Text style={{ color: '#ffffffdd', justifyContent: 'center', alignItems: 'center' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;
