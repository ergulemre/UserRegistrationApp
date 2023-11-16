import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import CheckBox from 'expo-checkbox';

const Checkbox = ({ children, ...props }) => {
  return (
    <View>
      <View>
        <CheckBox type={'checkbox'} {...props} />
        <Text>{children}</Text>
      </View>
    </View>
  );
};

export default Checkbox;
