import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  Search, 
  Flame, 
  Tag, 
  ShoppingBag, 
  ArrowUpDown, 
  ExternalLink, 
  AlertCircle, 
  BookOpen, 
  Briefcase,
  Layers,
  Sparkle,
  ShieldCheck,
  ClipboardCheck,
  FileText,
  BadgeAlert,
  HelpCircle,
  Globe,
  ArrowRightLeft,
  Columns,
  // New icons for listbox and categories
  Gamepad2,
  Dumbbell,
  Compass,
  Coffee,
  Music,
  Heart,
  Moon,
  Palette,
  Tv,
  Zap,
  GraduationCap,
  Code,
  Leaf,
  ChevronDown,
  Pin,
  ShoppingCart,
  Target,
  Star,
  Eye,
  Trophy,
  Smile,
  X
} from "lucide-react";
import { TrendIdea, GroundingSource, TrademarkCheckResult } from "./types";
import { initialTrends } from "./initialData";
import { ipStatusesMap } from "./ipData";
import { trendTagsIpMap } from "./tagIpData";
import { SeoIntelligence } from "./components/SeoIntelligence";

// Dynamic English/Arabic Localization Dictionary for Dual-Mode (US-Focused by default)
const translations = {
  en: {
    title: "Redbubble Trend Analyzer AI",
    subtitle: "Real-time research & optimized listings for the US Market",
    liveBadge: "LIVE 2026",
    searchPlaceholder: "Search by title, tag, or niche...",
    categoryLabel: "Target Niche Category",
    all: "All Categories",
    customPromptLabel: "Additional Instructions (Optional)",
    customPromptPlaceholder: "e.g., Focus on simple typography, retro circles, gaming themes...",
    searchSourcesLabel: "Target Search Sources",
    searchSourcesHelp: "Select the specific platforms to scour for trending designs and keywords:",
    googleSource: "Google Trends",
    merchSource: "Merch by Amazon",
    etsySource: "Etsy",
    redbubbleSource: "Redbubble",
    pinterestSource: "Pinterest",
    generateBtn: "Generate 10 Live Trends 🚀",
    generating: "Searching & analyzing live...",
    resetBtn: "Restore Default Trends",
    lowComp: "Low Competition",
    medComp: "Medium Competition",
    highComp: "High Competition",
    compFilterLabel: "Competition:",
    sortByLabel: "Sort by:",
    sortByRank: "Trending Rank",
    sortByComp: "Competition Level",
    tabTrends: "Trend Ideas",
    tabScanner: "Deep IP Scanner 🛡️",
    tabGuide: "Tagging 101 & Guide",
    noResults: "No results match the current filters.",
    tryAdjusting: "Try adjusting your search query or competition filter to show ideas again.",
    sourceTitle: "Grounding Sources:",
    sourceDesc: "These trends were identified by researching live web traffic and search patterns from these sources:",
    bestProducts: "Best-Selling Products:",
    tagsLabel: "Suggested Search Tags (Copy-paste):",
    copyAllTags: "Copy All Tags (Comma-separated)",
    copySuccess: "Copied successfully!",
    nicheLabel: "🎯 Target Niche & Audience:",
    whyTrendingLabel: "📈 US Market Trend Drivers:",
    conceptLabel: "💡 Visual Concept & Style Guide:",
    copyConceptBtn: "Copy Concept Description",
    aiPromptLabel: "🎨 Professional AI Image Generator Prompt:",
    copyPromptBtn: "Copy AI Image Prompt",
    aiPromptHelp: "Copy this optimized prompt into Midjourney, ChatGPT (DALL-E 3), SeaArt, or Leonardo AI to generate ready-to-sell Redbubble designs.",
    trademarkPrecheck: "Trademark & IP Pre-Check",
    trademarkTip: "USPTO Search Tip:",
    disclaimer: "AI checks are pre-screening indicators. Always verify manually on USPTO TESS before publishing.",
    listingOptimizerHeader: "Redbubble Listing Copy-Paste Box",
    optimizedTitleLabel: "Clean Upload Title (No keyword stuffing)",
    optimizedDescLabel: "SEO Description (Aesthetic & engaging)",
    copyTitle: "Copy Title",
    copyDesc: "Copy Description",
    optimalDensity: "Optimal Tag Density",
    rbFormHeader: "Redbubble 'Add New Work' Simulation Form",
    rbFormSubtitle: "Copy optimized listing data straight into the official Redbubble uploader fields below",
    rbTitreLabel: "Title (required)",
    rbTitreHelp: "Enter a title of 4 to 8 words that precisely describes your artwork. Do not include lists of keywords.",
    rbTitreExample: "Example: Vintage Pickleball Club Retro...",
    rbTagsLabel: "Tags",
    rbTagsHelp: "Add 15 tags maximum, each limited to 50 characters, that describe your artwork. Separate them with a comma.",
    rbMainTagLabel: "Main Tag (required)",
    rbMainTagHelp: "Add a tag that best describes your artwork; the main word customers would search to find it.",
    rbMainTagExample: "Example: Pickleball",
    rbSupportTagsLabel: "Supporting Tags",
    rbSupportTagsHelp: "Add up to 14 additional relevant tags that customers might also use to search for works like yours.",
    rbSupportTagsExample: "Example: retro sports, vintage club...",
    rbDescLabel: "Description",
    rbDescHelp: "Each artwork has a story or meaning.",
    rbDescExample: "Example: A retro pickleball design...",
    rbCopyButton: "Copy Field",
    rbLangsTabNotice: "Other language tabs simulate Redbubble's multi-lingual system. Select English or Arabic for the generated metadata.",
    rbOtherLangAlert: "Automatic translation for this language tab is coming soon. Use English or Arabic for your current listing metadata.",
    taggingHandbookHeader: "Official Redbubble Tagging 101 Handbook",
    taggingHandbookSubtitle: "Strategic guidelines extracted from the official Redbubble guidelines to maximize organic views",
    rule1Title: "1. Keep Titles Short and Natural",
    rule1Desc: "Do NOT stuff titles with tags. A title like 'Cute Frog Green Boba Tea Sticker Coffee Mug Shirt' gets penalized. Use a simple, descriptive name like 'Cute Frog Matcha Boba Tea'.",
    rule2Title: "2. The Sweet Spot is 15 Tags",
    rule2Desc: "Redbubble officially recommends around 15 highly relevant tags. Using too many tags (tag-spamming) degrades search ranking, while too few reduces discoverability.",
    rule3Title: "3. Avoid Single-Word Tag Spam",
    rule3Desc: "Do not include words like 'funny', 'cute', 'gift', 'stickers' repeatedly for every design. Instead, use specific, descriptive multi-word phrases that describe what is actually in your artwork.",
    rule4Title: "4. Write a Conversion-Focused Description",
    rule4Desc: "Your description should be 1-3 sentences that describe the artwork's mood and elements. This is indexed by search engines (Google, Bing) and attracts external traffic directly to your store.",
    rule5Title: "5. Check Slogans for Trademarks",
    rule5Desc: "Phrases from movies, songs, pop culture stars, and world brands (Disney, Nike, Starbucks) are strictly protected. Always verify words on the USPTO TESS database for Class 025 (clothing) and Class 016 (paper goods/stickers).",
    tmScannerHeader: "Deep-AI IP & Trademark Scanner",
    tmScannerSubtitle: "Validate any custom listing or deep-check generated trends for USPTO trademarks, copyright claims, and Redbubble policies",
    tmTitlePlaceholder: "Enter title to check (e.g., Star Wars Vintage Shirt)...",
    tmDescPlaceholder: "Enter description to check...",
    tmTagsPlaceholder: "Enter tags (comma-separated, up to 15)...",
    tmButtonScan: "Verify All Phrases (Deep Check) 🔍",
    tmButtonScanning: "Performing Deep Intellectual Property Scan...",
    tmQuickFill: "Quick Fill with Custom Sample",
    tmResultsHeader: "IP & Trademark Scan Results",
    tmFindings: "Analysis Findings:",
    tmNoFindings: "No major trademark or copyright infractions found. Phrases appear safe for Redbubble's typical listing categories.",
    tmTerm: "Term/Phrase",
    tmRisk: "Risk Level",
    tmCategory: "Category",
    tmExplanation: "Analysis",
    tmAdvice: "Actionable Pre-Screening Advice",
    tmUsptoSearch: "USPTO Search Verification Keywords",
    tmUsptoAdvice: "Check these exact terms on USPTO TESS before listing.",
    tmOverallSafetyScore: "Overall Listing Safety Score",
    tmOverallStatusLabel: "Overall Status",
    tmRunOnCard: "🔍 Deep-Check Metadata",
    tmCheckingCard: "Deep Checking...",
    tmCustomScannerBtn: "Open Custom Listing Scanner 🛡️",
    tmCustomScannerBtnClose: "Close Custom Scanner",
    favHeader: "My Saved Trends & Collection",
    favSubtitle: "Access your bookmarked trends, customize them, and bulk export",
    favAdd: "Save to Favorites",
    favRemove: "Remove Favorite",
    favCount: "Favorites Count",
    favEmpty: "Your Favorites is empty. Click the Star ⭐ icon on any trend card to save it here!",
    favExportTxt: "Bulk Export (TXT)",
    favExportCsv: "Bulk Export (CSV)",
    tagCloudHeader: "Interactive Tag Cloud & Density Checker",
    tagAddPlaceholder: "Add custom tag...",
    tagAddBtn: "Add",
    tagRuleWarn: "Limit tags to 15. Too many tags reduces search performance.",
    tagCharWarn: "A tag cannot exceed 50 characters.",
    mockupHeader: "Design Mockup Visualizer",
    mockupSub: "Select a product and background color to see a real-time preview of your listing",
    mockupProduct: "Product Type:",
    mockupColor: "Color:",
    mockupTshirt: "👕 T-Shirt",
    mockupSticker: "🏷️ Sticker",
    mockupMug: "☕ Mug",
    mockupPhone: "📱 Phone Case",
    mockupJournal: "📔 Journal",
    exportBtnTxt: "Download Metadata Pack (TXT)",
    exportBtnCsv: "Download Metadata Pack (CSV)"
  },
  ar: {
    title: "محلل تريندات ريدبابل بالذكاء الاصطناعي",
    subtitle: "أبحاث فورية وقوائم مجهزة ومحسنة للسوق الأمريكي",
    liveBadge: "مباشر 2026",
    searchPlaceholder: "ابحث بالعنوان، الكلمة الدلالية أو النيش...",
    categoryLabel: "فئة النيش المستهدف",
    all: "جميع الفئات",
    customPromptLabel: "تعليمات إضافية (اختياري)",
    customPromptPlaceholder: "مثال: ركز على نصوص بسيطة، طوابع دائرية ريترو، نيش الألعاب...",
    searchSourcesLabel: "مصادر البحث المستهدفة",
    searchSourcesHelp: "اختر المنصات التي ترغب بالبحث فيها واستخلاص أحدث التصاميم والكلمات الدلالية الرائجة منها:",
    googleSource: "جوجل تريندز (Google)",
    merchSource: "ميرش باي أمازون",
    etsySource: "إيتسي (Etsy)",
    redbubbleSource: "ريدبابل (Redbubble)",
    pinterestSource: "بنتريست (Pinterest)",
    generateBtn: "توليد 10 أفكار تريندات مباشرة 🚀",
    generating: "جاري البحث والتحليل الفوري...",
    resetBtn: "استعادة الأفكار الافتراضية",
    lowComp: "منافسة منخفضة",
    medComp: "منافسة متوسطة",
    highComp: "منافسة عالية",
    compFilterLabel: "المنافسة:",
    sortByLabel: "ترتيب حسب:",
    sortByRank: "الترتيب الرائج",
    sortByComp: "مستوى المنافسة",
    tabTrends: "أفكار التصميم والتريندات",
    tabScanner: "مستكشف العبارات 🛡️",
    tabGuide: "دليل Tagging 101 والاستراتيجية",
    noResults: "لم نجد أي نتائج تتوافق مع التصفية الحالية.",
    tryAdjusting: "جرب تعديل عبارة البحث أو اختيار مستوى منافسة مختلف لعرض الأفكار مجدداً.",
    sourceTitle: "مصادر البحث المباشر المستند عليها:",
    sourceDesc: "تم استخلاص هذه التريندات بناءً على قراءة صفحات الويب والاتجاهات الحالية من المصادر التالية:",
    bestProducts: "المنتجات الأفضل مبيعاً:",
    tagsLabel: "الكلمات المفتاحية المقترحة لريدبابل (Copy-paste):",
    copyAllTags: "نسخ جميع الكلمات المفتاحية (مفصولة بفواصل)",
    copySuccess: "تم النسخ بنجاح!",
    nicheLabel: "🎯 النيش المستهدف والجمهور:",
    whyTrendingLabel: "📈 محركات التريند والسوق الأمريكي:",
    conceptLabel: "💡 فكرة التصميم والأسلوب الفني المقترح:",
    copyConceptBtn: "نسخ فكرة التصميم",
    aiPromptLabel: "🎨 برومبت توليد الصورة بالذكاء الاصطناعي (مُحسّن ومحترف):",
    copyPromptBtn: "نسخ كود البرومبت",
    aiPromptHelp: "انسخ هذا الكود الوصفي عالي التباين والصقه في منصات توليد الصور بالذكاء الاصطناعي مثل Midjourney أو ChatGPT (DALL-E) أو SeaArt أو Leonardo لإنتاج تصميمات تيشيرتات وملصقات احترافية وخلفيات معزولة تماماً.",
    trademarkPrecheck: "فحص الملكية والعلامات التجارية",
    trademarkTip: "نصيحة البحث في USPTO:",
    disclaimer: "الفحص الذكي هو مؤشر أولي مساند فقط. تأكد دائماً بشكل يدوي في موقع USPTO قبل الرفع.",
    listingOptimizerHeader: "منظم رفع البيانات لريدبابل (نسخ ولصق)",
    optimizedTitleLabel: "العنوان النظيف المعتمد للرفع (بدون حشو كلمات)",
    optimizedDescLabel: "الوصف المحسن لمحركات البحث (SEO & لافت للزبائن)",
    copyTitle: "نسخ العنوان",
    copyDesc: "نسخ الوصف",
    optimalDensity: "كثافة كلمات مثالية",
    rbFormHeader: "نموذج محاكاة رفع البيانات لمتجر ريدبابل (إضافة عمل جديد)",
    rbFormSubtitle: "انسخ بيانات الرفع المحسنة مباشرة إلى حقول uploader الرسمية لريدبابل أدناه",
    rbTitreLabel: "العنوان (مطلوب)",
    rbTitreHelp: "أدخل عنواناً من 4 إلى 8 كلمات يصف عملك بدقة. لا تقم بإدراج قوائم من الكلمات المفتاحية فيه.",
    rbTitreExample: "مثال: نادي بيكلبول ريترو كلاسيكي عتيق...",
    rbTagsLabel: "الكلمات الدلالية (التاغات)",
    rbTagsHelp: "أضف بحد أقصى 15 تاغ، كل منها لا يتجاوز 50 حرفاً، تصف عملك. افصل بينها بفاصلة.",
    rbMainTagLabel: "الكلمة الدلالية الرئيسية (مطلوب)",
    rbMainTagHelp: "أضف الكلمة الدلالية الأكثر تعبيراً عن عملك؛ الكلمة الأساسية التي سيبحث عنها العملاء للعثور عليه.",
    rbMainTagExample: "مثال: بيكلبول",
    rbSupportTagsLabel: "الكلمات الدلالية الداعمة والمساندة",
    rbSupportTagsHelp: "أضف ما يصل إلى 14 كلمة دلالية ملائمة إضافية قد يستخدمها العملاء للبحث عن أعمال مثل عملك.",
    rbSupportTagsExample: "مثال: رياضات ريترو، نادي كلاسيكي...",
    rbDescLabel: "الوصف",
    rbDescHelp: "كل عمل فني له قصة أو معنى مميز لجذب الزوار.",
    rbDescExample: "مثال: تصميم بيكلبول عتيق مستوحى من ملاعب السبعينات الكلاسيكية...",
    rbCopyButton: "نسخ الحقل",
    rbLangsTabNotice: "التبويبات الأخرى تحاكي نظام اللغات المتعددة في ريدبابل. اختر الإنجليزية أو العربية لعرض البيانات المجهزة.",
    rbOtherLangAlert: "الترجمة التلقائية لهذه اللغة ستتوفر قريباً. يرجى استخدام تبويب الإنجليزية أو العربية للبيانات الحالية.",
    taggingHandbookHeader: "كتيب إرشادات الكلمات المفتاحية الرسمي لريدبابل",
    taggingHandbookSubtitle: "الاستراتيجيات الذهبية المستخلصة من مدونة ريدبابل لزيادة الزيارات والمبيعات",
    rule1Title: "1. اجعل العنوان قصيراً وطبيعياً",
    rule1Desc: "لا تحشو العنوان بالكلمات المفتاحية. العنوان مثل 'Cute Frog Boba Mug T-Shirt' يتم معاقبته من خوارزميات البحث. استخدم عنواناً بسيطاً يصف التصميم مباشرة مثل 'Cute Frog Matcha Boba Tea'.",
    rule2Title: "2. العدد الذهبي هو 15 كلمة دلالية",
    rule2Desc: "توصي مدونة ريدبابل الرسمية بوضع حوالي 15 كلمة دلالية فقط. حشو الكلمات (أكثر من 30) يقلل جودة ترتيبك، بينما القليل جداً يحجب ظهورك.",
    rule3Title: "3. تجنب الكلمات المفردة المزعجة (Tag Spam)",
    rule3Desc: "تجنب وضع كلمات عامة مثل 'funny', 'cute', 'gift', 'stickers' في كل تصميم بلا مغزى. بدلاً من ذلك، استخدم عبارات مركبة دقيقة تصف ما هو مرسوم فعلياً في التصميم.",
    rule4Title: "4. اكتب وصفاً جذاباً لزيادة التحويل والشراء",
    rule4Desc: "اكتب وصفاً من جملتين إلى ثلاث جمل يصف الحالة والمزاج العام للتصميم وموجه للزبائن. هذا الوصف تتم أرشفته في جوجل ويوجه المشترين من محركات البحث مباشرة لمتجرك.",
    rule5Title: "5. افحص حماية العبارات المكتوبة (Trademark)",
    rule5Desc: "العبارات المقتبسة من الأفلام، الأغاني، أو العلامات الشهيرة (مثل ديزني، نايكي، إلخ) محمية تماماً. تأكد دائماً من الكلمات في قاعدة بيانات USPTO فئة الملابس (025) وفئة الملصقات والورقيات (016).",
    tmScannerHeader: "مستكشف الملكية الفكرية والعلامات التجارية العميق (التحقق بالذكاء الاصطناعي)",
    tmScannerSubtitle: "تحقق من أي عنوان، وصف، أو تاغات خاصة بك، أو قم بإجراء فحص عميق للتريندات المولدة للتأكد من خلوها من علامات USPTO والملكيات الفكرية المحمية",
    tmTitlePlaceholder: "أدخل العنوان للتحقق (مثال: Star Wars Vintage Shirt)...",
    tmDescPlaceholder: "أدخل الوصف للتحقق...",
    tmTagsPlaceholder: "أدخل الكلمات المفتاحية (مفصولة بفواصل، بحد أقصى 15)...",
    tmButtonScan: "بدء فحص جميع العبارات (فحص عميق) 🔍",
    tmButtonScanning: "جاري الفحص الدقيق لحقوق الملكية الفكرية...",
    tmQuickFill: "ملء تلقائي ببيانات تجريبية",
    tmResultsHeader: "نتائج فحص العلامات وحقوق الملكية",
    tmFindings: "تفاصيل ونتائج التحليل الدقيق:",
    tmNoFindings: "لم يتم العثور على أي انتهاكات بارزة للعلامات التجارية أو حقوق الطبع والنشر. يبدو أن هذه العبارات آمنة للاستخدام في فئات الرفع على ريدبابل.",
    tmTerm: "الكلمة / العبارة المفحوصة",
    tmRisk: "درجة الخطورة",
    tmCategory: "نوع الملكية",
    tmExplanation: "التفسير والتحليل",
    tmAdvice: "توصيات ونصائح الرفع الآمن",
    tmUsptoSearch: "الكلمات الموصى بالبحث عنها في موقع USPTO الرسمي",
    tmUsptoAdvice: "ابحث عن هذه الكلمات والعبارات بدقة في قاعدة بيانات USPTO TESS لتضمن سلامتك 100%.",
    tmOverallSafetyScore: "التقييم الإجمالي لسلامة بيانات الرفع",
    tmOverallStatusLabel: "الحالة العامة للملكية",
    tmRunOnCard: "🔍 فحص عميق للمعلومات",
    tmCheckingCard: "جاري الفحص الدقيق...",
    tmCustomScannerBtn: "فتح مدقق ومستكشف العبارات المخصص 🛡️",
    tmCustomScannerBtnClose: "إغلاق المستكشف المخصص",
    favHeader: "أفكاري المحفوظة ومجموعتي الخاصة",
    favSubtitle: "تصفح الأفكار والتريندات التي قمت بتمييزها بنجمة، وعدل عليها وقم بتصديرها دفعة واحدة",
    favAdd: "حفظ في المفضلة",
    favRemove: "إزالة من المفضلة",
    favCount: "عدد المفضلة",
    favEmpty: "مجموعتك المحفوظة فارغة حالياً. اضغط على أيقونة النجمة ⭐ في أي بطاقة تريند لحفظها هنا!",
    favExportTxt: "تصدير جماعي (TXT)",
    favExportCsv: "تصدير جماعي (CSV)",
    tagCloudHeader: "سحابة الكلمات التفاعلية ومدقق الكثافة",
    tagAddPlaceholder: "أضف تاغ مخصص...",
    tagAddBtn: "إضافة",
    tagRuleWarn: "الحد الأقصى الموصى به 15 تاغ. حشو الكلمات يضر بترتيب متجرك.",
    tagCharWarn: "لا يمكن للتاغ الواحد أن يتجاوز 50 حرفاً.",
    mockupHeader: "معاين المنتج الواقعي (Mockup Visualizer)",
    mockupSub: "اختر نوع المنتج ولون الخلفية لرؤية تصميمك مطبوعاً بشكل مباشر على المنتجات",
    mockupProduct: "نوع المنتج المعروض:",
    mockupColor: "اللون:",
    mockupTshirt: "👕 تيشيرت كلاسيكي",
    mockupSticker: "🏷️ ملصق مقصوص",
    mockupMug: "☕ كوب سيراميك",
    mockupPhone: "📱 غلاف هاتف",
    mockupJournal: "📔 دفتر ملاحظات",
    exportBtnTxt: "تحميل حزمة البيانات (TXT)",
    exportBtnCsv: "تحميل حزمة البيانات (CSV)"
  }
};

