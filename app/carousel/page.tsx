"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { CarouselSection } from "@/app/components/showcase/sections/CarouselSection";
import { Divider } from "@/app/components/ui";

const carouselCode = `<Carousel
  children={[
    <p key="1">Slide 1 content</p>,
    <p key="2">Slide 2 content</p>,
    <p key="3">Slide 3 content</p>,
  ]}
  autoPlay
  autoPlayIntervalMs={4000}
/>`;

const cardCarouselCode = `const cardItems = [
  <Card key="1"><h3>Blog post 1</h3><p className="text-sm mt-1">Excerpt.</p></Card>,
  <Card key="2"><h3>Feature A</h3><p className="text-sm mt-1">Description.</p></Card>,
];

<CardCarousel itemsPerView={3}>{cardItems}</CardCarousel>`;

const heroCarouselCode = `const heroSlides = [
  {
    background: <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-700" />,
    title: "Landing page hero",
    subtitle: "Campaign message with CTA below.",
    cta: { label: "Get started" },
  },
  {
    background: <div className="w-full h-full bg-gradient-to-r from-rose-500 to-pink-600" />,
    title: "Campaign banner",
    subtitle: "Second slide.",
    cta: { label: "Learn more" },
  },
];

<FullWidthHeroCarousel slides={heroSlides} autoPlay />`;

const productCarouselCode = `const productItems = [
  {
    image: <div className="w-full h-full bg-gray-200 flex items-center justify-center">Product 1</div>,
    title: "Featured product",
    price: "$24.99",
    compareAtPrice: "$29.99",
    rating: 4.5,
    reviewCount: 12,
    onAddToCart: () => {},
    onQuickView: () => {},
    badge: <span className="rounded bg-red-500 px-2 py-0.5 text-xs text-white">Sale</span>,
  },
];

<ProductCarousel items={productItems} itemsPerView={4} />`;

const testimonialCarouselCode = `const testimonialSlides = [
  { quote: "Exceeded our expectations.", name: "Jane Doe", role: "CTO, Acme Inc.", initials: "JD" },
  { quote: "Simple, fast, reliable.", name: "Alex Smith", role: "Product Lead", initials: "AS" },
];

<TestimonialCarousel slides={testimonialSlides} autoPlay />`;

const logoCarouselCode = `const logoItems = [
  <div key="1" className="text-lg font-bold text-gray-400">ACME</div>,
  <div key="2" className="text-lg font-bold text-gray-400">BRAND</div>,
];

<LogoCarousel speed={30}>{logoItems}</LogoCarousel>`;

const contentCarouselCode = `const contentSlides = [
  {
    title: "Step 1: Setup",
    media: <div className="w-full h-full bg-gray-200 flex items-center justify-center">Image</div>,
    content: "Install the package and configure your environment.",
  },
  {
    title: "Step 2: Deploy",
    content: "Deploy to your preferred platform.",
  },
];

<ContentCarousel slides={contentSlides} />`;

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import {
  Carousel,
  CardCarousel,
  FullWidthHeroCarousel,
  ProductCarousel,
  TestimonialCarousel,
  LogoCarousel,
  ContentCarousel,
  Card,
} from "@/app/components/ui";`,
    language: "tsx",
  },
  { label: "Carousel (base)", code: carouselCode, language: "tsx" },
  { label: "CardCarousel", code: cardCarouselCode, language: "tsx" },
  { label: "FullWidthHeroCarousel", code: heroCarouselCode, language: "tsx" },
  { label: "ProductCarousel", code: productCarouselCode, language: "tsx" },
  { label: "TestimonialCarousel", code: testimonialCarouselCode, language: "tsx" },
  { label: "LogoCarousel", code: logoCarouselCode, language: "tsx" },
  { label: "ContentCarousel", code: contentCarouselCode, language: "tsx" },
];

export default function CarouselPage() {
  return (
    <DocPageLayout>
      <CarouselSection />
      <Divider />
      <HowToUseSection
        description="Carousel, CardCarousel, FullWidthHeroCarousel, ProductCarousel, TestimonialCarousel, LogoCarousel, ContentCarousel. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
