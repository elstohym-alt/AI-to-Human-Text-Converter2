export interface SampleText {
  id: string;
  title: string;
  lang: 'ar' | 'en';
  category: string;
  text: string;
}

export const SAMPLE_TEXTS: SampleText[] = [
  {
    id: 'ar-ai-tech',
    title: 'الذكاء الاصطناعي في التعليم (نموذجي من ChatGPT)',
    lang: 'ar',
    category: 'أكاديمي / تقني',
    text: `مما لا شك فيه أن الذكاء الاصطناعي يلعب دوراً حيوياً وجوهرياً في تطوير المنظومة التعليمية الحديثة. علاوة على ذلك، فإن دمج التقنيات الذكية في الفصول الدراسية يساهم بشكل فعال في تخصيص التجارب التعليمية لكل طالب على حدة. ومن الجدير بالذكر أن هذا التحول الرقمي يفتح آفاقاً واسعة للابتكار والتميز الأكاديمي. وفي هذا السياق، يجب علينا تسليط الضوء على أهمية تدريب المعلمين على هذه الأدوات المتطورة. وفي الختام، يظل الذكاء الاصطناعي سلاحاً ذا حدين يتطلب حوكمة رشيدة لضمان مستقبل مشرق للأجيال القادمة.`
  },
  {
    id: 'ar-ai-business',
    title: 'أهمية التسويق الرقمي للأعمال',
    lang: 'ar',
    category: 'أعمال وتسويق',
    text: `تعتبر الاستراتيجيات الرقمية من أهم الركائز الأساسية لنجاح المشاريع الناشئة في العصر الراهن. بالإضافة إلى ذلك، فإن بناء حضور رقمي قوي يعزز من ولاء العملاء ويزيد من المبيعات التراكمية. ومن هذا المنطلق، ينبغي على الشركات استثمار كافة الموارد المتاحة لتحسين تجربة المستخدم وتحليل البيانات بدقة متناهية. لا غنى عن القول إن المنافسة الشرسة تفرض تبني حلول مبتكرة لمواكبة التغيرات المتسارعة في السوق العالمي.`
  },
  {
    id: 'en-ai-essay',
    title: 'Climate Change Impact (Classic ChatGPT Essay)',
    lang: 'en',
    category: 'Essay & Science',
    text: `Climate change is undoubtedly one of the most pressing challenges facing our planet today. Furthermore, rising global temperatures have led to devastating environmental consequences, including glacier retreat and extreme weather events. It is important to note that human industrial activities play a pivotal role in accelerating this phenomenon. In addition, transitioning to renewable energy sources is imperative for sustainable development. In conclusion, global cooperation and decisive action are essential to preserve the delicate tapestry of Earth's ecosystems for future generations.`
  },
  {
    id: 'en-ai-business',
    title: 'Remote Work Culture (Corporate AI Memo)',
    lang: 'en',
    category: 'Business & HR',
    text: `In today's fast-paced corporate landscape, remote work has emerged as a transformative paradigm. Delving into the multifaceted dynamics of telecommuting reveals both unparalleled flexibility and distinct communication hurdles. Moreover, fostering employee engagement in virtual environments requires intentional leadership and cutting-edge collaborative tools. It is crucial to underscore that striking a balance between productivity and mental well-being remains of paramount importance.`
  }
];
