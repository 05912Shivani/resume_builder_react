import { configureStore } from '@reduxjs/toolkit';
import templatesReducer from './templatesSlice';
import formDataReducer from './formDataSlice';

export const store = configureStore({
  reducer: {
    templates: templatesReducer, // Assigning templates slice reducer to "templates" state
    formData: formDataReducer,// Assigning formData slice reducer to "formData" state
  },
});

