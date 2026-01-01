import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ExperienceTimeline from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import GalleryPic from "./pages/LifeGallery";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout global */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="about" element={<GalleryPic />} /> */}
          <Route path="about" element={<AboutPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="experience" element={<ExperienceTimeline />} />
          <Route path="projects" element={<ProjectsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App
