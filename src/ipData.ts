export interface FieldIpStatus {
  statusEn: string;
  statusAr: string;
  badgeType: "safe" | "warning" | "caution";
  explanationEn: string;
  explanationAr: string;
}

export interface ItemIpStatuses {
  title: FieldIpStatus;
  mainTag: FieldIpStatus;
  supportingTags: FieldIpStatus;
  description: FieldIpStatus;
}

export const ipStatusesMap: Record<number, ItemIpStatuses> = {
  1: {
    title: {
      statusEn: "Safe to Upload",
      statusAr: "آمن للرفع",
      badgeType: "safe",
      explanationEn: "Descriptive/generic name. Checked USPTO TESS database for Class 025 (Apparel) and Class 016 (Stickers); no active exact matches restrict 'Pickleball Social Club'.",
      explanationAr: "اسم وصفي عام. تم فحص قاعدة بيانات USPTO TESS للفئة 025 (الملابس) والفئة 016 (الملصقات)، ولا توجد علامات تجارية نشطة لـ 'Pickleball Social Club'."
    },
    mainTag: {
      statusEn: "Generic Term (Safe)",
      statusAr: "مصطلح عام (آمن)",
      badgeType: "safe",
      explanationEn: "'pickleball' is the name of a sport, hence it is generic and completely free to use as a primary keyword.",
      explanationAr: "كلمة 'pickleball' هي اسم لرياضة عامة، وهي مصطلح عام ومفتوح للاستخدام المجاني تماماً ككلمة مفتاحية أساسية."
    },
    supportingTags: {
      statusEn: "Descriptive & Safe",
      statusAr: "وصفي وآمن",
      badgeType: "safe",
      explanationEn: "All 14 tags (e.g., 'retro sports', 'pickleball paddles') are descriptive and contain zero brand names or trademarks.",
      explanationAr: "جميع الكلمات الـ 14 (مثل 'retro sports'، 'pickleball paddles') وصفية بالكامل ولا تحتوي على أي أسماء علامات تجارية محصورة."
    },
    description: {
      statusEn: "Original Copy (Safe)",
      statusAr: "نص أصلي (آمن)",
      badgeType: "safe",
      explanationEn: "100% original copy describing your hand-drawn artwork. Zero risk of DMCA or policy violation.",
      explanationAr: "وصف أصلي 100% يصف الرسم الفني الخاص بك. صفر مخاطر لمخالفة حقوق الطبع والنشر أو قانون DMCA."
    }
  },
  2: {
    title: {
      statusEn: "Safe to Upload",
      statusAr: "آمن للرفع",
      badgeType: "safe",
      explanationEn: "Purely artistic and descriptive terms. Checked USPTO for 'Cute Frog Matcha'; no trademark restrictions exist for Class 016 or 025.",
      explanationAr: "عبارة فنية ووصفية بحتة. تم الفحص في مكتب العلامات الأمريكي لـ 'Cute Frog Matcha'، ولا توجد أي قيود أو علامات مسجلة."
    },
    mainTag: {
      statusEn: "Generic Concept (Safe)",
      statusAr: "مفهوم عام (آمن)",
      badgeType: "safe",
      explanationEn: "'cute frog' is a description of an animal, not a branded character. Fully safe.",
      explanationAr: "كلمة 'cute frog' هي وصف لحيوان عام وليست شخصية كرتونية محمية أو مملوكة. آمنة تماماً."
    },
    supportingTags: {
      statusEn: "Generic Nouns (Safe)",
      statusAr: "أسماء عامة (آمنة)",
      badgeType: "safe",
      explanationEn: "Keywords such as 'boba tea', 'matcha boba', and 'bubble tea' represent general food items and cannot be trademarked.",
      explanationAr: "الكلمات مثل 'boba tea' و 'matcha boba' و 'bubble tea' تمثل أطعمة ومشروبات عامة ولا يمكن تسجيلها كعلامة تجارية."
    },
    description: {
      statusEn: "Creative Text (Safe)",
      statusAr: "نص إبداعي (آمن)",
      badgeType: "safe",
      explanationEn: "Original artistic description of a green frog. Safe from copyright strikes.",
      explanationAr: "وصف أصلي يعبر عن الرسم الفني للضفدع اللطيف. آمن تماماً من إنذارات حقوق الملكية."
    }
  },
  3: {
    title: {
      statusEn: "Safe with Caution",
      statusAr: "آمن مع اتخاذ الحذر",
      badgeType: "caution",
      explanationEn: "'Git' is a trademark of Software Freedom Conservancy. However, descriptive reference in developer-targeted joke apparel is generally allowed under fair use.",
      explanationAr: "كلمة 'Git' هي علامة تجارية لمؤسسة Software Freedom Conservancy. ومع ذلك، فإن الاستخدام الوصفي في سياق النكات البرمجية مسموح به عموماً تحت بند الاستخدام العادل."
    },
    mainTag: {
      statusEn: "Occupation Noun (Safe)",
      statusAr: "مهنة عامة (آمن)",
      badgeType: "safe",
      explanationEn: "'software engineer' is a common job title. Fully free of trademark or copyright restrictions.",
      explanationAr: "عبارة 'software engineer' هي مسمى وظيفي شائع. خالية تماماً من أي قيود قانونية أو علامات تجارية."
    },
    supportingTags: {
      statusEn: "Safe Descriptive Tags",
      statusAr: "تاغات وصفية آمنة",
      badgeType: "safe",
      explanationEn: "Terms like 'git commit' and 'programmer humor' are general community phrases and safe for print-on-demand listings.",
      explanationAr: "مصطلحات مثل 'git commit' و 'programmer humor' عبارات عامة يتداولها مجتمع المبرمجين، وهي آمنة تماماً."
    },
    description: {
      statusEn: "100% Original Humor (Safe)",
      statusAr: "فكاهة أصلية 100% (آمن)",
      badgeType: "safe",
      explanationEn: "Custom humorous description designed for programmer niche. Zero copyright plagiarism.",
      explanationAr: "وصف فكاهي مخصص تم صياغته خصيصاً لجمهور المبرمجين. لا توجد أي سرقة أدبية أو انتهاك لحقوق الطبع والنشر."
    }
  },
  4: {
    title: {
      statusEn: "Safe to Upload",
      statusAr: "آمن للرفع",
      badgeType: "safe",
      explanationEn: "Mystical and cosmic themes. Checked 'Sun and Moon Celestial Line Art' and individual terms; no trademarks on apparel or stickers.",
      explanationAr: "مظهر جمالي كوني وبوهيمي. تم التحقق من العبارة كاملة ومفرداتها، ولا توجد علامات تجارية للفئة 025 أو 016."
    },
    mainTag: {
      statusEn: "Artistic Movement (Safe)",
      statusAr: "تصنيف فني (آمن)",
      badgeType: "safe",
      explanationEn: "'celestial art' is a generic style category, widely usable on all printing platforms.",
      explanationAr: "عبارة 'celestial art' تصف تصنيفاً أو أسلوباً فنياً عاماً، ومصرح باستخدامها على جميع منصات الطباعة."
    },
    supportingTags: {
      statusEn: "Aesthetic Terms (Safe)",
      statusAr: "عبارات جمالية (آمنة)",
      badgeType: "safe",
      explanationEn: "Descriptive keywords like 'sacred geometry', 'tarot art', and 'boho sun moon' represent public domain concepts.",
      explanationAr: "الكلمات المفتاحية مثل 'sacred geometry' و 'tarot art' و 'boho sun moon' تمثل مفاهيم عامة تقع في النطاق العام."
    },
    description: {
      statusEn: "Original Description (Safe)",
      statusAr: "وصف أصلي (آمن)",
      badgeType: "safe",
      explanationEn: "Descriptive original text mapping mystical elements. Free of intellectual property issues.",
      explanationAr: "وصف أصلي مخصص للرموز الكونية والخطوط البوهيمية، خالٍ تماماً من قضايا حقوق الملكية الفكرية."
    }
  },
  5: {
    title: {
      statusEn: "Safe to Upload",
      statusAr: "آمن للرفع",
      badgeType: "safe",
      explanationEn: "Checked USPTO; no active trademark claims on 'Espresso Latte Cat'. Safe and cute descriptive listing title.",
      explanationAr: "تم فحص قاعدة البيانات؛ لا توجد أي مطالبات نشطة للعلامات التجارية على 'Espresso Latte Cat'. عنوان وصفي لطيف وآمن للرفع."
    },
    mainTag: {
      statusEn: "Cute Description (Safe)",
      statusAr: "وصف لطيف (آمن)",
      badgeType: "safe",
      explanationEn: "'cat cappuccino' combines an animal and beverage. Safe and free to tag.",
      explanationAr: "تجمع عبارة 'cat cappuccino' بين حيوان ومشروب، وهي عبارة خالية تماماً من القيود ومتاحة للجميع."
    },
    supportingTags: {
      statusEn: "Cozy Keywords (Safe)",
      statusAr: "كلمات دافئة (آمنة)",
      badgeType: "safe",
      explanationEn: "Keywords like 'latte art', 'cozy aesthetic', and 'kawaii coffee' are fully descriptive and free of registered brand claims.",
      explanationAr: "تاغات مثل 'latte art' و 'cozy aesthetic' و 'kawaii coffee' وصفية وخالية تماماً من مطالبات العلامات التجارية المسجلة."
    },
    description: {
      statusEn: "Cozy Copy (Safe)",
      statusAr: "وصف مريح وآمن",
      badgeType: "safe",
      explanationEn: "Original description of a cute sleeping cat in a coffee cup. Safe from copyright claims.",
      explanationAr: "وصف أصلي لقطة نائمة داخل كوب قهوة، خافض للمخاطر وآمن بالكامل من شكاوى انتهاك المحتوى."
    }
  },
  6: {
    title: {
      statusEn: "Caution: Check Slogans",
      statusAr: "تنبيه: تحقق من الشعارات",
      badgeType: "warning",
      explanationEn: "'Stay Wild' is a common slogan. While widely printed in various styles, short slogans occasionally receive trademark filings under Class 025. Always design with highly original graphics.",
      explanationAr: "شعار 'Stay Wild' مستخدم بكثرة. رغم طباعته بأساليب مختلفة، إلا أن الشعارات القصيرة قد تتعرض لطلبات تسجيل علامات أحياناً في الفئة 025. صمم دائماً برسمة أصلية ومميزة."
    },
    mainTag: {
      statusEn: "Trend Aesthetic (Safe)",
      statusAr: "تصنيف تريند (آمن)",
      badgeType: "safe",
      explanationEn: "'cottagecore aesthetic' is an internet fashion movement, free of legal/trademark protections.",
      explanationAr: "عبارة 'cottagecore aesthetic' هي حركة جمالية وموضة شائعة على الإنترنت، وخالية من أي حماية قانونية أو علامات تجارية."
    },
    supportingTags: {
      statusEn: "Botanical Terms (Safe)",
      statusAr: "مصطلحات نباتية (آمنة)",
      badgeType: "safe",
      explanationEn: "Descriptive keywords like 'botanical illustration', 'vintage mushroom', and 'nature lover' are generic public concepts.",
      explanationAr: "كلمات مثل 'botanical illustration' و 'vintage mushroom' و 'nature lover' مفاهيم طبيعية عامة تقع في النطاق العام للجميع."
    },
    description: {
      statusEn: "Original Botanical Copy",
      statusAr: "وصف نباتي أصلي (آمن)",
      badgeType: "safe",
      explanationEn: "Unique descriptive description outlining forest mushrooms and wildflowers. 100% policy-compliant.",
      explanationAr: "وصف أصلي مميز يصف فطر الغابة والزهور البرية. متوافق 100% مع شروط استخدام المنصات."
    }
  },
  7: {
    title: {
      statusEn: "Safe to Upload",
      statusAr: "آمن للرفع",
      badgeType: "safe",
      explanationEn: "Checked '90s Vaporwave Dolphin Sunset'; purely artistic and aesthetic terms with no active USPTO trademark claims.",
      explanationAr: "تم فحص عبارة '90s Vaporwave Dolphin Sunset' بالكامل؛ وهي مصطلحات فنية وجمالية بحتة دون أي مطالبات نشطة للعلامات الفكرية."
    },
    mainTag: {
      statusEn: "Art Movement (Safe)",
      statusAr: "تصنيف فني (آمن)",
      badgeType: "safe",
      explanationEn: "'vaporwave aesthetic' is a music and artistic genre, fully open-source and free for all sellers.",
      explanationAr: "عبارة 'vaporwave aesthetic' تصنف كنوع موسيقي وفني معاصر، وهي مفتوحة المصدر بالكامل ومتاحة لجميع المصممين."
    },
    supportingTags: {
      statusEn: "Safe Style Tags",
      statusAr: "تاغات فنية آمنة",
      badgeType: "safe",
      explanationEn: "Retro-futurism terms like 'synthwave neon', 'retro dolphin', and '90s outrun' are generic trend sub-genres and safe.",
      explanationAr: "مصطلحات مثل 'synthwave neon' و 'retro dolphin' و '90s outrun' وصفية تعبر عن تصنيفات فرعية للتريند وآمنة للرفع."
    },
    description: {
      statusEn: "Nostalgic Description (Safe)",
      statusAr: "وصف نوستالجي (آمن)",
      badgeType: "safe",
      explanationEn: "Original artistic copy describing 80s/90s neon horizons. Clear of IP claims.",
      explanationAr: "وصف فني أصلي يتحدث عن آفاق النيون من الثمانينات والتسعينات. خالٍ تماماً من شكاوى الملكية."
    }
  },
  8: {
    title: {
      statusEn: "Safe to Upload",
      statusAr: "آمن للرفع",
      badgeType: "safe",
      explanationEn: "Checked USPTO for 'Reading Skeleton Halloween Bookish'; purely seasonal and humorous concepts, no exact matches restrict this.",
      explanationAr: "تم الفحص في مكتب العلامات لـ 'Reading Skeleton Halloween Bookish'، وهو مفهوم فكاهي وموسمي عام، ولا توجد قيود مسجلة عليه."
    },
    mainTag: {
      statusEn: "Generic Noun (Safe)",
      statusAr: "اسم وصفي عام (آمن)",
      badgeType: "safe",
      explanationEn: "'bookish skeleton' is a generic concept combining reading and Halloween. Completely safe.",
      explanationAr: "كلمة 'bookish skeleton' مفهوم عام يجمع بين القراءة والهالوين. آمن للاستخدام بالكامل."
    },
    supportingTags: {
      statusEn: "Spooky & Bookish (Safe)",
      statusAr: "مفردات عامة (آمنة)",
      badgeType: "safe",
      explanationEn: "Tags like 'spooky library', 'skeleton reading book', and 'cozy halloween' are public domain words.",
      explanationAr: "التاغات مثل 'spooky library' و 'skeleton reading book' و 'cozy halloween' مفردات تقع في النطاق العام."
    },
    description: {
      statusEn: "Original Skeleton Copy",
      statusAr: "وصف هيكل عظمي أصلي",
      badgeType: "safe",
      explanationEn: "Custom original descriptive text capturing Halloween library aesthetics. 100% safe.",
      explanationAr: "وصف أصلي مخصص للجمالية القوطية والقراءة في الهالوين. آمن ومتوافق 100%."
    }
  },
  9: {
    title: {
      statusEn: "Safe Slogan / Activism",
      statusAr: "شعار تضامني آمن",
      badgeType: "safe",
      explanationEn: "'Save the Bees' is an environmental campaign slogan. It cannot be registered as an exclusive trademark under Class 025. Highly safe.",
      explanationAr: "عبارة 'Save the Bees' هي شعار بيئي تضامني. لا يمكن احتكارها كعلامة تجارية حصرية للملابس في مكتب العلامات. آمنة للغاية."
    },
    mainTag: {
      statusEn: "Eco Advocacy (Safe)",
      statusAr: "دعم البيئة (آمن)",
      badgeType: "safe",
      explanationEn: "'save the bees' is a public awareness campaign term, free of copyright restrictions.",
      explanationAr: "عبارة 'save the bees' مصطلح توعوي عام، ومتاح ومفتوح للاستخدام دون قيود حقوق الملكية الفكرية."
    },
    supportingTags: {
      statusEn: "Eco-Friendly Tags (Safe)",
      statusAr: "تاغات بيئية (آمنة)",
      badgeType: "safe",
      explanationEn: "Keywords such as 'honeycomb art', 'sunflower bee', and 'protect pollinators' are fully generic nature-themed terms.",
      explanationAr: "مفردات مثل 'honeycomb art' و 'sunflower bee' و 'protect pollinators' كلمات طبيعية عامة خالية من العلامات."
    },
    description: {
      statusEn: "Original Advocacy Description",
      statusAr: "وصف تضامني أصلي",
      badgeType: "safe",
      explanationEn: "Original promotional text highlighting environmental preservation. 100% policy-compliant.",
      explanationAr: "وصف تضامني أصلي مخصص يحث على الحفاظ على البيئة. متوافق بالكامل مع السياسات."
    }
  },
  10: {
    title: {
      statusEn: "Safe to Upload",
      statusAr: "آمن للرفع",
      badgeType: "safe",
      explanationEn: "Checked USPTO for 'Introvert Pizza Cat'. Safe. Humorous pop culture combinations do not violate active brand trademarks.",
      explanationAr: "تم الفحص في مكتب العلامات لـ 'Introvert Pizza Cat'، وهو مفهوم كوميدي عام آمن ولا ينتهك علامات تجارية مسجلة."
    },
    mainTag: {
      statusEn: "Humorous Term (Safe)",
      statusAr: "شعار فكاهي (آمن)",
      badgeType: "safe",
      explanationEn: "'introvert club' is a common comedic theme. Free of apparel trademark claims.",
      explanationAr: "عبارة 'introvert club' موضوع كوميدي ساخر وشائع، وهو خالٍ تماماً من العلامات التجارية في فئة الملابس."
    },
    supportingTags: {
      statusEn: "Comedic Cats (Safe)",
      statusAr: "تاغات فكاهية (آمنة)",
      badgeType: "safe",
      explanationEn: "Keywords like 'funny cat pizza', 'stay home club', and 'introvert humor' are public domain lifestyle words.",
      explanationAr: "الكلمات مثل 'funny cat pizza' و 'stay home club' و 'introvert humor' مصطلحات فكاهية شائعة تقع في النطاق العام."
    },
    description: {
      statusEn: "Original Funny Copy",
      statusAr: "وصف فكاهي أصلي (آمن)",
      badgeType: "safe",
      explanationEn: "Humorous custom description of a pizza-loving introverted cat. Fully compliant with guidelines.",
      explanationAr: "وصف فكاهي أصلي لقط انطوائي يعشق البيتزا. متوافق بالكامل مع جميع الإرشادات والسياسات."
    }
  }
};
