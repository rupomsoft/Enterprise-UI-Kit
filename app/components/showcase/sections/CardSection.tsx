"use client";

import {
  DollarSign,
  FileText,
  ShoppingCart,
  Users,
  Percent,
  Clock,
  Sparkles,
  Plus,
  UserPlus,
  FileBarChart,
  MoreHorizontal,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Package,
  Brain,
  Contact,
  Megaphone,
} from "lucide-react";
import {
  Card,
  StatsCard,
  InfoCard,
  ActionCard,
  ListCard,
  UserCard,
  Avatar,
  Button,
  IconButton,
  AlertCard,
  ProgressCard,
  FeatureCard,
  ProductCard,
  Badge,
} from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function CardSection() {
  return (
    <Section title="Card" description="Container, Stats Card (KPI), Info Card, Action Card, List Card, User Card, Alert Card, Progress Card, Feature Card, and Product Card (image on top) for ecommerce and catalogs.">
      <div className="space-y-8 min-w-0 w-full">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Basic Card</p>
          <Card className="max-w-xs">
            <p className="text-sm text-gray-700 dark:text-gray-300">Card content.</p>
          </Card>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Simple Info Card</p>
          <div className="flex flex-col gap-3 max-w-md">
            <InfoCard icon={<FileText className="w-4 h-4" />}>
              You have 12 pending invoices
            </InfoCard>
            <InfoCard icon={<Clock className="w-4 h-4" />}>
              System maintenance scheduled at 2 AM
            </InfoCard>
            <InfoCard icon={<Sparkles className="w-4 h-4" />}>
              New feature released
            </InfoCard>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Action Card</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionCard
              title="Create New Order"
              description="Start a new order from scratch"
              primaryAction={{ label: "Create order" }}
              icon={<Plus className="w-4 h-4" />}
            />
            <ActionCard
              title="Add Product"
              description="Add a new product to the catalog"
              primaryAction={{ label: "Add product" }}
              icon={<ShoppingCart className="w-4 h-4" />}
            />
            <ActionCard
              title="Invite Team Member"
              description="Send an invitation to join the team"
              primaryAction={{ label: "Invite" }}
              icon={<UserPlus className="w-4 h-4" />}
            />
            <ActionCard
              title="Generate Report"
              description="Export data as a report"
              primaryAction={{ label: "Generate" }}
              icon={<FileBarChart className="w-4 h-4" />}
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">List Card</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ListCard
              title="Recent Orders"
              viewAll={{ href: "#" }}
              items={[
                <div key="1" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Order #2841</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">2 items · $45.00</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">$45</span>
                </div>,
                <div key="2" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Order #2840</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">1 item · $12.99</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">$13</span>
                </div>,
                <div key="3" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Order #2839</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">3 items · $89.50</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">$90</span>
                </div>,
              ]}
            />
            <ListCard
              title="Latest Transactions"
              viewAll={{ href: "#" }}
              items={[
                <div key="1" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Payment received</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Stripe · 2 min ago</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">+$120</span>
                </div>,
                <div key="2" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Refund processed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">PayPal · 1 hr ago</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">−$25</span>
                </div>,
                <div key="3" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Subscription renewed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Stripe · 2 hrs ago</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">+$29</span>
                </div>,
              ]}
            />
            <ListCard
              title="Top Products"
              viewAll={{ href: "#" }}
              items={[
                <div key="1" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Wireless Earbuds</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Electronics</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">124 sold</span>
                </div>,
                <div key="2" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Leather Wallet</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Accessories</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">89 sold</span>
                </div>,
                <div key="3" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Desk Lamp</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Office</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">56 sold</span>
                </div>,
              ]}
            />
            <ListCard
              title="Recent Activities"
              viewAll={{ href: "#" }}
              items={[
                <div key="1" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">New user signed up</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">Just now</span>
                </div>,
                <div key="2" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Order shipped</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Order #2840</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">5 min ago</span>
                </div>,
                <div key="3" className="flex items-center gap-3 py-2 min-w-0">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Report generated</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Sales Q1</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 truncate max-w-[80px] sm:max-w-none">1 hr ago</span>
                </div>,
              ]}
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Profile / User Card</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <UserCard
              avatar={<Avatar size="lg">JD</Avatar>}
              name="Jane Doe"
              roleOrEmail="jane@company.com"
              actions={<Button variant="secondary" className="!py-1.5 !min-h-0 text-xs">View profile</Button>}
            />
            <UserCard
              avatar={<Avatar size="lg" bgClass="bg-indigo-500 text-white">MK</Avatar>}
              name="Mike Kim"
              roleOrEmail="Designer"
              actions={
                <>
                  <IconButton icon={<MessageCircle className="w-4 h-4" />} aria-label="Message" />
                  <IconButton icon={<MoreHorizontal className="w-4 h-4" />} aria-label="More" />
                </>
              }
            />
            <UserCard
              avatar={<Avatar size="lg" bgClass="bg-emerald-500 text-white">AL</Avatar>}
              name="Alex Lee"
              roleOrEmail="alex@customer.com · Acme Inc."
              actions={<Button variant="primary" className="!py-1.5 !min-h-0 text-xs">Contact</Button>}
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Notification / Alert Card</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AlertCard
              variant="error"
              title="Payment failed"
              description="Your card was declined. Please update your payment method."
              icon={<XCircle className="w-5 h-5" />}
            />
            <AlertCard
              variant="success"
              title="Backup completed"
              description="Your data was successfully backed up at 2:30 AM."
              icon={<CheckCircle className="w-5 h-5" />}
            />
            <AlertCard
              variant="warning"
              title="Subscription expiring soon"
              description="Your plan renews in 5 days. Update billing to avoid interruption."
              icon={<AlertTriangle className="w-5 h-5" />}
            />
            <AlertCard
              variant="info"
              title="New feature available"
              description="Check out the new analytics dashboard in Settings."
              icon={<Info className="w-5 h-5" />}
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Progress Card</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProgressCard title="Project progress" value={70} />
            <ProgressCard title="Storage used" value={45} variant="info" />
            <ProgressCard title="Monthly target" value={82} variant="success" />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Feature Card</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              icon={<Package className="w-5 h-5" />}
              title="Inventory Management"
              description="Track stock levels, reorder points, and warehouse locations in real time."
              cta={{ label: "Learn more", href: "#" }}
            />
            <FeatureCard
              icon={<Brain className="w-5 h-5" />}
              title="AI Analytics"
              description="Predict trends and get actionable insights powered by machine learning."
              cta={{ label: "Explore", href: "#" }}
            />
            <FeatureCard
              icon={<Contact className="w-5 h-5" />}
              title="CRM Module"
              description="Manage contacts, deals, and pipelines in one unified workspace."
              cta={{ label: "Get started", href: "#" }}
            />
            <FeatureCard
              icon={<Megaphone className="w-5 h-5" />}
              title="Marketing Automation"
              description="Create campaigns, segment audiences, and automate follow-ups."
              cta={{ label: "Try it", href: "#" }}
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Product Card (Image Top)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProductCard
              image={
                <div className="h-full w-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
              }
              title="Wireless Earbuds Pro"
              description="Noise-cancelling, 24h battery"
              price="$89.00"
              compareAtPrice="$119.00"
              href="#"
              action={{ label: "Add to cart", onClick: () => {} }}
              badge={<Badge variant="default">Sale</Badge>}
            />
            <ProductCard
              image={
                <div className="h-full w-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <ShoppingCart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
              }
              title="Leather Laptop Bag"
              description="Water-resistant, fits 15″"
              price="$129.00"
              href="#"
              action={{ label: "View", href: "#" }}
            />
            <ProductCard
              image={
                <div className="h-full w-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <FileBarChart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
              }
              title="Desk Organizer Set"
              description="Bamboo, 5 pieces"
              price="$45.00"
              href="#"
              action={{ label: "Add to cart", onClick: () => {} }}
              badge={<Badge variant="success">New</Badge>}
            />
            <ProductCard
              image={
                <div className="h-full w-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
              }
              title="Premium Subscription"
              description="Annual plan, all features"
              price="$199.00"
              href="#"
              action={{ label: "Subscribe", href: "#" }}
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Stats Card (KPI)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Revenue"
              value="$24,500"
              change="+12%"
              trend="up"
              icon={<DollarSign className="w-4 h-4" />}
            />
            <StatsCard
              title="Orders"
              value="1,245"
              change="+4%"
              trend="up"
              icon={<ShoppingCart className="w-4 h-4" />}
            />
            <StatsCard
              title="New Users"
              value="320"
              change="-2%"
              trend="down"
              icon={<Users className="w-4 h-4" />}
            />
            <StatsCard
              title="Conversion Rate"
              value="3.2%"
              icon={<Percent className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
