import React, { useState, useEffect, useContext } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from '../../context/GlobalContext';

export default function UploadImage() {
  const [state, dispatch] = useContext(GlobalContext);

  const [image, setImage] = useState(null);

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
    } else {
      console.log('Media Permissions are granted');
    }
  };

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(JSON.stringify(_image?.assets[0]?.uri));
    if (!_image.cancelled) {
      setImage(_image.assets[0].uri);
      dispatch({
        type: 'PROFILE_PICTURE',
        profilePicturePath: _image.assets[0].uri,
      });
    }
  };
  return (
    <View style={imageUploaderStyles.container}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
          <Text>{image ? 'Edit' : 'Upload'} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 10,
    height: 120,
    width: 120,
    backgroundColor: '#efefef',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '35%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
