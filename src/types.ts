export interface HomepageHero {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  spatialHook: {
    enabled: boolean;
    title: string;
    description: string;
    defaultClearanceCm: number;
  };
}

export interface FeaturedCategory {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface HomepageContent {
  hero: HomepageHero;
  featuredCategories: FeaturedCategory[];
  howItWorks: HowItWorksStep[];
  curatedProductIds: string[];
}

