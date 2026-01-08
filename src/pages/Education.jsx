import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Chip,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const EducationTimeline = () => {
  const [education, setEducation] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        color={colors.primary}
      >
        Education
      </Typography>

      <Typography
        variant={isMobile ? "body1" : "h5"}
        color={colors.textLight}
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: "bold", fontStyle: "italic" }}
      >
        Building knowledge step by step
      </Typography>

      {/* Education Cards */}
      <Box display="flex" flexDirection="column" gap={5} mt={5}>
        {education.map((edu, index) => (
          <Paper
            key={index}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            sx={{
              p: 3,
              borderRadius: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 3,
              boxShadow: 3,
            }}
          >
            {/* Logo */}
            <Box sx={{ flexShrink: 0 }}>
              <Box
                component="img"
                src={edu.logo}
                alt={edu.institution}
                sx={{
                  width: { xs: 80, md: 120 },
                  height: { xs: 50, md: 60 },
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={colors.textLight}
              >
                {edu.degree}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {edu.institution}
              </Typography>

              <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                {edu.period}
              </Typography>

              {/* Courses / Honors */}
              {edu.courses && (
                <Box mb={1}>
                  {edu.courses.map((course, i) => (
                    <Typography key={i} variant="body2">
                      • {course}
                    </Typography>
                  ))}
                </Box>
              )}

              {/* Links (e.g., PhD Thesis) */}
              {edu.links && (
                <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                  {edu.links.map((link, i) => (
                    <Chip
                      key={i}
                      label={link.label}
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      clickable
                      sx={{
                        color: colors.primary,
                        borderColor: colors.primary,
                      }}
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default EducationTimeline;
