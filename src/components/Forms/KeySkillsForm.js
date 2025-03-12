import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Divider, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { saveKeySkills } from '../../redux/formDataSlice';

const KeySkillsForm = () => {
  const dispatch = useDispatch();
  const keySkillsList = useSelector((state) => state.formData.keySkills);

  const [newSkill, setNewSkill] = useState({
    skillName: '',
    proficiency: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleAddSkill = () => {
    if (!newSkill.skillName || !newSkill.proficiency) {
      setError('Skill Name and Proficiency Level are required.');
      return;
    }

    dispatch(saveKeySkills([...keySkillsList, newSkill]));
    setNewSkill({ skillName: '', proficiency: '' });
    setError('');
  };

  const handleRemoveSkill = (index) => {
    const updatedKeySkills = keySkillsList.filter((_, i) => i !== index);
    dispatch(saveKeySkills(updatedKeySkills));
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


