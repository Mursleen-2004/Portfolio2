import { Router } from "express";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const router = Router();

const limiter = rateLimit({ windowMs: 15 * 60_000, max: 5, standardHeaders: true, legacyHeaders: false });
router.use(limiter);

router.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message)
    return res.status(400).json({ success: false, error: "All fields are required." });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ success: false, error: "Invalid email address." });

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("DEV MODE — Email not configured. Would have sent:", { name, email, subject });
    return res.json({ success: true, message: "Message received (dev mode)." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `<h2>New message from ${name}</h2><p><b>Email:</b> ${email}</p><p><b>Subject:</b> ${subject}</p><p><b>Message:</b></p><p>${message.replace(/\n/g, "<br>")}</p><p><i>Sent: ${new Date().toLocaleString()}</i></p>`,
    });

    await transporter.sendMail({
      from: `"Mursleen Bukhari" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for reaching out!",
      html: `<p>Hi ${name},</p><p>Thanks for your message! I'll get back to you within 24 hours.</p><p>Best,<br>Mursleen Bukhari</p>`,
    });

    res.json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

export default router;
