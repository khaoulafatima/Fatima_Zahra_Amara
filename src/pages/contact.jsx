import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/profile/contact.json");
        const data = await response.json();
        setContacts(data.contact || []);
      } catch (error) {
        console.error("Error loading contact references:", error);
      }
    };
    fetchContacts();
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
        Contact References
      </Typography>

      <Typography
        variant={isMobile ? "body1" : "h5"}
        color={colors.textLight}
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: "bold", fontStyle: "italic" }}
      >
        Academic and professional contacts
      </Typography>

      {/* Circular Contacts */}
      <Box
        mt={6}
        display="flex"
        justifyContent="center"
        gap={6}
        flexWrap={isMobile ? "wrap" : "nowrap"}
      >
        {contacts.map((person, index) => (
          <Paper
            key={index}
            component={motion.div}
            whileHover={{ scale: 1.08 }}
            sx={{
              width: 260,
              height: 260,
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 3,
              boxShadow: 4,
            }}
          >
            {/* Name */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color={colors.primary}
            >
              {person.name}
            </Typography>

            {/* Title */}
            {person.title && (
              <Typography variant="body2" color="text.secondary" mt={1}>
                {person.title}
              </Typography>
            )}

            {/* Affiliation */}
            {person.affiliation && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ px: 2 }}
              >
                {person.affiliation}
              </Typography>
            )}

            {/* Email Icon */}
            {person.email && (
              <IconButton
                component="a"
                href={`mailto:${person.email}`}
                sx={{
                  mt: 2,
                  color: colors.textLight,
                  border: `1px solid ${colors.textLight}`,
                }}
              >
                <EmailIcon />
              </IconButton>
            )}
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Contact;
