import React, { useEffect, useState } from "react";
import { Paper, Typography, Chip, Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const EducationTimeline = () => {
  const [education, setEducation] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // mobile <= 600px

  useEffect(() => {
    const fetchEdu = async () => {
      try {
        const response = await fetch("/profile/EducationTimeline.json");
        const data = await response.json();
        setEducation(data.education);
      } catch (error) {
        console.error("Error loading education:", error);
      }
    };
    fetchEdu();
  }, []);

  return (
    <Container sx={{ my: { xs: 8, md: 12 } }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom color={colors.primary}>
        Education
      </Typography>
      <Typography
        variant={isMobile ? "body1" : "h5"}
        color={colors.textLight}
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
      >
        Building knowledge Step by Step
      </Typography>

      {/* Education Cards */}
      <Box display="flex" flexDirection="column" gap={5} mt={5}>
        {education.map((edu, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              borderRadius: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 3,
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
            }}
          >
            {/* Logo / Institution */}
            <Box sx={{ flexShrink: 0 }}>
              <Box
                component="img"
                src={edu.logo}
                alt={edu.institution}
                sx={{ width: { xs: 80, md: 120 }, height: { xs: 50, md: 60 }, objectFit: "contain" }}
              />
            </Box>

            {/* Text Content */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" color={colors.textLight}>
                {edu.degree} - {edu.institution}
              </Typography>
              <Typography variant="caption" color="text.secondary" mb={1}>
                {edu.period}
              </Typography>

              {/* Courses / Highlights */}
              <Box>
                {edu.courses?.map((course, i) => (
                  <Typography key={i} variant="body2" mb={0.5}>
                    {edu.courses.length > 1 && "• "} {course}
                  </Typography>
                ))}
              </Box>

              {/* Skills / Tools */}
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {edu.skills?.map((skill, i) => (
                  <Chip key={i} label={skill} size="small" sx={{ color: colors.primary }} />
                ))}
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default EducationTimeline;
