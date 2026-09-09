import React, { useEffect, useState } from 'react';
import { ArrowRight, Ruler, Sparkles } from 'lucide-react';
import { fetchHomepageData } from '../api';
import { HomepageContent } from '../types';

interface HomepageFragmentProps {
  onCategorySelect?: (categorySlug: string) => void;
  onClearanceSelect?: (clearanceCm: number) => void;
}

export const HomepageFragment: React.FC<HomepageFragmentProps> = ({
  onCategorySelect,
  onClearanceSelect,
}) => {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [clearanceInput, setClearanceInput] = useState<string>('45');

  useEffect(() => {
    async function load() {
      const data = await fetchHomepageData();
      setContent(data);
    }
    load();
  }, []);

  if (!content) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[480px] flex items-center shadow-xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${content.hero.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative max-w-2xl px-6 sm:px-12 py-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Contentful Dynamic Landing Hero</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {content.hero.headline}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            {content.hero.subheadline}
          </p>

          {/* Spatial Qualifier Bar */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-lg space-y-3">
            <div className="flex items-center justify-between text-xs font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-indigo-400" />
                {content.hero.spatialHook.title}
              </span>
              <span className="text-[11px] text-indigo-300">Quick Filter</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-2 rounded-xl border border-white/10 text-white text-xs">
                <span>Height:</span>
                <input
                  type="number"
                  value={clearanceInput}
                  onChange={(e) => setClearanceInput(e.target.value)}
                  className="w-12 bg-transparent text-indigo-400 font-bold focus:outline-none text-right"
                  min="30"
                  max="70"
                />
                <span className="text-slate-400">cm</span>
              </div>

              <button
                type="button"
                onClick={() => onClearanceSelect?.(parseFloat(clearanceInput) || 45)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Shop My Kitchen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Curated Kitchen Categories
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Shop by Appliance Type
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {content.featuredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onCategorySelect?.(cat.slug)}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="h-44 overflow-hidden bg-slate-100 relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-3 text-xs font-semibold text-indigo-600 flex items-center gap-1">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-900 text-white rounded-3xl py-12 px-6 sm:px-12">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Powered by CounterCheck Spatial AI
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold">How Kitchen Fitment Works</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Eliminating dimensional guesswork and post-purchase returns before checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.howItWorks.map((step) => (
            <div
              key={step.step}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 relative"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                {step.step}
              </div>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

