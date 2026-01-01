import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from "@mui/icons-material/Email";
import { colors } from "../styles/colors";

const SocialCards = () => {
    const [linkedin, setLinkedin] = useState([]);
    const [github, setGit] = useState([]);
    const [email, setEmail] = useState([]);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    useEffect(() => {
        // Charger les missions depuis le JSON
        const fetchLinks = async () => {
            try {
                const response = await fetch("/profile/social.json");
                const data = await response.json();
                setLinkedin(data.linkedin);
                setGit(data.github);
                setEmail(data.email);
            } catch (error) {
                console.error("Error loading missions:", error);
            }
        };
        fetchLinks();
    }, []);
    return (
        <Box sx={{ mt: 5}}>
            <IconButton
                component="a"
                href={linkedin}
                target="_blank"
                rel="noopener"
                sx={{color: colors.primary}}
            >
                <LinkedInIcon/>
            </IconButton>
            <IconButton
                component="a"
                href={github}
                target="link"
                rel="noopener"
                sx={{color: colors.primary}}
            >
                <GitHubIcon/>
            </IconButton>
            <Tooltip title={copied ? "Copié !" : "Copier l'email"}>
                <IconButton onClick={handleCopy} sx={{ color: colors.primary }}>
                    <EmailIcon/>
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default SocialCards;