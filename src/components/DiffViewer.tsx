import React from 'react';
import { CheckCircle2, ArrowRightLeft, Sparkles, X } from 'lucide-react';

interface DiffViewerProps {
  originalText: string;
  humanizedText: string;
  lang: 'ar' | 'en';
  onClose: () => void;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  originalText,
  humanizedText,
  lang,
  onClose,
}) => {
  const isAr = lang === 'ar';

  const origWords = originalText.trim().split(/\s+/);
  const humWords = humanizedText.trim().split(/\s+/);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">
                {isAr ? 'مقارنة التغييرات (قبل وبعد التحويل)' : 'Side-by-Side Text Comparison'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr 
                  ? 'شاهد كيف تم تفكيك النمط الآلي وإعادة صياغته بأسلوب بشري طبيعي يتخطى ZeroGPT' 
                  : 'See how robotic AI patterns were dismantled and rewritten into natural human flow'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Comparison */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-100">
          
          {/* Left: Original AI text */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                {isAr ? 'النص الأصلي (ذكاء اصطناعي مكشوف)' : 'Original (AI Detected)'}
              </span>
              <span className="text-xs text-slate-500">
                {origWords.length} {isAr ? 'كلمة' : 'words'}
              </span>
            </div>
            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 text-slate-700 leading-relaxed text-sm whitespace-pre-wrap font-sans">
              {originalText}
            </div>
            <div className="text-xs text-amber-800/80 bg-amber-100/60 p-2.5 rounded-lg flex items-start gap-2">
              <span className="font-bold text-amber-600">!</span>
              <span>
                {isAr
                  ? 'يحتوي على عبارات مكررة ورتابة في طول الجمل ترصدها فاحصات الذكاء الاصطناعي كـ ZeroGPT.'
                  : 'Contains repetitive connectors and uniform sentence lengths flagged by ZeroGPT.'}
              </span>
            </div>
          </div>

          {/* Right: Humanized text */}
          <div className="space-y-3 pt-4 md:pt-0">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {isAr ? 'النص المحول (بشري 100% - ZeroGPT 0%)' : 'Humanized (100% Human)'}
              </span>
              <span className="text-xs text-slate-500">
                {humWords.length} {isAr ? 'كلمة' : 'words'}
              </span>
            </div>
            <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200/60 text-slate-800 leading-relaxed text-sm whitespace-pre-wrap font-sans">
              {humanizedText}
            </div>
            <div className="text-xs text-emerald-800 bg-emerald-100/70 p-2.5 rounded-lg flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                {isAr
                  ? 'تم تنويع طول الجمل، واستبدال الكليشيهات بمصطلحات بشرية أصيلة مع المحافظة التامة على المعنى.'
                  : 'Syntactic rhythm varied and artificial tropes replaced with genuine organic cadence.'}
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 text-white hover:bg-slate-900 rounded-lg text-sm font-semibold transition-colors"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
