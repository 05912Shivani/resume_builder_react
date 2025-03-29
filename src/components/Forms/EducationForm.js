import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Divider, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveEducation } from '../../redux/formDataSlice';

const EducationForm = () => {
  const dispatch = useDispatch();
  const educationList = useSelector((state) => state.formData.education);

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i); // Last 50 years

  const [newEducation, setNewEducation] = useState({
    educationType: '',
    degree: '',
    university: '',
    startYear: '',
    endYear: '',
    percentage: '',
  });

  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const validateForm = () => {
    let newErrors = {};
    if (!newEducation.educationType) newErrors.educationType = 'Education Type is required';
    if (!newEducation.degree) newErrors.degree = 'Degree is required';
    if (!newEducation.university) newErrors.university = 'University is required';
    if (!newEducation.startYear) newErrors.startYear = 'Start Year is required';
    if (newEducation.endYear && newEducation.startYear && newEducation.endYear < newEducation.startYear) {
      newErrors.endYear = 'End Year cannot be before Start Year';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleAddEducation = () => {
    if (!validateForm()) return;

    let updatedEducationList = [...educationList];
    if (editIndex !== null) {
      updatedEducationList[editIndex] = newEducation;
      setEditIndex(null);
    } else {
      updatedEducationList.push(newEducation);
    }

    dispatch(saveEducation(updatedEducationList));
    setNewEducation({ educationType: '', degree: '', university: '', startYear: '', endYear: '', percentage: '' });
    setErrors({});
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
            error={!!errors.educationType}
          >
            <MenuItem value="Post Graduation">Post Graduation</MenuItem>
            <MenuItem value="Graduation">Graduation</MenuItem>
            <MenuItem value="Higher Secondary">Higher Secondary</MenuItem>
            <MenuItem value="Secondary">Secondary</MenuItem>
            <MenuItem value="Diploma">Diploma</MenuItem>
          </Select>
          {errors.educationType && <Typography color="error">{errors.educationType}</Typography>}
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
          error={!!errors.degree}
          helperText={errors.degree}
        />
        <TextField
          label="University"
          name="university"
          value={newEducation.university}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.university}
          helperText={errors.university}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl fullWidth required>
          <InputLabel>Start Year</InputLabel>
          <Select
            name="startYear"
            value={newEducation.startYear}
            onChange={handleInputChange}
            label="Start Year"
            error={!!errors.startYear}
          >
            <MenuItem value="">Currently Working</MenuItem>
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
            ))}
          </Select>
          {errors.startYear && <Typography color="error">{errors.startYear}</Typography>}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>End Year (optional)</InputLabel>
          <Select
            name="endYear"
            value={newEducation.endYear}
            onChange={handleInputChange}
            label="End Year (optional)"
            error={!!errors.endYear}
          >
            <MenuItem value="">N/A</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
          {errors.endYear && <Typography color="error">{errors.endYear}</Typography>}
        </FormControl>
      </Box>

      <TextField
        label="Percentage (optional)"
        name="percentage"
        value={newEducation.percentage}
        onChange={handleInputChange}
        fullWidth
        sx={{ mb: 2 }}
      />

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

