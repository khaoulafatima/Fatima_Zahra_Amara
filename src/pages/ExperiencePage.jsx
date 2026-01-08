import React, { useEffect, useState } from "react";
import { Paper, Typography, Chip, Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const ExperienceTimeline = () => {
  const [experiences, setExperiences] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // mobile <= 600px

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const response = await fetch("/profile/experience.json");
        const data = await response.json();
        setExperiences(data.experiences);
      } catch (error) {
        console.error("Error loading missions:", error);
      }
    };
    fetchExp();
  }, []);

  return (
    <Container sx={{ my: { xs: 8, md: 12 } }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom color={colors.primary}>
        Work Experience
      </Typography>
   <Typography
  variant={isMobile ? "body1" : "h5"}
  color={colors.textLight}
  textAlign="center"
  gutterBottom
  sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
>
  From Theory to practice
</Typography>


      {/* Experience Cards */}
      <Box display="flex" flexDirection="column" gap={5} mt={5}>
        {experiences.map((exp, index) => (
           <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Paper
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
              {/* Logo */}
              <Box sx={{ flexShrink: 0 }}>
                <Box
                  component="img"
                  src={exp.logo}
                  alt={exp.company}
                  sx={{ width: { xs: 80, md: 120 }, height: { xs: 50, md: 60 }, objectFit: "contain" }}
                />
              </Box>

              {/* Text Content */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" color={colors.textLight}>
                  {exp.company} - {exp.contract}
                </Typography>
                <Typography variant="caption" color="text.secondary" mb={1}>
                  {exp.period}
                </Typography>

                {/* Missions */}
                <Box>
                  {exp.missions.map((mission, i) => (
                    <Typography key={i} variant="body2" mb={0.5}>
                      {exp.missions.length > 1 && "• "} {mission}
                    </Typography>
                  ))}
                </Box>

                {/* Tools */}
                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  {exp.tools.map((tool, i) => (
                    <Chip key={i} label={tool} size="small" sx={{ color: colors.primary }} />
                  ))}
                </Box>
              </Box>
            </Paper>
           </motion.div>
        ))}
      </Box>
    </Container>
  );
};

export default ExperienceTimeline;
