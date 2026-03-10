import React, { FormEvent, useEffect, useState } from 'react';
import {
  ChevronDown,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'platforms', label: 'Products' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const platforms = [
  {
    title: 'MyKrida - Sports Technology Platform',
    role: 'Founder',
    summary:
      'Platform helping athletes discover opportunities, track performance, and connect with the sports ecosystem.',
    features: ['Athlete profiles', 'Performance analytics', 'AI recommendations', 'Sports event ecosystem'],
    tech: ['React Native', 'Python ML', 'Node.js'],
  },
  {
    title: 'ORIN - Career Mentorship Platform',
    role: 'Technical Head and Development Lead',
    summary: 'Career growth platform connecting students and mentors with AI-powered career tools.',
    features: ['Mentor discovery', 'Booking system', 'Community feed', 'AI career tools'],
    tech: ['React Native', 'Firebase'],
  },
  {
    title: 'Idea Hub',
    role: 'Co-Founder',
    summary: 'Startup idea collaboration platform where innovators share ideas and build MVP products.',
    features: ['Idea to MVP execution', 'Startup product building', 'Collaboration network'],
    tech: ['Community operations', 'Product strategy'],
  },
  {
    title: 'Digital Orbit',
    role: 'Founder Team',
    summary: 'Freelance development team building digital products and startup solutions.',
    features: ['Startup MVP development', 'Portfolio websites', 'Landing pages', 'Digital product development'],
    tech: ['React', 'React Native', 'Firebase', 'Node.js'],
  },
];

const projects = [
  {
    title: 'Hand Gesture Controlled Snake Game',
    description: 'Computer vision game controlled using finger gestures for real-time gameplay interaction.',
    tech: ['Python', 'OpenCV', 'MediaPipe'],
    github: 'https://github.com/Raju809635',
  },
  {
    title: 'Face Controlled Game',
    description: 'Real-time computer vision game controlled using face movement with webcam tracking.',
    tech: ['Python', 'OpenCV'],
    github: 'https://github.com/Raju809635',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const current = navItems.find((section) => {
        const element = document.getElementById(section.id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const message = formData.get('message')?.toString().trim() ?? '';
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Website Visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:rbomma074@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen text-slate-100">
      <div className="hero-grid fixed inset-0 -z-10" />
      <div className="fixed -z-10 left-[-10rem] top-[-10rem] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="fixed -z-10 right-[-12rem] top-[30%] h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'nav-blur border-b border-slate-100/10' : ''
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button onClick={() => scrollToSection('home')} className="text-lg font-semibold tracking-tight text-slate-100">
            Raju Bomma
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm transition-colors ${
                  activeSection === item.id ? 'text-cyan-300' : 'text-slate-300 hover:text-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen((prev) => !prev)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mx-4 mb-3 rounded-2xl border border-slate-100/10 bg-slate-900/90 p-4 backdrop-blur md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full rounded-lg px-3 py-2 text-left text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main>
        <section id="home" className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 pt-24 sm:px-6">
          <div className="grid w-full gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="reveal">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-200">
                <Sparkles size={14} />
                Hyderabad, India
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-slate-50 sm:text-6xl">
                Raju Bomma
                <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-slate-100 to-orange-300 bg-clip-text text-2xl text-transparent sm:text-4xl">
                  Building AI products, apps, and digital platforms.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                AI developer and product builder focused on creating innovative technology platforms and startup products.
                I ship practical solutions across AI, app development, and digital ecosystems.
              </p>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
                AI Developer | Product Builder | Founder - MyKrida | Technical Head - ORIN | Co-Founder - Idea Hub |
                Digital Orbit
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button onClick={() => scrollToSection('projects')} className="btn-primary">
                  View Projects
                </button>
                <a className="btn-secondary" href="https://github.com/Raju809635" target="_blank" rel="noreferrer">
                  <Github size={16} />
                  GitHub
                </a>
                <button onClick={() => scrollToSection('contact')} className="btn-secondary">
                  Contact
                </button>
              </div>
            </div>

            <div className="reveal self-center rounded-3xl border border-slate-100/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur">
              <img src="/raju.jpg" alt="Raju Bomma" className="mb-5 h-28 w-28 rounded-2xl object-cover" />
              <h2 className="text-xl font-semibold text-slate-100">Founder Profile</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Product-minded developer building startup-ready technology from concept to MVP and beyond.
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p className="rounded-xl border border-slate-100/10 bg-slate-800/60 px-3 py-2">Primary Focus: AI + Product Engineering</p>
                <p className="rounded-xl border border-slate-100/10 bg-slate-800/60 px-3 py-2">Operating Model: Build, test, ship, iterate</p>
                <p className="rounded-xl border border-slate-100/10 bg-slate-800/60 px-3 py-2">Current Region: Hyderabad, India</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan-300/80 transition hover:text-cyan-200"
            aria-label="Scroll to About"
          >
            <ChevronDown className="animate-bounce" />
          </button>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="reveal glass-card p-8 sm:p-10">
            <p className="section-kicker">About</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-100 sm:text-4xl">Founder-led engineering approach.</h2>
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-slate-300 sm:text-lg">
              AI developer and product builder passionate about creating impactful technology platforms. Focused on AI
              applications, digital products, and startup ecosystems. Experienced in building apps, computer vision
              systems, and scalable platforms that solve real user problems.
            </p>
          </div>
        </section>

        <section id="platforms" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-10 reveal">
            <p className="section-kicker">Products and Platforms</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-100 sm:text-4xl">Startups and product systems in progress.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {platforms.map((platform, index) => (
              <article key={platform.title} className="reveal glass-card card-hover p-6" style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-slate-100">{platform.title}</h3>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                    {platform.role}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{platform.summary}</p>
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Focus</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {platform.features.map((feature) => (
                      <span key={feature} className="rounded-lg border border-slate-100/10 bg-slate-800/70 px-2.5 py-1 text-xs text-slate-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Tech</p>
                  <p className="mt-1 text-sm text-slate-300">{platform.tech.join(' | ')}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 reveal">
            <p className="section-kicker">Projects</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-100 sm:text-4xl">Computer vision prototypes shipped end-to-end.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <article key={project.title} className="reveal glass-card card-hover p-6" style={{ transitionDelay: `${index * 80}ms` }}>
                <h3 className="text-xl font-semibold text-slate-100">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tool) => (
                    <span key={tool} className="rounded-md border border-orange-200/20 bg-orange-200/10 px-2.5 py-1 text-xs text-orange-100">
                      {tool}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200"
                >
                  View on GitHub
                  <ExternalLink size={14} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="reveal glass-card p-7">
              <p className="section-kicker">Skills</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-100">AI and Development</h3>
              <ul className="mt-5 space-y-2 text-slate-300">
                <li>Python</li>
                <li>Java</li>
                <li>AI/ML</li>
                <li>Computer Vision</li>
              </ul>
            </div>
            <div className="reveal glass-card p-7">
              <p className="section-kicker">Tooling</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-100">Development Stack</h3>
              <ul className="mt-5 space-y-2 text-slate-300">
                <li>React Native</li>
                <li>Firebase</li>
                <li>OpenCV</li>
                <li>MediaPipe</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="reveal glass-card p-7">
              <p className="section-kicker">Contact</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-100">Let us build something useful.</h2>
              <div className="mt-7 space-y-4 text-sm">
                <a href="mailto:rbomma074@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-white">
                  <Mail size={16} />
                  rbomma074@gmail.com
                </a>
                <a href="https://github.com/Raju809635" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white">
                  <Github size={16} />
                  github.com/Raju809635
                </a>
                <a
                  href="https://www.linkedin.com/in/raju-bomma-038936340"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-white"
                >
                  <Linkedin size={16} />
                  linkedin.com/in/raju-bomma-038936340
                </a>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="reveal glass-card p-7">
              <p className="section-kicker">Send Message</p>
              <div className="mt-6 grid gap-4">
                <input
                  required
                  name="name"
                  placeholder="Your Name"
                  className="rounded-xl border border-slate-100/10 bg-slate-800/80 px-4 py-3 text-sm text-slate-100 outline-none ring-cyan-300 transition focus:ring"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="rounded-xl border border-slate-100/10 bg-slate-800/80 px-4 py-3 text-sm text-slate-100 outline-none ring-cyan-300 transition focus:ring"
                />
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project, platform, or startup idea."
                  className="rounded-xl border border-slate-100/10 bg-slate-800/80 px-4 py-3 text-sm text-slate-100 outline-none ring-cyan-300 transition focus:ring"
                />
                <button type="submit" className="btn-primary mt-1 w-fit">
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-6 max-w-6xl px-4 pb-10 text-center text-sm text-slate-500 sm:px-6">
        <p>Copyright 2026 Raju Bomma. Founder portfolio and product engineering profile.</p>
      </footer>
    </div>
  );
}

export default App;
