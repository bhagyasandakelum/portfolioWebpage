import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Award, BookOpen, Code, User, FileText } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'about', label: 'About', icon: User },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-blue-900/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              bhagyaslive
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-blue-900/30 hover:text-white'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-900/30"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-blue-900/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-blue-900/30'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left side - Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center overflow-hidden border-4 border-blue-500/50 shadow-2xl shadow-blue-500/50">
                    {/* Replace this div with your actual image */}
                    <img 
                      src="https://via.placeholder.com/400x400/1e3a8a/60a5fa?text=Your+Photo" 
                      alt="bhagyaslive"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -z-10 top-4 left-4 w-80 h-80 rounded-2xl bg-blue-600/30 blur-xl"></div>
                </div>
              </div>

              {/* Right side - Introduction */}
              <div className="text-left">
                <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Hi, I'm Bhagya
                </h1>
                <p className="text-xl sm:text-2xl text-blue-400 mb-6 font-semibold">
                  Aspiring Security Engineer | Computer Science Undergraduate | Tech Writer
                </p>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  I’m a computer science undergraduate at the University of Jaffna with a strong passion for cybersecurity and building secure systems. I love creating applications that solve real-world problems and writing articles about computer science and security. Always learning, always building.
                </p>
                
                <div className="flex space-x-4 mb-8">
                  <a href="https://github.com/bhagyasandakelum" className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/50">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/bhagyaslive/" className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/50">
                    <Linkedin size={24} />
                  </a>
                  <a href="bhagyasandakelum02@gmail.com" className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/50">
                    <Mail size={24} />
                  </a>
                </div>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                >
                  Downlaod CV
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen flex items-center px-4 py-20 bg-gradient-to-b from-black to-blue-950/20">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <BookOpen className="inline-block mr-3 mb-2" size={40} />
              Education
            </h2>
            <div className="space-y-8">
              <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-6 hover:border-blue-600 transition-all">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">Bachelor's in Computer Science</h3>
                <p className="text-gray-300 mb-2">University Name | 2018 - 2022</p>
                <p className="text-gray-400">
                  Focused on software engineering, algorithms, and web development. Graduated with honors.
                </p>
              </div>
              <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-6 hover:border-blue-600 transition-all">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">High School Diploma</h3>
                <p className="text-gray-300 mb-2">School Name | 2016 - 2018</p>
                <p className="text-gray-400">
                  Specialized in Mathematics and Computer Science.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <Award className="inline-block mr-3 mb-2" size={40} />
              Certificates
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-6 hover:border-blue-600 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <Award className="text-blue-400" size={32} />
                    <ExternalLink className="text-gray-500 group-hover:text-blue-400 transition-colors" size={20} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Certificate Title {i}</h3>
                  <p className="text-gray-400 mb-2">Issuing Organization</p>
                  <p className="text-sm text-gray-500">Issued: Jan 2024</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center px-4 py-20 bg-gradient-to-b from-black to-blue-950/20">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <Code className="inline-block mr-3 mb-2" size={40} />
              Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-blue-900/20 border border-blue-800/50 rounded-xl overflow-hidden hover:border-blue-600 transition-all group">
                  <div className="h-48 bg-gradient-to-br from-blue-600/50 to-blue-900/50 flex items-center justify-center">
                    <Code size={48} className="text-blue-200" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      Project Name {i}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Brief description of the project and technologies used.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs">React</span>
                      <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs">Node.js</span>
                    </div>
                    <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center">
                      View Project <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <FileText className="inline-block mr-3 mb-2" size={40} />
              Blog
            </h2>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-6 hover:border-blue-600 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        Blog Post Title {i}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        This is a preview of the blog post content. It gives readers an idea of what the article is about...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Jan 15, 2024 • 5 min read</span>
                        <span className="text-blue-400 flex items-center">
                          Read More <ExternalLink size={16} className="ml-2" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center px-4 py-20 bg-gradient-to-b from-black to-blue-950/20">
          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <Mail className="inline-block mr-3 mb-2" size={40} />
              Get In Touch
            </h2>
            <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black border border-blue-800/50 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-black border border-blue-800/50 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 bg-black border border-blue-800/50 rounded-lg focus:border-blue-600 focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Message sent! (This is a demo)');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-blue-900/50 py-8 text-center text-gray-400">
        <p>© 2024 bhagyaslive. All rights reserved.</p>
      </footer>
    </div>
  );
}