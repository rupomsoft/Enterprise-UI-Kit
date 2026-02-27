"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { CardSection } from "@/app/components/showcase/sections/CardSection";
import { Divider } from "@/app/components/ui";

const importCode = `import {
  Card,
  StatsCard,
  InfoCard,
  ActionCard,
  ListCard,
  UserCard,
  AlertCard,
  ProgressCard,
  FeatureCard,
  ProductCard,
  Avatar,
  Button,
  IconButton,
  Badge,
} from "@/app/components/ui";
import { FileText, Plus, DollarSign, CheckCircle, Package, Percent, XCircle, AlertTriangle, Info } from "lucide-react";`;

const cardCode = `<Card className="max-w-xs">
  <p className="text-sm text-gray-700 dark:text-gray-300">Card content.</p>
</Card>`;

const statsCardCode = `<StatsCard
  title="Revenue"
  value="$24,500"
  change="+12%"
  trend="up"
  icon={<DollarSign className="w-4 h-4" />}
/>
<StatsCard
  title="Conversion Rate"
  value="3.2%"
  icon={<Percent className="w-4 h-4" />}
/>`;

const infoCardCode = `<InfoCard icon={<FileText className="w-4 h-4" />}>
  You have 12 pending invoices
</InfoCard>`;

const actionCardCode = `<ActionCard
  title="Create New Order"
  description="Start a new order from scratch"
  primaryAction={{ label: "Create order" }}
  icon={<Plus className="w-4 h-4" />}
/>`;

const listCardCode = `<ListCard
  title="Recent Orders"
  viewAll={{ href: "#" }}
  items={[
    <div key="1">Order #2841 · $45.00</div>,
    <div key="2">Order #2840 · $12.99</div>,
  ]}
/>`;

const userCardCode = `<UserCard
  avatar={<Avatar size="lg">JD</Avatar>}
  name="Jane Doe"
  roleOrEmail="jane@company.com"
  actions={<Button variant="secondary" className="!py-1.5 !min-h-0 text-xs">View profile</Button>}
/>`;

const alertCardCode = `<AlertCard
  variant="error"
  title="Payment failed"
  description="Your card was declined. Please update your payment method."
  icon={<XCircle className="w-5 h-5" />}
/>
<AlertCard variant="success" title="Backup completed" description="Done." icon={<CheckCircle className="w-5 h-5" />} />
<AlertCard variant="warning" title="Expiring soon" description="Renews in 5 days." icon={<AlertTriangle className="w-5 h-5" />} />
<AlertCard variant="info" title="New feature" description="Check Settings." icon={<Info className="w-5 h-5" />} />`;

const progressCardCode = `<ProgressCard title="Project progress" value={70} />
<ProgressCard title="Storage used" value={45} variant="info" />
<ProgressCard title="Monthly target" value={82} variant="success" />`;

const featureCardCode = `<FeatureCard
  icon={<Package className="w-5 h-5" />}
  title="Inventory Management"
  description="Track stock levels and reorder points in real time."
  cta={{ label: "Learn more", href: "#" }}
/>`;

const productCardCode = `<ProductCard
  image={<div className="h-full w-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center"><Package className="w-12 h-12" /></div>}
  title="Wireless Earbuds Pro"
  description="Noise-cancelling, 24h battery"
  price="$89.00"
  compareAtPrice="$119.00"
  href="#"
  action={{ label: "Add to cart", onClick: () => {} }}
  badge={<Badge variant="default">Sale</Badge>}
/>`;

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: importCode, language: "tsx" },
  { label: "Card", code: cardCode, language: "tsx" },
  { label: "StatsCard", code: statsCardCode, language: "tsx" },
  { label: "InfoCard", code: infoCardCode, language: "tsx" },
  { label: "ActionCard", code: actionCardCode, language: "tsx" },
  { label: "ListCard", code: listCardCode, language: "tsx" },
  { label: "UserCard", code: userCardCode, language: "tsx" },
  { label: "AlertCard", code: alertCardCode, language: "tsx" },
  { label: "ProgressCard", code: progressCardCode, language: "tsx" },
  { label: "FeatureCard", code: featureCardCode, language: "tsx" },
  { label: "ProductCard", code: productCardCode, language: "tsx" },
];

export default function CardPage() {
  return (
    <DocPageLayout>
      <CardSection />
      <Divider />
      <HowToUseSection
        description="Card, StatsCard, InfoCard, ActionCard, ListCard, UserCard, AlertCard, ProgressCard, FeatureCard, ProductCard. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
