import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, Code, User, Cpu, 
  ExternalLink, Mail, Send, Github, Linkedin, 
  Briefcase, Layout, Smartphone, Globe, Terminal, CheckCircle2,
  Instagram, MessageCircle 
} from 'lucide-react';
import logo from './assets/logo.png';
import masjid from './assets/masjid.jpeg';
import parcel from './assets/parcel.jpeg';
import jivanex from './assets/jivanex.png';

// Komponen Helper untuk Animasi Scroll
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Komponen Efek Ketik (Typewriter)
const Typewriter = ({ words, delay = 3000 }) => {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const index = count % words.length;
      const fullText = words[index];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && text === fullText) {
        setTypingSpeed(delay);
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCount(count + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, count, delay, typingSpeed, words]);

  return (
    <span className="inline-block min-h-[1em] border-r-4 border-blue-500 pr-1 animate-pulse bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
      {text}
    </span>
  );
};


// Komponen Circular Skills Graph
const CircularSkill = ({ percentage, title, index }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 group">
      <div className="relative w-32 h-32 transform transition-transform duration-300 group-hover:scale-110">
        <svg className="w-full h-full -rotate-90">
          {/* Background Circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-800"
          />
          {/* Progress Circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-blue-500 transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white transition-opacity duration-300 group-hover:opacity-100">{percentage}%</span>
        </div>
      </div>
      <h4 className="mt-4 text-center font-bold text-white tracking-wide">{title}</h4>
    </div>
  );
};

export default function App() {
  // --- State ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Effects ---
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Data ---
  const focusAreas = [
    {
      title: "Frontend Engineering",
      desc: "Spesialisasi dalam membangun aplikasi web modern menggunakan React ecosystem, dengan penekanan pada performa dan struktur kode yang rapi.",
      icon: <Code size={24} />
    },
    {
      title: "UI/UX Implementation",
      desc: "Menerjemahkan desain dari Figma menjadi kode yang presisi (pixel-perfect), memastikan pengalaman pengguna sesuai dengan visi desain.",
      icon: <Layout size={24} />
    },
    {
      title: "Interactive Web",
      desc: "Menambahkan sentuhan interaksi dan animasi yang halus untuk membuat website terasa lebih hidup dan menyenangkan digunakan.",
      icon: <Smartphone size={24} />
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Masjid Digital System",
      category: "Client Project",
      desc: "Membangun sistem digital untuk masjid dengan fitur donasi, jadwal sholat, dan informasi kegiatan masjid dan responsivitas mobile.",
      tech: ["PHP", "MySQL", "Bootstrap", "Laravel"],
      status: "Live Site",
      bgGradient: "bg-slate-800",
      image: masjid,
      url: "https://baitulukhuwah.or.id/" // Ganti dengan link project sebenarnya
    },
    {
      id: 2,
      title: "Parcel Ecommerce",
      category: "Client Project",
      desc: "Membuat website e-commerce untuk parcel yang menawarkan berbagai produk dan layanan dan terintegrasi dengan WhatsApp dan responsivitas mobile.",
      tech: ["React", "Tailwind", "Next.js"],
      status: "Live Site",
      bgGradient: "bg-indigo-900",
      image: parcel,
      url: "https://mamasha.id/" // Ganti dengan link project sebenarnya
    },
    {
      id: 3,
      title: "Jivanex Website",
      category: "Client Project",
      desc: "Implementasi desain landing page e-commerce system security dan responsivitas mobile.",
      tech: ["React", "Tailwind", "CSS"],
      status: "Live Site",
      bgGradient: "bg-slate-700",
      image: jivanex,
      url: "https://jivanex.com/" // Ganti dengan link project sebenarnya
    },
    {
      id: 4,
      title: "Project Baru",
      category: "Personal Project",
      desc: "Deskripsi singkat mengenai proyek ini.",
      tech: ["React", "Tailwind", "Next.js"],
      status: "Coming Soon",
      bgGradient: "bg-slate-800",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      url: "#"
    }
  ];

  const skills = [
    { name: "Frontend Architecture", level: 95 },
    { name: "React Ecosystem", level: 90 },
    { name: "UI/UX Design", level: 85 },
    { name: "Backend Basics", level: 60 },
  ];

  const navLinks = [
    { name: "Beranda", href: "#home" },
    { name: "Keahlian", href: "#expertise" },
    { name: "Portofolio", href: "#projects" },
    { name: "Tentang", href: "#about" },
  ];

  // --- Components ---
  
  return (
    <div className="min-h-screen font-sans transition-colors duration-700 bg-slate-950 text-slate-100">
      
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
        .glass {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        /* Grid Background Pattern */
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }

        /* Animasi Lembut untuk Background */
        @keyframes float {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(10px, -20px); }
          100% { transform: translate(0px, 0px); }
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float 12s ease-in-out infinite reverse;
        }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 py-6 ${
        mobileMenuOpen 
          ? 'bg-white dark:bg-slate-950 shadow-md' 
          : isScrolled 
            ? 'bg-white/90 dark:bg-slate-950/70 backdrop-blur-lg shadow-sm' 
            : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group z-50 relative">
            <span className={`text-xl font-bold tracking-tight ${mobileMenuOpen ? 'text-gray-900 dark:text-white' : ''}`}>nizar_abdul</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium opacity-80 hover:opacity-100 hover:text-blue-500 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="px-5 py-2 text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Kontak
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4 z-50 relative">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 transition-all duration-300 ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sliding Menu Panel */}
          <div className={`absolute top-0 left-0 w-full bg-slate-950 shadow-2xl transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="flex flex-col gap-6 p-8 pt-24">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2 mt-2 text-center font-medium bg-white text-slate-900 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Hubungi Saya
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0"></div>

            {/* Soft Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 animate-float-slow"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 animate-float-slower"></div>
            
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
              
              {/* Left Column: Text Content */}
              <div className="space-y-8">
                <RevealOnScroll>
                  <div className="space-y-6">
                    {/* Availability Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wide">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      AVAILABLE FOR PROJECTS
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-gray-900 dark:text-white">
                      Hi, Saya Nizar Abdul.<br/>
                      <Typewriter words={["Frontend Developer", "UI/UX Enthusiast", "React Specialist"]} />
                    </h1>
                    
                    <p className="text-lg text-slate-700 dark:text-slate-400 max-w-xl leading-relaxed">
                      Saya membangun antarmuka web modern yang fokus pada performa, aksesibilitas, dan pengalaman pengguna yang menyenangkan.
                    </p>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={200}>
                  <div className="flex flex-wrap gap-4">
                    <a href="#projects" className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                      Lihat Portofolio <ArrowRight size={18} />
                    </a>
                    <a href="#about" className="px-8 py-4 border border-slate-300 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300">
                      Tentang Saya
                    </a>
                  </div>
                </RevealOnScroll>
                
                {/* Bagian Statistik telah dihapus sepenuhnya */}
              </div>

              {/* Right Column: Code Editor Visual */}
              <div className="relative flex justify-center items-center">
                <RevealOnScroll delay={300}>
                  <div className="relative w-full max-w-lg group perspective-1000">
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                      
                      {/* Code Editor Window */}
                      <div className="relative bg-slate-900 rounded-xl shadow-2xl border border-slate-800 overflow-hidden transform transition-transform duration-500 hover:rotate-y-2 hover:rotate-x-2">
                          
                          {/* Editor Header */}
                          <div className="flex items-center px-4 py-3 bg-slate-950 border-b border-slate-800">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="ml-4 text-xs text-slate-500 font-mono flex items-center gap-2">
                              <Terminal size={12} />
                              portfolio.tsx
                            </div>
                          </div>

                          {/* Editor Content */}
                          <div className="p-6 overflow-hidden">
                            <div className="font-mono text-sm leading-relaxed text-slate-300">
                              <div>
                                <span className="text-purple-400">const</span> <span className="text-blue-400">Developer</span> = <span className="text-yellow-400">{`{`}</span>
                              </div>
                              <div className="pl-4">
                                name: <span className="text-green-400">'Nizar Abdul'</span>,
                              </div>
                              <div className="pl-4">
                                role: <span className="text-green-400">'Frontend Engineer'</span>,
                              </div>
                              <div className="pl-4">
                                skills: <span className="text-yellow-400">[</span>
                                <span className="text-green-400">'React'</span>, <span className="text-green-400">'Next.js'</span>, <span className="text-green-400">'TypeScript'</span>
                                <span className="text-yellow-400">]</span>,
                              </div>
                              <div className="pl-4">
                                hardWorker: <span className="text-blue-400">true</span>,
                              </div>
                              <div className="pl-4">
                                quickLearner: <span className="text-blue-400">true</span>,
                              </div>
                              <div className="pl-4">
                                hireable: <span className="text-blue-400">function</span>() <span className="text-yellow-400">{`{`}</span>
                              </div>
                              <div className="pl-8">
                                <span className="text-purple-400">return</span> <span className="text-blue-400">true</span>;
                              </div>
                              <div className="pl-4 text-yellow-400">{`}`}</div>
                              <div className="text-yellow-400">{`}`}</div>
                            </div>
                          </div>

                          {/* Floating Success Badge */}
                          <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur border border-slate-700 p-2 rounded-lg shadow-lg flex items-center gap-2 animate-bounce-slow">
                             <CheckCircle2 size={16} className="text-emerald-400" />
                             <span className="text-xs font-bold text-slate-200">No Errors Found</span>
                          </div>
                      </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
        </section>

        {/* Expertise Section (Formerly Services) */}
        <section id="expertise" className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <div className="max-w-xl">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Keahlian & Fokus</h2>
                      <p className="text-slate-700 dark:text-slate-400">Bidang-bidang yang saya dalami dan kuasai dalam pengembangan web.</p>
                  </div>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-8">
                {focusAreas.map((area, idx) => (
                  <RevealOnScroll key={idx} delay={idx * 150}>
                    <div className="bg-white dark:bg-slate-950 p-8 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-500 group h-full hover:shadow-xl hover:shadow-blue-500/5">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            {area.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{area.title}</h3>
                        <p className="text-slate-700 dark:text-slate-400 leading-relaxed text-sm">
                            {area.desc}
                        </p>
                    </div>
                  </RevealOnScroll>
                ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Portofolio Pilihan</h2>
                <p className="text-slate-700 dark:text-slate-400 max-w-2xl">
                  Beberapa proyek yang pernah saya kerjakan, baik untuk klien, hackathon, maupun proyek sampingan pribadi.
                </p>
              </div>
            </RevealOnScroll>

            <div className="space-y-24">
              {projects.map((project, index) => (
                <RevealOnScroll key={project.id} delay={100}>
                  <div className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Project Image Area */}
                    <div className="w-full md:w-1/2">
                      <div className={`aspect-video rounded-xl overflow-hidden shadow-2xl relative group`}>
                          {/* Background Image / Gradient */}
                          {project.image ? (
                              <img 
                                src={project.image} 
                                alt={project.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                          ) : (
                              <div className={`absolute inset-0 ${project.bgGradient} flex items-center justify-center`}>
                                 <span className="text-white/20 text-6xl font-black uppercase tracking-tighter">Project 0{project.id}</span>
                              </div>
                          )}
                          
                          {/* Overlay on hover/focus - Visible by default on mobile if needed, or stick to hover for simplicity with "group" */}
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-sm">
                              <a href={project.url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-transform duration-300">View Detail</a>
                              <button className="p-3 bg-transparent border border-white text-white rounded-full hover:bg-white/10 transition-colors duration-300">
                                  <Github size={20} />
                              </button>
                          </div>
                      </div>
                      {/* Mobile-only visible action buttons below image */}
                      <div className="flex md:hidden gap-3 mt-4">
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 bg-gray-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg text-sm text-center">View Detail</a>
                        <button className="p-2 border border-slate-300 dark:border-slate-700 rounded-lg">
                           <Github size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="w-full md:w-1/2 space-y-6">
                      <div className="flex items-center gap-3 text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          <span>{project.category}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                          <span className="text-slate-700 dark:text-slate-400 font-medium">{project.status}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="text-slate-700 dark:text-slate-400 leading-relaxed text-lg">
                        {project.desc}
                      </p>
                      
                      <div className="border-l-2 border-gray-200 dark:border-slate-800 pl-6 py-2 space-y-2">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white">Tech Stack:</h4>
                          <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                              <span key={t} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300 cursor-default">
                              {t}
                              </span>
                          ))}
                          </div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* About / Skills Compact */}
        <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute left-0 bottom-0 w-96 h-96 bg-indigo-600 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <RevealOnScroll>
                  <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Tentang Saya</h2>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed max-w-2xl mx-auto">
                      Saya adalah pengembang web yang antusias terhadap detail visual dan kode yang efisien. Saya selalu tertarik untuk mempelajari teknologi frontend terbaru dan menerapkannya dalam proyek nyata.
                  </p>

                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Social Media</h3>
                  <div className="flex justify-center gap-6 mb-12 flex-wrap">
                      {[
                          { name: "LinkedIn", href: "https://www.linkedin.com/in/nizar-brehooh-2a7026342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", color: "hover:text-blue-400 hover:border-blue-400" },
                          { name: "Instagram", href: "https://www.instagram.com/kripikbont_eng?igsh=OW0zaHRlaHVlZzE5l", color: "hover:text-pink-500 hover:border-pink-500" },
                          { name: "TikTok", href: "https://www.tiktok.com/@apa_aja_bol3?_r=1&_t=ZS-93spvKB1PS0", color: "hover:text-pink-400 hover:border-pink-400" },
                      ].map((social, idx) => (
                          <a
                              key={idx}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`px-6 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-400 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-800 ${social.color}`}
                          >
                              {social.name}
                          </a>
                      ))}
                  </div>
                </RevealOnScroll>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-12 pb-12">
                    {skills.map((skill, idx) => (
                        <RevealOnScroll key={skill.name} delay={idx * 150}>
                            <CircularSkill percentage={skill.level} title={skill.name} index={idx} />
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Siap Berkolaborasi?</h2>
              <p className="text-lg text-slate-700 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                Ingin mengubah ide menjadi produk digital yang inovatif? Saya siap membantu mewujudkan visi Anda dengan solusi teknologi modern yang handal. Mari diskusikan kebutuhan proyek Anda.
              </p>
              
              <a 
                href="mailto:nizarbrehooh@gmail.com" 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white font-bold rounded-lg text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-600/20 w-full md:w-auto"
              >
                <Mail size={20} />
                Kirim Pesan
              </a>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">nizar_abdul</span>
                  </div>
                  
                      <div className="flex gap-6">
                          {[
                              { icon: <Github size={20} />, label: "Github", href: "https://github.com/nizarbrehooh-prog" },
                              { icon: <Send size={20} />, label: "Telegram", href: "https://t.me/nzrabdl" },
                          ].map((social) => (
                              <a 
                                key={social.label} 
                                href={social.href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-300 hover:-translate-y-1 transform display-block"
                              >
                                  {social.icon}
                              </a>
                          ))}
                      </div>

                  <p className="text-slate-700 dark:text-slate-500 text-sm">
                      © {new Date().getFullYear()} nizar_abdul. All rights reserved.
                  </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </div>
  );
}
