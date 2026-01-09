import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ExperienceTimeline from "./pages/ExperiencePage";
import EducationTimeline from "./pages/Education";
import Publications from "./pages/Publications";  
import Contact from "./pages/contact";
import Fragments from "./pages/Fragments";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout global */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="experience" element={<ExperienceTimeline />} />
           <Route path="education" element={<EducationTimeline />} />
           <Route path="Publications" element={<Publications/>} />
           <Route path="contact" element={<Contact/>} />    
          <Route path="Fragments" element={<Fragments/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App
