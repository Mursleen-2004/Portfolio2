import { Router } from "express";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";

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

  if (!process.env.RESEND_API_KEY) {
    console.log("DEV MODE — Resend not configured. Would have sent:", { name, email, subject });
    return res.json({ success: true, message: "Message received (dev mode)." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.EMAIL_TO || "musabukhari20@gmail.com";

  try {
    // Notify you
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New message from ${name}</h2>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <p><i>Sent: ${new Date().toLocaleString()}</i></p>
      `,
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: "Mursleen Bukhari <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for your message! I'll get back to you within 24 hours.</p>
        <p>Best,<br>Mursleen Bukhari</p>
      `,
    });

    res.json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    console.error("Resend error:", err.message);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

export default router;
