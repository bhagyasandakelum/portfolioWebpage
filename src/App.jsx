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
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#00f3ff"; // Neon Cyan for Cyber look
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128);
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

const CyberCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 243, 255, 0.1)" }}
    className={`bg-black/80 border border-blue-900/30 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: "about", label: "About", icon: User },
    { id: "education", label: "History", icon: Database }, // Renamed from Education to History (Cyber feel)
    { id: "certificates", label: "Credentials", icon: Shield }, // Renamed from Certificates
    { id: "projects", label: "Operations", icon: Terminal }, // Renamed from Projects
    { id: "blog", label: "Intel", icon: FileText, external: "https://hash-cs.blogspot.com/" },
    { id: "contact", label: "Comms", icon: Mail },
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
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
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
              bhagyaslive_
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

              {/* Profile Image with Cyber Border */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center order-2 md:order-1"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-lg bg-black p-1">
                    <div className="absolute top-0 left-0 w-full h-full border border-cyan-500/30 rounded-lg z-20 pointer-events-none"></div>
                    <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-500 z-20"></div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-500 z-20"></div>
                    <img
                      src="/image.png"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
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
                    System Online
                  </p>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                    Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Bhagya</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light border-l-4 border-cyan-500 pl-4">
                    Security Engineer | <span className="text-cyan-400">Cybersecurity Specialist</span>
                  </p>
                  <p className="text-gray-400 mb-8 leading-relaxed max-w-lg">
                    Excecuting secure system protocols and developing robust applications.
                    Passionate about defending digital infrastructures and solving complex security challenges.
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

                  <button
                    onClick={() => scrollToSection("contact")}
                    className="px-8 py-3 bg-cyan-600/10 border border-cyan-500 text-cyan-400 font-mono rounded hover:bg-cyan-500 hover:text-black transition-all duration-300 flex items-center gap-2 group"
                  >
                    <Terminal size={18} />
                    <span>Initialize_Contact()</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION (RENAMED TO HISTORY FOR CYBER THEME) */}
        <section id="education" className="min-h-screen py-20 px-4 relative">
          <div className="max-w-5xl mx-auto">
            <SectionTitle icon={Database}>System_History</SectionTitle>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-900 before:to-transparent">
              {[
                {
                  title: "Bachelor's in Computer Science",
                  details: "University of Jaffna | 2023 - Present",
                  desc: "Specializing in Cybersecurity, Network Defense, and System Architecture.",
                  active: true
                },
                {
                  title: "System Initialization (High School)",
                  details: "2016 - 2018",
                  desc: "Foundation in Mathematics and ICT protocols.",
                  active: false
                }
              ].map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyan-500 bg-black shadow-[0_0_10px_rgba(0,243,255,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {edu.active ? <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" /> : <div className="w-3 h-3 bg-gray-600 rounded-full" />}
                  </div>

                  <CyberCard className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6">
                    <h3 className="text-xl font-bold text-cyan-400 font-mono mb-2">{edu.title}</h3>
                    <p className="text-sm text-gray-500 font-mono mb-4 border-b border-gray-800 pb-2">{edu.details}</p>
                    <p className="text-gray-400">{edu.desc}</p>
                  </CyberCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS/CERTIFICATES (RENAMED TO CREDENTIALS) */}
        <section id="certificates" className="min-h-screen py-20 px-4 bg-black/50">
          <div className="max-w-6xl mx-auto">
            <SectionTitle icon={Shield}>Security_Credentials</SectionTitle>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
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
                  <div className="h-full bg-gray-900/30 border border-gray-800 hover:border-cyan-500/50 p-6 rounded-xl transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <cert.icon size={80} />
                    </div>
                    <div className="p-2 w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 text-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-shadow">
                      <Award size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{cert.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{cert.issuer}</p>
                    <div className="flex justify-between items-center text-xs font-mono text-gray-600 border-t border-gray-800 pt-4">
                      <span>ID: {cert.id}</span>
                      <span className="text-cyan-600 group-hover:text-cyan-400">VERIFIED</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS (RENAMED TO OPERATIONS) */}
        <section id="projects" className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionTitle icon={Terminal}>Active_Operations</SectionTitle>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Lanka Blood Donate",
                  desc: "Connects donors with blood banks. Features real-time requests and eligibility algorithms.",
                  tech: ["React", "PostgreSQL", "Ballerina"],
                  link: "https://github.com/PamudaUposath/iwb25-296-genalphaz",
                  image: "/pr1.png",
                  status: "DEPLOYED"
                },
                {
                  title: "Student Attendance System",
                  desc: "Role-based dashboards for administrators using dynamic session tracking.",
                  tech: ["PHP", "MySQL", "AdminLTE"],
                  link: "https://github.com/JanaRv0/SAMS",
                  image: "/pr2.png",
                  status: "MAINTENANCE"
                },
              ].map((project, idx) => (
                <CyberCard key={idx} className="group p-0 bg-gray-900/20 border-gray-800">
                  <div className="relative h-48 overflow-hidden border-b border-gray-800">
                    <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs font-mono text-cyan-400 border border-cyan-500/30 z-20">
                      STATUS: {project.status}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors font-mono">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-2">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2 py-1 text-xs font-mono text-blue-300 bg-blue-900/20 border border-blue-900/50 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-cyan-500 hover:text-cyan-300 transition-colors uppercase tracking-widest"
                    >
                      Execute Protocol <ExternalLink size={14} />
                    </a>
                  </div>
                </CyberCard>
              ))}
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
              className="bg-gradient-to-br from-gray-900/50 to-black border border-blue-900/30 p-8 md:p-12 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />

              <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Systems?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Looking for a dedicated cybersecurity engineer or need help with a project?
                My communication channels are open.
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <a
                  href="mailto:bhagyasandakelum02@gmail.com"
                  className="px-8 py-4 bg-cyan-600 text-white rounded font-bold hover:bg-cyan-500 transition-colors shadow-[0_0_20px_rgba(0,149,255,0.3)] flex items-center gap-2"
                >
                  <Mail size={20} />
                  Start Transmission
                </a>
                <div className="flex gap-4">
                  <a href="https://github.com/bhagyasandakelum" className="text-gray-400 hover:text-cyan-400 transition-colors"><Github size={24} /></a>
                  <a href="https://www.linkedin.com/in/bhagyaslive/" className="text-gray-400 hover:text-cyan-400 transition-colors"><Linkedin size={24} /></a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 bg-black border-t border-blue-900/20 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-gray-600 font-mono text-sm">
              © 2025 bhagyaslive_ // <span className="text-cyan-500">System Secure</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
