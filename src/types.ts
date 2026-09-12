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

export interface DynamicLane<T = any> {
  title?: string;
  subtitle?: string;
  hasNavigationArrows?: boolean;
  items: T[];
}

export interface HomepageContent {
  hero: HomepageHero;
  featuredCategories: FeaturedCategory[];
  howItWorks: HowItWorksStep[];
  curatedProductIds: string[];
  categoryLane?: DynamicLane<any>;
  productLane?: DynamicLane<any>;
  lanes?: any[];
}

