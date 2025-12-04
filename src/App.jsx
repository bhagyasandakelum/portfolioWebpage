import React, { useState } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
  BookOpen,
  Code,
  User,
  FileText,
} from "lucide-react";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: "about", label: "About", icon: User },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "projects", label: "Projects", icon: Code },
    {
      id: "blog",
      label: "Blog",
      icon: FileText,
      external: "https://hash-cs.blogspot.com/",
    },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const scrollToSection = (id) => {
    if (id === "blog") {
      window.open(
        sections.find((section) => section.id === id).external,
        "_blank"
      );
      return;
    }

    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-blue-900/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              bhagyaslive
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-blue-900/30 hover:text-white"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-900/30"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-blue-900/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-blue-900/30"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <div className="pt-16">
        {/* About */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center overflow-hidden border-4 border-blue-500/50 shadow-2xl shadow-blue-500/50">
                    <img
                      src="/image.png"
                      alt="bhagyaslive"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -z-10 top-4 left-4 w-80 h-80 rounded-2xl bg-blue-600/30 blur-xl"></div>
                </div>
              </div>

              {/* Intro */}
              <div className="text-left">
                <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Hi, I'm Bhagya
                </h1>
                <p className="text-xl sm:text-2xl text-blue-400 mb-6 font-semibold">
                  Aspiring Security Engineer | Computer Science Undergraduate |
                  Tech Writer
                </p>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  I’m a computer science undergraduate at the University of
                  Jaffna with a passion for cybersecurity and secure systems. I
                  love building applications that solve real-world problems and
                  writing tech articles.
                </p>

                <div className="flex space-x-4 mb-8">
                  <a
                    href="https://github.com/bhagyasandakelum"
                    className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/50"
                  >
                    <Github size={24} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/bhagyaslive/"
                    className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/50"
                  >
                    <Linkedin size={24} />
                  </a>

                  <a
                    href="mailto:bhagyasandakelum02@gmail.com"
                    className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/50"
                  >
                    <Mail size={24} />
                  </a>
                </div>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                >
                  Download CV
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section
          id="education"
          className="min-h-screen flex items-center px-4 py-20 bg-gradient-to-b from-black to-blue-950/20"
        >
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <BookOpen className="inline-block mr-3 mb-2" size={40} />
              Education
            </h2>

            <div className="space-y-8">
              <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-6 hover:border-blue-600 transition-all">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  Bachelor's in Computer Science
                </h3>
                <p className="text-gray-300 mb-2">
                  University of Jaffna | 2023 - present
                </p>
                <p className="text-gray-400">
                  Focus on cybersecurity and software engineering.
                </p>
              </div>

              <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-6 hover:border-blue-600 transition-all">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  High School Diploma
                </h3>
                <p className="text-gray-300 mb-2">School Name | 2016 - 2018</p>
                <p className="text-gray-400">
                  Specialized in Mathematics and ICT.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATES */}
        <section
          id="certificates"
          className="min-h-screen flex items-center px-4 py-20"
        >
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <Award className="inline-block mr-3 mb-2" size={40} />
              Certificates
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  id: 1,
                  name: "Postman API Fundamentals Student Expert",
                  issuer: "Postman",
                  date: "Jun 5, 2024",
                },
                {
                  id: 2,
                  name: "Data Science Foundation",
                  issuer: "Great Learning",
                  date: "June 2023",
                },
                {
                  id: 3,
                  name: "SEO",
                  issuer: "Hubspot Academy",
                  date: "April 2024",
                },
              ].map((cert) => (
                <div
                  key={cert.id}
                  className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-6 hover:border-blue-600 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Award className="text-blue-400" size={32} />
                    <ExternalLink
                      className="text-gray-500 group-hover:text-blue-400 transition-colors"
                      size={20}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                  <p className="text-gray-400 mb-2">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">
                    Issued: {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        /* PROJECTS */
          <section
            id="projects"
            className="min-h-screen flex items-center px-4 py-20 bg-gradient-to-b from-black to-blue-950/20"
          >
            <div className="max-w-6xl mx-auto w-full">
              <h2 className="text-4xl font-bold mb-12 text-center">
                <Code className="inline-block mr-3 mb-2" size={40} />
                Projects
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
            {
              id: 1,
              name: "Lanka Blood Donate",
              description:
                "Helps connect blood donors with Sri Lankan blood banks. Includes donor eligibility, nearby centers, and real-time requests.",
              image: "/pr1.png",
              tags: ["React", "Ballerina", "PostgreSQL"],
              link: "https://github.com/PamudaUposath/iwb25-296-genalphaz",
            },
            {
              id: 2,
              name: "Student Attendance Management System",
              description:
                "Role-based dashboards for Admins, HODs, and Lecturers. Dynamic session creation and visual reports.",
              image: "/pr2.png",
              tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "AdminLTE"],
              link: "https://github.com/JanaRv0/SAMS",
            },
                ].map((project) => (
            <div
              key={project.id}
              className="bg-blue-900/20 border border-blue-800/50 rounded-xl overflow-hidden hover:border-blue-600 transition-all group"
            >
              <div className="h-48 bg-gradient-to-br from-blue-600/50 to-blue-900/50 flex items-center justify-center overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-900/50 rounded-full text-xs"
              >
                {tag}
              </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="text-blue-400 hover:text-blue-300 flex items-center"
                >
                  View Project <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section
            id="contact"
            className="min-h-screen flex items-center px-4 py-20 bg-gradient-to-b from-black to-blue-950/20"
          >
            <div className="max-w-3xl mx-auto w-full">
              <h2 className="text-4xl font-bold mb-12 text-center">
                <Mail className="inline-block mr-3 mb-2" size={40} />
                Get In Touch
              </h2>

              <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-8">
                <div className="space-y-6">
            {/* Contact info */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-400">
                Contact Information
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Mail className="text-blue-400 mr-4" size={24} />
                  <a
              href="mailto:bhagyasandakelum02@gmail.com"
              className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
              bhagyasandakelum02@gmail.com
                  </a>
                </div>

                <div className="flex items-center">
                  <FileText className="text-blue-400 mr-4" size={24} />
                  <span className="text-gray-300">+94 71 087 0119</span>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-400">
                Follow Me On
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/bhagyasandakelum"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  title="GitHub"
                >
                  <Github size={28} />
                </a>

                <a
                  href="https://www.linkedin.com/in/bhagyaslive/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={28} />
                </a>

                <a
                  href="https://www.facebook.com/bhagyaslive"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  title="Facebook"
                >
                  <svg
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 24 24"
                  >
              <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/bhagyaslive"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  title="Instagram"
                >
                  <svg
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 24 24"
                  >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/94710870119"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  title="WhatsApp"
                >
                  <svg
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 24 24"
                  >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M11.997 2a9.99 9.99 0 00-9.992 9.994c0 1.762.464 3.487 1.345 5.004L1.332 23l5.127-2.002a9.96 9.96 0 004.54 1.12h.004c5.52 0 9.994-4.478 9.994-9.994A9.99 9.99 0 0011.997 2z" />
                  </svg>
                </a>
              </div>
            </div>
                </div>
              </div>
            </div>
          </section>
              </div>
              <footer className="border-t border-blue-900/50 py-8 text-center text-gray-400">
        <p>© 2025 bhagyaslive. All rights reserved.</p>
      </footer>
            </div>
          );
        }
