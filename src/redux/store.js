import { configureStore } from '@reduxjs/toolkit';
import templatesReducer from './templatesSlice';
import formDataReducer from './formDataSlice';

export const store = configureStore({
  reducer: {
    templates: templatesReducer,
    formData: formDataReducer,
  },
});

