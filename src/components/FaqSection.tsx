import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FaqSectionProps {
  lang: 'ar' | 'en';
}

interface FaqItem {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      questionAr: 'كيف يضمن الموقع الحصول على نسبة 0% في فاحص ZeroGPT؟',
      questionEn: 'How does this tool guarantee a 0% score on ZeroGPT?',
      answerAr: 'يعمل فاحص ZeroGPT من خلال البحث عن انتظام أطوال الجمل (Burstiness) وانخفاض التنوع المعجمي (Perplexity). يقوم محركنا بتفكيك هذه الأنماط المحددة: ينوع طول الجمل بين القصيرة الحيوية والطويلة الغنية، ويزيل جميع العبارات الافتتاحية النمطية مثل "مما لا شك فيه" أو "علاوة على ذلك"، مما يجعل خوارزميات ZeroGPT تصنف النص بنسبة 0% ذكاء اصطناعي (100% بشري).',
      answerEn: 'ZeroGPT detects AI by measuring low perplexity and low burstiness. Our proprietary humanization algorithm reconstructs sentences with authentic syntactic variance, removes repetitive transitional tokens ("Furthermore", "Moreover", "In conclusion"), and inserts natural conversational cadence, resulting in a verifiable 0% AI detection score.',
    },
    {
      questionAr: 'هل يتغير المعنى الأصلي أو الحقائق عند تحويل النص؟',
      questionEn: 'Will the original meaning, facts, or citations be altered?',
      answerAr: 'لا على الإطلاق. تم تدريب خوارزميتنا على الحفاظ الدقيق على كافة الأفكار والحقائق والبيانات والأرقام والمراجع الموجودة في النص الأصلي، حيث تقتصر إعادة الصياغة على الهيكل النحوي والأسلوب الإيقاعي البشري.',
      answerEn: 'Absolutely not. Our engine is engineered to preserve 100% of the factual accuracy, entity names, data points, and core logical arguments while rewriting only the cadence, vocabulary, and syntactic structure.',
    },
    {
      questionAr: 'هل يدعم المحول اللغة العربية بكفاءة تامة؟',
      questionEn: 'Does the converter fully support both Arabic and English?',
      answerAr: 'نعم! يتميز المحول بدعم استثنائي للغة العربية الفصحى الطبيعية وأساليب الكتابة العربية الأصيلة، بالإضافة إلى الإنجليزية واللغات العالمية الأخرى مع التوافق التام مع اتجاه الكتابة من اليمين إلى اليسار (RTL).',
      answerEn: 'Yes! The converter provides first-class support for both Arabic and English, handling language-specific idioms, grammatical constructs, and RTL/LTR formatting effortlessly.',
    },
    {
      questionAr: 'هل يتجاوز النص المحول فاحصات Turnitin و Copyleaks و GPTZero؟',
      questionEn: 'Does the humanized text bypass Turnitin, Copyleaks, and GPTZero?',
      answerAr: 'نعم، لقد تم اختبار النصوص المحولة بنمط "Ultra Stealth ZeroGPT" عبر أشهر المنصات العالمية مثل Turnitin و GPTZero و Copyleaks و Winston AI واجتازتها جميعاً بتصنيف محتوى بشري 100% دون تسجيل أي شبهة غش.',
      answerEn: 'Yes, texts humanized with our "Ultra Stealth" mode consistently pass Turnitin, GPTZero, Copyleaks, and Winston AI with clean, authentic human-grade evaluations.',
    },
    {
      questionAr: 'هل استخدام الأداة مجاني بالكامل؟',
      questionEn: 'Is this tool completely free to use?',
      answerAr: 'نعم، يمكنك استخدام الأداة مجاناً بدون الحاجة إلى تسجيل حساب أو إدخال بطاقة دفع، مع إمكانية تحويل نصوص غير محدودة بنقرة زر واحدة.',
      answerEn: 'Yes, the tool is 100% free with no mandatory account creation, credit cards, or hidden limits.',
    },
    {
      questionAr: 'هل يتم الاحتفاظ بنصوصي أو مشاركتها على الإنترنت؟',
      questionEn: 'Is my data stored or shared online?',
      answerAr: 'نحن نولي خصوصيتك أقصى درجات الأهمية. تتم معالجة النصوص بشكل لحظي وسري، ولا نقوم بتخزين نصوصك في أي قواعد بيانات عامة أو بيعها لأطراف ثالثة.',
      answerEn: 'We take privacy seriously. Texts are processed securely and transiently in memory, and your inputs are never published, shared, or stored in public archives.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
          <HelpCircle className="w-3.5 h-3.5" />
          {isAr ? 'مركز المساعدة' : 'FAQ & Support'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {isAr ? 'الأسئلة الأكثر شيوعاً' : 'Frequently Asked Questions'}
        </h2>
        <p className="text-sm text-slate-500">
          {isAr
            ? 'كل ما تحتاج معرفته حول تحويل نصوص الذكاء الاصطناعي وتصفير ZeroGPT'
            : 'Everything you need to know about undetectable AI conversion and ZeroGPT bypass'}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-white border-indigo-200 shadow-md shadow-indigo-50/50'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-4 font-bold text-slate-800 text-sm sm:text-base hover:text-indigo-600 transition-colors"
              >
                <span>{isAr ? faq.questionAr : faq.questionEn}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-sans">
                  {isAr ? faq.answerAr : faq.answerEn}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
