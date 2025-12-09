import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number; // 0 to 100
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Achievement {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon?: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}