import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  lang: 'ar' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">
                  AI to Human Text Converter
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ZeroGPT 0%
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'الأداة الرائدة لتنظيف النصوص من الذكاء الاصطناعي وتخطي فاحصات AI'
                  : 'The leading platform to bypass AI detection and humanize content'}
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-300">
            <a href="#workbench" className="hover:text-white transition-colors">
              {isAr ? 'محول النصوص' : 'Text Converter'}
            </a>
            <a href="#why-zerogpt" className="hover:text-white transition-colors">
              {isAr ? 'تخطي ZeroGPT' : 'ZeroGPT Bypass'}
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              {isAr ? 'كيف يعمل؟' : 'How It Works'}
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
            </a>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} AI to Human Text Converter. {isAr ? 'كافة الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <p className="text-center sm:text-end max-w-md text-[11px] leading-relaxed">
            {isAr
              ? 'تنويه: تم تصميم هذه الأداة لتعزيز جودة الصياغة البشرية والتعبير الإبداعي ومساعدة الكتاب والباحثين في تحسين انسيابية نصوصهم.'
              : 'Disclaimer: This tool is intended for ethical writing assistance, humanizing prose, and enhancing authentic communication.'}
          </p>
        </div>

      </div>
    </footer>
  );
};
