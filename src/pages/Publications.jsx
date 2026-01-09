import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Container,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const PublicationsList = () => {
  const [publications, setPublications] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchPubs = async () => {
      try {
        const response = await fetch("/profile/Publications.json");
        const data = await response.json();
        setPublications(data.publications || []);
      } catch (error) {
        console.error("Error loading publications:", error);
      }
    };
    fetchPubs();
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
        Scholarly works and contributions
      </Typography>

      {/* Publications Cards */}
      <Box display="flex" flexDirection="column" gap={5} mt={5}>
        {publications.map((pub, index) => (
          <Paper
            key={index}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            sx={{
              p: 3,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              boxShadow: 3,
            }}
          >
            {/* Title */}
            <Typography variant="subtitle1" fontWeight="bold" color={colors.textLight}>
              {pub.title}
            </Typography>

            {/* Authors */}
            {pub.authors && (
              <Typography variant="body2" color="text.secondary">
                {pub.authors.join(", ")}
              </Typography>
            )}

            {/* Venue */}
            {pub.venue && (
              <Typography variant="body2" color="text.secondary">
                <strong>Venue:</strong> {pub.venue}
              </Typography>
            )}

            {/* Year */}
            {pub.year && (
              <Typography variant="caption" color="text.secondary" display="block">
                <strong>Year:</strong> {pub.year}
              </Typography>
            )}

            {/* DOI */}
            {pub.doi && (
              <Typography variant="caption" color="text.secondary">
                <strong>DOI:</strong>{" "}
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pub.doi}
                </a>
              </Typography>
            )}

            {/* Links */}
            {pub.links && pub.links.length > 0 && (
              <Box mt={1} display="flex" gap={1} flexWrap="wrap">
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
                    sx={{
                      color: colors.primary,
                      borderColor: colors.primary,
                    }}
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

export default PublicationsList;
