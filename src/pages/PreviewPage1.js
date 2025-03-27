import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography, Divider, Modal, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setActiveTab } from "../redux/formDataSlice";
import jsPDF from "jspdf";

const PreviewPage1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Extract resume data from Redux store
  const {
    personalInfo,
    workExperience,
    education,
    projects,
    keySkills,
    activeTab,
  } = useSelector((state) => state.formData);
// State for modal, resume name, and section visibility
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
// Ensure sections are reset when the page loads if personal info is available
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
// Toggle visibility of sections
  const toggleSection = (section) => {
    setSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
// Function to generate and download the resume as a PDF
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont("times", "bold");

    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height - 20;
 // Handle page overflow
    const checkPageOverflow = (y) => {
      if (y > pageHeight) {
        doc.addPage();
        // Set background color for resume
        doc.setFillColor(230, 230, 250); 
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");
        return 30;
      }
      return y;
    };

    doc.setFillColor(230, 230, 250);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");
// Header section
    doc.setFillColor(173, 216, 230);
    doc.rect(0, 0, doc.internal.pageSize.width, 39, "F");

    doc.setFontSize(30);
    doc.text(`${personalInfo.firstName} ${personalInfo.lastName}`, 105, yPosition, { align: "center" });
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont("times", "normal");
    const centeredText = `${personalInfo.email} | ${personalInfo.github} | ${personalInfo.linkedin} | ${personalInfo.phone} | ${personalInfo.address}`;
    const pageWidth = doc.internal.pageSize.width;
    const textWidth = doc.getTextWidth(centeredText);
    doc.text(centeredText, (pageWidth - textWidth) / 2, yPosition);
    yPosition += 7;

    doc.setLineWidth(0.5);
    doc.line(20, yPosition + 2, 190, yPosition + 2);
    yPosition += 10;
// Function to wrap long text
    const addWrappedText = (text, x, y, maxWidth) => {
      const splitText = doc.splitTextToSize(text, maxWidth);
      splitText.forEach((line) => {
        y = checkPageOverflow(y);
        doc.text(line, x, y);
        y += 6;
      });
      return y;
    };
   // Function to add section title with underline
    const addSectionTitle = (title, y) => {
      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text(title, 20, y);
      doc.setLineWidth(0.5);
      doc.line(20, y + 2, 190, y + 2);
      return y + 10;
    };

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    yPosition = addWrappedText(`${personalInfo.objective}`, 20, yPosition, 160);
    yPosition += 5;

    if (sections.workExperience && workExperience.length > 0) {
      yPosition = addSectionTitle("Work Experience", yPosition);
      doc.setFontSize(12);
      doc.setFont("times", "normal");

      workExperience.forEach((job, index) => {
        const jobTitleText = `• ${job.jobTitle} at ${job.companyName}`;
        const jobDateText = `${job.startYear} - ${job.endYear}`;

        yPosition = checkPageOverflow(yPosition);
        doc.text(jobTitleText, 20, yPosition);
        doc.text(jobDateText, pageWidth - 40, yPosition, { align: "right" });
        yPosition += 6;

        yPosition = addWrappedText(job.jobDescription, 25, yPosition, 160);

        if (index !== workExperience.length - 1) yPosition += 5;
      });

      yPosition += 5;
    }

    if (sections.education && education.length > 0) {
      yPosition = addSectionTitle("Education", yPosition);
      doc.setFontSize(12);
      doc.setFont("times", "normal");

      education.forEach((edu, index) => {
        yPosition = checkPageOverflow(yPosition);
        doc.text(`• ${edu.degree} from ${edu.university}`, 20, yPosition);
        doc.text(`${edu.startYear} - ${edu.endYear}`, pageWidth - 40, yPosition, { align: "right" });
        yPosition += 6;

        yPosition = addWrappedText(`   Percentage: ${edu.percentage}`, 25, yPosition, 160);

        if (index !== education.length - 1) yPosition += 10;
      });

      yPosition += 5;
    }

    if (sections.projects && projects.length > 0) {
      yPosition = addSectionTitle("Projects", yPosition);
      doc.setFontSize(12);
      doc.setFont("times", "normal");

      projects.forEach((project) => {
        doc.setFont("times", "bold");
        const titleWidth = doc.getTextWidth(`• ${project.title}`);
        const startX = 20;
        const linkX = startX + titleWidth + 10;

        doc.text(`• ${project.title}`, startX, yPosition);
        if (project.link) {
          doc.setTextColor(0, 0, 255);
          doc.text(`${project.link}`, linkX, yPosition);
          doc.setTextColor(0, 0, 0);
        }

        doc.setFont("times", "normal");
        yPosition = addWrappedText(`${project.description}`, 25, yPosition + 6, 160);
        yPosition = addWrappedText(`Technologies: ${project.technologies}`, 25, yPosition, 160);
        yPosition += 5;
      });

      yPosition += 5;
    }

    if (sections.keySkills && keySkills.length > 0) {
      yPosition = addSectionTitle("Key Skills", yPosition);
      doc.setFontSize(12);
      doc.setFont("times", "normal");

      keySkills.forEach((skill) => {
        yPosition = addWrappedText(`• ${skill.skillName} - ${skill.proficiency}`, 20, yPosition, 160);
      });
    }

    doc.save(`${resumeName || "Classic_Resume"}.pdf`);
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
 {/* Resume preview and actions */}
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
                    <Typography>jobDescription:{job.jobDescription}</Typography>
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
                    <Typography>StartYear:{education.startYear}-EndYear:{education.endYear}</Typography>
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
               {/* Resume saving options */}
        <Box
          sx={{
            width: "35%",
            height: "50vh",
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

export default PreviewPage1;
