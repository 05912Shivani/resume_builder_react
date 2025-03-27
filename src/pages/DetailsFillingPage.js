import React, { useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab, setTemplateId } from '../redux/formDataSlice';  
import PersonalInfoForm from '../components/Forms/PersonalInfoForm';
import WorkExperienceForm from '../components/Forms/WorkExperienceForm';
import EducationForm from '../components/Forms/EducationForm';
import KeySkillsForm from '../components/Forms/KeySkillsForm';
import ProjectsForm from '../components/Forms/ProjectsForm';
import { useNavigate, useLocation } from 'react-router-dom';

const DetailsFillingPage = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.formData.activeTab);// Retrieves the currently active tab from Redux store
  const templateId = useSelector((state) => state.formData.templateId); // Retrieves the selected template ID
  const navigate = useNavigate();
  const location = useLocation();
  const { templateId: passedTemplateId } = location.state || {}; // Extracts templateId from navigation state if available

  useEffect(() => {
    if (passedTemplateId) {
      dispatch(setTemplateId(passedTemplateId));   // Sets template ID in Redux store when received from navigation
    }
  }, [passedTemplateId, dispatch]);

  // Handles tab change and updates Redux state
  const handleTabChange = (event, newValue) => {
    dispatch(setActiveTab(newValue));
  };
// Navigates to preview page with selected template ID
  const previewResume = () => {
    console.log('Previewing template:', templateId); 
    navigate(`/preview${templateId}`, { state: { templateId } }); 
  };
// Renders the appropriate form based on the active tab
  const renderForm = () => {
    switch (activeTab) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <WorkExperienceForm />;
      case 2:
        return <EducationForm />;
      case 3:
        return <ProjectsForm />;
      case 4:
        return <KeySkillsForm />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Fill Your Details
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Personal Info" />
        <Tab label="Work Experience" />
        <Tab label="Education" />
        <Tab label="Projects" />
        <Tab label="Keyskills" />
      </Tabs>
  {/* Displays the form corresponding to the active tab */}
      <Box>{renderForm()}</Box>
        {/* Navigation Buttons */}
      <Box sx={{ mt: 3 }}>
        {activeTab > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(setActiveTab(activeTab - 1))}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
        )}
        {activeTab < 4 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(setActiveTab(activeTab + 1))}
          >
            Next
          </Button>
        )}
        {activeTab === 4 && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={previewResume}
            sx={{ ml: 2 }}
          >
            Preview Resume
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DetailsFillingPage;

