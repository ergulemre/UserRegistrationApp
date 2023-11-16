import React, { useEffect, useCallback} from 'react';
import { View, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native'; 
import { useNavigation } from '@react-navigation/native';

const CustomSplashScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const navigateToMainScreen = useCallback(() => {
    navigation.navigate('Login'); // Replace with your main screen name
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      // Simulate a delay before navigating to the main screens
      const timer = setTimeout(() => {
        navigateToMainScreen();
      }, 3000); // Replace 3000 with the duration you want for the splash screen

      return () => clearTimeout(timer);
    }
  }, [isFocused, navigateToMainScreen]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../assets/akinci.gif')} // Replace with your GIF file
        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
      />
    </View>
  );
};

export default CustomSplashScreen;