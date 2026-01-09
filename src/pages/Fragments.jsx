import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const FragmentsComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/profile/Fragments.json");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error loading fragments:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) return null; // ou un loader

  return (
    <Container maxWidth="lg" sx={{ my: { xs: 6, md: 14 } }}>
      {/* Title */}
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        color={colors.primary}
        gutterBottom
      >
        {data.title}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="h6"
        fontStyle="italic"
        textAlign="center"
        color="text.secondary"
        sx={{ maxWidth: 700, mx: "auto", mb: 8 }}
      >
        {data.subtitle}
      </Typography>

      {/* Personal Text */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 8,
          maxWidth: 820,
          mx: "auto",
          borderRadius: 4,
          textAlign: "center",
          background: `${colors.primary}08`,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          {data.text}
        </Typography>
      </Paper>

      {/* Photo Gallery */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(3, 1fr)",
        }}
        gap={3}
      >
        {data.photos.map((photo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Box
              component="img"
              src={photo.src}
              alt={photo.label}
              sx={{
                width: "100%",
                height: 260,
                objectFit: "cover",
                borderRadius: 3,
                boxShadow: 4,
              }}
            />
            <Typography
              variant="caption"
              display="block"
              textAlign="center"
              mt={1}
              color="text.secondary"
            >
              {photo.label}
            </Typography>
          </motion.div>
        ))}
      </Box>

      {/* Hobbies */}
      <Box mt={10} textAlign="center">
        <Typography
          variant="h6"
          fontWeight="bold"
          color={colors.textLight}
          gutterBottom
        >
          What I enjoy
        </Typography>

        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1}>
          {data.hobbies.map((hobby, index) => (
            <Chip
              key={index}
              label={hobby}
              sx={{
                backgroundColor: `${colors.primary}15`,
                color: colors.primary,
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Signature */}
      <Typography
        mt={10}
        textAlign="center"
        fontStyle="italic"
        color="text.secondary"
      >
        {data.signature}
      </Typography>
    </Container>
  );
};

export default FragmentsComponent;