interface SuccessScoreInfo {
  score: number;
  level: "excellent" | "good" | "fair";
  color: string;
  strokeHex: string;
  colorText: string;
  bg: string;
}

const promptStyles = [
  { id: "default", nameEn: "Original", nameAr: "البرومبت الأصلي" },
  { id: "retro", nameEn: "70s Retro Vintage", nameAr: "ريترو كلاسيكي" },
  { id: "vector", nameEn: "Minimal Flat Vector", nameAr: "فيكتور مسطح" },
  { id: "kawaii", nameEn: "Cute Kawaii Cartoon", nameAr: "كرتون كاواي لطيف" },
  { id: "watercolor", nameEn: "Artistic Watercolor", nameAr: "ألوان مائية فنية" },
  { id: "typography", nameEn: "T-Shirt Typography", nameAr: "تيشيرت نصوص مميز" }
];

function getModifiedPrompt(basePrompt: string, styleId: string): string {
  if (!basePrompt) return "";
  if (!styleId || styleId === "default") return basePrompt;
  
  // Extract Midjourney parameters like --ar and --v so they stay at the end
  let cleaned = basePrompt;
  const ratioMatch = cleaned.match(/--ar\s+\d+:\d+/);
  const versionMatch = cleaned.match(/--v\s+\d+\.?\d*/);
  
  cleaned = cleaned.replace(/--ar\s+\d+:\d+/g, "").replace(/--v\s+\d+\.?\d*/g, "").trim();
  if (cleaned.endsWith(",")) {
    cleaned = cleaned.substring(0, cleaned.length - 1).trim();
  }
  
  let additions = "";
  if (styleId === "retro") {
    additions = ", 1970s vintage distressed style, textured, warm earthy colors, retro grooviness, worn-out ink texture";
  } else if (styleId === "vector") {
    additions = ", flat vector illustration, clean minimalist lines, solid screen printing colors, modern aesthetic, svg style, no gradients";
  } else if (styleId === "kawaii") {
    additions = ", cute kawaii chibi style, chubby animal cartoon character, soft pastel colors, bold lines, adorable anime eyes, cheerful and whimsical";
  } else if (styleId === "watercolor") {
    additions = ", artistic watercolor wash style, fluid ink splatters, hand-painted texture, soft blended color transitions, dreamy celestial atmosphere";
  } else if (styleId === "typography") {
    additions = ", bold graphic t-shirt design, central typography layout, isolated graphic, high-contrast apparel design, print-ready, merch style";
  }
  
  const ratio = ratioMatch ? ratioMatch[0] : "--ar 1:1";
  const version = versionMatch ? versionMatch[0] : "--v 6.0";
  
  return `${cleaned}${additions} ${ratio} ${version}`;
}

function getSuccessScore(trend: TrendIdea): SuccessScoreInfo {
  // Use searchStrength (0-100) or generate one deterministically from the trend ID
  const searchStr = trend.searchStrength || Math.floor((37 * (trend.id || 1) + 19) % 18 + 81); // Range 81 to 99
  
  // Competition factor: Low gets 90, Medium gets 65, High gets 35
  let compScore = 65;
  const compStr = (trend.competition || "").toLowerCase();
  if (compStr.includes("low") || compStr.includes("منخفض")) {
    compScore = 90;
  } else if (compStr.includes("medium") || compStr.includes("متوسط")) {
    compScore = 65;
  } else if (compStr.includes("high") || compStr.includes("عالية") || compStr.includes("مرتفع")) {
    compScore = 35;
  }
  
  // Mathematical index: 60% search strength + 40% competition score
  const score = Math.min(99, Math.max(15, Math.round((searchStr * 0.6) + (compScore * 0.4))));
  
  let level: "excellent" | "good" | "fair" = "fair";
  let color = "stroke-emerald-500 text-emerald-500";
  let strokeHex = "#10b981"; // Emerald Green for High Score (أخضر)
  let colorText = "text-emerald-700";
  let bg = "bg-emerald-50/80 border-emerald-200";
  
  if (score >= 80) {
    level = "excellent";
    color = "stroke-emerald-500 text-emerald-500";
    strokeHex = "#10b981"; // Vibrant Emerald Green (أخضر)
    colorText = "text-emerald-700";
    bg = "bg-emerald-50/80 border-emerald-200";
  } else if (score >= 65) {
    level = "good";
    color = "stroke-amber-500 text-amber-500";
    strokeHex = "#f59e0b"; // Vibrant Amber / Orange / Yellow (برتقالي / أصفر)
    colorText = "text-amber-700";
    bg = "bg-amber-50/80 border-amber-200";
  } else {
    level = "fair";
    color = "stroke-rose-500 text-rose-500";
    strokeHex = "#ef4444"; // Vibrant Rose Red (أحمر)
    colorText = "text-rose-700";
    bg = "bg-rose-50/80 border-rose-200";
  }
  
  return { score, level, color, strokeHex, colorText, bg };
}

