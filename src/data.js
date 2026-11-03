// Image imports carry vite-imagetools queries: each is resized and re-encoded to
// AVIF/WebP/JPEG at build time. COVER = full-bleed project frames, PHONE = phone
// screenshots, WIDE/TALL = gallery cards, posters = single WebP frames for videos.
import errandaPhoto from "./media/erranda-photo.jpg?w=640;1000;1400&format=avif;webp;jpg&as=picture";
import rentt from "./media/rentt.jpg?w=640;1000;1400&format=avif;webp;jpg&as=picture";
import smatvirtual from "./media/smatvirtual.jpg?w=640;1000;1400&format=avif;webp;jpg&as=picture";
import lafargeSuite from "./media/lafarge-suite.jpg?w=320;560&format=avif;webp;jpg&as=picture";
import lapProcurement from "./media/lap-procurement.jpg?w=320;560&format=avif;webp;jpg&as=picture";
import kayshealth from "./media/kayshealth.jpg?w=480;900&format=avif;webp;jpg&as=picture";
import bammby from "./media/bam.jpeg?w=480;900&format=avif;webp;jpg&as=picture";
import cv from "./media/cv.jpeg?w=480;900&format=avif;webp;jpg&as=picture";
import errandaTeam from "./media/erranda-team.jpg?w=360;720&format=avif;webp;jpg&as=picture";
import smatvirtualAge from "./media/smatvirtual-age.jpg?w=360;720&format=avif;webp;jpg&as=picture";
import remmob from "./media/remmob.jpg?w=360;720&format=avif;webp;jpg&as=picture";
import brandbuddies from "./media/brandbuddies.png?w=360;720&format=avif;webp;jpg&as=picture";
import dice from "./media/dice.png?w=360;720&format=avif;webp;jpg&as=picture";
import errandaVideo from "./media/erranda-appstore.mp4";
import errandaPoster from "./media/erranda-appstore-poster.jpg?w=540&format=webp";
import maryVideo from "./media/mary-uzoukwu.mp4";
import maryPoster from "./media/mary-uzoukwu-poster.jpg?w=540&format=webp";
import softlifeVideo from "./media/softlifehub.mp4";
import softlifePoster from "./media/softlifehub-poster.jpg?w=540&format=webp";

export const profile = {
  name: "Joseph Osho",
  role: "Senior AI Native Fullstack Developer",
  location: "Lagos · GMT+1",
  email: "oshojoseph2@gmail.com",
  phone: "+2349134248820",
  cv: `${import.meta.env.BASE_URL}Joseph-Osho-Resume-2026.pdf`,
};

export const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/joseph-osho-627211235" },
  { label: "GitHub", href: "https://github.com/hushjozy" },
  { label: "X / Twitter", href: "https://twitter.com/graph_art_lawd" },
  { label: "WhatsApp", href: "https://wa.me/2349134248820" },
];

export const chapters = [
  { id: "about", no: "01", title: "The short version", sub: "Who I am, in one breath" },
  { id: "work", no: "02", title: "Selected work", sub: "Enterprise platforms & shipped apps" },
  { id: "experience", no: "03", title: "The record", sub: "Eight years, seven teams" },
  { id: "process", no: "04", title: "How I work", sub: "Three habits I don't skip" },
  { id: "stack", no: "05", title: "The toolkit", sub: "What I reach for" },
  { id: "contact", no: "06", title: "Let's talk", sub: "Open to the right problem" },
];

export const stats = [
  { value: 8, suffix: "+", label: "Years shipping web & mobile" },
  { value: 810, suffix: "+", label: "Automated tests on one AI platform" },
  { value: 3, suffix: "", label: "Mobile apps published in 8 months" },
  { value: 40, suffix: "%", label: "Faster platform after a NestJS microservice rework" },
];

