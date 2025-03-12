import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography, Divider, Modal, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setActiveTab } from "../redux/formDataSlice";
import jsPDF from "jspdf";

const PreviewPage4 = () => {
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
    doc.setFont("helvetica", "bold");

    let yPosition = 30;
    const pageHeight = doc.internal.pageSize.height - 20;

    const checkPageOverflow = (y) => {
      if (y > pageHeight) {
        doc.addPage();
        return 30;
      }
      return y;
    };
    
    const addSectionTitle = (title, y) => {
      const darkSkinColor = [0, 0, 0];
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(darkSkinColor[0], darkSkinColor[1], darkSkinColor[2]);
      doc.text(title, 20, y);
      doc.setLineWidth(1);
      doc.setDrawColor(darkSkinColor[0], darkSkinColor[1], darkSkinColor[2]);
      doc.line(20, y + 2, 190, y + 2);
      return y + 12;
    };
    doc.setTextColor(0, 0, 0);

    if (sections.personalInfo) {
      const pageWidth = doc.internal.pageSize.width;
      const topMargin = 0;
      const nameMargin = 20;
      const backgroundHeight = yPosition + 8;

      doc.setFillColor(240, 128, 128);
      doc.rect(0, topMargin, pageWidth, backgroundHeight, "F");
      yPosition = nameMargin;
      doc.setTextColor(255, 255, 255);
      const nameText = `${personalInfo.firstName} ${personalInfo.lastName}`;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(30);

      const nameWidth = doc.getStringUnitWidth(nameText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const nameX = (pageWidth - nameWidth) / 2;
      doc.text(nameText, nameX, yPosition);
      yPosition += 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const contactInfo = [
        `${personalInfo.email}`,
        `${personalInfo.linkedin}`,
        `${personalInfo.github}`,
        `${personalInfo.phone}`,
        `${personalInfo.address}`,
      ];

      const contactInfoText = contactInfo.join(" | ");
      const maxWidth = pageWidth - 40;

      const wrappedContactInfo = doc.splitTextToSize(contactInfoText, maxWidth);
      wrappedContactInfo.forEach((line) => {
        const textWidth = doc.getTextWidth(line);
        const contactInfoX = (pageWidth - textWidth) / 2;
        doc.text(line, contactInfoX, yPosition);
        yPosition += 6;
      });

      doc.setTextColor(0, 0, 0);

      const objectiveWidth = pageWidth - 40;
      doc.setFont("helvetica", "italic");
      const objectiveLines = doc.splitTextToSize(personalInfo.objective, objectiveWidth);
      objectiveLines.forEach((line) => {
        doc.text(line, 25, yPosition);
        yPosition += 5;  
      });
      yPosition += 10;
    }

    if (sections.workExperience && workExperience.length > 0) {
      yPosition = checkPageOverflow(yPosition);
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
        doc.setFont("helvetica", "italic");
        const descriptionText = job.jobDescription ? job.jobDescription : "No description provided.";
        const descriptionLines = doc.splitTextToSize(descriptionText, maxWidth);
        
        descriptionLines.forEach((line) => {
          if (yPosition + 10 > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yPosition = 20; 
          }
        
          doc.text(line, 25, yPosition);
          yPosition += 5;
        });
        

        doc.setFont("helvetica", "normal");
        yPosition += 10;
      });

      yPosition += 5;
    }

    if (sections.education && education.length > 0) {
      yPosition = checkPageOverflow(yPosition);
      yPosition = addSectionTitle("Education", yPosition);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      education.forEach((edu) => {
        yPosition = checkPageOverflow(yPosition);
        const pageWidth = doc.internal.pageSize.width;
        doc.setFont("helvetica", "bold");
        doc.text(`${edu.degree}`, 20, yPosition);
        doc.setFont("helvetica", "normal");
        doc.text(`${edu.startYear} - ${edu.endYear}`, pageWidth - 40, yPosition, { align: "right" });
        yPosition += 5;
        doc.text(`${edu.university}`, 20, yPosition);
        yPosition += 5;
        doc.text(`Percentage: ${edu.percentage}`, 20, yPosition);
        yPosition += 10;
      });

      yPosition += 5;
    }

    if (sections.projects && projects.length > 0) {
      doc.setTextColor(0, 0, 0);
      yPosition = addSectionTitle("Projects", yPosition);
    
      projects.forEach((project, index) => {
        const pageWidth = doc.internal.pageSize.width;
        const maxWidth = pageWidth - 60;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
    
        let projectLines = [`• ${project.title}`]; 
        doc.setFont("helvetica", "italic");
        projectLines = projectLines.concat(doc.splitTextToSize(project.description, maxWidth));
    
        doc.setFont("helvetica", "normal");
        projectLines = projectLines.concat(doc.splitTextToSize(`Technologies: ${project.technologies}`, maxWidth));
        projectLines = projectLines.concat(doc.splitTextToSize(project.link, maxWidth));
    
        projectLines.forEach((line, i) => {
          if (yPosition + 5 > doc.internal.pageSize.height - 20) {
            doc.addPage(); 
            yPosition = 20;
          }
          doc.text(line, i === 0 ? 20 : 25, yPosition); 
          yPosition += 5;
        });
    
        if (index !== projects.length - 1) {
          yPosition += 10; 
        }
      });
    
      yPosition += 10;
    }
    
    
    if (sections.keySkills && keySkills.length > 0) {
      yPosition = addSectionTitle("Key Skills", yPosition);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");

      let xPosition = 20;
      let maxWidth = 160;
      let margin = 5;
      let blockPadding = 6;
      let blockHeight = 12;
      let pageHeight = doc.internal.pageSize.height;

      keySkills.forEach((skill) => {
        let skillText = skill.skillName;
        let proficiencyText = skill.proficiency;
        let skillWidth = doc.getTextWidth(skillText);
        let proficiencyWidth = doc.getTextWidth(proficiencyText);
        let blockWidth = Math.max(skillWidth, proficiencyWidth) + blockPadding * 2;

        if (blockWidth > maxWidth) {
          blockWidth = maxWidth;
        }

        if (yPosition + blockHeight + margin > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
          xPosition = 20;
        }

        if (xPosition + blockWidth > 190) {
          xPosition = 20;
          yPosition += blockHeight + margin;

          if (yPosition + blockHeight + margin > pageHeight - 20) {
            doc.addPage();
            yPosition = 20;
            xPosition = 20;
          }
        }

        doc.setFillColor(200, 200, 200);
        doc.roundedRect(xPosition, yPosition, blockWidth, blockHeight, 4, 4, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text(skillText, xPosition + blockWidth / 2, yPosition + 5, { align: "center" });
        doc.text(proficiencyText, xPosition + blockWidth / 2, yPosition + 10, { align: "center" });

        xPosition += blockWidth + margin;
      });

      yPosition += 25;
    }

    doc.save(`${resumeName || "Creative_resume"}.pdf`);
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

export default PreviewPage4;
