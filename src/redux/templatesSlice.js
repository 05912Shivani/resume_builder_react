import { createSlice } from '@reduxjs/toolkit';
import templatesData from '../utils/Data';
const templatesSlice = createSlice({
  name: 'templates',
  initialState: templatesData,
  reducers: {},
});


export default templatesSlice.reducer;


