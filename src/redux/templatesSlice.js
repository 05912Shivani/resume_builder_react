import { createSlice } from '@reduxjs/toolkit';
import templatesData from '../utils/Data';
const templatesSlice = createSlice({
  name: 'templates', // Slice name used in Redux state
  initialState: templatesData,// Setting initial state with predefined template data
  reducers: {},// No reducers are defined as this slice is read-only for now
});


export default templatesSlice.reducer;


