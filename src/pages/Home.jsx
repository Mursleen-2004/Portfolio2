import React from "react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certificates from "../components/Certificates";
import Timeline from "../components/Timeline";
import Terminal from "../components/Terminal";
import GitHubStats from "../components/GitHubStats";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AIChatbot from "../components/AIChatbot";

const Home = () => {
  const { isDark } = useTheme();
  return (
    <div style={{ background: isDark
      ? "linear-gradient(160deg, #020817 0%, #0F172A 50%, #020817 100%)"
      : "linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)"
    }}>
      <Navbar />
      <Hero />
      <Education />
      <Skills />
      <Projects />
      <Timeline />
      <GitHubStats />
      <Terminal />
      <Certificates />
      <Contact />
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Home;
