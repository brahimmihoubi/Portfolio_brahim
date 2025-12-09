import React from 'react';

/**
 * Fallback icon components used when 'lucide-react' is not installed.
 * These simple placeholders preserve the JSX usage and allow className styling.
 */
const Code = (props: any) => <span {...props} />;
const Database = (props: any) => <span {...props} />;
const Layout = (props: any) => <span {...props} />;
const Server = (props: any) => <span {...props} />;
const Smartphone = (props: any) => <span {...props} />;
const Terminal = (props: any) => <span {...props} />;
const Award = (props: any) => <span {...props} />;
const BookOpen = (props: any) => <span {...props} />;
const Cpu = (props: any) => <span {...props} />;
const Globe = (props: any) => <span {...props} />;
const Zap = (props: any) => <span {...props} />;
const Users = (props: any) => <span {...props} />;

import { Project, SkillCategory, Achievement, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Hard Skills",
    skills: [
      { name: "Flutter & Mobile Development", icon: <Layout className="w-5 h-5" />, level: 95 },
      { name: "Spring Boot & Backend", icon: <Server className="w-5 h-5" />, level: 50 },
      { name: "React & TypeScript", icon: <Database className="w-5 h-5" />, level: 80 },
      { name: "UI/UX Design", icon: <Globe className="w-5 h-5" />, level: 75 },
      { name: "Operating Systems", icon: <Cpu className="w-5 h-5" />, level: 80 },
    ]
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Problem Solving", icon: <Zap className="w-5 h-5" />, level: 95 },
      { name: "Team Leadership", icon: <Users className="w-5 h-5" />, level: 90 },
      { name: "Communication", icon: <BookOpen className="w-5 h-5" />, level: 90 },
      { name: "Agile Methodology", icon: <Terminal className="w-5 h-5" />, level: 85 },
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization, inventory management, and sales forecasting using AI models.",
    technologies: ["React", "TypeScript", "Tailwind", "D3.js", "Node.js"],
    imageUrl: "https://picsum.photos/600/400?random=1",
    repoUrl: "#",
    demoUrl: "#"
  },
  {
    id: 2,
    title: "Social Connect App",
    description: "A mobile-first social networking application focusing on local community building. Features include real-time chat, geolocation events, and user verification.",
    technologies: ["React Native", "Firebase", "Redux", "Google Maps API"],
    imageUrl: "https://picsum.photos/600/400?random=2",
    repoUrl: "#"
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "A SaaS platform helping marketers generate SEO-optimized blog posts. Integrated with Gemini API for high-quality text generation and image suggestions.",
    technologies: ["Next.js", "Gemini API", "Stripe", "PostgreSQL"],
    imageUrl: "https://picsum.photos/600/400?random=3",
    demoUrl: "#"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Best Open Source Contributor",
    issuer: "GitHub Innovation Awards",
    date: "2023",
    description: "Recognized for significant contributions to core web infrastructure libraries used by thousands of developers.",
    icon: <Award className="w-6 h-6 text-yellow-400" />
  },
  {
    id: 2,
    title: "Certified Cloud Architect",
    issuer: "Google Cloud",
    date: "2022",
    description: "Achieved professional certification demonstrating advanced skills in designing distributed systems.",
    icon: <Code className="w-6 h-6 text-primary" />
  },
  {
    id: 3,
    title: "Hackathon Winner - FinTech",
    issuer: "Global Tech Summit",
    date: "2021",
    description: "Led a team of 4 to build a blockchain-based remittance solution in 48 hours.",
    icon: <Award className="w-6 h-6 text-yellow-400" />
  }
];

export const ABOUT_TEXT = `Hello! I'm Brahim, a passionate software engineer with a bachelor's degree, currently pursuing a master's in information systems engineering. 
I specialize in Android development using Flutter and have over two years of experience with Linux OS. 
Besides technical skills, I have expertise in social media management, coaching, leadership, software project management, and event organization. 
I enjoy blending my technical knowledge with strong organizational and leadership skills to deliver effective and impactful solutions.`;