import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography, Divider, Modal, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setActiveTab } from "../redux/formDataSlice";
import jsPDF from "jspdf";

const PreviewPage2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    personalInfo,
    workExperience,
    education,
    projects,
    keySkills,
    activeTab,
  } = useSelector((state) => state.formData);

  const [isModalOpen, setModalOpen] = useState(false);
  const [resumeName, setResumeName] = useState("resume");
  const [sections, setSections] = useState({
    personalInfo: true,
    workExperience: true,
    education: true,
    projects: true,
    keySkills: true,
  });
  const resumeRef = useRef();

  useEffect(() => {
    if (!activeTab && personalInfo.name) {
      setSections({
        personalInfo: true,
        workExperience: true,
        education: true,
        projects: true,
        keySkills: true,
      });
    }
  }, [activeTab, personalInfo]);

  const toggleSection = (section) => {
    setSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
  
    let leftYPosition = 50; 
    let rightYPosition = 50; 
    const pageHeight = doc.internal.pageSize.height - 20;
    const leftMargin = 10;
    const rightStartX = 100; 
    const sectionWidthLeft = 80; 
    const sectionWidthRight = 100; 
    let blueStartY = leftYPosition - 6;
  
   
    const drawLeftColumnBackground = (startY) => {
      doc.setFillColor(173, 216, 230); 
      doc.rect(0, startY, sectionWidthLeft + leftMargin, pageHeight - startY + 20, "F");
    };
  
    const checkPageOverflow = (y) => {
      if (y > pageHeight) {
        doc.addPage();
        blueStartY = 0;
        drawLeftColumnBackground(blueStartY);
        return 20;
      }
      return y;
    };
  
    const addWrappedText = (text, x, y, maxWidth) => {
      const splitText = doc.splitTextToSize(text, maxWidth);
      splitText.forEach((line) => {
        y = checkPageOverflow(y);
        doc.text(line, x, y);
        y += 5;
      });
      return y;
    };
  
    const addSectionTitle = (title, x, y) => {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      y = checkPageOverflow(y);
      doc.text(title, x, y);
      return y + 10;
    };
  
    drawLeftColumnBackground(blueStartY);
  
    if (sections.personalInfo) {
      doc.setFillColor(200, 200, 200); 
      doc.rect(0, 0, doc.internal.pageSize.width,43.7, 'F'); 
    
      leftYPosition = 20;
      const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
       doc.setFont("helvetica", "bold");
       doc.setFontSize(30);
      const nameWidth = doc.getTextWidth(fullName);
      const centerX = (doc.internal.pageSize.width - nameWidth) / 2;
      doc.text(fullName, centerX, leftYPosition);
      leftYPosition += 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      const contactText = `${personalInfo.email} | ${personalInfo.github} | ${personalInfo.linkedin}|${personalInfo.phone}|${personalInfo.address}`;
      const contactWidth = doc.getTextWidth(contactText);
      const contactCenterX = (doc.internal.pageSize.width - contactWidth) / 2;
      doc.text(contactText, contactCenterX, leftYPosition);
      leftYPosition += 20;
    }
  
    if (personalInfo.objective) {
      leftYPosition = addSectionTitle("Objective", leftMargin, leftYPosition);
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "normal");
      leftYPosition = addWrappedText(personalInfo.objective, leftMargin, leftYPosition, sectionWidthLeft - 2);
      leftYPosition += 10;
    }
  
    if (sections.keySkills && keySkills.length > 0) {
      leftYPosition = addSectionTitle("Key Skills", leftMargin, leftYPosition);
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "normal");
      keySkills.forEach((skill) => {
        leftYPosition = addWrappedText(`${skill.skillName} - ${skill.proficiency}`, leftMargin, leftYPosition, sectionWidthLeft);
      });
      leftYPosition += 10;
    }

if (sections.education && education.length > 0) {
  leftYPosition = addSectionTitle("Education", leftMargin, leftYPosition);
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "normal");

  education.forEach((edu) => {
    const degreeText = `${edu.degree}`;
    const periodText = `${edu.startYear} - ${edu.endYear}`;
    const degreeWidth = doc.getTextWidth(degreeText);
    const periodX = leftMargin + degreeWidth+5 
    doc.text(degreeText, leftMargin, leftYPosition);
    doc.text(periodText, periodX, leftYPosition);
    leftYPosition += 5;
    leftYPosition = addWrappedText(`${edu.university}\nPercentage: ${edu.percentage}`, leftMargin, leftYPosition, sectionWidthLeft);
    leftYPosition += 5;
  });
  
}
    rightYPosition = 50;
