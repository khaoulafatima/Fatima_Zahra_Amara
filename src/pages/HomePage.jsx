import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Stack } from "@mui/material";
import { colors } from "../styles/colors";
import SocialCards from "../components/Social";
import TypeWriter from "typewriter-effect";

const HomePage = () => {
  const [missions, setMissions] = useState([]);
  const [domains, setDomains] = useState([]);
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch("/profile/mission.json");
        const data = await response.json();
        setMissions(data.missions);
        setName(data.name);
        setDomains(data.domains);
        setProfile(data.profile);
      } catch (error) {
        console.error("Error loading missions:", error);
      }
    };
    fetchMissions();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // empile les éléments verticalement
        minHeight: "100vh", // prend toute la hauteur de la page
      }}
    >
      {/* Contenu principal : image + texte */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
          my: { xs: 5, md: 10 },
          px: { xs: 2, md: 10 },
          gap: { xs: 5, md: 8 },
          flexGrow: 1, // permet de pousser la bannière en bas
        }}
      >
        {/* Image circulaire */}
        <Box
          component="img"
          src="\images\propic.jpg"
          alt="Image importée"
          sx={{
            width: { xs: "60%", sm: "40%", md: "25%" },
            height: { xs: "60%", sm: "40%", md: "25%" },
            objectFit: "cover",
            borderRadius: "50%",
            mx: { xs: "auto", md: 0 },
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />

        {/* Texte à droite */}
        <Container
          disableGutters
          sx={{
            width: { xs: "100%", md: "70%" },
            backgroundColor: colors.background,
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.textLight}
            gutterBottom
          >
            <span style={{ color: colors.primary }}>{name}</span>
          </Typography>

          <Typography variant="h4" color={colors.textLight} gutterBottom>
            <span style={{ color: colors.secondary, fontWeight: "bold" }}>
              {profile}
            </span>
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            color={colors.textLight}
            gutterBottom
          >
            <span style={{ color: colors.primary }}>{missions.join(", ")}</span>
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.primary, mb: 2 }}
          >
            <TypeWriter
              options={{
                strings: domains,
                autoStart: true,
                loop: true,
              }}
            />
          </Typography>

          <Typography
            variant="h4"
            color={colors.textLight}
            sx={{ mt: 5 }}
            fontWeight="bold"
            gutterBottom
          >
            Let’s collaborate!
          </Typography>

          <SocialCards />
        </Container>
      </Stack>

      {/* Bannière en bas */}
      <Box
        sx={{
          width: "100%",
          py: 4,
          backgroundColor: colors.primary,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: colors.textLight }}
        >
          Knowledge grows when shared !
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
