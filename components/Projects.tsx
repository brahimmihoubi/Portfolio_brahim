import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import SectionContainer from './SectionContainer';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <SectionContainer id="projects" className="bg-darker">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Here are some of the key projects I've worked on. Each one presented its own unique challenges and learning opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.id} className="group bg-card rounded-xl overflow-hidden border border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl} 
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    className="flex items-center gap-2 text-sm text-primary hover:text-sky-400 transition-colors ml-auto"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Projects;