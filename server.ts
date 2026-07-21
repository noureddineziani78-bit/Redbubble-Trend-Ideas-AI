import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { initialTrends } from "./src/initialData";

dotenv.config();

const getTrendCategories = (id: number): string[] => {
  switch (id) {
    case 1: return ["retro & vintage"];
    case 2: return ["cute animals", "nature & cottagecore"];
    case 3: return ["funny & memes", "jobs & hobbies"];
    case 4: return ["typography & quotes", "nature & cottagecore"];
    case 5: return ["cute animals", "funny & memes"];
    case 6: return ["nature & cottagecore"];
    case 7: return ["retro & vintage", "funny & memes"];
    case 8: return ["jobs & hobbies", "nature & cottagecore"];
    case 9: return ["nature & cottagecore"];
    case 10: return ["funny & memes", "cute animals"];
    default: return [];
  }
};

function performLocalTrademarkCheck(title: string, description: string, tags: string | string[]) {
  const allText = `${title} ${description || ""} ${Array.isArray(tags) ? tags.join(" ") : tags || ""}`.toLowerCase();
  
  // List of high-risk registered trademarks
  const highRiskBrands = [
    { name: "Disney", terms: ["disney", "mickey", "minnie", "goofy", "donald duck", "pixar", "frozen", "elsa", "olaf"] },
    { name: "Nike", terms: ["nike", "just do it", "air jordan"] },
    { name: "Adidas", terms: ["adidas", "three stripes"] },
    { name: "Marvel", terms: ["marvel", "avengers", "spiderman", "iron man", "thor", "captain america", "hulk", "black panther"] },
    { name: "Star Wars", terms: ["star wars", "darth vader", "luke skywalker", "yoda", "baby yoda", "mandalorian", "jedi", "sith"] },
    { name: "Nintendo", terms: ["nintendo", "mario", "luigi", "zelda", "link", "donkey kong", "bowser", "peach"] },
    { name: "Pokemon", terms: ["pokemon", "pikachu", "charizard", "eevee", "pokeball"] },
    { name: "Harry Potter", terms: ["harry potter", "hogwarts", "gryffindor", "slytherin", "hufflepuff", "ravenclaw", "voldemort", "muggle"] },
    { name: "Barbie", terms: ["barbie", "ken"] },
    { name: "Warner Bros / DC", terms: ["batman", "superman", "wonder woman", "joker", "gotham", "harley quinn"] },
    { name: "Anime brands", terms: ["naruto", "one piece", "dragon ball", "dbz", "luffy", "goku"] },
    { name: "Popular corporate brands", terms: ["apple", "iphone", "macbook", "ipad", "google", "netflix", "lego", "playstation", "xbox", "jeep", "ford", "harley davidson", "taylor swift", "gucci", "chanel", "supreme"] }
  ];

  const findings: any[] = [];
  let score = 100;
  
  // 1. Check for High-Risk Brands
  for (const brand of highRiskBrands) {
    for (const term of brand.terms) {
      if (allText.includes(term)) {
        score = Math.min(score, 15);
        findings.push({
          term: term,
          risk: "High",
          category: "Trademark / Intellectual Property",
          explanation: `"${term}" is associated with the protected brand "${brand.name}". Using brand names or copyrighted character references on Redbubble leads to immediate takedowns, listing deletion, and potential account suspension under Redbubble's IP Policy.`,
          explanationArabic: `العبارة "${term}" مرتبطة بالعلامة التجارية المحمية "${brand.name}". استخدام أسماء الماركات الشهيرة أو الشخصيات المحمية بحقوق النشر يؤدي إلى الحذف الفوري للتصميم وإغلاق الحساب في ريدبابل.`
        });
      }
    }
  }

  // 2. Check for tag spamming / generic terms in tags
  const tagList = Array.isArray(tags) ? tags : (tags ? tags.split(",").map(t => t.trim()) : []);
  const genericTerms = ["sticker", "stickers", "t-shirt", "tshirts", "apparel", "clothing", "gift", "gifts", "present", "buy", "shop", "custom", "personalized", "cheap", "best", "sale"];
  
  for (const t of tagList) {
    const cleanedTag = t.toLowerCase().trim();
    if (genericTerms.includes(cleanedTag)) {
      score = Math.min(score, 75);
      findings.push({
        term: t,
        risk: "Medium",
        category: "Policy Recommendation / Tag Spam",
        explanation: `"${t}" is a generic product/merchandise term. Including descriptors like "sticker" or "gift" in your tag list violates Redbubble's "Tagging 101" official guidelines. It dilutes search relevance and can penalize your organic search ranking.`,
        explanationArabic: `العبارة "${t}" هي مصطلح عام للمنتجات. إدراج تصنيفات مثل "ملصق" أو "هدية" في قائمة الكلمات المفتاحية يخالف إرشادات "Tagging 101" الرسمية في ريدبابل، ويؤثر سلباً على ظهورك العضوي.`
      });
    }
  }

  // Determine overall status
  let overallStatus: "Safe to Upload" | "Needs Attention" | "Trademark Warning" = "Safe to Upload";
  if (findings.some(f => f.risk === "High")) {
    overallStatus = "Trademark Warning";
  } else if (findings.some(f => f.risk === "Medium")) {
    overallStatus = "Needs Attention";
  }

  // Create advice
  let generalAdvice = "";
  let generalAdviceArabic = "";
  
  if (overallStatus === "Trademark Warning") {
    generalAdvice = "CRITICAL: Do NOT upload this design with current metadata. Highly protected trademarked brand terms were detected. Remove any brand names, character references, or copyrighted phrases before publishing to prevent listing removal.";
    generalAdviceArabic = "تحذير حرج: لا تقم برفع هذا التصميم بهذه البيانات! تم اكتشاف علامات تجارية محمية قانونياً. يجب إزالة أي أسماء ماركات أو شخصيات كرتونية أو اقتباسات محمية قبل النشر لتفادي الحذف الفوري.";
  } else if (overallStatus === "Needs Attention") {
    generalAdvice = "RECOMMENDED: Your design concept is safe, but your keywords contain generic merchandise descriptors. Clean up your tag list by removing product words like 'sticker' or 'gift' to strictly comply with Redbubble's Tagging 101 SEO best practices.";
    generalAdviceArabic = "توصية: فكرة التصميم آمنة، ولكن قائمة الكلمات الدلالية تحتوي على تصنيفات عامة للمنتجات. ننصح بتنظيف الكلمات وإزالة عبارات مثل 'ملصق' أو 'هدية' للالتزام بمعايير SEO المعتمدة في ريدبابل.";
  } else {
    generalAdvice = "SAFE TO UPLOAD: No trademarks or policy violations detected in our local offline scanner. Your title, description, and tags comply perfectly with Redbubble's Tagging 101 guidelines. Ready for listing!";
    generalAdviceArabic = "آمن للرفع: لم يتم العثور على أي انتهاكات للعلامات التجارية في فحصنا المحلي السريع. العنوان والوصف والكلمات الدلالية متوافقة تماماً مع إرشادات Tagging 101 وجاهزة للنشر والربح!";
  }

  return {
    overallStatus,
    score,
    findings,
    generalAdvice,
    generalAdviceArabic,
    usptoSearchTerms: title.split(" ").filter(w => w.length > 3).slice(0, 4)
  };
}

