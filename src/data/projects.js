export const categories = ["All", "Frontend", "MERN", "AI", "Full Stack"];

export const projects = [
  {
    id: "real-estate",
    name: "Real Estate Website",
    category: "Frontend",
    image: "/assets/projects/real_estate.png",
    description: "A React.js real estate platform with smart property filtering, detailed listings, and a clean intuitive UI built for seamless browsing.",
    tech: ["React", "Tailwind CSS", "Redux", "Framer Motion"],
    preview: "https://estate-reall.netlify.app/",
    code: "https://github.com/Mursleen-2004/Real_Estate-with-React",
    featured: true,
    overview: "A modern real estate browsing platform that lets users explore, filter, and view detailed property listings with a responsive and intuitive interface.",
    problem: "Traditional real estate websites are cluttered and difficult to navigate, making it hard for users to find relevant properties quickly. Filtering options are often hidden or non-functional on mobile devices.",
    solution: "Built a streamlined React SPA with Redux-powered state management for complex filtering logic, Framer Motion for smooth transitions, and a responsive card-based layout optimized for all screen sizes.",
    features: [
      "Smart property search and multi-criteria filtering",
      "Responsive card grid with hover animations",
      "Detailed property listing pages",
      "Redux state management for filter persistence",
      "Smooth page transitions with Framer Motion",
      "Mobile-first responsive design"
    ],
    challenges: [
      "Managing complex filter state with Redux while keeping UI reactive",
      "Optimizing performance for large property datasets without pagination",
      "Achieving 60fps animations on lower-end mobile devices"
    ],
    results: "A polished, fast-loading real estate platform that demonstrates advanced React and state management skills. Achieved Lighthouse score of 90+ on performance.",
    architecture: "React SPA → Redux Store (filters/listings) → Filtered Property Grid → Listing Detail View"
  },
  {
    id: "mind2vision",
    name: "Mind2Vision – AI Image Generator",
    category: "AI",
    image: "/assets/projects/Mind2Vision.png",
    description: "An AI-powered MERN application that transforms text prompts into stunning visuals using image generation APIs in real-time.",
    tech: ["React", "Node.js", "MongoDB", "Framer Motion", "Image Generation API", "Context API"],
    preview: "https://github.com/Mursleen-2004/AI-Powered-Text-To-image-Genrator",
    code: "https://github.com/Mursleen-2004/AI-Powered-Text-To-image-Genrator",
    featured: true,
    overview: "Mind2Vision bridges imagination and reality by letting users type any description and instantly generate professional-quality images using AI.",
    problem: "Creating visual content traditionally requires design skills or expensive tools. Non-designers struggle to visualize concepts quickly for presentations, projects, or creative work.",
    solution: "Built a full-stack MERN application with a Node.js backend that securely proxies AI image generation API calls, a React frontend with real-time generation feedback, and MongoDB for storing generated image history.",
    features: [
      "Real-time AI text-to-image generation",
      "Image generation history with MongoDB",
      "Secure API key management via Node.js backend",
      "Context API for global state management",
      "Download and share generated images",
      "Responsive gallery view"
    ],
    challenges: [
      "Managing long API response times with optimistic UI updates",
      "Securing AI API keys on the frontend without exposing them",
      "Building an efficient image caching and storage system"
    ],
    results: "Full-stack AI application showcasing MERN architecture and third-party API integration. Demonstrates ability to build production-ready AI-powered tools.",
    architecture: "React (Context API) → Node.js/Express API → Image Generation API → MongoDB (history) → React Gallery"
  },
  {
    id: "promptiq",
    name: "PromptIQ – AI Quiz Generator",
    category: "AI",
    image: "/assets/projects/PromptIQ.png",
    description: "An AI-powered quiz platform that generates customized, engaging quizzes on any topic in seconds using OpenAI's API.",
    tech: ["React", "Tailwind CSS", "OpenAI API", "JWT Auth", "MongoDB", "Node.js"],
    preview: "https://prompt-iq-ai-powered-quiz-generator-six.vercel.app/",
    code: "https://github.com/Mursleen-2004/PromptIQ---AI-Powered-Quiz-Generator",
    featured: true,
    overview: "PromptIQ democratizes quiz creation by using AI to instantly generate high-quality, topic-specific quizzes with multiple difficulty levels.",
    problem: "Creating educational quizzes manually is time-consuming for teachers and content creators. Existing quiz tools are rigid and don't adapt to specific topics or difficulty requirements.",
    solution: "Integrated OpenAI's GPT model to generate structured quiz data from user prompts. Built JWT authentication for user accounts, MongoDB for quiz persistence, and a smooth React UI for taking and reviewing quizzes.",
    features: [
      "AI-generated quizzes on any topic",
      "Adjustable difficulty levels",
      "JWT-based user authentication",
      "Quiz history and score tracking",
      "Timed quiz mode",
      "Result analysis with correct answers"
    ],
    challenges: [
      "Structuring AI output reliably as parseable quiz JSON",
      "Implementing secure JWT refresh token rotation",
      "Handling OpenAI API rate limits gracefully with retry logic"
    ],
    results: "Live production app on Vercel with real users. Demonstrates full-stack development, AI integration, and authentication system design.",
    architecture: "React UI → Node.js/Express → OpenAI API (quiz generation) → MongoDB (users/quizzes) → JWT Auth Layer"
  },
  {
    id: "athletiq",
    name: "AthletIQ – AI Personal Trainer",
    category: "AI",
    image: "/assets/projects/AthletIq.png",
    description: "An AI-powered fitness app that generates personalized workout plans based on user goals, fitness level, and available equipment.",
    tech: ["React", "Clerk Auth", "Tailwind CSS", "ExerciseDB API"],
    preview: "https://athelet-iq-personal-trainer.vercel.app/",
    code: "https://github.com/Mursleen-2004/AtheletIQ-Personal-Trainer",
    featured: false,
    overview: "AthletIQ makes personal training accessible to everyone by generating customized workout plans powered by AI and a comprehensive exercise database.",
    problem: "Personal trainers are expensive and generic workout apps don't account for individual fitness levels, available equipment, or specific goals.",
    solution: "Integrated ExerciseDB API for a comprehensive exercise library and used Clerk for seamless authentication. Built an intelligent workout generator that considers user-provided parameters to create personalized plans.",
    features: [
      "Personalized workout plan generation",
      "Comprehensive exercise library with instructions",
      "Clerk authentication for user profiles",
      "Progress tracking dashboard",
      "Exercise filtering by muscle group and equipment",
      "Responsive mobile-first design"
    ],
    challenges: [
      "Integrating Clerk authentication with custom user profile data",
      "Designing an algorithm that generates balanced workout splits",
      "Optimizing API calls to ExerciseDB within rate limits"
    ],
    results: "Deployed on Vercel, demonstrating integration of third-party APIs, authentication services, and AI-driven personalization.",
    architecture: "React + Clerk Auth → ExerciseDB API → Workout Generator Logic → User Dashboard"
  },
  {
    id: "quicklodge",
    name: "QuickLodge – Hotel Booking App",
    category: "Full Stack",
    image: "/assets/projects/QuickLodge.png",
    description: "A modern hotel booking application with real-time availability, intuitive search, and a seamless booking flow built with React and Clerk.",
    tech: ["React", "Clerk Auth", "Tailwind CSS", "Context API"],
    preview: "https://hotel-booking-app-lyart-beta.vercel.app/",
    code: "https://github.com/Mursleen-2004/Hotel-Booking-App",
    featured: false,
    overview: "QuickLodge provides a smooth hotel discovery and booking experience, combining clean UI design with real-time state management.",
    problem: "Most hotel booking interfaces are cluttered with ads and confusing booking flows. Users abandon bookings due to poor UX and lack of clear pricing.",
    solution: "Built a clean, focused booking flow with Context API for cart/booking state, Clerk for secure authentication, and a transparent pricing breakdown before confirmation.",
    features: [
      "Hotel search with filters (location, dates, guests)",
      "Real-time availability display",
      "Streamlined booking flow",
      "Clerk authentication for booking management",
      "Booking confirmation and history",
      "Responsive design for all devices"
    ],
    challenges: [
      "Managing complex booking state (dates, guests, pricing) with Context API",
      "Implementing date picker with availability logic",
      "Building a pixel-perfect responsive layout across devices"
    ],
    results: "Clean, production-ready booking interface that demonstrates UI/UX skills and state management proficiency with React.",
    architecture: "React + Clerk → Context API (booking state) → Hotel Listing → Booking Flow → Confirmation"
  }
];
