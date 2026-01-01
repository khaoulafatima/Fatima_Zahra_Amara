import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { colors } from "../styles/colors";


const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchExp = async () => {
            try {
                const response = await fetch("/profile/project.json");
                const data = await response.json();
                setProjects(data.projects);
            } catch (error) {
                console.error("Error loading missions:", error);
            }
        };
        fetchExp();
    }, []);
    return (
        <Box sx={{ my: 14, }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: colors.primary }}
                >
                    My Projects
                </Typography>

                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 6, color: colors.textLight }}
                >
                    a selection of DevOps, Cloud, IoT, Data, and Full-Stack projects
                </Typography>

                <Grid container spacing={4}>
                    {projects.map((project, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card
                                elevation={3}
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
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ fontWeight: 600, color: colors.primary }}
                                    >
                                        {project.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2, color: colors.textLight }}
                                    >
                                        {project.description}
                                    </Typography>

                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                        {project.tools.map((tool, i) => (
                                            <Chip key={i}
                                                label={tool}
                                                size="small"
                                                variant="outlined"
                                                color={colors.primary}
                                                sx={{
                                                    fontWeight: 500,
                                                    color: colors.textLight,border: `2px solid ${colors.accent}`

                                                }} />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ProjectsPage;
