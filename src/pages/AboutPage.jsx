import React, { useEffect, useState } from "react";
import { Container, Stack, Typography, Box } from "@mui/material";
import { colors } from "../styles/colors";
import Carousel from "../components/Carousel360";

const AboutPage = () => {
    const [intro, setAboutIntro] = useState([]);
    const [middle, setAboutMiddle] = useState([]);
    const [end, setAboutEnd] = useState([]);

    useEffect(() => {
        // Charger les missions depuis le JSON
        const fetchAbout = async () => {
            try {
                const response = await fetch("/profile/about.json");
                const data = await response.json();
                setAboutIntro(data.intro);
                setAboutMiddle(data.middle);
                setAboutEnd(data.end);
            } catch (error) {
                console.error("Error loading missions:", error);
            }
        };
        fetchAbout();
    }, []);

    return (
        // <Stack direction="row" sx={{ mt: 20, textAlign: "start", justifyContent: "center", }}>
        <Box
            sx={{
                my: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // centre tout horizontalement
                minHeight: "100vh",
                textAlign: "center",
                px: 2, // padding horizontal
            }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                color={colors.primary}
            >
                Beyond the Code: People, Nature, and Traditions
            </Typography>

            <Container
                maxWidth="md" // limite la largeur pour que le texte ne soit pas trop large
                sx={{
                    backgroundColor: colors.background,
                    mb: 4, // marge en bas
                }}
            >
                <Typography
                    variant="body1"
                    color={colors.textLight}
                    sx={{ textIndent: "2em", marginBottom: "1em" }}
                >
                    {intro}
                </Typography>
                <Typography
                    variant="body1"
                    color={colors.textLight}
                    sx={{ textIndent: "2em", marginBottom: "1em" }}
                >
                    {middle}
                </Typography>
                <Typography
                    variant="body1"
                    color={colors.textLight}
                    sx={{ textIndent: "2em", marginBottom: "1em" }}
                >
                    {end}
                </Typography>
            </Container>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",pb:10, mb:10
                }}
            >
                <Carousel />
            </Box>
        </Box>

    );
};

export default AboutPage;
