import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveProjects } from '../../redux/formDataSlice';// Import Redux action to save education details

const ProjectsForm = () => {
  const dispatch = useDispatch();// Get the dispatch function to update Redux state
  const projects = useSelector((state) => state.formData.projects);// Get stored projects data from Redux

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
  });// Store new projects details

  const [errors, setErrors] = useState({});// Store validation errors
  const [editingIndex, setEditingIndex] = useState(null);// Track index of the entry being edited

  const validateForm = () => {
    let newErrors = {};

    if (!newProject.title) newErrors.title = 'Title is required.';

    if (!newProject.description || newProject.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters.';
    }

    if (newProject.link && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(newProject.link)) {
      newErrors.link = 'Enter a valid URL (starting with http or https).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });// Update specific field in the form state
  };

  const handleAddOrUpdateProject = () => {
    if (!validateForm()) return;// Validate form before saving

    if (editingIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = newProject;// Update existing entry if editing
      dispatch(saveProjects(updatedProjects));
      setEditingIndex(null);
    } else {
      dispatch(saveProjects([...projects, newProject]));
    }

    setNewProject({ title: '', description: '', technologies: '', link: '' });
    setErrors({});
  };

  const handleEditProject = (index) => {
    setNewProject(projects[index]);
    setEditingIndex(index);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);// Remove selected entry
    dispatch(saveProjects(updatedProjects)); // Update Redux state
    setEditingIndex(null);
    setNewProject({ title: '', description: '', technologies: '', link: '' });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add Your Projects
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Project Title"
          name="title"
          value={newProject.title}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Description"
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          required
          sx={{ mb: 2 }}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Technologies Used (comma-separated)"
          name="technologies"
          value={newProject.technologies}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Project Link"
          name="link"
          value={newProject.link}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.link}
          helperText={errors.link}
        />
      </Box>

      <Button variant="contained" color="primary" onClick={handleAddOrUpdateProject} sx={{ mb: 3 }}>
        {editingIndex !== null ? 'Update Project' : 'Add Project'}
      </Button>

      <Typography variant="h6" gutterBottom>
        Your Projects
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', wordWrap: 'break-word', overflow: 'hidden' }}>
                {project.title}
              </Typography>
              <Typography sx={{ wordWrap: 'break-word', overflow: 'hidden' }}>{project.description}</Typography>
              <Typography sx={{ wordWrap: 'break-word', overflow: 'hidden' }}>Technologies: {project.technologies}</Typography>
              {project.link && (
                <Typography sx={{ wordWrap: 'break-word', overflow: 'hidden' }}>
                  Link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
                </Typography>
              )}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEditProject(index)}
                sx={{ mt: 1, mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleRemoveProject(index)}
                sx={{ mt: 1 }}
              >
                Remove
              </Button>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))
        ) : (
          <Typography>No projects added yet.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProjectsForm;

