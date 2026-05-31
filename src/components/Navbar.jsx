import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Listen for scroll to add blur/shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Primary links shown on desktop nav bar
  const navLinks = [
    { label: "Home",         href: "/",              type: "link"   },
    { label: "Skills",       href: "#skills",        type: "anchor" },
    { label: "Projects",     href: "#projects",      type: "anchor" },
    { label: "Timeline",     href: "#timeline",      type: "anchor" },
    { label: "GitHub",       href: "#github",        type: "anchor" },
    { label: "Recruiter",    href: "/recruiter",     type: "link"   },
    { label: "Contact",      href: "/contact",       type: "link"   },
  ];

  // Extra links visible only in mobile menu
  const mobileExtra = [
    { label: "Education",    href: "#education",    type: "anchor" },
    { label: "Terminal",     href: "#terminal",     type: "anchor" },
    { label: "Certificates", href: "#certificates", type: "anchor" },
  ];

  const NavItem = ({ item, mobile = false }) => {
    const baseClass = mobile
      ? `text-base font-medium transition-colors duration-300 py-1 ${
          isDark
            ? "text-slate-300 hover:text-[#A78BFA]"
            : "text-slate-600 hover:text-violet-600"
        }`
      : "relative group py-1";

    const content = mobile ? (
      item.type === "link" ? (
        <Link
          to={item.href}
          className={baseClass}
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      ) : (
        <a
          href={item.href}
          className={baseClass}
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </a>
      )
    ) : item.type === "link" ? (
      <Link to={item.href} className={baseClass}>
        <span
          className={`transition-colors duration-300 group-hover:text-[#FCDE59] text-sm font-medium ${
            isDark ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {item.label}
        </span>
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
      </Link>
    ) : (
      <a href={item.href} className={baseClass}>
        <span
          className={`transition-colors duration-300 group-hover:text-[#A78BFA] text-sm font-medium ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {item.label}
        </span>
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
      </a>
    );

    return <li key={item.label}>{content}</li>;
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 px-5 py-3 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? isDark
            ? "backdrop-blur-xl bg-[#020817]/85 shadow-xl shadow-black/30 border-b border-white/[0.06]"
            : "backdrop-blur-xl bg-white/90 shadow-lg shadow-slate-200/60 border-b border-slate-200/60"
          : isDark
          ? "backdrop-blur-md bg-[#020817]/60"
          : "backdrop-blur-md bg-white/70"
      }`}
    >
      {/* Logo */}
      <a
        href="/"
        className="text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300 select-none gradient-text"
      >
        MB
      </a>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex gap-6 text-sm font-medium items-center">
        {navLinks.map((item) => (
          <NavItem key={item.label} item={item} />
        ))}
      </ul>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          whileTap={{ scale: 0.9 }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDark
              ? "bg-white/5 hover:bg-[#8B5CF6]/20 text-[#A78BFA] border border-white/8 hover:border-[#8B5CF6]/40"
              : "bg-slate-100 hover:bg-violet-50 text-violet-600 border border-slate-200"
          }`}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={17} />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={17} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300 ${
              isDark
                ? "text-slate-300 hover:bg-white/8"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute top-full left-0 w-full px-6 py-5 flex flex-col gap-4 lg:hidden shadow-xl ${
              isDark
                ? "backdrop-blur-xl bg-[#020817]/96 border-b border-white/[0.06]"
                : "backdrop-blur-xl bg-white/96 border-b border-slate-200/60"
            }`}
          >
            <ul className="flex flex-col gap-2">
              {[...navLinks, ...mobileExtra].map((item) => (
                <NavItem key={item.label} item={item} mobile />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
