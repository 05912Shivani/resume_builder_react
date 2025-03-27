import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Divider, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { saveKeySkills } from '../../redux/formDataSlice';

const KeySkillsForm = () => {
  const dispatch = useDispatch();// Redux dispatch function to update the store
  const keySkillsList = useSelector((state) => state.formData.keySkills);// Fetch key skills list from Redux store

   // State for new skill entry
  const [newSkill, setNewSkill] = useState({
    skillName: '',
    proficiency: '',
  });

  const [error, setError] = useState('');// State for error messages

  // Handles input changes for skill name and proficiency
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  // Adds a new skill to the keySkills list
  const handleAddSkill = () => {
    if (!newSkill.skillName || !newSkill.proficiency) {
      setError('Skill Name and Proficiency Level are required.');
      return;
    }

    // Update Redux store with new skill
    dispatch(saveKeySkills([...keySkillsList, newSkill]));
    setNewSkill({ skillName: '', proficiency: '' });
    setError('');
  };

  // Removes a skill from the keySkills list
  const handleRemoveSkill = (index) => {
    const updatedKeySkills = keySkillsList.filter((_, i) => i !== index);
    dispatch(saveKeySkills(updatedKeySkills));// Update Redux store
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add Your Key Skills
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Skill Name"
          name="skillName"
          value={newSkill.skillName}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Proficiency Level"
          name="proficiency"
          value={newSkill.proficiency}
          onChange={handleInputChange}
          select
          fullWidth
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </TextField>
      </Box>

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button variant="contained" color="primary" onClick={handleAddSkill} sx={{ mb: 3 }}>
        Add Skill
      </Button>

      <Typography variant="h6" gutterBottom>
        Your Key Skills
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {keySkillsList.length > 0 ? (
        keySkillsList.map((skill, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                {skill.skillName} - {skill.proficiency}
              </Typography>
              <IconButton onClick={() => handleRemoveSkill(index)} color="error" sx={{ ml: 2 }}>
                <DeleteIcon />
              </IconButton>
            </Box>

            <Divider sx={{ my: 2 }} />
          </Box>
        ))
      ) : (
        <Typography>No key skills added yet.</Typography>
      )}
    </Box>
  );
};

export default KeySkillsForm;


