import React, { useState } from 'react';
import { HomepageFragment } from './components/HomepageFragment';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export const App: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((prev) => (prev === msg ? null : prev)), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-slate-900 tracking-tight">
            Homepage UI Fragment Harness
          </span>
          <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-semibold">
            Standalone Mode (Port 5174)
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
            <ShoppingBag className="w-4 h-4 text-amber-800" />
            <span>Bag: {cartCount} items</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
        <HomepageFragment
          onCategorySelect={(cat) => showToast(`Category clicked: ${cat}`)}
          onClearanceSelect={(val) => showToast(`Clearance filter updated: ≤ ${val} cm`)}
          onProductSelect={(prodId) => showToast(`Product inspect clicked: ${prodId}`)}
          onAddToCart={(prod) => {
            setCartCount((c) => c + 1);
            showToast(`Added "${prod.name || prod.title || prod.id}" to cart!`);
          }}
        />
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-2 p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

