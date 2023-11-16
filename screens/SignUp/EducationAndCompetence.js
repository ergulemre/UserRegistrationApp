import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { GlobalContext } from '../../context/GlobalContext';
import { useFocusEffect } from '@react-navigation/native';
import FormInput from '../../components/FormInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  educationLevel: Yup.string().required('Please select an option'),
  schoolName: Yup.string().required('Please write your school name'),
  major: Yup.string().required('Please write your major'),
  graduationYear: Yup.string().required('Please write your graduation year'),
});

const EducationAndCompetence = (props) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [educationLevel, setEducationLevel] = useState();
  const [schoolName, setSchoolName] = useState();
  const [major, setMajor] = useState();
  const [graduationYear, setGraduationYear] = useState();
  const [formTouched, setFormTouched] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch({
          type: 'EDUCATION_AND_COMPETENCE',
          educationLevel: educationLevel?.type,
          schoolName: schoolName,
          major: major,
          graduationYear: graduationYear,
        });
      };
    }, [educationLevel, schoolName, major, graduationYear]),
  );

  const formik = useFormik({
    initialValues: {
      educationLevel: '',
      schoolName: '',
      major: '',
      graduationYear: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    initialTouched: { jobSituation: true, job: true },
  });

  useEffect(() => {
    formik.setFieldTouched('educationLevel', true);
    formik.setFieldTouched('schoolName', true);
    formik.setFieldTouched('major', true);
    formik.setFieldTouched('graduationYear', true);
  }, []);

  useEffect(() => {
    formik.validateForm();
  }, [formik.values.educationLevel, formik.values.schoolName, formik.values.major, formik.values.graduationYear]);

  useEffect(() => {
    if (formik.isValid && formTouched) {
      props.handleSuccess(formik.isValid);
    } else {
      props.handleSuccess(false);
    }
  }, [formik.isValid, formTouched]);

  const handleDropdownChangeForEducationLevel = (educationLevel) => {
    formik.setFieldValue('educationLevel', educationLevel.type);
    formik.setFieldTouched('educationLevel', true);
    setEducationLevel(educationLevel);
    setFormTouched(true);
  };

  const handleSchoolNameInputChange = (inputFieldValue) => {
    formik.setFieldValue('schoolName', inputFieldValue);
    formik.setFieldTouched('schoolName', true);
    setSchoolName(inputFieldValue);
    setFormTouched(true);
  };

  const handleMajorInputChange = (inputFieldValue) => {
    formik.setFieldValue('major', inputFieldValue);
    formik.setFieldTouched('major', true);
    setMajor(inputFieldValue);
    setFormTouched(true);
  };

  const handleGradYearInputChange = (inputFieldValue) => {
    formik.setFieldValue('graduationYear', inputFieldValue);
    formik.setFieldTouched('graduationYear', true);
    setGraduationYear(inputFieldValue);
    setFormTouched(true);
  };

  const educationLevels = [
    { type: 'İlkokul', id: 1 },
    { type: 'Lise', id: 2 },
    { type: 'Üniversite', id: 3 },
  ];

  const jobs = [
    { type: 'Öğrenci', id: 1 },
    { type: 'Bilgisayar Müh.', id: 2 },
    { type: 'Öğretmen', id: 3 },
    { type: 'Diğer', id: 4 },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ alignItems: 'center', marginLeft: 10, paddingRight: 10, fontSize: 17 }}>Education Level : </Text>
        <Dropdown
          style={[styles.dropdown, { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={educationLevels}
          search
          maxHeight={300}
          labelField="type"
          valueField="id"
          placeholder={formik.values.educationLevel != '' ? formik.values.educationLevel : 'Please Select'}
          searchPlaceholder="Education Level"
          value={formik.values.educationLevel}
          onChange={handleDropdownChangeForEducationLevel}
          onBlur={() => formik.setFieldTouched('educationLevel', true)}
          error={formik.touched.educationLevel && formik.errors.educationLevel}
        />
      </View>
      {formik.touched.educationLevel && formik.errors.educationLevel && (
        <Text style={{ color: 'red', paddingLeft: 10 }}>{formik.errors.educationLevel}</Text>
      )}
      <View>
        <Text style={{ fontSize: 17, paddingLeft: 10, marginBottom: 10, marginTop: 30 }}>School Informations</Text>
        <FormInput
          name="identityNo"
          //value={values.identityNo}
          value={formik.values.schoolName}
          onChangeText={handleSchoolNameInputChange}
          onBlur={() => {
            formik.setFieldTouched('schoolName', true);
            setFormTouched(true);
          }}
          placeholder="Enter your school name"
          autoCapitalize="none"
          iconName="ios-mail"
          iconColor="#2C384A"
          //onBlur={handleBlur('identityNo')}
        />
        {formik.touched.schoolName && formik.errors.schoolName && (
          <Text style={{ color: 'red', paddingLeft: 10 }}>{formik.errors.schoolName}</Text>
        )}
        <FormInput
          name="identityNo"
          value={formik.values.major}
          onChangeText={handleMajorInputChange}
          onBlur={() => {
            formik.setFieldTouched('major', true);
            setFormTouched(true);
          }}
          placeholder="Enter your major"
          autoCapitalize="none"
          iconName="ios-mail"
          iconColor="#2C384A"
          //onBlur={handleBlur('identityNo')}
        />
        {formik.touched.major && formik.errors.major && (
          <Text style={{ color: 'red', paddingLeft: 10 }}>{formik.errors.major}</Text>
        )}
        <FormInput
          name="identityNo"
          value={formik.values.graduationYear}
          onChangeText={handleGradYearInputChange}
          onBlur={() => {
            formik.setFieldTouched('graduationYear', true);
            setFormTouched(true);
          }}
          placeholder="Enter your graduation year"
          autoCapitalize="none"
          iconName="ios-mail"
          iconColor="#2C384A"
          //onBlur={handleBlur('identityNo')}
        />
        {formik.touched.graduationYear && formik.errors.graduationYear && (
          <Text style={{ color: 'red', paddingLeft: 10 }}>{formik.errors.graduationYear}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EducationAndCompetence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageArea: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 25,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    height: 40,
    width: Dimensions.get('window').width / 2.3,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    paddingLeft: 10,
    marginBottom: 10,
  },
  selectDate: {
    fontFamily: 'open-sans',
    fontSize: 20,
    marginTop: 50,
    marginBottom: 10,
    alignSelf: 'center',
    color: 'red',
  },
  datebox: {
    alignSelf: 'center',
    height: 50,
    width: 500,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginLeft: 10,
    marginRight: 10,
  },
  paragraph: {
    fontSize: 15,
    marginBottom: 14,
    marginRight: 10,
  },
  checkbox: {
    margin: 10,
  },
});
