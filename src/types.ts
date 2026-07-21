export interface SeoKeywordItem {
  keyword: string;
  score: number;
  reason: string;
  reasonArabic: string;
}

export interface SeoKeywords {
  core: SeoKeywordItem[];
  buyerIntent: SeoKeywordItem[];
  style: SeoKeywordItem[];
  related: SeoKeywordItem[];
  longTail: SeoKeywordItem[];
}

export interface TrendIdea {
  id: number;
  title: string;
  titleArabic: string;
  niche: string;
  nicheArabic: string;
  concept: string;
  conceptArabic: string;
  tags: string[];
  seoKeywords?: SeoKeywords;
  suggestedProducts: string[];
  suggestedProductsArabic: string[];
  competition: string;
  whyTrending: string;
  whyTrendingArabic: string;
  // New fields for US market, Trademark and Redbubble Listing Optimization
  cleanListingTitle: string;
  cleanListingTitleArabic: string;
  description: string;
  descriptionArabic: string;
  trademarkStatus: "Safe to Upload" | "Needs Attention" | "Trademark Warning";
  trademarkDetails: string;
  trademarkDetailsArabic: string;
  aiImagePrompt?: string;
  aiImagePromptArabic?: string;
  category?: string;

  // Title Optimization Engine (Title A, Title B, Title C)
  titleA?: string;
  titleAArabic?: string;
  titleAScore?: number;
  titleAExplanation?: string;
  titleAExplanationArabic?: string;

  titleB?: string;
  titleBArabic?: string;
  titleBScore?: number;
  titleBExplanation?: string;
  titleBExplanationArabic?: string;

  titleC?: string;
  titleCArabic?: string;
  titleCScore?: number;
  titleCExplanation?: string;
  titleCExplanationArabic?: string;

  titleD?: string;
  titleDArabic?: string;
  titleDScore?: number;
  titleDExplanation?: string;
  titleDExplanationArabic?: string;

  titleE?: string;
  titleEArabic?: string;
  titleEScore?: number;
  titleEExplanation?: string;
  titleEExplanationArabic?: string;

  // Search details and sources
  sources?: GroundingSource[];
  searchVolume?: string;
  searchStrength?: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface TrademarkCheckResult {
  overallStatus: "Safe to Upload" | "Needs Attention" | "Trademark Warning";
  score: number;
  findings: Array<{
    term: string;
    risk: "Low" | "Medium" | "High";
    category: string;
    explanation: string;
    explanationArabic: string;
  }>;
  generalAdvice: string;
  generalAdviceArabic: string;
  usptoSearchTerms: string[];
}
