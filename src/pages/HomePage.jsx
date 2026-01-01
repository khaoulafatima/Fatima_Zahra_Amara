import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Grid, Stack } from "@mui/material";
import { colors } from "../styles/colors";
import SocialCards from "../components/Social";
import TypeWriter from "typewriter-effect";

const HomePage = () => {
  const [missions, setMissions] = useState([]);
  const [name, setName] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch("/profile/mission.json");
        const data = await response.json();
        setMissions(data.missions);
        setName(data.name);
        setProfile(data.profile);
      } catch (error) {
        console.error("Error loading missions:", error);
      }
    };
    fetchMissions();
  }, []);

//   useEffect(() => {
//     if (missions.length === 0) return;

    // const interval = setInterval(() => {
    //   setCurrentMission((prev) => (prev + 1) % missions.length);
    // }, 3000);

//     return () => clearInterval(interval);
//   }, [missions]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        my: { xs: 5, md: 20 },
        px: { xs: 2, md: 0 },
      }}
    >
      <Container
        disableGutters
        sx={{
          width: { xs: "100%", md: "70%" },
          mt: { xs: 5, md: 10 },
          backgroundColor: colors.background,
        }}
      >
        {/* Titre */}
        <Typography
          variant="h4"
          fontWeight="bold"
          color={colors.textLight}
          gutterBottom
        >
          Hi, I'm <span style={{ color: colors.primary }}>{name}</span>,
        </Typography>
        <Typography variant="h4" color={colors.textLight} gutterBottom>
          a passionate{" "}
          <span style={{ color: colors.secondary, fontWeight: "bold" }}>
            {profile}
          </span>
          .
        </Typography>

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: colors.secondary, mb: 2 }}
        >
          <TypeWriter
            options={{
              strings: missions,
              autoStart: true,
              loop: true,
            }}
          />
        </Typography>

        <Typography variant="h5" color={colors.textLight} sx={{ mt: 3 }} gutterBottom>
          Let’s build something amazing together! 
        </Typography>

        <SocialCards />
      </Container>

      { <Box
        component="img"
        src="\images\propic.jpg"
        alt="Image importée"
        sx={{
          width: { xs: "80%", sm: "50%", md: "30%" },
          objectFit: "contain",
          mt: { xs: 5, md: 0 },
          mb: 2,
          mx: { xs: "auto", md: 10 },
        }}
      /> }
    </Stack>
  );
};

export default HomePage;