import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Divider, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveEducation } from '../../redux/formDataSlice';

const EducationForm = () => {
  const dispatch = useDispatch();
  const educationList = useSelector((state) => state.formData.education);

  const [newEducation, setNewEducation] = useState({
    educationType: '',
    degree: '',
    university: '',
    startYear: '',
    endYear: '',
    percentage: '',
  });

  const [error, setError] = useState('');
  const [editIndex, setEditIndex] = useState(null); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleAddEducation = () => {
    if (!newEducation.educationType || !newEducation.degree || !newEducation.university || !newEducation.startYear) {
      setError('Education Type, Degree, University, and Start Year are required.');
      return;
    }

    let updatedEducationList = [...educationList];

    if (editIndex !== null) {
      updatedEducationList[editIndex] = newEducation; 
      setEditIndex(null);
    } else {
      updatedEducationList.push(newEducation);
    }

    dispatch(saveEducation(updatedEducationList));
    setNewEducation({ educationType: '', degree: '', university: '', startYear: '', endYear: '', percentage: '' });
    setError('');
  };

  const handleEditEducation = (index) => {
    setNewEducation(educationList[index]);
    setEditIndex(index);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducationList = educationList.filter((_, i) => i !== index);
    dispatch(saveEducation(updatedEducationList));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add Your Education
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth required>
          <InputLabel>Education Type</InputLabel>
          <Select
            name="educationType"
            value={newEducation.educationType}
            onChange={handleInputChange}
            label="Education Type"
          >
            <MenuItem value="Post Graduation">Post Graduation</MenuItem>
            <MenuItem value="Graduation">Graduation</MenuItem>
            <MenuItem value="Higher Secondary">Higher Secondary</MenuItem>
            <MenuItem value="Secondary ">Secondary </MenuItem>
            <MenuItem value="Diploma ">Diploma </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Degree"
          name="degree"
          value={newEducation.degree}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="University"
          name="university"
          value={newEducation.university}
          onChange={handleInputChange}
          fullWidth
          required
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Start Year"
          name="startYear"
          type="number"
          value={newEducation.startYear}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="End Year (optional)"
          name="endYear"
          type="number"
          value={newEducation.endYear}
          onChange={handleInputChange}
          fullWidth
        />
      </Box>

      <TextField
        label="Percentage (optional)"
        name="percentage"
        value={newEducation.percentage}
        onChange={handleInputChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button variant="contained" color="primary" onClick={handleAddEducation} sx={{ mb: 3 }}>
        {editIndex !== null ? 'Update Education' : 'Add Education'}
      </Button>

      <Typography variant="h6" gutterBottom>
        Your Education
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {educationList.length > 0 ? (
        educationList.map((education, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {education.degree} - {education.educationType}
            </Typography>
            <Typography>Institution: {education.university}</Typography>
            <Typography>Start Year: {education.startYear}</Typography>
            <Typography>End Year: {education.endYear || 'N/A'}</Typography>
            <Typography>Grade: {education.percentage || 'N/A'}</Typography>

            <Button variant="outlined" color="primary" onClick={() => handleEditEducation(index)} sx={{ mt: 1, mr: 1 }}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => handleRemoveEducation(index)} sx={{ mt: 1 }}>
              Remove
            </Button>
            <Divider sx={{ my: 2 }} />
          </Box>
        ))
      ) : (
        <Typography>No education details added yet.</Typography>
      )}
    </Box>
  );
};

export default EducationForm;
