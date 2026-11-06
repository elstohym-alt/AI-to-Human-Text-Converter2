import React from 'react';
import { Sparkles, ShieldCheck, History, Globe, CheckCircle2, Zap } from 'lucide-react';

interface HeaderProps {
  currentLang: 'ar' | 'en';
  onToggleLang: (lang: 'ar' | 'en') => void;
  onOpenHistory: () => void;
  historyCount: number;
  onScrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  onOpenHistory,
  historyCount,
  onScrollToSection,
}) => {
  const isAr = currentLang === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                AI to Human
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                ZeroGPT 0%
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {isAr ? 'محول نصوص الذكاء الاصطناعي إلى نصوص بشرية 100%' : 'Undetectable AI Text Bypass Engine'}
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={() => onScrollToSection('workbench')}
            className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 text-indigo-500" />
            {isAr ? 'أداة التحويل' : 'Converter'}
          </button>
          <button
            onClick={() => onScrollToSection('why-zerogpt')}
            className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            {isAr ? 'تخطي ZeroGPT' : 'ZeroGPT Bypass'}
          </button>
          <button
            onClick={() => onScrollToSection('how-it-works')}
            className="hover:text-indigo-600 transition-colors"
          >
            {isAr ? 'كيف يعمل؟' : 'How It Works'}
          </button>
          <button
            onClick={() => onScrollToSection('faq')}
            className="hover:text-indigo-600 transition-colors"
          >
            {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* History Drawer Button */}
          <button
            onClick={onOpenHistory}
            className="relative p-2 sm:px-3 sm:py-2 text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors border border-slate-200"
            title={isAr ? 'سجل التحويلات' : 'Conversion History'}
          >
            <History className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">{isAr ? 'السجل' : 'History'}</span>
            {historyCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs font-bold px-1.5 py-0.2 rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => onToggleLang('ar')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                isAr
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => onToggleLang('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                !isAr
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
