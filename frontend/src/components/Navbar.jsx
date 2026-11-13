import React from 'react';
import { GraduationCap, BarChart3, BrainCircuit, UserCheck, Sparkles, Database } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, totalStudents }) {
  const navItems = [
    { id: 'overview', label: 'Cohort Overview', icon: BarChart3, desc: 'Dataset stats & distributions' },
    { id: 'insights', label: 'ML Insights & Models', icon: BrainCircuit, desc: 'Clustering, metrics & benchmark' },
    { id: 'prediction', label: 'Student Prediction', icon: UserCheck, desc: 'Trained model inference' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-warm-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-forest-800 text-white flex items-center justify-center shadow-md shadow-forest-900/15">
              <GraduationCap className="w-6 h-6 text-forest-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-forest-900">EduTrack <span className="text-forest-600">AI</span></span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 border border-forest-300/60">
                  ML Academic Suite
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">Student Performance Analysis & Early Warning System</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex space-x-1.5 p-1.5 bg-warm-100 rounded-xl border border-warm-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-forest-800 text-white shadow-sm shadow-forest-900/20'
                      : 'text-stone-600 hover:text-forest-900 hover:bg-white/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-forest-300' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Dataset Status */}
          <div className="hidden lg:flex items-center space-x-3 pl-3 border-l border-warm-200 text-xs">
            <div className="flex items-center space-x-1.5 text-stone-600 bg-warm-50 px-3 py-1.5 rounded-lg border border-warm-200">
              <Database className="w-3.5 h-3.5 text-forest-600" />
              <span className="font-semibold text-stone-700">{totalStudents?.toLocaleString() || '14,003'}</span>
              <span className="text-stone-400">students</span>
            </div>
            <div className="flex items-center space-x-1.5 text-forest-800 bg-forest-50 px-2.5 py-1.5 rounded-lg border border-forest-200">
              <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse"></span>
              <span className="font-semibold">RF 92.4% Acc</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
