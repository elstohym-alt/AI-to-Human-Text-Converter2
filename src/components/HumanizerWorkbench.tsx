import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  ClipboardPaste, 
  Download, 
  ShieldCheck, 
  ArrowRightLeft, 
  Zap, 
  BookOpen, 
  MessageSquare, 
  Briefcase, 
  Palette, 
  RotateCw, 
  Search, 
  CheckCircle2,
  FileUp,
  FileText,
  X,
  Upload
} from 'lucide-react';
import mammoth from 'mammoth';
import { HumanizeMode, ReadabilityLevel, HumanizeResponse } from '../types';
import { SAMPLE_TEXTS, SampleText } from '../data/samples';

interface HumanizerWorkbenchProps {
  lang: 'ar' | 'en';
  onHumanizeSuccess: (original: string, humanized: string, mode: HumanizeMode) => void;
  onOpenDetector: (text: string, isHumanized: boolean) => void;
  onOpenDiff: (original: string, humanized: string) => void;
}

export const HumanizerWorkbench: React.FC<HumanizerWorkbenchProps> = ({
  lang,
  onHumanizeSuccess,
  onOpenDetector,
  onOpenDiff,
}) => {
  const isAr = lang === 'ar';

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<HumanizeMode>('stealth_zero_gpt');
  const [readability, setReadability] = useState<ReadabilityLevel>('college');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<HumanizeResponse['stats'] | null>(null);

  // File upload state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [readingFile, setReadingFile] = useState(false);

  // Stepped loading messages
  const loadingStepsAr = [
    'جاري تحليل النص وفحص رتابة التراكيب والبصمات الآلية...',
    'تفكيك الرتابة اللغوية ورفع مؤشر الحيرة المعجمية (Perplexity)...',
    'تنويع أطوال الجمل وهندسة التباين الإيقاعي البشري (Burstiness)...',
    'استبدال الكليشيهات وضبط النتيجة لنسبة 0% في ZeroGPT و Turnitin...',
  ];

  const loadingStepsEn = [
    'Auditing text for robotic syntax and predictable AI tokens...',
    'Deconstructing syntactic uniformity & boosting lexical perplexity...',
    'Varying sentence cadence and introducing human burstiness...',
    'Eliminating AI clichés to guarantee 0% on ZeroGPT and Turnitin...',
  ];

  const modesConfig: { id: HumanizeMode; labelAr: string; labelEn: string; icon: any; badge?: string; descAr: string; descEn: string }[] = [
    {
      id: 'stealth_zero_gpt',
      labelAr: 'التخفي الفائق (ZeroGPT 0%)',
      labelEn: 'Ultra Stealth (0% ZeroGPT)',
      icon: ShieldCheck,
      badge: isAr ? 'الأقوى' : 'Best 0%',
      descAr: 'المعيار الذهبي لتصفير نسبة AI في ZeroGPT و Turnitin و GPTZero',
      descEn: 'Engineered specifically to beat ZeroGPT, Turnitin & Copyleaks with 0% AI',
    },
    {
      id: 'fast',
      labelAr: 'الوضع السريع (Fast Mode)',
      labelEn: 'Fast Mode',
      icon: Zap,
      descAr: 'معالجة فورية فائقة السرعة للمسودات والملاحظات السريعة',
      descEn: 'Instant rapid humanization for quick drafts',
    },
    {
      id: 'academic',
      labelAr: 'أكاديمي وبحثي (Academic)',
      labelEn: 'Academic & Research',
      icon: BookOpen,
      descAr: 'صياغة بحثية رصينة ومفردات علمية دقيقة للأطروحات والجامعات',
      descEn: 'Scholarly, authoritative diction for papers and thesis',
    },
    {
      id: 'standard',
      labelAr: 'قياسي متوازن (Standard)',
      labelEn: 'Standard Human',
      icon: CheckCircle2,
      descAr: 'أسلوب طبيعي سلس ومتوازن مناسب لكافة المقالات العامة',
      descEn: 'Natural balanced human tone for general articles',
    },
    {
      id: 'casual',
      labelAr: 'عفوي وبسيط (Casual)',
      labelEn: 'Casual & Conversational',
      icon: MessageSquare,
      descAr: 'نبرة ودية ومباشرة لوسائل التواصل والمدونات',
      descEn: 'Friendly, authentic voice for blogs and social posts',
    },
    {
      id: 'formal',
      labelAr: 'مهني ورسمي (Formal)',
      labelEn: 'Formal & Business',
      icon: Briefcase,
      descAr: 'أسلوب تنفيذي دقيق لمخاطبات الشركات والتقارير الرسمية',
      descEn: 'Executive corporate tone for formal documents',
    },
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 4);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Word & Char counts
  const inputWords = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const inputChars = inputText.length;
  const outputWords = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;
  const outputChars = outputText.length;

  // Handle Paste
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        setError(null);
      }
    } catch {
      // fallback
    }
  };

  // Process uploaded document file
  const processFile = async (file: File) => {
    setError(null);
    setReadingFile(true);
    try {
      const fileName = file.name;
      const extension = fileName.split('.').pop()?.toLowerCase() || '';
      const sizeKb = (file.size / 1024).toFixed(1) + ' KB';

      let extractedText = '';

      if (extension === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        extractedText = result.value;
      } else if (['txt', 'md', 'markdown', 'rtf', 'csv', 'json'].includes(extension)) {
        extractedText = await file.text();
      } else if (extension === 'doc') {
        const raw = await file.text();
        const cleanParts = raw.replace(/[^\x20-\x7E\u0600-\u06FF\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
        if (cleanParts.length > 50) {
          extractedText = cleanParts;
        } else {
          throw new Error(
            isAr
              ? 'صيغة .doc القديمة قد لا تحتوي على نص نقي، يرجى حفظ الملف بصيغة .docx أو .txt'
              : 'Legacy .doc format may not contain clean text, please save as .docx or .txt'
          );
        }
      } else {
        extractedText = await file.text();
      }

      if (!extractedText || !extractedText.trim()) {
        throw new Error(
          isAr
            ? 'الملف فارغ أو تعذر استخراج النص منه'
            : 'File appears empty or text could not be extracted'
        );
      }

      setInputText(extractedText.trim());
      setUploadedFileName(fileName);
      setUploadedFileSize(sizeKb);
      setOutputText('');
      setStats(null);
    } catch (err: any) {
      console.error('File reading error:', err);
      setError(
        err?.message || (isAr ? 'حدث خطأ أثناء قراءة الملف' : 'Error reading uploaded file')
      );
    } finally {
      setReadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle Clear
  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setUploadedFileName(null);
    setUploadedFileSize(null);
    setStats(null);
    setError(null);
  };

  // Handle Sample selection
  const handleLoadSample = (sample: SampleText) => {
    setInputText(sample.text);
    setOutputText('');
    setUploadedFileName(null);
    setUploadedFileSize(null);
    setStats(null);
    setError(null);
  };

  // Handle Copy Output
  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Download
  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `academic-humanized-0-zerogpt-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Handle Download Word Doc
  const handleDownloadDoc = () => {
    if (!outputText) return;
    const content = `<!DOCTYPE html><html dir="${isAr ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><title>Humanized Text</title></head><body style="font-family: Arial, sans-serif; line-height: 1.8;">${outputText.replace(/\n/g, '<br/>')}</body></html>`;
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `humanized-text-zerogpt-0-${Date.now()}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Perform Humanization API call with chosen mode
  const handleHumanize = async () => {
    if (!inputText.trim()) {
      setError(isAr ? 'يرجى إدخال النص أولاً ليتم تحويله' : 'Please enter or paste your AI text first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/humanize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          mode,
          readability,
          purpose: 'general',
          language: isAr ? 'ar' : 'en',
        }),
      });

      const data: HumanizeResponse = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to humanize text');
      }

      setOutputText(data.humanizedText);
      setStats(data.stats);
      onHumanizeSuccess(inputText, data.humanizedText, mode);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || (isAr ? 'تعذر إتمام التحويل، يرجى المحاولة مرة أخرى' : 'Failed to humanize text'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="workbench" className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Mode Selection Tabs (Replicating aitohumantextconverter.com) */}
      <div className="mb-6 bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 py-2 border-b border-slate-100 mb-2.5 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {isAr ? 'اختر نمط التحويل (Conversion Mode):' : 'Select Conversion Mode:'}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60">
              ZeroGPT: 0% Guaranteed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              {isAr ? 'مستوى القراءة:' : 'Readability:'}
            </span>
            <select
              value={readability}
              onChange={(e) => setReadability(e.target.value as ReadabilityLevel)}
              className="text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-lg px-2.5 py-1 border border-slate-200 cursor-pointer outline-hidden"
            >
              <option value="college">{isAr ? 'جامعي وأكاديمي (College)' : 'College'}</option>
              <option value="general">{isAr ? 'عام وطبيعي (General)' : 'General Public'}</option>
              <option value="high_school">{isAr ? 'مدرسي وبسيط (High School)' : 'High School'}</option>
              <option value="expert">{isAr ? 'أبحاث ودكتوراه (Expert)' : 'Doctorate / Expert'}</option>
            </select>
          </div>
        </div>

        {/* Mode cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {modesConfig.map((m) => {
            const Icon = m.icon;
            const isSelected = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`relative p-3 rounded-xl text-start transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-50/90 to-emerald-50/90 border-indigo-500 shadow-xs ring-1 ring-indigo-500/30'
                    : 'bg-white border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                {m.badge && (
                  <span className="absolute -top-2.5 start-2 bg-emerald-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-2xs">
                    {m.badge}
                  </span>
                )}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`} />
                    <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                      {isAr ? m.labelAr : m.labelEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {isAr ? m.descAr : m.descEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual Box Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        
        {/* Left Box: Input AI Text */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          
          {/* Top Toolbar */}
          <div className="p-3 sm:px-4 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                {isAr ? 'النص الأصلي (نص الذكاء الاصطناعي)' : 'Input (AI Generated Text)'}
              </span>
            </div>

            {/* Action Buttons: Sample Selector, File Upload, Paste, Clear */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    processFile(e.target.files[0]);
                  }
                }}
                accept=".txt,.docx,.doc,.md,.markdown,.rtf,.pdf"
                className="hidden"
              />

              {/* Upload File Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={readingFile}
                className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 rounded-lg hover:border-indigo-300 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title={isAr ? 'رفع ملف وقراءته (Word / TXT / Markdown)' : 'Upload and read document file'}
              >
                <FileUp className="w-3.5 h-3.5 text-indigo-600" />
                <span>{readingFile ? (isAr ? 'جاري القراءة...' : 'Reading...') : (isAr ? 'رفع ملف' : 'Upload File')}</span>
              </button>

              {/* Sample Selector */}
              <div className="relative group">
                <button
                  type="button"
                  className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 rounded-lg hover:border-indigo-300 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{isAr ? 'نصوص تجريبية' : 'Try Samples'}</span>
                </button>
                <div className={`absolute ${isAr ? 'left-0' : 'right-0'} mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 hidden group-hover:block z-20 space-y-1`}>
                  <p className="text-[11px] font-bold text-slate-400 px-2 py-1">
                    {isAr ? 'اختر نموذجاً لتجربته فوراً:' : 'Select sample text to test:'}
                  </p>
                  {SAMPLE_TEXTS.filter(s => isAr ? s.lang === 'ar' : s.lang === 'en').map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleLoadSample(sample)}
                      className="w-full text-start p-2 rounded-lg hover:bg-indigo-50 text-xs font-medium text-slate-700 hover:text-indigo-700 transition-colors block"
                    >
                      <span className="font-bold block text-slate-800">{sample.title}</span>
                      <span className="text-[10px] text-slate-400">{sample.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePaste}
                className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 rounded-lg hover:border-indigo-300 transition-colors flex items-center gap-1"
                title={isAr ? 'لصق من الحافظة' : 'Paste from clipboard'}
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? 'لصق' : 'Paste'}</span>
              </button>

              {inputText && (
                <button
                  onClick={handleClear}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title={isAr ? 'مسح' : 'Clear'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Text Area with Drag & Drop */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setIsDragging(false);
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processFile(e.dataTransfer.files[0]);
              }
            }}
            className="relative flex-1 min-h-[300px] sm:min-h-[360px] p-4 flex flex-col"
          >
            {/* Drag & Drop Visual Overlay */}
            {isDragging && (
              <div className="absolute inset-2 z-30 bg-indigo-50/95 border-2 border-dashed border-indigo-500 rounded-xl flex flex-col items-center justify-center p-6 text-center backdrop-blur-2xs animate-in fade-in">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 mb-3 animate-bounce">
                  <FileUp className="w-6 h-6" />
                </div>
                <p className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {isAr ? 'أفلت الملف هنا لقراءته فوراً' : 'Drop your document here'}
                </p>
                <p className="text-xs text-indigo-700 font-medium mt-1">
                  {isAr
                    ? 'يدعم ملفات Word (.docx) و النصوص (.txt) و Markdown'
                    : 'Supports Word (.docx), Plain Text (.txt), and Markdown (.md)'}
                </p>
              </div>
            )}

            {/* Active Uploaded File Chip */}
            {uploadedFileName && (
              <div className="mb-3 px-3 py-1.5 bg-indigo-50/90 border border-indigo-200/90 text-indigo-950 rounded-xl text-xs font-semibold flex items-center justify-between shrink-0 shadow-2xs">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-bold truncate">{uploadedFileName}</span>
                  <span className="text-[10px] text-indigo-500 font-mono shrink-0">({uploadedFileSize})</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md shrink-0">
                    {isAr ? 'تم استخراج النص بنجاح' : 'Extracted'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFileName(null);
                    setUploadedFileSize(null);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                  title={isAr ? 'إلغاء الملف' : 'Remove file'}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {readingFile ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-3">
                <RotateCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                <p className="text-xs sm:text-sm font-bold text-slate-700">
                  {isAr ? 'جاري قراءة محتوى الملف واستخراج النص الأكاديمي...' : 'Extracting and reading document text...'}
                </p>
              </div>
            ) : (
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={
                  isAr
                    ? 'الصق النص المولد بواسطة ChatGPT أو Claude هنا، أو اضغط "رفع ملف" (Word / TXT / Docx) أو اسحب الملف وأفلته هنا لقراءته وتصفير نسبته في ZeroGPT...'
                    : 'Paste your AI text here from ChatGPT, Claude, or click "Upload File" (Word / TXT / Docx) or drag & drop to read and humanize it...'
                }
                className="w-full flex-1 resize-none border-0 p-0 text-slate-800 text-sm sm:text-base leading-relaxed placeholder:text-slate-400 focus:ring-0 outline-hidden bg-transparent font-sans"
              />
            )}
          </div>

          {/* Bottom Toolbar & Pre-check AI button */}
          <div className="p-3 sm:px-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span>
                {inputWords} <span className="text-slate-400">{isAr ? 'كلمة' : 'words'}</span>
              </span>
              <span>•</span>
              <span>
                {inputChars} <span className="text-slate-400">{isAr ? 'حرف' : 'chars'}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {inputText.trim().length > 20 && (
                <button
                  type="button"
                  onClick={() => onOpenDetector(inputText, false)}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold border border-amber-200/80 flex items-center gap-1.5 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isAr ? 'فحص نسبة AI في النص' : 'Check AI Score'}</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Right Box: Humanized Output Text */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden transition-all">
          
          {/* Top Toolbar */}
          <div className="p-3 sm:px-4 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {isAr ? 'النص البشري (اجتياز ZeroGPT بنسبة 0%)' : 'Output (100% Human Score)'}
              </span>
              {outputText && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ZeroGPT: 0% AI
                </span>
              )}
            </div>

            {/* Output Actions */}
            {outputText && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenDiff(inputText, outputText)}
                  className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 rounded-lg hover:border-indigo-300 transition-colors flex items-center gap-1"
                  title={isAr ? 'مقارنة الفروق' : 'Compare Diff'}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isAr ? 'مقارنة' : 'Diff'}</span>
                </button>

                <button
                  onClick={() => onOpenDetector(outputText, true)}
                  className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1"
                  title={isAr ? 'فحص النتيجة في ZeroGPT' : 'Audit on ZeroGPT'}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">{isAr ? 'فحص ZeroGPT' : 'Audit'}</span>
                </button>

                <button
                  onClick={handleDownloadDoc}
                  className="px-2 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 rounded-lg hover:border-indigo-300 transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                  title={isAr ? 'تحميل كملف Word (.doc)' : 'Download as Word (.doc)'}
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Word</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title={isAr ? 'تحميل النص (.txt)' : 'Download .txt'}
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-xs flex items-center gap-1 transition-all"
                  title={isAr ? 'نسخ النص البشري' : 'Copy Text'}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isAr ? 'نسخ' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Text Area / Loading State / Empty Placeholder */}
          <div className="relative flex-1 min-h-[300px] sm:min-h-[360px] p-4 flex flex-col justify-between">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center space-y-4 my-auto">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                  <Sparkles className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <p className="font-extrabold text-slate-800 text-sm sm:text-base">
                    {isAr ? loadingStepsAr[loadingStep] : loadingStepsEn[loadingStep]}
                  </p>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'يتم تطبيق خوارزمية تصفير مؤشرات الذكاء الاصطناعي...' : 'Bypassing ZeroGPT, Turnitin and Copyleaks...'}
                  </p>
                </div>
              </div>
            ) : outputText ? (
              <textarea
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                className="w-full h-full resize-none border-0 p-0 text-slate-800 text-sm sm:text-base leading-relaxed focus:ring-0 outline-hidden bg-transparent font-sans"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center text-slate-400 space-y-3 my-auto">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-600">
                    {isAr ? 'النص البشري سيظهر هنا' : 'Humanized text will appear here'}
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">
                    {isAr
                      ? 'اضغط على زر "تحويل إلى نص بشري" بالأسفل لإعادة الصياغة بأسلوب بشري 100% لا يكتشفه أي فاحص.'
                      : 'Click "Humanize Text" below to convert and guarantee a 0% AI detection score.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Toolbar & Stats */}
          <div className="p-3 sm:px-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span>
                {outputWords} <span className="text-slate-400">{isAr ? 'كلمة' : 'words'}</span>
              </span>
              <span>•</span>
              <span>
                {outputChars} <span className="text-slate-400">{isAr ? 'حرف' : 'chars'}</span>
              </span>
            </div>

            {stats && (
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  ZeroGPT: 0% AI
                </span>
                <span className="text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 hidden sm:inline">
                  {isAr ? 'بشري 100%' : '100% Human'}
                </span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-rose-500 hover:text-rose-700 text-xs font-bold underline">
            {isAr ? 'تجاهل' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Central Action Button */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleHumanize}
          disabled={loading || !inputText.trim()}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-indigo-200 ${
            loading || !inputText.trim()
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white hover:shadow-indigo-300 hover:scale-[1.01] active:scale-[0.99] pulse-glow'
          }`}
        >
          {loading ? (
            <>
              <RotateCw className="w-5 h-5 animate-spin" />
              <span>{isAr ? 'جاري تحويل النص وتصفير نسبة الذكاء الاصطناعي...' : 'Humanizing & Bypassing ZeroGPT (0%)...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>{isAr ? '✨ تنظيف النص وتحويله إلى بشري (ZeroGPT 0%)' : '✨ Humanize AI Text (ZeroGPT 0%)'}</span>
            </>
          )}
        </button>

        {outputText && (
          <button
            onClick={() => onOpenDetector(outputText, true)}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-sm bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 shadow-xs flex items-center justify-center gap-2 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? 'تحقق من النتيجة في فاحص ZeroGPT (0%)' : 'Verify on ZeroGPT (0% AI)'}</span>
          </button>
        )}
      </div>

    </section>
  );
};
