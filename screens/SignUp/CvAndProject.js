import React, { useState, useEffect, useContext } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { View, Text, Button, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalContext } from '../../context/GlobalContext';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  selectedPdf: Yup.string().required('Please select a PDF file'),
});

const CvAndProject = (props) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [selectedPdf, setSelectedPdf] = useState();
  const [projectDetails, setProjectDetails] = useState(['']);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch({
          type: 'UPLOAD_CV',
          projectDetails: projectDetails,
        });
      };
    }, [projectDetails]),
  );

  const initialValues = { selectedPdf: '' };
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    formik.validateForm();
  }, []);

  useEffect(() => {
    formik.setFieldTouched('selectedPdf', true);
  }, []);

  useEffect(() => {
    if (formik.isValid) {
      props.handleSuccess(formik.isValid);
    } else {
      props.handleSuccess(false);
    }
  }, [formik.isValid]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
      if (result.assets[0].name != '') {
        console.log(result.assets[0]);
        setSelectedPdf(result.assets[0]);
        dispatch({
          type: 'UPLOAD_CV',
          cvPath: result.assets[0]?.uri,
          cvName: result.assets[0]?.name,
          projectDetails: projectDetails,
        });
        formik.setFieldValue('selectedPdf', result.assets[0].name);
        formik.setFieldTouched('selectedPdf', true);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const addDetail = () => {
    setProjectDetails([...projectDetails, '']);
  };

  const removeDetail = (index) => {
    const updatedDetails = [...projectDetails];
    updatedDetails.splice(index, 1);
    setProjectDetails(updatedDetails);
  };

  const updateDetail = (index, value) => {
    const updatedDetails = [...projectDetails];
    updatedDetails[index] = value;
    setProjectDetails(updatedDetails);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            height: 40,
            width: 100,
            borderRadius: 10,
            backgroundColor: '#1e1e1e',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
          onPress={pickDocument}
        >
          <Text style={{ color: '#ffffffdd', justifyContent: 'center', alignItems: 'center' }}>Upload CV</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={{
            marginLeft: 10,
            borderRadius: 10,
            paddingLeft: 10,
            marginRight: 10,
            borderColor: 'gray',
            borderWidth: 1,
            marginVertical: 10,
            color: 'black',
          }}
          value={formik.values.selectedPdf}
          onChangeText={formik.handleChange('selectedPdf')}
          onBlur={formik.handleBlur('selectedPdf')}
          editable={false}
        />
        {formik.touched.selectedPdf && formik.errors.selectedPdf && (
          <Text style={{ color: 'red', paddingLeft: 10 }}>{formik.errors.selectedPdf}</Text>
        )}
        {formik.errors.selectedPdf == undefined ? (
          <Text style={{ marginLeft: 12, color: 'black', alignItems: 'center', alignContent: 'center' }}>
            Selected PDF: {selectedPdf?.name}
          </Text>
        ) : null}
      </View>
      <View>
        <Text style={{ fontSize: 17, paddingLeft: 10, marginBottom: 10, marginTop: 30 }}>Project Details</Text>
        {projectDetails.map((detail, index) => (
          <View key={index}>
            <TextInput
              style={{
                height: 50,
                borderColor: 'gray',
                borderWidth: 1,
                marginLeft: 10,
                borderRadius: 10,
                paddingLeft: 10,
                marginRight: 10,
                marginBottom: 10,
              }}
              value={detail}
              onChangeText={(text) => updateDetail(index, text)}
            />
            <TouchableOpacity
              style={{
                height: 40,
                width: 100,
                marginLeft: 10,
                marginBottom: 10,
                borderRadius: 10,
                backgroundColor: '#1e1e1e',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => removeDetail(index)}
            >
              <Text style={{ color: '#ffffffdd', justifyContent: 'center', alignItems: 'center' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={{
            height: 40,
            width: 100,
            marginLeft: 10,
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: '#5ac2e8',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
          onPress={addDetail}
        >
          <Text style={{ color: '#ffffffdd', justifyContent: 'center', alignItems: 'center' }}>Add Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CvAndProject;

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
