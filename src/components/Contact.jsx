import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaCopy,
  FaCheck,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const EMAIL = "developers@bamrec.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/mursleen-bukhari-322a86259/";
const GITHUB_URL = "https://github.com/Mursleen-2004";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Contact = () => {
  const { isDark } = useTheme();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = useCallback(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");

      toast.success("Message sent successfully! I'll get back to you soon.", {
        position: "bottom-right",
        autoClose: 5000,
        theme: isDark ? "dark" : "light",
      });
      setForm(EMPTY_FORM);
      setErrors({});
    } catch {
      toast.error(
        `Failed to send. Please email directly: ${EMAIL}`,
        {
          position: "bottom-right",
          autoClose: 7000,
          theme: isDark ? "dark" : "light",
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("input");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  // Theme classes
  const sectionBg = isDark ? "" : "bg-[#F8FAFC]";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const subColor = isDark ? "text-gray-400" : "text-gray-500";
  const accentColor = isDark ? "text-[#F59E0B]" : "text-yellow-600";
  const cardBg = isDark
    ? "bg-white/5 border border-white/10 backdrop-blur-md"
    : "bg-white/80 border border-gray-200 backdrop-blur-md shadow-md";
  const inputBg = isDark
    ? "bg-white/5 border-white/15 text-white placeholder-gray-500 focus:border-[#F59E0B]/60 focus:bg-white/8"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-yellow-500/70 focus:shadow-sm";
  const labelColor = isDark ? "text-gray-300" : "text-gray-700";
  const errorColor = "text-red-400 text-xs mt-1";
  const infoIconBg = isDark ? "bg-white/5" : "bg-yellow-50";

  const contactInfoItems = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: EMAIL,
      action: copyEmail,
      actionIcon: copied ? FaCheck : FaCopy,
      actionLabel: copied ? "Copied!" : "Copy",
      color: "#F59E0B",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden ${sectionBg}`}
    >
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="max-w-5xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 ${headingColor}`}>
            Get In <span className={accentColor}>Touch</span>
          </h2>
          <p className={`text-sm md:text-base ${subColor}`}>
            Have a project in mind or want to collaborate? Let's talk!
          </p>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#22D3EE]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* LEFT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl p-5 sm:p-6 md:p-8 ${cardBg}`}
          >
            <h3 className={`text-lg font-bold mb-6 ${headingColor}`}>
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${labelColor}`}>
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all duration-200 ${inputBg}`}
                />
                {errors.name && <p className={errorColor}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${labelColor}`}>
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all duration-200 ${inputBg}`}
                />
                {errors.email && <p className={errorColor}>{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${labelColor}`}>
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className={`w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all duration-200 ${inputBg}`}
                />
                {errors.subject && <p className={errorColor}>{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${labelColor}`}>
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  className={`w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all duration-200 resize-none ${inputBg}`}
                />
                {errors.message && <p className={errorColor}>{errors.message}</p>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F59E0B] text-black font-bold text-sm hover:bg-[#ffe989] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-yellow-400/25"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" size={14} />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* RIGHT: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl p-5 ${cardBg}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse flex-shrink-0" />
                <div>
                  <p className={`font-bold text-base ${headingColor}`}>Open to Work</p>
                  <p className={`text-xs ${subColor}`}>
                    Available for full-time, freelance &amp; contract roles
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Email with copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`rounded-2xl p-5 ${cardBg}`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${subColor}`}>
                Email
              </p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${infoIconBg}`}>
                    <FaEnvelope size={15} className={accentColor} />
                  </div>
                  <span className={`text-sm font-medium truncate ${headingColor}`}>
                    {EMAIL}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  title="Copy email"
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    copied
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : isDark
                      ? "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                      : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {copied ? <FaCheck size={11} /> : <FaCopy size={11} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </motion.div>

            {/* LinkedIn */}
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className={`rounded-2xl p-5 flex items-center gap-3 group transition-all duration-200 ${cardBg} ${
                isDark ? "hover:border-blue-400/40" : "hover:border-blue-500/40"
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <FaLinkedin size={17} className="text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${subColor}`}>
                  LinkedIn
                </p>
                <p className={`text-sm font-medium group-hover:text-blue-400 transition-colors truncate ${headingColor}`}>
                  /mursleen-bukhari-322a86259
                </p>
              </div>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className={`rounded-2xl p-5 flex items-center gap-3 group transition-all duration-200 ${cardBg} ${
                isDark ? "hover:border-white/30" : "hover:border-gray-400/60"
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? "bg-white/10" : "bg-gray-100"}`}>
                <FaGithub size={17} className={isDark ? "text-gray-300" : "text-gray-700"} />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${subColor}`}>
                  GitHub
                </p>
                <p className={`text-sm font-medium group-hover:text-white transition-colors truncate ${headingColor}`}>
                  Mursleen-2004
                </p>
              </div>
            </motion.a>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className={`rounded-2xl p-5 flex items-center gap-3 ${cardBg}`}
            >
              <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt size={15} className="text-red-400" />
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${subColor}`}>
                  Location
                </p>
                <p className={`text-sm font-medium ${headingColor}`}>
                  Multan, Pakistan
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
