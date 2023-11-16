import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const CardWidget = ({ title, description, imageUrl, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 }}>
        <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} />
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{title}</Text>
        <Text>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardWidget;
