import React, { useEffect, useState } from 'react';
import { ArrowRight, Ruler } from 'lucide-react';
import {
  ProtonThemeProvider,
  ProtonButton,
  ProtonCard,
  ProtonStatusBadge,
} from '@dipesh.singh/proton/react';
import {
  HeroBanner,
  CategoryLane,
  ProductSlider,
  TestimonialsSection,
  CategoryTileItem,
  SliderProduct,
  TestimonialItem,
} from '@dipesh.singh/commerce-ui';
import { fetchHomepageData } from '../api';
import { HomepageContent } from '../types';

interface HomepageFragmentProps {
  onCategorySelect?: (categorySlug: string) => void;
  onClearanceSelect?: (clearanceCm: number) => void;
  onProductSelect?: (productId: string) => void;
  onAddToCart?: (product: any) => void;
}

const CATEGORY_TILES: CategoryTileItem[] = [
  {
    id: 'roasted-coffee',
    title: 'Roasted & Ground Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop&q=80',
    href: '#/coffees',
  },
  {
    id: 'espresso-machines',
    title: 'Espresso Machines',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop&q=80',
    href: '#/equipment',
    badge: 'Popular',
  },
  {
    id: 'brewing-gear',
    title: 'Brewing Equipment',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop&q=80',
    href: '#/equipment',
  },
  {
    id: 'grinders',
    title: 'Burr Grinders',
    imageUrl: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=300&h=300&fit=crop&q=80',
    href: '#/equipment',
  },
  {
    id: 'drinkware',
    title: 'Barista Drinkware',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop&q=80',
    href: '#/equipment',
  },
  {
    id: 'roast-subscriptions',
    title: 'Roast Subscriptions',
    imageUrl: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=300&h=300&fit=crop&q=80',
    href: '#/subscriptions',
    badge: 'Save 15%',
  },
];

const BESTSELLER_PRODUCTS: SliderProduct[] = [
  {
    id: 'baarbara-whiskey',
    title: 'BAARBARA ESTATE - WHISKEY BARREL AGED',
    subtitle: 'Ripe banana, Red Plum, Whiskey Oak, Brown Sugar',
    price: '₹ 1,250',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=600&fit=crop&q=80',
    productUrl: '#/product/prod_breville_barista_touch',
  },
  {
    id: 'elkhill-estates',
    title: 'ELKHILL ESTATES',
    subtitle: 'Orange, Brown Spice, Roasted Hazelnut, Milk Chocolate',
    price: '₹ 800',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop&q=80',
    productUrl: '#/product/prod_fellow_ode_gen2',
  },
  {
    id: 'sea-salt-mocha',
    title: 'SEA SALT MOCHA DROP | CONCENTRATE',
    subtitle: 'Specialty Coffee Concentrate ready to stir & sip',
    price: '₹ 250',
    badge: 'NEW',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&h=600&fit=crop&q=80',
    productUrl: '#/product/prod_breville_barista_touch',
  },
  {
    id: 'vienna-dark-roast',
    title: 'VIENNA | DARK ROAST - EASY POUR',
    subtitle: 'Blue Tokai Coffee Easy Pour Box • 5 Single Sachets',
    price: '₹ 300',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop&q=80',
    productUrl: '#/product/prod_acaia_lunar',
  },
  {
    id: 'attikan-estate',
    title: 'ATTIKAN ESTATE - ESPRESSO ROAST',
    subtitle: 'Dark Chocolate, Figs, Roasted Almonds',
    price: '₹ 550',
    imageUrl: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=600&h=600&fit=crop&q=80',
    productUrl: '#/product/prod_fellow_ode_gen2',
  },
];

const CUSTOMER_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'review-1',
    quote:
      "I've been drinking coffee for a year now but never tried Blue Tokai. I heard about Attikan a lot and it was worth the hype! I am not a fan of darker roasts but it was one of the smoothest coffees I've tried till now. I'm definitely ordering again.",
    rating: 5,
    author: 'KEERTHI HARDASANI',
  },
  {
    id: 'review-2',
    quote:
      'Love the packaging, the coffee selection, the community events you do. The general love for coffee you want to share with the world is amazing to see. Keep shining! :)',
    rating: 5,
    author: 'SAHIL MADAN',
  },
  {
    id: 'review-3',
    quote:
      'Blue Tokai is hands down the best coffee brand out there! I’ve enjoyed each cup at their cafes and whenever I brew at home. I can’t get enough of their coffee and I recommend it to everyone!',
    rating: 5,
    author: 'KRISHNA SARBADHIKARY',
  },
];

