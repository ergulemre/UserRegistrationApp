import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const FormInput = ({ iconName, iconColor, returnKeyType, keyboardType, name, placeholder, ...rest }) => (
  <View style={styles.inputContainer}>
    <TextInput
      {...rest}
      //leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
      //leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      style={styles.input}
      keyboardType={keyboardType}    />
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    height: 45,
  },
  iconStyle: {
    marginRight: 10,
  },
  input: {
    paddingLeft: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginLeft: 10,
    marginRight: 10,
  },
});

export default FormInput;
