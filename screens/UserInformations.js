import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import * as SecureStore from 'expo-secure-store';

const UserInformations = () => {
  const [state] = useContext(GlobalContext);
  const [birthDate, setBirthDate] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [cvName, setCvName] = useState();
  const [cvPath, setCvPath] = useState();
  const [educationLevel, setEducationLevel] = useState();
  const [gender, setGender] = useState();
  const [graduationYear, setGraduationYear] = useState();
  const [identityNo, setIdentityNo] = useState();
  const [isKvkkAccepted, setIsKvkkAccepted] = useState();
  const [job, setJob] = useState();
  const [major, setMajor] = useState();
  const [name, setName] = useState();
  const [otherJob, setOtherJob] = useState();
  const [profilePicturePath, setProfilePicturePath] = useState();
  const [projectDetails, setProjectDetails] = useState();
  const [schoolName, setSchoolName] = useState();
  const [telephone, setTelephone] = useState();
  const [workingSituation, setWorkingSituation] = useState();

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    const birthDate = await SecureStore.getItemAsync('birthDate');
    const city = await SecureStore.getItemAsync('city');
    const country = await SecureStore.getItemAsync('country');
    const cvName = await SecureStore.getItemAsync('cvName');
    const cvPath = await SecureStore.getItemAsync('cvPath');
    const educationLevel = await SecureStore.getItemAsync('educationLevel');
    const gender = await SecureStore.getItemAsync('gender');
    const graduationYear = await SecureStore.getItemAsync('graduationYear');
    const isKvkkAccepted = await SecureStore.getItemAsync('isKvkkAccepted');
    const job = await SecureStore.getItemAsync('job');
    const major = await SecureStore.getItemAsync('major');
    const name = await SecureStore.getItemAsync('name');
    const otherJob = await SecureStore.getItemAsync('otherJob');
    const projectDetails = await SecureStore.getItemAsync('projectDetails');
    const schoolName = await SecureStore.getItemAsync('schoolName');
    const telephone = await SecureStore.getItemAsync('telephone');
    const workingSituation = await SecureStore.getItemAsync('workingSituation');

    setBirthDate(birthDate);
    setCity(city);
    setCountry(country);
    setCvName(cvName);
    setCvPath(cvPath);
    setEducationLevel(educationLevel);
    setGender(gender);
    setGraduationYear(graduationYear);
    setIsKvkkAccepted(isKvkkAccepted);
    setJob(job);
    setMajor(major);
    setName(name);
    setOtherJob(otherJob);
    setProjectDetails(projectDetails);
    setSchoolName(schoolName);
    setTelephone(telephone);
    setWorkingSituation(workingSituation);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ paddingTop: 50, paddingBottom: 15 }}>Name : {name}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>Birthdate : {birthDate}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>City : {city}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>Country : {country}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>Gender : {gender}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>Education Level : {educationLevel}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>School Name : {schoolName}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>Major : {major}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>Graduation Year: {graduationYear}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>Job : {job}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>Other Job : {otherJob}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>Project Details : {projectDetails}</Text>
      <Text style={{ paddingTop: 10, paddingBottom: 15 }}>Working Situation : {workingSituation}</Text>
    </View>
  );
};

export default UserInformations;
