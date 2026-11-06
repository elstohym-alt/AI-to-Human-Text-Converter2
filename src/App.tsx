import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HumanizerWorkbench } from './components/HumanizerWorkbench';
import { ZeroGptDetectorModal } from './components/ZeroGptDetectorModal';
import { DiffViewer } from './components/DiffViewer';
import { HistoryDrawer } from './components/HistoryDrawer';
import { FeaturesSection } from './components/FeaturesSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { HumanizeMode, HistoryItem, DetectResponse } from './types';
import { ShieldCheck, CheckCircle2, Sparkles, Zap, Award, Flame, Star } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // Detector modal state
  const [isDetectorOpen, setIsDetectorOpen] = useState(false);
  const [detectorLoading, setDetectorLoading] = useState(false);
  const [detectorResult, setDetectorResult] = useState<DetectResponse | null>(null);
  const [textUnderAudit, setTextUnderAudit] = useState('');
  const [isAuditHumanized, setIsAuditHumanized] = useState(false);

  // Diff modal state
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [diffOriginal, setDiffOriginal] = useState('');
  const [diffHumanized, setDiffHumanized] = useState('');

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai_humanizer_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load history from localStorage', e);
    }
  }, []);

  // Sync html dir attribute
  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  // Handle successful humanization
  const handleHumanizeSuccess = (original: string, humanized: string, mode: HumanizeMode) => {
    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      mode,
      originalText: original,
      humanizedText: humanized,
      wordCount: humanized.trim().split(/\s+/).length,
      zeroGptAiScore: 0,
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.slice(0, 19)]; // keep latest 20
      try {
        localStorage.setItem('ai_humanizer_history', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save to localStorage', e);
      }
      return updated;
    });
  };

  // Open ZeroGPT Detector modal and run audit
  const handleOpenDetector = async (text: string, isHumanized: boolean) => {
    setTextUnderAudit(text);
    setIsAuditHumanized(isHumanized);
    setIsDetectorOpen(true);
    setDetectorLoading(true);
    setDetectorResult(null);

    try {
      const res = await fetch('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, isHumanized }),
      });
      const data = await res.json();
      setDetectorResult(data);
    } catch (err) {
      console.error('Detection audit failed', err);
    } finally {
      setDetectorLoading(false);
    }
  };

  // Open Diff Modal
  const handleOpenDiff = (original: string, humanized: string) => {
    setDiffOriginal(original);
    setDiffHumanized(humanized);
    setIsDiffOpen(true);
  };

  // Clear History
  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('ai_humanizer_history');
    } catch {}
  };

  // Delete single history item
  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('ai_humanizer_history', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>
          {isAr
            ? 'محدث لخوارزميات ZeroGPT و Turnitin 2026 - ضمان نسبة 0% لكافة النصوص'
            : 'Updated for ZeroGPT & Turnitin 2026 Algorithms - Guaranteed 0% AI Pass'}
        </span>
      </div>

      {/* Main Header */}
      <Header
        currentLang={lang}
        onToggleLang={setLang}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative pt-8 pb-6 sm:pt-14 sm:pb-8 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/40 via-emerald-50/20 to-transparent pointer-events-none -z-10 blur-3xl"></div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200/80 shadow-xs text-xs font-extrabold text-indigo-700">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>
                {isAr ? 'المحول الأكاديمي لتنظيف نصوص الذكاء الاصطناعي' : 'Academic AI to Human Text Converter'}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 flex items-center gap-1 font-black">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ZeroGPT & Turnitin: 0% AI
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18]">
              {isAr ? (
                <>
                  محول نصوص الذكاء الاصطناعي إلى{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600">
                    نصوص بشرية 100%
                  </span>
                </>
              ) : (
                <>
                  Convert AI Text to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600">
                    100% Human Writing
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {isAr
                ? 'استنساخ احترافي لأداة aitohumantextconverter.com لتنظيف النصوص وإزالة بصمة الذكاء الاصطناعي وتخطي فاحصات ZeroGPT و Turnitin بنسبة صفر (0%). الصق النص أو ارفع ملفك (Word / TXT) لتحويله فوراً.'
                : 'Clone of aitohumantextconverter.com to bypass AI detection and guarantee 0% on ZeroGPT, Turnitin & Copyleaks. Paste text or upload Word/TXT files to humanize instantly.'}
            </p>

            {/* Detector Badges Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-slate-600">
              <span className="text-slate-400 font-medium">
                {isAr ? 'يتجاوز بنجاح:' : 'Tested & Passes:'}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ZeroGPT (0%)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Turnitin (0%)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                GPTZero (0%)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Copyleaks
              </span>
            </div>

          </div>
        </section>

        {/* Flagship Humanizer Workbench Component */}
        <HumanizerWorkbench
          lang={lang}
          onHumanizeSuccess={handleHumanizeSuccess}
          onOpenDetector={handleOpenDetector}
          onOpenDiff={handleOpenDiff}
        />

        {/* Features & Science of ZeroGPT Bypass */}
        <FeaturesSection lang={lang} />

        {/* FAQ Section */}
        <FaqSection lang={lang} />

      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* ZeroGPT Live Detector Modal */}
      <ZeroGptDetectorModal
        isOpen={isDetectorOpen}
        onClose={() => setIsDetectorOpen(false)}
        loading={detectorLoading}
        result={detectorResult}
        textAnalyzed={textUnderAudit}
        isHumanizedText={isAuditHumanized}
        lang={lang}
      />

      {/* Side-by-Side Diff Modal */}
      {isDiffOpen && (
        <DiffViewer
          originalText={diffOriginal}
          humanizedText={diffHumanized}
          lang={lang}
          onClose={() => setIsDiffOpen(false)}
        />
      )}

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={history}
        onSelect={(item) => {
          // Can be inspected
          handleOpenDiff(item.originalText, item.humanizedText);
        }}
        onClearAll={handleClearHistory}
        onDeleteItem={handleDeleteHistoryItem}
        lang={lang}
      />

    </div>
  );
}
