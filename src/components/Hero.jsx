import React from "react";
import Typewriter from "typewriter-effect";
import heroImage from "../assets/musa.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="text-white min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16 py-12 gap-12"
    >
      {/* Left Side: Text */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Hi, I am Mursleen
        </h1>
        <h2 className="text-xl sm:text-2xl text-[#FCDE59] font-bold">
          <Typewriter
            options={{
              strings: [
                "Frontend Developer",
                "MERN Stack Developer",
                "AI Enthusiast",
                "Tech Explorer",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto md:mx-0">
          A curious developer who loves turning ideas into meaningful web
          experiences. I build with MERN, explore AI, and enjoy learning
          something new every day.
        </p>

        {/* Resume Button */}
        <div className="mt-4 flex justify-center md:justify-start">
          <a
            href="/Resume.pdf" 
            download
            className="bg-[#FCDE59] text-black  px-6 py-2 rounded-md font-extrabold hover:bg-[#ffe989] transition-colors duration-500 shadow-md"
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="w-full md:w-1/2 flex justify-center perspective-3d">
        <img
          src={heroImage}
          alt="Mursleen"
          className="w-48 sm:w-60 md:w-[300px] h-auto rounded-full border-2 cursor-pointer border-white animate-float transform-gpu hover:scale-105 hover:rotate-[2deg] hover:rotate-y-[4deg] transition-all duration-700 ease-in-out shadow-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
