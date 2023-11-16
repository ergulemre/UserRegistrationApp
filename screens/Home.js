import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import CardWidget from '../components/CardWidget';
import { GlobalContext } from '../context/GlobalContext';
import * as SecureStore from 'expo-secure-store';

const Home = () => {
  const [state, dispatch] = useContext(GlobalContext);
  const [identityNo, setIdentityNo] = useState();
  const [profilepicturePath, setProfilePicturePath] = useState();

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    const storedIdentityNo = await SecureStore.getItemAsync('identityNo');
    const profilePicturePath = await SecureStore.getItemAsync('profilePicturePath');
    setIdentityNo(storedIdentityNo);
    setProfilePicturePath(profilePicturePath);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ paddingTop: 50, paddingBottom: 15 }}>Welcome user : {identityNo}</Text>
      <CardWidget
        title={'test'}
        description={'test'}
        imageUrl={profilepicturePath}
        onPress={() => console.log('Card pressed')}
      />
    </View>
  );
};

export default Home;