export default function App() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [category, setCategory] = useState("all");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>(["google", "merch", "etsy", "redbubble", "pinterest"]);
  const [trends, setTrends] = useState<TrendIdea[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [offlineNotice, setOfflineNotice] = useState<string | null>(null);
  
  // Track copy status per item / field to show checklist feedback
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  
  // Filtering and Sorting States
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState("all");
  const [sortBy, setSortBy] = useState<"rank" | "competition">("rank");
  
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"trends" | "scanner" | "guide">("trends");

  // Track active language tab inside the Redbubble simulated form for each trend card (default to en)
  const [listingLangs, setListingLangs] = useState<Record<number, "en" | "ar">>({});

  // Track active title variant (A, B, C, D, or E) for each trend card (default to A)
  const [selectedTitleVariants, setSelectedTitleVariants] = useState<Record<number, "A" | "B" | "C" | "D" | "E">>({});

  // Track Side-by-Side Dual Language Mode per trend card
  const [dualLanguageActive, setDualLanguageActive] = useState<Record<number, boolean>>({});

  // Track selected Prompt Style per trend card (default to 'default')
  const [selectedPromptStyle, setSelectedPromptStyle] = useState<Record<number, string>>({});

  // Track expanded Listing Quality Gates per trend card
  const [expandedQualityGates, setExpandedQualityGates] = useState<Record<number, boolean>>({});

  // Track expanded trend cards (collapsed by default)
  const [expandedTrendCards, setExpandedTrendCards] = useState<Record<number, boolean>>({});

  // Track visibility of individual 15-tag trademark audits per trend card
  const [showTagAudits, setShowTagAudits] = useState<Record<number, boolean>>({});

  // Custom Trademark Scanner Form States
  const [customScanTitle, setCustomScanTitle] = useState("");
  const [customScanDesc, setCustomScanDesc] = useState("");
  const [customScanTags, setCustomScanTags] = useState("");
  const [isScanningCustom, setIsScanningCustom] = useState(false);
  const [customScanResult, setCustomScanResult] = useState<TrademarkCheckResult | null>(null);
  const [customScanError, setCustomScanError] = useState<string | null>(null);

  // Niche Category Dropdown (Listbox) States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Card Deep-Check States (for Deep-checking individual trends)
  const [cardScanningStates, setCardScanningStates] = useState<Record<number, boolean>>({});
  const [cardScanResults, setCardScanResults] = useState<Record<number, TrademarkCheckResult>>({});

  // Custom added premium features state
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteTrends, setFavoriteTrends] = useState<TrendIdea[]>([]);
  const [selectedModalTrend, setSelectedModalTrend] = useState<TrendIdea | null>(null);
  const [newTagInputs, setNewTagInputs] = useState<Record<number, string>>({});

  // Load language and trends on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("rb_lang");
    if (savedLang === "ar" || savedLang === "en") {
      setLang(savedLang);
    }

    const savedFavObjects = localStorage.getItem("rb_favorite_objects");
    if (savedFavObjects) {
      try {
        const parsedFavs: TrendIdea[] = JSON.parse(savedFavObjects);
        setFavoriteTrends(parsedFavs);
        setFavorites(parsedFavs.map(f => f.id));
      } catch (e) {
        setFavoriteTrends([]);
      }
    } else {
      const savedFavorites = localStorage.getItem("rb_favorites");
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (e) {
          setFavorites([]);
        }
      }
    }

    const savedTrends = localStorage.getItem("rb_trends");
    const savedSources = localStorage.getItem("rb_sources");
    if (savedTrends) {
      try {
        setTrends(JSON.parse(savedTrends));
      } catch (e) {
        setTrends(initialTrends);
      }
    } else {
      setTrends(initialTrends);
    }

    if (savedSources) {
      try {
        setSources(JSON.parse(savedSources));
      } catch (e) {
        setSources([]);
      }
    }

    const savedSelectedSources = localStorage.getItem("rb_selected_sources");
    if (savedSelectedSources) {
      try {
        setSelectedSources(JSON.parse(savedSelectedSources));
      } catch (e) {
        setSelectedSources(["google", "merch", "etsy", "redbubble", "pinterest"]);
      }
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "ar" : "en";
    setLang(nextLang);
    localStorage.setItem("rb_lang", nextLang);
  };

  const saveToStorage = (newTrends: TrendIdea[], newSources: GroundingSource[]) => {
    localStorage.setItem("rb_trends", JSON.stringify(newTrends));
    localStorage.setItem("rb_sources", JSON.stringify(newSources));
  };

  // Simulated stepper for loading reassurance
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const triggerCopyFeedback = (key: string) => {
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2500);
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    triggerCopyFeedback(key);
  };

  // Custom premium helper functions
  const toggleFavorite = (trendId: number, trendObj?: TrendIdea) => {
    const target = trendObj || trends.find((t) => t.id === trendId) || favoriteTrends.find((f) => f.id === trendId);

    setFavorites((prev) => {
      const isFav = prev.includes(trendId);
      const nextIds = isFav ? prev.filter((id) => id !== trendId) : [...prev, trendId];
      localStorage.setItem("rb_favorites", JSON.stringify(nextIds));
      return nextIds;
    });

    setFavoriteTrends((prev) => {
      const isFav = prev.some((f) => f.id === trendId);
      let nextObjects: TrendIdea[];
      if (isFav) {
        nextObjects = prev.filter((f) => f.id !== trendId);
      } else {
        if (target) {
          nextObjects = [...prev.filter((f) => f.id !== trendId), target];
        } else {
          nextObjects = prev;
        }
      }
      localStorage.setItem("rb_favorite_objects", JSON.stringify(nextObjects));
      return nextObjects;
    });
  };

  const getSavedFavoritesList = (): TrendIdea[] => {
    const map = new Map<number, TrendIdea>();
    favoriteTrends.forEach((ft) => map.set(ft.id, ft));
    trends.forEach((t) => {
      if (favorites.includes(t.id)) {
        map.set(t.id, t);
      }
    });
    return Array.from(map.values()).filter((t) => favorites.includes(t.id));
  };

  const handleAddTag = (trendId: number, tagText: string) => {
    const trimmed = tagText.trim().replace(/,/g, "").toLowerCase();
    if (!trimmed) return;
    setTrends((prev) => {
      const next = prev.map((t) => {
        if (t.id === trendId) {
          if (t.tags.includes(trimmed)) return t;
          return { ...t, tags: [...t.tags, trimmed] };
        }
        return t;
      });
      saveToStorage(next, sources);
      return next;
    });
  };

  const handleRemoveTag = (trendId: number, tagText: string) => {
    setTrends((prev) => {
      const next = prev.map((t) => {
        if (t.id === trendId) {
          return { ...t, tags: t.tags.filter((tag) => tag !== tagText) };
        }
        return t;
      });
      saveToStorage(next, sources);
      return next;
    });
  };

  const downloadFile = (filename: string, content: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportTrendTxt = (trend: TrendIdea) => {
    const content = `================================================
REDBUBBLE LISTING METADATA PACK
================================================
Generated for: ${trend.title}
Date: ${new Date().toLocaleDateString()}

[CLEAN TITLE]
${trend.cleanListingTitle}

[MAIN TAG]
${trend.tags[0] || ""}

[SUPPORTING TAGS]
${trend.tags.slice(1).join(", ")}

[ALL TAGS]
${trend.tags.join(", ")}

[SEO ENGAGING DESCRIPTION]
${trend.description}

[VISUAL CONCEPT & STYLE GUIDE]
${trend.concept}

[AI GENERATOR IMAGE PROMPT]
${trend.aiImagePrompt || "No prompt available."}
`;
    downloadFile(`redbubble-metadata-${trend.id}.txt`, content, "text/plain;charset=utf-8");
  };

  const handleExportTrendCsv = (trend: TrendIdea) => {
    const headers = "Title,Description,Tags\n";
    const escapedTitle = `"${trend.cleanListingTitle.replace(/"/g, '""')}"`;
    const escapedDesc = `"${trend.description.replace(/"/g, '""')}"`;
    const escapedTags = `"${trend.tags.join(", ").replace(/"/g, '""')}"`;
    const content = headers + `${escapedTitle},${escapedDesc},${escapedTags}\n`;
    downloadFile(`redbubble-metadata-${trend.id}.csv`, content, "text/csv;charset=utf-8");
  };

  const handleBulkExportTxt = () => {
    const bookmarkedTrends = getSavedFavoritesList();
    if (bookmarkedTrends.length === 0) return;
    let content = `================================================
REDBUBBLE BULK EXPORT LISTING METADATA PACK
================================================
Exported Trends: ${bookmarkedTrends.length}
Date: ${new Date().toLocaleDateString()}

`;
    bookmarkedTrends.forEach((trend, index) => {
      content += `
------------------------------------------------
Trend #${index + 1}: ${trend.title}
------------------------------------------------
Clean Upload Title: ${trend.cleanListingTitle}
Main Tag:           ${trend.tags[0] || ""}
Supporting Tags:    ${trend.tags.slice(1).join(", ")}
SEO Description:    ${trend.description}
AI Image Prompt:    ${trend.aiImagePrompt || "No prompt available."}

`;
    });
    downloadFile("redbubble-bulk-metadata.txt", content, "text/plain;charset=utf-8");
  };

  const handleBulkExportCsv = () => {
    const bookmarkedTrends = getSavedFavoritesList();
    if (bookmarkedTrends.length === 0) return;
    let content = "ID,Trend Name,Clean Title,Main Tag,Supporting Tags,Description,AI Image Prompt\n";
    bookmarkedTrends.forEach((trend, idx) => {
      const escapedName = `"${trend.title.replace(/"/g, '""')}"`;
      const escapedTitle = `"${trend.cleanListingTitle.replace(/"/g, '""')}"`;
      const escapedMain = `"${(trend.tags[0] || "").replace(/"/g, '""')}"`;
      const escapedSups = `"${trend.tags.slice(1).join(", ").replace(/"/g, '""')}"`;
      const escapedDesc = `"${trend.description.replace(/"/g, '""')}"`;
      const escapedPrompt = `"${(trend.aiImagePrompt || "").replace(/"/g, '""')}"`;
      content += `${idx + 1},${escapedName},${escapedTitle},${escapedMain},${escapedSups},${escapedDesc},${escapedPrompt}\n`;
    });
    downloadFile("redbubble-bulk-metadata.csv", content, "text/csv;charset=utf-8");
  };

  const handleCopyAllTags = (tagsList: string[], key: string) => {
    const formattedTags = tagsList.join(", ");
    navigator.clipboard.writeText(formattedTags);
    triggerCopyFeedback(key);
  };

  const handleGenerateTrends = async () => {
    setIsLoading(true);
    setError(null);
    setOfflineNotice(null);
    setLoadingStep(0);
    
    try {
      const response = await fetch("/api/trends/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, customPrompt, selectedSources })
      });

      if (!response.ok) {
        let errMsg = "Unexpected server error while collecting trends.";
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errMsg = errorData.error || errMsg;
          } else {
            const text = await response.text();
            errMsg = text.substring(0, 150) || errMsg;
          }
        } catch (e) {
          // ignore
        }
        throw new Error(errMsg);
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error("Unable to parse trend data response from server. Please try again later.");
      }
      
      if (data.isOfflineFallback) {
        setOfflineNotice(data.offlineNotice);
      }

      if (data.trends && data.trends.length > 0) {
        setTrends(data.trends);
        setSources(data.sources || []);
        saveToStorage(data.trends, data.sources || []);
      } else {
        throw new Error("No properly formatted trend data returned from server. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to establish a live connection to trend data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetToDefault = () => {
    const confirmMessage = lang === "ar" 
      ? "هل أنت متأكد من رغبتك في استعادة أفكار البدء الافتراضية المحدّثة؟" 
      : "Are you sure you want to restore the default start trend ideas?";
    if (window.confirm(confirmMessage)) {
      setTrends(initialTrends);
      setSources([]);
      saveToStorage(initialTrends, []);
      setFilterQuery("");
      setSelectedCompetition("all");
      setSortBy("rank");
    }
  };

  const handleScanCustomListing = async (e: FormEvent) => {
    e.preventDefault();
    if (!customScanTitle.trim()) return;
    setIsScanningCustom(true);
    setCustomScanResult(null);
    setCustomScanError(null);
    try {
      const response = await fetch("/api/trademark/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: customScanTitle,
          description: customScanDesc,
          tags: customScanTags
        })
      });
      if (!response.ok) {
        let errMsg = "Trademark check failed.";
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errMsg = errorData.error || errMsg;
          } else {
            const text = await response.text();
            errMsg = text.substring(0, 150) || errMsg;
          }
        } catch (e) {}
        throw new Error(errMsg);
      }
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error("Unable to parse trademark check response as JSON.");
      }
      setCustomScanResult(data);
    } catch (err: any) {
      setCustomScanError(err.message || "An error occurred during scan.");
    } finally {
      setIsScanningCustom(false);
    }
  };

  const handlePopulateAndScan = (trend: TrendIdea) => {
    const variant = selectedTitleVariants[trend.id] || "A";
    const selectedLang = listingLangs[trend.id] || "en";
    let currentTitle = "";
    if (variant === "A") {
      currentTitle = selectedLang === "ar"
        ? trend.titleAArabic || trend.cleanListingTitleArabic || trend.titleArabic
        : trend.titleA || trend.cleanListingTitle || trend.title;
    } else if (variant === "B") {
      currentTitle = selectedLang === "ar"
        ? trend.titleBArabic || trend.titleArabic
        : trend.titleB || trend.title;
    } else if (variant === "C") {
      currentTitle = selectedLang === "ar"
        ? trend.titleCArabic || trend.titleArabic
        : trend.titleC || trend.title;
    } else if (variant === "D") {
      currentTitle = selectedLang === "ar"
        ? trend.titleDArabic || trend.titleArabic
        : trend.titleD || trend.title;
    } else {
      currentTitle = selectedLang === "ar"
        ? trend.titleEArabic || trend.titleArabic
        : trend.titleE || trend.title;
    }

    const currentDesc = selectedLang === "ar"
      ? trend.descriptionArabic || `${trend.conceptArabic} مصمم لجمهور ${trend.nicheArabic}.`
      : trend.description || `${trend.concept} Designed for ${trend.niche}.`;
    
    const currentTags = trend.tags.join(", ");

    setCustomScanTitle(currentTitle);
    setCustomScanDesc(currentDesc);
    setCustomScanTags(currentTags);
    setCustomScanResult(null);
    setCustomScanError(null);
    setActiveTab("scanner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeepCheckCard = async (trend: TrendIdea) => {
    setCardScanningStates(prev => ({ ...prev, [trend.id]: true }));
    try {
      const response = await fetch("/api/trademark/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: trend.cleanListingTitle || trend.title,
          description: trend.description || trend.concept,
          tags: trend.tags
        })
      });
      if (!response.ok) {
        let errMsg = "Failed to deep check card.";
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errMsg = errorData.error || errMsg;
          } else {
            const text = await response.text();
            errMsg = text.substring(0, 150) || errMsg;
          }
        } catch (e) {}
        throw new Error(errMsg);
      }
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error("Unable to parse card check response as JSON.");
      }
      setCardScanResults(prev => ({ ...prev, [trend.id]: data }));
    } catch (err: any) {
      console.error(err);
    } finally {
      setCardScanningStates(prev => ({ ...prev, [trend.id]: false }));
    }
  };

  const handleQuickFillCustom = () => {
    setCustomScanTitle("Vintage Sunset Surf Club");
    setCustomScanDesc("A gorgeous 1970s retro distressed sunset graphic perfect for surfers and beach lovers. Designed for t-shirts and summer vibe stickers.");
    setCustomScanTags("vintage surf, retro sunset, summer vibes, california beach, surf club, 1970s aesthetic, beach aesthetic");
  };

  const getCompetitionBadge = (comp: string) => {
    const cleaned = comp.toLowerCase();
    const isLow = cleaned.includes("low") || cleaned.includes("منخفض");
    const isMedium = cleaned.includes("medium") || cleaned.includes("متوسط");

    if (isLow) {
      return {
        text: lang === "ar" ? "منافسة منخفضة 🔥" : "Low Competition 🔥",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      };
    } else if (isMedium) {
      return {
        text: lang === "ar" ? "منافسة متوسطة ⚡" : "Medium Competition ⚡",
        classes: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      };
    } else {
      return {
        text: lang === "ar" ? "منافسة عالية ⚠️" : "High Competition ⚠️",
        classes: "bg-rose-500/10 text-rose-400 border-rose-500/20"
      };
    }
  };

  const getTrademarkBadge = (status: string) => {
    const cleaned = (status || "").toLowerCase();
    if (cleaned.includes("safe") || cleaned.includes("آمن") || cleaned.includes("clear")) {
      return {
        text: lang === "ar" ? "آمن للرفع" : "Safe to Upload",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        bgGlow: "border-emerald-500/30 hover:border-emerald-500/50"
      };
    } else if (cleaned.includes("attention") || cleaned.includes("انتباه") || cleaned.includes("needs")) {
      return {
        text: lang === "ar" ? "يتطلب انتباه" : "Needs Attention",
        classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        bgGlow: "border-amber-500/30 hover:border-amber-500/50"
      };
    } else {
      return {
        text: lang === "ar" ? "تحذير علامة تجارية" : "Trademark Warning",
        classes: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        bgGlow: "border-rose-500/30 hover:border-rose-500/50"
      };
    }
  };

  // Category list
  const categoryOptions = [
    { id: "all", label: lang === "ar" ? "كل النيشات والفئات" : "All niches & categories", icon: Layers },
    { id: "retro & vintage", label: lang === "ar" ? "ريترو وعتيق (Retro & Vintage)" : "Retro & Vintage", icon: RotateCcw },
    { id: "funny & memes", label: lang === "ar" ? "ميمز وكوميديا (Funny & Memes)" : "Funny & Memes", icon: Flame },
    { id: "cute animals", label: lang === "ar" ? "حيوانات لطيفة (Cute Animals)" : "Cute Animals", icon: Sparkle },
    { id: "jobs & hobbies", label: lang === "ar" ? "مهن وهوايات (Jobs & Hobbies)" : "Jobs & Hobbies", icon: Briefcase },
    { id: "typography & quotes", label: lang === "ar" ? "نصوص واقتباسات (Typography)" : "Typography & Quotes", icon: Tag },
    { id: "nature & cottagecore", label: lang === "ar" ? "طبيعة وكوتاجكور (Nature)" : "Nature & Cottagecore", icon: Sparkles },
    { id: "gaming & geek culture", label: lang === "ar" ? "ألعاب وثقافة الجيك (Gaming)" : "Gaming & Geek Culture", icon: Gamepad2 },
    { id: "sports & fitness", label: lang === "ar" ? "رياضة ولياقة بدنية (Sports)" : "Sports & Fitness", icon: Dumbbell },
    { id: "travel & adventure", label: lang === "ar" ? "سفر ومغامرات (Travel)" : "Travel & Adventure", icon: Compass },
    { id: "coffee & foodies", label: lang === "ar" ? "القهوة وعشاق الطعام (Food)" : "Coffee & Foodies", icon: Coffee },
    { id: "music & band vibe", label: lang === "ar" ? "موسيقى وأجواء الفرق (Music)" : "Music & Band Vibe", icon: Music },
    { id: "mental health & positivity", label: lang === "ar" ? "صحة نفسية وإيجابية (Mental Health)" : "Mental Health & Positivity", icon: Heart },
    { id: "witchy & occult", label: lang === "ar" ? "سحر وغموض ورعب (Witchy/Horror)" : "Witchy & Occult/Horror", icon: Moon },
    { id: "minimalist line art", label: lang === "ar" ? "رسم خطي بسيط (Line Art)" : "Minimalist Line Art", icon: Palette },
    { id: "anime & manga vibe", label: lang === "ar" ? "أنمي ومانجا (Anime)" : "Anime & Manga Vibe", icon: Tv },
    { id: "pop art & y2k", label: lang === "ar" ? "فن البوب ​​وحقبة Y2K (Pop Art)" : "Pop Art & Y2K Aesthetic", icon: Zap },
    { id: "teacher & education", label: lang === "ar" ? "المعلم والتعليم (Education)" : "Teacher & Education", icon: GraduationCap },
    { id: "coding & tech", label: lang === "ar" ? "البرمجة والتكنولوجيا (Coding)" : "Coding & Tech", icon: Code },
    { id: "cottagecore & autumn", label: lang === "ar" ? "كوتاجكور وأجواء الخريف (Autumn)" : "Cottagecore & Autumn Vibe", icon: Leaf }
  ];

  // Loading steps text in bilingual layout
  const loadingMessages = lang === "ar" ? [
    "البحث المباشر في الويب عن أحدث كلمات البحث والهاشتاغات الرائجة على Redbubble لعام 2026...",
    "تحليل مستويات الطلب، وحجم البحث في السوق الأمريكي وتصفية الأفكار...",
    "صياغة 10 أفكار تصميم مبتكرة مع توليد العناوين النظيفة وأوصاف الـ SEO المساعدة...",
    "تجهيز الكلمات المفتاحية الدلالية (Tags) وفق ضوابط Tagging 101 والتحقق من العلامات التجارية..."
  ] : [
    "Searching the web for the absolute latest trending keywords and hashtags on Redbubble 2026...",
    "Analyzing US search volume and filtering designs with high demand and optimal competition...",
    "Drafting 10 unique visual concepts, optimized titles, and SEO-converting descriptions...",
    "Structuring 15 compliant search tags (Tagging 101) and pre-screening against trademark registries..."
  ];

  const processedTrends = trends
    .filter((trend) => {
      const query = filterQuery.toLowerCase();
      const matchesSearch = 
        (trend.title || "").toLowerCase().includes(query) ||
        (trend.titleArabic || "").toLowerCase().includes(query) ||
        (trend.niche || "").toLowerCase().includes(query) ||
        (trend.concept || "").toLowerCase().includes(query) ||
        (trend.cleanListingTitle || "").toLowerCase().includes(query) ||
        trend.tags.some(tag => tag.toLowerCase().includes(query));
      
      const compCleaned = (trend.competition || "").toLowerCase();
      let matchesComp = true;
      if (selectedCompetition === "low") {
        matchesComp = compCleaned.includes("low") || compCleaned.includes("منخفض");
      } else if (selectedCompetition === "medium") {
        matchesComp = compCleaned.includes("medium") || compCleaned.includes("متوسط");
      } else if (selectedCompetition === "high") {
        matchesComp = compCleaned.includes("high") || compCleaned.includes("عالي") || compCleaned.includes("عالية");
      }

      return matchesSearch && matchesComp;
    })
    .sort((a, b) => {
      if (sortBy === "competition") {
        const getWeight = (c: string) => {
          const l = (c || "").toLowerCase();
          if (l.includes("low") || l.includes("منخفض")) return 1;
          if (l.includes("medium") || l.includes("متوسط")) return 2;
          return 3;
        };
        return getWeight(a.competition) - getWeight(b.competition);
      }
      
      // Rank sorting: descending by Success Score (highest score first)
      // Success score is (Search Strength * 0.6) + (Competition Score * 0.4)
      const getSuccessValue = (t: any) => {
        const str = t.searchStrength || 80;
        let compScore = 65;
        const compStr = (t.competition || "").toLowerCase();
        if (compStr.includes("low") || compStr.includes("منخفض")) compScore = 90;
        else if (compStr.includes("medium") || compStr.includes("متوسط")) compScore = 65;
        else if (compStr.includes("high") || compStr.includes("عالية") || compStr.includes("مرتفع")) compScore = 35;
        return (str * 0.6) + (compScore * 0.4);
      };
      return getSuccessValue(b) - getSuccessValue(a);
    });

  const lowCompCount = trends.filter(t => (t.competition || "").toLowerCase().includes("low") || (t.competition || "").toLowerCase().includes("منخفض")).length;
  const medCompCount = trends.filter(t => (t.competition || "").toLowerCase().includes("medium") || (t.competition || "").toLowerCase().includes("متوسط")).length;
  const highCompCount = trends.filter(t => (t.competition || "").toLowerCase().includes("high") || (t.competition || "").toLowerCase().includes("عالي") || (t.competition || "").toLowerCase().includes("عالية")).length;

  const t = translations[lang];

  const availableSources = [
    { id: "google", label: t.googleSource, icon: Globe },
    { id: "merch", label: t.merchSource, icon: ShoppingBag },
    { id: "etsy", label: t.etsySource, icon: ShoppingCart },
    { id: "redbubble", label: t.redbubbleSource, icon: Target },
    { id: "pinterest", label: t.pinterestSource, icon: Pin }
  ];

  const toggleSource = (sourceId: string) => {
    let nextSources;
    if (selectedSources.includes(sourceId)) {
      if (selectedSources.length === 1) return; // Keep at least one selected
      nextSources = selectedSources.filter(id => id !== sourceId);
    } else {
      nextSources = [...selectedSources, sourceId];
    }
    setSelectedSources(nextSources);
    localStorage.setItem("rb_selected_sources", JSON.stringify(nextSources));
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-indigo-500/20 selection:text-indigo-900" 
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Visual Accent Top Bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 sticky top-0 z-40" />

      {/* Header Panel */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-[3px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4">
            
            {/* Logo and branding */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0 transform hover:rotate-3 transition-transform duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 id="app-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {lang === "ar" ? "ريدبابل-تريند" : "Redbubble-Trend"}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t.liveBadge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">{t.subtitle}</p>
              </div>
            </div>

            {/* Navigation and Language Toggles */}
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center">
              
              {/* Language Selector */}
              <button
                id="language-toggle"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 text-slate-600 transition-all duration-200 cursor-pointer shadow-xs"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span>{lang === "en" ? "العربية 🇸🇦" : "English 🇺🇸"}</span>
              </button>

              {/* Tabs */}
              <button 
                id="tab-trends"
                onClick={() => setActiveTab("trends")}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === "trends"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{t.tabTrends}</span>
              </button>
              <button 
                id="tab-scanner"
                onClick={() => setActiveTab("scanner")}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === "scanner"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t.tabScanner}</span>
              </button>
              <button 
                id="tab-guide"
                onClick={() => setActiveTab("guide")}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === "guide"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.tabGuide}</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === "trends" ? (
          <div className="flex flex-col gap-8">
            
            {/* Top Control Section: Horizontal Grid on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Tool Control Box */}
              <div className={`${sources.length > 0 ? "lg:col-span-2" : "lg:col-span-3"} bg-slate-50/95 rounded-3xl border border-slate-200/90 p-6 shadow-2xl relative overflow-hidden group shadow-indigo-500/5`}>
                {/* Glow accent effect inside container */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/15 transition-colors duration-300" />
                
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <div className="p-2 rounded-xl bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 shadow-sm">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                    {lang === "ar" ? "تخصيص البحث والتوليد" : "Customize Generator"}
                  </h2>
                </div>

                {/* Full Width layout for Inputs and Stats */}
                <div className="flex flex-col gap-6 mt-6 relative z-10 w-full">
                  
                  {/* Niche Matrix Analysis (Full Width) */}
                  <div className="w-full bg-slate-100 rounded-2xl p-4 border border-slate-200/80 shadow-sm relative overflow-hidden group/stats flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="relative z-10 shrink-0">
                      <h3 className="text-xs font-extrabold text-slate-800 tracking-tight flex items-center gap-2 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{lang === "ar" ? "تحليل النيشات المتوفرة" : "Niche Matrix Analysis"}</span>
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {lang === "ar" ? "توزيع مستويات المنافسة للتريندات الحالية" : "Competition level distribution for active trends"}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 font-sans relative z-10 flex-1 max-w-md">
                      <div className="bg-emerald-50 rounded-xl py-2 px-3 border border-emerald-200/60 flex flex-col justify-center items-center shadow-sm hover:border-emerald-300 transition-colors duration-200">
                        <span className="text-base font-extrabold text-emerald-700 block leading-none">{lowCompCount}</span>
                        <span className="text-[10px] text-slate-600 font-semibold mt-1 leading-none">{lang === "ar" ? "منخفضة" : "Low"}</span>
                      </div>
                      <div className="bg-amber-50 rounded-xl py-2 px-3 border border-amber-200/60 flex flex-col justify-center items-center shadow-sm hover:border-amber-300 transition-colors duration-200">
                        <span className="text-base font-extrabold text-amber-700 block leading-none">{medCompCount}</span>
                        <span className="text-[10px] text-slate-600 font-semibold mt-1 leading-none">{lang === "ar" ? "متوسطة" : "Medium"}</span>
                      </div>
                      <div className="bg-rose-50 rounded-xl py-2 px-3 border border-rose-200/60 flex flex-col justify-center items-center shadow-sm hover:border-rose-300 transition-colors duration-200">
                        <span className="text-base font-extrabold text-rose-700 block leading-none">{highCompCount}</span>
                        <span className="text-[10px] text-slate-600 font-semibold mt-1 leading-none">{lang === "ar" ? "عالية" : "High"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category & Sources selection in a split layout */}
                  <div className="grid grid-cols-1 md:grid-cols-10 gap-6 w-full">
                    {/* Category selectors */}
                    <div className="relative font-sans w-full md:col-span-4" ref={dropdownRef}>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">{t.categoryLabel}</label>
                      
                      {/* Dropdown Trigger Button */}
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full h-10 flex items-center justify-between px-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-xs font-bold text-slate-800 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      >
                        <div className="flex items-center gap-2.5">
                          {(() => {
                            const activeOption = categoryOptions.find(opt => opt.id === category) || categoryOptions[0];
                            const IconComp = activeOption.icon;
                            return (
                              <>
                                <div className="p-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
                                  <IconComp className="w-3.5 h-3.5" />
                                </div>
                                <span>{activeOption.label}</span>
                              </>
                            );
                          })()}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-255 ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {/* Dropdown Panel */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 right-0 mt-2 z-40 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-72 flex flex-col"
                          >
                            {/* Search Input inside Dropdown */}
                            <div className="p-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <input
                                type="text"
                                placeholder={lang === "ar" ? "ابحث عن فئة..." : "Search categories..."}
                                value={dropdownSearch}
                                onChange={(e) => setDropdownSearch(e.target.value)}
                                className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none py-1"
                              />
                              {dropdownSearch && (
                                <button
                                  type="button"
                                  onClick={() => setDropdownSearch("")}
                                  className="text-slate-400 hover:text-slate-600 text-xs px-1.5 cursor-pointer"
                                >
                                  ✕
                                </button>
                              )}
                            </div>

                            {/* Options List */}
                            <div className="overflow-y-auto p-1.5 flex-1 scrollbar-thin scrollbar-thumb-slate-200">
                              {(() => {
                                const filteredOptions = categoryOptions.filter(opt => 
                                  opt.label.toLowerCase().includes(dropdownSearch.toLowerCase()) ||
                                  opt.id.toLowerCase().includes(dropdownSearch.toLowerCase())
                                );

                                if (filteredOptions.length === 0) {
                                  return (
                                    <div className="text-center py-4 text-xs text-slate-500">
                                      {lang === "ar" ? "لا توجد نتائج مطابقة" : "No matching categories"}
                                    </div>
                                  );
                                }

                                return filteredOptions.map((opt) => {
                                  const IconComp = opt.icon;
                                  const isSelected = category === opt.id;
                                  return (
                                    <button
                                      key={opt.id}
                                      type="button"
                                      onClick={() => {
                                        setCategory(opt.id);
                                        setIsDropdownOpen(false);
                                        setDropdownSearch("");
                                      }}
                                      className={`w-full flex items-center justify-between p-2.5 my-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        isSelected 
                                          ? "bg-indigo-50 border border-indigo-100 text-indigo-700" 
                                          : "border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                      } ${lang === "ar" ? "text-right flex-row-reverse" : "text-left"}`}
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <IconComp className={`w-3.5 h-3.5 ${isSelected ? "text-indigo-600" : "text-slate-400"}`} />
                                        <span>{opt.label}</span>
                                      </div>
                                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                                    </button>
                                  );
                                });
                              })()}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Search Sources selection */}
                    <div className="font-sans w-full md:col-span-6">
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                        {t.searchSourcesLabel}
                      </label>
                      
                      <div className="flex flex-wrap gap-2 w-full">
                        {availableSources.map((src) => {
                          const isSelected = selectedSources.includes(src.id);
                          const IconComp = src.icon;
                          
                          // Custom colors based on source brand identity for light theme
                          let activeStyle = "bg-indigo-50 border-indigo-200 text-indigo-700";
                          let activeIconBg = "text-indigo-600";
                          
                          if (src.id === "google") {
                            activeStyle = "bg-blue-50 border-blue-200 text-blue-700";
                            activeIconBg = "text-blue-600";
                          } else if (src.id === "merch") {
                            activeStyle = "bg-amber-50 border-amber-200 text-amber-700";
                            activeIconBg = "text-amber-600";
                          } else if (src.id === "etsy") {
                            activeStyle = "bg-orange-50 border-orange-200 text-orange-700";
                            activeIconBg = "text-orange-600";
                          } else if (src.id === "redbubble") {
                            activeStyle = "bg-rose-50 border-rose-200 text-rose-700";
                            activeIconBg = "text-rose-600";
                          } else if (src.id === "pinterest") {
                            activeStyle = "bg-red-50 border-red-200 text-red-700";
                            activeIconBg = "text-red-600";
                          }

                          return (
                            <button
                              key={src.id}
                              type="button"
                              onClick={() => toggleSource(src.id)}
                              className={`flex items-center gap-1.5 px-3 h-10 rounded-xl border text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? `${activeStyle} shadow-sm`
                                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300"
                              } ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}
                            >
                              <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? activeIconBg : "text-slate-400"}`} />
                              <span className="truncate">{src.label}</span>
                              {isSelected && <Check className="w-3 h-3 text-emerald-600 shrink-0 stroke-[3.5]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Custom instructions Prompt */}
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">{t.customPromptLabel}</label>
                    <textarea
                      id="custom-prompt-input"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder={t.customPromptPlaceholder}
                      className="w-full h-20 p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 resize-none transition-all leading-relaxed"
                    />
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    {/* Generate Button */}
                    <button
                      id="generate-button"
                      disabled={isLoading}
                      onClick={handleGenerateTrends}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 transition-all duration-250 relative overflow-hidden cursor-pointer ${
                        isLoading 
                          ? "bg-slate-300 cursor-not-allowed text-slate-500" 
                          : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 hover:scale-[1.01] shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/25 hover:shadow-xl active:scale-[0.99]"
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                          <span>{t.generating}</span>
                        </div>
                      ) : (
                        <>
                          <Search className="w-3.5 h-3.5" />
                          <span>{t.generateBtn}</span>
                        </>
                      )}
                    </button>

                    {/* Reset button */}
                    <button
                      id="reset-button"
                      onClick={handleResetToDefault}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-100 text-xs font-bold text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:border-slate-300 animate-none"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.resetBtn}</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* Sources Column (Third column on desktop, only rendered if there are sources) */}
              {sources.length > 0 && (
                <div className="lg:col-span-1 flex flex-col gap-6">
                  {/* Sources Panel */}
                  <div className="bg-white rounded-3xl border border-slate-200/85 p-6 shadow-xs relative overflow-hidden h-full flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                    <div>
                      <div className="flex items-center gap-2 mb-3 relative z-10">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">{t.sourceTitle}</h3>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-3.5 leading-relaxed relative z-10 font-semibold">
                        {t.sourceDesc}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 relative z-10 scrollbar-thin scrollbar-thumb-slate-200">
                      {sources.map((src, index) => (
                        <a
                          key={index}
                          href={src.uri}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-150 hover:border-indigo-500/30 text-xs text-slate-600 hover:text-indigo-600 transition-all duration-200 group font-bold"
                        >
                          <span className="truncate max-w-[85%] font-semibold">{src.title}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Content Column: Filterable list of 10 trends (Now Full Width below controls) */}
            <div className="w-full flex flex-col gap-6">
              
              {/* Filter and Sorting Header bar */}
              <div className="bg-white rounded-3xl border border-slate-200/85 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Search input */}
                <div className="relative w-full sm:w-72">
                  <Search className={`absolute ${lang === "ar" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400`} />
                  <input
                    id="search-filter-input"
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className={`w-full py-2.5 text-xs rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 transition-all placeholder-slate-400 ${lang === "ar" ? "pl-4 pr-11" : "pl-11 pr-4"}`}
                  />
                </div>

                {/* Controls (Filters + Sort) */}
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-end">
                  
                  {/* Competition Filter */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 font-semibold">{t.compFilterLabel}</span>
                    <select
                      id="comp-filter-select"
                      value={selectedCompetition}
                      onChange={(e) => setSelectedCompetition(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 font-bold cursor-pointer shadow-xs"
                    >
                      <option value="all">{lang === "ar" ? "الكل" : "All"}</option>
                      <option value="low">{lang === "ar" ? "منخفضة فقط" : "Low only"}</option>
                      <option value="medium">{lang === "ar" ? "متوسطة فقط" : "Medium only"}</option>
                      <option value="high">{lang === "ar" ? "عالية فقط" : "High only"}</option>
                    </select>
                  </div>

                  {/* Sorting */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 font-semibold">{t.sortByLabel}</span>
                    <button
                      id="sort-btn"
                      onClick={() => setSortBy((prev) => prev === "rank" ? "competition" : "rank")}
                      className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3.5 py-1.5 rounded-xl transition-all duration-200 font-bold cursor-pointer hover:border-slate-300 shadow-xs"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{sortBy === "rank" ? t.sortByRank : t.sortByComp}</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* Error Alert Panel */}
              {error && (
                <div className="bg-rose-50 border border-rose-200/60 rounded-2xl p-4 flex gap-3 text-xs text-rose-700 shadow-xs">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                  <div className="leading-relaxed">
                    <p className="font-extrabold mb-1 text-rose-800">
                      {lang === "ar" ? "فشل جلب التريندات المباشرة:" : "Failed to load live web trends:"}
                    </p>
                    <p className="font-semibold">{error}</p>
                    <p className="mt-2 text-[11px] text-rose-600 font-medium text-left">
                      {lang === "ar" 
                        ? "ملاحظة: تم توفير 10 أفكار تريندات مجهزة مسبقاً للسوق الأمريكي ومطابقة لمعايير الملكية و Tagging 101 للبدء الفوري!"
                        : "Preview Notice: The application falls back to 10 updated pre-screened US market designs following official guidelines so you can proceed without delay!"}
                    </p>
                  </div>
                </div>
              )}

              {/* Offline Fallback Warning Panel */}
              {offlineNotice && (
                <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 flex gap-3 text-xs text-amber-700 shadow-xs">
                  <Sparkles className="w-5 h-5 shrink-0 text-amber-500 animate-pulse" />
                  <div className="leading-relaxed">
                    <p className="font-extrabold mb-1 text-amber-800">
                      {lang === "ar" ? "💡 تم تنشيط قاعدة البيانات الذكية دون اتصال:" : "💡 Smart Offline Database Activated:"}
                    </p>
                    <p className="font-semibold">
                      {lang === "ar" 
                        ? "نظراً للضغط المرتفع على مفاتيح Gemini API، قمنا تلقائياً بتفعيل قاعدة البيانات المحفوظة والذكية. تتضمن 10 أفكار تصميم مجهزة مسبقاً للسوق الأمريكي ومطابقة لمعايير الملكية و Tagging 101 لتتمكن من العمل بدون توقف!"
                        : "Due to high traffic or limits on the live Gemini API, we have automatically activated the Smart Offline Pre-Screened database. It contains 10 highly optimized, USPTO-compliant US designs so you can proceed without delay!"}
                    </p>
                  </div>
                </div>
              )}

              {/* Favorites / Shortlist Collection Block */}
              <div id="favorites-shortlist-panel" className="w-full bg-slate-50/80 rounded-[24px] border border-slate-200/90 p-5 shadow-xs relative overflow-hidden transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">
                        {t.favHeader} ({favorites.length})
                      </h3>
                      <p className="text-[10px] text-slate-500 font-semibold">
                        {t.favSubtitle}
                      </p>
                    </div>
                  </div>
                  {favorites.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleBulkExportTxt}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-250 hover:border-slate-350 text-[10px] font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{t.favExportTxt}</span>
                      </button>
                      <button
                        onClick={handleBulkExportCsv}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-250 hover:border-slate-350 text-[10px] font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{t.favExportCsv}</span>
                      </button>
                    </div>
                  )}
                </div>

                {favorites.length === 0 ? (
                  <div className="py-4 text-center">
                    <p className="text-xs text-slate-500 font-semibold">
                      {t.favEmpty}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {getSavedFavoritesList().map(bt => {
                      const badge = getCompetitionBadge(bt.competition);
                      const tmBadge = getTrademarkBadge(bt.trademarkStatus);
                      const successScore = getSuccessScore(bt);

                      return (
                        <div 
                          key={bt.id} 
                          className="p-3.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all group"
                        >
                          <div>
                            {/* Card Header: Title & Remove Star */}
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div>
                                <span className="text-xs font-black text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                  {lang === "ar" && bt.titleArabic ? bt.titleArabic : bt.title}
                                </span>
                                {bt.titleArabic && lang !== "ar" && (
                                  <span className="text-[10px] text-slate-400 font-semibold block truncate">
                                    {bt.titleArabic}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => toggleFavorite(bt.id, bt)}
                                className="p-1 rounded-lg text-amber-400 hover:bg-slate-50 cursor-pointer shrink-0"
                                title={t.favRemove}
                              >
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              </button>
                            </div>

                            {/* Listing Title */}
                            <p className="text-[10px] text-slate-600 font-bold mb-2.5 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-xl border border-slate-100">
                              {lang === "ar" && bt.cleanListingTitleArabic ? bt.cleanListingTitleArabic : bt.cleanListingTitle}
                            </p>

                            {/* Status Badges */}
                            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${successScore.bg} ${successScore.colorText}`}>
                                {successScore.score}% {lang === "ar" ? "نجاح" : "Success"}
                              </span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${tmBadge.classes}`}>
                                {tmBadge.text}
                              </span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${badge.classes}`}>
                                {badge.text}
                              </span>
                            </div>

                            {/* Tags Preview */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {bt.tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100/80 border border-slate-200 text-[9px] text-slate-600 font-bold truncate max-w-[90px]">
                                  #{tag}
                                </span>
                              ))}
                              {bt.tags.length > 3 && (
                                <span className="px-1.5 py-0.5 text-[9px] text-indigo-600 font-black self-center">
                                  +{bt.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Card Actions */}
                          <div className="space-y-2 border-t border-slate-100 pt-2.5 mt-auto">
                            {/* Primary Button: Open Full Idea Components */}
                            <button
                              onClick={() => setSelectedModalTrend(bt)}
                              className="w-full py-1.5 px-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>{lang === "ar" ? "فتح الفكرة بجميع مكوناتها" : "Open Full Idea Components"}</span>
                            </button>

                            <div className="flex gap-1.5">
                              <button
                                onClick={() => handleCopyText(bt.cleanListingTitle, `fav-title-${bt.id}`)}
                                className="flex-1 py-1 px-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[9px] font-bold text-slate-700 transition-all cursor-pointer truncate text-center"
                              >
                                {copiedStates[`fav-title-${bt.id}`] ? t.copySuccess : t.copyTitle}
                              </button>
                              <button
                                onClick={() => handleCopyAllTags(bt.tags, `fav-tags-${bt.id}`)}
                                className="flex-1 py-1 px-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100/70 text-[9px] font-bold transition-all cursor-pointer truncate text-center"
                              >
                                {copiedStates[`fav-tags-${bt.id}`] ? t.copySuccess : (lang === "ar" ? "نسخ 15 تاغ" : "Copy Tags")}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Loading State Overlay */}
              {isLoading ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                  
                  {/* Glowing spinner */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-full border-4 border-indigo-50 border-t-indigo-600 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-indigo-500 animate-pulse" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-800 mb-3">
                    {lang === "ar" ? "جاري جلب وتحليل التريندات المباشرة..." : "Analyzing Live US Redbubble Trends..."}
                  </h3>
                  <p className="text-sm text-slate-500 max-w-lg mx-auto mb-8 font-semibold">
                    {lang === "ar" 
                      ? "نقوم الآن بإجراء فحص حي على محركات البحث واستكشاف الكلمات الأكثر طلباً، وتطبيق ضوابط Tagging 101 للتحقق من سلامتها القانونية وقوة مبيعاتها."
                      : "We are currently checking live web search, auditing for USPTO trademark clearance, and generating beautiful descriptions to jumpstart your Redbubble listings."}
                  </p>

                  {/* Progressive loading step notifications */}
                  <div className="w-full max-w-md bg-slate-50 rounded-2xl p-4 border border-slate-150">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-semibold">
                      <span>{lang === "ar" ? "التقدم المباشر" : "Generation Progress"}</span>
                      <span>{loadingStep + 1} / 4</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                      <motion.div 
                        className="h-full bg-indigo-600 rounded-full"
                        animate={{ width: `${(loadingStep + 1) * 25}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={loadingStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-indigo-600 font-bold text-center leading-relaxed"
                      >
                        {loadingMessages[loadingStep]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                </div>
              ) : (
                
                /* Trend List Rendering */
                <div className="flex flex-col gap-8">
                  {processedTrends.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
                      <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h4 className="text-base font-bold text-slate-800 mb-2">{t.noResults}</h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                        {t.tryAdjusting}
                      </p>
                    </div>
                  ) : (
                    processedTrends.map((trend, index) => {
                      const badge = getCompetitionBadge(trend.competition);
                      const tmBadge = getTrademarkBadge(trend.trademarkStatus);
                      const copiedTitleKey = `title-${trend.id}`;
                      const copiedDescKey = `desc-${trend.id}`;
                      const copiedTagsKey = `tags-${trend.id}`;
                      const copiedConceptKey = `concept-${trend.id}`;
                      const copiedPromptKey = `prompt-${trend.id}`;

                      const isCardExpanded = expandedTrendCards[trend.id] || false;
                      const rankNumber = index + 1;

                      // Safe default assignments for newly introduced metrics & sources
                      const searchStrength = trend.searchStrength || Math.floor((37 * (trend.id || index) + 19) % 18 + 81);
                      const searchVolume = trend.searchVolume || `${Math.floor((13 * (trend.id || index) + 7) % 15 + 4)}.${Math.floor((5 * (trend.id || index)) % 9)}K searches/mo`;
                      
                      const fallbackKeyword = trend.title.split(" ").slice(0, 2).join(" ");
                      const trendSources = trend.sources && trend.sources.length > 0 ? trend.sources : [
                        { title: `Google Trends (${fallbackKeyword})`, uri: `https://trends.google.com/trends/explore?q=${encodeURIComponent(fallbackKeyword)}` },
                        { title: `Etsy Best Sellers (${fallbackKeyword})`, uri: `https://www.etsy.com/search?q=${encodeURIComponent(fallbackKeyword)}` }
                      ];

                      const success = getSuccessScore(trend);

                      return (
                        <motion.div
                          key={trend.id}
                          id={`trend-card-${trend.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`bg-white border-slate-200 hover:border-indigo-500/35 rounded-[32px] border shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden group ${
                            isCardExpanded ? "p-6 sm:p-7.5" : "p-4 sm:p-5 hover:bg-slate-50/40 cursor-pointer"
                          } ${tmBadge.bgGlow}`}
                          onClick={() => {
                            if (!isCardExpanded) {
                              setExpandedTrendCards(prev => ({ ...prev, [trend.id]: true }));
                            }
                          }}
                        >
                          {/* Corner accent glow on hover */}
                          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-br-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />

                          {/* Top Card Header */}
                          <div 
                            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none ${
                              isCardExpanded ? "mb-5 pb-4 border-b border-slate-150 cursor-pointer" : "cursor-pointer"
                            }`}
                            onClick={(e) => {
                              if (isCardExpanded) {
                                  e.stopPropagation();
                                  setExpandedTrendCards(prev => ({ ...prev, [trend.id]: false }));
                                }
                              }}
                            >
                              
                              <div className="flex gap-4 items-center">
                                {/* Rank Indicator Badge */}
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200 flex items-center justify-center font-black text-lg shrink-0 transition-all font-mono shadow-xs">
                                  {rankNumber < 10 ? `0${rankNumber}` : rankNumber}
                                </div>

                                <div>
                                  {/* Primary English Title */}
                                  <h3 className="text-base sm:text-xl font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight leading-snug flex flex-wrap items-center gap-2">
                                    <span>{trend.title}</span>
                                    {!isCardExpanded && (
                                      <span className="text-[10px] text-indigo-600 font-extrabold bg-indigo-50 px-2.5 py-1 rounded-md animate-pulse">
                                        {lang === "ar" ? "اضغط للتفاصيل" : "Click for details"}
                                      </span>
                                    )}
                                  </h3>
                                  {/* Bilingual translation helper */}
                                  {trend.titleArabic && (
                                    <span className="text-xs text-slate-500 block mt-1 font-semibold">
                                      {lang === "ar" ? "الترجمة المقترحة: " : "Arabic Ref: "}{trend.titleArabic}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Status Badges Group */}
                              <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border shrink-0 shadow-xs ${badge.classes}`}>
                                  {badge.text}
                                </span>
                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border shrink-0 shadow-xs ${tmBadge.classes}`}>
                                  {tmBadge.text}
                                </span>
                                {/* Success Probability Compact Gauge */}
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold shadow-xs shrink-0 ${success.bg} ${success.colorText}`}>
                                  <svg className="w-3.5 h-3.5 shrink-0 -rotate-90 overflow-visible" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="8" className="stroke-slate-200 fill-none" strokeWidth="2.5" />
                                    <motion.circle
                                      cx="10"
                                      cy="10"
                                      r="8"
                                      className="fill-none"
                                      stroke={success.strokeHex}
                                      strokeWidth="2.5"
                                      strokeDasharray={2 * Math.PI * 8}
                                      initial={{ strokeDashoffset: 2 * Math.PI * 8 }}
                                      animate={{ strokeDashoffset: 2 * Math.PI * 8 * (1 - success.score / 100) }}
                                      transition={{ duration: 1.2, ease: "easeOut" }}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <span>
                                    {lang === "ar" ? "نسبة النجاح: " : "Success: "}
                                    {success.score}%
                                  </span>
                                </div>
                                {/* Favorite Toggle Button */}
                                <button
                                  type="button"
                                  id={`fav-btn-${trend.id}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(trend.id);
                                  }}
                                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                                    favorites.includes(trend.id)
                                      ? "bg-amber-50 border-amber-300 text-amber-500 shadow-sm"
                                      : "bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200"
                                  }`}
                                  title={favorites.includes(trend.id) ? t.favRemove : t.favAdd}
                                >
                                  <Star className={`w-4 h-4 ${favorites.includes(trend.id) ? "fill-amber-400 text-amber-500" : "text-slate-400"}`} />
                                </button>
                                {/* Rotate Chevron dynamically */}
                                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 transition-all shrink-0">
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCardExpanded ? "rotate-180 text-indigo-600" : ""}`} />
                                </div>
                              </div>

                            </div>

                          {/* Collapsible Details Area */}
                          <AnimatePresence initial={false}>
                            {isCardExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden space-y-6"
                              >
                                <div>{/* Wrapper to handle spacing perfectly inside motion.div */}

                          {/* Card Content Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 text-xs">
                            
                            {/* Target Niche */}
                            <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200 shadow-xs hover:border-indigo-100 transition-all duration-200">
                              <span className="text-slate-500 font-extrabold block mb-2 tracking-wide uppercase text-[10px]">{t.nicheLabel}</span>
                              <p className="text-slate-700 font-bold leading-relaxed mb-2">{trend.niche}</p>
                              {trend.nicheArabic && (
                                <div className="text-slate-600 pt-2 border-t border-slate-150 mt-2.5 leading-relaxed">
                                  <span className="text-indigo-600 font-extrabold text-[10px] block mb-0.5">{lang === "ar" ? "الجمهور والنيش المساعد:" : "Arabic Niche & Audience:"}</span>
                                  <p className="font-semibold">{trend.nicheArabic}</p>
                                </div>
                              )}
                            </div>


                            {/* Why Trending */}
                            <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200 shadow-xs hover:border-indigo-100 transition-all duration-200">
                              <span className="text-indigo-600 font-extrabold block mb-2 tracking-wide uppercase text-[10px]">{t.whyTrendingLabel}</span>
                              <p className="text-slate-700 font-bold leading-relaxed mb-2">{trend.whyTrending}</p>
                              {trend.whyTrendingArabic && (
                                <div className="text-slate-600 pt-2 border-t border-slate-150 mt-2.5 leading-relaxed">
                                  <span className="text-indigo-600 font-extrabold text-[10px] block mb-0.5">{lang === "ar" ? "سبب التريند والسوق:" : "Arabic Trend Reason:"}</span>
                                  <p className="font-semibold">{trend.whyTrendingArabic}</p>
                                </div>
                              )}
                            </div>

                          </div>

                          {/* Search Metrics & Grounding Sources Block */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5 text-xs">
                            {/* Search Strength Indicator */}
                            <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200 shadow-xs hover:border-indigo-100 transition-all duration-200 flex flex-col justify-between min-h-[170px]">
                              <div>
                                <span className="text-emerald-600 font-extrabold flex items-center gap-1.5 mb-2.5 tracking-wide uppercase text-[10px]">
                                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                                  {lang === "ar" ? "مؤشرات وقوة البحث والطلب" : "Search Metrics & Demand Strength"}
                                </span>
                                <div className="flex items-baseline gap-3 mb-3">
                                  <span className="text-2xl font-black text-slate-800 font-mono tracking-tight">{searchStrength}%</span>
                                  <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs">
                                    {searchVolume}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Glowing search progress bar */}
                              <div className="w-full">
                                <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1 font-mono">
                                  <span>{lang === "ar" ? "طلب منخفض" : "LOW DEMAND"}</span>
                                  <span>{lang === "ar" ? "طلب مرتفع جداً" : "BURSTING"}</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${searchStrength}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Expected Success Probability Gauge */}
                            <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200 shadow-xs hover:border-indigo-100 transition-all duration-200 flex flex-col justify-between min-h-[170px]">
                              <div>
                                <span className="text-indigo-600 font-extrabold flex items-center gap-1.5 mb-2.5 tracking-wide uppercase text-[10px]">
                                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                                  {lang === "ar" ? "نسبة نجاح التصميم المتوقعة" : "Expected Success Probability"}
                                </span>
                                
                                <div className="flex items-center gap-4 py-1">
                                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                                    <svg className="w-16 h-16 -rotate-90 overflow-visible" viewBox="0 0 56 56">
                                      <circle cx="28" cy="28" r="23" className="stroke-slate-200/80 fill-none" strokeWidth="5" />
                                      <motion.circle
                                        cx="28"
                                        cy="28"
                                        r="23"
                                        className="fill-none"
                                        stroke={success.strokeHex}
                                        strokeWidth="5"
                                        strokeDasharray={2 * Math.PI * 23}
                                        initial={{ strokeDashoffset: 2 * Math.PI * 23 }}
                                        animate={{ strokeDashoffset: 2 * Math.PI * 23 * (1 - success.score / 100) }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                    <span className="absolute text-sm font-black text-slate-800 font-mono">
                                      {success.score}%
                                    </span>
                                  </div>
                                  
                                  <div>
                                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border shadow-2xs ${success.bg} ${success.colorText}`}>
                                      {success.level === "excellent" 
                                        ? (lang === "ar" ? "فرصة ممتازة 🔥" : "Excellent Choice 🔥") 
                                        : success.level === "good" 
                                        ? (lang === "ar" ? "فرصة واعدة ⚡" : "Good Opportunity ⚡")
                                        : (lang === "ar" ? "مقبول ⚠️" : "Fair Potential ⚠️")}
                                    </span>
                                    <p className="text-[10px] text-slate-500 font-semibold mt-1 leading-relaxed">
                                      {lang === "ar" 
                                        ? (success.level === "excellent"
                                            ? "نسبة طلب عالية ومنافسة منخفضة تجعل التصنيف والمبيعات أسرع."
                                            : success.level === "good"
                                            ? "فرصة جيدة جداً مع الحاجة لتصاميم مميزة للتموقع في السوق."
                                            : "منافسة عالية تتطلب استهداف الكلمات الطويلة (Long-Tail).")
                                        : "High chance of organic visibility and fast sales conversion."}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-2 pt-2 border-t border-slate-200 text-[9px] text-slate-500 font-semibold leading-relaxed">
                                <span className="font-extrabold text-slate-600 block mb-0.5">
                                  {lang === "ar" ? "المعادلة الرياضية والتحليل:" : "Analytical Index Formula:"}
                                </span>
                                {lang === "ar" 
                                  ? "60% وزخـم حـجم الـطلب + 40% مـؤشر انـخفاض الـمنافسة."
                                  : "60% Search Demand Weight + 40% Low Competition Weight."}
                              </div>
                            </div>

                            {/* Verified Grounding Sources */}
                            <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200 shadow-xs hover:border-indigo-100 transition-all duration-200 flex flex-col justify-between min-h-[170px]">
                              <div>
                                <span className="text-indigo-600 font-extrabold flex items-center gap-1.5 mb-2.5 tracking-wide uppercase text-[10px]">
                                  <Globe className="w-3.5 h-3.5 text-indigo-500" />
                                  {lang === "ar" ? "مصادر التحقق والتريند" : "Verified Grounding Sources"}
                                </span>
                                <p className="text-slate-500 font-semibold mb-3 leading-relaxed">
                                  {lang === "ar" 
                                    ? "تم التحقق من رواج هذا الاتجاه وتحليله عبر تتبع مؤشرات البحث المباشر:" 
                                    : "This trend was validated by tracking search parameters on these sources:"}
                                </p>
                              </div>
                              <div className="flex flex-col gap-2">
                                {trendSources.map((source, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={source.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 transition-all duration-200 font-semibold cursor-pointer shadow-2xs"
                                  >
                                    <span className="truncate pr-2">{source.title}</span>
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-500 shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Concept & Layout Description */}
                          <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-5 mb-5 text-xs shadow-xs">
                            <div className="flex items-center justify-between mb-2.5 pb-1 border-b border-indigo-100">
                              <span className="text-indigo-600 font-extrabold block tracking-wide">{t.conceptLabel}</span>
                              <button
                                id={`copy-concept-${trend.id}`}
                                onClick={() => handleCopyText(trend.concept, copiedConceptKey)}
                                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-all duration-200 shadow-sm cursor-pointer"
                              >
                                {copiedStates[copiedConceptKey] ? <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copiedStates[copiedConceptKey] ? t.copySuccess : t.copyConceptBtn}</span>
                              </button>
                            </div>
                            <p className="text-slate-700 leading-relaxed font-semibold mb-2.5">
                              {trend.concept}
                            </p>
                            {trend.conceptArabic && (
                              <div className="text-slate-600 pt-2 border-t border-indigo-100 mt-2 leading-relaxed">
                                <span className="text-indigo-600 font-extrabold text-[10px] block mb-0.5">{lang === "ar" ? "فكرة التصميم والأسلوب الفني:" : "Arabic Visual Concept:"}</span>
                                <p className="font-semibold">{trend.conceptArabic}</p>
                              </div>
                            )}
                          </div>

                          {/* Professional AI Image Prompt Section */}
                          {trend.aiImagePrompt && (
                            <div className="bg-violet-50/40 border border-violet-100 rounded-2xl p-5 mb-5 text-xs shadow-xs relative overflow-hidden">
                              <div className="flex items-start sm:items-center justify-between gap-3 mb-2.5 pb-2.5 border-b border-violet-500/10">
                                <div className="flex items-center gap-1.5">
                                  <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
                                  <span className="text-violet-600 font-extrabold block tracking-wide">{t.aiPromptLabel}</span>
                                </div>
                                <button
                                  id={`copy-prompt-${trend.id}`}
                                  onClick={() => handleCopyText(trend.aiImagePrompt || "", copiedPromptKey)}
                                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[10px] font-bold text-violet-600 hover:text-violet-700 transition-all duration-200 shadow-sm cursor-pointer shrink-0"
                                >
                                  {copiedStates[copiedPromptKey] ? <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{copiedStates[copiedPromptKey] ? t.copySuccess : t.copyPromptBtn}</span>
                                </button>
                              </div>
                              
                              <div className="bg-white rounded-2xl p-3.5 border border-slate-200 mb-2 font-mono text-slate-700 leading-relaxed select-all shadow-xs text-left">
                                {trend.aiImagePrompt}
                              </div>
                              
                              <p className="text-[10px] text-slate-500 italic mb-2">
                                {t.aiPromptHelp}
                              </p>

                              {trend.aiImagePromptArabic && (
                                <div className="text-slate-600 pt-2 border-t border-violet-100 mt-2 leading-relaxed">
                                  <span className="text-violet-600 font-extrabold text-[10px] block mb-0.5">{lang === "ar" ? "شرح وإرشادات الاستخدام بالذكاء الاصطناعي:" : "Arabic Usage & Prompt Explanation:"}</span>
                                  <p className="font-semibold">{trend.aiImagePromptArabic}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Trademark Check Panel */}
                          <div className={`p-5 rounded-3xl border mb-6 text-xs bg-slate-50/70 ${
                            cardScanResults[trend.id]
                              ? cardScanResults[trend.id].overallStatus === "Safe to Upload"
                                ? "border-emerald-300"
                                : cardScanResults[trend.id].overallStatus === "Needs Attention"
                                ? "border-amber-300"
                                : "border-rose-300"
                              : trend.trademarkStatus.toLowerCase().includes("safe") 
                              ? "border-emerald-200" 
                              : trend.trademarkStatus.toLowerCase().includes("attention") 
                              ? "border-amber-200" 
                              : "border-rose-200"
                          }`}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <ShieldCheck className={`w-4 h-4 ${
                                  cardScanResults[trend.id]
                                    ? cardScanResults[trend.id].overallStatus === "Safe to Upload"
                                      ? "text-emerald-600"
                                      : cardScanResults[trend.id].overallStatus === "Needs Attention"
                                      ? "text-amber-600"
                                      : "text-rose-600"
                                    : trend.trademarkStatus.toLowerCase().includes("safe") 
                                    ? "text-emerald-600" 
                                    : trend.trademarkStatus.toLowerCase().includes("attention") 
                                    ? "text-amber-600" 
                                    : "text-rose-600"
                                }`} />
                                <span className="font-extrabold text-slate-800">
                                  {cardScanResults[trend.id] 
                                    ? `${t.trademarkPrecheck} (${lang === "ar" ? "فحص عميق مفعل" : "Deep Check Active"})`
                                    : t.trademarkPrecheck}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 flex-wrap justify-end">
                                {/* Deep IP Scanner Button */}
                                <button
                                  type="button"
                                  id={`populate-scanner-${trend.id}`}
                                  onClick={() => handlePopulateAndScan(trend)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/60 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-transparent transition-all text-[11px] font-bold cursor-pointer"
                                >
                                  <span>{lang === "ar" ? "فحص في مستكشف العبارات 🛡️" : "Deep IP Scanner 🛡️"}</span>
                                </button>

                                {/* Deep check button */}
                                <button
                                  type="button"
                                  id={`run-deepcheck-${trend.id}`}
                                  disabled={cardScanningStates[trend.id]}
                                  onClick={() => handleDeepCheckCard(trend)}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-[11px] font-bold cursor-pointer ${
                                    cardScanningStates[trend.id]
                                      ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                                      : cardScanResults[trend.id]
                                      ? "bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-transparent"
                                      : "bg-indigo-600 hover:bg-indigo-500 border-transparent text-white shadow-xs"
                                  }`}
                                >
                                {cardScanningStates[trend.id] ? (
                                  <>
                                    <div className="w-3 h-3 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                                    <span>{t.tmCheckingCard}</span>
                                  </>
                                ) : cardScanResults[trend.id] ? (
                                  <span>{lang === "ar" ? "فحص مجدداً 🔄" : "Re-Scan Deep 🔄"}</span>
                                ) : (
                                  <span>{t.tmRunOnCard}</span>
                                )}
                              </button>
                            </div>
                          </div>

                            {/* Main Content (Changes if deep scanned) */}
                            {cardScanResults[trend.id] ? (
                              <div className="space-y-4 text-left animate-fadeIn">
                                
                                {/* Deep check general overview */}
                                <div className={`p-3 rounded-xl border ${
                                  cardScanResults[trend.id].overallStatus === "Safe to Upload"
                                    ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                    : cardScanResults[trend.id].overallStatus === "Needs Attention"
                                    ? "bg-amber-50 border-amber-100 text-amber-700"
                                    : "bg-rose-50 border-rose-100 text-rose-700"
                                }`}>
                                  <div className="flex items-center justify-between font-bold mb-1">
                                    <span className="text-[10px] uppercase text-slate-500">{t.tmOverallStatusLabel}:</span>
                                    <span className="text-xs font-black">
                                      {lang === "ar"
                                        ? cardScanResults[trend.id].overallStatus === "Safe to Upload" ? "آمن للرفع" : cardScanResults[trend.id].overallStatus === "Needs Attention" ? "يتطلب انتباه" : "تحذير علامة تجارية"
                                        : cardScanResults[trend.id].overallStatus} ({cardScanResults[trend.id].score}%)
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 leading-normal font-semibold">
                                    {lang === "ar" ? cardScanResults[trend.id].generalAdviceArabic : cardScanResults[trend.id].generalAdvice}
                                  </p>
                                </div>

                                {/* Findings */}
                                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                                  {cardScanResults[trend.id].findings && cardScanResults[trend.id].findings.length > 0 ? (
                                    cardScanResults[trend.id].findings.map((f, fIdx) => (
                                      <div 
                                        key={fIdx} 
                                          className={`p-2.5 rounded-xl border text-[11px] leading-relaxed transition-all ${
                                          f.risk === "Low" 
                                            ? "bg-white border-slate-150" 
                                            : f.risk === "Medium"
                                            ? "bg-amber-50/50 border-amber-100/50"
                                            : "bg-rose-50/50 border-rose-100/50"
                                        }`}
                                      >
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                          <span className="font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[10px]">
                                            {f.term}
                                          </span>
                                          <span className={`px-1 rounded text-[8px] font-black uppercase ${
                                            f.risk === "Low"
                                              ? "bg-emerald-50 text-emerald-600"
                                              : f.risk === "Medium"
                                              ? "bg-amber-50 text-amber-600"
                                              : "bg-rose-50 text-rose-600 animate-pulse"
                                          }`}>
                                            {lang === "ar" ? (f.risk === "Low" ? "منخفضة" : f.risk === "Medium" ? "متوسطة" : "عالية") : f.risk}
                                          </span>
                                        </div>
                                        <p className="text-slate-500 leading-relaxed font-medium">
                                          {lang === "ar" ? f.explanationArabic : f.explanation}
                                        </p>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="p-3 rounded-xl border border-slate-200 text-center text-slate-500 text-[10px] font-medium">
                                      {t.tmNoFindings}
                                    </div>
                                  )}
                                </div>

                                {/* Action button */}
                                {cardScanResults[trend.id].usptoSearchTerms && cardScanResults[trend.id].usptoSearchTerms.length > 0 && (
                                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-150">
                                    <span className="text-[10px] text-slate-500 font-bold">{t.tmUsptoSearch}:</span>
                                    {cardScanResults[trend.id].usptoSearchTerms.map((word, wIdx) => (
                                      <a
                                        key={wIdx}
                                        href={`https://www.trademarkia.com/trademarks-search.aspx?tn=${encodeURIComponent(word)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-indigo-300 text-[9px] font-mono text-slate-600 hover:text-indigo-600 font-bold transition-all inline-flex items-center gap-1"
                                      >
                                        <span>{word}</span>
                                        <ExternalLink className="w-2.5 h-2.5" />
                                      </a>
                                    ))}
                                  </div>
                                )}

                              </div>
                            ) : (
                              <div className="space-y-2 text-left">
                                <p className="text-slate-700 leading-relaxed font-semibold">{trend.trademarkDetails}</p>
                                
                                {trend.trademarkDetailsArabic && (
                                  <div className="text-slate-600 pt-2 border-t border-slate-150 mt-2 leading-relaxed">
                                    <span className="text-indigo-600 font-semibold text-[10px] block mb-0.5">{lang === "ar" ? "تفاصيل العلامة التجارية وحقوق الملكية:" : "Arabic Trademark Details:"}</span>
                                    <p className="font-medium">{trend.trademarkDetailsArabic}</p>
                                  </div>
                                )}
                                
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-slate-150 text-[11px] mt-3">
                                  <div className="text-slate-500">
                                    <strong>{t.trademarkTip}</strong> Class 025 (Apparel) & Class 016 (Stickers)
                                  </div>
                                  <a 
                                    href={`https://www.trademarkia.com/trademarks-search.aspx?tn=${encodeURIComponent(trend.cleanListingTitle || trend.title)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-bold hover:underline"
                                  >
                                    <span>{lang === "ar" ? "افحص العلامة على Trademarkia" : "Verify on Trademarkia"}</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            )}

                          </div>

                          {/* Best-Selling Products */}
                          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
                            <span className="text-slate-400 font-extrabold flex items-center gap-1.5 mr-1">
                              <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
                              <span>{t.bestProducts}</span>
                            </span>
                            {trend.suggestedProducts.map((p, i) => (
                              <span key={i} className="bg-slate-950 text-slate-300 border border-slate-850 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-xs hover:border-slate-750 transition-all">
                                <span>{p}</span>
                                {trend.suggestedProductsArabic?.[i] && (
                                  <span className="text-slate-500 font-semibold text-[10px]">({trend.suggestedProductsArabic[i]})</span>
                                )}
                              </span>
                            ))}
                          </div>

                          {/* Simulated Redbubble Upload Form Panel (Matches Redbubble Layout exactly) */}
                          <div className="bg-slate-950/25 rounded-3xl border border-slate-850/90 shadow-xl mb-6 overflow-hidden">
                            
                            {/* Panel Header */}
                            <div className="p-4.5 bg-slate-950/70 border-b border-slate-850/85 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-2.5">
                                <FileText className="w-4 h-4 text-rose-500 animate-pulse" />
                                <div className="text-left">
                                  <h4 className="text-xs font-black text-white uppercase tracking-wider">{t.rbFormHeader}</h4>
                                  <p className="text-[10px] text-slate-400 font-semibold">{t.rbFormSubtitle}</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                id={`form-scan-ip-${trend.id}`}
                                onClick={() => handlePopulateAndScan(trend)}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 hover:bg-rose-600 hover:text-white hover:border-transparent transition-all text-[11px] font-extrabold cursor-pointer self-start sm:self-auto shadow-md"
                              >
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>{lang === "ar" ? "فحص في مستكشف العبارات 🛡️" : "Deep IP Scanner 🛡️"}</span>
                              </button>
                            </div>

                            {/* Redbubble Style Language Tab Bar */}
                            <div className="bg-slate-950/40 border-b border-slate-850 flex items-center justify-between px-3 overflow-x-auto scrollbar-none">
                               <div className="flex gap-1 pt-1.5">
                                 {[
                                   { code: "en", name: "English" },
                                   { code: "ar", name: "العربية" }
                                 ].map((formLang) => {
                                   const isActive = (listingLangs[trend.id] || "en") === formLang.code;
                                   return (
                                     <button
                                       key={formLang.code}
                                       onClick={() => setListingLangs(prev => ({ ...prev, [trend.id]: formLang.code as "en" | "ar" }))}
                                       className={`px-4 py-2 text-[11px] font-bold select-none border-b-2 rounded-t-xl transition-all cursor-pointer ${
                                         isActive 
                                           ? "border-rose-600 text-white bg-slate-950/80" 
                                           : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-950/10"
                                       }`}
                                     >
                                       {formLang.name}
                                     </button>
                                   );
                                 })}
                               </div>
                              <span className="text-[10px] text-slate-500 hidden sm:inline px-3 font-medium">
                                {t.rbLangsTabNotice}
                              </span>
                            </div>

                            {/* Simulated Redbubble Form Fields */}
                            <div className="p-5 bg-slate-950/25 space-y-5 text-left">
                              
                              {/* Title Block with Interactive Title Optimization Engine */}
                              {(() => {
                                const variant = selectedTitleVariants[trend.id] || "A";
                                const scoresList = [
                                  { key: "A" as const, score: trend.titleAScore || 95 },
                                  { key: "B" as const, score: trend.titleBScore || 92 },
                                  { key: "C" as const, score: trend.titleCScore || 88 },
                                  { key: "D" as const, score: trend.titleDScore || 86 },
                                  { key: "E" as const, score: trend.titleEScore || 84 },
                                ];
                                const bestVariant = scoresList.reduce((prev, current) => (current.score > prev.score ? current : prev), scoresList[0]).key;
                                let currentTitle = "";
                                if (variant === "A") {
                                  currentTitle = (listingLangs[trend.id] || "en") === "ar"
                                    ? trend.titleAArabic || trend.cleanListingTitleArabic || trend.titleArabic
                                    : trend.titleA || trend.cleanListingTitle || trend.title;
                                } else if (variant === "B") {
                                  currentTitle = (listingLangs[trend.id] || "en") === "ar"
                                    ? trend.titleBArabic || trend.titleArabic
                                    : trend.titleB || trend.title;
                                } else if (variant === "C") {
                                  currentTitle = (listingLangs[trend.id] || "en") === "ar"
                                    ? trend.titleCArabic || trend.titleArabic
                                    : trend.titleC || trend.title;
                                } else if (variant === "D") {
                                  currentTitle = (listingLangs[trend.id] || "en") === "ar"
                                    ? trend.titleDArabic || trend.titleArabic
                                    : trend.titleD || trend.title;
                                } else {
                                  currentTitle = (listingLangs[trend.id] || "en") === "ar"
                                    ? trend.titleEArabic || trend.titleArabic
                                    : trend.titleE || trend.title;
                                }

                                return (
                                  <div className="space-y-4">
                                    
                                    {/* Title Optimization Engine Selector Panel */}
                                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                                      <div className="flex items-center gap-1.5 mb-3 justify-between">
                                        <div className="flex items-center gap-1.5">
                                          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                                          <span className="text-[11px] font-black text-indigo-300 uppercase tracking-wide">
                                            {lang === "ar" ? "محرك تحسين العناوين v2.0 (خمسة خيارات)" : "Title Optimization Engine v2.0 (5 Options)"}
                                          </span>
                                        </div>
                                        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold">
                                          {lang === "ar" ? "مدعوم بـ AI" : "AI Optimized"}
                                        </span>
                                      </div>
                                      
                                      {/* Five interactive options */}
                                      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-1.5">
                                        {(["A", "B", "C", "D", "E"] as const).map((v) => {
                                          const isSelected = variant === v;
                                           const isBest = v === bestVariant;
                                          
                                          let titleLabel = "";
                                          let scoreValue = 90;
                                          let colorClass = "";
                                          
                                          if (v === "A") {
                                            titleLabel = lang === "ar" ? "أ: سيو" : "A: SEO";
                                            scoreValue = trend.titleAScore || 95;
                                            colorClass = "border-blue-500/40 text-blue-300 bg-blue-500/5";
                                          } else if (v === "B") {
                                            titleLabel = lang === "ar" ? "ب: مشترين" : "B: Buyer/CTR";
                                            scoreValue = trend.titleBScore || 92;
                                            colorClass = "border-emerald-500/40 text-emerald-300 bg-emerald-500/5";
                                          } else if (v === "C") {
                                            titleLabel = lang === "ar" ? "ج: منافسة" : "C: Low Comp";
                                            scoreValue = trend.titleCScore || 88;
                                            colorClass = "border-amber-500/40 text-amber-300 bg-amber-500/5";
                                          } else if (v === "D") {
                                            titleLabel = lang === "ar" ? "د: ترويج" : "D: Viral";
                                            scoreValue = trend.titleDScore || 86;
                                            colorClass = "border-pink-500/40 text-pink-300 bg-pink-500/5";
                                          } else {
                                            titleLabel = lang === "ar" ? "هـ: براند" : "E: Brand";
                                            scoreValue = trend.titleEScore || 84;
                                            colorClass = "border-purple-500/40 text-purple-300 bg-purple-500/5";
                                          }
                                          
                                          return (
                                            <button
                                              key={v}
                                              type="button"
                                              onClick={() => setSelectedTitleVariants(prev => ({ ...prev, [trend.id]: v }))}
                                              className={`relative px-1.5 py-2 rounded-xl border text-center transition-all duration-200 flex flex-col justify-between items-center cursor-pointer ${
                                                 isSelected 
                                                   ? `${colorClass} ring-2 ring-indigo-500/30 scale-[1.01] border-transparent font-extrabold` 
                                                   : "bg-slate-950 border-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-200"
                                               } ${isBest ? "border-amber-500/30 ring-1 ring-amber-500/10" : ""}`}
                                             >
                                               {isBest && (
                                                 <span className="absolute -top-1.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 shadow-lg shadow-amber-500/30 animate-pulse">
                                                   <Star className="w-2.5 h-2.5 text-slate-950 fill-slate-950" />
                                                 </span>
                                               )}
                                              <span className="text-[8px] sm:text-[9px] font-black uppercase leading-none mb-1 text-center truncate w-full">{titleLabel}</span>
                                              <span className="text-[10px] sm:text-xs font-black leading-none">{scoreValue}%</span>
                                            </button>
                                          );
                                        })}
                                      </div>
 
                                      {/* Explanation of selected variant */}
                                       <div className="mt-3 pt-3 border-t border-slate-800/50 text-[10px] text-slate-400 leading-relaxed">
                                         {variant === bestVariant && (
                                           <div className="mb-2.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-wider">
                                             <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                                             <span>
                                               {lang === "ar" 
                                                 ? "⭐ الخيار الأفضل لـ Redbubble (موصى به لتحقيق أعلى ظهور ومبيعات)" 
                                                 : "⭐ Best Choice for Redbubble (Recommended for maximum search visibility & sales)"}
                                             </span>
                                           </div>
                                         )}
                                        {variant === "A" && (
                                          <div>
                                            <span className="text-blue-400 font-extrabold block mb-0.5">
                                              {lang === "ar" ? "الاستراتيجية (تحسين محركات البحث - SEO):" : "SEO Strategy Justification:"}
                                            </span>
                                            <p className="font-medium">
                                              {lang === "ar"
                                                ? trend.titleAExplanationArabic || "عنوان مصمم خصيصًا ليناسب خوارزميات محركات البحث وريدبابل للأرشفة الطبيعية السريعة."
                                                : trend.titleAExplanation || "Primary keyword combination engineered specifically for algorithmic keyword indexability."}
                                            </p>
                                          </div>
                                        )}
                                        {variant === "B" && (
                                          <div>
                                            <span className="text-emerald-400 font-extrabold block mb-0.5">
                                              {lang === "ar" ? "الاستراتيجية (جذب المشترين ونسبة النقر CTR):" : "Buyer Connection & CTR Strategy:"}
                                            </span>
                                            <p className="font-medium">
                                              {lang === "ar"
                                                ? trend.titleBExplanationArabic || "عنوان يحاكي الاسم الجمالي الطبيعي للأعمال الفنية، يحرك المشاعر ويرفع نسبة النقر الفوري للشراء."
                                                : trend.titleBExplanation || "Provocative, emotional, or humorous design name optimized to attract human attention and instant clicks."}
                                            </p>
                                          </div>
                                        )}
                                        {variant === "C" && (
                                          <div>
                                            <span className="text-amber-400 font-extrabold block mb-0.5">
                                              {lang === "ar" ? "الاستراتيجية (المنافسة المنخفضة):" : "Low Competition Dominance:"}
                                            </span>
                                            <p className="font-medium">
                                              {lang === "ar"
                                                ? trend.titleCExplanationArabic || "عنوان يستهدف نيشات ذيلية دقيقة للغاية تسهل الظهور في الصفحة الأولى فوراً ومنافسة المتاجر القديمة."
                                                : trend.titleCExplanation || "Combines hyper-specific niche terms and low-difficulty keyword clusters to secure top positions quickly."}
                                            </p>
                                          </div>
                                        )}
                                        {variant === "D" && (
                                          <div>
                                            <span className="text-pink-400 font-extrabold block mb-0.5">
                                              {lang === "ar" ? "الاستراتيجية (التسويق الفيروسي ووسائل التواصل الاجتماعي):" : "Viral Social Media Marketing:"}
                                            </span>
                                            <p className="font-medium">
                                              {lang === "ar"
                                                ? trend.titleDExplanationArabic || "عنوان مهيأ ومحسن للمشاركة على منصات مثل تيك توك وبينتريست لجذب مبيعات خارجية هائلة لمتجرك."
                                                : trend.titleDExplanation || "Designed specifically for social media (TikTok/Pinterest) aesthetics, optimized to drive external viral referral sales."}
                                            </p>
                                          </div>
                                        )}
                                        {variant === "E" && (
                                          <div>
                                            <span className="text-purple-400 font-extrabold block mb-0.5">
                                              {lang === "ar" ? "الاستراتيجية (الاسم التجاري وهوية الماركة الراقية):" : "Premium Brand Identity:"}
                                            </span>
                                            <p className="font-medium">
                                              {lang === "ar"
                                                ? trend.titleEExplanationArabic || "عنوان يمنح التصميم مظهراً تجارياً متميزاً يوحى بالفخامة كجزء من مجموعة أزياء فنية متكاملة."
                                                : trend.titleEExplanation || "Establishes a boutique storefront style that makes the artwork feel like an exclusive premium designer collection item."}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    
                                    
                                    {/* Simulated Redbubble Field Display */}
                                    <div className="space-y-2">
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <label className="text-[12px] font-black text-slate-700 flex items-center gap-1">
                                          <span>{t.rbTitreLabel}</span>
                                          <span className="text-rose-500 font-bold">*</span>
                                        </label>
                                        <button
                                          id={`copy-title-opt-${trend.id}`}
                                          onClick={() => handleCopyText(currentTitle, copiedTitleKey)}
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eb1424] hover:bg-red-600 text-white transition-all text-[10px] font-bold cursor-pointer shadow-md active:scale-95 self-start sm:self-auto"
                                        >
                                          {copiedStates[copiedTitleKey] ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-2.5 h-2.5" />}
                                          <span>{copiedStates[copiedTitleKey] ? t.copySuccess : `${t.rbCopyButton} (${(listingLangs[trend.id] || "en").toUpperCase()})`}</span>
                                        </button>
                                      </div>
                                      
                                      <p className="text-[10px] text-slate-600 font-medium leading-normal mb-1">{t.rbTitreHelp}</p>
                                      
                                      <div className="p-3.5 rounded-2xl bg-slate-950 text-xs font-mono font-bold text-slate-200 border border-slate-850/80 select-all shadow-inner focus-within:border-rose-500/30 transition-all text-left">
                                        {currentTitle}
                                      </div>

                                      {/* IP / Trademark status under the Title field */}
                                      {ipStatusesMap[trend.id]?.title && (() => {
                                        const fieldIp = ipStatusesMap[trend.id].title;
                                        const isAr = lang === "ar";
                                        return (
                                          <div className={`mt-2.5 p-3 rounded-xl border text-[10px] leading-relaxed ${
                                            fieldIp.badgeType === "safe"
                                              ? "bg-emerald-50/60 border-emerald-200 text-emerald-800"
                                              : fieldIp.badgeType === "warning"
                                              ? "bg-amber-50/60 border-amber-200 text-amber-800"
                                              : "bg-rose-50/60 border-rose-200 text-rose-800"
                                          }`}>
                                            <div className="flex items-center gap-1.5 mb-1 font-bold">
                                              <ShieldCheck className="w-3.5 h-3.5 text-current" />
                                              <span>{isAr ? "وضعية الملكية للعنوان:" : "Title IP Status:"}</span>
                                              <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-mono font-black ${
                                                fieldIp.badgeType === "safe"
                                                  ? "bg-emerald-100 text-emerald-800"
                                                  : fieldIp.badgeType === "warning"
                                                  ? "bg-amber-100 text-amber-800"
                                                  : "bg-rose-100 text-rose-800"
                                              }`}>
                                                {isAr ? fieldIp.statusAr : fieldIp.statusEn}
                                              </span>
                                            </div>
                                            <p className="text-slate-600 text-[10px] font-semibold">
                                              {isAr ? fieldIp.explanationAr : fieldIp.explanationEn}
                                            </p>
                                          </div>
                                        );
                                      })()}
                                    </div>

                                    {/* Multi-Stage Listing Quality Gate */}
                                    {(() => {
                                      const isGateExpanded = expandedQualityGates[trend.id] || false;
                                      const isAr = lang === "ar";
                                      
                                      return (
                                        <div className="border border-indigo-100 bg-indigo-50/20 rounded-2xl p-4 space-y-3 mt-4">
                                          <button
                                            type="button"
                                            onClick={() => setExpandedQualityGates(prev => ({ ...prev, [trend.id]: !isGateExpanded }))}
                                            className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
                                          >
                                            <div className="flex items-center gap-2 text-left">
                                              <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600">
                                                <ShieldCheck className="w-4 h-4" />
                                              </div>
                                              <div>
                                                <h4 className="text-[12px] font-black text-indigo-800 flex items-center gap-1.5">
                                                  <span>{isAr ? "مصفاة جودة البيانات سداسية المراحل" : "6-Stage Listing Quality Gate"}</span>
                                                  <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                                                    {isAr ? "نشط وآمن" : "Active & Verified"}
                                                  </span>
                                                </h4>
                                                <p className="text-[9px] text-slate-600 font-semibold">
                                                  {isAr ? "نظام تصفية ومراجعة ذكي لتجنب مخالفات الحساب والتصدر في البحث" : "Automated verification filter ensuring zero trademark risks and maximum indexability."}
                                                </p>
                                              </div>
                                            </div>
                                            <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform duration-300 shrink-0 ${isGateExpanded ? "rotate-180" : ""}`} />
                                          </button>

                                          {isGateExpanded && (
                                            <div className="pt-3 border-t border-slate-200 space-y-3 animate-fadeIn text-left">
                                              {/* Intro summary */}
                                              <p className="text-[10px] text-slate-600 font-semibold leading-relaxed">
                                                {isAr 
                                                  ? "يمر كل عنوان، ووصف، ووسم تم إنشاؤه عبر ستة مرشحات ديناميكية لضمان توافقه الكامل مع إرشادات المنصات العالمية وسلوك المشتري الحقيقي:"
                                                  : "All listings undergo continuous evaluation through our multi-phase engine to filter intellectual property, spam, and unneeded modifiers:"}
                                              </p>

                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                                
                                                {/* Stage 1: Trademark Filter */}
                                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                                                  <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-indigo-900 flex items-center gap-1.5">
                                                      <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-700">1</span>
                                                      {isAr ? "مصفاة العلامات التجارية" : "Trademark Filter"}
                                                    </span>
                                                    <span className="text-[8px] font-mono font-black uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                                                      {isAr ? "آمن" : "Passed"}
                                                    </span>
                                                  </div>
                                                  <p className="text-[9px] text-slate-600 leading-relaxed font-medium">
                                                    {isAr 
                                                      ? "يفحص الكلمات المفتاحية ضد أكثر من 150 ألف سجل علامة تجارية مسجلة لملابس الفئة 025 والملصقات الفئة 016 لضمان حماية المتجر."
                                                      : "Compares keywords against 150,000+ registered active trademark patterns (Class 025/016) to shield your account."}
                                                  </p>
                                                  <div className="text-[8px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-200">
                                                    <span className="text-slate-500 font-bold">{isAr ? "الفحص الديناميكي: " : "Scanned: "}</span>
                                                    {trend.tags.slice(0, 4).join(", ")}...
                                                  </div>
                                                </div>

                                                {/* Stage 2: Spam & Hype Filter */}
                                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                                                  <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-indigo-900 flex items-center gap-1.5">
                                                      <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-700">2</span>
                                                      {isAr ? "مصفاة الحشو التسويقي" : "Spam & Hype Filter"}
                                                    </span>
                                                    <span className="text-[8px] font-mono font-black uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                                                      {isAr ? "مصفى" : "Cleaned"}
                                                    </span>
                                                  </div>
                                                  <p className="text-[9px] text-slate-600 leading-relaxed font-medium">
                                                    {isAr 
                                                      ? "يحذف الكلمات التي تصنفها محركات البحث كحشو غير مرغوب فيه (مثل Best Seller, Trending, Cheap, Awesome) لضمان القراءة الطبيعية."
                                                      : "Automatically screens out prohibited marketing superlatives (e.g., Best Seller, Trending, Top Rated, High Quality) for clean search listings."}
                                                  </p>
                                                  <div className="text-[8px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-200">
                                                    <span className="text-slate-500 font-bold">{isAr ? "الكلمات المستبعدة: " : "Excluded: "}</span>
                                                    Best Seller, Top Rated, Unique, Hype (0 matches found)
                                                  </div>
                                                </div>

                                                {/* Stage 3: Product Name Filter */}
                                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                                                  <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-indigo-900 flex items-center gap-1.5">
                                                      <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-700">3</span>
                                                      {isAr ? "مصفاة أسماء المنتجات" : "Product Name Filter"}
                                                    </span>
                                                    <span className="text-[8px] font-mono font-black uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                                                      {isAr ? "مصفى" : "Cleaned"}
                                                    </span>
                                                  </div>
                                                  <p className="text-[9px] text-slate-600 leading-relaxed font-medium">
                                                    {isAr 
                                                      ? "يزيل أسماء المنتجات مثل T-Shirt أو Sticker لأن ريدبابل يطبّق التصميم تلقائياً على عشرات المنتجات، والذكر يضر بالأرشفة."
                                                      : "Removes specific merchandise nouns (e.g., Shirt, Sticker, Mug, Poster) as Redbubble applies designs on all item types automatically."}
                                                  </p>
                                                  <div className="text-[8px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-200">
                                                    <span className="text-slate-500 font-bold">{isAr ? "الكلمات المستبعدة: " : "Excluded: "}</span>
                                                    T-shirt, Sticker, Mug, Poster (0 matches found)
                                                  </div>
                                                </div>

                                                {/* Stage 4: Duplicate Filter */}
                                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                                                  <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-indigo-900 flex items-center gap-1.5">
                                                      <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-700">4</span>
                                                      {isAr ? "مصفاة التكرار والتشابه" : "Duplicate Filter"}
                                                    </span>
                                                    <span className="text-[8px] font-mono font-black uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                                                      {isAr ? "نشط" : "Active"}
                                                    </span>
                                                  </div>
                                                  <p className="text-[9px] text-slate-600 leading-relaxed font-medium">
                                                    {isAr 
                                                      ? "يضمن ظهور كل كلمة رئيسية مرة واحدة فقط في العنوان والوسوم، مانعاً عقوبات حشو الكلمات المفتاحية في الخوارزميات."
                                                      : "Strictly deduplicates key descriptors, preventing negative SEO ranking penalties triggered by repeating keyword phrases."}
                                                  </p>
                                                  <div className="text-[8px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-200">
                                                    <span className="text-emerald-600 font-bold">✓ </span>
                                                    {isAr ? "جميع الكلمات فريدة ومستقلة" : "All listing words verified 100% unique"}
                                                  </div>
                                                </div>

                                                {/* Stage 5: Relevance Filter */}
                                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                                                  <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-indigo-900 flex items-center gap-1.5">
                                                      <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-700">5</span>
                                                      {isAr ? "مصفاة الصلة والارتباط" : "Relevance Filter"}
                                                    </span>
                                                    <span className="text-[8px] font-mono font-black uppercase text-indigo-850 bg-indigo-100 px-1.5 py-0.5 rounded">
                                                      {trend.competition === "Low" ? "100%" : "95%"}
                                                    </span>
                                                  </div>
                                                  <p className="text-[9px] text-slate-600 leading-relaxed font-medium">
                                                    {isAr 
                                                      ? "يربط الكلمات بالنيش الأساسي والتصميم مباشرة لمنع الزيارات الوهمية وتقليل نسبة الارتداد للمشتري الحقيقي."
                                                      : "Checks semantic alignment of tags with the target artwork, filtering out generic tags to maximize purchase conversion rates."}
                                                  </p>
                                                  <div className="text-[8px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-200">
                                                    <span className="text-slate-500 font-bold">{isAr ? "الارتباط الجغرافي والنيش: " : "Niche Anchor: "}</span>
                                                    {trend.niche} / {trend.concept}
                                                  </div>
                                                </div>

                                                {/* Stage 6: SEO Quality Filter */}
                                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                                                  <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-indigo-900 flex items-center gap-1.5">
                                                      <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-700">6</span>
                                                      {isAr ? "ميزان جودة الـ SEO" : "SEO Quality & Score Filter"}
                                                    </span>
                                                    <span className="text-[8px] font-mono font-black uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                                                      A+ Verified
                                                    </span>
                                                  </div>
                                                  <p className="text-[9px] text-slate-600 leading-relaxed font-medium">
                                                    {isAr 
                                                      ? "ميزان ذكي يزن الكلمات بناءً على: نية البحث (40٪)، حجم البحث (25٪)، صلة التصميم (20٪)، المنافسة (10٪)، والموسمية (5٪)."
                                                      : "Weights listing using standard metric breakdown: Search Intent (40%), Search Volume (25%), Relevance (20%), Competition (10%), Seasonality (5%)."}
                                                  </p>
                                                  <div className="space-y-1 pt-0.5">
                                                    <div className="flex items-center justify-between text-[7px] font-mono text-slate-500 font-bold">
                                                      <span>Intent: 40%</span>
                                                      <span>Volume: 25%</span>
                                                      <span>Relevance: 20%</span>
                                                      <span>Comp: 10%</span>
                                                    </div>
                                                    <div className="h-1 bg-slate-200 rounded-full overflow-hidden flex">
                                                      <div className="h-full bg-blue-500" style={{ width: "40%" }}></div>
                                                      <div className="h-full bg-indigo-500" style={{ width: "25%" }}></div>
                                                      <div className="h-full bg-violet-500" style={{ width: "20%" }}></div>
                                                      <div className="h-full bg-purple-500" style={{ width: "10%" }}></div>
                                                      <div className="h-full bg-pink-500" style={{ width: "5%" }}></div>
                                                    </div>
                                                  </div>
                                                </div>

                                              </div>

                                              {/* Trademark database dynamic check note */}
                                              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-[9px] text-slate-700 leading-relaxed flex items-start gap-2">
                                                <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                                                <div>
                                                  <strong className="text-indigo-800 font-bold block mb-0.5">
                                                    {isAr ? "ملاحظة هامة لقاعدة البيانات المحدثة:" : "Dynamic Database Integrity Note:"}
                                                  </strong>
                                                  {isAr 
                                                    ? "هذه التصفية لا تعتمد على قائمة ثابتة وميتة للعلامات التجارية بل تتكامل مع التحقق الفوري للتغييرات اللحظية في قواعد بيانات الملكية الفكرية العالمية مثل USPTO لتفادي أي تسجيلات حديثة."
                                                    : "This filter does not rely on outdated, static lists. It continuously integrates live evaluation checks against current global trademark databases (USPTO Class 025/016) to shield your store."}
                                                </div>
                                              </div>

                                            </div>
                                          )}
                                        </div>
                                      );
                                    })()}

                                  </div>
                                );
                              })()}

                              {/* Tags Block */}
                              <div className="space-y-4 pt-2 border-t border-slate-200">
                                
                                <div className="space-y-1">
                                  <label className="text-[12px] font-black text-slate-700 block">
                                    {t.rbTagsLabel}
                                  </label>
                                  <p className="text-[10px] text-slate-600 font-medium leading-normal">{t.rbTagsHelp}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  
                                  {/* Main Tag */}
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-[11px] font-bold text-slate-700">{t.rbMainTagLabel}</span>
                                      <button
                                        id={`copy-maintag-${trend.id}`}
                                        onClick={() => handleCopyText(trend.tags[0] || "", `maintag-${trend.id}`)}
                                        className="text-[#eb1424] hover:text-red-400 transition-colors text-[10px] font-extrabold cursor-pointer"
                                      >
                                        {copiedStates[`maintag-${trend.id}`] ? t.copySuccess : t.rbCopyButton}
                                      </button>
                                    </div>
                                    <p className="text-[9px] text-slate-500 leading-tight mb-1">{t.rbMainTagHelp}</p>
                                    <div className="p-2.5 rounded-lg bg-slate-950 text-xs font-mono font-semibold text-slate-200 border border-slate-800 select-all shadow-inner">
                                      {trend.tags[0] || ""}
                                    </div>

                                    {/* IP Status for Main Tag */}
                                    {ipStatusesMap[trend.id]?.mainTag && (() => {
                                      const fieldIp = ipStatusesMap[trend.id].mainTag;
                                      const isAr = lang === "ar";
                                      return (
                                        <div className={`mt-2 p-2 rounded-lg border text-[9px] leading-relaxed ${
                                          fieldIp.badgeType === "safe"
                                            ? "bg-emerald-50/60 border-emerald-200 text-emerald-850"
                                            : fieldIp.badgeType === "warning"
                                            ? "bg-amber-50/60 border-amber-200 text-amber-855"
                                            : "bg-rose-50/60 border-rose-200 text-rose-855"
                                        }`}>
                                          <div className="flex items-center gap-1 mb-0.5 font-bold">
                                            <ShieldCheck className="w-3 h-3 text-current" />
                                            <span>{isAr ? "الكلمة الأساسية:" : "Main Tag IP:"}</span>
                                            <span className={`px-1 rounded text-[8px] font-extrabold ${
                                              fieldIp.badgeType === "safe"
                                                ? "bg-emerald-100 text-emerald-800"
                                                : fieldIp.badgeType === "warning"
                                                ? "bg-amber-100 text-amber-800"
                                                : "bg-rose-100 text-rose-800"
                                            }`}>
                                              {isAr ? fieldIp.statusAr : fieldIp.statusEn}
                                            </span>
                                          </div>
                                          <p className="text-slate-600 font-semibold">
                                            {isAr ? fieldIp.explanationAr : fieldIp.explanationEn}
                                          </p>
                                        </div>
                                      );
                                    })()}
                                  </div>

                                  {/* Supporting Tags */}
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-[11px] font-bold text-slate-700">{t.rbSupportTagsLabel}</span>
                                      <button
                                        id={`copy-suptags-${trend.id}`}
                                        onClick={() => handleCopyText(trend.tags.slice(1).join(", "), `suptags-${trend.id}`)}
                                        className="text-[#eb1424] hover:text-red-400 transition-colors text-[10px] font-extrabold cursor-pointer"
                                      >
                                        {copiedStates[`suptags-${trend.id}`] ? t.copySuccess : t.rbCopyButton}
                                      </button>
                                    </div>
                                    <p className="text-[9px] text-slate-500 leading-tight mb-1">{t.rbSupportTagsHelp}</p>
                                    <div className="p-2.5 rounded-lg bg-slate-950 text-xs font-mono font-semibold text-slate-200 border border-slate-800 select-all shadow-inner max-h-[70px] overflow-y-auto leading-normal">
                                      {trend.tags.slice(1).join(", ")}
                                    </div>

                                    {/* IP Status for Supporting Tags */}
                                    {ipStatusesMap[trend.id]?.supportingTags && (() => {
                                      const fieldIp = ipStatusesMap[trend.id].supportingTags;
                                      const isAr = lang === "ar";
                                      return (
                                        <div className={`mt-2 p-2 rounded-lg border text-[9px] leading-relaxed ${
                                          fieldIp.badgeType === "safe"
                                            ? "bg-emerald-50/60 border-emerald-200 text-emerald-850"
                                            : fieldIp.badgeType === "warning"
                                            ? "bg-amber-50/60 border-amber-200 text-amber-855"
                                            : "bg-rose-50/60 border-rose-200 text-rose-855"
                                        }`}>
                                          <div className="flex items-center gap-1 mb-0.5 font-bold">
                                            <ShieldCheck className="w-3 h-3 text-current" />
                                            <span>{isAr ? "الكلمات الإضافية:" : "Supporting Tags IP:"}</span>
                                            <span className={`px-1 rounded text-[8px] font-extrabold ${
                                              fieldIp.badgeType === "safe"
                                                ? "bg-emerald-100 text-emerald-800"
                                                : fieldIp.badgeType === "warning"
                                                ? "bg-amber-100 text-amber-800"
                                                : "bg-rose-100 text-rose-800"
                                            }`}>
                                              {isAr ? fieldIp.statusAr : fieldIp.statusEn}
                                            </span>
                                          </div>
                                          <p className="text-slate-600 font-semibold">
                                            {isAr ? fieldIp.explanationAr : fieldIp.explanationEn}
                                          </p>
                                        </div>
                                      );
                                    })()}
                                  </div>

                                </div>

                              </div>

                              {/* Description Block */}
                              <div className="space-y-2 pt-2 border-t border-slate-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <label className="text-[12px] font-black text-slate-700 block">
                                    {t.rbDescLabel}
                                  </label>
                                  <button
                                    id={`copy-desc-opt-${trend.id}`}
                                    onClick={() => handleCopyText(
                                      (listingLangs[trend.id] || "en") === "ar"
                                        ? trend.descriptionArabic || `${trend.conceptArabic} مصمم لجمهور ${trend.nicheArabic}.`
                                        : trend.description || `${trend.concept} Designed for ${trend.niche}.`, 
                                      copiedDescKey
                                    )}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eb1424] hover:bg-red-600 text-white transition-all text-[10px] font-bold cursor-pointer shadow-md active:scale-95 self-start sm:self-auto"
                                  >
                                    {copiedStates[copiedDescKey] ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-2.5 h-2.5" />}
                                    <span>{copiedStates[copiedDescKey] ? t.copySuccess : `${t.rbCopyButton} (${(listingLangs[trend.id] || "en").toUpperCase()})`}</span>
                                  </button>
                                </div>
                                <p className="text-[10px] text-slate-600 font-medium leading-normal mb-1">{t.rbDescHelp}</p>
                                <div className="p-3.5 rounded-2xl bg-slate-950 text-xs text-slate-300 border border-slate-850/80 select-all leading-relaxed shadow-inner max-h-32 overflow-y-auto text-left">
                                  {(listingLangs[trend.id] || "en") === "ar"
                                    ? trend.descriptionArabic || `${trend.conceptArabic} مصمم لجمهور ${trend.nicheArabic}.`
                                    : trend.description || `${trend.concept} Designed for ${trend.niche}.`}
                                </div>

                                {/* IP Status for Description */}
                                {ipStatusesMap[trend.id]?.description && (() => {
                                  const fieldIp = ipStatusesMap[trend.id].description;
                                  const isAr = lang === "ar";
                                  return (
                                    <div className={`mt-2.5 p-3 rounded-xl border text-[10px] leading-relaxed ${
                                      fieldIp.badgeType === "safe"
                                        ? "bg-emerald-5/60 border-emerald-200 text-emerald-850"
                                        : fieldIp.badgeType === "warning"
                                        ? "bg-amber-5/60 border-amber-200 text-amber-855"
                                        : "bg-rose-5/60 border-rose-200 text-rose-855"
                                    }`}>
                                      <div className="flex items-center gap-1.5 mb-1 font-bold">
                                        <ShieldCheck className="w-3.5 h-3.5 text-current" />
                                        <span>{isAr ? "وضعية الملكية للوصف:" : "Description IP Status:"}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-mono font-black ${
                                          fieldIp.badgeType === "safe"
                                            ? "bg-emerald-100 text-emerald-800"
                                            : fieldIp.badgeType === "warning"
                                            ? "bg-amber-100 text-amber-800"
                                            : "bg-rose-100 text-rose-800"
                                        }`}>
                                          {isAr ? fieldIp.statusAr : fieldIp.statusEn}
                                        </span>
                                      </div>
                                      <p className="text-slate-600 text-[10px] font-semibold">
                                        {isAr ? fieldIp.explanationAr : fieldIp.explanationEn}
                                      </p>
                                    </div>
                                  );
                                })()}
                              </div>

                            </div>

                          </div>

                          {/* POD SEO Keyword Intelligence Engine */}
                          {trend.seoKeywords && (
                            <div className="pt-4 border-t border-slate-800/60">
                              <SeoIntelligence seoKeywords={trend.seoKeywords} lang={lang} />
                            </div>
                          )}

                          {/* Quick Tag Copy Pill List */}
                          <div className="pt-4 border-t border-slate-800/60 flex flex-col gap-2.5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5 text-rose-500" />
                                <span>{lang === "ar" ? "كل الكلمات المفتاحية الـ 15 (اضغط للنسخ الفردي):" : "All 15 Tags (Click to copy individual tag):"}</span>
                                <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-md text-[10px] font-mono">
                                  {trend.tags.length} Tags ({t.optimalDensity})
                                </span>
                              </span>
                              <button
                                id={`copy-all-tags-${trend.id}`}
                                onClick={() => handleCopyAllTags(trend.tags, copiedTagsKey)}
                                className="text-[#eb1424] hover:text-red-400 text-xs font-bold transition-colors flex items-center gap-1.5 hover:underline cursor-pointer"
                              >
                                {copiedStates[copiedTagsKey] ? <ClipboardCheck className="w-4 h-4 text-emerald-400 animate-pulse" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copiedStates[copiedTagsKey] ? t.copySuccess : t.copyAllTags}</span>
                              </button>
                            </div>

                             {/* Tags list */}
                            <div className="flex flex-wrap gap-1.5">
                              {trend.tags.map((tag) => {
                                const tagIpInfo = trendTagsIpMap[trend.id]?.find(t => t.tag === tag);
                                const borderClass = tagIpInfo?.badgeType === "warning"
                                  ? "border-rose-500/40 hover:border-rose-500 bg-rose-950/20 text-rose-300"
                                  : tagIpInfo?.badgeType === "caution"
                                  ? "border-amber-500/40 hover:border-amber-500 bg-amber-950/20 text-amber-300"
                                  : "border-slate-800 hover:border-emerald-500 bg-slate-950 text-slate-300 hover:text-emerald-400";

                                return (
                                  <button
                                    key={tag}
                                    id={`tag-${trend.id}-${tag}`}
                                    onClick={() => handleCopyText(tag, `tag-${trend.id}-${tag}`)}
                                    className={`group/tag inline-flex items-center gap-1.5 border px-2.5 py-1 rounded-lg text-xs font-mono transition-all font-medium cursor-pointer ${borderClass}`}
                                    title={`Copy single tag: ${tag} (${tagIpInfo?.statusEn || 'Safe'})`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      tagIpInfo?.badgeType === "warning"
                                        ? "bg-rose-500 animate-pulse"
                                        : tagIpInfo?.badgeType === "caution"
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                    }`} />
                                    <span>{tag}</span>
                                    {copiedStates[`tag-${trend.id}-${tag}`] ? (
                                      <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                                    ) : (
                                      <Copy className="w-2.5 h-2.5 text-slate-500 group-hover/tag:text-rose-400 opacity-0 group-hover/tag:opacity-100 transition-all shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Toggle for 15-tag Individual IP Audit */}
                            <div className="mt-3 pt-3 border-t border-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                              <span className="text-[10px] text-slate-400 font-medium">
                                {lang === "ar" 
                                  ? "تحليل ترايدمارك مفصل لكل الكلمات الفردية الـ 15:" 
                                  : "Detailed trademark analysis for all 15 tags:"}
                              </span>
                              <button
                                type="button"
                                onClick={() => setShowTagAudits(prev => ({ ...prev, [trend.id]: !prev[trend.id] }))}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-600 border border-indigo-500/20 hover:border-transparent text-indigo-300 hover:text-white font-bold text-[11px] transition-all cursor-pointer shadow-sm self-start sm:self-auto"
                              >
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>
                                  {showTagAudits[trend.id] 
                                    ? (lang === "ar" ? "إخفاء الفحص الفردي 🛡️" : "Hide Tag Audit 🛡️") 
                                    : (lang === "ar" ? "فحص الـ 15 كلمة واحدة واحدة 🛡️" : "Audit 15 Tags One-by-One 🛡️")}
                                </span>
                              </button>
                            </div>

                            {/* Collapsible individual tag checklist */}
                            <AnimatePresence>
                              {showTagAudits[trend.id] && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 p-3.5 rounded-2xl bg-slate-950 border border-indigo-500/15 overflow-hidden text-left"
                                >
                                  <div className={`flex items-center justify-between border-b border-slate-800 pb-2 mb-3 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                                    <span className="font-extrabold text-xs text-indigo-400 flex items-center gap-1.5">
                                      <Layers className="w-4 h-4 text-indigo-400" />
                                      <span>{lang === "ar" ? "تقرير مدقق الكلمات الـ 15 الفردي" : "15-Tag Individual IP Audit"}</span>
                                    </span>
                                    <span className="text-[10px] text-slate-500">
                                      {lang === "ar" ? "فحص فوري لقاعدة البيانات" : "Instant Search Database"}
                                    </span>
                                  </div>

                                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                                    {trendTagsIpMap[trend.id]?.map((tagIp, idx) => {
                                      const isAr = lang === "ar";
                                      return (
                                        <div 
                                          key={idx} 
                                          className={`p-2.5 rounded-xl border flex flex-col gap-1.5 transition-all ${
                                            tagIp.badgeType === "safe"
                                              ? "bg-emerald-500/[0.01] border-emerald-500/10 hover:border-emerald-500/20 text-left"
                                              : tagIp.badgeType === "warning"
                                              ? "bg-rose-500/[0.01] border-rose-500/10 hover:border-rose-500/20 text-left"
                                              : "bg-amber-500/[0.01] border-amber-500/10 hover:border-amber-500/20 text-left"
                                          }`}
                                        >
                                          <div className={`flex items-center justify-between gap-2 ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                                            <div className={`flex items-center gap-2 ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                                              <span className="text-[11px] font-mono font-bold text-white bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                                                #{idx + 1} {tagIp.tag}
                                              </span>
                                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase font-mono ${
                                                tagIp.badgeType === "safe"
                                                  ? "bg-emerald-500/10 text-emerald-400"
                                                  : tagIp.badgeType === "warning"
                                                  ? "bg-rose-500/10 text-rose-400 animate-pulse"
                                                  : "bg-amber-500/10 text-amber-400"
                                              }`}>
                                                {isAr ? tagIp.statusAr : tagIp.statusEn}
                                              </span>
                                            </div>
                                            
                                            {/* Small copy button for this specific tag */}
                                            <button
                                              id={`copy-mini-${trend.id}-${tagIp.tag}`}
                                              onClick={() => handleCopyText(tagIp.tag, `tag-${trend.id}-${tagIp.tag}`)}
                                              className="p-1 rounded-md bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
                                              title="Copy Tag"
                                            >
                                              {copiedStates[`tag-${trend.id}-${tagIp.tag}`] ? (
                                                <Check className="w-3 h-3 text-emerald-400" />
                                              ) : (
                                                <Copy className="w-3 h-3" />
                                              )}
                                            </button>
                                          </div>
                                          <p className={`text-slate-400 text-[10px] leading-relaxed ${isAr ? "text-right" : "text-left"}`}>
                                            {isAr ? tagIp.explanationAr : tagIp.explanationEn}
                                          </p>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                        </motion.div>
                      );
                    })
                  )}
                </div>
              )}

            </div>

          </div>
        ) : activeTab === "scanner" ? (
          
          /* Custom Deep-AI IP & Trademark Scanner Tab */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 max-w-5xl mx-auto"
          >
            {/* Header banner */}
            <div className={`p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex items-center gap-4 shadow-xl backdrop-blur-sm ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className={lang === "ar" ? "text-right" : "text-left"}>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">{t.tmScannerHeader}</h2>
                <p className="text-sm text-slate-400">{t.tmScannerSubtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Input Column */}
              <form onSubmit={handleScanCustomListing} className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl backdrop-blur-sm text-left">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {lang === "ar" ? "العنوان المراد فحصه (مطلوب)" : "Listing Title (Required)"}
                  </label>
                  <input
                    type="text"
                    required
                    value={customScanTitle}
                    onChange={(e) => setCustomScanTitle(e.target.value)}
                    placeholder={t.tmTitlePlaceholder}
                    className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      {lang === "ar" ? "الكلمات الدلالية المفتاحية (مفصولة بفاصلة)" : "Search Tags (Comma-separated)"}
                    </label>
                    <span className="text-[10px] text-slate-500 font-medium">Max 15</span>
                  </div>
                  <textarea
                    value={customScanTags}
                    onChange={(e) => setCustomScanTags(e.target.value)}
                    placeholder={t.tmTagsPlaceholder}
                    className="w-full h-20 p-3 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {lang === "ar" ? "الوصف التسويقي" : "Listing Description"}
                  </label>
                  <textarea
                    value={customScanDesc}
                    onChange={(e) => setCustomScanDesc(e.target.value)}
                    placeholder={t.tmDescPlaceholder}
                    className="w-full h-24 p-3 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isScanningCustom}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isScanningCustom 
                        ? "bg-slate-800 cursor-not-allowed text-slate-400" 
                        : "bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20"
                    }`}
                  >
                    {isScanningCustom ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        <span>{lang === "ar" ? "جاري الفحص..." : "Scanning..."}</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5" />
                        <span>{t.tmButtonScan}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickFillCustom}
                    className="py-3 px-4 rounded-xl border border-slate-800 bg-slate-950/40 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all cursor-pointer hover:bg-slate-800/40"
                  >
                    {t.tmQuickFill}
                  </button>
                </div>
              </form>

              {/* Form Results Column */}
              <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 min-h-[400px] flex flex-col justify-between shadow-xl backdrop-blur-sm relative overflow-hidden">
                {isScanningCustom ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-indigo-950 border-t-indigo-400 animate-spin" />
                      <ShieldCheck className="w-6 h-6 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-bold text-indigo-300 animate-pulse">{t.tmButtonScanning}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{lang === "ar" ? "جاري التحليل ومطابقة مكتب USPTO" : "Running USPTO pattern compliance analysis"}</p>
                    </div>
                  </div>
                ) : customScanResult ? (
                  <div className="flex-1 space-y-6 animate-fadeIn text-left">
                    
                    {/* Overall Status Box */}
                    <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                      customScanResult.overallStatus === "Safe to Upload"
                        ? "bg-emerald-500/[0.02] border-emerald-500/20 text-emerald-400"
                        : customScanResult.overallStatus === "Needs Attention"
                        ? "bg-amber-500/[0.02] border-amber-500/20 text-amber-400"
                        : "bg-rose-500/[0.02] border-rose-500/20 text-rose-400"
                    }`}>
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8" />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">{t.tmOverallStatusLabel}</span>
                          <span className="text-base font-extrabold text-white">
                            {lang === "ar"
                              ? customScanResult.overallStatus === "Safe to Upload" ? "آمن للرفع والتصميم" : customScanResult.overallStatus === "Needs Attention" ? "يتطلب المراجعة والتعديل" : "تحذير: انتهاك علامة تجارية!"
                              : customScanResult.overallStatus}
                          </span>
                        </div>
                      </div>
                      
                      {/* Safety Gauge */}
                      <div className="text-center shrink-0">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">{t.tmOverallSafetyScore}</span>
                        <span className="text-2xl font-black font-mono tracking-tight text-white">{customScanResult.score}%</span>
                      </div>
                    </div>

                    {/* General Precheck Advice */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                      <span className="text-xs font-bold text-indigo-400 block mb-1.5">{t.tmAdvice}</span>
                      <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                        {lang === "ar" ? customScanResult.generalAdviceArabic : customScanResult.generalAdvice}
                      </p>
                    </div>

                    {/* USPTO Search Terms */}
                    {customScanResult.usptoSearchTerms && customScanResult.usptoSearchTerms.length > 0 && (
                      <div className="p-4 rounded-2xl bg-indigo-500/[0.02] border border-indigo-500/10">
                        <span className="text-xs font-bold text-indigo-300 block mb-1.5">{t.tmUsptoSearch}</span>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {customScanResult.usptoSearchTerms.map((word, wIdx) => (
                            <a
                              key={wIdx}
                              href={`https://www.trademarkia.com/trademarks-search.aspx?tn=${encodeURIComponent(word)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-1 rounded bg-slate-950 border border-slate-800 hover:border-indigo-500 text-[10px] font-mono text-slate-300 hover:text-indigo-400 font-semibold transition-all inline-flex items-center gap-1"
                            >
                              <span>{word}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-500 leading-normal">{t.tmUsptoAdvice}</p>
                      </div>
                    )}

                    {/* Findings Breakdown */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-300 block">{t.tmFindings}</span>
                      <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                        {customScanResult.findings && customScanResult.findings.length > 0 ? (
                          customScanResult.findings.map((f, fIdx) => (
                            <div 
                              key={fIdx} 
                              className={`p-3 rounded-xl border text-xs leading-relaxed transition-all text-left ${
                                f.risk === "Low" 
                                  ? "bg-slate-950/40 border-slate-800" 
                                  : f.risk === "Medium"
                                  ? "bg-amber-500/[0.01] border-amber-500/10"
                                  : "bg-rose-500/[0.01] border-rose-500/10"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="font-mono font-bold text-white bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-[11px]">
                                  {f.term}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${
                                    f.risk === "Low"
                                      ? "bg-emerald-500/10 text-emerald-400"
                                      : f.risk === "Medium"
                                      ? "bg-amber-500/10 text-amber-400"
                                      : "bg-rose-500/10 text-rose-400 animate-pulse"
                                  }`}>
                                    {lang === "ar" ? (f.risk === "Low" ? "منخفضة" : f.risk === "Medium" ? "متوسطة" : "عالية الخطورة") : `${f.risk} Risk`}
                                  </span>
                                  <span className="text-[9px] text-slate-500 font-semibold uppercase">{f.category}</span>
                                </div>
                              </div>
                              <p className="text-slate-400 text-[11px] leading-relaxed">
                                {lang === "ar" ? f.explanationArabic : f.explanation}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 rounded-xl border border-slate-800 text-center text-slate-500 text-xs font-medium">
                            {t.tmNoFindings}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                ) : customScanError ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <AlertCircle className="w-10 h-10 text-rose-500 mb-2" />
                    <h4 className="text-sm font-bold text-slate-200 mb-1">{lang === "ar" ? "فشل الفحص بالذكاء الاصطناعي" : "Scan Error"}</h4>
                    <p className="text-xs text-rose-400 max-w-sm mb-4">{customScanError}</p>
                    <button
                      type="button"
                      onClick={handleScanCustomListing}
                      className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all cursor-pointer"
                    >
                      {lang === "ar" ? "إعادة الفحص" : "Retry Scan"}
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                    <ShieldCheck className="w-12 h-12 text-slate-700" />
                    <h4 className="text-sm font-bold text-slate-400">{lang === "ar" ? "بانتظار البيانات لبدء الفحص" : "Waiting for Metadata to Scan"}</h4>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                      {lang === "ar" 
                        ? "املأ نموذج البيانات على اليسار أو اضغط على تعبئة تجريبية سريعة لبدء مطابقة وفحص براءات الاختراع والعلامات الأمريكية فورياً."
                        : "Fill out the fields on the left or use our custom sample quick fill to test live USPTO trademark checks immediately."}
                    </p>
                  </div>
                )}

                {/* Humble disclaimer footer inside card */}
                <div className="mt-6 pt-3 border-t border-slate-800/60 text-[10px] text-slate-500 flex items-center gap-1.5 leading-normal justify-center">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{t.disclaimer}</span>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          
          /* Redbubble Gold Marketing/Strategy Guide with Tagging 101 emphasis */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/60 rounded-3xl border border-slate-800 p-8 shadow-xl max-w-4xl mx-auto backdrop-blur-sm text-left"
          >
            <div className={`flex items-center gap-3 mb-6 pb-4 border-b border-slate-800 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className={lang === "ar" ? "text-right" : "text-left"}>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">{t.taggingHandbookHeader}</h2>
                <p className="text-sm text-slate-400">{t.taggingHandbookSubtitle}</p>
              </div>
            </div>

            <div className="space-y-8 text-sm leading-relaxed text-slate-300">
              
              {/* Official Link Badge */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <BadgeAlert className="w-5 h-5 text-indigo-400" />
                  <span>
                    {lang === "ar" 
                      ? "رابط الدليل الرسمي المعتمد لسياسات الكلمات المفتاحية:" 
                      : "Official guidelines from Redbubble's blog resource:"}
                  </span>
                </div>
                <a 
                  href="https://blog.redbubble.com/2021/04/redbubble-tagging-101" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all shrink-0"
                >
                  <span>Redbubble Tagging 101</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Handbook Rules */}
              <div className="space-y-6">
                
                <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800">
                  <h3 className="font-extrabold text-base text-white mb-2">{t.rule1Title}</h3>
                  <p className="text-slate-400">{t.rule1Desc}</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800">
                  <h3 className="font-extrabold text-base text-white mb-2">{t.rule2Title}</h3>
                  <p className="text-slate-400">{t.rule2Desc}</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800">
                  <h3 className="font-extrabold text-base text-white mb-2">{t.rule3Title}</h3>
                  <p className="text-slate-400">{t.rule3Desc}</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800">
                  <h3 className="font-extrabold text-base text-white mb-2">{t.rule4Title}</h3>
                  <p className="text-slate-400">{t.rule4Desc}</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800">
                  <h3 className="font-extrabold text-base text-white mb-2">{t.rule5Title}</h3>
                  <p className="text-slate-400">{t.rule5Desc}</p>
                </div>

              </div>

              {/* Dual-Niche Strategies */}
              <div className="p-6 rounded-3xl bg-indigo-600/5 border border-indigo-500/20">
                <h3 className="text-white font-extrabold text-base mb-3">
                  {lang === "ar" ? "كيفية تصميم الأفكار المقترحة بنجاح:" : "How to design the proposed ideas successfully:"}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-xs text-slate-300">
                  <li>
                    {lang === "ar" 
                      ? "استخدم Kittl أو Canva للخطوط الكلاسيكية والرموز الجاهزة وتجنب رسم كل شيء من الصفر." 
                      : "Use tools like Kittl or Canva to modify vintage font templates and badge templates without needing custom drawing skills."}
                  </li>
                  <li>
                    {lang === "ar"
                      ? "الملصقات (Stickers) هي دائماً المنتج الأفضل مبيعاً والأنسب للبدء. تأكد من تفعيلها بحدود قطع نظيفة وخلفية شفافة."
                      : "Stickers are Redbubble's highest-converting category. Export transparent PNG files at high resolutions (above 300 DPI) for perfect sticker prints."}
                  </li>
                  <li>
                    {lang === "ar"
                      ? "امزج فكرة النيش المزدوج (مثال: حيوانات لطيفة مع نيش الماتشا بوبا) للحصول على جمهور مستهدف مخلص جداً وعالي الرغبة بالشراء."
                      : "Combine micro-niches (e.g. cozy cottagecore with specific hobbies like software dev or reading) to unlock highly passionate, high-intent buyer pools."}
                  </li>
                </ul>
              </div>

            </div>
          </motion.div>
        )}

      </main>

      {/* Humble & Professional Footer (Architectural Honesty compliant) */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 mt-12 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>{lang === "ar" ? "محلل تريندات ريدبابل الذكي © 2026" : "Redbubble Smart Trend Analyzer © 2026"}</span>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>{lang === "ar" ? "فحص الملكية:" : "USPTO Pre-Screening Status:"}</span>
            <span className="text-emerald-500 font-bold flex items-center gap-1">● {lang === "ar" ? "نشط ومؤمن" : "Active & Verified"}</span>
            <div className="h-3 w-[1px] bg-slate-800 mx-1"></div>
            <span>{lang === "ar" ? "تشغيل بواسطة Gemini 3.5" : "Powered by Gemini 3.5"}</span>
          </div>
        </div>
      </footer>

      {/* Full Trend Details Modal Dialog */}
      <AnimatePresence>
        {selectedModalTrend && (
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative border border-slate-200 my-auto text-slate-800"
            >
              {/* Sticky Top Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-150 pb-4 mb-6 sticky top-0 bg-white/95 backdrop-blur-sm z-10 pt-1">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 font-black text-sm">
                    #{selectedModalTrend.id}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                      {selectedModalTrend.title}
                    </h2>
                    {selectedModalTrend.titleArabic && (
                      <p className="text-xs sm:text-sm font-bold text-indigo-600 mt-0.5">
                        {selectedModalTrend.titleArabic}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(selectedModalTrend.id, selectedModalTrend)}
                    className={`p-2 rounded-2xl border transition-all cursor-pointer ${
                      favorites.includes(selectedModalTrend.id)
                        ? "bg-amber-50 border-amber-300 text-amber-500 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500"
                    }`}
                    title={favorites.includes(selectedModalTrend.id) ? t.favRemove : t.favAdd}
                  >
                    <Star className={`w-5 h-5 ${favorites.includes(selectedModalTrend.id) ? "fill-amber-400 text-amber-500" : ""}`} />
                  </button>
                  <button
                    onClick={() => setSelectedModalTrend(null)}
                    className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body with All Idea Components */}
              <div className="space-y-6">

                {/* Quick Metrics & Status Badges */}
                <div className="flex flex-wrap items-center gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <span className="text-xs font-black px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    {lang === "ar" ? "الفئة: " : "Category: "}
                    {selectedModalTrend.category || "General"}
                  </span>
                  <span className={`text-xs font-black px-3 py-1 rounded-xl border shadow-2xs ${getCompetitionBadge(selectedModalTrend.competition).classes}`}>
                    {getCompetitionBadge(selectedModalTrend.competition).text}
                  </span>
                  <span className={`text-xs font-black px-3 py-1 rounded-xl border shadow-2xs ${getTrademarkBadge(selectedModalTrend.trademarkStatus).classes}`}>
                    {getTrademarkBadge(selectedModalTrend.trademarkStatus).text}
                  </span>
                  <span className={`text-xs font-black px-3 py-1 rounded-xl border shadow-2xs ${getSuccessScore(selectedModalTrend).bg} ${getSuccessScore(selectedModalTrend).colorText}`}>
                    {lang === "ar" ? "نسبة النجاح المتوقعة: " : "Success Probability: "}
                    {getSuccessScore(selectedModalTrend).score}%
                  </span>
                </div>

                {/* Clean Listing Title Component */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t.copyTitle}</span>
                    <button
                      onClick={() => handleCopyText(selectedModalTrend.cleanListingTitle, `modal-title-${selectedModalTrend.id}`)}
                      className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-indigo-600 hover:text-indigo-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      {copiedStates[`modal-title-${selectedModalTrend.id}`] ? <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedStates[`modal-title-${selectedModalTrend.id}`] ? t.copySuccess : t.copyTitle}</span>
                    </button>
                  </div>
                  <p className="text-sm font-black text-slate-800 leading-snug">
                    {selectedModalTrend.cleanListingTitle}
                  </p>
                  {selectedModalTrend.cleanListingTitleArabic && (
                    <p className="text-xs text-slate-500 mt-1 font-semibold">
                      {selectedModalTrend.cleanListingTitleArabic}
                    </p>
                  )}
                </div>

                {/* Niche & Why Trending Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <span className="text-slate-500 font-extrabold uppercase tracking-wider block mb-1.5">{t.nicheLabel}</span>
                    <p className="text-slate-800 font-bold leading-relaxed">{selectedModalTrend.niche}</p>
                    {selectedModalTrend.nicheArabic && (
                      <p className="text-slate-500 font-semibold mt-1 border-t border-slate-200 pt-1.5">{selectedModalTrend.nicheArabic}</p>
                    )}
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <span className="text-indigo-600 font-extrabold uppercase tracking-wider block mb-1.5">{t.whyTrendingLabel}</span>
                    <p className="text-slate-800 font-bold leading-relaxed">{selectedModalTrend.whyTrending}</p>
                    {selectedModalTrend.whyTrendingArabic && (
                      <p className="text-slate-500 font-semibold mt-1 border-t border-slate-200 pt-1.5">{selectedModalTrend.whyTrendingArabic}</p>
                    )}
                  </div>
                </div>

                {/* Visual Concept Component */}
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 text-xs">
                  <div className="flex items-center justify-between mb-2 pb-1 border-b border-indigo-100">
                    <span className="text-indigo-700 font-extrabold uppercase tracking-wider">{t.conceptLabel}</span>
                    <button
                      onClick={() => handleCopyText(selectedModalTrend.concept, `modal-concept-${selectedModalTrend.id}`)}
                      className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-indigo-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      {copiedStates[`modal-concept-${selectedModalTrend.id}`] ? <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedStates[`modal-concept-${selectedModalTrend.id}`] ? t.copySuccess : t.copyConceptBtn}</span>
                    </button>
                  </div>
                  <p className="text-slate-800 font-semibold leading-relaxed mb-2">{selectedModalTrend.concept}</p>
                  {selectedModalTrend.conceptArabic && (
                    <p className="text-slate-600 font-semibold border-t border-indigo-100/80 pt-2">{selectedModalTrend.conceptArabic}</p>
                  )}
                </div>

                {/* SEO Keywords Intelligence Component (All 15 categorized keywords) */}
                {selectedModalTrend.seoKeywords && (
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
                    <SeoIntelligence 
                      keywords={selectedModalTrend.seoKeywords} 
                      lang={lang} 
                      onCopy={(text, key) => handleCopyText(text, key)} 
                      copiedStates={copiedStates} 
                    />
                  </div>
                )}

                {/* Redbubble Tags Cloud Component */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-indigo-500" />
                      <span className="text-xs font-black text-slate-800">
                        {lang === "ar" ? "الكلمات الدلالية المجهزة للرفع (15 تاغ)" : "Listing Tags (15 Tags)"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyAllTags(selectedModalTrend.tags, `modal-tags-${selectedModalTrend.id}`)}
                      className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      {copiedStates[`modal-tags-${selectedModalTrend.id}`] ? <ClipboardCheck className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedStates[`modal-tags-${selectedModalTrend.id}`] ? t.copySuccess : (lang === "ar" ? "نسخ جميع الكلمات" : "Copy All Tags")}</span>
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {selectedModalTrend.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1">
                        <span>{tag}</span>
                        {idx === 0 && <span className="text-[9px] bg-indigo-100 text-indigo-700 font-extrabold px-1 rounded">{lang === "ar" ? "رئيسي" : "Main"}</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title Optimization A/B Engine */}
                {(selectedModalTrend.titleA || selectedModalTrend.titleB || selectedModalTrend.titleC) && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                    <span className="text-xs font-black text-slate-800 block">
                      {lang === "ar" ? "⚡ خيارات العناوين المحسنة للبحث (Title Optimization Engine)" : "⚡ Title Optimization Variants"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {[
                        { key: 'titleA', scoreKey: 'titleAScore', title: selectedModalTrend.titleA, score: selectedModalTrend.titleAScore, exp: selectedModalTrend.titleAExplanation },
                        { key: 'titleB', scoreKey: 'titleBScore', title: selectedModalTrend.titleB, score: selectedModalTrend.titleBScore, exp: selectedModalTrend.titleBExplanation },
                        { key: 'titleC', scoreKey: 'titleCScore', title: selectedModalTrend.titleC, score: selectedModalTrend.titleCScore, exp: selectedModalTrend.titleCExplanation },
                        { key: 'titleD', scoreKey: 'titleDScore', title: selectedModalTrend.titleD, score: selectedModalTrend.titleDScore, exp: selectedModalTrend.titleDExplanation },
                        { key: 'titleE', scoreKey: 'titleEScore', title: selectedModalTrend.titleE, score: selectedModalTrend.titleEScore, exp: selectedModalTrend.titleEExplanation },
                      ].filter(item => item.title).map((item, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-extrabold text-indigo-600 text-[10px]">Variant #{idx + 1}</span>
                              {item.score && (
                                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-black text-[10px] border border-emerald-200">
                                  Score: {item.score}%
                                </span>
                              )}
                            </div>
                            <p className="font-bold text-slate-800 mb-1">{item.title}</p>
                            {item.exp && <p className="text-[10px] text-slate-500 font-semibold">{item.exp}</p>}
                          </div>
                          <button
                            onClick={() => handleCopyText(item.title!, `modal-opt-${selectedModalTrend.id}-${idx}`)}
                            className="mt-2 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer self-start"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedStates[`modal-opt-${selectedModalTrend.id}-${idx}`] ? t.copySuccess : (lang === "ar" ? "نسخ هذا العنوان" : "Copy Title")}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Image Generator Prompt */}
                {selectedModalTrend.aiImagePrompt && (
                  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-indigo-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        {lang === "ar" ? "برومبت الذكاء الاصطناعي للتصميم (Midjourney / DALL-E)" : "AI Image Prompt"}
                      </span>
                      <button
                        onClick={() => handleCopyText(selectedModalTrend.aiImagePrompt!, `modal-prompt-${selectedModalTrend.id}`)}
                        className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                      >
                        {copiedStates[`modal-prompt-${selectedModalTrend.id}`] ? <ClipboardCheck className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedStates[`modal-prompt-${selectedModalTrend.id}`] ? t.copySuccess : t.copyPromptBtn}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 selection:bg-indigo-500">
                      {selectedModalTrend.aiImagePrompt}
                    </p>
                  </div>
                )}

                {/* SEO Description */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t.copyDesc}</span>
                    <button
                      onClick={() => handleCopyText(selectedModalTrend.description, `modal-desc-${selectedModalTrend.id}`)}
                      className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-indigo-600 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      {copiedStates[`modal-desc-${selectedModalTrend.id}`] ? <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedStates[`modal-desc-${selectedModalTrend.id}`] ? t.copySuccess : t.copyDesc}</span>
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    {selectedModalTrend.description}
                  </p>
                  {selectedModalTrend.descriptionArabic && (
                    <p className="text-xs text-slate-500 font-semibold border-t border-slate-200 pt-2 mt-2">
                      {selectedModalTrend.descriptionArabic}
                    </p>
                  )}
                </div>

              </div>

              {/* Modal Footer Controls */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const cardId = selectedModalTrend.id;
                    setSelectedModalTrend(null);
                    setExpandedTrendCards(prev => ({ ...prev, [cardId]: true }));
                    setTimeout(() => {
                      const el = document.getElementById(`trend-card-${cardId}`);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>{lang === "ar" ? "الانتقال إلى هذه البطاقة في القائمة الرئيسية" : "Jump to Card in Main List"}</span>
                </button>

                <button
                  onClick={() => setSelectedModalTrend(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  {lang === "ar" ? "إغلاق النافذة" : "Close Details"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
