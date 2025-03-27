import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: [],
  workExperience: [],
  education: [],
  keySkills: [],
  projects: [],
  activeTab: 0,// Tracks which tab is currently active in the form UI
  templateId: 1,// Stores selected resume template ID
};

const formDataSlice = createSlice({
  name: 'formData',// Name of the slice
  initialState,// Setting the initial state
  reducers: {
    updateFormData: (state, action) => {
      const { field, data } = action.payload;
      state[field] = data; // Dynamically updates any field in the state
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;// Updates the active form tab
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
      state.templateId = action.payload;// Sets the selected resume template ID
    },
    resetFormData: () => initialState,  // Resets the state to its initial values
  },
});

export const {
  updateFormData,// Exporting action to update any form data dynamically
  setActiveTab,// Exporting action to update active tab state
  savePersonalInfo,
  saveWorkExperience,
  saveEducation,
  saveKeySkills,
  saveProjects,
  setTemplateId,// Exporting action to update selected template ID
  resetFormData // Exporting action to reset the form data
} = formDataSlice.actions;

export default formDataSlice.reducer;


