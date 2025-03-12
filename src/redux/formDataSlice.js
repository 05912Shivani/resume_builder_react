import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: [],
  workExperience: [],
  education: [],
  keySkills: [],
  projects: [],
  activeTab: 0,
  templateId: 1,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { field, data } = action.payload;
      state[field] = data;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    savePersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    saveWorkExperience: (state, action) => {
      state.workExperience = action.payload;
    },
    saveEducation: (state, action) => {
      state.education = action.payload;
    },
    saveKeySkills: (state, action) => {
      state.keySkills = action.payload;
    },
    saveProjects: (state, action) => {
      state.projects = action.payload;
    },
    setTemplateId: (state, action) => {
      state.templateId = action.payload;
    },
    resetFormData: () => initialState,  
  },
});

export const {
  updateFormData,
  setActiveTab,
  savePersonalInfo,
  saveWorkExperience,
  saveEducation,
  saveKeySkills,
  saveProjects,
  setTemplateId,
  resetFormData
} = formDataSlice.actions;

export default formDataSlice.reducer;


