"use client";

import {
  Carousel,
  CardCarousel,
  FullWidthHeroCarousel,
  ProductCarousel,
  TestimonialCarousel,
  LogoCarousel,
  ContentCarousel,
  Section,
  Card,
} from "@/app/components/ui";

const cardItems = [
  <Card key="1">
    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Blog post 1</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Short excerpt for the first card.
    </p>
  </Card>,
  <Card key="2">
    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Feature A</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Highlight feature with a brief description.
    </p>
  </Card>,
  <Card key="3">
    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Blog post 3</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Another card for the carousel.
    </p>
  </Card>,
  <Card key="4">
    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Feature B</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Multiple items per view with scroll snap.
    </p>
  </Card>,
  <Card key="5">
    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Feature C</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Fifth card for scroll snap.
    </p>
  </Card>,
];

const heroSlides = [
  {
    background: (
      <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-700" />
    ),
    title: "Landing page hero",
    subtitle: "Campaign message with a clear call to action below.",
    cta: { label: "Get started" },
  },
  {
    background: (
      <div className="w-full h-full bg-gradient-to-r from-rose-500 to-pink-600" />
    ),
    title: "Campaign banner",
    subtitle: "Second slide for marketing spotlight.",
    cta: { label: "Learn more" },
  },
];

const productItems = [
  {
    image: (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 text-sm">
        Product 1
      </div>
    ),
    title: "Featured product one",
    price: "$24.99",
    compareAtPrice: "$29.99",
    rating: 4.5,
    reviewCount: 12,
    onAddToCart: () => {},
    onQuickView: () => {},
    badge: <span className="rounded bg-red-500 px-2 py-0.5 text-xs text-white">Sale</span>,
  },
  {
    image: (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 text-sm">
        Product 2
      </div>
    ),
    title: "Best seller item",
    price: "$19.99",
    rating: 4.8,
    reviewCount: 28,
    onAddToCart: () => {},
    onQuickView: () => {},
  },
  {
    image: (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 text-sm">
        Product 3
      </div>
    ),
    title: "Related product",
    price: "$34.00",
    rating: 4.2,
    reviewCount: 7,
    onAddToCart: () => {},
  },
  {
    image: (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 text-sm">
        Product 4
      </div>
    ),
    title: "Another product",
    price: "$44.99",
    onAddToCart: () => {},
  },
  {
    image: (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 text-sm">
        Product 4
      </div>
    ),
    title: "Another product",
    price: "$44.99",
    onAddToCart: () => {},
  },
];

const testimonialSlides = [
  {
    quote:
      "This product exceeded our expectations. The team delivered on time and the quality is outstanding.",
    name: "Jane Doe",
    role: "CTO, Acme Inc.",
    initials: "JD",
  },
  {
    quote:
      "We use this every day. Simple, fast, and reliable. Highly recommend for anyone in the industry.",
    name: "Alex Smith",
    role: "Product Lead",
    initials: "AS",
  },
  {
    quote:
      "Best decision we made this quarter. ROI was visible within the first month.",
    name: "Sam Wilson",
    role: "Case study partner",
    initials: "SW",
  },
];

const logoItems = [
  <div key="1" className="text-lg font-bold text-gray-400">ACME</div>,
  <div key="2" className="text-lg font-bold text-gray-400">BRAND</div>,
  <div key="3" className="text-lg font-bold text-gray-400">CORP</div>,
  <div key="4" className="text-lg font-bold text-gray-400">TRUST</div>,
  <div key="5" className="text-lg font-bold text-gray-400">PARTNER</div>,
];

const contentSlides = [
  {
    title: "Step 1: Setup",
    media: (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 text-sm">
        Image / media
      </div>
    ),
    content:
      "Install the package and configure your environment. Follow the quick start guide in the docs.",
  },
  {
    title: "Step 2: Customize",
    media: (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 text-sm">
        Tutorial media
      </div>
    ),
    content:
      "Adjust themes and components to match your brand. Use the design tokens provided.",
  },
  {
    title: "Step 3: Deploy",
    content:
      "Deploy to your preferred platform. No extra config needed for Vercel or Netlify.",
  },
];

export function CarouselSection() {
  return (
    <Section
      title="Carousel"
      description="Image, card, hero, product, testimonial, logo, and content carousels."
      block
    >
      <div className="space-y-12 min-w-0 w-full">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Base Carousel
          </h3>
          <div className="w-full min-w-0 max-w-md">
            <Carousel
              children={[
                <p key="1" className="text-sm text-gray-600 dark:text-gray-400">
                  Slide 1 content
                </p>,
                <p key="2" className="text-sm text-gray-600 dark:text-gray-400">
                  Slide 2 content
                </p>,
                <p key="3" className="text-sm text-gray-600 dark:text-gray-400">
                  Slide 3 content
                </p>,
              ]}
              autoPlay
              autoPlayIntervalMs={4000}
            />
          </div>
        </div>

        {/* 2. Card Carousel */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            2. Card Carousel — Product lists, blog posts, feature highlights
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Multiple items per view, scroll snap, navigation arrows.
          </p>
          <div className="max-w-3xl">
            <CardCarousel itemsPerView={3}>{cardItems}</CardCarousel>
          </div>
        </div>

        {/* 3. Full-Width Hero Carousel */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            3. Full-Width Hero Carousel — Landing hero, campaign banners
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Background image/video, CTA button, overlay text.
          </p>
          <div className="w-full max-w-4xl">
            <FullWidthHeroCarousel slides={heroSlides} autoPlay />
          </div>
        </div>

        {/* 4. Product Carousel */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            4. Product Carousel — Featured products, related items, best sellers
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Price + rating, Add to cart, Quick view.
          </p>
          <div className="max-w-4xl">
            <ProductCarousel items={productItems} itemsPerView={4} />
          </div>
        </div>

        {/* 5. Testimonial Carousel */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            5. Testimonial Carousel — Customer reviews, case studies
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Avatar, quote text, name & role.
          </p>
          <div className="max-w-xl">
            <TestimonialCarousel slides={testimonialSlides} autoPlay />
          </div>
        </div>

        {/* 6. Logo / Brand Carousel */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            6. Logo / Brand Carousel — “Trusted by” section
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Continuous auto scroll, minimal controls.
          </p>
          <div className="max-w-3xl border border-gray-200 dark:border-gray-600 rounded-[10px] p-4">
            <LogoCarousel speed={30}>{logoItems}</LogoCarousel>
          </div>
        </div>

        {/* 7. Content Carousel */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            7. Content Carousel — Tutorials, feature walkthrough
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Text + image, progress indicator.
          </p>
          <div className="max-w-2xl">
            <ContentCarousel slides={contentSlides} />
          </div>
        </div>
      </div>
    </Section>
  );
}
