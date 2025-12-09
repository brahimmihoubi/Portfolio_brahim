import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-darker overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      
      <footer className="bg-dark py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} DevPortfolio. All rights reserved.</p>
        <p className="mt-2">Built with React & Tailwind CSS</p>
      </footer>
      {/* Chatbot floating widget */}
      <div className="fixed right-6 bottom-6 z-50 w-96">
        <Chatbot />
      </div>
    </div>
  );
}

export default App;