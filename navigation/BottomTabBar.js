import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import CardWidget from '../components/CardWidget';
import { GlobalContext } from '../context/GlobalContext';
import * as SecureStore from 'expo-secure-store';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Home from '../screens/Home';
import UserInformations from '../screens/UserInformations';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      displayName={false}
      screenOptions={{
        tabBarShowLabel: false,
        displayName: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Entypo name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="UserInformations"
        component={UserInformations}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="infocirlce" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
