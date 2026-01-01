import React, { useEffect, useState } from "react";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from "@mui/lab";
import { Paper, Typography, Chip, Box, Container, useMediaQuery, useTheme } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
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
        <Container sx={{ my: { xs: 10, md: 14 } }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                color={colors.primary}
            >
                Background & Achievements
            </Typography>

            <Typography
                variant={isMobile ? "body1" : "h6"}
                color={colors.textLight}
                textAlign="center"
                gutterBottom
            >
                where my skills met real-world challenges
            </Typography>

            {/* Desktop Timeline */}
            {!isMobile && (
                <Timeline position="alternate" sx={{ my: 5 }}>
                    {experiences.map((exp, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent sx={{ pt: 2 }}>
                                <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    color={colors.textLight}
                                >
                                    {exp.period}
                                </Typography>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot sx={{ backgroundColor: colors.primary }}>
                                    <WorkIcon fontSize="small" />
                                </TimelineDot>
                                {index < experiences.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>

                            <TimelineContent sx={{ px: 2 }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <Box
                                                component="img"
                                                src={exp.logo}
                                                alt={exp.company}
                                                sx={{ width: 100, height: 60, objectFit: "contain" }}
                                            />
                                        </Box>

                                        <Typography variant="subtitle2" color="text.secondary" mb={1} sx={{textAlign: 'start'}}>
                                            {exp.contract}
                                        </Typography>

                                        {exp.missions.map((mission, i) => (
                                            <Typography key={i} variant="body2" mb={0.5}  sx={{textAlign: 'start'}}>
                                                {exp.missions.length > 1 && "• "} {mission}
                                            </Typography>
                                        ))}

                                        <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                                            {exp.tools.map((tool, i) => (
                                                <Chip key={i} label={tool} size="small" sx={{ color: colors.primary }} />
                                            ))}
                                        </Box>
                                    </Paper>
                                </motion.div>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            )}

            {/* Mobile List */}
            {isMobile && (
                <Box display="flex" flexDirection="column" gap={3} mt={4}>
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="caption" fontWeight="bold" color={colors.textLight} mb={1}>
                                    {exp.period}
                                </Typography>

                                <Box display="flex" alignItems="center" mb={1}>
                                    <Box
                                        component="img"
                                        src={exp.logo}
                                        alt={exp.company}
                                        sx={{ width: 80, height: 50, objectFit: "contain" }}
                                    />
                                </Box>

                                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                                    {exp.contract}
                                </Typography>

                                {exp.missions.map((mission, i) => (
                                    <Typography key={i} variant="body2" mb={0.5}>
                                        {exp.missions.length > 1 && "• "} {mission}
                                    </Typography>
                                ))}

                                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                                    {exp.tools.map((tool, i) => (
                                        <Chip key={i} label={tool} size="small" sx={{ color: colors.primary }} />
                                    ))}
                                </Box>
                            </Paper>
                        </motion.div>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default ExperienceTimeline;
