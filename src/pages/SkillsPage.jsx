import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Stack, IconButton,
    Tooltip,
    Divider
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { colors } from "../styles/colors";

export default function SkillsPage() {
    const [techSkills, setTechSkills] = useState([]);
    const [softSkills, setSoftSkills] = useState([]);

    useEffect(() => {
        // Charger les compétences depuis le JSON
        const fetchSkills = async () => {
            try {
                const response = await fetch("/profile/skills.json");
                const data = await response.json();
                setTechSkills(data.tech_skills);
                setSoftSkills(data.soft_skills);
            } catch (error) {
                console.error("Error loading skills:", error);
            }
        };
        fetchSkills();
    }, []);

    return (
        <Container sx={{ my: 14 }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                color={colors.primary}
            >
                Skills & Tech Stack
            </Typography>

            <Typography
                variant="h5"
                textAlign="center"
                color={colors.textLight}
                fontWeight="bold"
                mb={6}
            >
                that drive my code and fuel my projects
            </Typography>

            <Grid container spacing={4}>
                <Grid xs={12} sm={6} md={4} >
                    <Card
                        sx={{
                            height: "100%",
                            background: "#020617",
                            borderRadius: 3,
                            transition: "0.3s",
                            "&:hover": {
                                transform: "translateY(-6px)",
                                boxShadow: "0 20px 40px rgba(56,189,248,0.15)"
                            }
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" color={colors.secondary} mb={1}>
                                Soft Skills
                            </Typography>

                            <Divider sx={{ mb: 2 }} />
                            <Stack direction="row" spacing={2} flexWrap="wrap">
                                {softSkills.map((skill, index) => (
                                    <Chip
                                        key={index}
                                        label={
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                {skill.category}
                                                <Tooltip title={skill.details} arrow placement="top">
                                                    <IconButton size="small" sx={{ color: colors.secondary }}>
                                                        <InfoIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        }
                                        variant="outlined"
                                        color={colors.primary}
                                        sx={{
                                            mx: 10,
                                            fontWeight: 500,
                                            color: colors.textLight
                                        }}
                                    />
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                {techSkills.map((skill, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                height: "100%",
                                background: "#020617",
                                borderRadius: 3,
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: "0 20px 40px rgba(56,189,248,0.15)"
                                }
                            }}
                        >
                            <CardContent>
                                {/* Ici on supprime l'icon car le JSON n'en a pas */}
                                <Typography variant="h6" fontWeight="bold" color={colors.primary} mb={1}>
                                    {skill.category}
                                </Typography>

                                <Divider sx={{ mb: 2 }} />

                                <Stack direction="row" spacing={1} sx={{ px: 5 }} flexWrap="wrap">
                                    {skill.details.map((detail, i) => (
                                        <Chip
                                            key={i}
                                            label={detail}
                                            variant="outlined"
                                            color={colors.primary}
                                            sx={{
                                                mx: 10,
                                                fontWeight: 500,
                                                color: colors.textLight
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </Container>

    );
}
