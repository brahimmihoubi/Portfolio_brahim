import React from 'react';
import SectionContainer from './SectionContainer';
import { ACHIEVEMENTS } from '../constants';

const Achievements: React.FC = () => {
  return (
    <SectionContainer id="achievements" className="bg-dark/50">
       <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className="text-primary">Achievements</span> & Certifications
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Recognition of my dedication to continuous learning and excellence in the field.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {ACHIEVEMENTS.map((item, index) => (
          <div key={item.id} className="relative pl-8 sm:pl-32 py-6 group">
            {/* Timeline Line */}
            <div className="hidden sm:flex flex-col items-end absolute left-0 top-6 w-24 pr-8">
               <span className="text-lg font-bold text-primary">{item.date}</span>
            </div>
            
            {/* Timeline Dot & Line */}
            <div className="absolute left-0 sm:left-24 top-0 bottom-0 w-px bg-slate-800 group-last:bottom-auto group-last:h-10"></div>
            <div className="absolute left-[-5px] sm:left-[91px] top-8 w-3 h-3 rounded-full bg-primary border-4 border-darker shadow-[0_0_0_4px_rgba(14,165,233,0.2)]"></div>

            {/* Mobile Date */}
            <div className="sm:hidden mb-2">
               <span className="inline-block px-2 py-1 bg-slate-800 text-primary text-xs rounded font-bold">{item.date}</span>
            </div>

            {/* Content Card */}
            <div className="bg-card p-6 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-primary text-sm mb-2">{item.issuer}</p>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Achievements;