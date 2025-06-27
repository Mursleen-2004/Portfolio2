import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaEye, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const certificates = [
  {
    title: "Frontend Developer",
    issuer: "Meta / Coursera",
    date: "Dec 2024",
    pdf: "/certificates/frontend.pdf",
    image: "/certificates/frontend.png",
  },
  {
    title: "Advance React",
    issuer: "Meta",
    date: "Dec 2024",
    pdf: "/certificates/advance_react.pdf",
    image: "/certificates/advance_react.png",
  },
  {
    title: "Programming For Everybody(Python)",
    issuer: "Coursera",
    date: "Nov 2024",
    pdf: "/certificates/programming(Python).pdf",
    image: "/certificates/programming(Python).png",
  },
  {
    title: "What is Data Science",
    issuer: "IBM / Coursera",
    date: "Nov 2024",
    pdf: "/certificates/intro_ds.pdf",
    image: "/certificates/intro_ds.png",
  },
  {
    title: "Tools of Data Science",
    issuer: "IBM / Coursera",
    date: "Sep 2024",
    pdf: "/certificates/tools_ds.pdf",
    image: "/certificates/tools_ds.png",
  },
  {
    title: "Data Science Methodologies",
    issuer: "IBM / Coursera",
    date: "Dec 2024",
    pdf: "/certificates/ds_methods.pdf",
    image: "/certificates/ds_methods.png",
  },
];

const Certificates = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;

  const paginatedCerts = certificates.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const nextPage = () => {
    if ((currentPage + 1) * pageSize < certificates.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="py-20 px-6 bg-transparent text-[#c5c6c7]" id="certificates">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-14 text-white tracking-wide uppercase">
           Certificates
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center mb-8">
          <AnimatePresence mode="wait">
            {paginatedCerts.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: .5 }}
                className="relative group"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="rounded-xl w-full max-w-xs shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-80  hover:scale-110 transition-all duration-400 cursor-pointer rounded-xl flex flex-col justify-center items-center text-center px-4">
                  <h3 className="text-lg font-bold text-[#66fcf1] mb-1">{cert.title}</h3>
                  <p className="text-sm text-gray-300 mb-1">{cert.issuer}</p>
                  <p className="text-xs text-gray-400 mb-4">{cert.date}</p>
                  <div className="flex gap-4">
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#66fcf1] text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#45a29e] flex items-center gap-2 transition"
                    >
                      <FaEye className="text-xs" />
                      View
                    </a>
                    <a
                      href={cert.pdf}
                      download
                      className="border border-[#66fcf1] text-[#66fcf1] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#66fcf1] hover:text-black flex items-center gap-2 transition"
                    >
                      <FaDownload className="text-xs" />
                      Download
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition ${
              currentPage === 0
                ? "bg-gray-700 cursor-not-allowed text-gray-400"
                : "bg-[#66fcf1] text-black hover:bg-[#45a29e] cursor-pointer"
            }`}
          >
           
            <FaArrowLeft />
            Prev
          </button>

          <button
            onClick={nextPage}
            disabled={(currentPage + 1) * pageSize >= certificates.length}
            className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition ${
              (currentPage + 1) * pageSize >= certificates.length
                ? "bg-gray-700 cursor-not-allowed text-gray-400"
                : "bg-[#66fcf1] text-black hover:bg-[#45a29e] cursor-pointer"
            }`}
          >
            Next
            <FaArrowRight />
            
          </button>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
