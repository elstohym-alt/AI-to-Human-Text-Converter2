import React from 'react';
import { HistoryItem } from '../types';
import { X, Copy, Check, Trash2, RotateCcw, Clock, Sparkles } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClearAll: () => void;
  onDeleteItem: (id: string) => void;
  lang: 'ar' | 'en';
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onSelect,
  onClearAll,
  onDeleteItem,
  lang,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const isAr = lang === 'ar';

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs">
      <div className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} max-w-md w-full bg-white shadow-2xl flex flex-col border-s border-slate-200 animate-in slide-in-from-${isAr ? 'left' : 'right'}`}>
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-800 text-base">
              {isAr ? 'سجل النصوص المحولة' : 'Conversion History'}
            </h3>
            <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold p-1.5 rounded-md hover:bg-rose-50 transition-colors"
                title={isAr ? 'مسح الكل' : 'Clear All'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">
                {isAr ? 'لا توجد تحويلات سابقة حتى الآن' : 'No conversion history yet'}
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {isAr
                  ? 'أي نص تقوم بتحويله سيتم حفظه هنا تلقائياً لسهولة الرجوع إليه ونسخه لاحقاً.'
                  : 'Texts you humanize will be securely cached here locally for easy access.'}
              </p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50/50 transition-all shadow-xs space-y-2.5 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      ZeroGPT: 0% AI
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-slate-300 hover:text-rose-600 p-1 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                    title={isAr ? 'حذف' : 'Delete'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed font-sans">
                  {item.humanizedText}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                  <span className="text-slate-400">
                    {item.wordCount} {isAr ? 'كلمة' : 'words'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item.humanizedText, item.id)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium text-xs flex items-center gap-1 transition-colors"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">{isAr ? 'تم النسخ' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{isAr ? 'نسخ' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        onSelect(item);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md font-semibold text-xs flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{isAr ? 'استعادة' : 'Restore'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
