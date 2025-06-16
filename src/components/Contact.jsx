import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Message sent successfully!");

        form.reset();

        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-bl to-[#071952] from-[#010224]  text-white py-20 px-6 flex flex-col items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-10 text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h2>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#1f2833] rounded-2xl p-8 shadow-2xl border border-[#45a29e] space-y-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Web3Forms Hidden Inputs */}
        <input type="hidden" name="access_key" value="1e565e12-8ae1-4f70-b131-62bb20d4f6cb" />
        <input type="hidden" name="subject" value="New Contact from Portfolio" />
        <input type="hidden" name="from_name" value="Portfolio" />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[#c5c6c7]">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter name"
              className="w-full p-3 rounded-lg bg-[#0b0c10] border border-[#45a29e] text-white focus:outline-none focus:ring-2 focus:ring-[#66fcf1]"
            />
          </div>
          <div>
            <label className="block mb-2 text-[#c5c6c7]">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter email"
              className="w-full p-3 rounded-lg bg-[#0b0c10] border border-[#45a29e] text-white focus:outline-none focus:ring-2 focus:ring-[#66fcf1]"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-[#c5c6c7]">Message</label>
          <textarea
            name="message"
            required
            rows="5"
            placeholder="write a message..."
            className="w-full p-3 rounded-lg bg-[#0b0c10] border border-[#45a29e] text-white focus:outline-none focus:ring-2 focus:ring-[#66fcf1]"
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 rounded-lg bg-[#66fcf1] text-[#0b0c10] font-semibold text-lg hover:bg-[#76b1ae] hover:text-white cursor-pointer transition duration-400"
        >
           Send Message
        </motion.button>
      </motion.form>
    </section>
  );
};

export default Contact;
