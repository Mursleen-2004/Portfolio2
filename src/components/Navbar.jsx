import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "/contact" }, 
  ];

  return (
    <nav className="text-white px-6 py-4 flex justify-between items-center shadow-md fixed w-full top-0 z-50">
      {/* Logo */}
      <a
        href="/"
        className="text-2xl font-extrabold text-[#FCDE59] tracking-wide hover:scale-105 transition-transform duration-300"
      >
        Portfolio
      </a>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 text-md font-medium">
        {navLinks.map((item) => (
          <li
            key={item.label}
            className="hover:scale-105 transition-all duration-500"
          >
            {item.label === "Contact" ? (
              <Link
                to={item.href}
                className="relative group py-1"
              >
                <span className="group-hover:text-[#FCDE59] transition-colors duration-300">
                  {item.label}
                </span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FCDE59] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ) : (
              <a
                href={item.href}
                className="relative group py-1"
              >
                <span className="group-hover:text-[#FCDE59] transition-colors duration-300">
                  {item.label}
                </span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FCDE59] transition-all duration-300 group-hover:w-full"></span>
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-br from-[#09303d] to-[#537895] px-6 py-4 items-center justify-center flex flex-col gap-4 md:hidden shadow-lg z-40">
          {navLinks.map((item) =>
            item.label === "Contact" ? (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-[#FCDE59] transition-colors duration-300"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-[#FCDE59] transition-colors duration-300"
              >
                {item.label}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
