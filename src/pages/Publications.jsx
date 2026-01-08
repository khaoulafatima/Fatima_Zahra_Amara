import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Chip,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("/profile/publications.json");
        const data = await response.json();
        setPublications(data.publications);
      } catch (error) {
        console.error("Error loading publications:", error);
      }
    };
    fetchPublications();
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
        Publications
      </Typography>

      <Typography
        variant={isMobile ? "body1" : "h5"}
        color={colors.textLight}
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: "bold", fontStyle: "italic" }}
      >
        Research contributions and academic work
      </Typography>

      {/* Publication Cards */}
      <Box display="flex" flexDirection="column" gap={5} mt={5}>
        {publications.map((pub, index) => (
          <Paper
            key={index}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            {/* Title */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color={colors.textLight}
              mb={0.5}
            >
              {pub.title}
            </Typography>

            {/* Authors */}
            <Typography variant="body2" color="text.secondary">
              {pub.authors.join(", ")}
            </Typography>

            {/* Venue / Type / Year */}
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              {pub.type} • {pub.venue} • {pub.year}
            </Typography>

            {/* Abstract */}
            {pub.abstract && (
              <Typography variant="body2" mb={2}>
                {pub.abstract}
              </Typography>
            )}

            {/* Links */}
            {pub.links && (
              <Box display="flex" gap={1} flexWrap="wrap">
                {pub.links.map((link, i) => (
                  <Chip
                    key={i}
                    label={link.label}
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    clickable
                    variant="outlined"
                    sx={{ color: colors.primary }}
                  />
                ))}
              </Box>
            )}
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Publications;