export const work = [
  {
    title: "Client Assessment Platform",
    client: "TeKnowledge",
    year: "2026",
    desc: "A two-app AI-readiness assessment platform on Azure Kubernetes: questionnaires, workshops, analysis of where stakeholders disagree, AI-drafted reports and a four-eyes approval step. Separate internal staff and customer apps with Entra ID SSO.",
    tags: ["Next.js", "Cosmos DB", "AKS", "Entra ID"],
    role: "Architect & lead",
    status: "Production",
    mark: "CA",
    tone: "indigo",
  },
  {
    title: "ATS & Candidate Portal",
    client: "YNV Group",
    year: "2026",
    desc: "The group-wide hiring platform for all of YNV Group: an AI-driven applicant tracking system and its candidate portal, with Azure OpenAI agents for resume parsing, screening, final analysis and bias checks, an AI-avatar interview room on Azure Voice Live, and Dynamics 365 F&O for offers.",
    tags: ["Azure OpenAI", "Voice Live", "D365 F&O"],
    role: "Fullstack, AI agents",
    status: "Delivered",
    mark: "AT",
    tone: "red",
  },
  {
    title: "InnoVerse",
    client: "YNV Group",
    year: "2026",
    desc: "An innovation-idea platform covering idea submission, evaluation, prioritisation and pipeline tracking.",
    tags: ["Next.js", "Workflows", "Analytics"],
    role: "Fullstack",
    status: "Delivered",
    mark: "IV",
    tone: "ochre",
  },
  {
    title: "LAP SmartProcurement",
    client: "Lafarge Huaxin",
    year: "2025",
    desc: "The organisation's procurement mobile app with automated tracking, taken from development through user-approved testing to the App Store, wired into ticketing for procurement financing.",
    tags: ["React Native", ".NET", "iOS / Android"],
    role: "Lead engineer",
    status: "On the App Store",
    link: "https://apps.apple.com/us/app/lap-smartprocurement/id6762128563",
    image: lapProcurement,
    mark: "LP",
    tone: "plum",
  },
  {
    title: "SmatVirtual",
    client: "SmatVirtual",
    year: "2022–25",
    desc: "Virtual betting games (Tournament, Singles, Lotto, Color) with live rankings and result animations over Socket.IO, multi-merchant dashboards, and .NET services for payouts and settlement.",
    tags: ["React", "NestJS", "Socket.IO", "Redis", "Nx"],
    role: "Fullstack",
    status: "Live",
    link: "https://smatvirtual.com",
    image: smatvirtual,
    fit: "cover",
    mark: "SV",
    tone: "red",
  },
  {
    title: "Erranda",
    client: "Erranda Tech",
    year: "2023–24",
    desc: "Peer-to-peer delivery across Nigeria: RBAC for agents, clients and admins, escrow payments, Paystack wallets and webhooks, and real-time notifications that lifted engagement by 40%.",
    tags: ["Node.js", "MongoDB", "Paystack", "FCM"],
    role: "Fullstack → Senior backend",
    status: "iOS & Android",
    link: "https://play.google.com/store/apps/details?id=com.erranda.app&hl=en",
    image: errandaPhoto,
    fit: "cover",
    mark: "ER",
    tone: "ochre",
  },
  {
    title: "rentt",
    client: "rentt · United Kingdom",
    year: "2024–25",
    desc: "A multi-property management system for landlords, agents, tenants and service providers: leases, digital signatures, rent collection and live maintenance updates.",
    tags: ["React", "WebSockets", "Reusable UI"],
    role: "Senior frontend",
    status: "On the App Store",
    link: "https://apps.apple.com/us/app/rentt/id6478425826",
    image: rentt,
    fit: "cover",
    mark: "Rt",
    tone: "indigo",
  },
  {
    title: "Stars Among Us",
    client: "Lafarge Huaxin",
    year: "2025",
    desc: "An employee reward and recognition system, one of three internal apps published in eight months.",
    tags: ["React", ".NET", "Mobile"],
    role: "Lead engineer",
    status: "Live",
    link: "https://sau.lapapps.ng",
    image: lafargeSuite,
    mark: "SA",
    tone: "plum",
  },
];

export const gallery = [
  { title: "Kays Healthcare", note: "Medical consultancy site", image: kayshealth, link: "https://kayshealth.com" },
  { title: "Mary Uzoukwu", note: "Therapist portfolio site", video: maryVideo, poster: maryPoster, tall: true },
  { title: "Team Erranda", note: "Behind the product", image: errandaTeam, tall: true },
  { title: "The Soft Life Hub", note: "Interiors & gallery site", video: softlifeVideo, poster: softlifePoster, tall: true },
  { title: "SmatVirtual at AGE", note: "Eko Hotel, Lagos", image: smatvirtualAge, tall: true },
  { title: "Erranda", note: "Live on the App Store", video: errandaVideo, poster: errandaPoster, tall: true },
  { title: "Remedy Mobile", note: "Push, biometrics, deep links", image: remmob, tall: true },
  { title: "Bammby", note: "Landing page & waitlist", image: bammby, link: "https://bammby.com" },
  { title: "Dice.ng", note: "Gaming platform web app", image: dice, tall: true },
  { title: "Remedy CV", note: "Backup fullstack app", image: cv },
  { title: "Brand Buddies", note: "React Native + Socket.IO", image: brandbuddies, tall: true },
];

export const sites = [
  { title: "Skin Routine", note: "Skin & beauty booking", href: "https://skinroutine.onrender.com" },
  { title: "Kayshealth", note: "Medical consultancy", href: "https://kayshealth.com" },
  { title: "Pure Design", note: "Tech solutions agency", href: "https://puredesign.ng" },
  { title: "Erranda Tech", note: "Delivery platform site", href: "https://www.errandatech.com" },
  { title: "Bammby", note: "Dating app waitlist", href: "https://bammby.com" },
  { title: "SmatVirtual", note: "Betting games provider", href: "https://smatvirtual.com" },
];