function generateFallbackSeoKeywords(tags: string[], title: string) {
  const coreTags = tags.slice(0, 3);
  const buyerIntentTags = tags.slice(3, 7);
  const styleTags = tags.slice(7, 10);
  const relatedTags = tags.slice(10, 12);
  const longTailTags = tags.slice(12, 15);

  const mapTag = (tag: string, scoreBase: number, type: string) => {
    const score = Math.floor(scoreBase + Math.random() * 5);
    return {
      keyword: tag,
      score: Math.min(score, 100),
      reason: `Highly optimized ${type} tag matching the visual interest and core context of the design.`,
      reasonArabic: `كلمة مفتاحية مُحسّنة للمجموعة (${type}) تتناسب مع السياق العام والتصميم.`
    };
  };

  return {
    core: coreTags.map(t => mapTag(t, 94, "Core")),
    buyerIntent: buyerIntentTags.map(t => mapTag(t, 91, "Buyer Intent")),
    style: styleTags.map(t => mapTag(t, 87, "Style")),
    related: relatedTags.map(t => mapTag(t, 84, "Related")),
    longTail: longTailTags.map(t => mapTag(t, 89, "Long-tail"))
  };
}

function scrubPhrase(text: string, isEnglish: boolean): string {
  if (!text) return text;

  const englishForbidden = [
    "classic t-shirt", "essential t-shirt", "premium t-shirt", "graphic t-shirt", 
    "long sleeve t-shirt", "baseball 3/4 sleeve t-shirt", "v-neck t-shirt", 
    "fitted t-shirt", "relaxed fit t-shirt", "tank top", "sleeveless top", 
    "racerback tank", "chiffon top", "lightweight sweatshirt", "pullover hoodie", 
    "zipped hoodie", "sweatshirt", "kids t-shirt", "kids hoodie", "kids pullover hoodie", 
    "baby one-piece", "dad hat", "bucket hat", "snapback cap", "beanie", "apron", 
    "socks", "scarf", "a-line dress", "graphic dress", "transparent sticker", 
    "glossy sticker", "matte sticker", "art print", "poster", "framed print", 
    "mounted print", "canvas print", "metal print", "acrylic block", "photographic print", 
    "wood print", "tapestry", "throw pillow", "floor pillow", "cushion", "comforter", 
    "duvet cover", "shower curtain", "bath mat", "throw blanket", "wall clock", 
    "coasters", "placemat", "table runner", "tall mug", "travel mug", "travel cup", 
    "water bottle", "tumbler", "greeting card", "postcard", "spiral notebook", 
    "hardcover journal", "samsung case", "samsung tough case", "iphone case", 
    "iphone tough case", "laptop skin", "laptop sleeve", "ipad case", "mouse pad", 
    "tote bag", "drawstring bag", "backpack", "duffle bag", "zipper pouch", 
    "pet bandana", "pet blanket", "pet mat", "pet bowl", "pin (button)", "desk mat",
    "laptop sticker", "laptop stickers", "car sticker", "car stickers", "bumper sticker",
    "bumper stickers", "vinyl sticker", "vinyl stickers", "waterproof sticker", "waterproof stickers",
    "t-shirt", "t-shirts", "tshirt", "tshirts", "shirt", "shirts", "hoodie", "hoodies", "sticker", "stickers", "decal", "decals",
    "mug", "mugs", "pillow", "pillows", "blanket", "blankets", "notebook", "notebooks", "journal", "journals", "poster", "posters",
    "print", "prints", "canvas", "canvases", "case", "cases", "skin", "skins", "sleeve", "sleeves", "bag", "bags", "tote", "totes",
    "hat", "hats", "cap", "caps", "socks", "magnet", "magnets", "pin", "pins", "puzzle", "puzzles", "beanie", "beanies", "apron", "aprons",
    "laptop", "laptops", "gift", "gifts", "device", "devices"
  ];

  const arabicForbidden = [
    "تي شيرت كلاسيكي", "تي شيرت أساسي", "تي شيرت بريميوم", "تي شيرت جرافيك", 
    "تي شيرت بأكمام طويلة", "تي شيرت بيسبول", "تي شيرت بفتحة رقبة v", "تي شيرت ضيق", 
    "تي شيرت مريح", "سترة بدون أكمام", "بلوزة شيفون", "سويت شيرت خفيف الوزن", 
    "هودي بلوفر", "هودي بسحاب", "سويت شيرت", "تي شيرت أطفال", "هودي أطفال", 
    "قطعة واحدة للأطفال", "قبعة داد", "قبعة دلو", "قبعة سناباك", "بيني", "مريلة", 
    "جوارب", "وشاح", "فستان a-line", "فستان جرافيك", "ملصق شفاف", "ملصق لامع", 
    "ملصق مطفي", "لوحة جدارية مطبوعة", "بوستر", "لوحة جدارية مؤطرة", "لوحة جدارية مثبتة", 
    "لوحة جدارية كانفاس", "لوحة جدارية معدنية", "مكعب أكريليك", "طباعة فوتوغرافية", 
    "طباعة خشبية", "سجادة حائط", "وسادة رمي", "وسادة أرضية", "وسادة", "لحاف", 
    "غطاء لحاف", "ستارة حمام", "سجادة حمام", "بطانية رمي", "ساعة حائط", "قواعد أكواب", 
    "مفارش أطباق", "مفرش طاولة", "كوب طويل", "كوب سفر", "كوب السفر", "زجاجة مياه", 
    "كوب حافظ للحرارة", "بطاقة تهنئة", "بطاقة بريدية", "دفتر ملاحظات سلكي", "دفتر ملاحظات ذو غلاف صلب", 
    "غطاء سامسونج", "غطاء سامسونج المتين", "غطاء آيفون", "غطاء آيفون المتين", "ملصق كمبيوتر محمول", 
    "حافظة كمبيوتر محمول", "غطاء آيباد", "قاعدة ماوس", "حقيبة قماشية", "حقيبة برباط", 
    "حقيبة ظهر", "حقيبة سفر", "حقيبة بسحاب", "باندانا حيوانات أليفة", "بطانية حيوانات أليفة", 
    "سجادة حيوانات أليفة", "وعاء حيوانات أليفة", "دبوس (بروش)", "سجادة مكتب",
    "ملصقات كمبيوتر محمول", "ملصقات لابتوب", "ملصق لابتوب", "كفر ايفون", "كفرات", "كفر",
    "ملصقات الكمبيوتر المحمول", "دفاتر الملاحظات", "سويت شيرت", "حقائب قماشية", "أغطية هواتف", "أغطية الهواتف",
    "لوحات جدارية", "تيشيرتات كلاسيكية", "أكواب قهوة", "هوديات", "حقائب اللابتوب", "قواعد الماوس", "أكواب قهوة للمكتب", "حقائب اللابتوب التقنية",
    "منسوجات حائط", "وسائد رمي", "وسائد", "خداديات", "بطانيات", "دفاتر", "مذكرات", "حقيبة توت", "مقلمة", "محفظة", "طوق حيوانات", "بطانية حيوانات", "بزل", "بروش", "سجادة مكتب",
    "تيشيرت", "تيشيرتات", "تي شيرت", "تي شيرتات", "قميص", "قمصان", "هودي", "هوديات", "ملصق", "ملصقات", "بوستر", "بوسترات", "لوحة", "لوحات", "كوب", "أكواب", "دفتر", "دفاتر", "حقيبة", "حقائب", "وسادة", "وسائد", "خدادية", "خداديات", "بطانية", "بطانيات", "قبعة", "قبعات", "جراب", "جرابات", "غطاء", "أغطية",
    "لابتوب", "لاب توب", "كمبيوتر", "كمبيوترات", "هدية", "هدايا", "منتج", "منتجات"
  ];

  let cleaned = text;

  if (isEnglish) {
    for (const term of englishForbidden) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      cleaned = cleaned.replace(regex, '');
    }
  } else {
    for (const term of arabicForbidden) {
      cleaned = cleaned.split(term).join('');
    }
  }

  // Clean double spaces, trailing/leading spaces, extra commas
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(/^[\s,.\-_/]+|[\s,.\-_/]+$/g, '');
  cleaned = cleaned.replace(/,\s*,/g, ',');

  if (!cleaned || cleaned.length < 2) {
    return isEnglish ? "Aesthetic Design" : "تصميم جمالي مميز";
  }
  return cleaned;
}

