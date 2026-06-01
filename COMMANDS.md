# Portfolio – Important Commands

## Local Development

```bash
# Install frontend dependencies
npm install

# Start frontend dev server (http://localhost:5173)
npm run dev

# Start backend dev server (http://localhost:5000)
cd backend
npm install
node server.js

# Build frontend for production
npm run build

# Preview production build locally
npm run preview
```

---

## Git

```bash
# Check status
git status

# Stage all changes
git add .

# Commit
git commit -m "your message"

# Push to GitHub
git push origin main

# Pull latest
git pull origin main
```

---

## Vercel CLI

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod --yes

# Check who you're logged in as
vercel whoami

# List environment variables
vercel env ls

# Add an environment variable
echo "value" | vercel env add KEY production

# Remove an environment variable
vercel env rm KEY production

# View recent logs
vercel logs --since 1h

# Open project dashboard
vercel open
```

---

## Environment Variables (Vercel Production)

```bash
# Resend API key (email sending)
echo "re_xxxxxxxxxxxx" | vercel env add RESEND_API_KEY production

# Email to receive contact form messages
echo "musabukhari20@gmail.com" | vercel env add EMAIL_TO production

# OpenAI key (optional – for real AI chat)
echo "sk-xxxxxxxxxxxx" | vercel env add OPENAI_API_KEY production
```

---

## API Endpoints (Live)

```
GET  https://portfolio2-gamma-rose.vercel.app/api/health
POST https://portfolio2-gamma-rose.vercel.app/api/contact/send
POST https://portfolio2-gamma-rose.vercel.app/api/ai/chat
```

### Test contact form via curl

```bash
curl -X POST https://portfolio2-gamma-rose.vercel.app/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello!"}'
```

---

## Local Environment Variables

Create `.env` in the project root:

```env
VITE_API_URL=http://localhost:5000
```

Create `backend/.env` for local backend:

```env
PORT=5000
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_TO=musabukhari20@gmail.com
OPENAI_API_KEY=sk-xxxxxxxxxxxx
```

---

## URLs

| | |
|---|---|
| **Live site** | https://portfolio2-gamma-rose.vercel.app |
| **GitHub repo** | https://github.com/Mursleen-2004/Portfolio2 |
| **Vercel dashboard** | https://vercel.com/mursleen-2004s-projects/portfolio2 |
| **Resend dashboard** | https://resend.com |
