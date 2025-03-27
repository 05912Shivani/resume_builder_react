import React, { useState } from 'react';
import { Box, Typography, Divider, Grid, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../redux/formDataSlice'; // Redux action to track the active section

const ResumeTemplate = ({ personalInfo, workExperience, education, keySkills, projects }) => {
   // State variables to control the visibility of different resume sections
  const [includeWorkExperience, setIncludeWorkExperience] = useState(true);
  const [includeEducation, setIncludeEducation] = useState(true);
  const [includeProjects, setIncludeProjects] = useState(true);
  const [includeKeySkills, setIncludeKeySkills] = useState(true);
  
  const navigate = useNavigate();// Hook for navigation
  const dispatch = useDispatch();// Hook to dispatch Redux actions

  // Function to navigate to the details-filling page and set the active tab
  const handleEdit = (sectionIndex) => {
    dispatch(setActiveTab(sectionIndex)); // Store which section is being edited
    navigate('/details-filling'); // Redirect to the editing page
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 800,
        mx: 'auto',
        backgroundColor: '#f9f9f9',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          {personalInfo?.fullName || 'Your Name'}
        </Typography>
        <Typography variant="body1">{personalInfo?.email || 'your.email@example.com'}</Typography>
        <Typography variant="body1">{personalInfo?.phone || '123-456-7890'}</Typography>
        <Typography variant="body1">{personalInfo?.address || 'Your Address'}</Typography>
      </Box>
      <Divider sx={{ my: 3 }} />
      
      {includeWorkExperience && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Work Experience
          </Typography>
          {workExperience && workExperience.length > 0 ? (
            workExperience.map((job, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{job.companyName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.role} | {job.startDate} - {job.endDate || 'Present'}
                </Typography>
                <Typography variant="body1">{job.description}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1">No work experience provided.</Typography>
          )}
          <Button
            variant="text"
            color="primary"
            onClick={() => handleEdit(1)}
            sx={{ mt: 1 }}
          >
            Edit
          </Button>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
      
      {includeEducation && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Education
          </Typography>
          {education && education.length > 0 ? (
            education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{edu.institution}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {edu.degree} | {edu.startDate} - {edu.endDate || 'Ongoing'}
                </Typography>
                <Typography variant="body1">{edu.description}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1">No education details provided.</Typography>
          )}
          <Button
            variant="text"
            color="primary"
            onClick={() => handleEdit(2)}
            sx={{ mt: 1 }}
          >
            Edit
          </Button>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
      
      {includeProjects && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Projects
          </Typography>
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {project.title}
                </Typography>
                <Typography>{project.description}</Typography>
                <Typography>Role: {project.role}</Typography>
                <Typography>Technologies: {project.technologies}</Typography>
                {project.link && (
                  <Typography>
                    Link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <Typography>No projects added yet.</Typography>
          )}
          <Button
            variant="text"
            color="primary"
            onClick={() => handleEdit(3)}
            sx={{ mt: 1 }}
          >
            Edit
          </Button>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
      
      {includeKeySkills && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Key Skills
          </Typography>
          {keySkills && keySkills.length > 0 ? (
            <Grid container spacing={1}>
              {keySkills.map((skill, index) => (
                <Grid item key={index} xs={4}>
                  <Typography variant="body1">
                    - {skill.skillName} ({skill.proficiency})
                  </Typography>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No key skills provided.</Typography>
          )}
          <Button
            variant="text"
            color="primary"
            onClick={() => handleEdit(4)}
            sx={{ mt: 1 }}
          >
            Edit
          </Button>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
      
      <Box>
        <Typography variant="h6">Include or Exclude Sections</Typography>
        <FormControlLabel
          control={<Checkbox checked={includeWorkExperience} onChange={() => setIncludeWorkExperience(!includeWorkExperience)} />}
          label="Include Work Experience"
        />
        <FormControlLabel
          control={<Checkbox checked={includeEducation} onChange={() => setIncludeEducation(!includeEducation)} />}
          label="Include Education"
        />
        <FormControlLabel
          control={<Checkbox checked={includeProjects} onChange={() => setIncludeProjects(!includeProjects)} />}
          label="Include Projects"
        />
        <FormControlLabel
          control={<Checkbox checked={includeKeySkills} onChange={() => setIncludeKeySkills(!includeKeySkills)} />}
          label="Include Key Skills"
        />
      </Box>
    </Box>
  );
};

export default ResumeTemplate;