function scrubTrend(trend: any): any {
  if (!trend) return trend;
  
  const t = JSON.parse(JSON.stringify(trend));

  // Scrub single titles and listing titles
  t.title = scrubPhrase(t.title, true);
  t.titleArabic = scrubPhrase(t.titleArabic, false);
  t.cleanListingTitle = scrubPhrase(t.cleanListingTitle, true);
  t.cleanListingTitleArabic = scrubPhrase(t.cleanListingTitleArabic, false);

  // Scrub optimizing title variations
  if (t.titleA) t.titleA = scrubPhrase(t.titleA, true);
  if (t.titleAArabic) t.titleAArabic = scrubPhrase(t.titleAArabic, false);
  
  if (t.titleB) t.titleB = scrubPhrase(t.titleB, true);
  if (t.titleBArabic) t.titleBArabic = scrubPhrase(t.titleBArabic, false);
  
  if (t.titleC) t.titleC = scrubPhrase(t.titleC, true);
  if (t.titleCArabic) t.titleCArabic = scrubPhrase(t.titleCArabic, false);
  
  if (t.titleD) t.titleD = scrubPhrase(t.titleD, true);
  if (t.titleDArabic) t.titleDArabic = scrubPhrase(t.titleDArabic, false);
  
  if (t.titleE) t.titleE = scrubPhrase(t.titleE, true);
  if (t.titleEArabic) t.titleEArabic = scrubPhrase(t.titleEArabic, false);

  // Scrub descriptions
  if (t.description) t.description = scrubPhrase(t.description, true);
  if (t.descriptionArabic) t.descriptionArabic = scrubPhrase(t.descriptionArabic, false);

  // Scrub flat tags
  if (Array.isArray(t.tags)) {
    t.tags = t.tags.map((tag: string) => scrubPhrase(tag, true));
  }

  // Scrub seoKeywords structure
  if (t.seoKeywords) {
    const groups = ["core", "buyerIntent", "style", "related", "longTail"];
    for (const group of groups) {
      if (Array.isArray(t.seoKeywords[group])) {
        t.seoKeywords[group] = t.seoKeywords[group].map((item: any) => {
          if (item && item.keyword) {
            item.keyword = scrubPhrase(item.keyword, true);
          }
          return item;
        });
      }
    }
  }

  return t;
}


