import React, { useReducer, createContext } from 'react';

export const GlobalContext = createContext([]);

const initialState = {
  name: '',
  country: '',
  city: '',
  identityNo: '',
  telephone: '',
  birthDate: '',
  gender: '',
  isKvkkAccepted: false,
  profilePicturePath: '',
  workingSituation: '',
  job: '',
  otherJob: '',
  educationLevel: '',
  schoolName: '',
  major: '',
  graduationYear: '',
  cvPath: '',
  cvName: '',
  projectDetails: [''],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_REGISTRATION':
      return {
        ...state,
        name: action.name,
        country: action.country,
        city: action.city,
        identityNo: action.identityNo,
        telephone: action.telephone,
        birthDate: action.birthDate,
        gender: action.gender,
        isKvkkAccepted: action.isKvkkAccepted,
      };
    case 'JOB_INFORMATIONS':
      return {
        ...state,
        workingSituation: action.workingSituation,
        job: action.job,
        otherJob: action.otherJob,
      };
    case 'EDUCATION_AND_COMPETENCE':
      return {
        ...state,
        educationLevel: action.educationLevel,
        schoolName: action.schoolName,
        major: action.major,
        graduationYear: action.graduationYear,
      };
    case 'PROFILE_PICTURE':
      return {
        ...state,
        profilePicturePath: action.profilePicturePath,
      };
    case 'UPLOAD_CV':
      return {
        ...state,
        cvPath: action.cvPath,
        cvName: action.cvName,
        projectDetails: action.projectDetails,
      };
    default:
      return {
        ...state,
      };
  }
};

export const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GlobalContext.Provider value={[state, dispatch]}>{props.children}</GlobalContext.Provider>;
};
