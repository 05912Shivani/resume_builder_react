import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveProjects } from '../../redux/formDataSlice';

const ProjectsForm = () => {
  const dispatch = useDispatch();// Redux dispatch function
  const projects = useSelector((state) => state.formData.projects);// Retrieve projects from Redux store

   // State for new project input fields
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
  });

  const [error, setError] = useState('');// Error state for validation
  const [editingIndex, setEditingIndex] = useState(null);// Track which project is being edited

  // Handle input changes and update the newProject state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  // Handle adding or updating a project
  const handleAddOrUpdateProject = () => {
    // Validation: Check if required fields are filled
    if (!newProject.title || !newProject.description) {
      setError('Title and Description are required.');
      return;
    }

    if (editingIndex !== null) {
      // Update existing project
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = newProject;
      dispatch(saveProjects(updatedProjects));
      setEditingIndex(null);
    } else {
      // Add new project
      dispatch(saveProjects([...projects, newProject]));// Add new project to Redux store
    }
// Reset form fields
    setNewProject({ title: '', description: '', technologies: '', link: '' });
    setError('');
  };
// Handle editing an existing project
  const handleEditProject = (index) => {
    setNewProject(projects[index]);// Populate input fields with selected project data
    setEditingIndex(index);// Set the index to indicate editing mode
  };

  // Handle removing a project
  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);// Remove project at selected index
    dispatch(saveProjects(updatedProjects));// Dispatch updated projects list
    setEditingIndex(null);
    setNewProject({ title: '', description: '', technologies: '', link: '' });// Reset form fields
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
        />
      </Box>

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

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
