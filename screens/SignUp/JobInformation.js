import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { GlobalContext } from '../../context/GlobalContext';
import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/FormInput';

const validationSchema = Yup.object().shape({
  jobSituation: Yup.string().required('Please select an option'),
  job: Yup.string().required('Please select an option'),
});

const JobInformation = (props) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [jobSituation, setJobSituation] = useState();
  const [job, setJob] = useState();
  const [otherJob, setOtherJob] = useState();
  const [formTouched, setFormTouched] = useState(false);

  const formik = useFormik({
    initialValues: {
      jobSituation: '',
      job: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    initialTouched: { jobSituation: true, job: true },
  });

  useEffect(() => {
    formik.setFieldTouched('jobSituation', true);
    formik.setFieldTouched('job', true);
  }, []);

  useEffect(() => {
    formik.validateForm();
  }, [formik.values.jobSituation, formik.values.job]);

  useEffect(() => {
    if (formik.isValid && formTouched) {
      props.handleSuccess(formik.isValid);
    } else {
      props.handleSuccess(false);
    }
  }, [formik.isValid, formTouched]);

  const handleDropdownChangeForJobSituation = (jobSituation) => {
    formik.setFieldValue('jobSituation', jobSituation.type);
    formik.setFieldTouched('jobSituation', true);
    setJobSituation(jobSituation);
    setFormTouched(true);
  };

  const handleDropdownChangeForJob = (job) => {
    formik.setFieldValue('job', job.type);
    formik.setFieldTouched('job', true);
    setJob(job);
    setFormTouched(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch({
          type: 'JOB_INFORMATIONS',
          workingSituation: jobSituation?.type,
          job: job?.type,
          otherJob: otherJob,
        });
      };
    }, [jobSituation, job]),
  );

  const situations = [
    { type: 'Öğrenci', id: 1 },
    { type: 'Çalışan', id: 2 },
    { type: 'İşsiz', id: 3 },
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
        <Text style={{ alignItems: 'center', marginLeft: 10, paddingRight: 10, fontSize: 17 }}>
          Working Situation :{' '}
        </Text>
        <Dropdown
          style={[styles.dropdown, { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={situations}
          search
          maxHeight={300}
          labelField="type"
          valueField="id"
          placeholder={formik.values.jobSituation != '' ? formik.values.jobSituation : 'Please Select'}
          searchPlaceholder="Working Situation"
          value={formik.values.jobSituation}
          onChange={handleDropdownChangeForJobSituation}
          onBlur={() => formik.setFieldTouched('jobSituation', true)}
          error={formik.touched.jobSituation && formik.errors.jobSituation}
        />
      </View>

      {formik.touched.jobSituation && formik.errors.jobSituation && (
        <Text style={{ color: 'red', paddingLeft: 10 }}>{formik.errors.jobSituation}</Text>
      )}
      <View style={{ flexDirection: 'row', paddingTop: 20, height: 80, alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ alignItems: 'center', marginLeft: 10, paddingRight: 10, fontSize: 17 }}>Job : </Text>
        <Dropdown
          style={[styles.dropdown, { borderColor: 'blue', marginLeft: 105 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={jobs}
          search
          maxHeight={300}
          labelField="type"
          valueField="id"
          placeholder={formik.values.job != '' ? formik.values.job : 'Please Select'}
          searchPlaceholder="Jobs"
          value={formik.values.job}
          onChange={handleDropdownChangeForJob}
          onBlur={() => formik.setFieldTouched('job', true)}
          error={formik.touched.job && formik.errors.job}
        />
      </View>
      {formik.touched.job && formik.errors.job && (
        <Text style={{ color: 'red', paddingLeft: 10 }}>{formik.errors.job}</Text>
      )}
      {job?.id == 4 ? (
        <View style={{ marginTop: 20 }}>
          <FormInput
            name="identityNo"
            //value={values.identityNo}
            onChangeText={(values) => setOtherJob(values)}
            placeholder="Enter your job"
            autoCapitalize="none"
            iconName="ios-mail"
            iconColor="#2C384A"
            //onBlur={handleBlur('identityNo')}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default JobInformation;

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
