import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, X, Activity, Gauge, BarChart3, ExternalLink } from 'lucide-react';
import { DetectResponse } from '../types';

interface ZeroGptDetectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  result: DetectResponse | null;
  textAnalyzed: string;
  isHumanizedText: boolean;
  lang: 'ar' | 'en';
}

export const ZeroGptDetectorModal: React.FC<ZeroGptDetectorModalProps> = ({
  isOpen,
  onClose,
  loading,
  result,
  textAnalyzed,
  isHumanizedText,
  lang,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const aiScore = result ? result.aiPercentage : 0;
  const humanScore = result ? result.humanPercentage : 100;
  const isZeroGptPass = aiScore === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isZeroGptPass ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">
                  {isAr ? 'فاحص الذكاء الاصطناعي (ZeroGPT Simulator)' : 'ZeroGPT AI Detector Audit'}
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/90 font-mono">
                  v3.8 Engine
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {isAr
                  ? 'فحص تفصيلي للبيربلكسيتي، وتنوع أطوال الجمل، والبصمات اللغوية'
                  : 'Deep audit for perplexity, burstiness, and algorithmic markers'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {loading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div>
                <p className="font-bold text-slate-800 text-base">
                  {isAr ? 'جاري فحص النص عبر محرك ZeroGPT...' : 'Analyzing text via ZeroGPT detector heuristics...'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {isAr ? 'حساب الحيرة المعجمية ومؤشر التكرار' : 'Evaluating token perplexity and syntactic burstiness'}
                </p>
              </div>
            </div>
          ) : result ? (
            <>
              {/* Score summary banner */}
              <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-5 ${
                isZeroGptPass 
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200' 
                  : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
              }`}>
                {/* Gauge & Score */}
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 font-mono shadow-inner ${
                    isZeroGptPass
                      ? 'bg-emerald-600 border-emerald-400 text-white'
                      : 'bg-amber-600 border-amber-400 text-white'
                  }`}>
                    <span className="text-2xl font-black leading-none">{aiScore}%</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-90">AI Score</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-base font-extrabold ${isZeroGptPass ? 'text-emerald-900' : 'text-amber-900'}`}>
                        {isZeroGptPass 
                          ? (isAr ? '0% ذكاء اصطناعي (بشري بالكامل 100%)' : '0% AI Detected (100% Human)')
                          : (isAr ? `${aiScore}% بصمة ذكاء اصطناعي مكشوفة` : `${aiScore}% AI Detected`)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-md">
                      {result.verdict}
                    </p>
                  </div>
                </div>

                {/* Sub gauges */}
                <div className="flex items-center gap-4 text-center divide-x divide-x-reverse divide-slate-200/80 bg-white/80 p-3 rounded-xl border border-slate-200 shadow-xs">
                  <div className="px-2">
                    <span className="text-xs font-semibold text-slate-500 block">
                      {isAr ? 'التنوع (Burstiness)' : 'Burstiness'}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {result.burstinessScore}%
                    </span>
                  </div>
                  <div className="px-2">
                    <span className="text-xs font-semibold text-slate-500 block">
                      {isAr ? 'الحيرة (Perplexity)' : 'Perplexity'}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {result.perplexityScore}%
                    </span>
                  </div>
                  <div className="px-2">
                    <span className="text-xs font-semibold text-slate-500 block">
                      {isAr ? 'درجة الأمان' : 'Safety'}
                    </span>
                    <span className={`text-sm font-bold ${isZeroGptPass ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {isZeroGptPass ? '100% آمن' : 'مكشوف'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Benchmark Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-indigo-500" />
                  {isAr ? 'نتائج الفحص على أشهر كواشف الذكاء الاصطناعي' : 'Verified AI Detector Benchmark Results'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
                  {Object.entries(result.benchmarks).map(([key, val]) => (
                    <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                      <span className="text-[11px] font-bold text-slate-600 block uppercase">
                        {key === 'zeroGpt' ? 'ZeroGPT' :
                         key === 'turnitin' ? 'Turnitin' :
                         key === 'gptZero' ? 'GPTZero' :
                         key === 'copyleaks' ? 'Copyleaks' : 'Winston AI'}
                      </span>
                      <span className={`text-xs font-extrabold mt-1 inline-flex items-center gap-1 ${
                        isZeroGptPass ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {isZeroGptPass && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sentence Breakdown */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-indigo-500" />
                    {isAr ? 'تحليل الجمل سطراً بسطر' : 'Sentence-by-Sentence Breakdown'}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {isAr ? 'بشري 100%' : '100% Human'}
                    </span>
                    <span className="flex items-center gap-1 text-amber-700">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      {isAr ? 'مختلط' : 'Mixed'}
                    </span>
                    <span className="flex items-center gap-1 text-rose-700">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      {isAr ? 'ذكاء اصطناعي' : 'AI Flagged'}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 max-h-64 overflow-y-auto space-y-2 text-sm leading-relaxed font-sans">
                  {result.sentenceAnalysis.map((item, i) => {
                    const bgClass =
                      item.status === 'human'
                        ? 'bg-emerald-100/60 text-emerald-950 border-emerald-200'
                        : item.status === 'mixed'
                        ? 'bg-amber-100/60 text-amber-950 border-amber-200'
                        : 'bg-rose-100/70 text-rose-950 border-rose-200';

                    return (
                      <div
                        key={i}
                        className={`p-2.5 rounded-lg border text-xs sm:text-sm flex items-start justify-between gap-2 transition-all ${bgClass}`}
                      >
                        <span className="flex-1">{item.sentence}</span>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-white/70 shadow-2xs shrink-0">
                          {item.aiProbability}% AI
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom hint */}
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'خوارزمية محول aitohumantextconverter تضمن الحصول على نسبة صفرية (0% AI) في كافة تقارير فحص المحتوى الأكاديمي والمهني.'
                    : 'The aitohumantextconverter engine modifies the algorithmic entropy of the text so that statistical detectors register it strictly as human.'}
                </span>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-slate-500 text-sm">
              {isAr ? 'لا توجد بيانات للفحص' : 'No text analysis available'}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 text-white hover:bg-slate-900 rounded-lg text-sm font-semibold transition-colors"
          >
            {isAr ? 'إغلاق الفاحص' : 'Close Audit'}
          </button>
        </div>

      </div>
    </div>
  );
};
