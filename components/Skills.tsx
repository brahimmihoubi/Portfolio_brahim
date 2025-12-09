import React from 'react';
import SectionContainer from './SectionContainer';
import { SKILL_CATEGORIES } from '../constants';

const Skills: React.FC = () => {
  return (
    <SectionContainer id="skills" className="bg-dark/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          My <span className="text-primary">Skills</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A collection of technical and professional skills I've cultivated over my career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.title} className="bg-card p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              {category.title}
            </h3>
            
            <div className="space-y-6">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-slate-200 font-medium">
                      <span className="text-primary">{skill.icon}</span>
                      {skill.name}
                    </div>
                    <span className="text-slate-500 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Skills;