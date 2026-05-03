import React, { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { ChallengeArea } from './pages/ChallengeArea';
import { FrameworksList } from './pages/FrameworksList';
import { CaseStudiesList } from './pages/CaseStudiesList';
import { useStore } from './store/useStore';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'daily' | 'frameworks' | 'case-studies'>('dashboard');
  const { streak } = useStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
      <header className="h-16 border-b border-slate-800 flex items-center px-4 sm:px-6 lg:px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-slate-950 text-xl">
              P
            </div>
            <span className="text-xl font-bold tracking-tight text-white">PM<span className="text-cyan-400">Trainer</span></span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <span className="text-orange-400 text-sm">🔥</span>
              <span className="text-sm font-semibold">{streak} Day Streak</span>
            </div>
            <span className="text-sm font-medium text-slate-400 hover:text-slate-200 cursor-pointer transition-colors" onClick={() => setCurrentView('case-studies')}>Case Studies</span>
            <span className="text-sm font-medium text-slate-400 hover:text-slate-200 cursor-pointer transition-colors" onClick={() => setCurrentView('frameworks')}>Frameworks</span>
            <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 p-0.5 hidden sm:block">
              <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center text-xs">JD</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col">
        {currentView === 'dashboard' && <Dashboard onCompleteAction={setCurrentView} />}
        {currentView === 'daily' && <ChallengeArea onBack={() => setCurrentView('dashboard')} />}
        {currentView === 'frameworks' && <FrameworksList onBack={() => setCurrentView('dashboard')} />}
        {currentView === 'case-studies' && <CaseStudiesList onBack={() => setCurrentView('dashboard')} />}
      </main>
      
      <footer className="border-t border-slate-800 bg-slate-950 p-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 italic">
          The Gym for Product Managers
        </div>
      </footer>
    </div>
  );
}