export const experience = [
  {
    company: "TeKnowledge",
    role: "Senior AI Native Fullstack Developer",
    period: "07/2026 — Present",
    place: "Lagos",
    points: [
      "Lead architecture through deployment on enterprise projects built around specific organisational problems.",
      "Shipped a two-app AI-readiness platform on AKS, backed by 670+ unit and 140+ end-to-end tests.",
      "Built YNV Group's group-wide AI applicant tracking system and candidate portal, with Azure OpenAI agents and an avatar interview room.",
      "Took a procurement application from development to production, integrated with ticketing.",
    ],
  },
  {
    company: "Lafarge / HBM",
    role: "Senior Software Engineer",
    period: "08/2025 — 07/2026",
    place: "Lagos",
    points: [
      "Published 3 mobile apps in 8 months (engagement, procurement, rewards), lifting operational efficiency by 20%.",
      "Built an admin dashboard in React, .NET and Next.js, linked to employee management and procurement.",
      "Raised efficiency 30% with customer service tooling and real-time notifications.",
      "Created a knowledge base with AI chat so staff find answers faster.",
    ],
  },
  {
    company: "rentt",
    role: "Senior Frontend Developer",
    period: "11/2024 — 08/2025",
    place: "United Kingdom · Part-time",
    points: [
      "Led the frontend for landlord, agent, tenant and service-provider portals.",
      "Built smart filtering, CRUD flows and a shared React component library.",
      "Added live maintenance updates over WebSockets plus secure auth and session handling.",
    ],
  },
  {
    company: "SmatVirtual",
    role: "Full Stack Developer",
    period: "12/2022 — 08/2025",
    place: "Lagos",
    points: [
      "Engineered live rankings and result animations for thousands of concurrent players.",
      "Unified frontend, backend and game modules in an Nx monorepo with standard CI/CD.",
      "Wrote ASP.NET Core services for payouts, leaderboards and settlement, with Redis caching.",
    ],
  },
  {
    company: "Erranda",
    role: "Fullstack → Senior Backend Developer",
    period: "01/2023 — 12/2024",
    place: "Lagos · Part-time",
    points: [
      "Designed RBAC, JWT auth and microservices in Node.js, NestJS and ASP.NET Core.",
      "Built escrow payments that lifted completed trades by 30%.",
      "Integrated Paystack deposits, withdrawals and webhook-driven wallet updates.",
    ],
  },
  {
    company: "Tech Workstations",
    role: "Lead Frontend Developer",
    period: "06/2020 — 12/2023",
    place: "Lagos",
    points: [
      "Shipped Remedy mobile features: push, biometrics, Google auth and universal deep links.",
      "Released builds to both app stores and built the Bammby landing page and waitlist.",
    ],
  },
  {
    company: "Lordwin Group",
    role: "Senior Full-Stack Developer",
    period: "11/2022 — 08/2023",
    place: "Lagos · Part-time",
    points: [
      "Made the gaming platform 40% faster with loosely coupled NestJS microservices.",
      "Deployed to Kubernetes on AWS, Azure, GCP and DigitalOcean behind load balancers.",
    ],
  },
  {
    company: "Impact Apps",
    role: "Fullstack Developer",
    period: "11/2018 — 01/2020",
    place: "Lagos · Part-time",
    points: [
      "Built a cross-platform React Native app with OAuth2 social sign-in and Socket.IO.",
    ],
  },
];

export const learning = [
  { title: "Claude Code & Agentic Operations", org: "Anthropic", year: "2026" },
  { title: "Cloud Development with AWS", org: "Udacity / ALX", year: "2022" },
  { title: "Frontend Development with React", org: "HKUST", year: "2021" },
  { title: "Higher National Diploma", org: "Moshood Abiola Polytechnic", year: "2020" },
];

export const ways = [
  {
    title: "Start from the organisation's problem",
    body: "Every enterprise build I lead begins with the process people are stuck in, not the stack. Procurement, hiring, assessment: the software takes the shape of the workflow, then gets out of the way.",
    proof: ["Procurement", "ATS", "Assessments", "InnoVerse"],
  },
  {
    title: "Real-time is a default, not a feature",
    body: "Live game results, maintenance requests, delivery notifications. I design event flows with Socket.IO, WebSockets and Redis from day one so the UI never has to ask twice.",
    proof: ["SmatVirtual", "Erranda", "rentt", "Lafarge"],
  },
  {
    title: "Build with agents, prove it with tests",
    body: "I work AI-native: agents for parsing, screening and drafting inside the product, and agentic tooling to build it. The guardrail is the suite: 810+ tests on a single platform before anyone signs off.",
    proof: ["Azure OpenAI", "Claude Code", "E2E suites", "Four-eyes"],
  },
];

export const stack = [
  { group: "Frontend", items: ["React", "Next.js", "React Native", "TypeScript", "Zustand", "Redux", "Tailwind", "Vue"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "ASP.NET Core", "Python", "Socket.IO", "REST", "Redis"] },
  { group: "Cloud & data", items: ["Azure AKS", "Cosmos DB", "Entra ID", "AWS", "Kubernetes", "PostgreSQL", "MongoDB", "Firebase"] },
  { group: "AI & tooling", items: ["Azure OpenAI", "Voice Live", "Claude Code", "Nx monorepo", "CI/CD", "Jira", "App publishing"] },
];

export const marquee = [
  "AI native",
  "Fullstack",
  "Real-time systems",
  "Microservices",
  "Mobile",
  "Azure",
  "Since 2018",
];
