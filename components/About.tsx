import React from 'react';
import SectionContainer from './SectionContainer';
import { ABOUT_TEXT } from '../constants';

const About: React.FC = () => {
  return (
    <SectionContainer id="about" className="bg-darker">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
            {ABOUT_TEXT.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-8 flex gap-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">2+</h3>
              <p className="text-sm text-slate-500 mt-1">Years Experience</p>
            </div>
            <div className="w-px bg-slate-800 h-12 mx-4" />
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">20+</h3>
              <p className="text-sm text-slate-500 mt-1">Projects Completed</p>
            </div>
            <div className="w-px bg-slate-800 h-12 mx-4" />
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">3+</h3>
              <p className="text-sm text-slate-500 mt-1">Happy Clients</p>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 flex justify-center">
          {/* Adjusted container for portrait aspect ratio */}
          <div className="relative w-72 md:w-80 aspect-[3/4]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-600 rounded-2xl rotate-6 opacity-60 blur-lg"></div>
            <img 
              src="/brahim.jpeg" 
              alt="Brahim Mihoubi" 
              className="relative w-full h-full object-cover rounded-2xl border-4 border-slate-800 shadow-2xl z-10"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default About;