if (sections.workExperience && workExperience.length > 0) {
  rightYPosition = addSectionTitle("Work Experience", rightStartX, rightYPosition);
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 20);

  workExperience.forEach((job, index) => {
    doc.setFont("helvetica", "bold");
    const companyText = `${job.companyName}`;
    const periodText = `(${job.startYear || 'N/A'} - ${job.endYear || 'N/A'})`;
    const periodX = doc.internal.pageSize.width - doc.getTextWidth(periodText) - 30; 

    doc.text(companyText, rightStartX, rightYPosition);
    doc.setFont("helvetica", "normal");
    doc.text(periodText, periodX, rightYPosition);

    rightYPosition += 6; 

    doc.setFont("helvetica", "normal");
    doc.text(job.jobTitle, rightStartX, rightYPosition);

    rightYPosition += 6;

    if (job.jobDescription) {
        const maxWidth = doc.internal.pageSize.width - 105; 
        const descriptionLines = doc.splitTextToSize(job.jobDescription, maxWidth);
        const estimatedHeight = descriptionLines.length * 6; 
        if (rightYPosition + estimatedHeight > doc.internal.pageSize.height - 20) {
            doc.addPage(); 
            rightYPosition = 20; 
        }
        doc.setFont("helvetica", "italic"); 
        descriptionLines.forEach((line) => {
            doc.text(line, rightStartX, rightYPosition, { align: "left" });
            rightYPosition += 6; 
        });
        doc.setFont("helvetica", "normal"); 
    }
    rightYPosition += 10;
    if (index === workExperience.length - 1) {
      rightYPosition += 5; 
    }
  });
}

    if (sections.projects && projects.length > 0) {
      rightYPosition = addSectionTitle("Projects", rightStartX, rightYPosition);
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "normal");
    
      projects.forEach((project) => {
        doc.setFont("helvetica", "bold");
        rightYPosition = addWrappedText(`${project.title}`, rightStartX, rightYPosition, sectionWidthRight);
        doc.setFont("helvetica", "italic");
        const projectText = `${project.description}\nTechnologies: ${project.technologies}\n${project.link}`;
        rightYPosition = addWrappedText(projectText, rightStartX, rightYPosition, sectionWidthRight);
        
        rightYPosition += 5;
      });
    }
    doc.save(`${resumeName || "Modern_resume"}.pdf`);
    setModalOpen(true);
  };
  
  const renderSection = (title, content, tabIndex, sectionName) => (
    <Box
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 2,
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.02)",
        },
        wordBreak: "break-word", 
        overflowWrap: "break-word", 
        whiteSpace: "pre-line", 
        maxHeight: "250px", 
        overflowY: "auto", 
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Divider sx={{ my: 1 }} />
      {content}
      <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(setActiveTab(tabIndex));
            navigate("/details-filling");
          }}
          sx={{ textTransform: "none" }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => toggleSection(sectionName)}
          sx={{ textTransform: "none" }}
        >
          {sections[sectionName] ? "Exclude" : "Include"}
        </Button>
      </Box>
    </Box>
  );

  return (
      <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#f4f4f9" }}>
        <Typography variant="h4" gutterBottom>
          Preview Your Resume
        </Typography>
  
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Box
            ref={resumeRef}
            sx={{
              width: "60%",
              p: 3,
              borderRadius: 2,
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {sections.personalInfo &&
  renderSection(
    "Personal Information",
    <Box>
      <Typography>firstName: {personalInfo.firstName}</Typography>
      <Typography>lastName: {personalInfo.lastName}</Typography>
      <Typography>email: {personalInfo.email}</Typography>
      <Typography>phone: {personalInfo.phone}</Typography>
      <Typography>address: {personalInfo.address}</Typography>
      <Typography>objective: {personalInfo.objective}</Typography>
      <Typography>github: {personalInfo.github}</Typography>
      <Typography>linkedin: {personalInfo.linkedin}</Typography>
    </Box>,
    0,
    "personalInfo"
  )}
{sections.workExperience &&
              renderSection(
                "Work Experience",
                workExperience.length ? (
                  workExperience.map((job, index) => (
                    <Box key={index}>
                      <Typography>JobTitle:
                        {job.jobTitle} at CompanyName:{job.companyName}
                      </Typography>
                      <Typography>StartYear:
                        {job.startYear} to EndYear:{job.endYear}
                      </Typography>
                      <Typography>{job.jobDescription}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No work experience added.</Typography>
                ),
                1,
                "workExperience"
              )}
  
            {sections.education &&
              renderSection(
                "Education",
                education.length ? (
                  education.map((education, index) => (
                    <Box key={index}>
                      <Typography>Degree: {education.degree} - EducationType:{education.educationType}</Typography>
                      <Typography>University:{education.university}</Typography>
                      <Typography>StartYear:{education.startYear}-EndYear:{education.endYear }</Typography>
                      <Typography>Percentage:{education.percentage}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No education details added.</Typography>
                ),
                2,
                "education"
              )}
  
            {sections.projects &&
              renderSection(
                "Projects",
                projects.length ? (
                  projects.map((project, index) => (
                    <Box key={index}>
                      <Typography>Title:{project.title}</Typography>
                      <Typography>Description:{project.description}</Typography>
                      <Typography>Technologies:{project.technologies}</Typography>
                      <Typography>Link:{project.link}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No projects added.</Typography>
                ),
                3,
                "projects"
              )}
  
            {sections.keySkills &&
              renderSection(
                "Key Skills",
                keySkills.length ? (
                  keySkills.map((skill, index) => (
                    <Typography key={index}>SkillName:
                      {skill.skillName} - Proficiency:{skill.proficiency}
                    </Typography>
                  ))
                ) : (
                  <Typography>No skills added.</Typography>
                ),
                4,
                "keySkills"
              )}
          </Box>
          <Box
            sx={{
              width: "35%",
              height:"50vh",
              p: 3,
              borderRadius: 2,
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6">Save Resume</Typography>
            <TextField
              label="Enter Resume Name"
              variant="outlined"
              fullWidth
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleDownload}>
              Save as PDF
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/details-filling")}
            >
              Back
            </Button>
          </Box>
        </Box>
        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              p: 4,
              bgcolor: "background.paper",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Download Successful!</Typography>
            <Typography>Your resume has been downloaded successfully.</Typography>
            <Button variant="contained" color="primary" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    );
  };
export default PreviewPage2;