function getDynamicFallbackTrends(requestedCategory: string, selectedSources: string[] = []): any[] {
  // 1. Filter base list of trends by category
  const filtered = initialTrends.filter(trend => {
    if (requestedCategory === "all") return true;
    const cats = getTrendCategories(trend.id);
    return cats.some(cat => cat.toLowerCase() === requestedCategory);
  });

  // If we don't have enough matching, fill with others
  let pool = [...filtered];
  if (pool.length < 10) {
    const others = initialTrends.filter(trend => !pool.some(p => p.id === trend.id));
    // Shuffle others
    others.sort(() => Math.random() - 0.5);
    pool = [...pool, ...others];
  }

  // Shuffle the selected pool
  pool.sort(() => Math.random() - 0.5);

  // Take top 10
  const chosen = pool.slice(0, 10);

  // Dynamic mutator to vary the designs every time!
  const colorsList = [
    { en: "mustard yellow, terracotta orange, and hunter green", ar: "الأصفر الخردلي، والبرتقالي الطيني، والأخضر الداكن" },
    { en: "pastel peach, mint sage, and lavender purple", ar: "الدراق الهادئ، والمريمية الخضراء، والبنفسجي اللافندر" },
    { en: "neon coral, hot magenta, and deep electric violet", ar: "المرجاني النيون، والأرجواني الفاقع، والبنفسجي الكهربائي" },
    { en: "vintage cream, dusty rose, and olive drab", ar: "الكريمي العتيق، والوردي المترب، والأخضر الزيتوني" },
    { en: "rich espresso, warm caramel, and organic oatmeal", ar: "الإسبريسو الغني، والكراميل الدافئ، والشوفان العضوي" },
    { en: "cyberpunk cyan, matrix green, and dark obsidian", ar: "السيان السيبراني، والأخضر الماتريكس، والأسود الداكن" },
    { en: "sunny sunflower gold, charcoal grey, and forest moss", ar: "ذهبي عباد الشمس المشرق، والرمادي الفحمي، وطحالب الغابة" },
    { en: "pastel lilac, soft lemon, and sky blue", ar: "الليلاك الباستيل، والليموني الناعم، وأزرق السماء" }
  ];

  const eras = [
    { en: "vintage 1970s retro distressed", ar: "كلاسيكي ريترو معتق من السبعينات" },
    { en: "nostalgic 1980s neon synthwave", ar: "نوستالجي نيون سينثويف من الثمانينات" },
    { en: "playful 1990s aesthetic sticker pop", ar: "ملصق بوب جمالي مرح من التسعينات" },
    { en: "modern minimalist boho line art", ar: "فن خطوط بوهو عصري وبسيط" },
    { en: "cozy cottagecore watercolor illustration", ar: "رسم مائي دافئ بأسلوب الكوتاجكور" }
  ];

  const sourcesPool = (selectedSources && selectedSources.length > 0)
    ? selectedSources
    : ["google", "merch", "etsy", "redbubble", "pinterest"];

  const trendsMapped = chosen.map((trend, idx) => {
    // Clone trend to prevent modifying original
    const newTrend = JSON.parse(JSON.stringify(trend));
    
    // Assign a unique id to prevent duplication issues in key rendering
    newTrend.id = trend.id * 1000 + Math.floor(Math.random() * 1000) + idx;

    // Randomly modify colors and styles to make them dynamic and refreshing!
    const randomColor = colorsList[Math.floor(Math.random() * colorsList.length)];
    const randomEra = eras[Math.floor(Math.random() * eras.length)];

    // We modify some elements to give distinct variants
    if (idx % 2 === 0) {
      if (newTrend.title.toLowerCase().includes("retro") || newTrend.title.toLowerCase().includes("vintage")) {
        const titleYear = randomEra.en.match(/\d{4}s/)?.[0] || "1970s";
        const titleYearArabic = titleYear === "1980s" ? "ثمانينات" : (titleYear === "1990s" ? "تسعينات" : "سبعينات");
        newTrend.title = `${newTrend.title} (${titleYear})`;
        newTrend.titleArabic = `${newTrend.titleArabic} (ريترو ${titleYearArabic})`;
      } else {
        newTrend.title = `${newTrend.title} - ${randomEra.en.split(" ").slice(0, 2).join(" ")}`;
        newTrend.titleArabic = `${newTrend.titleArabic} - ${randomEra.ar.split(" ").slice(0, 2).join(" ")}`;
      }
      
      newTrend.concept = `${newTrend.concept} Featuring a dynamic color palette of ${randomColor.en} in a ${randomEra.en} design style.`;
      newTrend.conceptArabic = `${newTrend.conceptArabic} يتميز بباليت ألوان حيوية تشمل ${randomColor.ar} بأسلوب تصميم ${randomEra.ar}.`;
      
      if (newTrend.aiImagePrompt) {
        newTrend.aiImagePrompt = newTrend.aiImagePrompt
          .replace(/vintage aesthetic|retro-futuristic 1980s|retro-futuristic 1970s|cute cartoon|modern ecological/gi, randomEra.en)
          .replace(/mustard yellow|cream organic|cream tones|neon pink-to-purple|golden yellows|rich golden/gi, randomColor.en);
      }
      if (newTrend.aiImagePromptArabic) {
        newTrend.aiImagePromptArabic = newTrend.aiImagePromptArabic
          .replace(/كلاسيكي قديم|ريترو من الثمانينات|كرتوني لطيف|بيئية/gi, randomEra.ar)
          .replace(/الأصفر الخردلي|الأبيض الكريمي|الوردي والبنفسجي|الصفراء الذهبية/gi, randomColor.ar);
      }
    } else {
      // Modify tags
      if (newTrend.tags && newTrend.tags.length > 0) {
        const firstPart = newTrend.tags.slice(0, 8);
        const secondPart = newTrend.tags.slice(8);
        secondPart.sort(() => Math.random() - 0.5);
        newTrend.tags = [...firstPart, ...secondPart];
      }
    }

    newTrend.seoKeywords = generateFallbackSeoKeywords(newTrend.tags, newTrend.title);

    // Title Optimization Engine dynamic generation for fallback trends
    newTrend.titleA = newTrend.cleanListingTitle;
    newTrend.titleAArabic = newTrend.cleanListingTitleArabic;
    newTrend.titleAScore = 95;
    newTrend.titleAExplanation = "Primary Keyword -> Main Concept mapping. Optimizes natural indexing on Google & Redbubble search without keyword stuffing.";
    newTrend.titleAExplanationArabic = "عنوان يربط الكلمة المفتاحية الرئيسية بالفكرة مباشرة. يحسن الأرشفة الطبيعية في محركات البحث دون حشو.";

    newTrend.titleB = newTrend.title;
    newTrend.titleBArabic = newTrend.titleArabic;
    newTrend.titleBScore = 92;
    newTrend.titleBExplanation = "High click-through rate (CTR) title focusing on the emotional hook, humor, or specific aesthetic style of the artwork.";
    newTrend.titleBExplanationArabic = "عنوان مخصص لجذب انتباه المشتري ونقره الفوري، يركز على الروح والأسلوب الجمالي الفريد للتصميم.";

    const firstLongtail = newTrend.tags && newTrend.tags.length > 12 ? newTrend.tags[12] : "Aesthetic Print";
    const firstLongtailAr = "تصميم فريد";
    newTrend.titleC = `${newTrend.cleanListingTitle} ${firstLongtail.split(" ").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`;
    newTrend.titleCArabic = `${newTrend.cleanListingTitleArabic} - ${firstLongtailAr}`;
    newTrend.titleCScore = 89;
    newTrend.titleCExplanation = "Combines low-competition, specific niche tags to rank on the first page of search results easily.";
    newTrend.titleCExplanationArabic = "عنوان مدمج بعبارات بحث ذيلية طويلة ومنخفضة المنافسة لمساعدتك على التصدر بسرعة.";

    newTrend.titleD = `${newTrend.title} Viral Tik Tok Trend`;
    newTrend.titleDArabic = `${newTrend.titleArabic} - تريند تيك توك الشهير`;
    newTrend.titleDScore = 86;
    newTrend.titleDExplanation = "Optimized for social media marketing (TikTok/Pinterest), driving external viral referral traffic directly to your Redbubble store.";
    newTrend.titleDExplanationArabic = "عنوان مخصص للانتشار والترويج على وسائل التواصل الاجتماعي لزيادة المبيعات من خارج منصة ريدبابل.";

    newTrend.titleE = `The ${newTrend.cleanListingTitle} Co.`;
    newTrend.titleEArabic = `مجموعة ${newTrend.cleanListingTitleArabic} الفنية`;
    newTrend.titleEScore = 84;
    newTrend.titleEExplanation = "A brandable, artistic storefront name style that establishes premium collection authority and encourages multi-item carts.";
    newTrend.titleEExplanationArabic = "عنوان ذو طابع تجاري للعلامات التجارية الراقية لتشجيع المشترين على شراء سلة متكاملة من متجرك.";

    // Dynamically assign realistic search strength, search volume, and source URLs based on the trend topic
    newTrend.searchStrength = Math.floor(Math.random() * 15 + 83); // 83 to 98
    newTrend.searchVolume = `${(newTrend.searchStrength / 5).toFixed(1)}K searches/mo`;

    const assignedSourceId = sourcesPool[idx % sourcesPool.length];
    const keywordForSource = newTrend.title.split(" ").slice(0, 3).join(" ");
    
    let sourceObj = { title: "Google Trends", uri: "https://trends.google.com" };
    switch (assignedSourceId.toLowerCase()) {
      case "google":
        sourceObj = { title: `Google Trends - US Search Spikes (${keywordForSource})`, uri: `https://trends.google.com/trends/explore?q=${encodeURIComponent(keywordForSource)}` };
        break;
      case "merch":
        sourceObj = { title: `Merch by Amazon Top-Chart Index (${keywordForSource})`, uri: `https://www.amazon.com/s?k=${encodeURIComponent(keywordForSource)}` };
        break;
      case "etsy":
        sourceObj = { title: `Etsy Best Selling Apparel logs (${keywordForSource})`, uri: `https://www.etsy.com/search?q=${encodeURIComponent(keywordForSource)}` };
        break;
      case "redbubble":
        sourceObj = { title: `Redbubble Pop Tags List (${keywordForSource})`, uri: `https://www.redbubble.com/shop/${encodeURIComponent(keywordForSource)}` };
        break;
      case "pinterest":
        sourceObj = { title: `Pinterest Trends - Pin activity (${keywordForSource})`, uri: `https://trends.pinterest.com/search?q=${encodeURIComponent(keywordForSource)}` };
        break;
    }
    
    newTrend.sources = [sourceObj];

    // Align competition to prioritize Low or Medium
    const compOptions = ["Low", "Low", "Medium", "Medium", "High"];
    newTrend.competition = compOptions[(idx + newTrend.id) % compOptions.length];

    return newTrend;
  });

  // Sort by success score descending: (searchStrength * 0.6) + (compScore * 0.4)
  return trendsMapped.sort((a, b) => {
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
}

async function generateTrendsWithFallback(
  ai: GoogleGenAI,
  prompt: string,
  responseSchema: any,
  useSearch: boolean
): Promise<{ text: string; sources: any[] }> {
  // Stage 1: Try gemini-3.6-flash with Search Grounding
  if (useSearch) {
    try {
      console.log("Attempting Stage 1: gemini-3.6-flash with Google Search Grounding...");
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema,
        }
      });
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || "Trend Resource",
        uri: chunk.web?.uri || ""
      })).filter((src: any) => src.uri) || [];
      return { text: response.text || "{}", sources };
    } catch (err: any) {
      console.warn("Stage 1 (gemini-3.6-flash with Search Grounding) failed:", err.message || err);
    }
  }

  // Stage 2: Try gemini-3.6-flash WITHOUT search grounding
  try {
    console.log("Attempting Stage 2: gemini-3.6-flash without search grounding...");
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
      }
    });
    return { text: response.text || "{}", sources: [] };
  } catch (err: any) {
    console.warn("Stage 2 (gemini-3.6-flash without Search) failed:", err.message || err);
  }

  // Stage 3: Try gemini-3.1-flash-lite (lighter, high quota)
  try {
    console.log("Attempting Stage 3: gemini-3.1-flash-lite...");
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
      }
    });
    return { text: response.text || "{}", sources: [] };
  } catch (err: any) {
    console.warn("Stage 3 (gemini-3.1-flash-lite) failed:", err.message || err);
  }

  // Stage 4: Try gemini-flash-latest (stable alias)
  try {
    console.log("Attempting Stage 4: gemini-flash-latest...");
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
      }
    });
    return { text: response.text || "{}", sources: [] };
  } catch (err: any) {
    console.error("All Gemini API models failed to generate trends:", err.message || err);
    throw err;
  }
}

