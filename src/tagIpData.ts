export interface TagIpStatus {
  tag: string;
  badgeType: "safe" | "warning" | "caution";
  statusEn: string;
  statusAr: string;
  explanationEn: string;
  explanationAr: string;
}

export const trendTagsIpMap: Record<number, TagIpStatus[]> = {
  1: [
    {
      tag: "pickleball",
      badgeType: "safe",
      statusEn: "Generic Term (Safe)",
      statusAr: "مصطلح عام (آمن)",
      explanationEn: "Name of a popular sport. Completely generic and free of trademark claims on apparel.",
      explanationAr: "اسم لرياضة عامة شائعة. مصطلح عام وخالٍ تماماً من العلامات التجارية في فئة الملابس."
    },
    {
      tag: "retro pickleball",
      badgeType: "safe",
      statusEn: "Aesthetic Duo (Safe)",
      statusAr: "تصنيف مزدوج (آمن)",
      explanationEn: "Combines a generic style with a generic sport name. Safe and highly recommended.",
      explanationAr: "يجمع بين نمط فني كلاسيكي عام واسم رياضة عامة. آمن للغاية وموصى به للتريند."
    },
    {
      tag: "vintage pickleball",
      badgeType: "safe",
      statusEn: "Descriptive Style (Safe)",
      statusAr: "أسلوب وصفي (آمن)",
      explanationEn: "Descriptive keyword denoting vintage design style. 100% free of IP issues.",
      explanationAr: "كلمة مفتاحية وصفية تشير إلى أسلوب التصميم الكلاسيكي القديم. خالية 100% من مشاكل الملكية."
    },
    {
      tag: "pickleball club",
      badgeType: "safe",
      statusEn: "Descriptive Term (Safe)",
      statusAr: "مصطلح وصفي (آمن)",
      explanationEn: "Refers to a generic sports association, free of trademark blocks on Class 025.",
      explanationAr: "يشير إلى نادٍ أو رابطة رياضية عامة، وخالٍ تماماً من قيود العلامات التجارية في الفئة 025."
    },
    {
      tag: "70s aesthetic",
      badgeType: "safe",
      statusEn: "Era Category (Safe)",
      statusAr: "حقبة زمنية (آمن)",
      explanationEn: "Refers to the 1970s cultural design theme. Broad and impossible to monopolize.",
      explanationAr: "يشير إلى الطابع الفني لحقبة السبعينات الثقافية. عام جداً ومستحيل احتكاره كعلامة."
    },
    {
      tag: "retro sports",
      badgeType: "safe",
      statusEn: "Genre Classification (Safe)",
      statusAr: "تصنيف فني (آمن)",
      explanationEn: "Classification for old-school athletics styles. Highly safe for listings.",
      explanationAr: "تصنيف عام للأساليب الرياضية الكلاسيكية القديمة. آمن للغاية للاستخدام في الكلمات الدلالية."
    },
    {
      tag: "pickleball paddles",
      badgeType: "safe",
      statusEn: "Generic Object (Safe)",
      statusAr: "عنصر مادي عام (آمن)",
      explanationEn: "Common name of a sports equipment item. Non-registrable for fashion apparel.",
      explanationAr: "الاسم الشائع لمضرب اللعب. غير قابل للتسجيل كعلامة تجارية حصرية لملابس الموضة."
    },
    {
      tag: "funny pickleball gift",
      badgeType: "safe",
      statusEn: "Commercial Search Term (Safe)",
      statusAr: "مصطلح تسويقي عام (آمن)",
      explanationEn: "High-volume search keyword used for commercial discovery. Extremely safe.",
      explanationAr: "كلمة بحث ذات معدل زيارات مرتفع تستخدم للعثور على هدايا مضحكة. آمنة تماماً."
    },
    {
      tag: "pickleball lover",
      badgeType: "safe",
      statusEn: "Niche Audience (Safe)",
      statusAr: "جمهور مستهدف (آمن)",
      explanationEn: "Descriptive phrase indicating a fan or player. Free of trademark registration.",
      explanationAr: "عبارة وصفية تشير إلى محبي اللعبة أو اللاعبين. خالية من أي تسجيلات علامات تجارية."
    },
    {
      tag: "pickleball court",
      badgeType: "safe",
      statusEn: "Descriptive Place (Safe)",
      statusAr: "مكان وصفي عام (آمن)",
      explanationEn: "Refers to the playground location of the sport. Non-trademarked generic term.",
      explanationAr: "يشير إلى مكان أو ملعب ممارسة الرياضة. مصطلح عام غير محمي وقابل للاستخدام للجميع."
    },
    {
      tag: "pickleball player",
      badgeType: "safe",
      statusEn: "Generic Title (Safe)",
      statusAr: "لقب عام (آمن)",
      explanationEn: "Refers to an individual practicing the sport. Fully free and open-source keyword.",
      explanationAr: "يشير إلى الشخص الممارس للعبة. كلمة مفتاحية حرة بالكامل وخالية من أي قيود."
    },
    {
      tag: "vintage sports",
      badgeType: "safe",
      statusEn: "Aesthetic Category (Safe)",
      statusAr: "تصنيف جمالي (آمن)",
      explanationEn: "Broad retro athletics theme. Free of intellectual property restrictions.",
      explanationAr: "سمة أو سمات ريترو رياضية واسعة النطاق. خالية تماماً من قيود الملكية الفكرية."
    },
    {
      tag: "sunset stripes",
      badgeType: "safe",
      statusEn: "Design Element (Safe)",
      statusAr: "عنصر تصميم (آمن)",
      explanationEn: "Refers to retro striped graphics. Artistic descriptor with zero IP risk.",
      explanationAr: "يشير إلى الخطوط والرسومات الدائرية المخططة لغروب الشمس. وصف فني خالٍ من المخاطر."
    },
    {
      tag: "retro typography",
      badgeType: "safe",
      statusEn: "Design Style (Safe)",
      statusAr: "نمط خطوط (آمن)",
      explanationEn: "Generic art descriptor for stylized letterings. Completely safe.",
      explanationAr: "وصف فني عام يعبر عن نمط الكتابة والخطوط الكلاسيكية. آمن تماماً."
    },
    {
      tag: "pickleball art",
      badgeType: "safe",
      statusEn: "Artistic Category (Safe)",
      statusAr: "تصنيف فني (آمن)",
      explanationEn: "Broad categorical term for designs focused on pickleball. Free to use.",
      explanationAr: "مصطلح تصنيفي واسع للتصاميم الفنية التي تركز على البيكلبول. متاح وحر للاستخدام."
    }
  ],
  2: [
    {
      tag: "cute frog",
      badgeType: "safe",
      statusEn: "Natural Subject (Safe)",
      statusAr: "كائن طبيعي (آمن)",
      explanationEn: "Description of a generic animal. Fully safe, not tied to any proprietary characters.",
      explanationAr: "وصف لحيوان طبيعي عام. آمن تماماً وغير مرتبط بأي شخصية كرتونية مملوكة."
    },
    {
      tag: "boba tea",
      badgeType: "safe",
      statusEn: "Generic Food (Safe)",
      statusAr: "مشروب عام (آمن)",
      explanationEn: "Common Taiwanese beverage name. Cannot be registered as a trademark for apparel.",
      explanationAr: "اسم مشروب شاي الفقاعات التايواني الشائع. لا يمكن تسجيله كعلامة حصرية في قطاع الملابس."
    },
    {
      tag: "matcha green tea",
      badgeType: "safe",
      statusEn: "Generic Ingredient (Safe)",
      statusAr: "مكون طبيعي عام (آمن)",
      explanationEn: "Traditional green tea variety. Purely generic and fully safe to print.",
      explanationAr: "نوع شاي أخضر تقليدي ومكون طبيعي. عام تماماً وآمن للاستخدام والطباعة."
    },
    {
      tag: "kawaii frog",
      badgeType: "safe",
      statusEn: "Cute Theme (Safe)",
      statusAr: "طابع لطيف (آمن)",
      explanationEn: "Japanese style descriptor for a cute frog. Free and popular niche search.",
      explanationAr: "وصف ياباني لضفدع لطيف بأسلوب الكوايي. كلمة بحث شائعة جداً وخالية من أي قيود."
    },
    {
      tag: "cottagecore frog",
      badgeType: "safe",
      statusEn: "Aesthetic Theme (Safe)",
      statusAr: "نمط ريفي عام (آمن)",
      explanationEn: "Cottagecore fashion aesthetic merged with a frog subject. Safe community term.",
      explanationAr: "نمط حياة ريفي جمالي مدمج مع الضفدع. كلمة آمنة يستخدمها مجتمع المصممين."
    },
    {
      tag: "boba lover",
      badgeType: "safe",
      statusEn: "Niche Group (Safe)",
      statusAr: "جمهور المشروب (آمن)",
      explanationEn: "Refers to fans of tapioca tea. Completely safe commercial tag.",
      explanationAr: "يشير إلى محبي شاي الفقاعات. تاغ تجاري عام وآمن بالكامل للتسويق واستقطاب الزوار."
    },
    {
      tag: "bubble tea illustration",
      badgeType: "safe",
      statusEn: "Art Descriptor (Safe)",
      statusAr: "وصف فني (آمن)",
      explanationEn: "Descriptive label for bubble tea graphics. Entirely free of IP restrictions.",
      explanationAr: "وصف فني وتوضيحي لرسومات شاي بوبا. خالٍ تماماً من أي قيود ملكية فكرية."
    },
    {
      tag: "green aesthetic",
      badgeType: "safe",
      statusEn: "Color Concept (Safe)",
      statusAr: "مفهوم لوني (آمن)",
      explanationEn: "Refers to green-themed color palettes and vibes. Impossible to trademark.",
      explanationAr: "يشير إلى لوحات الألوان والأجواء الخضراء. مستحيل تسجيلها كعلامة تجارية."
    },
    {
      tag: "matcha boba",
      badgeType: "safe",
      statusEn: "Flavor Combo (Safe)",
      statusAr: "نكهة مدمجة (آمنة)",
      explanationEn: "Popular drink flavor combination. Generic beverage descriptor with zero risk.",
      explanationAr: "نكهة شائعة تدمج الماتشا مع البوبا. وصف مشروب عام وخالٍ من أي مخاطر قانونية."
    },
    {
      tag: "cute animal",
      badgeType: "safe",
      statusEn: "Broad Descriptor (Safe)",
      statusAr: "وصف عام (آمن)",
      explanationEn: "Generic description for adorable pets or wildlife. Safe and free to tag.",
      explanationAr: "وصف عام للحيوانات الأليفة أو البرية اللطيفة. آمن تماماً ومفتوح للاستخدام."
    },
    {
      tag: "frog sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "وصف منتج (آمن)",
      explanationEn: "Direct descriptive tag indicating a frog sticker product. Safe.",
      explanationAr: "تاغ وصفي مباشر يشير إلى ملصقات الضفادع. آمن للاستخدام والرفع ككلمة دلالية."
    },
    {
      tag: "kawaii sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "وصف منتج (آمن)",
      explanationEn: "Direct descriptive tag indicating a Japanese kawaii style sticker. Safe.",
      explanationAr: "تاغ وصفي مباشر يشير إلى ملصق كوايي ياباني لطيف. آمن وخالٍ من أي عوائق فكرية."
    },
    {
      tag: "matcha latte",
      badgeType: "safe",
      statusEn: "Generic Drink (Safe)",
      statusAr: "مشروب عام (آمن)",
      explanationEn: "Standard coffee-shop drink name. Generic term with zero trademark potential on Class 025.",
      explanationAr: "اسم مشروب قياسي في المقاهي. مصطلح عام لا يحمل أي طابع احتكاري في فئة الملابس."
    },
    {
      tag: "cute boba frog",
      badgeType: "safe",
      statusEn: "Original Subject (Safe)",
      statusAr: "مفهوم أصلي (آمن)",
      explanationEn: "Descriptive artistic mashup of a frog and boba. Safe original concept.",
      explanationAr: "دمج وصفي وفني مبتكر لضفدع مع مشروب بوبا. مفهوم أصلي وآمن تماماً للرفع."
    },
    {
      tag: "boba sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "وصف منتج (آمن)",
      explanationEn: "Descriptive tag indicating a boba tea themed sticker. Entirely safe.",
      explanationAr: "تاغ وصفي مباشر يشير إلى ملصق بتصميم شاي بوبا. آمن بالكامل ولا توجد قيود."
    }
  ],
  3: [
    {
      tag: "git commit",
      badgeType: "caution",
      statusEn: "Technical / Trademark Owner",
      statusAr: "تقني / علامة مملوكة",
      explanationEn: "'Git' is a trademark of Software Freedom Conservancy. However, technical commands in apparel are generally allowed under fair use.",
      explanationAr: "كلمة 'Git' هي علامة مسجلة لمؤسسة SFC. ومع ذلك، فإن استخدام الأوامر التقنية في الملابس يعتبر استخداماً عادلاً مسموحاً."
    },
    {
      tag: "programmer humor",
      badgeType: "safe",
      statusEn: "Generic Phrase (Safe)",
      statusAr: "عبارة عامة (آمنة)",
      explanationEn: "Comedic category for developers and coders. No brand owns this phrase.",
      explanationAr: "تصنيف فكاهي عام يستهدف المبرمجين والمطورين. لا توجد شركة تمتلك حقوق هذه العبارة."
    },
    {
      tag: "coding joke",
      badgeType: "safe",
      statusEn: "Generic Phrase (Safe)",
      statusAr: "عبارة عامة (آمنة)",
      explanationEn: "Descriptive term for software related humor. Broad and safe.",
      explanationAr: "عبارة عامة لوصف النكات البرمجية والفكاهة التقنية. تصنيف واسع وآمن للاستخدام."
    },
    {
      tag: "software engineer",
      badgeType: "safe",
      statusEn: "Generic Profession (Safe)",
      statusAr: "مهنة عامة (آمنة)",
      explanationEn: "Official job title for computer software developers. Impossible to trademark as apparel.",
      explanationAr: "مسمى وظيفي رسمي لمطوري البرمجيات. مستحيل احتكاره كعلامة تجارية في مجال الملابس."
    },
    {
      tag: "funny coder shirt",
      badgeType: "safe",
      statusEn: "Product Search Term (Safe)",
      statusAr: "مصطلح بحث تجاري (آمن)",
      explanationEn: "E-commerce search tag targeting tech buyers. 100% safe description.",
      explanationAr: "تاغ بحث تجاري يستهدف زوار قطاع التقنية ومطوري البرامج. وصف آمن ومتاح بنسبة 100%."
    },
    {
      tag: "git push",
      badgeType: "caution",
      statusEn: "Technical Command (Caution)",
      statusAr: "أمر تقني (حذر)",
      explanationEn: "Command in the Git protocol. Controlled by SFC, but accepted in developer jokes under fair use.",
      explanationAr: "أمر في بروتوكول Git. يقع تحت إدارة SFC ولكن استخدامه سياق كوميدي آمن بنظام الاستخدام العادل."
    },
    {
      tag: "developer sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "وصف منتج (آمن)",
      explanationEn: "Product descriptor for developer-themed vinyl decals. Safe.",
      explanationAr: "وصف منتج مباشر يشير إلى ملصقات الفينيل المخصصة للمطورين. آمن تماماً وخالٍ من الحقوق."
    },
    {
      tag: "computer science",
      badgeType: "safe",
      statusEn: "Academic Field (Safe)",
      statusAr: "تخصص أكاديمي (آمن)",
      explanationEn: "Scientific field of study. Generic educational term completely free of IP claims.",
      explanationAr: "حقل علمي وتخصص دراسي. مصطلح تعليمي عام ومفتوح تماماً وخالٍ من قضايا الملكية."
    },
    {
      tag: "programming memes",
      badgeType: "safe",
      statusEn: "Generic Phrase (Safe)",
      statusAr: "عبارة عامة (آمنة)",
      explanationEn: "Humorous internet images for developers. Fully safe and generic category.",
      explanationAr: "صور ساخرة وميمز برمجية متداولة على الإنترنت. تصنيف عام وآمن بالكامل للرفع."
    },
    {
      tag: "coder life",
      badgeType: "safe",
      statusEn: "Lifestyle Phrase (Safe)",
      statusAr: "أسلوب حياة (آمن)",
      explanationEn: "Niche lifestyle phrase reflecting programming daily routines. Free of trademarks.",
      explanationAr: "عبارة تعبر عن نمط الحياة واليوميات للمبرمجين. خالية بالكامل من أي علامات تجارية."
    },
    {
      tag: "nerd humor",
      badgeType: "safe",
      statusEn: "Generic Category (Safe)",
      statusAr: "تصنيف عام (آمن)",
      explanationEn: "Humorous jokes targeting intellectual/geek audiences. Highly safe.",
      explanationAr: "نكات برمجية وفكاهة تستهدف الجمهور التقني والمهووسين بالمعرفة. آمنة للغاية."
    },
    {
      tag: "github sticker",
      badgeType: "warning",
      statusEn: "Active Brand Name (Warning)",
      statusAr: "اسم علامة نشطة (تنبيه)",
      explanationEn: "'GitHub' is a registered brand of Microsoft. Using it as a main product tag is highly risky and can attract DMCA strikes.",
      explanationAr: "كلمة 'GitHub' هي علامة مسجلة تابعة لمايكروسوفت. استخدامها كتاغ مستقل يعرضك لمخاطر DMCA."
    },
    {
      tag: "linux commit",
      badgeType: "safe",
      statusEn: "Open Source Term (Safe)",
      statusAr: "مصطلح مفتوح المصدر (آمن)",
      explanationEn: "Refers to the open-source Linux kernel development. Descriptive reference is safe.",
      explanationAr: "يشير إلى نظام تشغيل لينكس مفتوح المصدر وتطوير البرمجيات. استخدام وصفي آمن."
    },
    {
      tag: "code error",
      badgeType: "safe",
      statusEn: "Technical Event (Safe)",
      statusAr: "حدث تقني عام (آمن)",
      explanationEn: "Common occurrence in coding. Completely generic and risk-free.",
      explanationAr: "حدوث خطأ برمي عام في الأكواد. مصطلح عام تماماً وخالٍ من أي مخاطر ملكية."
    },
    {
      tag: "debug coding",
      badgeType: "safe",
      statusEn: "Generic Activity (Safe)",
      statusAr: "نشاط تقني عام (آمن)",
      explanationEn: "Process of fixing code bugs. Descriptive development term, safe for POD.",
      explanationAr: "عملية ملاحقة وإصلاح الأخطاء البرمجية. مصطلح وصفي تقني وآمن بالكامل للطباعة عند الطلب."
    }
  ],
  4: [
    {
      tag: "celestial art",
      badgeType: "safe",
      statusEn: "Art Movement (Safe)",
      statusAr: "تصنيف فني (آمن)",
      explanationEn: "Generic artistic style category. Wide open to public use on all marketplaces.",
      explanationAr: "تصنيف جمالي وفني عام. متاح للاستخدام العام للجميع على كافة منصات التصميم والبيع."
    },
    {
      tag: "sacred geometry",
      badgeType: "safe",
      statusEn: "Philosophical Concept (Safe)",
      statusAr: "مفهوم فلسفي وفني (آمن)",
      explanationEn: "Ancient spiritual geometry patterns. Public domain concept with zero IP claims.",
      explanationAr: "أنماط وخطوط هندسية تاريخية وروحية. تقع في النطاق العام وخالية من أي مطالبات بالحقوق."
    },
    {
      tag: "tarot art",
      badgeType: "safe",
      statusEn: "Traditional Concept (Safe)",
      statusAr: "مفهوم تقليدي (آمن)",
      explanationEn: "Traditional esoteric card styles. Ancient system, completely safe for print-on-demand.",
      explanationAr: "أساليب رسم بطاقات التاروت القديمة والتقليدية. نظام تاريخي آمن بالكامل للطباعة."
    },
    {
      tag: "boho sun moon",
      badgeType: "safe",
      statusEn: "Natural Elements (Safe)",
      statusAr: "عناصر طبيعية (آمنة)",
      explanationEn: "Combines sun, moon and bohemian art themes. Non-proprietary graphic concept.",
      explanationAr: "يجمع بين الشمس والقمر والنمط البوهيمي الدافئ. مفهوم رسومي طبيعي غير خاضع للاحتكار."
    },
    {
      tag: "mystical illustration",
      badgeType: "safe",
      statusEn: "Style Descriptor (Safe)",
      statusAr: "وصف فني (آمن)",
      explanationEn: "Descriptive label for celestial graphics. Entirely safe.",
      explanationAr: "تاغ وصفي يصف الرسومات الكونية والروحية. آمن تماماً وخالٍ من عوائق العلامات."
    },
    {
      tag: "astrology sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "وصف منتج (آمن)",
      explanationEn: "Descriptive label indicating a sticker themed around zodiac and astrology. Safe.",
      explanationAr: "وصف مباشر لملصق يدور حول علم الأبراج والفلك. آمن وخالٍ من أي عوائق."
    },
    {
      tag: "witchy aesthetic",
      badgeType: "safe",
      statusEn: "Internet Subculture (Safe)",
      statusAr: "طابع جمالي (آمن)",
      explanationEn: "Popular internet culture aesthetics. Free of copyright protections.",
      explanationAr: "طابع فني وثقافة فرعية شائعة على الإنترنت. خالية من قيود حقوق الطبع والنشر."
    },
    {
      tag: "linocut sun",
      badgeType: "safe",
      statusEn: "Printmaking Technique (Safe)",
      statusAr: "تقنية طباعة فنية (آمنة)",
      explanationEn: "Refers to sun designs made in a traditional lino-cutting art style. Safe.",
      explanationAr: "يشير إلى تصميم الشمس المحفورة بأسلوب اللينوكوت الفني الكلاسيكي. آمن تماماً."
    },
    {
      tag: "spiritual art",
      badgeType: "safe",
      statusEn: "Categorical Noun (Safe)",
      statusAr: "تصنيف روحي عام (آمن)",
      explanationEn: "Broad term describing esoteric or celestial designs. Completely safe.",
      explanationAr: "مصطلح تصنيفي عام يصف الأعمال الفنية الروحية والكونية. آمن ومتاح للجميع."
    },
    {
      tag: "celestial sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "وصف منتج (آمن)",
      explanationEn: "Direct product descrypter for cosmic themed stickers. 100% safe.",
      explanationAr: "وصف منتج مباشر يشير لملصق يحمل طابعاً كوكبياً أو كوينياً. آمن بنسبة 100%."
    },
    {
      tag: "zodiac signs",
      badgeType: "safe",
      statusEn: "Astrological Concept (Safe)",
      statusAr: "أبراج فلكية (آمنة)",
      explanationEn: "Refers to the 12 astrological signs. Ancient system, impossible to trademark.",
      explanationAr: "يشير إلى الأبراج الاثني عشر الفلكية. نظام قديم يقع في النطاق العام ومستحيل تسجيله."
    },
    {
      tag: "esoteric design",
      badgeType: "safe",
      statusEn: "Style Label (Safe)",
      statusAr: "نمط تصميم (آمن)",
      explanationEn: "Refers to occult or mystical aesthetics. Free of brand restrictions.",
      explanationAr: "وصف جمالي يعبر عن الفنون والرموز الباطنية الغامضة. خالٍ من أي قيود قانونية."
    },
    {
      tag: "bohemian style",
      badgeType: "safe",
      statusEn: "Style Label (Safe)",
      statusAr: "نمط جمالي (آمن)",
      explanationEn: "Refers to warm boho arts and crafts aesthetics. Impossible to monopolize.",
      explanationAr: "وصف جمالي يعبر عن الفنون والألوان البوهيمية الدافئة. مستحيل احتكارها."
    },
    {
      tag: "sun moon stars",
      badgeType: "safe",
      statusEn: "Natural Nouns (Safe)",
      statusAr: "عناصر طبيعية (آمنة)",
      explanationEn: "Generic astronomical objects. Completely safe with zero trademark potential.",
      explanationAr: "مفردات طبيعية لأجسام فلكية. آمنة تماماً ولا يمكن تسجيلها كعلامة تجارية للفئة 025."
    },
    {
      tag: "minimalist line art",
      badgeType: "safe",
      statusEn: "Technical Art Style (Safe)",
      statusAr: "أسلوب رسم فني (آمن)",
      explanationEn: "Refers to minimalist aesthetic layouts drawn with thin lines. 100% safe.",
      explanationAr: "وصف لأسلوب الرسم بالخطوط الرفيعة البسيطة. آمن ومفتوح بنسبة 100% لجميع المصممين."
    }
  ],
  5: [
    {
      tag: "cat cappuccino",
      badgeType: "safe",
      statusEn: "Art Concept (Safe)",
      statusAr: "مفهوم فني (آمن)",
      explanationEn: "Playful design combo of an animal and coffee. Fully safe original creation.",
      explanationAr: "دمج مبتكر بين قط ومشروب كابتشينو. مفهوم أصلي فكاهي وآمن تماماً للرفع."
    },
    {
      tag: "latte art",
      badgeType: "safe",
      statusEn: "Culinary Technique (Safe)",
      statusAr: "مهارة باريستا (آمنة)",
      explanationEn: "Refers to patterns drawn on espresso drink foam. Fully generic coffee term.",
      explanationAr: "يشير إلى الرسم الفني على رغوة الإسبريسو والقهوة. مصطلح عام وخالٍ من العلامات."
    },
    {
      tag: "cozy aesthetic",
      badgeType: "safe",
      statusEn: "Vibe Descriptor (Safe)",
      statusAr: "طابع جمالي مريح (آمن)",
      explanationEn: "Refers to warm, soft and relaxing visual styles. Impossible to trademark.",
      explanationAr: "وصف يعبر عن الأنماط البصرية الدافئة والمريحة والناعمة. مستحيل احتكاره كعلامة."
    },
    {
      tag: "kawaii coffee",
      badgeType: "safe",
      statusEn: "Cute Concept (Safe)",
      statusAr: "مقهى لطيف (آمن)",
      explanationEn: "Japanese inspired adorable coffee doodle aesthetics. Safe.",
      explanationAr: "تصنيف جمالي ياباني يصف رسومات وأكواب القهوة اللطيفة. آمن تماماً للرفع."
    },
    {
      tag: "sleeping kitten",
      badgeType: "safe",
      statusEn: "Natural Subject (Safe)",
      statusAr: "كائن طبيعي (آمن)",
      explanationEn: "Generic animal pose description. Free of trademark or copyright limits.",
      explanationAr: "وصف لوضعية حيوان أليف عام. خالٍ تماماً من علامات الملكية الفكرية أو حقوق الطبع."
    },
    {
      tag: "coffee lover gift",
      badgeType: "safe",
      statusEn: "Commercial Search Term (Safe)",
      statusAr: "مصطلح تجاري (آمن)",
      explanationEn: "Standard gift category targeting caffeinated drink enthusiasts. Safe.",
      explanationAr: "تصنيف تجاري شائع يستهدف محبي القهوة وهداياهم. آمن ومتاح للجميع."
    },
    {
      tag: "cute cat sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "وصف منتج (آمن)",
      explanationEn: "Direct descriptive label for a kitten sticker. Free of IP claims.",
      explanationAr: "وصف مباشر لملصق تزييني لقط لطيف. آمن وخالٍ تماماً من عوائق الملكية الفكرية."
    },
    {
      tag: "espresso mug",
      badgeType: "safe",
      statusEn: "Product Noun (Safe)",
      statusAr: "عنصر مادي (آمن)",
      explanationEn: "Generic coffee-shop vessel. Generic description with zero trademark risk.",
      explanationAr: "الاسم العام لوعاء قهوة الإسبريسو المريح. وصف منتج عام وخالٍ من المخاطر."
    },
    {
      tag: "cafe doodles",
      badgeType: "safe",
      statusEn: "Style Label (Safe)",
      statusAr: "نمط خربشة (آمن)",
      explanationEn: "Descriptive label indicating cafe-themed sketch illustrations. Safe.",
      explanationAr: "تاغ وصفي يصف رسومات كرتونية سريعة وخربشات للمقهى. آمن للغاية للاستخدام."
    },
    {
      tag: "barista cat",
      badgeType: "safe",
      statusEn: "Humorous Character (Safe)",
      statusAr: "شخصية فكاهية (آمنة)",
      explanationEn: "Fictional roleplay concept of a pet brewing coffee. Fully safe.",
      explanationAr: "مفهوم خيالي لقط يلعب دور صانع قهوة. فكرة أصلية وصفية وآمنة تماماً."
    },
    {
      tag: "neko coffee",
      badgeType: "safe",
      statusEn: "Language Noun (Safe)",
      statusAr: "لفظ لغوي عام (آمن)",
      explanationEn: "'Neko' means cat in Japanese. Combined with coffee, it is a safe descriptive tag.",
      explanationAr: "كلمة 'Neko' تعني قط باليابانية. مدمجة مع القهوة تصبح عبارة وصفية لطيفة وآمنة."
    },
    {
      tag: "aesthetic coffee",
      badgeType: "safe",
      statusEn: "Visual Theme (Safe)",
      statusAr: "سمة جمالية (آمنة)",
      explanationEn: "Visual theme celebrating cozy coffee vibes. Fully generic and safe.",
      explanationAr: "سمة بصرية تحتفي بجماليات وأجواء القهوة. عامة تماماً ومتاحة مجاناً."
    },
    {
      tag: "meow latte",
      badgeType: "safe",
      statusEn: "Cute Wordplay (Safe)",
      statusAr: "تلاعب لفظي لطيف (آمن)",
      explanationEn: "Original wordplay combining a cat sound with milk coffee. No trademark risks.",
      explanationAr: "تلاعب لفظي يدمج صوت القط مع قهوة الحليب الدافئة. لا توجد أي مخاطر قانونية."
    },
    {
      tag: "funny pet sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "وصف منتج (آمن)",
      explanationEn: "Direct commercial product tag for animal sticker decodes. Safe.",
      explanationAr: "تاغ تجاري مباشر لملصقات فينيل مخصصة للحيوانات المضحكة. آمن تماماً."
    },
    {
      tag: "cute coffee art",
      badgeType: "safe",
      statusEn: "Artistic Label (Safe)",
      statusAr: "تصنيف فني (آمن)",
      explanationEn: "Categorical descriptive tag for designs representing coffee cups. Safe.",
      explanationAr: "تاغ وصفي وتصنيفي للرسومات والأكواب ذات الطابع اللطيف. آمن بالكامل للجميع."
    }
  ],
  6: [
    {
      tag: "stay wild",
      badgeType: "caution",
      statusEn: "Common Slogan (Caution)",
      statusAr: "شعار شائع جداً (حذر)",
      explanationEn: "Extremely popular slogan. While printed by thousands of artists, trademark applications occasionally pop up on Class 025.",
      explanationAr: "شعار شائع بكثرة. رغم طباعته من آلاف الرسامين، إلا أنه يتعرض لطلبات تسجيل علامات تجارية أحياناً."
    },
    {
      tag: "cottagecore aesthetic",
      badgeType: "safe",
      statusEn: "Lifestyle Culture (Safe)",
      statusAr: "ثقافة ونمط حياة (آمن)",
      explanationEn: "Internet design trend representing rural countryside life. Safe from IP.",
      explanationAr: "تريند تصميم على الإنترنت يمثل الحياة الريفية الطبيعية البسيطة. آمن من قيود الملكية."
    },
    {
      tag: "botanical illustration",
      badgeType: "safe",
      statusEn: "Scientific Art Style (Safe)",
      statusAr: "تصنيف رسم نباتي (آمن)",
      explanationEn: "Scientific drawing style of plant life. Broad generic term with zero IP restrictions.",
      explanationAr: "أسلوب رسم توضيحي علمي للنباتات والزهور. مصطلح عام وخالٍ تماماً من الحقوق."
    },
    {
      tag: "vintage mushroom",
      badgeType: "safe",
      statusEn: "Natural Theme (Safe)",
      statusAr: "عنصر طبيعي عتيق (آمن)",
      explanationEn: "Combines retro filters with a generic fungi subject. Completely safe.",
      explanationAr: "يجمع بين الطابع الكلاسيكي والفطر البري الطبيعي. آمن تماماً ومتاح للاستخدام."
    },
    {
      tag: "nature lover",
      badgeType: "safe",
      statusEn: "Target Audience (Safe)",
      statusAr: "جمهور الطبيعة (آمن)",
      explanationEn: "Extremely common public phrase for environmental fans. Impossible to monopolize.",
      explanationAr: "عبارة شائعة جداً بين عشاق الطبيعة والبيئة. مستحيل احتكارها كعلامة حصرية."
    },
    {
      tag: "goblincore style",
      badgeType: "safe",
      statusEn: "Subculture Aesthetic (Safe)",
      statusAr: "تصنيف فني ريفي (آمن)",
      explanationEn: "Subcategory of cottagecore celebrating soil, mud and forest findings. Safe.",
      explanationAr: "تصنيف فرعي للنمط الريفي يركز على الطين والغابات والفطر البري. آمن بالكامل."
    },
    {
      tag: "wildflower sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "وصف منتج (آمن)",
      explanationEn: "Descriptive label indicating a sticker themed around forest flowers. Safe.",
      explanationAr: "تاغ وصفي مباشر يشير إلى ملصق الزهور البرية الطبيعية. آمن للاستخدام وعام."
    },
    {
      tag: "forestcore art",
      badgeType: "safe",
      statusEn: "Subculture Aesthetic (Safe)",
      statusAr: "تصنيف فني للغابات (آمن)",
      explanationEn: "Aesthetic style focusing on deep forest colors, textures and wildlife. Safe.",
      explanationAr: "طابع جمالي يركز على ألوان وأنسجة الغابات العميقة والحياة البرية. آمن وخالٍ من القيود."
    },
    {
      tag: "mushroom foraging",
      badgeType: "safe",
      statusEn: "Generic Activity (Safe)",
      statusAr: "نشاط عام (آمن)",
      explanationEn: "Act of searching for wild mushrooms in nature. Non-copyrightable activity.",
      explanationAr: "نشاط البحث عن الفطر البري في الطبيعة. نشاط طبيعي عام غير خاضع لأي حقوق حصرية."
    },
    {
      tag: "retro botanical",
      badgeType: "safe",
      statusEn: "Visual Genre (Safe)",
      statusAr: "أسلوب نباتي كلاسيكي (آمن)",
      explanationEn: "Visual theme depicting flowers or leaves in retro styles. Completely safe.",
      explanationAr: "سمة بصرية تعرض زهوراً أو أوراق شجر بأسلوب ريترو. آمنة تماماً وخالية من العلامات."
    },
    {
      tag: "earthy vibes",
      badgeType: "safe",
      statusEn: "Concept Label (Safe)",
      statusAr: "أجواء ترابية دافئة (آمنة)",
      explanationEn: "Visual and sensory vibe descriptor of mud/forest elements. Fully safe.",
      explanationAr: "وصف بصرية للألوان الدافئة والترابية المستوحاة من الغابة. آمن بنسبة 100%."
    },
    {
      tag: "boho mushrooms",
      badgeType: "safe",
      statusEn: "Visual Concept (Safe)",
      statusAr: "فطر بوهيمي (آمن)",
      explanationEn: "Combines warm bohemian palettes with a generic fungi subject. Zero IP risk.",
      explanationAr: "يجمع بين ألوان البوهيمية الدافئة والفطر البري الطبيعي. صفر مخاطر حقوق فكرية."
    },
    {
      tag: "woodland creature",
      badgeType: "safe",
      statusEn: "Natural Noun (Safe)",
      statusAr: "كائن غابات عام (آمن)",
      explanationEn: "Refers to forest animals. Fully generic public concept safe for print-on-demand.",
      explanationAr: "يشير إلى حيوانات الغابة الطبيعية. مفهوم عام وخالٍ بالكامل من عوائق العلامات."
    },
    {
      tag: "mystic nature",
      badgeType: "safe",
      statusEn: "Concept Label (Safe)",
      statusAr: "طبيعة غامضة (آمنة)",
      explanationEn: "Refers to cosmic or esoteric interpretations of plant life. Completely safe.",
      explanationAr: "يشير إلى الجوانب الغامضة أو الساحرة لعناصر الطبيعة والنباتات. آمن تماماً وعام."
    },
    {
      tag: "stay wild flower",
      badgeType: "caution",
      statusEn: "Combined Slogan (Caution)",
      statusAr: "شعار مدمج (حذر)",
      explanationEn: "Combines the common slogan 'Stay Wild' with wildflower illustrations. Safe with original drawings.",
      explanationAr: "يدمج الشعار الشائع 'Stay Wild' مع رسومات الزهور البرية. آمن بشرط أصالة الرسمة."
    }
  ],
  7: [
    {
      tag: "vaporwave aesthetic",
      badgeType: "safe",
      statusEn: "Cultural Genre (Safe)",
      statusAr: "تصنيف ثقافي وفني (آمن)",
      explanationEn: "Electronic music and retro-futuristic art style. Open-source culture movement.",
      explanationAr: "أسلوب فني وموسيقي إلكتروني ريترو. حركة ثقافية مفتوحة ومتاحة بالكامل للجميع."
    },
    {
      tag: "synthwave neon",
      badgeType: "safe",
      statusEn: "Visual Genre (Safe)",
      statusAr: "تصنيف بصري نيون (آمن)",
      explanationEn: "Visual style celebrating 80s arcade culture and glowing neon. Zero IP issues.",
      explanationAr: "أسلوب بصري يحتفي بثقافة الثمانينات وأضواء النيون المتوهجة. خالٍ من عوائق الملكية."
    },
    {
      tag: "retro dolphin",
      badgeType: "safe",
      statusEn: "Natural Subject (Safe)",
      statusAr: "كائن طبيعي ريترو (آمن)",
      explanationEn: "Combines a classic mammal with vintage colors. Completely generic and safe.",
      explanationAr: "يدمج حيواناً بحرياً عاماً مع ألوان كلاسيكية قديمة. آمن وصفي تماماً للرفع."
    },
    {
      tag: "90s outrun",
      badgeType: "safe",
      statusEn: "Subculture Aesthetic (Safe)",
      statusAr: "جماليات التسعينات (آمنة)",
      explanationEn: "Fast-driving, grid-sunset inspired visual genre. Safe and free to tag.",
      explanationAr: "تصنيف فني وبصري مستوحى من غروب الشمس والسيارات السريعة. آمن ومتاح للجميع."
    },
    {
      tag: "cyberpunk sunset",
      badgeType: "safe",
      statusEn: "Sci-Fi Theme (Safe)",
      statusAr: "غروب سايبربانك (آمن)",
      explanationEn: "Refers to high-tech low-life sunset aesthetics. Broad category with zero IP risks.",
      explanationAr: "يشير إلى جماليات المستقبل التكنولوجي وغروب الشمس. تصنيف عام واسع بلا مخاطر."
    },
    {
      tag: "aesthetic sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "ملصق جمالي عام (آمن)",
      explanationEn: "High volume search term for stylish vinyl decals. Entirely safe.",
      explanationAr: "كلمة بحث شائعة جداً لوصف ملصقات الفينيل الأنيقة والعصرية. آمنة تماماً وعامة."
    },
    {
      tag: "nostalgia wave",
      badgeType: "safe",
      statusEn: "Abstract Concept (Safe)",
      statusAr: "مفهوم معنوي عام (آمن)",
      explanationEn: "Vibe referring to a wave of nostalgia. Completely free of trademark claims.",
      explanationAr: "عبارة تشير إلى موجة الحنين إلى الماضي الكلاسيكي. خالية تماماً من مطالبات العلامات."
    },
    {
      tag: "lofi hip hop",
      badgeType: "safe",
      statusEn: "Music Genre (Safe)",
      statusAr: "تصنيف موسيقي (آمن)",
      explanationEn: "Chilled relaxing study music category. Generic public category, highly safe.",
      explanationAr: "تصنيف عام للموسيقى الهادئة والمريحة للمذاكرة والدراسة. آمن للغاية للاستخدام."
    },
    {
      tag: "retro futurism",
      badgeType: "safe",
      statusEn: "Art Movement (Safe)",
      statusAr: "المستقبلية الكلاسيكية (آمنة)",
      explanationEn: "Historical perspective of future designs. Cultural movement, impossible to trademark.",
      explanationAr: "حركة فنية تاريخية تصف رؤية الماضي للمستقبل. مستحيل تسجيلها كعلامة احتكارية."
    },
    {
      tag: "pink dolphin art",
      badgeType: "safe",
      statusEn: "Original Concept (Safe)",
      statusAr: "رسم دولفين وردي (آمن)",
      explanationEn: "Artistic description of a colorful sea mammal. Entirely generic and safe.",
      explanationAr: "وصف فني لثدييات بحرية ملونة بالوردي الزاهي. عام وتصوير فني خالٍ من العوائق."
    },
    {
      tag: "vaporwave grid",
      badgeType: "safe",
      statusEn: "Design Element (Safe)",
      statusAr: "شبكة فابورويف (آمنة)",
      explanationEn: "Refers to perspective 3D grids used in 80s aesthetics. Safe design element.",
      explanationAr: "يشير إلى الشبكة ثلاثية الأبعاد الشهيرة في تصاميم الثمانينات. عنصر تصميم عام وآمن."
    },
    {
      tag: "seapunk vibes",
      badgeType: "safe",
      statusEn: "Subculture Aesthetic (Safe)",
      statusAr: "طابع جمالي بحري (آمن)",
      explanationEn: "Internet subgenre merging aquatic icons with neon colors. Safe from IP.",
      explanationAr: "تصنيف فني يدمج الكائنات البحرية مع الألوان الرقمية الفاقعة. آمن تماماً وخالٍ من القيود."
    },
    {
      tag: "retro gaming sunset",
      badgeType: "safe",
      statusEn: "Interactive Genre (Safe)",
      statusAr: "غروب كلاسيكي للألعاب (آمن)",
      explanationEn: "Combines vintage arcade icons with sunset horizons. Generic and safe.",
      explanationAr: "يجمع بين شارات وصور الألعاب القديمة مع آفاق غروب الشمس. عام تماماً وآمن."
    },
    {
      tag: "90s anime style",
      badgeType: "caution",
      statusEn: "Visual Style / Caution",
      statusAr: "أسلوب فني / حذر",
      explanationEn: "The generic style of 1990s Japanese animation is safe, but avoid duplicating specific protected characters.",
      explanationAr: "الأسلوب الفني للأنمي في التسعينات عام وآمن، ولكن احذر رسم شخصيات محمية للشركات."
    },
    {
      tag: "vaporwave palm tree",
      badgeType: "safe",
      statusEn: "Natural Noun (Safe)",
      statusAr: "شجرة نخيل فابورويف (آمنة)",
      explanationEn: "Combines neon styling with a generic tree. Zero trademark risks on apparel.",
      explanationAr: "يدمج أسلوب النيون الرقمي مع شجرة النخيل الطبيعية. صفر مخاطر في الفئة 025."
    }
  ],
  8: [
    {
      tag: "bookish skeleton",
      badgeType: "safe",
      statusEn: "Original Subject (Safe)",
      statusAr: "مفهوم فني عام (آمن)",
      explanationEn: "Humorous combination of an undead character with reading. Fully safe original concept.",
      explanationAr: "دمج فكاهي وعام بين الهيكل العظمي وهواية القراءة. مفهوم أصلي وآمن تماماً للرفع."
    },
    {
      tag: "spooky library",
      badgeType: "safe",
      statusEn: "Descriptive Place (Safe)",
      statusAr: "مكتبة مرعبة (آمنة)",
      explanationEn: "Refers to a fictional gothic reading place. Impossible to trademark as apparel.",
      explanationAr: "يشير إلى مكان قراءة قوطي مخيف خيالي. مستحيل تسجيله كعلامة حصرية في الملابس."
    },
    {
      tag: "skeleton reading book",
      badgeType: "safe",
      statusEn: "Visual Description (Safe)",
      statusAr: "وصف مرئي للرسمة (آمن)",
      explanationEn: "Literal description of your original hand-drawn layout. 100% free of IP restrictions.",
      explanationAr: "وصف حرفي مباشر للرسمة الفنية الأصلية الخاصة بك. خالية 100% من أي قيود."
    },
    {
      tag: "cozy halloween",
      badgeType: "safe",
      statusEn: "Holiday Category (Safe)",
      statusAr: "تصنيف احتفالي دافئ (آمن)",
      explanationEn: "Refers to autumn holiday seasonal aesthetics. Public domain concept.",
      explanationAr: "يشير إلى الطابع الجمالي الدافئ لموسم الخريف والهالوين. مفهوم يقع في النطاق العام."
    },
    {
      tag: "funny spooky sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "وصف منتج مضحك (آمن)",
      explanationEn: "Direct marketing search tag targeting seasonal vinyl stickers. Safe.",
      explanationAr: "تاغ بحث تسويقي يستهدف الباحثين عن ملصقات مرعبة وفكاهية في المواسم. آمن تماماً."
    },
    {
      tag: "library science",
      badgeType: "safe",
      statusEn: "Academic Field (Safe)",
      statusAr: "علم المكتبات (آمن)",
      explanationEn: "Official field of academic study. Generic educational term free of IP blocks.",
      explanationAr: "حقل دراسي وتخصص علمي رسمي. مصطلح تعليمي عام ومفتوح تماماً وخالٍ من القيود."
    },
    {
      tag: "dark academia art",
      badgeType: "safe",
      statusEn: "Internet Aesthetic (Safe)",
      statusAr: "فن الأكاديميا المظلمة (آمن)",
      explanationEn: "Visual trend celebrating literature, gothic libraries and classic studies. Safe.",
      explanationAr: "حركة جمالية تحتفي بالأدب والمكتبات القوطية والدراسات الكلاسيكية. آمنة وخالية من العوائق."
    },
    {
      tag: "gothic reader",
      badgeType: "safe",
      statusEn: "Lifestyle / Vibe (Safe)",
      statusAr: "طابع قارئ قوطي (آمن)",
      explanationEn: "Refers to fans of gothic literature and dark aesthetic book clubs. Safe.",
      explanationAr: "يشير إلى محبي الأدب القوطي والنوادي القرائية ذات الطابع المظلم. آمن ومتاح للجميع."
    },
    {
      tag: "halloween bookworm",
      badgeType: "safe",
      statusEn: "Cute Wordplay (Safe)",
      statusAr: "محب كتب الهالوين (آمن)",
      explanationEn: "Seasonal wordplay combining reading habits with autumn holidays. Fully safe.",
      explanationAr: "تلاعب لفظي موسمي يدمج بين القراءة وعطلة الهالوين. آمن تماماً وبلا أي مخاطر علامات."
    },
    {
      tag: "spooky vibes",
      badgeType: "safe",
      statusEn: "Seasonal Phrase (Safe)",
      statusAr: "أجواء خريفية مرعبة (آمنة)",
      explanationEn: "Highly popular seasonal phrase representing cute halloween energy. Safe.",
      explanationAr: "عبارة شائعة جداً تعبر عن طاقة وأجواء الهالوين اللطيفة في الخريف. آمنة ومتاحة للجميع."
    },
    {
      tag: "gothic skull sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "ملصق جمجمة قوطي (آمن)",
      explanationEn: "Product descrypter for dark gothic skull vinyl stickers. Safe.",
      explanationAr: "وصف منتج مباشر يشير إلى ملصقات فينيل تحمل جماجم قوطية مظلمة. آمن تماماً."
    },
    {
      tag: "witchy book club",
      badgeType: "safe",
      statusEn: "Visual Concept (Safe)",
      statusAr: "نادي كتاب ساحر (آمن)",
      explanationEn: "Comedic and cozy conceptual book club term. Safe and free to tag.",
      explanationAr: "مصطلح فكاهي ومريح يعبر عن نادي قراءة ذي طابع غامض أو سحري لطيف. آمن للرفع."
    },
    {
      tag: "readers gonna read",
      badgeType: "safe",
      statusEn: "Common Slang (Safe)",
      statusAr: "عبارة عامة شائعة (آمنة)",
      explanationEn: "Humorous rhyming slang phrase for book lovers. Free of exclusive trademarks.",
      explanationAr: "عبارة ساخرة شائعة يستعملها عشاق الكتب والقراءة. خالية تماماً من العلامات التجارية."
    },
    {
      tag: "memento mori art",
      badgeType: "safe",
      statusEn: "Historical Concept (Safe)",
      statusAr: "فن تذكار الموت (آمن)",
      explanationEn: "Medieval artistic philosophical concept. Public domain theme with zero IP claims.",
      explanationAr: "مفهوم فلسفي وفني يرجع للعصور الوسطى. يقع بالكامل في النطاق العام وبلا عوائق."
    },
    {
      tag: "creepy cute sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "ملصق مرعب لطيف (آمن)",
      explanationEn: "Product descriptor for spooky yet adorable stickers. Fully safe.",
      explanationAr: "وصف منتج مباشر لملصق يجمع بين الرعب واللطافة الكرتونية. آمن بنسبة 100%."
    }
  ],
  9: [
    {
      tag: "save the bees",
      badgeType: "safe",
      statusEn: "Advocacy Slogan (Safe)",
      statusAr: "شعار توعوي بيئي (آمن)",
      explanationEn: "Global environmental campaign slogan. Non-registrable for clothing in USPTO Class 025.",
      explanationAr: "شعار حملة بيئية عالمية. غير قابل للاحتكار كعلامة تجارية حصرية للملابس في مكتب العلامات."
    },
    {
      tag: "honeycomb art",
      badgeType: "safe",
      statusEn: "Natural Pattern (Safe)",
      statusAr: "نقش قرص العسل (آمن)",
      explanationEn: "Refers to hexagonal hive structures. Traditional natural element, safe to print.",
      explanationAr: "يشير إلى الهيكل السداسي لخلايا النحل. عنصر طبيعي وهندسي كلاسيكي آمن للطباعة."
    },
    {
      tag: "sunflower bee",
      badgeType: "safe",
      statusEn: "Natural Elements (Safe)",
      statusAr: "عناصر طبيعية (آمنة)",
      explanationEn: "Combines a plant and insect. Completely generic natural components with zero IP risk.",
      explanationAr: "يجمع بين زهرة ونحلة. عناصر طبيعية عامة خالية من أي احتمالية لتسجيل علامات."
    },
    {
      tag: "protect pollinators",
      badgeType: "safe",
      statusEn: "Advocacy Slogan (Safe)",
      statusAr: "شعار بيئي تضامني (آمن)",
      explanationEn: "Ecological advocacy phrase. Public awareness campaigns are safe and open to all.",
      explanationAr: "عبارة تضامنية لدعم البيئة. شعارات التوعية العامة آمنة تماماً ومتاحة لجميع المصممين."
    },
    {
      tag: "eco friendly art",
      badgeType: "safe",
      statusEn: "Style Label (Safe)",
      statusAr: "تصنيف بيئي عام (آمن)",
      explanationEn: "Theme representing environmental advocacy graphics. Fully safe and generic category.",
      explanationAr: "سمة فنية تعبر عن الرسومات والشعارات الداعمة للبيئة. تصنيف عام وآمن بالكامل."
    },
    {
      tag: "bumblebee sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "ملصق نحلة طنانة (آمن)",
      explanationEn: "Product description for natural insect stickers. Completely free of IP blocks.",
      explanationAr: "وصف منتج مباشر يشير إلى ملصق يحمل نحلة طنانة طبيعية. آمن وخالٍ من القيود."
    },
    {
      tag: "nature conservation",
      badgeType: "safe",
      statusEn: "Ecological Concept (Safe)",
      statusAr: "مفهوم بيئي عام (آمن)",
      explanationEn: "Ecological preservation theme. Fully generic public domain term.",
      explanationAr: "مفهوم الحفاظ على البيئة الطبيعية. مصطلح عام يقع في النطاق العام للجميع."
    },
    {
      tag: "save the planet",
      badgeType: "safe",
      statusEn: "Global Slogan (Safe)",
      statusAr: "شعار إنقاذ الكوكب (آمن)",
      explanationEn: "Ecological protection slogan. Impossible to trademark exclusively in fashion industries.",
      explanationAr: "شعار يدعو لحماية كوكب الأرض. مستحيل احتكاره كعلامة حصرية في قطاع الموضة والألبسة."
    },
    {
      tag: "beekeeper gift",
      badgeType: "safe",
      statusEn: "Commercial Search Term (Safe)",
      statusAr: "مصطلح تجاري (آمن)",
      explanationEn: "Commercial search tag targeting beekeeping enthusiasts. Safe for listings.",
      explanationAr: "تاغ بحث تجاري يستهدف مربي النحل وعشاق خلايا العسل. آمن للاستخدام والرفع."
    },
    {
      tag: "vegan advocacy",
      badgeType: "safe",
      statusEn: "Lifestyle Philosophy (Safe)",
      statusAr: "فلسفة نمط حياة (آمن)",
      explanationEn: "Refers to vegetarian/vegan community movements. Open public domain phrase.",
      explanationAr: "يشير إلى الحركة التضامنية النباتية. عبارة عامة ومفتوحة بالكامل بلا أي قيود علامات."
    },
    {
      tag: "honeybee illustration",
      badgeType: "safe",
      statusEn: "Art Descriptor (Safe)",
      statusAr: "رسم نحلة عسل (آمن)",
      explanationEn: "Descriptive label for bee themed illustrations. Entirely free of IP issues.",
      explanationAr: "وصف فني وتوضيحي لرسومات نحلة العسل. خالٍ تماماً من أي عوائق ملكية فكرية."
    },
    {
      tag: "floral bee aesthetic",
      badgeType: "safe",
      statusEn: "Visual Theme (Safe)",
      statusAr: "سمة جمالية نباتية (آمنة)",
      explanationEn: "Visual theme merging flowers and bees. Generic design style.",
      explanationAr: "سمة بصرية تدمج الزهور الفلورال مع النحل. أسلوب تصميم عام ومتاح مجاناً."
    },
    {
      tag: "climate action",
      badgeType: "safe",
      statusEn: "Socio-Political Concept (Safe)",
      statusAr: "مفهوم بيئي عام (آمن)",
      explanationEn: "Global United Nations environmental target. Fully safe public phrase.",
      explanationAr: "مفهوم وقضية عالمية تدعو للحد من التغير المناخي. عبارة عامة آمنة تماماً."
    },
    {
      tag: "wildlife sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "ملصق حياة برية (آمن)",
      explanationEn: "Direct descriptive label for a nature-themed decal. Free of IP claims.",
      explanationAr: "وصف منتج مباشر لملصقات مستوحاة من الطبيعة والحياة البرية الكلاسيكية. آمن تماماً."
    },
    {
      tag: "organic lifestyle",
      badgeType: "safe",
      statusEn: "Lifestyle Concept (Safe)",
      statusAr: "نمط حياة عضوي (آمن)",
      explanationEn: "Refers to natural health lifestyles. Completely generic and risk-free.",
      explanationAr: "يشير إلى أسلوب الحياة العضوي والصديق للبيئة. مصطلح عام وخالٍ من المخاطر."
    }
  ],
  10: [
    {
      tag: "introvert club",
      badgeType: "safe",
      statusEn: "Humorous Slogan (Safe)",
      statusAr: "شعار فكاهي كوميدي (آمن)",
      explanationEn: "Comedic social concept celebrating quiet lifestyles. Free of trademark holds.",
      explanationAr: "مفهوم اجتماعي فكاهي يحتفي بالهدوء والانطوائية. خالٍ تماماً من قيود العلامات."
    },
    {
      tag: "funny cat pizza",
      badgeType: "safe",
      statusEn: "Original Mashup (Safe)",
      statusAr: "دمج مبتكر أصلي (آمن)",
      explanationEn: "Playful artistic mashup of a cat and fast food. Safe original concept.",
      explanationAr: "دمج كرتوني فكاهي لقط يعشق البيتزا. فكرة فنية أصلية آمنة ومتاحة للجميع."
    },
    {
      tag: "stay home club",
      badgeType: "safe",
      statusEn: "Comedic Theme (Safe)",
      statusAr: "شعار فكاهي شائع (آمن)",
      explanationEn: "Comedic pandemic/lifestyle phrase celebrating staying in cozy pajamas. Safe.",
      explanationAr: "عبارة فكاهية شائعة تحتفي بالراحة والجلوس بالمنزل. آمنة بالكامل للبيع."
    },
    {
      tag: "introvert humor",
      badgeType: "safe",
      statusEn: "Generic Category (Safe)",
      statusAr: "تصنيف كوميدي (آمن)",
      explanationEn: "Comedic jokes targeting silent and introverted internet users. Safe category.",
      explanationAr: "نكات فكاهية وسخرية تستهدف الانطوائيين ومحبي العزلة اللطيفة. تصنيف عام وآمن."
    },
    {
      tag: "kawaii pizza cat",
      badgeType: "safe",
      statusEn: "Cute Style (Safe)",
      statusAr: "أسلوب كوايي لطيف (آمن)",
      explanationEn: "Cute Japanese-style pizza kitty doodle aesthetic. Safe.",
      explanationAr: "وصف بصرية بالطابع الياباني اللطيف لقط بيتزا كرتوني. آمن للرفع والبيع."
    },
    {
      tag: "social anxiety sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "ملصق فكاهي ساخر (آمن)",
      explanationEn: "Humorous self-deprecating e-commerce tag for vinyl stickers. Safe.",
      explanationAr: "تاغ فكاهي ساخر يعبر عن القلق الاجتماعي مخصص لملصقات الفينيل الكوميدية. آمن."
    },
    {
      tag: "cat mom gift",
      badgeType: "safe",
      statusEn: "Commercial Search Term (Safe)",
      statusAr: "عبارة تسويقية عامة (آمنة)",
      explanationEn: "Extremely popular e-commerce search tag targeting cat owners. Highly safe.",
      explanationAr: "عبارة بحث شائعة للغاية تستهدف هدايا مالكي ومحبي القطط. آمنة تماماً وخالية من القيود."
    },
    {
      tag: "funny foodie sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "ملصق لعشاق الطعام (آمن)",
      explanationEn: "Product descriptor for funny gourmet or fast food stickers. Safe.",
      explanationAr: "وصف منتج مباشر لملصقات كوميدية تركز على الوجبات السريعة والطعام ولذته. آمن تماماً."
    },
    {
      tag: "cozy pajamas vibe",
      badgeType: "safe",
      statusEn: "Style Label (Safe)",
      statusAr: "أجواء دافئة (آمنة)",
      explanationEn: "Descriptive visual lifestyle theme. Free of intellectual property blockages.",
      explanationAr: "سمة وصفية تعبر عن الراحة وملابس النوم الدافئة في الشتاء. خالية من أي عوائق."
    },
    {
      tag: "meow pizza",
      badgeType: "safe",
      statusEn: "Cute Wordplay (Safe)",
      statusAr: "تلاعب لفظي مضحك (آمن)",
      explanationEn: "Cute feline wordplay mapping eating sounds with kitty sounds. Zero risk.",
      explanationAr: "تلاعب لفظي لطيف يدمج مواء القطط مع البيتزا اللذيذة. صفر مخاطر قانونية."
    },
    {
      tag: "introverted lifestyle",
      badgeType: "safe",
      statusEn: "Lifestyle Term (Safe)",
      statusAr: "سمة نمط حياة (آمن)",
      explanationEn: "Refers to introversion and quiet lifestyle habits. Completely generic.",
      explanationAr: "يشير إلى الانطوائية وسمات نمط الحياة الهادئ. مصطلح وصفي عام وخالٍ من القيود."
    },
    {
      tag: "cute pizza illustration",
      badgeType: "safe",
      statusEn: "Art Descriptor (Safe)",
      statusAr: "وصف رسم بيتزا (آمن)",
      explanationEn: "Direct descriptive graphic label for cute food cartoons. Entirely safe.",
      explanationAr: "تاغ وصفي مباشر لرسوم الكرتون اللطيفة لقطع البيتزا الساخنة. آمن ومفتوح للجميع."
    },
    {
      tag: "staying home aesthetic",
      badgeType: "safe",
      statusEn: "Aesthetic Category (Safe)",
      statusAr: "جماليات البقاء بالمنزل (آمنة)",
      explanationEn: "Lifestyle movement celebrating relaxing inside. Broad and impossible to trademark.",
      explanationAr: "تصنيف جمالي يحتفي بالجلوس في المنزل والراحة. مستحيل احتكاره كعلامة فكرية."
    },
    {
      tag: "cat lover sticker",
      badgeType: "safe",
      statusEn: "Product Descriptor (Safe)",
      statusAr: "ملصق لمحبي القطط (آمن)",
      explanationEn: "Product descriptor tag for kitten stickers. Completely safe.",
      explanationAr: "وصف منتج مباشر لملصقات الفينيل المخصصة لعشاق القطط وتربيتها. آمن بنسبة 100%."
    },
    {
      tag: "no plans today",
      badgeType: "safe",
      statusEn: "Lifestyle Slogan (Safe)",
      statusAr: "شعار البقاء بالمنزل (آمن)",
      explanationEn: "Humorous lazy Sunday slogan. Non-registrable for clothing in Class 025.",
      explanationAr: "شعار كوميدي يعبر عن الاسترخاء والكسل اللطيف في العطلات. آمن وغير قابل للاحتكار."
    }
  ]
};
