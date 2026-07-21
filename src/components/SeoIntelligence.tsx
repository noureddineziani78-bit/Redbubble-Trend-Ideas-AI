import { useState } from "react";
import { motion } from "motion/react";
import { 
  Copy, 
  Check, 
  Flame, 
  Layers, 
  Tag, 
  Target, 
  Sparkles, 
  Award, 
  Compass, 
  ArrowUpRight 
} from "lucide-react";
import { SeoKeywords, SeoKeywordItem } from "../types";

interface SeoIntelligenceProps {
  seoKeywords?: SeoKeywords;
  lang: "en" | "ar";
}

export function SeoIntelligence({ seoKeywords, lang }: SeoIntelligenceProps) {
  const [activeTab, setActiveTab] = useState<"all" | "core" | "buyer" | "style" | "related" | "long">("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!seoKeywords) return null;

  const isAr = lang === "ar";

  // Category Configuration
  const categories = [
    {
      id: "core" as const,
      titleEn: "Core Keywords (3)",
      titleAr: "الكلمات الأساسية (3)",
      descriptionEn: "Main niche terms representing the core subject of the artwork.",
      descriptionAr: "الكلمات الرئيسية التي تمثل موضوع التصميم والنيش الرئيسي مباشرةً.",
      items: seoKeywords.core || [],
      colorClass: "border-violet-500/30 text-violet-300 bg-violet-950/10",
      badgeClass: "bg-violet-500/15 text-violet-300 border-violet-500/30",
      icon: Target
    },
    {
      id: "buyer" as const,
      titleEn: "Buyer Intent (4)",
      titleAr: "نوايا الشراء (4)",
      descriptionEn: "Search terms active buyers use with clear intent to purchase.",
      descriptionAr: "العبارات التي يكتبها المشتري المستعد للدفع (هدايا، اقتناء، إلخ).",
      items: seoKeywords.buyerIntent || [],
      colorClass: "border-emerald-500/30 text-emerald-300 bg-emerald-950/10",
      badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      icon: Award
    },
    {
      id: "style" as const,
      titleEn: "Style Descriptors (3)",
      titleAr: "الأسلوب الفني (3)",
      descriptionEn: "Keywords describing the visual aesthetic or art style.",
      descriptionAr: "الكلمات التي تصف النمط الفني أو المظهر الجمالي للتصميم.",
      items: seoKeywords.style || [],
      colorClass: "border-amber-500/30 text-amber-300 bg-amber-950/10",
      badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      icon: Sparkles
    },
    {
      id: "related" as const,
      titleEn: "Related Context (2)",
      titleAr: "المواضيع المرتبطة (2)",
      descriptionEn: "Connected niche expansions expanding visual visibility.",
      descriptionAr: "كلمات إضافية توسّع نطاق البحث وتغطي الكلمات الجانبية والمهتمين بالنيش.",
      items: seoKeywords.related || [],
      colorClass: "border-sky-500/30 text-sky-300 bg-sky-950/10",
      badgeClass: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      icon: Compass
    },
    {
      id: "long" as const,
      titleEn: "Long-Tail (3)",
      titleAr: "الكلمات الطويلة (3)",
      descriptionEn: "Highly specific, low-competition exact phrase search strings.",
      descriptionAr: "جمل بحثية دقيقة وطويلة ذات منافسة ضعيفة ومعدل تحويل عالٍ جداً.",
      items: seoKeywords.longTail || [],
      colorClass: "border-rose-500/30 text-rose-300 bg-rose-950/10",
      badgeClass: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      icon: Flame
    }
  ];

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyGroup = (items: SeoKeywordItem[], key: string) => {
    const tagsText = items.map(i => i.keyword).join(", ");
    navigator.clipboard.writeText(tagsText);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const activeCategories = activeTab === "all" 
    ? categories 
    : categories.filter(c => c.id === activeTab);

  // General statistics
  const totalKeywords = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const averageScore = Math.round(
    categories.flatMap(c => c.items).reduce((acc, curr) => acc + curr.score, 0) / (totalKeywords || 1)
  );

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 text-left transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/50">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-500" />
            <span>
              {isAr ? "محرك ذكاء الكلمات المفتاحية الـ 15 (POD SEO)" : "POD SEO Keyword Intelligence (15 Tags)"}
            </span>
          </h4>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            {isAr 
              ? "موزعة بدقة وفق استراتيجية SEO لضمان تغطية النيش، نية الشراء، الخطوط الفنية، والاستهداف الطويل."
              : "Distributed strictly per SEO strategy covering core niche, buying intent, aesthetics, context, and long-tail."}
          </p>
        </div>
        
        {/* Score Ring */}
        <div className="flex items-center gap-3 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800/50 self-start sm:self-auto">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray={`${averageScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[10px] font-bold text-emerald-400 font-mono">
              {averageScore}
            </span>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
              {isAr ? "متوسط قوة السيو" : "AVG SEO Score"}
            </div>
            <div className="text-xs font-bold text-slate-300">
              {averageScore >= 90 ? (isAr ? "ممتاز 🔥" : "Excellent 🔥") : (isAr ? "قوي جداً 💪" : "Very Strong 💪")}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Category Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 mt-4 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            activeTab === "all"
              ? "bg-rose-500/10 text-rose-300 border-rose-500/30 shadow-md"
              : "bg-slate-950/40 text-slate-400 border-transparent hover:border-slate-800 hover:text-slate-200"
          }`}
        >
          {isAr ? "جميع المجموعات" : "All Categories"}
        </button>

        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border flex items-center gap-1.5 ${
                activeTab === cat.id
                  ? `${cat.colorClass} border-current shadow-md font-bold`
                  : "bg-slate-950/40 text-slate-400 border-transparent hover:border-slate-800 hover:text-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{isAr ? cat.titleAr : cat.titleEn}</span>
            </button>
          );
        })}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {activeCategories.map((cat) => {
          const Icon = cat.icon;
          const groupCopiedKey = `group-${cat.id}`;
          return (
            <motion.div
              layout
              key={cat.id}
              className={`border rounded-2xl p-4 flex flex-col justify-between bg-slate-950/30 ${cat.colorClass.split(" ")[0]} hover:bg-slate-950/50 transition-colors`}
            >
              <div>
                {/* Card Title & Group Copy */}
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg border ${cat.badgeClass}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        {isAr ? cat.titleAr : cat.titleEn}
                      </h5>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {isAr ? cat.descriptionAr : cat.descriptionEn}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyGroup(cat.items, groupCopiedKey)}
                    title={isAr ? "نسخ الكلمات الـ 3 لهذه الفئة معاً" : "Copy all keywords in this category"}
                    className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg bg-slate-950 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/20 transition-all cursor-pointer shrink-0"
                  >
                    {copiedKey === groupCopiedKey ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Keyword list with custom scores & reasons */}
                <div className="flex flex-col gap-2">
                  {cat.items.map((item, index) => {
                    const tagKey = `keyword-${cat.id}-${index}`;
                    const scoreColor = item.score >= 92 
                      ? "text-emerald-400" 
                      : item.score >= 87 
                      ? "text-amber-400" 
                      : "text-indigo-400";

                    return (
                      <div 
                        key={index}
                        className="bg-slate-950/80 rounded-xl p-2.5 border border-slate-900 hover:border-slate-800 transition-colors flex flex-col gap-1.5 text-xs group"
                      >
                        {/* Keyword title and score */}
                        <div className="flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleCopyText(item.keyword, tagKey)}
                            className="inline-flex items-center gap-1.5 hover:text-rose-400 text-slate-200 transition-all cursor-pointer font-bold font-mono text-left"
                            title={isAr ? "اضغط للنسخ" : "Click to copy"}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-rose-500 transition-colors" />
                            <span>{item.keyword}</span>
                            {copiedKey === tagKey ? (
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-600 group-hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                            )}
                          </button>

                          {/* SEO Score Badge */}
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800/60">
                            <span className="text-[9px] font-medium text-slate-500 uppercase tracking-wide">
                              SEO
                            </span>
                            <span className={`font-mono text-[10px] font-bold ${scoreColor}`}>
                              {item.score}%
                            </span>
                          </div>
                        </div>

                        {/* Keyword justification */}
                        <p className="text-[10px] text-slate-400 leading-normal pl-3">
                          {isAr ? item.reasonArabic : item.reason}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
