import { HomepageContent } from './types';

const HOMEPAGE_API_URL =
  (typeof process !== 'undefined' && process.env && (process.env.HOMEPAGE_API_URL || process.env.VITE_HOMEPAGE_API_URL)) ||
  (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_HOMEPAGE_API_URL) ||
  'http://localhost:8002/api/v1/homepage';

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
      headline: 'Hiljhil Cafe & Specialty Roastery',
      subheadline:
        'Artisanal batch-roasted coffees, handcrafted pastries, and space-verified home espresso bars. Visit our cafe bar or shop whole beans & gear online.',
      ctaText: 'Explore Roastery & Coffee Bar',
      ctaLink: '#/collection',
      backgroundImage:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop&q=80',
      spatialHook: {
        enabled: true,
        title: 'Home Coffee Bar Clearance Filter',
        description: 'Standard 45cm kitchen cabinets? Automatically filter espresso machines and grinders with bean-hopper clearance.',
        defaultClearanceCm: 45.0,
      },
    },
    featuredCategories: [
      {
        id: 'cat_beans',
        title: 'Freshly Roasted Beans',
        slug: 'coffee_beans',
        image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&auto=format&fit=crop&q=80',
        description: 'Direct-trade single origins, light floral roasts, and rich chocolatey espresso blends.',
      },
      {
        id: 'cat_espresso',
        title: 'Home Espresso Machines',
        slug: 'espresso_machine',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
        description: 'Compact manual to prosumer dual-boiler machines with CounterCheck fitment verification.',
      },
      {
        id: 'cat_grinders',
        title: 'Precision Coffee Grinders',
        slug: 'grinder',
        image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=600&auto=format&fit=crop&q=80',
        description: 'Single-dose flat burr and conical grinders engineered for low retention and cabinet clearance.',
      },
      {
        id: 'cat_cafe_menu',
        title: 'In-Cafe Menu & Bakery',
        slug: 'cafe_menu',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
        description: 'Order ahead for pickup: Pour-overs, signature cold brews, matcha lattes, and artisan pastries.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Snap Your Coffee Bar Counter',
        description: 'Take a quick photo showing your countertop and upper kitchen cabinets.',
      },
      {
        step: 2,
        title: 'CounterCheck Measures Clearance',
        description: 'Computer vision validates vertical cabinet clearance, bean hopper access, and steam wand space.',
      },
      {
        step: 3,
        title: 'Zero-Doubt Home Barista Setup',
        description: 'Order with certainty or pick up directly at Hiljhil Cafe with complimentary fresh beans.',
      },
    ],
    curatedProductIds: ['prod_breville_barista_touch', 'prod_delonghi_dedica', 'prod_hiljhil_guji', 'prod_hiljhil_espresso_blend'],
  };
}

