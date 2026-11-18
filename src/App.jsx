import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Cpu,
  Code,
  User,
  FileText,
  Terminal,
  Shield,
  Globe,
  Database,
  Lock,
  Award,
  Zap, // Added for skills
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Play,
  Download,
  Maximize2,
  Twitter,
  Instagram,
  Facebook
} from "lucide-react";

// --- Matrix Rain Effect Component ---
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const columns = Math.floor(width / 20);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Increased opacity for better visibility
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#00f3ff"; // Neon Cyan for Cyber look
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        // Binary Rain: 0s and 1s
        const text = Math.random() > 0.5 ? "1" : "0";
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-20"
    />
  );
};

// --- Reusable Animated Components ---
const SectionTitle = ({ children, icon: Icon }) => (
  <motion.h2
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="text-3xl md:text-5xl font-bold mb-12 flex items-center justify-center gap-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
  >
    {Icon && <Icon className="w-8 h-8 md:w-12 md:h-12 text-cyan-400" />}
    <span className="font-mono tracking-tighter">{"<"}{children}{"/>"}</span>
  </motion.h2>
);

const CyberCard = ({ children, className = "", ...props }) => (
  <motion.div
    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 243, 255, 0.1)" }}
    className={`bg-black/80 border border-blue-900/30 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group ${className}`}
    {...props}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none" />
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [journeyFilter, setJourneyFilter] = useState("Leadership");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const sections = [
    { id: "about", label: "Home", icon: User },
    { id: "projects", label: "Projects", icon: Code },
    //{ id: "education", label: "Education", icon: BookOpen },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "leadership", label: "Leadership & Volunteering", icon: Globe },
    { id: "blog", label: "Blog", icon: FileText, external: "https://hashcs.vercel.app" },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const scrollToSection = (id) => {
    if (id === "blog") {
      const section = sections.find((s) => s.id === id);
      if (section?.external) window.open(section.external, "_blank");
      return;
    }
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 bg-grid-pattern">
      <MatrixRain />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-blue-900/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl md:text-2xl font-bold font-mono text-cyan-400 flex items-center gap-2"
            >
              <Terminal size={20} />
              bhagyaslive
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 relative group ${activeSection === section.id
                    ? "text-cyan-400"
                    : "text-gray-400 hover:text-cyan-300"
                    }`}
                >
                  <span className="relative z-10">
                    {section.label}
                  </span>
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-900/20 rounded-lg border border-blue-500/30"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-cyan-400 hover:bg-blue-900/20 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black border-t border-blue-900/30 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-3 rounded-lg font-mono transition-colors ${activeSection === section.id
                      ? "bg-blue-900/30 text-cyan-400 border border-cyan-500/30"
                      : "text-gray-400 hover:bg-blue-900/10"
                      }`}
                  >
                    <span className="opacity-50 mr-2">{">"}</span>
                    {section.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Vertical Side Navigation (Backwards) */}
      <div className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 flex-col gap-6 z-40 items-center">
        {[...sections].reverse().map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            style={{ writingMode: 'vertical-rl' }}
            className={`text-xs font-mono uppercase tracking-widest transition-all duration-300 hover:-translate-x-1 rotate-180 py-2 ${activeSection === section.id ? "text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" : "text-gray-600 hover:text-cyan-300"
              }`}
          >
            {section.label}
          </button>
        ))}
        {/* Decorative Line */}
        <div className="w-px h-24 bg-gradient-to-t from-cyan-500/50 to-transparent mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="pt-16">

        {/* HERO SECTION */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        >
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

          <div className="max-w-6xl mx-auto w-full z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Profile Image with Circular Cyber Border */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center order-2 md:order-1"
              >
                <div className="relative group w-80 h-80 md:w-[450px] md:h-[450px]">
                  {/* Rotating decorative rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-dashed animate-[spin_10s_linear_infinite]" />
                  <div className="absolute -inset-4 rounded-full border border-blue-600/20 animate-[spin_15s_linear_infinite_reverse]" />

                  {/* Main image container */}
                  <div className="absolute inset-0 rounded-full bg-black p-1 overflow-hidden border-2 border-cyan-500 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                    <img
                      src="/image.png"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Floating Tech Badge */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -bottom-6 right-10 bg-black/90 border border-cyan-500 px-4 py-1 rounded-full text-cyan-400 text-xs font-mono shadow-lg"
                  >
                    STATUS: ACTIVE
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content */}
              <div className="text-left order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-mono text-cyan-400 mb-4 inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Available for Opportunities
                  </p>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                    Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Bhagya Sandakelum</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light border-l-4 border-cyan-500 pl-4">
                    Aspiring Security Engineer<br /> <span className="text-cyan-400">Computer Science Undergraduate</span>
                  </p>
                  <p className="text-gray-400 mb-8 leading-relaxed max-w-lg">
                    Full stack developer, cybersecurity enthusiast, and IEEE volunteer passionate about building secure, scalable applications and driving impactful tech communities.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    {[
                      { icon: Github, link: "https://github.com/bhagyasandakelum" },
                      { icon: Linkedin, link: "https://www.linkedin.com/in/bhagyaslive/" },
                      { icon: Mail, link: "mailto:bhagyasandakelum02@gmail.com" },
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg border border-gray-800 bg-gray-900/50 hover:bg-cyan-900/20 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 transition-all duration-300"
                      >
                        <item.icon size={24} />
                      </a>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="px-8 py-3 bg-cyan-600/10 border border-cyan-500 text-cyan-400 font-mono rounded hover:bg-cyan-500 hover:text-black transition-all duration-300 flex items-center gap-2 group"
                    >
                      <Mail size={18} />
                      <span>Contact Me</span>
                    </button>
                    <a
                      href="https://drive.google.com/file/d/1Md1bVV6XdaCQzzZLLza8BL4ylpVJLjW8/view?usp=sharing" // Replace with your Google Drive PDF link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-cyan-600/10 border border-cyan-500 text-cyan-400 font-mono rounded hover:bg-cyan-500 hover:text-black transition-all duration-300 flex items-center gap-2 group"
                    >
                      <FileText size={18} />
                      <span>Resume</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>






        {/* SKILLS TICKER (Visual Filler) */}
        <section id="skills" className="py-10 bg-blue-900/10 border-y border-blue-900/30 overflow-hidden relative">
          <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-sm z-0"></div>
          <div className="flex animate-[scroll_20s_linear_infinite] gap-12 whitespace-nowrap relative z-10 items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 text-cyan-500/50 font-mono text-xl font-bold uppercase tracking-widest">
                <span>Python</span> <Zap size={16} className="text-blue-500" />
                <span>JavaScript</span> <Zap size={16} className="text-blue-500" />
                <span>Java</span> <Zap size={16} className="text-blue-500" />
                <span>PHP</span> <Zap size={16} className="text-blue-500" />
                <span>CSS</span> <Zap size={16} className="text-blue-500" />
                <span>TailwindCSS</span> <Zap size={16} className="text-blue-500" />
                <span>React</span> <Zap size={16} className="text-blue-500" />
                <span>Next</span> <Zap size={16} className="text-blue-500" />
                <span>NodeJS</span> <Zap size={16} className="text-blue-500" />
                <span>MongoDB</span> <Zap size={16} className="text-blue-500" />
                <span>MySQL</span> <Zap size={16} className="text-blue-500" />
                <span>Docker</span> <Zap size={16} className="text-blue-500" />
                <span>GitHub</span> <Zap size={16} className="text-blue-500" />
                <span>Postman</span> <Zap size={16} className="text-blue-500" />
                <span>SQLite</span> <Zap size={16} className="text-blue-500" />
              </div>
            ))}
          </div>
        </section>



        {/* PROJECTS */}
        <section id="projects" className="min-h-screen py-20 px-4 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <SectionTitle icon={Code}>Projects</SectionTitle>

            {/* Project Filter Controls */}
            <div className="flex justify-center mb-12">
              <div className="flex gap-4 flex-wrap justify-center">
                {["All", "Individual", "Research", "Group", "Open Source"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setProjectFilter(filter)}
                    className={`px-6 py-2 rounded-full font-mono text-sm transition-all duration-300 border ${projectFilter === filter
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                      : "bg-gray-900/50 border-gray-800 text-gray-500 hover:border-cyan-500/50 hover:text-cyan-300"
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              layout
              ref={scrollContainerRef}
              className={`flex overflow-x-auto gap-8 pb-4 px-4 snap-x snap-mandatory scrollbar-hide ${projectFilter === "Open Source" ? "justify-center items-center overflow-hidden" : ""}`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {projectFilter === "Open Source" ? (
                <div className="flex flex-col md:flex-row gap-16 md:gap-32 justify-center items-center w-full min-h-[400px]">
                  <div className="relative group cursor-pointer text-center">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img src="/gssoc.png" alt="GSOC Contributor" className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 mx-auto" />
                    <p className="mt-6 text-xl text-white font-black group-hover:text-cyan-400 transition-colors">GSSOC Contributor - 2026</p>
                    <p className="text-gray-500 font-mono text-sm mt-2">GirlScript Summer of Code</p>
                  </div>
                  <div className="relative group cursor-pointer text-center">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img src="/nsoc.png" alt="NSOC Contributor" className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 mx-auto" />
                    <p className="mt-6 text-xl text-white font-black group-hover:text-blue-400 transition-colors">NSOC Contributor - 2026</p>
                    <p className="text-gray-500 font-mono text-sm mt-2">Nexus Spring of Code</p>
                  </div>
                </div>
              ) : (
                [
                  {
                    title: "RunSheet – Cloud Native Event Management & Team Cordination Tool",
                    desc: "A comprehensive event management web tool designed for event chairs and organizing teams to manage the entire event flow in real time. Features minute-by-minute rundown tracking, role coordination, and dynamic stage scheduling.",
                    features: [
                      "Real-time minute-by-minute rundown tracking for live events",
                      "Stage, AV, and cue management for production crews",
                      "Granular role-based coordination across organizers & chairs",
                      "Cloud-native architecture with synchronized multi-user updates"
                    ],
                    screenshots: ["/runsheet.png"],
                    tech: ["Next.js", "TailwindCSS", "Node.js", "Supabase", "Prisma"],
                    github: "https://github.com/bhagyasandakelum/runsheet",
                    link: "https://run-sheet-eight.vercel.app/",
                    image: "/runsheet.png",
                    status: "LIVE",
                    category: "Individual",
                    featured: true
                  },
                  {
                    title: "WalletX - Master Your Money",
                    desc: "A comprehensive personal finance manager that tracks daily expenses, visualizes spending patterns, and helps users stay within budget. Developed as a high-performance individual project with a focus on premium UI and data security.",
                    features: [
                      "Daily expense & income logging with smart category tagging",
                      "Visual spending patterns and interactive budget analytics",
                      "Offline-first secure storage powered by local SQLite",
                      "Zero telemetry and complete local data privacy"
                    ],
                    screenshots: ["/pr4.png"],
                    tech: ["React Native", "SQLite", "Local Storage"],
                    github: "https://github.com/bhagyasandakelum/walletx",
                    playStore: "https://play.google.com/store/apps/details?id=com.bhagyaslive.walletx",
                    image: "/pr4.png",
                    status: "LIVE",
                    category: "Individual",
                    featured: true
                  },
                  {
                    title: "VERGO Wear: Integrated E-Commerce and Order Fulfilment Platform with a Standalone Point of Sale System",
                    desc: "3rd-year university group software project awarded an 'A' grade. A full-scale apparel e-commerce and automated order fulfilment platform seamlessly paired with a standalone Point of Sale (POS) system for real-time inventory synchronization, retail billing, and order tracking.",
                    features: [
                      "Omnichannel real-time inventory sync between physical POS and online store",
                      "End-to-end customer checkout, order dispatch, and delivery tracking",
                      "Standalone Point of Sale terminal with receipt generation & cashier shifts",
                      "Custom high-fashion luxury streetwear UI with #50c878 emerald aesthetic"
                    ],
                    screenshots: ["/vergo.png", "/vergo-screenshot.png"],
                    tech: ["React", "Node.js", "Express", "TailwindCSS", "PostgreSQL", "REST API"],
                    github: "https://github.com/Vergo-Wear",
                    link: "https://vergo.lk",
                    image: "/vergo.png",
                    status: "LIVE",
                    category: "Group",
                    featured: true,
                    badges: [
                      { name: "Grade A Project", link: "https://vergo.lk" }
                    ]
                  },
                  {
                    title: "A Policy Enforcement Framework for Secure Flow Installation in SDN Architecture",
                    desc: "An ongoing cybersecurity research investigating dynamic policy enforcement mechanisms within Software-Defined Networking (SDN). Proposes a proactive security layer to prevent unauthorized flow rule insertion, flow table poisoning, and policy conflicts across distributed control and data planes.",
                    features: [
                      "Proactive policy enforcement validating OpenFlow rules prior to switch installation",
                      "Prevention of flow table poisoning, unauthorized overrides, and rule conflicts",
                      "Experimental validation on Mininet emulated network topologies",
                      "Cryptographic policy integrity checks across distributed controllers"
                    ],
                    screenshots: ["/sdn-research.png"],
                    tech: ["SDN / OpenFlow", "Network Security", "Python", "Policy Enforcement", "Mininet"],
                    image: "/sdn-research.png",
                    status: "ONGOING",
                    category: "Research",
                    categories: ["Research"]
                  },
                  {
                    title: "HashCS – Insights Hub",
                    desc: "A personal computer science blog platform to share technical writeups, systems knowledge, and programming insights. Powered by a headless CMS architecture with dynamic content rendering and responsive reading experience.",
                    features: [
                      "Headless content management using Hygraph with GraphQL API queries",
                      "Blazing-fast static site generation with dynamic incremental revalidation",
                      "Syntax-highlighted code blocks, dark mode UI, and typography optimization",
                      "Fully responsive layout tailored for technical reading on all screens"
                    ],
                    screenshots: ["/hashcs.png"],
                    tech: ["Next.js", "TailwindCSS", "Hygraph", "GraphQL"],
                    github: "https://github.com/bhagyasandakelum/hashcs",
                    link: "https://hashcs.vercel.app",
                    image: "/hashcs.png",
                    status: "LIVE",
                    category: "Individual"
                  },
                  {
                    title: "Shieldro – Real-Time Website Security Analyzer",
                    desc: "A Chrome extension that detects insecure HTTP, mixed content, phishing patterns, and missing security headers, mapping findings to OWASP Top 10 and visualizing risk through a modern security wheel. All analysis runs locally in the browser.",
                    features: [
                      "Real-time evaluation of HTTP security headers (CSP, HSTS, X-Frame-Options)",
                      "Mixed content and client-side vulnerability mapping to OWASP Top 10",
                      "Interactive security wheel visualization of composite risk scores",
                      "Strict client-side privacy adhering to Chrome Manifest V3 regulations"
                    ],
                    screenshots: ["/pr3.png"],
                    tech: ["Manifest V3", "JavaScript", "CSS"],
                    github: "https://github.com/bhagyasandakelum/shieldro",
                    image: "/pr3.png",
                    status: "DEPLOYED",
                    category: "Individual"
                  },
                  {
                    title: "Lanka Blood Donate",
                    desc: "Connects donors with blood banks. Features real-time requests and eligibility algorithms.",
                    features: [
                      "Real-time emergency blood request broadcasting and notifications",
                      "Algorithmic donor eligibility and mandatory rest period computation",
                      "Geographic proximity matching between donors and hospital blood banks",
                      "Secure medical verification and patient data protection"
                    ],
                    screenshots: ["/pr1.png"],
                    tech: ["React", "PostgreSQL", "Ballerina"],
                    github: "https://github.com/PamudaUposath/iwb25-296-genalphaz",
                    image: "/pr1.png",
                    status: "DEPLOYED",
                    category: "Group"
                  },
                  {
                    title: "Student Attendance System",
                    desc: "Role-based dashboards for administrators using dynamic session tracking.",
                    features: [
                      "Dynamic session-based QR tracking for rapid student attendance logging",
                      "Role-based dashboards for administrators, lecturers, and students",
                      "Automated attendance threshold calculation and absence warnings",
                      "AdminLTE-driven administrative reports and CSV/PDF data exports"
                    ],
                    screenshots: ["/pr2.png"],
                    tech: ["PHP", "MySQL", "AdminLTE"],
                    github: "https://github.com/JanaRv0/SAMS",
                    image: "/pr2.png",
                    status: "DEPLOYED",
                    category: "Group"
                  },
                ]
                  .filter(project => projectFilter === "All" || project.category === projectFilter || (project.categories && project.categories.includes(projectFilter)))
                  .map((project, idx) => (
                    <CyberCard
                      key={idx}
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveScreenshotIdx(0);
                      }}
                      className={`w-[320px] md:w-[400px] h-auto min-h-[580px] snap-center group p-0 bg-gray-900/20 flex flex-col shrink-0 overflow-hidden cursor-pointer hover:border-cyan-400/60 transition-all ${project.featured ? "border-cyan-500/50 shadow-[0_0_20px_rgba(0,243,255,0.12)]" : "border-gray-800"}`}
                    >
                      <div className="relative h-56 overflow-hidden border-b border-gray-800 shrink-0">
                        <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10" />
                        {project.featured && (
                          <div className="absolute top-2 left-2 bg-black/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-cyan-300 border border-cyan-500/60 rounded flex items-center gap-1.5 z-20 shadow-[0_0_15px_rgba(0,243,255,0.25)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span>FEATURED</span>
                          </div>
                        )}
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs font-mono text-cyan-400 border border-cyan-500/30 z-20">
                          STATUS: {project.status}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-mono line-clamp-3 min-h-[3.5rem] leading-snug">
                            {project.title}
                          </h3>
                          <span className="text-[10px] px-2 py-1 rounded bg-blue-900/30 text-cyan-300 border border-blue-900/50 uppercase tracking-wider shrink-0 ml-2">
                            {project.category}
                          </span>
                        </div>

                        <p className="text-gray-400 mb-6 line-clamp-4 text-sm flex-grow">
                          {project.desc}
                        </p>

                        {project.badges && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.badges.map((badge, i) => (
                              <a
                                key={i}
                                href={badge.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="px-2 py-1 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/50 text-cyan-300 text-[10px] font-mono uppercase tracking-wider rounded flex items-center gap-1 hover:border-cyan-400 hover:text-cyan-200 transition-colors shadow-[0_0_10px_rgba(0,243,255,0.1)]"
                              >
                                <Award size={10} className="text-cyan-400" />
                                {badge.name}
                              </a>
                            ))}
                          </div>
                        )}

                        <div className="mt-auto pt-4">
                          <div className="flex flex-wrap gap-2 mb-6 min-h-[4rem] content-start">
                            {project.tech.map((t, i) => (
                              <span key={i} className="px-2 py-1 text-xs font-mono text-blue-300 bg-blue-900/20 border border-blue-900/50 rounded">
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex flex-1 justify-center items-center gap-2 text-sm font-bold text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-widest border border-gray-800 hover:border-cyan-500/50 px-3 py-2 rounded-lg bg-black/50"
                                title="View on GitHub"
                              >
                                <Github size={18} className="shrink-0" />
                                <span>GitHub</span>
                              </a>
                            )}
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex flex-1 justify-center items-center gap-2 text-sm font-bold text-cyan-500 hover:text-cyan-300 transition-colors uppercase tracking-widest border border-cyan-500/30 hover:border-cyan-500 px-3 py-2 rounded-lg bg-cyan-900/10 shadow-[0_0_10px_rgba(0,243,255,0.1)]"
                                title="Visit Live Site"
                              >
                                <ExternalLink size={18} className="shrink-0" />
                                <span>Live Demo</span>
                              </a>
                            )}
                            {project.playStore && (
                              <a
                                href={project.playStore}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex flex-1 justify-center items-center gap-2 text-sm font-bold text-cyan-500 hover:text-cyan-300 transition-colors uppercase tracking-widest border border-cyan-500/30 hover:border-cyan-500 px-3 py-2 rounded-lg bg-cyan-900/10 shadow-[0_0_10px_rgba(0,243,255,0.1)]"
                                title="Get it on Play Store"
                              >
                                <Play size={18} fill="currentColor" className="shrink-0" />
                                <span>Play Store</span>
                              </a>
                            )}
                            {!project.github && !project.link && !project.playStore && (
                              <div className="flex flex-1 justify-center items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest border border-cyan-500/30 px-3 py-2 rounded-lg bg-cyan-950/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                                <span>Research in Progress</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CyberCard>
                  ))
              )}
            </motion.div>

            {/* Scroll Buttons - Centered Below */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={() => scroll("left")}
                className="p-4 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500 transition-all shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] group"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-4 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500 transition-all shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] group"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* CERTIFICATES */}
        <section id="education" className="min-h-[80vh] py-20 px-4 relative flex items-center">
          {/* Background effects */}
          <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none -translate-y-1/2" />

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <SectionTitle icon={BookOpen}>Education</SectionTitle>

            <div className="mt-20 md:mt-32 relative pt-12">
              {/* Horizontal Line Background */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 hidden md:block"></div>
              {/* Progress Line */}
              <div className="absolute top-0 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 hidden md:block shadow-[0_0_15px_rgba(0,243,255,0.5)]"></div>

              {/* Timeline Dots */}
              <div className="absolute -top-[10px] left-0 hidden md:block w-6 h-6 rounded-full bg-black border-4 border-blue-500 z-10 transition-colors duration-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
              <div className="absolute -top-[10px] left-1/2 hidden md:block w-6 h-6 rounded-full bg-black border-4 border-cyan-500 z-10 transition-colors duration-500 shadow-[0_0_20px_rgba(0,243,255,0.5)]"></div>

              <div className="grid md:grid-cols-2 gap-16 md:gap-8 relative z-10">
                {/* University */}
                <div className="relative group flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="md:pr-8 hover:-translate-y-2 transition-transform duration-500 flex flex-col items-center md:items-start w-full">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mb-4 md:hidden"></div>
                    <p className="text-blue-400 font-mono text-sm uppercase tracking-wider mb-2">BSc (Hons) in Computer Science</p>
                    <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">University of Jaffna</h4>
                    <p className="text-gray-400 mt-4 text-sm max-w-sm">Focusing on Cybersecuity.</p>
                    <p className="text-gray-300 font-bold mt-2 font-mono text-sm">GPA: 3.3/4.0(57/120)</p>
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/20 text-blue-300 text-xs font-mono rounded-full border border-blue-500/30 group-hover:border-blue-500 transition-colors">
                      <Zap size={12} className="text-blue-500" />
                      2023 - Present
                    </div>
                  </div>
                </div>

                {/* High School */}
                <div className="relative group flex flex-col items-center md:items-start text-center md:text-left md:pl-8">
                  <div className="hover:-translate-y-2 transition-transform duration-500 flex flex-col items-center md:items-start w-full">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mb-4 md:hidden"></div>
                    <div className="text-cyan-400 mb-4 flex justify-center md:justify-start">
                      <Award size={28} />
                    </div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">DS Senanayake National School</h4>
                    <p className="text-gray-400 mt-4 text-sm max-w-sm">Foundation in science, mathematics & ICT.</p>
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-900/20 text-cyan-300 text-xs font-mono rounded-full border border-cyan-500/30 group-hover:border-cyan-500 transition-colors">
                      <Zap size={12} className="text-cyan-500" />
                      2018 - 2020
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATES */}
        <section id="certificates" className="min-h-screen py-20 px-4 bg-black/50 relative">
          {/* Background Filler */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <SectionTitle icon={Award}>Certificates</SectionTitle>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Introduction to Cybersecurity",
                  issuer: "Cisco Networking Academy",
                  year: "2024",
                  id: "CISCO-CYB-24",
                  icon: Shield
                },
                {
                  name: "AI/ML Engineer - Stage 1",
                  issuer: "SLIIT",
                  year: "2025",
                  id: "SLIIT-AIML-25",
                  icon: Cpu
                },
                {
                  name: "Problem Solving (Basic)",
                  issuer: "HackerRank",
                  year: "2026",
                  id: "HR-PSB-26",
                  icon: Terminal
                },
                {
                  name: "Postman API Expert",
                  issuer: "Postman",
                  id: "API-SEC-01",
                  icon: Globe
                },
                {
                  name: "Data Science Foundation",
                  issuer: "Great Learning",
                  id: "DATA-SCI-02",
                  icon: Database
                },
                {
                  name: "SEO Optimization",
                  issuer: "Hubspot Academy",
                  id: "WEB-OPT-03",
                  icon: Code
                },
              ].map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-full bg-gray-900/30 border border-gray-800 hover:border-cyan-500/50 p-6 rounded-xl transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <cert.icon size={80} />
                    </div>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-shadow">
                          <Award size={24} />
                        </div>
                        {cert.year && (
                          <span className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono rounded-full shadow-[0_0_10px_rgba(0,243,255,0.1)]">
                            {cert.year}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{cert.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{cert.issuer}</p>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono text-gray-600 border-t border-gray-800 pt-4 mt-auto">
                      <span>ID: {cert.id}</span>
                      <span className="text-cyan-600 group-hover:text-cyan-400">VERIFIED</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP & VOLUNTEER (JOURNEY) */}
        <section id="leadership" className="min-h-screen py-20 px-4 relative">
          <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <SectionTitle icon={Globe}>Leadership & Volunteering</SectionTitle>

            {/* Journey Filter Controls */}
            <div className="flex justify-center mt-12 mb-16">
              <div className="flex gap-4 flex-wrap justify-center">
                {["Leadership", "Volunteering"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setJourneyFilter(filter)}
                    className={`px-6 py-2 rounded-full font-mono text-sm transition-all duration-300 border ${journeyFilter === filter
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                      : "bg-gray-900/50 border-gray-800 text-gray-500 hover:border-cyan-500/50 hover:text-cyan-300"
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={journeyFilter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {journeyFilter === "Leadership" && (
                    <div className="relative border-l-2 border-gray-800 ml-4 md:ml-6 space-y-12">
                      {/* Item 1 */}
                      <div className="relative pl-8 md:pl-12 group">
                        <div className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-black border-2 border-cyan-500 group-hover:bg-cyan-500 transition-colors shadow-[0_0_10px_rgba(0,243,255,0.5)]"></div>
                        <div className="absolute -left-1 top-[26px] w-8 h-px bg-cyan-500/50 hidden md:block"></div>
                        <div className="py-4 hover:-translate-y-2 transition-transform duration-300">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-2">
                            <div>
                              <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight font-mono">
                                Media and Communication Lead
                              </h4>
                              <p className="text-cyan-400 font-medium text-base md:text-lg flex items-center gap-2 mt-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                                AWS Cloud Club - UOJ
                              </p>
                            </div>
                            <span className="self-start text-cyan-400 text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
                              Current
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="relative pl-8 md:pl-12 group">
                        <div className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-black border-2 border-cyan-500 group-hover:bg-cyan-500 transition-colors shadow-[0_0_10px_rgba(0,243,255,0.5)]"></div>
                        <div className="absolute -left-1 top-[26px] w-8 h-px bg-cyan-500/50 hidden md:block"></div>
                        <div className="py-4 hover:-translate-y-2 transition-transform duration-300">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-2">
                            <div>
                              <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight font-mono">
                                Volunteer Management Coordinator
                              </h4>
                              <p className="text-cyan-400 font-medium text-base md:text-lg flex items-center gap-2 mt-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                                IEEE SLSAC
                              </p>
                            </div>
                            <span className="self-start text-cyan-400 text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
                              Current
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div className="relative pl-8 md:pl-12 group">
                        <div className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-black border-2 border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                        <div className="absolute -left-1 top-[26px] w-8 h-px bg-blue-500/50 hidden md:block"></div>
                        <div className="py-4 hover:-translate-y-2 transition-transform duration-300">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-2">
                            <div>
                              <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight font-mono">
                                Chairperson
                              </h4>
                              <p className="text-cyan-400 font-medium text-base md:text-lg flex items-center gap-2 mt-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                                IEEE Student Branch - University of Jaffna
                              </p>
                            </div>
                            <span className="self-start text-blue-400 text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30">
                              2025 - 2026
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {journeyFilter === "Volunteering" && (
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-6">
                      {[
                        { role: "Event Chair", event: "YarlInsight 2.0", org: "IEEE-SB-UoJ" },
                        { role: "Vice Chair - Design", event: "JamborIEEE 2025", org: "IEEE SLSAC" },
                        { role: "Public Visibility Team Lead", event: "IEEEXtreme 18.0 & YarlXtreme", org: "IEEE-SB-UoJ" },
                        { role: "Program Team Member", event: "TechFest", org: "IEEE Techverse Sri Lanka" },
                        { role: "Public Visibility Team Member", event: "YarlInsight 1.0", org: "IEEE-SB-UoJ" }
                      ].map((vol, idx) => (
                        <div key={idx} className="group py-6 border-b border-gray-800/50 hover:border-cyan-500/50 transition-all duration-300">
                          <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-mono">{vol.role}</h4>
                          <p className="text-cyan-400 font-medium text-sm mt-1">{vol.event}</p>
                          <p className="text-gray-500 text-xs font-mono uppercase tracking-wider mt-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                            {vol.org}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
        {/* CONTACT */}
        <section id="contact" className="min-h-[70vh] flex items-center py-20 px-4 relative">
          <div className="max-w-4xl mx-auto w-full text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 relative"
            >

              <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Looking for a dedicated cybersecurity engineer or need help with a project?
                Feel free to reach out.
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <a
                  href="mailto:bhagyasandakelum02@gmail.com"
                  className="px-8 py-4 bg-cyan-600 text-white rounded font-bold hover:bg-cyan-500 transition-colors shadow-[0_0_20px_rgba(0,149,255,0.3)] flex items-center gap-2"
                >
                  <Mail size={20} />
                  Send Email
                </a>
                <div className="flex gap-4 flex-wrap justify-center mt-4 md:mt-0">
                  <a href="https://github.com/bhagyasandakelum" className="text-gray-400 hover:text-cyan-400 transition-colors" title="GitHub"><Github size={24} /></a>
                  <a href="https://www.linkedin.com/in/bhagyasandakelum/" className="text-gray-400 hover:text-cyan-400 transition-colors" title="LinkedIn"><Linkedin size={24} /></a>
                  <a href="https://x.com/bhagyslive" className="text-gray-400 hover:text-cyan-400 transition-colors" title="Twitter"><Twitter size={24} /></a>
                  <a href="https://www.instagram.com/bhagyaslive/" className="text-gray-400 hover:text-cyan-400 transition-colors" title="Instagram"><Instagram size={24} /></a>
                  <a href="https://www.facebook.com/bhagyaslive/" className="text-gray-400 hover:text-cyan-400 transition-colors" title="Facebook"><Facebook size={24} /></a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>







        {/* FOOTER */}
        <footer className="py-8 bg-black border-t border-blue-900/20 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-gray-600 font-mono text-sm">
              © 2026 bhagyaslive <span className="text-cyan-500">System Secure</span>
            </p>
          </div>
        </footer>
      </div>

      {/* Project Details Pop-up Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            {/* Click backdrop to close */}
            <div
              className="fixed inset-0"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-4xl max-h-[92vh] bg-gradient-to-b from-[#0c101c] via-[#090d16] to-[#06080e] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,243,255,0.18)] flex flex-col overflow-hidden z-10 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glowing Top Cyber Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

              {/* Modal Header */}
              <div className="p-5 md:p-6 border-b border-gray-800/80 flex justify-between items-start gap-4 shrink-0 bg-black/40">
                <div className="pr-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-blue-900/40 text-cyan-300 border border-blue-800/60 uppercase tracking-wider font-semibold">
                      {selectedProject.category}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/40 uppercase tracking-wider font-semibold">
                      STATUS: {selectedProject.status}
                    </span>
                    {selectedProject.featured && (
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        FEATURED
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-mono tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg bg-gray-900/90 hover:bg-cyan-950/60 text-gray-400 hover:text-cyan-400 border border-gray-800 hover:border-cyan-500/60 transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-5 md:p-8 space-y-6">
                {/* Main Screenshot & Gallery */}
                <div>
                  <div className="relative h-64 md:h-[400px] w-full rounded-xl overflow-hidden border border-gray-800 bg-black shadow-inner flex items-center justify-center">
                    <img
                      src={
                        selectedProject.screenshots && selectedProject.screenshots[activeScreenshotIdx]
                          ? selectedProject.screenshots[activeScreenshotIdx]
                          : selectedProject.image
                      }
                      alt={selectedProject.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Multiple Screenshots Selector */}
                  {selectedProject.screenshots && selectedProject.screenshots.length > 1 && (
                    <div className="mt-3">
                      <p className="text-xs font-mono text-gray-500 mb-2">Available Views / Screenshots:</p>
                      <div className="flex gap-3 flex-wrap">
                        {selectedProject.screenshots.map((shot, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => setActiveScreenshotIdx(sIdx)}
                            className={`relative h-16 w-28 rounded-lg overflow-hidden border-2 transition-all ${
                              activeScreenshotIdx === sIdx
                                ? "border-cyan-400 scale-105 shadow-[0_0_12px_rgba(0,243,255,0.4)] ring-1 ring-cyan-400"
                                : "border-gray-800 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={shot} alt={`Thumbnail ${sIdx + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Badges / Awards */}
                {selectedProject.badges && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.badges.map((badge, i) => (
                      <a
                        key={i}
                        href={badge.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:border-cyan-400 hover:text-cyan-200 transition-colors shadow-[0_0_10px_rgba(0,243,255,0.15)]"
                      >
                        <Award size={14} className="text-cyan-400" />
                        {badge.name}
                      </a>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    Project Overview
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {selectedProject.desc}
                  </p>
                </div>

                {/* Key Features */}
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      Key Features & Architectural Capabilities
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {selectedProject.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="p-3 rounded-lg bg-gray-900/40 border border-gray-800/80 text-xs md:text-sm text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-cyan-400 font-bold mt-0.5">▹</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    Technologies & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-mono text-cyan-300 bg-blue-950/40 border border-cyan-500/30 rounded-lg shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer / Action Links */}
              <div className="p-5 md:p-6 border-t border-gray-800/80 bg-black/60 flex flex-wrap gap-3 shrink-0">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 justify-center items-center gap-2 text-sm font-bold text-gray-300 hover:text-cyan-400 transition-colors uppercase tracking-widest border border-gray-800 hover:border-cyan-500/50 px-4 py-2.5 rounded-lg bg-black/50"
                  >
                    <Github size={18} />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 justify-center items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest border border-cyan-500/40 hover:border-cyan-500 px-4 py-2.5 rounded-lg bg-cyan-950/30 shadow-[0_0_15px_rgba(0,243,255,0.15)]"
                  >
                    <ExternalLink size={18} />
                    <span>Live Deployment</span>
                  </a>
                )}
                {selectedProject.playStore && (
                  <a
                    href={selectedProject.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 justify-center items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest border border-cyan-500/40 hover:border-cyan-500 px-4 py-2.5 rounded-lg bg-cyan-950/30 shadow-[0_0_15px_rgba(0,243,255,0.15)]"
                  >
                    <Play size={18} fill="currentColor" />
                    <span>Google Play Store</span>
                  </a>
                )}
                {!selectedProject.github && !selectedProject.link && !selectedProject.playStore && (
                  <div className="flex flex-1 justify-center items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest border border-cyan-500/30 px-4 py-2.5 rounded-lg bg-cyan-950/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span>Ongoing Scientific Research</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
