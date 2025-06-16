import React from "react";
import Hero from "../components/Hero";
import { div } from 'framer-motion/client';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
      <div className='bg-gradient-to-br from-[#09303d] to-[#537895]' >
        <Navbar/>
      <Hero />
      <Education/>
      <Skills/>
      <Projects/>
      <Footer/>
    </div>
  );
};

export default Home;
