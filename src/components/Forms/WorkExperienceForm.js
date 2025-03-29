import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Divider, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveWorkExperience } from '../../redux/formDataSlice';

const WorkExperienceForm = () => {
  const dispatch = useDispatch();
  const workExperienceList = useSelector((state) => state.formData.workExperience);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1979 + 6 }, (_, i) => 1980 + i); 

  const [newExperience, setNewExperience] = useState({
    jobTitle: '',
    companyName: '',
    startYear: '',
    endYear: '',
    jobDescription: '',
  });

  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const validateForm = () => {
    let newErrors = {};
    if (!newExperience.jobTitle) newErrors.jobTitle = 'Job Title is required';
    if (!newExperience.companyName) newErrors.companyName = 'Company Name is required';
    if (!newExperience.startYear) newErrors.startYear = 'Start Year is required';

    if (newExperience.endYear && newExperience.startYear && newExperience.endYear < newExperience.startYear) {
      newErrors.endYear = 'End Year cannot be before Start Year';
    }

    if (newExperience.endYear && newExperience.endYear > currentYear) {
      newErrors.endYear = 'End Year cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleAddExperience = () => {
    if (!validateForm()) return;

    let updatedExperienceList = [...workExperienceList];

    if (editIndex !== null) {
      updatedExperienceList[editIndex] = newExperience;
      setEditIndex(null);
    } else {
      updatedExperienceList.push(newExperience);
    }

    dispatch(saveWorkExperience(updatedExperienceList));
    setNewExperience({ jobTitle: '', companyName: '', startYear: '', endYear: '', jobDescription: '' });
    setErrors({});
  };

  const handleEditExperience = (index) => {
    setNewExperience(workExperienceList[index]);
    setEditIndex(index);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperienceList = workExperienceList.filter((_, i) => i !== index);
    dispatch(saveWorkExperience(updatedExperienceList));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add Work Experience
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Job Title"
          name="jobTitle"
          value={newExperience.jobTitle}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.jobTitle}
          helperText={errors.jobTitle}
        />
        <TextField
          label="Company Name"
          name="companyName"
          value={newExperience.companyName}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.companyName}
          helperText={errors.companyName}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          select
          label="Start Year"
          name="startYear"
          value={newExperience.startYear}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!errors.startYear}
          helperText={errors.startYear}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="End Year (optional)"
          name="endYear"
          value={newExperience.endYear}
          onChange={handleInputChange}
          fullWidth
          error={!!errors.endYear}
          helperText={errors.endYear}
        >
          <MenuItem value="">Currently Working</MenuItem>
          {years
            .filter(year => year <= currentYear) // Restrict End Year to current year or earlier
            .map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
        </TextField>
      </Box>

      <TextField
        label="Job Description (optional)"
        name="jobDescription"
        value={newExperience.jobDescription}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" onClick={handleAddExperience} sx={{ mb: 3 }}>
        {editIndex !== null ? 'Update Experience' : 'Add Experience'}
      </Button>

      <Typography variant="h6" gutterBottom>
        Your Work Experience
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {workExperienceList.length > 0 ? (
        workExperienceList.map((experience, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {experience.jobTitle} at {experience.companyName}
            </Typography>
            <Typography>Start Year: {experience.startYear}</Typography>
            <Typography>End Year: {experience.endYear || 'Currently Working'}</Typography>
            <Typography>Job Description: {experience.jobDescription || 'N/A'}</Typography>

            <Button variant="outlined" color="primary" onClick={() => handleEditExperience(index)} sx={{ mt: 1, mr: 1 }}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => handleRemoveExperience(index)} sx={{ mt: 1 }}>
              Remove
            </Button>
            <Divider sx={{ my: 2 }} />
          </Box>
        ))
      ) : (
        <Typography>No work experience added yet.</Typography>
      )}
    </Box>
  );
};

export default WorkExperienceForm;
