import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Lock, 
  Clock, 
  FileCheck2, 
  TrendingUp,
  Layers,
  Award
} from 'lucide-react';

interface FeaturesSectionProps {
  lang: 'ar' | 'en';
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-12 sm:py-16 bg-slate-100/60 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: How ZeroGPT Works & Why It Hits 0% */}
        <div id="why-zerogpt" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-3 py-1 rounded-full">
              {isAr ? 'السر الهندسي لتصفير ZeroGPT' : 'ZeroGPT Algorithmic Bypass'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isAr 
                ? 'كيف يكتشف ZeroGPT الذكاء الاصطناعي؟ وكيف تجعله أداتنا 0%؟' 
                : 'How ZeroGPT Detects AI & How We Reduce It to 0%'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isAr
                ? 'تعتمد أدوات مثل ZeroGPT و Turnitin على قياس نمطين رئيسيين: الحيرة المعجمية (Perplexity) والتنوع الإيقاعي للجمل (Burstiness). إليك كيف نعيد كتابة النص ليكون بشرياً بالكامل:'
                : 'ZeroGPT and Turnitin analyze text through two primary vectors: Perplexity (token predictability) and Burstiness (sentence structure variance). Here is how our engine bypasses both:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Perplexity */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? '1. رفع معامل الحيرة المعجمية (Perplexity)' : '1. Elevated Lexical Perplexity'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? 'نماذج الذكاء الاصطناعي (مثل ChatGPT) تختار الكلمة التالية الأكثر توقعاً إحصائياً. محولنا يستبدل تلك المتتاليات المتوقعة بتعابير بشرية فصيحة، ومرادفات حية، وصياغات حرة غير نمطية تجعل مؤشر التوقع في ZeroGPT صفراً.'
                  : 'AI models choose mathematically predictable tokens. Our converter introduces genuine human idiom, diverse vocabulary, and organic transitions that break AI statistical models completely.'}
              </p>
            </div>

            {/* Card 2: Burstiness */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? '2. التباين الإيقاعي الشديد (Burstiness)' : '2. Dynamic Sentence Burstiness'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? 'البشر يكتبون بجمل متفاوتة جداً: جملة قصيرة من 4 كلمات تليها جملة مركبة من 25 كلمة. بينما يكتب الذكاء الاصطناعي برتابة (كل جملة 18 كلمة). خوارزميتنا تعيد هندسة طول الجمل وإيقاعها لتطابق الأسلوب البشري الأصيل.'
                  : 'Humans naturally write with alternating rhythms: a punchy 4-word sentence followed by a rich 28-word compound clause. Our algorithm reconstructs sentence lengths to replicate true human heartbeat.'}
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/70">
              <h3 className="font-bold text-slate-800 text-base">
                {isAr ? 'مقارنة مباشرة: نص ChatGPT المكتشف vs نص محولنا البشري' : 'Direct Comparison: AI Text vs. aitohumantextconverter'}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-600">
                    <th className="p-4 text-start font-bold">{isAr ? 'المعيار' : 'Feature'}</th>
                    <th className="p-4 text-start font-bold text-rose-700 bg-rose-50/50">
                      {isAr ? 'نص ChatGPT العادي (مكشوف)' : 'Standard ChatGPT (Flagged)'}
                    </th>
                    <th className="p-4 text-start font-bold text-emerald-700 bg-emerald-50/50">
                      {isAr ? 'محول AI to Human (بشري 100%)' : 'Our Humanizer (0% AI)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-4 font-bold">{isAr ? 'نتيجة ZeroGPT' : 'ZeroGPT Result'}</td>
                    <td className="p-4 text-rose-700 font-bold bg-rose-50/30 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      85% - 100% AI Detected
                    </td>
                    <td className="p-4 text-emerald-700 font-extrabold bg-emerald-50/30">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        0% AI (100% Human Score)
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">{isAr ? 'فاحص Turnitin الأكاديمي' : 'Turnitin AI Score'}</td>
                    <td className="p-4 text-rose-700 font-semibold bg-rose-50/30">
                      {isAr ? 'يتم اكتشافه ورسوب البحث' : 'High AI Flag / Plagiarism Warning'}
                    </td>
                    <td className="p-4 text-emerald-700 font-bold bg-emerald-50/30">
                      {isAr ? 'آمن 100% بدون أي وسم' : 'Completely Undetected (0%)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">{isAr ? 'الروابط والعبارات المكررة' : 'AI Cliché Connectors'}</td>
                    <td className="p-4 text-slate-600 bg-rose-50/30">
                      {isAr ? 'مما لا شك فيه، علاوة على ذلك، في الختام' : 'Furthermore, Moreover, In conclusion, Delve'}
                    </td>
                    <td className="p-4 text-emerald-800 font-semibold bg-emerald-50/30">
                      {isAr ? 'محذوفة ومستبدلة بسياق بشري انسيابي' : 'Completely removed; natural human cadence'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">{isAr ? 'تنوع طول الجمل (Burstiness)' : 'Burstiness Cadence'}</td>
                    <td className="p-4 text-slate-600 bg-rose-50/30">
                      {isAr ? 'رتيب ومتماثل (15-20 كلمة لكل جملة)' : 'Flat, monotonic sentence lengths'}
                    </td>
                    <td className="p-4 text-emerald-800 font-semibold bg-emerald-50/30">
                      {isAr ? 'تباين ديناميكي طبيعي يحاكي النفس البشري' : 'Dynamic human rhythm from 4 to 30 words'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 2: How It Works (3 Steps) */}
        <div id="how-it-works" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
              {isAr ? 'سهولة الاستخدام' : 'Effortless Flow'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isAr ? '3 خطوات بسيطة للحصول على نص بشري معتمد' : '3 Simple Steps to 100% Human Text'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
              <span className="absolute top-4 end-4 text-4xl font-black text-slate-100 select-none">01</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm mb-4">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">
                {isAr ? 'الصق النص أو ارفع الملف' : 'Paste Text or Upload File'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? 'الصق محتوى الذكاء الاصطناعي مباشرة أو ارفع ملفك بصيغة Word (.docx) أو TXT لقراءته فوراً.'
                  : 'Paste your draft or upload your Word (.docx) or TXT document directly for instant extraction.'}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-indigo-200 bg-gradient-to-b from-indigo-50/30 to-white shadow-xs relative overflow-hidden">
              <span className="absolute top-4 end-4 text-4xl font-black text-indigo-100 select-none">02</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm mb-4">
                2
              </div>
              <h4 className="font-bold text-indigo-950 text-base mb-2">
                {isAr ? 'اختر نمط التحويل واضغط تحويل' : 'Choose Mode & Click Convert'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? 'حدد وضع "Ultra Stealth 0% ZeroGPT" أو الأكاديمي، واضغط زر التحويل لتفكيك البصمة الآلية فوراً.'
                  : 'Select "Ultra Stealth ZeroGPT 0%" or Academic mode, and let our engine humanize the prose.'}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
              <span className="absolute top-4 end-4 text-4xl font-black text-slate-100 select-none">03</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">
                {isAr ? 'انسخ واستمتع بنتيجة 0% AI' : 'Copy 0% AI Human Text'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? 'احصل على نص فصيح وبشري 100% جاهز للنشر أو التسليم الأكاديمي مع ضمان اجتياز كافة الفاحصات.'
                  : 'Instantly copy or download your pristine humanized text ready for submission with ZeroGPT 0%.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Value Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200/90 text-center space-y-2">
            <Award className="w-6 h-6 text-indigo-600 mx-auto" />
            <h5 className="font-bold text-slate-800 text-sm">{isAr ? '0% في ZeroGPT' : 'ZeroGPT 0% Score'}</h5>
            <p className="text-xs text-slate-500">{isAr ? 'تصفير شامل للبصمة الآلية' : 'Guaranteed 0% AI index'}</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200/90 text-center space-y-2">
            <Lock className="w-6 h-6 text-emerald-600 mx-auto" />
            <h5 className="font-bold text-slate-800 text-sm">{isAr ? 'أمان وخصوصية 100%' : '100% Private & Safe'}</h5>
            <p className="text-xs text-slate-500">{isAr ? 'لا نقوم بحفظ نصوصك أبداً' : 'Your text is never shared'}</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200/90 text-center space-y-2">
            <FileCheck2 className="w-6 h-6 text-indigo-600 mx-auto" />
            <h5 className="font-bold text-slate-800 text-sm">{isAr ? 'حفظ المعنى بنسبة 100%' : '100% Meaning Preserved'}</h5>
            <p className="text-xs text-slate-500">{isAr ? 'لا تغيير في الحقائق والأرقام' : 'Facts & nuance remain intact'}</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200/90 text-center space-y-2">
            <Zap className="w-6 h-6 text-amber-600 mx-auto" />
            <h5 className="font-bold text-slate-800 text-sm">{isAr ? 'مجاني وبدون حدود' : 'Free & Unlimited'}</h5>
            <p className="text-xs text-slate-500">{isAr ? 'بدون تسجيل دخول إجباري' : 'No sign-up or credit card'}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
