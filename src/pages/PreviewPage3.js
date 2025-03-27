import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography, Divider, Modal, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setActiveTab } from "../redux/formDataSlice";
import jsPDF from "jspdf";// Importing jsPDF to generate a PDF file

const PreviewPage3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Extracting data from Redux store
  const {
    personalInfo,
    workExperience,
    education,
    projects,
    keySkills,
    activeTab,
  } = useSelector((state) => state.formData);

  const [isModalOpen, setModalOpen] = useState(false);// State to handle modal visibility
  const [resumeName, setResumeName] = useState("resume");// State for resume filename
  const [sections, setSections] = useState({
    personalInfo: true,
    workExperience: true,
    education: true,
    projects: true,
    keySkills: true,
  });
  const resumeRef = useRef();// Reference for the resume container
// Effect to initialize sections if activeTab is not set but personalInfo exists
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
// Function to toggle the visibility of a section
  const toggleSection = (section) => {
    setSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
// Function to generate and download a resume PDF
  const handleDownload = () => {
    const doc = new jsPDF();// Creating a new PDF document
    doc.setFont("helvetica", "bold");

    let yPosition = 20;// Initial Y position for text
    const pageHeight = doc.internal.pageSize.height - 20;// Max height before adding a new page
      // Helper function to check if a new page is needed
    const checkPageOverflow = (y) => {
      if (y > pageHeight) {
        doc.addPage();
        return 30;// Reset Y position for new page
      }
      return y;
    };
    // Function to wrap and add text within a maximum width
    const addWrappedText = (text, x, y, maxWidth) => {
      const splitText = doc.splitTextToSize(text, maxWidth);
      splitText.forEach((line) => {
        y = checkPageOverflow(y);
        doc.text(line, x, y);
        y += 8;
      });
      return y;
    };
    // Function to add section titles with an underline
    const addSectionTitle = (title, y) => {
      y = checkPageOverflow(y);
      doc.text(title, 20, y);
      doc.setLineWidth(0.5);
      doc.line(20, y + 2, 190, y + 2);
      return y + 10;
    };
// Adding Personal Information Section
    if (sections.personalInfo) {
      const name = `${personalInfo.firstName} ${personalInfo.lastName}`;
      const nameWidth = doc.getTextWidth(name);
      const nameX = (doc.internal.pageSize.width - nameWidth) / 2.5;

      const nameFontSize = 30;
      doc.setFontSize(nameFontSize);
      doc.setFont("helvetica", "bold");
      yPosition = addWrappedText(name, nameX, yPosition, 160);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      const contactInfo = `${personalInfo.email} | ${personalInfo.github} | ${personalInfo.linkedin} | ${personalInfo.phone} | ${personalInfo.address}`;
      const contactWidth = doc.internal.pageSize.width - 40; 
       // Contact Information
      const wrappedContactInfo = doc.splitTextToSize(contactInfo, contactWidth);

      doc.text(wrappedContactInfo, 20, yPosition); 

      const contactInfoLineGap = 5; 
      yPosition += (wrappedContactInfo.length * contactInfoLineGap);
      
      const lineStartX = 20;
      const lineEndX = doc.internal.pageSize.width - 20;
      const lineY = yPosition;
      doc.setLineWidth(0.5);
      doc.line(lineStartX, lineY, lineEndX, lineY);

      yPosition += 10;
      doc.setFontSize(10);
      const objective = `${personalInfo.objective}`;
      const objectiveX = 20;
      const objectiveWidth = 160;

    const objectiveLines = doc.splitTextToSize(objective, objectiveWidth);
    objectiveLines.forEach((line) => {
      yPosition = checkPageOverflow(yPosition);
      doc.text(line, objectiveX, yPosition);
      yPosition += 5; 
    });
      yPosition += 5;
    }

    if (sections.workExperience && workExperience.length > 0) {
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      yPosition = addSectionTitle("Work Experience", yPosition);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
    
      workExperience.forEach((job) => {
        yPosition = checkPageOverflow(yPosition); 
        const pageWidth = doc.internal.pageSize.width;
        const maxWidth = pageWidth - 60;
    
        doc.setFont("helvetica", "bold");
        doc.text(`• ${job.companyName}`, 20, yPosition);
    
        doc.setFont("helvetica", "normal");
        doc.text(`${job.jobTitle}`, 20, yPosition + 5);
    
        doc.text(`${job.startYear} - ${job.endYear}`, pageWidth - 40, yPosition, { align: "right" });
    
        yPosition += 10; 
    
        if (job.jobDescription && job.jobDescription.trim() !== "") {
          doc.setFont("helvetica", "normal");
          const descriptionLines = doc.splitTextToSize(job.jobDescription, maxWidth);
          descriptionLines.forEach((line) => {
            yPosition = checkPageOverflow(yPosition); 
            doc.text(line, 25, yPosition);
            yPosition += 5;
          });
        }
    
        yPosition += 5; 
      });
    
      yPosition += 5;
    }
    

    if (sections.education && education.length > 0) {
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      yPosition = addSectionTitle("Education", yPosition);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      education.forEach((edu) => {
        yPosition = checkPageOverflow(yPosition);

        doc.setFont("helvetica", "bold");
        doc.text(`${edu.degree}`, 20, yPosition);

        doc.setFont("helvetica", "normal");
        doc.text(`${edu.startYear} - ${edu.endYear}`, doc.internal.pageSize.width - 40, yPosition, { align: "right" });

        yPosition += 6;

        doc.setFont("helvetica", "noraml");
        yPosition = addWrappedText(`${edu.university}`, 20, yPosition, 160);

        doc.setFont("helvetica", "normal");
        yPosition = addWrappedText(`Percentage: ${edu.percentage}`, 20, yPosition, 160);

        yPosition += 5;
      });
    }

    if (sections.projects && projects.length > 0) {
      yPosition = checkPageOverflow(yPosition);
    
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      yPosition = addSectionTitle("Projects", yPosition);
  
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
    
      projects.forEach((project) => {
        doc.setFont("helvetica", "bold");
        const titleLines = doc.splitTextToSize(`${project.title}`, 160);
        titleLines.forEach((line) => {
          yPosition = checkPageOverflow(yPosition); 
          doc.text(line, 20, yPosition);
          yPosition += 5;
        });
    
        doc.setFont("helvetica", "normal");
        const descriptionLines = doc.splitTextToSize(`${project.description}`, 160);
        descriptionLines.forEach((line) => {
          yPosition = checkPageOverflow(yPosition); 
          doc.text(line, 20, yPosition);
          yPosition += 5;
        });
    
        const techLines = doc.splitTextToSize(`Technologies: ${project.technologies}`, 160);
        techLines.forEach((line) => {
          yPosition = checkPageOverflow(yPosition); 
          doc.text(line, 20, yPosition);
          yPosition += 5;
        });
  
        const linkLines = doc.splitTextToSize(`${project.link}`, 160);
        linkLines.forEach((line) => {
          yPosition = checkPageOverflow(yPosition); 
          doc.text(line, 20, yPosition);
          yPosition += 5;
        });
    
        yPosition += 5; 
      });
    }
    
    if (sections.keySkills && keySkills.length > 0) {
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      yPosition = addSectionTitle("Key Skills", yPosition);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      keySkills.forEach((skill) => {
        yPosition = checkPageOverflow(yPosition);
        yPosition = addWrappedText(`${skill.skillName} - ${skill.proficiency}`, 20, yPosition, 160);
      });
    }
// Save the generated PDF
    doc.save(`${resumeName || "Professional_resume"}.pdf`);
    setModalOpen(true);// Show modal on successful download
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
export default PreviewPage3;
