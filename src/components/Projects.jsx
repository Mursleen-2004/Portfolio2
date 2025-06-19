import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
  {
    name: "Real Estate Website",
    image: "/assets/projects/real_estate.png",
    description:
      "Built with React.js, this real estate platform lets users explore, filter, and view detailed property listings with a clean and intuitive UI.",
    tech: ["React", "Tailwind", "Redux", "Framer Motion"],
    preview: "https://estate-reall.netlify.app/",
    code: "https://github.com/Mursleen-2004/Real_Estate-with-React",
  },
  {
    name: "AI Powered Text to Image Generator",
    image: "/assets/projects/Mind2Vision.png",
    description:
      "Mind2Vision is an AI-powered image generation app that transforms text prompts into stunning visuals in seconds.",
    tech: [
      "React",
      "Framer-motion",
      "MongoDB",
      "Node",
      "Context_Api",
      "Image Generation Api",
    ],
    preview: "https://jobfinder-demo.com",
    code: "https://github.com/Mursleen-2004/AI-Powered-Text-To-image-Genrator",
  },
  ,
  {
    name: "PromptIQ - AI Powered Quiz Generator",
    image: "/assets/projects/PromptIQ.png",
    description:
      "PromptIQ is an AI-powered quiz generator that creates customized, engaging quizzes in seconds.",
    tech: ["React", "Tailwind", "OpenAi", "JWT", "MongoDB"],
    preview: "https://prompt-iq-ai-powered-quiz-generator-six.vercel.app/",
    code: "https://github.com/Mursleen-2004/PromptIQ---AI-Powered-Quiz-Generator",
  },
  {
    name: "AthletIQ - AI Powered Personal Trainer",
    image: "/assets/projects/AthletIq.png",
    description:
      "AthletIQ is an AI-powered fitness app that generates personalized workout plans and tracks progress.a",
    tech: ["React", "Clerk", "Tailwind", "Exercise DB Api"],
    preview: "https://athelet-iq-personal-trainer.vercel.app/",
    code: "https://github.com/Mursleen-2004/AtheletIQ-Personal-Trainer",
  },
  {
    name: "Hotel-Booking-App",
    image: "/assets/projects/QuickLodge.png",
    description:
      "A modern hotel booking app that lets users explore, book, and manage stays with a smooth and responsive interface.",
    tech: ["React", "Clerk", "Tailwind", "Context Api"],
    preview: "https://hotel-booking-app-lyart-beta.vercel.app/",
    code: "https://github.com/Mursleen-2004/Hotel-Booking-App",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen  text-white px-4 md:px-10 py-20 flex flex-col items-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
        My Projects
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        className="w-full max-w-6xl"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#1f2833] rounded-2xl shadow-lg p-6 md:p-10">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full lg:w-1/2 rounded-xl object-cover shadow-md"
                />

                <div className="flex-1 space-y-4 text-left">
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#66fcf1]">
                    {project.name}
                  </h3>
                  <p className="text-sm md:text-base text-[#c5c6c7]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-[#0b0c10] border border-[#45a29e] rounded-full text-[#66fcf1]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 flex-wrap mt-6">
                    <a
                      href={project.preview}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2 bg-[#66fcf1] text-[#0b0c10] text-sm font-semibold rounded-md hover:bg-[#45a29e] hover:text-white transition"
                    >
                      Preview
                    </a>
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2 border border-[#66fcf1] text-[#66fcf1] text-sm font-semibold rounded-md hover:bg-[#45a29e] hover:text-white transition"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Projects;
