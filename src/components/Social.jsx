import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from "@mui/icons-material/Email";


// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faResearchgate, faGoogleScholar, faOrcid } from '@fortawesome/free-brands-svg-icons';


import { colors } from "../styles/colors";

const SocialCards = () => {
    const [linkedin, setLinkedin] = useState([]);
    const [github, setGit] = useState([]);
    const [email, setEmail] = useState([]);
    const [researchgate, setResearchgate] = useState([]);
    const [googlescholar, setGoogleScholar] = useState([]);
    const [orcid, setOrcid] = useState([]);

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
                setResearchgate(data.researchgate);
                setGoogleScholar(data.googlescholar);
                setOrcid(data.orcid);
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

                <IconButton
                    component="a"
                    href={researchgate}
                    target="link"
                    rel="noopener"
                    sx={{ color: colors.primary }}
                >
                    <FontAwesomeIcon icon={faResearchgate} />
                </IconButton>
          

                <IconButton
                    component="a"
                    href={googlescholar}
                    target="link"
                    rel="noopener"
                    sx={{ color: colors.primary}}
                >
                    <FontAwesomeIcon icon={faGoogleScholar} />
                </IconButton>

                <IconButton
                    component="a"
                    href={orcid}
                    target="link"
                    rel="noopener"
                    sx={{ color: colors.primary }}
                >
                    <FontAwesomeIcon icon={faOrcid}/>
                </IconButton>

        </Box>
    );
};

export default SocialCards;