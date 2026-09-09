import React from 'react';
import { HomepageFragment } from './components/HomepageFragment';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
        <span className="font-extrabold text-slate-900">
          Homepage UI Fragment Harness
        </span>
        <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
          Port 5174
        </span>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <HomepageFragment
          onCategorySelect={(cat) => alert(`Selected category: ${cat}`)}
          onClearanceSelect={(val) => alert(`Selected clearance: ${val} cm`)}
        />
      </main>
    </div>
  );
};

export default App;