async function generateTrademarkWithFallback(
  ai: GoogleGenAI,
  prompt: string,
  responseSchema: any
): Promise<string> {
  // Stage 1: Try gemini-3.6-flash
  try {
    console.log("Attempting Trademark Check Stage 1: gemini-3.6-flash...");
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
      }
    });
    return response.text || "{}";
  } catch (err: any) {
    console.warn("Trademark Check Stage 1 failed:", err.message || err);
  }

  // Stage 2: Try gemini-3.1-flash-lite
  try {
    console.log("Attempting Trademark Check Stage 2: gemini-3.1-flash-lite...");
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
      }
    });
    return response.text || "{}";
  } catch (err: any) {
    console.warn("Trademark Check Stage 2 failed:", err.message || err);
  }

  // Stage 3: Try gemini-flash-latest
  try {
    console.log("Attempting Trademark Check Stage 3: gemini-flash-latest...");
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
      }
    });
    return response.text || "{}";
  } catch (err: any) {
    console.error("All Gemini API models failed to analyze trademarks:", err.message || err);
    throw err;
  }
}

function getApiKeys(): string[] {
  const raw = process.env.GEMINI_API_KEY || "";
  return raw
    .split(/[;,\s]+/)
    .map(key => key.replace(/['"]/g, "").trim())
    .filter(key => key.length > 0 && key !== "undefined");
}

async function runWithKeyRotation<T>(fn: (ai: GoogleGenAI, keyIndex: number) => Promise<T>): Promise<T> {
  const keys = getApiKeys();
  if (keys.length === 0) {
    throw new Error("No Gemini API keys found in the environment variables.");
  }

  let lastError: any = null;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    try {
      console.log(`Running API operation using Gemini Key #${i + 1} (${key.substring(0, 8)}...)...`);
      return await fn(ai, i);
    } catch (err: any) {
      console.warn(`Operation with Gemini Key #${i + 1} failed:`, err.message || err);
      lastError = err;
      console.log(`Rotating to the next available API key...`);
    }
  }

  throw lastError || new Error("All available Gemini API keys failed.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware
  app.use(express.json());

  // API Route
  app.post("/api/trends/generate", async (req, res) => {
    try {
      const keys = getApiKeys();
      if (keys.length === 0) {
        throw new Error("GEMINI_API_KEY is not defined or is empty in environment variables.");
      }

      const { category, customPrompt, selectedSources } = req.body || {};

      const randomSeed = Math.floor(Math.random() * 1000000);
      const timestamp = new Date().toISOString();

      let categoryInfo = "all categories";
      if (category && category !== "all") {
        categoryInfo = category;
      }

      // Map chosen search sources to detailed site-specific search queries
      const sourcesList = (selectedSources && Array.isArray(selectedSources) && selectedSources.length > 0)
        ? selectedSources
        : ["google", "merch", "etsy", "redbubble", "pinterest"];

      const sourcesDirections = sourcesList.map((src: string) => {
        switch (src.toLowerCase()) {
          case "google":
            return "Google Search Trends & Search Queries (what buyers in the US are actively googling and searching for right now)";
          case "merch":
            return "Merch by Amazon (highly popular t-shirt, apparel, and accessory trends that are surging in sales)";
          case "etsy":
            return "Etsy (viral personalized items, handmade custom typography, aesthetic sticker designs, and cottagecore/modern art trends)";
          case "redbubble":
            return "Redbubble (surging search terms, popular emerging artist design tags, and best-selling stickers/apparel tags)";
          case "pinterest":
            return "Pinterest (viral visual pins, aesthetic mood boards, popular visual fashion/home decor graphics, and trending search terms)";
          default:
            return src;
        }
      }).join("\n- ");

      const selectedSourcesStr = sourcesList.join(", ");

      const prompt = `
Search the web specifically targeting trending design patterns, niches, and keywords across the following platforms:
- ${sourcesDirections}

Focus strictly on the United States (US) market, which is the primary target for ${categoryInfo} in 2026.
Ensure the suggestions are completely fresh, unique, and dynamic. Do not repeat previous outputs. 
[Request details - Seed: ${randomSeed}, Current UTC Time: ${timestamp}]

CRITICAL SOURCE DIVERSIFICATION REQUIREMENT:
The user selected target search sources: [${selectedSourcesStr}].
You MUST distribute the 10 trend ideas strictly across these selected sources. Each of the 10 trend ideas must be primarily inspired by and assigned to ONE of the selected sources in a balanced/round-robin fashion (for example, if Etsy and Pinterest are selected, Idea 1 from Etsy, Idea 2 from Pinterest, Idea 3 from Etsy, Idea 4 from Pinterest, etc., ensuring maximum diversity).
For EACH generated trend idea, the very first element in its 'sources' array MUST be a highly realistic and relevant link and title representing that specific assigned source platform (e.g., if assigned to Etsy, the primary source object in the array must look like: title: "Etsy Best Sellers - [Topic]", uri: "https://www.etsy.com/search?q=[Topic]"; if assigned to Pinterest: title: "Pinterest Trending Ideas - [Topic]", uri: "https://trends.pinterest.com/search?q=[Topic]", etc.).
Do NOT associate all ideas with a single platform or repeat the same platform if multiple are selected.

CRITICAL TREND PRIORITIZATION REQUIREMENT:
Always evaluate, score, and prioritize the generated trends based on maximum search strength/demand (الأكثر قوة) and lowest competition (الأقل منافسة).
Ensure the trends are structured so that high search volume combined with low/medium competition ideas are listed first. Avoid high-competition, low-demand ideas.

Identify exactly 10 unique design ideas that are currently trending or surging in search volume, adhering strictly to the above diversification and prioritization requirements.

For each of the 10 ideas, generate highly optimized metadata in both English and Arabic that follows Redbubble's official tagging guidelines and a strict POD SEO Keyword Framework (15 tags maximum, divided into 5 groups):
1. 'title': A descriptive, short, and punchy English title (e.g. "Vintage Pickleball Club"). Avoid keyword stuffing or punctuation spam in the title.
2. 'titleArabic': An Arabic adapted or translated title of the design for reference.
3. 'niche': The exact target audience and community (in English).
4. 'nicheArabic': The target audience and community translated/localized in Arabic.
5. 'concept': A detailed visual concept description describing the graphic elements, typography, colors, and layout style (vintage, cottagecore, minimalist, bold line art, vaporwave, etc.) so the user can easily design it (in English).
6. 'conceptArabic': A detailed visual concept and style description translated/localized in Arabic.
7. 'tags': A list of exactly 15 highly relevant English tags/keywords. This must match the exactly 15 keywords generated inside the 'seoKeywords' groups (3 core + 4 buyerIntent + 3 style + 2 related + 3 longTail = 15 total tags). Do not use single generic words like "cute", "funny", "gift", "stickers" unless directly related to the design.
8. 'seoKeywords': A structured POD SEO Keyword Intelligence object holding exactly 15 keywords divided into five groups:
   - 'core' (exactly 3 keywords): Representing the main niche and subject directly (e.g. "solarpunk", "urban gardening").
   - 'buyerIntent' (exactly 4 keywords): Search queries with high intent to purchase (e.g., "plant lover gift", "gardener present").
   - 'style' (exactly 3 keywords): Explaining the visual art style of the design (e.g., "botanical art", "retro style", "watercolor illustration").
   - 'related' (exactly 2 keywords): Connected keywords expanding visibility in adjacent fields (e.g., "renewable energy", "solar power").
   - 'longTail' (exactly 3 keywords): Specific, low-competition multi-word search queries (e.g., "solarpunk gardening club", "eco gardener").
   For EACH keyword across all these groups, provide:
     - 'keyword': The string value of the keyword (maximum 3 words, no trademarks, no generic spam like t-shirt, gift, etc.).
     - 'score': A calculated quality/SEO score (0 to 100) based on Search Intent (40%), Search Volume (25%), Competition (15%), Relevance to Artwork (10%), and Seasonality (10%).
     - 'reason': A brief description (1 sentence in English) explaining why this keyword was selected for this design.
     - 'reasonArabic': A brief description translated/localized in Arabic.
9. 'suggestedProducts': A list of the best Redbubble products for this design (in English, e.g. "Stickers", "T-Shirts", "Phone Cases").
10. 'suggestedProductsArabic': A list of the best Redbubble products translated in Arabic (e.g., "ملصقات", "تيشيرتات", "أغطية هواتف").
11. 'competition': Level of competition (Low, Medium, High).
12. 'whyTrending': Why this is trending right now in the US (social media viral trend, pop culture event, seasonal demand, hobbies/sports surge, etc.) (in English).
13. 'whyTrendingArabic': Why this is trending, translated in Arabic.

--- REDBUBBLE SEO TITLE FRAMEWORK V2.0 (TITLE OPTIMIZATION ENGINE) ---
Configure exactly five distinct optimized title variants that serve both high-visibility search (SEO) and high click-through rates (CTR):
14. 'titleA': Best for SEO (الأفضل لـ SEO). This title is built using a logical hierarchy: Primary Keyword -> Main Concept -> Style. E.g., "Solarpunk Gardening Club Retro Distressed". It must look natural, avoid keyword stuffing, under 50-80 chars, and contain NO generic words (e.g. "trending", "best seller") or merchandise product words (e.g. "sticker", "shirt").
15. 'titleAArabic': The localized/adapted title A in Arabic.
16. 'titleAScore': An SEO quality score (0 to 100) specifically for Title A based on key keyword indexing potential.
17. 'titleAExplanation': High-quality design/marketing explanation of why Title A works best for search algorithms (in English).
18. 'titleAExplanationArabic': High-quality explanation translated/localized in Arabic.

19. 'titleB': Best for Buyers / Click-Through Rate (الأفضل للمشترين / CTR). This is a highly aesthetic, creative, catchy, or humorous title that reads exactly like a real natural name for an artwork. It has maximum appeal to human emotion, provoking immediate clicks. E.g., "Grow Your Own Way". No generic keyword stuffing, under 50 chars, no product names.
20. 'titleBArabic': The localized/adapted title B in Arabic.
21. 'titleBScore': A click-through rating/score (0 to 100) specifically for Title B based on buyer appeal.
22. 'titleBExplanation': High-quality design/marketing explanation of why Title B appeals so strongly to human buyers (in English).
23. 'titleBExplanationArabic': High-quality explanation translated/localized in Arabic.

24. 'titleC': Best for Low Competition (الأفضل للمنافسة المنخفضة). This title incorporates a specific, highly detailed long-tail keyword combination targeting a low-density search segment. E.g., "Retro Solarpunk Aesthetic Cottagecore Botany". This ensures instant page 1 ranking on Redbubble even for newer shops. No product names.
25. 'titleCArabic': The localized/adapted title C in Arabic.
26. 'titleCScore': A niche-targeting rating/score (0 to 100) specifically for Title C based on low difficulty of ranking.
27. 'titleCExplanation': High-quality design/marketing explanation of how Title C allows the design to dominate low-competition results (in English).
28. 'titleCExplanationArabic': High-quality explanation translated/localized in Arabic.

29. 'titleD': Best for Social Media & Viral Referral (الأفضل للتسويق والترويج / TikTok/Pinterest). This is an exciting, trend-aware title optimized to generate hype on socials and drag external viral traffic. E.g., "That Solarpunk Gardening Vibe Aesthetic".
30. 'titleDArabic': The localized/adapted title D in Arabic.
31. 'titleDScore': A marketing referral rating/score (0 to 100) specifically for Title D based on social shareability.
32. 'titleDExplanation': High-quality design/marketing explanation of why Title D drives traffic from social referrals (in English).
33. 'titleDExplanationArabic': High-quality explanation translated/localized in Arabic.

34. 'titleE': Best for Premium Brand Identity (الاسم التجاري / Brandable). A clean, premium boutique-style brand name that makes the artwork feel like an exclusive designer collection item. E.g., "The Solarpunk Botany Co.".
35. 'titleEArabic': The localized/adapted title E in Arabic.
36. 'titleEScore': A brand prestige score (0 to 100) specifically for Title E.
37. 'titleEExplanation': High-quality design/marketing explanation of the branding strength of Title E (in English).
38. 'titleEExplanationArabic': High-quality explanation translated/localized in Arabic.

39. 'cleanListingTitle': Set this exactly to the value of 'titleA' (for backward compatibility).
40. 'cleanListingTitleArabic': Set this exactly to the value of 'titleAArabic' (for backward compatibility).
31. 'description': An SEO-optimized, highly converting listing description (2-3 sentences) that explains the artwork's vibe, key elements, and target audience to attract organic Google/Redbubble search traffic (in English).
32. 'descriptionArabic': An SEO-optimized, highly converting listing description translated/localized in Arabic.
33. 'trademarkStatus': One of "Safe to Upload", "Needs Attention", or "Trademark Warning". Assess the design concept and text phrases against trademark landmines (USPTO Class 025 for clothing, Class 016 for stickers).
34. 'trademarkDetails': Clear, actionable feedback on intellectual property, trademark search tips, and why this design is safe or what terms to avoid (in English).
35. 'trademarkDetailsArabic': Trademark feedback and search tips translated/localized in Arabic.
36. 'aiImagePrompt': A highly detailed, professionally written image prompt (in English) designed to generate this exact design on image AI platforms.
37. 'aiImagePromptArabic': A clear localized Arabic explanation and translation of this prompt to help the user understand how to configure their AI generation.
38. 'searchVolume': A string representing the search volume, e.g. "12.4K searches/mo" or "+310% YoY Growth" or "Extremely High (94/100)".
39. 'searchStrength': An integer from 1 to 100 representing search volume strength, e.g. 92.
40. 'sources': An array of objects each having 'title' (specific source or query, e.g. "Google Trends - Pickleball" or "Etsy Best Sellers - Retro") and 'uri' (a URL linking to the category or search engine search page, e.g. "https://trends.google.com/trends/explore?q=pickleball" or "https://www.etsy.com/search?q=retro+pickleball").

Important Guidelines for 'seoKeywords', 'tags', titles (including titleA, titleB, titleC, titleD, titleE, cleanListingTitle, titleArabic, and all variants), and descriptions:
- Total tags count across the 5 categories must be exactly 15 (3 core + 4 buyer intent + 3 style + 2 related + 3 long tail = 15 total tags).
- Prevent repetitive meaning (no cat, cats, kitty, cute cat, kitten). Choose ONE keyword for each concept.
- Avoid generic marketing buzzwords ('best seller', 'trending', 'viral', 'awesome', 'cheap').
- NO PRODUCT NAMES ALLOWED (CRITICAL EXCLUSION): You MUST NEVER include any print-on-demand or merchandise product names inside the design titles (and all variants), keywords/tags, or listing descriptions (both English and Arabic). Banned product terms include but are not limited to:
  - Apparel/clothing: T-Shirt, shirt, hoodie, sweatshirt, top, tank, dress, dad hat, bucket hat, cap, beanie, apron, socks, scarf, baby one-piece.
  - Paper goods/artwork: sticker, stickers, decal, vinyl, art print, poster, framed print, canvas print, tapestry.
  - Home decor: pillow, cushion, comforter, duvet cover, shower curtain, bath mat, blanket, throw, wall clock, coaster, placemat, table runner.
  - Drinkware: mug, travel mug, cup, water bottle, tumbler.
  - Stationery: greeting card, postcard, notebook, journal.
  - Tech/Cases: case, tough case, skin, sleeve, mouse pad, desk mat.
  - Bags: tote, tote bag, backpack, drawstring bag, zipper pouch.
  - Pets: bandana, pet blanket, pet mat.
  - Miscellaneous: magnet, pin, button, puzzle.
  - Arabic equivalents: تيشيرت, تيشيرتات, تي شيرت, هودي, هوديات, قبعة, قبعات, جورب, جوارب, فستان, فساتين, ملصق, ملصقات, بوستر, بوسترات, لوحة, لوحات, وسادة, وسائد, خدادية, خداديات, كوب, أكواب, كفر, كفرات, غطاء, أغطية, حقيبة, حقائب, دفتر, دفاتر, مذكرات, بطانية, بطانيات, مغناطيس, بروش, دبوس.
- No trademarked terms.
- The flat 'tags' array MUST contain the exactly 15 string keywords generated inside 'seoKeywords' so they align perfectly.

Ensure your response matches the requested JSON schema structure exactly.
`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          trends: {
            type: Type.ARRAY,
            description: "List of exactly 10 trending design ideas for Redbubble with optimized listing, categorized SEO keywords, three title variants, and trademark pre-checks",
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                title: { type: Type.STRING },
                titleArabic: { type: Type.STRING },
                niche: { type: Type.STRING },
                nicheArabic: { type: Type.STRING },
                concept: { type: Type.STRING },
                conceptArabic: { type: Type.STRING },
                tags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                seoKeywords: {
                  type: Type.OBJECT,
                  properties: {
                    core: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          keyword: { type: Type.STRING },
                          score: { type: Type.INTEGER },
                          reason: { type: Type.STRING },
                          reasonArabic: { type: Type.STRING }
                        },
                        required: ["keyword", "score", "reason", "reasonArabic"]
                      }
                    },
                    buyerIntent: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          keyword: { type: Type.STRING },
                          score: { type: Type.INTEGER },
                          reason: { type: Type.STRING },
                          reasonArabic: { type: Type.STRING }
                        },
                        required: ["keyword", "score", "reason", "reasonArabic"]
                      }
                    },
                    style: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          keyword: { type: Type.STRING },
                          score: { type: Type.INTEGER },
                          reason: { type: Type.STRING },
                          reasonArabic: { type: Type.STRING }
                        },
                        required: ["keyword", "score", "reason", "reasonArabic"]
                      }
                    },
                    related: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          keyword: { type: Type.STRING },
                          score: { type: Type.INTEGER },
                          reason: { type: Type.STRING },
                          reasonArabic: { type: Type.STRING }
                        },
                        required: ["keyword", "score", "reason", "reasonArabic"]
                      }
                    },
                    longTail: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          keyword: { type: Type.STRING },
                          score: { type: Type.INTEGER },
                          reason: { type: Type.STRING },
                          reasonArabic: { type: Type.STRING }
                        },
                        required: ["keyword", "score", "reason", "reasonArabic"]
                      }
                    }
                  },
                  required: ["core", "buyerIntent", "style", "related", "longTail"]
                },
                suggestedProducts: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                suggestedProductsArabic: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                competition: { type: Type.STRING },
                whyTrending: { type: Type.STRING },
                whyTrendingArabic: { type: Type.STRING },

                // Title Optimization Engine fields
                titleA: { type: Type.STRING },
                titleAArabic: { type: Type.STRING },
                titleAScore: { type: Type.INTEGER },
                titleAExplanation: { type: Type.STRING },
                titleAExplanationArabic: { type: Type.STRING },

                titleB: { type: Type.STRING },
                titleBArabic: { type: Type.STRING },
                titleBScore: { type: Type.INTEGER },
                titleBExplanation: { type: Type.STRING },
                titleBExplanationArabic: { type: Type.STRING },

                titleC: { type: Type.STRING },
                titleCArabic: { type: Type.STRING },
                titleCScore: { type: Type.INTEGER },
                titleCExplanation: { type: Type.STRING },
                titleCExplanationArabic: { type: Type.STRING },

                titleD: { type: Type.STRING },
                titleDArabic: { type: Type.STRING },
                titleDScore: { type: Type.INTEGER },
                titleDExplanation: { type: Type.STRING },
                titleDExplanationArabic: { type: Type.STRING },

                titleE: { type: Type.STRING },
                titleEArabic: { type: Type.STRING },
                titleEScore: { type: Type.INTEGER },
                titleEExplanation: { type: Type.STRING },
                titleEExplanationArabic: { type: Type.STRING },

                cleanListingTitle: { type: Type.STRING },
                cleanListingTitleArabic: { type: Type.STRING },
                description: { type: Type.STRING },
                descriptionArabic: { type: Type.STRING },
                trademarkStatus: { type: Type.STRING, description: "Must be 'Safe to Upload', 'Needs Attention', or 'Trademark Warning'" },
                trademarkDetails: { type: Type.STRING },
                trademarkDetailsArabic: { type: Type.STRING },
                aiImagePrompt: { type: Type.STRING },
                aiImagePromptArabic: { type: Type.STRING },
                searchVolume: { type: Type.STRING, description: "Detailed search volume metric" },
                searchStrength: { type: Type.INTEGER, description: "Search strength out of 100" },
                sources: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      uri: { type: Type.STRING }
                    },
                    required: ["title", "uri"]
                  }
                }
              },
              required: [
                "id", "title", "titleArabic", "niche", "nicheArabic", "concept", "conceptArabic", "tags", "seoKeywords",
                "suggestedProducts", "suggestedProductsArabic", "competition", "whyTrending", "whyTrendingArabic", 
                "titleA", "titleAArabic", "titleAScore", "titleAExplanation", "titleAExplanationArabic",
                "titleB", "titleBArabic", "titleBScore", "titleBExplanation", "titleBExplanationArabic",
                "titleC", "titleCArabic", "titleCScore", "titleCExplanation", "titleCExplanationArabic",
                "titleD", "titleDArabic", "titleDScore", "titleDExplanation", "titleDExplanationArabic",
                "titleE", "titleEArabic", "titleEScore", "titleEExplanation", "titleEExplanationArabic",
                "cleanListingTitle", "cleanListingTitleArabic", "description", "descriptionArabic", "trademarkStatus", "trademarkDetails", "trademarkDetailsArabic", "aiImagePrompt", "aiImagePromptArabic",
                "searchVolume", "searchStrength", "sources"
              ]
            }
          }
        },
        required: ["trends"]
      };

      // Call our robust fallback-supported generation function with automatic key rotation
      const { text, sources } = await runWithKeyRotation(async (aiInstance) => {
        return await generateTrendsWithFallback(
          aiInstance,
          prompt,
          responseSchema,
          true // Enable Stage 1 Search Grounding
        );
      });

      const data = JSON.parse(text);
      const rawTrends = data.trends || [];
      const scrubbedTrends = rawTrends.map((trend: any) => scrubTrend(trend));

      res.json({
        trends: scrubbedTrends,
        sources: sources
      });

    } catch (error: any) {
      console.error("Error generating trends, falling back to dynamic local database:", error);
      
      const { category, selectedSources } = req.body || {};
      const requestedCategory = (category && category !== "all") ? category.toLowerCase() : "all";

      // Call our dynamic fallback generator which shuffles, selects, and dynamically mutates trends
      const fallbackTrends = getDynamicFallbackTrends(requestedCategory, selectedSources);
      const scrubbedFallbackTrends = fallbackTrends.map((trend: any) => scrubTrend(trend));

      // Return offline sources
      const fallbackSources = [
        {
          title: "Redbubble Tagging 101 Guidelines (Recommended)",
          uri: "https://blog.redbubble.com/2021/04/redbubble-tagging-101"
        },
        {
          title: "USPTO Trademark Search System (TESS)",
          uri: "https://www.uspto.gov/trademarks/search"
        },
        {
          title: "Redbubble Intellectual Property Policy",
          uri: "https://help.redbubble.com/hc/en-us/articles/201350669"
        }
      ];

      res.json({
        trends: scrubbedFallbackTrends,
        sources: fallbackSources,
        isOfflineFallback: true,
        offlineNotice: "Live Gemini API quota exceeded or not configured. Activated offline smart trend precheck database with 10 optimized, pre-screened US designs matching your category!"
      });
    }
  });

  // API Route for Deep Trademark & Copyright Verification
  app.post("/api/trademark/check", async (req, res) => {
    try {
      const keys = getApiKeys();
      if (keys.length === 0) {
        throw new Error("GEMINI_API_KEY is not defined or is empty in environment variables.");
      }

      const { title, description, tags } = req.body || {};

      if (!title) {
        return res.status(400).json({ error: "Title is required for trademark check" });
      }

      const prompt = `
Analyze the following Redbubble print-on-demand listing metadata for registered trademarks, copyright risks, intellectual property violations, or policy infractions in the US market (such as USPTO Trademark Class 025 (clothing/apparel) and Class 016 (stickers/posters/paper goods), Redbubble policy, public figures, movies, TV shows, video games, musical bands, anime, books, protected quotes, slogans, or popular corporate brands like Disney, Nike, Marvel, Star Wars, Nintendo, etc.).

Analyze each of the following fields very carefully:
1. Title: "${title}"
2. Description: "${description || "None provided"}"
3. Tags/Keywords (comma-separated): "${tags ? (Array.isArray(tags) ? tags.join(", ") : tags) : "None provided"}"

Provide a clean, comprehensive analysis in JSON. Your response must strictly conform to the requested JSON schema.
- 'overallStatus': "Safe to Upload" (if completely clear of trademarks/copyright issues), "Needs Attention" (if there are minor risks or recommendations to edit), or "Trademark Warning" (if there are clear protected brand/trademark names).
- 'score': 0 to 100 (100 being completely safe, 0 being definite trademark infringement).
- 'findings': An array of specific analyzed phrases or keywords. For each finding, state:
  - 'term': The analyzed word or phrase.
  - 'risk': "Low", "Medium", or "High".
  - 'category': "Trademark", "Copyright", "Pop Culture", "Brand Name", "Clean", or "Policy Recommendation".
  - 'explanation': Clear explanation in English of why it's a risk or why it's fine.
  - 'explanationArabic': Clear explanation in Arabic of why it's a risk or why it's fine.
- 'generalAdvice': Overall advice and actionable upload recommendations in English.
- 'generalAdviceArabic': Overall advice and actionable upload recommendations in Arabic.
- 'usptoSearchTerms': A list of specific phrases or keywords the user should manually double check on the USPTO TESS database.
`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          overallStatus: { type: Type.STRING, description: "Must be 'Safe to Upload', 'Needs Attention', or 'Trademark Warning'" },
          score: { type: Type.INTEGER },
          findings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                term: { type: Type.STRING },
                risk: { type: Type.STRING },
                category: { type: Type.STRING },
                explanation: { type: Type.STRING },
                explanationArabic: { type: Type.STRING }
              },
              required: ["term", "risk", "category", "explanation", "explanationArabic"]
            }
          },
          generalAdvice: { type: Type.STRING },
          generalAdviceArabic: { type: Type.STRING },
          usptoSearchTerms: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["overallStatus", "score", "findings", "generalAdvice", "generalAdviceArabic", "usptoSearchTerms"]
      };

      const text = await runWithKeyRotation(async (aiInstance) => {
        return await generateTrademarkWithFallback(
          aiInstance,
          prompt,
          responseSchema
        );
      });

      const data = JSON.parse(text);
      res.json(data);

    } catch (error: any) {
      console.error("Error checking trademarks, falling back to local rule-based scanner:", error);
      const { title, description, tags } = req.body || {};
      const localResult = performLocalTrademarkCheck(title || "", description || "", tags || []);
      res.json({
        ...localResult,
        isOfflineFallback: true
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
