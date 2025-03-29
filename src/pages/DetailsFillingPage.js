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
  const activeTab = useSelector((state) => state.formData.activeTab);
  const templateId = useSelector((state) => state.formData.templateId);
  const personalInfo = useSelector((state) => state.formData.personalInfo);
  const workExperience = useSelector((state) => state.formData.workExperience);
  const education = useSelector((state) => state.formData.education);
  const keySkills = useSelector((state) => state.formData.keySkills);
  const projects = useSelector((state) => state.formData.projects);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { templateId: passedTemplateId } = location.state || {}; 

  useEffect(() => {
    if (passedTemplateId) {
      dispatch(setTemplateId(passedTemplateId));  
    }
  }, [passedTemplateId, dispatch]);

  const handleTabChange = (event, newValue) => {
    dispatch(setActiveTab(newValue));
  };

  const previewResume = () => {
    console.log('Previewing template:', templateId); 
    navigate(`/preview${templateId}`, { state: { templateId } }); 
  };

  // ✅ Check if all forms are filled
  const isAllFormsFilled = () => {
    return (
      Object.keys(personalInfo).length > 0 &&  // Personal Info should not be empty
      workExperience.length > 0 &&  // At least one Work Experience
      Object.keys(education).length > 0 &&  // Education should not be empty
      Object.keys(keySkills).length > 0 &&  // Key Skills should not be empty
      projects.length > 0  // At least one Project
    );
  };

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
      <Box>{renderForm()}</Box>
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
            disabled={!isAllFormsFilled()} // 🔥 Disable until all forms are filled
          >
            Preview Resume
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DetailsFillingPage;
