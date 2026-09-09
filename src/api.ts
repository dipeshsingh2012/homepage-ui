import { HomepageContent } from './types';

const HOMEPAGE_API_URL = import.meta.env.VITE_HOMEPAGE_API_URL || 'http://localhost:8002/api/v1/homepage';

export async function fetchHomepageData(): Promise<HomepageContent> {
  try {
    const res = await fetch(HOMEPAGE_API_URL);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Could not reach homepage-service, using fallback Contentful data');
  }

  return {
    hero: {
      headline: 'Kitchen Appliances That Guaranteed Fit Your Counter',
      subheadline:
        "Never return an appliance because it's 2 cm too tall for your cabinets. Snap a photo, check fitment, and buy with confidence.",
      ctaText: 'Explore Space-Verified Appliances',
      ctaLink: '#/collection',
      backgroundImage:
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=80',
      spatialHook: {
        enabled: true,
        title: 'Shop By Your Counter Clearance',
        description: 'Have 45cm standard cabinets? We automatically filter for machines with ventilation clearance.',
        defaultClearanceCm: 48.0,
      },
    },
    featuredCategories: [
      {
        id: 'cat_espresso',
        title: 'Espresso Machines',
        slug: 'espresso_machine',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
        description: 'Compact to prosumer espresso setups with bean hopper clearance checks.',
      },
      {
        id: 'cat_blenders',
        title: 'High-Performance Blenders',
        slug: 'blender',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80',
        description: 'Check container height against low hanging upper kitchen cabinets.',
      },
      {
        id: 'cat_mixers',
        title: 'Stand Mixers',
        slug: 'stand_mixer',
        image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=600&auto=format&fit=crop&q=80',
        description: 'Requires tilt-head vertical operating clearance before buying.',
      },
      {
        id: 'cat_airfryers',
        title: 'Air Fryers & Ovens',
        slug: 'air_fryer',
        image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
        description: 'Requires safe rear & overhead heat ventilation clearance.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Snap a Kitchen Photo',
        description: 'Use your phone camera to take a photo showing your countertop and hanging cabinets.',
      },
      {
        step: 2,
        title: 'Spatial AI Measures Clearance',
        description: 'Computer vision calculates the exact vertical clearance and usable surface drop zone.',
      },
      {
        step: 3,
        title: 'Zero-Doubt Shopping',
        description: 'Browse only the appliances guaranteed to fit under your cabinets with proper ventilation.',
      },
    ],
    curatedProductIds: ['prod_breville_barista_touch', 'prod_delonghi_dedica'],
  };
}

