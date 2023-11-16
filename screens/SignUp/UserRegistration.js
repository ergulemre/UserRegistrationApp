import React, { Fragment, useState, useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { GlobalContext } from '../../context/GlobalContext';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

import * as Yup from 'yup';
import FormInput from '../../components/FormInput';
import Checkbox from '../../components/Checkbox';
import UploadImage from './UploadImage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const validationSchema = Yup.object().shape({
  name: Yup.string().label('Name').required().min(2, 'Must have at least 2 characters'),
  kvkkAccepted: Yup.boolean().oneOf([true], 'You must agree to the kvkk terms'),
  identityNo: Yup.string()
    .matches(/^[0-9]+$/, 'Please enter a valid numeric value')
    .min(11, 'Identity No field must be at least 11 digits')
    .required('Identity No field is required'),
});

const UserRegistration = (props) => {
  const [state, dispatch] = useContext(GlobalContext);

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const [name, setName] = useState();
  const [nationality, setNationality] = useState();
  const [city, setCity] = useState();
  const [identityNo, setIdentityNo] = useState();
  const [telephone, setTelephone] = useState();
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState();
  const [isKvkkAccepted, setKvkkAccepted] = useState(false);
  const [countries, setCountries] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch({
          type: 'USER_REGISTRATION',
          name: name,
          country: nationality,
          city: city,
          identityNo: identityNo,
          telephone: telephone,
          birthDate: date,
          gender: gender,
          isKvkkAccepted: isKvkkAccepted,
        });
      };
    }, [name, nationality, city, identityNo, telephone, date, gender, isKvkkAccepted]),
  );

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    let response = await fetch('https://restcountries.com/v3.1/all');
    let json = await response.json();
    const countryNames = [];
    json.forEach((name, index) => {
      const country = {};
      country['name'] = name.name.common;
      country['id'] = index + 1;
      countryNames.push(country);
    });
    setCountries(countryNames);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      nationality: '',
      city: '',
      identityNo: '',
      telephone: '',
      date: date,
      gender: '',
      kvkkAccepted: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    initialTouched: { name: true, kvkkAccepted: true },
  });

  const genderTypes = [
    { title: 'man', id: 1 },
    { title: 'woman', id: 2 },
  ];

  const cities = [
    { name: 'Los Angeles', id: 1 },
    { name: 'Philadelphia', id: 2 },
    { name: 'Chicago', id: 3 },
    { name: 'Washington DC', id: 4 },
  ];

  useEffect(() => {
    // Mark the field as touched when the component mounts
    formik.setFieldTouched('name', true);
    formik.setFieldTouched('identityNo', true);
    formik.setFieldTouched('kvkkAccepted', true);
  }, []);

  useEffect(() => {
    // Trigger when the form becomes valid
    if (formik.isValid && formTouched) {
      props.handleSuccess(formik.isValid);
    } else {
      props.handleSuccess(false);
    }
  }, [formik.isValid, formTouched]);

  const handleNameInputChange = (inputFieldValue) => {
    formik.setFieldValue('name', inputFieldValue);
    formik.setFieldTouched('name', true);
    setName(inputFieldValue);
    setFormTouched(true);
  };

  const handleIdentityNoInputChange = (inputFieldValue) => {
    formik.setFieldValue('identityNo', inputFieldValue);
    formik.setFieldTouched('identityNo', true);
    setIdentityNo(inputFieldValue);
    setFormTouched(true);
  };

  const handleKvkkBoxStateChange = (inputFieldValue) => {
    formik.setFieldValue('kvkkAccepted', inputFieldValue);
    setKvkkAccepted(inputFieldValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageArea}>
        <UploadImage />
      </View>
      <View>
        <FormInput
          name="name"
          value={formik.values.name}
          onChangeText={handleNameInputChange}
          onBlur={() => {
            formik.setFieldTouched('name', true);
            setFormTouched(true);
          }}
          placeholder="Enter your full name"
          iconName="md-person"
          iconColor="#2C384A"
          //autoFocus={true}
        />
        {formik.touched.name && formik.errors.name && <Text style={styles.errorText}>{formik.errors.name}</Text>}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Dropdown
            style={[styles.dropdown, { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={countries}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={nationality != undefined ? nationality : 'Country'}
            searchPlaceholder="Search..."
            //value={values.nationality}
            //onFocus={() => setIsFocus(true)}
            //onBlur={() => setIsFocus(false)}
            onChange={(value) => {
              setNationality(value.name);
            }}
          />
          <Dropdown
            style={[styles.dropdown, { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={cities}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={city != undefined ? city : 'City'}
            searchPlaceholder="Search..."
            //value={values.city}
            //onFocus={() => setIsFocus(true)}
            //onBlur={() => setIsFocus(false)}
            onChange={(value) => {
              setCity(value.name);
            }}
          />
        </View>
        <FormInput
          name="identityNo"
          value={formik.values.identityNo}
          keyboardType="numeric"
          onChangeText={handleIdentityNoInputChange}
          onBlur={() => {
            formik.setFieldTouched('identityNo', true);
            setFormTouched(true);
          }}
          placeholder="Enter Identity Number"
          autoCapitalize="none"
          iconName="ios-mail"
          iconColor="#2C384A"
          //onBlur={handleBlur('identityNo')}
        />
        {formik.touched.identityNo && formik.errors.identityNo && (
          <Text style={styles.errorText}>{formik.errors.identityNo}</Text>
        )}
        <FormInput
          name="telephone"
          keyboardType="numeric"
          //value={values.telephone}
          onChangeText={(values) => setTelephone(values)}
          placeholder="Enter telephone number"
          iconName="ios-lock"
          iconColor="#2C384A"
          //onBlur={handleBlur('telephone')}
        />
        <View>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', paddingBottom: 10 }}
            onPress={() => setOpenStartDatePicker(true)}
          >
            <Text style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>{moment(date).format('DD/MM/YYYY')}</Text>
            <AntDesign name="calendar" size={20} color="black" style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <View style={styles.line} />
        </View>
        <DateTimePickerModal
          isVisible={openStartDatePicker}
          mode="date"
          date={date}
          maximumDate={new Date()}
          onConfirm={(selectedDate) => {
            setOpenStartDatePicker(false);
            console.log(selectedDate);
            setDate(selectedDate);
          }}
          onCancel={() => setOpenStartDatePicker(false)}
          //locale={'tr'}
          confirmTextIOS={'Confirm'}
          cancelTextIOS={'Cancel'}
        />
        <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
          <Dropdown
            style={[styles.dropdown, { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={genderTypes}
            search
            maxHeight={300}
            labelField="title"
            valueField="id"
            placeholder={gender != undefined ? gender : 'Gender'}
            searchPlaceholder="Search..."
            value={gender}
            //onFocus={() => setIsFocus(true)}
            //onBlur={() => setIsFocus(false)}
            onChange={(value) => {
              setGender(value.title);
            }}
          />
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
            <Checkbox
              style={styles.checkbox}
              disabled={false}
              value={isKvkkAccepted}
              onValueChange={handleKvkkBoxStateChange}
            />
            <Text style={styles.paragraph}>
              Kişisel verilerin işlenmesine ilişkin aydınlatma metnini kabul ediyorum.{' '}
            </Text>
          </View>
          {formik.errors.kvkkAccepted && (
            <Text style={[styles.errorText, { marginBottom: 30 }]}>{formik.errors.kvkkAccepted}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserRegistration;

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
    height: 50,
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
