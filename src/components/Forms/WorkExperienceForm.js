import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveWorkExperience } from '../../redux/formDataSlice';

const WorkExperienceForm = () => {
  const dispatch = useDispatch();
  const workExperienceList = useSelector((state) => state.formData.workExperience);

  const [newExperience, setNewExperience] = useState({
    jobTitle: '',
    companyName: '',
    startYear: '',
    endYear: '',
    jobDescription: '',
  });

  const [error, setError] = useState('');
  const [editIndex, setEditIndex] = useState(null); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleAddExperience = () => {
    if (!newExperience.jobTitle || !newExperience.companyName || !newExperience.startYear) {
      setError('Job Title, Company Name, and Start Year are required.');
      return;
    }

    let updatedExperienceList = [...workExperienceList];

    if (editIndex !== null) {
      updatedExperienceList[editIndex] = newExperience; 
      setEditIndex(null);
    } else {
      updatedExperienceList.push(newExperience);
    }

    dispatch(saveWorkExperience(updatedExperienceList));
    setNewExperience({ jobTitle: '', companyName: '', startYear: '', endYear: '', jobDescription: '' });
    setError('');
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
        />
        <TextField
          label="Company Name"
          name="companyName"
          value={newExperience.companyName}
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
          value={newExperience.startYear}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="End Year (optional)"
          name="endYear"
          type="number"
          value={newExperience.endYear}
          onChange={handleInputChange}
          fullWidth
        />
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

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

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
            <Typography>End Year: {experience.endYear || 'N/A'}</Typography>
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
