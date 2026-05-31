import { Router } from "express";
import rateLimit from "express-rate-limit";

const router = Router();

const limiter = rateLimit({ windowMs: 60_000, max: 20, standardHeaders: true, legacyHeaders: false });
router.use(limiter);

const SYSTEM_PROMPT = `You are an AI assistant for Mursleen Bukhari's portfolio.
Mursleen is a MERN Stack Developer & AI Enthusiast from Multan, Pakistan.
Skills: React 80%, JavaScript 82%, Node.js 72%, MongoDB 70%, Python 70%, ML 55%, Tailwind 85%.
Projects: PromptIQ (AI quiz, MERN+OpenAI), Mind2Vision (AI image gen, MERN), AthletIQ (fitness AI, React+Clerk), Real Estate (React+Redux), QuickLodge (hotel booking).
Education: BS CS at NFC IET Multan 2021-2025.
Certifications: Meta Frontend Developer, Advanced React, Python for Everybody, 3x IBM Data Science.
Contact: musabukhari20@gmail.com | LinkedIn: /mursleen-bukhari-322a86259 | GitHub: Mursleen-2004.
Available for: Full-time, Freelance, Contract.
Keep answers concise and professional. If asked something unrelated, politely redirect.`;

function getMockResponse(message) {
  const m = message.toLowerCase();
  if (/skill|tech|stack|react|mern|node|mongo/.test(m))
    return "Mursleen is proficient in the full MERN stack: React (80%), JavaScript (82%), Node.js (72%), MongoDB (70%), Tailwind CSS (85%), Python (70%), and ML (55%).";
  if (/project|built|work|made/.test(m))
    return "Mursleen has built 5 major projects: PromptIQ (AI Quiz, MERN+OpenAI), Mind2Vision (AI Image Gen, MERN), AthletIQ (AI Trainer, React+Clerk), Real Estate Website (React+Redux), and QuickLodge (Hotel Booking).";
  if (/contact|email|reach|hire/.test(m))
    return "Contact Mursleen at musabukhari20@gmail.com or via LinkedIn (/mursleen-bukhari-322a86259) and GitHub (Mursleen-2004).";
  if (/resume|cv|download/.test(m))
    return "Mursleen's resume is available at /Resume.pdf on his portfolio.";
  if (/educat|degree|university/.test(m))
    return "Mursleen is completing BS Computer Science at NFC Institute of Engineering & Technology, Multan (2021–2025).";
  if (/availa|open|freelance|hire|job/.test(m))
    return "Yes! Mursleen is open to full-time positions, freelance projects, and contract work.";
  if (/cert|coursera|meta|ibm/.test(m))
    return "Mursleen holds 6 certifications: Meta Frontend Developer, Advanced React, Python for Everybody, and 3 IBM Data Science courses.";
  return "I can answer questions about Mursleen's skills, projects, experience, and availability. What would you like to know?";
}

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ success: false, error: "Message is required." });
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      });
      return res.json({ success: true, reply: completion.choices[0].message.content });
    } catch (err) {
      console.error("OpenAI error:", err.message);
    }
  }

  res.json({ success: true, reply: getMockResponse(message) });
});

export default router;