export const HomepageFragment: React.FC<HomepageFragmentProps> = ({
  onCategorySelect,
  onClearanceSelect,
  onProductSelect,
  onAddToCart,
}) => {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [clearanceInput, setClearanceInput] = useState<string>('45');

  useEffect(() => {
    async function load() {
      const data = await fetchHomepageData();
      setContent(data);
    }
    load();
  }, []);

  if (!content) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ProtonThemeProvider>
      <div className="space-y-16 py-6">
        {/* Hero Section using @dipesh.singh/commerce-ui */}
        <HeroBanner
          layout="single"
          eyebrow="Hiljhil Cafe & Specialty Roasters • hiljhil.cafe"
          headline={content.hero.headline}
          description={content.hero.subheadline}
          backgroundImage={content.hero.backgroundImage}
          ctas={[
            {
              label: content.hero.ctaText || 'Explore Roastery & Coffee Bar',
              url: content.hero.ctaLink || '#/collection',
              variant: 'primary',
            },
          ]}
        >
          {/* Spatial Qualifier Bar */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-lg space-y-3">
            <div className="flex items-center justify-between text-xs font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-amber-400" />
                {content.hero.spatialHook.title}
              </span>
              <span className="text-[11px] text-amber-300 font-semibold">Home Barista Filter</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-2 rounded-xl border border-white/10 text-white text-xs">
                <span>Height:</span>
                <input
                  type="number"
                  value={clearanceInput}
                  onChange={(e) => setClearanceInput(e.target.value)}
                  className="w-12 bg-transparent text-amber-400 font-bold focus:outline-none text-right"
                  min="30"
                  max="70"
                />
                <span className="text-slate-400">cm</span>
              </div>

              <div className="flex-1">
                <ProtonButton
                  fullWidth
                  size="sm"
                  endIcon={<ArrowRight style={{ width: 14, height: 14 }} />}
                  onClick={() => onClearanceSelect?.(parseFloat(clearanceInput) || 45)}
                >
                  Filter Matching Gear
                </ProtonButton>
              </div>
            </div>
          </div>
        </HeroBanner>

        {/* Circular Category Lane Navigation */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <CategoryLane
            title="Explore by Category"
            subtitle="Single origin estate roasts, espresso machines, and precision barista gear"
            categories={CATEGORY_TILES}
            onSelectCategory={(cat) => {
              onCategorySelect?.(String(cat.id));
            }}
          />
        </section>

        {/* Bestseller Coffees Product Slider Carousel */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <ProductSlider
            title="Bestseller Coffees"
            subtitle="Freshly roasted specialty coffee beans and cold brew drops from India's premier estates"
            products={BESTSELLER_PRODUCTS}
            onBuyNow={(prod) => {
              onAddToCart?.({ id: prod.id, name: prod.title, price: prod.price });
              window.location.hash = '#/checkout';
            }}
            onQuickAdd={(prod) => {
              onAddToCart?.({ id: prod.id, name: prod.title, price: prod.price });
            }}
            onProductClick={(prod) => {
              onProductSelect?.(String(prod.id));
            }}
          />
        </section>

        {/* Digital Real Estate: Visit Hiljhil Cafe Flagship */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                The Physical Experience • Digital Flagship
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Visit Hiljhil Cafe & Espresso Bar
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                104 Roasters Lane, Highland District • Open Daily 7:00 AM – 9:00 PM
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ProtonStatusBadge status="success" pulse label="Cafe Open Now" />
              <ProtonButton
                variant="secondary"
                size="sm"
                onClick={() => onCategorySelect?.('cafe_menu')}
              >
                Order Ahead for Bar Pickup
              </ProtonButton>
            </div>
          </div>

        {/* Cafe Bar Featured Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProtonCard variant="flat" padding="sm">
            <div className="space-y-1.5">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-slate-900">Single-Origin Pour-Over</h4>
                <span className="text-xs font-black text-amber-800">$5.50</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Ethiopian Guji, natural process. Notes of jasmine, peach & wild honey.
              </p>
            </div>
          </ProtonCard>
          <ProtonCard variant="flat" padding="sm">
            <div className="space-y-1.5">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-slate-900">Hiljhil Velvet Flat White</h4>
                <span className="text-xs font-black text-amber-800">$4.75</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Double ristretto pulled over silky oat or whole milk with latte art.
              </p>
            </div>
          </ProtonCard>
          <ProtonCard variant="flat" padding="sm">
            <div className="space-y-1.5">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-slate-900">Cold Brew Reserve</h4>
                <span className="text-xs font-black text-amber-800">$5.25</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                16-hour slow steep over chilled filtered water. Smooth dark cacao notes.
              </p>
            </div>
          </ProtonCard>
          <ProtonCard variant="flat" padding="sm">
            <div className="space-y-1.5">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-slate-900">Cardamom Pistachio Cruffin</h4>
                <span className="text-xs font-black text-amber-800">$4.50</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Flaky croissant muffin baked fresh at 6 AM, dusted in organic cardamom.
              </p>
            </div>
          </ProtonCard>
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Curated Roastery & Hardware
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Shop Beans, Machines & Cafe Goods
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {content.featuredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onCategorySelect?.(cat.slug)}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="h-44 overflow-hidden bg-slate-100 relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-3 text-xs font-semibold text-amber-700 flex items-center gap-1">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof & Customer Reviews */}
      <section className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <TestimonialsSection
          title="Happy Customers"
          testimonials={CUSTOMER_TESTIMONIALS}
          showBotanicalAccents={true}
          showBrandIcon={true}
        />
      </section>

      {/* How It Works */}
      <section className="bg-slate-950 text-white rounded-3xl py-12 px-6 sm:px-12">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Powered by CounterCheck Spatial AI
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold">How Space Fitment Works</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Verify bean hopper access and overhead kitchen cabinet clearance before you buy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.howItWorks.map((step) => (
            <div
              key={step.step}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 relative"
            >
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                {step.step}
              </div>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </ProtonThemeProvider>
);
};

export default HomepageFragment;
