import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../context/GlobalContext';
import * as SecureStore from 'expo-secure-store';
import UserRegistration from './SignUp/UserRegistration';
import JobInformation from './SignUp/JobInformation';
import EducationAndCompetence from './SignUp/EducationAndCompetence';
import CvAndProject from './SignUp/CvAndProject';
import * as Yup from 'yup';

export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';

const SignUp = (props) => {
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [isFinished, setIsFinished] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [stateObj, setStateObj] = useState();
  const navigation = useNavigation();
  const [state, dispatch] = useContext(GlobalContext);

  const progressSteps = {
    borderWidth: 3,
    activeStepIconBorderColor: themeColor,
    completedProgressBarColor: themeColor,
    activeStepIconColor: themeColor,
    activeLabelColor: themeColor,
    completedStepNumColor: themeColor,
    completedStepIconColor: themeColor,
    activeStepNumColor: textColor,
    paddingTop: 10,
  };
  const progressStep = {
    nextBtnText: 'Sonraki  >',
    previousBtnText: '<  Önceki',
    nextBtnStyle: styles.button,
    previousBtnStyle: styles.button,
    nextBtnTextStyle: styles.buttonText,
    previousBtnTextStyle: styles.buttonText,
    nextBtnDisabled: isNextButtonDisabled,
  };
  const firstProgressStep = {
    ...progressStep,
    previousBtnStyle: {
      display: 'none',
      paddingTop: 20,
    },
  };

  const onNextStep = () => {
    if (!isValid) {
      setErrors(true);
      alert('Lutfen zorunlu alanları doldurunuz');
    } else {
      setErrors(false);
    }
  };

  const onSubmit = () => {
    setStateObj(state);
    setIsFinished(true);
  };

  const handleRegister = async () => {
    try {
      await SecureStore.setItemAsync('birthDate', JSON.stringify(state.birthDate != undefined ? state.birthDate : ''));
      await SecureStore.setItemAsync('city', stateObj.city != undefined ? stateObj.city : '');
      await SecureStore.setItemAsync('country', stateObj.country != undefined ? stateObj.country : '');
      await SecureStore.setItemAsync('cvName', stateObj.cvName != undefined ? stateObj.cvName : '');
      await SecureStore.setItemAsync('cvPath', stateObj.cvPath != undefined ? stateObj.cvPath : '');
      await SecureStore.setItemAsync(
        'educationLevel',
        stateObj.educationLevel != undefined ? stateObj.educationLevel : '',
      );
      await SecureStore.setItemAsync('gender', stateObj.gender != undefined ? stateObj.gender : '');
      await SecureStore.setItemAsync(
        'graduationYear',
        stateObj.graduationYear != undefined ? stateObj.graduationYear : '',
      );
      await SecureStore.setItemAsync('identityNo', stateObj.identityNo != undefined ? stateObj.identityNo : '');
      await SecureStore.setItemAsync(
        'isKvkkAccepted',
        JSON.stringify(state.isKvkkAccepted != undefined ? state.isKvkkAccepted : ''),
      );
      await SecureStore.setItemAsync('job', stateObj.job != undefined ? stateObj.job : '');
      await SecureStore.setItemAsync('major', stateObj.major != undefined ? stateObj.major : '');
      await SecureStore.setItemAsync('name', stateObj.name != undefined ? stateObj.name : '');
      await SecureStore.setItemAsync('otherJob', JSON.stringify(state.otherJob != undefined ? state.otherJob : ''));
      await SecureStore.setItemAsync(
        'profilePicturePath',
        stateObj.profilePicturePath != undefined ? stateObj.profilePicturePath : '',
      );
      await SecureStore.setItemAsync(
        'projectDetails',
        JSON.stringify(stateObj.projectDetails != undefined ? stateObj.projectDetails : ''),
      );
      await SecureStore.setItemAsync('schoolName', stateObj.schoolName != undefined ? stateObj.schoolName : '');
      await SecureStore.setItemAsync('telephone', stateObj.telephone != undefined ? stateObj.telephone : '');
      await SecureStore.setItemAsync(
        'workingSituation',
        stateObj.workingSituation != undefined ? stateObj.workingSituation : '',
      );
      await SecureStore.setItemAsync('password', password);
      console.log('Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error storing sensitive information:', error);
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleSubmit = () => {
    const validationSchema = Yup.object().shape({
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string().oneOf([password], 'Passwords must match').required('Confirm Password is required'),
    });

    validationSchema
      .validate({ password, confirmPassword })
      .then(() => {
        setErrorMessage('');
        console.log('Password created successfully:', password);
        handleRegister();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      {/*<StatusBar barStyle="dark-content" />*/}
      <SafeAreaView style={styles.safeAreaView}>
        {!isFinished && (
          <ProgressSteps {...progressSteps}>
            <ProgressStep label="Kullanıcı Kayıt " {...firstProgressStep} onNext={onNextStep} errors={errors}>
              <UserRegistration
                handleSuccess={(values) => {
                  setIsNextButtonDisabled(!values);
                  setIsValid(values);
                }}
              />
            </ProgressStep>
            <ProgressStep label="Mesleki Bilgiler" {...progressStep}>
              <JobInformation
                handleSuccess={(values) => {
                  setIsNextButtonDisabled(!values);
                  setIsValid(values);
                }}
              />
            </ProgressStep>
            <ProgressStep label="Eğitim Seviyesi" {...progressStep}>
              <EducationAndCompetence
                handleSuccess={(values) => {
                  setIsNextButtonDisabled(!values);
                  setIsValid(values);
                }}
              />
            </ProgressStep>
            <ProgressStep label="CV ve Proje" {...progressStep} onSubmit={onSubmit}>
              <CvAndProject
                handleSuccess={(values) => {
                  setIsNextButtonDisabled(!values);
                  setIsValid(values);
                }}
              />
            </ProgressStep>
          </ProgressSteps>
        )}
        {isFinished && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10, width: 300 }}
              placeholder="Enter Password"
              secureTextEntry
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10, width: 300 }}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
            {errorMessage ? <Text style={{ color: 'red', marginBottom: 20 }}>{errorMessage}</Text> : null}
            <TouchableOpacity
              onPress={handleSubmit}
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
              <Text style={{ color: '#ffffffdd', justifyContent: 'center', alignItems: 'center' }}>
                Create Password
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  button: {
    backgroundColor: themeColor,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: textColor,
    fontSize: 16,
  },
});

export default SignUp;
