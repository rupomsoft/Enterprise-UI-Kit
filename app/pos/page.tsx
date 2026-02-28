"use client";

import { useState, useMemo, useCallback } from "react";
import { ShoppingCart } from "lucide-react";
import { PosCartItem } from "@/app/components/ui/PosCartItem";
import { PosProductCard } from "@/app/components/ui/PosProductCard";
import { PosProductList } from "@/app/components/ui/PosProductList";
import { PosTopNavbar } from "@/app/components/ui/PosTopNavbar";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { SearchableDropdown } from "@/app/components/ui/SearchableDropdown";
import { Sheet } from "@/app/components/ui/Sheet";
import { DashboardLayout } from "@/app/components/common/DashboardLayout";

// --- Constants ---
const CURRENCY = "৳";
const DEFAULT_VARIANT = "No variant";
const PLACEHOLDER_IMAGE = <div className="w-full h-full bg-gray-200 dark:bg-gray-600" />;
const INPUT_TOUCH_CLASS = "min-h-[44px] sm:min-h-[36px] text-base sm:text-sm touch-manipulation";
const BUTTON_TOUCH_CLASS = "w-full min-h-[44px] sm:min-h-[36px]";

const MOCK_CUSTOMERS = [
  { value: "c1", label: "John Doe" },
  { value: "c2", label: "Jane Smith" },
  { value: "c3", label: "Ahmed Khan" },
  { value: "c4", label: "Maria Garcia" },
  { value: "c5", label: "Raj Patel" },
];

const PRODUCT_NAMES = [
  "Grawon Tops", "3pcs pakistani Kurti", "Rose unredy", "Classic White Shirt", "Denim Jacket",
  "Floral Maxi Dress", "Cotton T-Shirt", "Silk Saree", "Casual Trousers", "Winter Sweater",
  "Linen Kurta", "Chiffon Dupatta", "Printed Leggings", "Solid Blazer", "Striped Polo",
  "V-Neck Sweater", "High Waist Jeans", "Anarkali Suit", "Crop Top", "Palazzo Pants",
  "Georgette Saree", "Wool Coat", "Canvas Sneakers", "Leather Bag", "Silk Scarf",
  "Button Down Shirt", "Pencil Skirt", "Hoodie", "Joggers", "Formal Trousers",
  "Kurti Set", "Salwar Kameez", "Designer Saree", "Party Dress", "Evening Gown",
  "Summer Blouse", "Cardigan", "Windbreaker", "Track Pants", "Cargo Shorts",
  "Lace Top", "Embroidered Jacket", "Quilted Vest", "Bomber Jacket", "Trench Coat",
  "Midi Skirt", "A-Line Dress", "Wrap Dress", "Bodycon Dress", "Shirt Dress",
];

const PRODUCT_CATEGORIES: Record<number, string> = {
  0: "Tops", 1: "Traditional", 2: "Tops", 3: "Shirts", 4: "Outerwear",
  5: "Dresses", 6: "Tops", 7: "Traditional", 8: "Bottoms", 9: "Outerwear",
  10: "Traditional", 11: "Traditional", 12: "Bottoms", 13: "Outerwear", 14: "Tops",
  15: "Outerwear", 16: "Bottoms", 17: "Traditional", 18: "Tops", 19: "Bottoms",
  20: "Traditional", 21: "Outerwear", 22: "Footwear", 23: "Accessories", 24: "Accessories",
  25: "Shirts", 26: "Bottoms", 27: "Outerwear", 28: "Bottoms", 29: "Bottoms",
  30: "Traditional", 31: "Traditional", 32: "Traditional", 33: "Dresses", 34: "Dresses",
  35: "Tops", 36: "Outerwear", 37: "Outerwear", 38: "Bottoms", 39: "Bottoms",
  40: "Tops", 41: "Outerwear", 42: "Outerwear", 43: "Outerwear", 44: "Outerwear",
  45: "Bottoms", 46: "Dresses", 47: "Dresses", 48: "Dresses", 49: "Dresses",
};

const CATEGORY_OPTIONS = [
  { value: "", label: "All" },
  { value: "Tops", label: "Tops" },
  { value: "Shirts", label: "Shirts" },
  { value: "Dresses", label: "Dresses" },
  { value: "Bottoms", label: "Bottoms" },
  { value: "Outerwear", label: "Outerwear" },
  { value: "Traditional", label: "Traditional" },
  { value: "Footwear", label: "Footwear" },
  { value: "Accessories", label: "Accessories" },
];

// --- Types ---
type ProductItem = { id: string; name: string; price: number; stock: number; category: string };
type CartItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  discount: number;
  variant?: string;
};

// --- Mock data ---
function generateMockProducts(count: number): ProductItem[] {
  const products: ProductItem[] = [];
  const prices = [590, 890, 1250, 1650, 1890, 2200, 2700, 3050, 3500, 4200, 5500, 6800];
  for (let i = 0; i < count; i++) {
    const nameIdx = i % PRODUCT_NAMES.length;
    const variant = Math.floor(i / PRODUCT_NAMES.length);
    const name = variant === 0 ? PRODUCT_NAMES[nameIdx] : `${PRODUCT_NAMES[nameIdx]} ${variant + 1}`;
    const priceIdx = (i * 7 + 11) % prices.length;
    const price = prices[priceIdx];
    const stock = 5 + (i * 13) % 250;
    const category = PRODUCT_CATEGORIES[nameIdx] ?? "Tops";
    products.push({ id: String(i + 1), name, price, stock, category });
  }
  return products;
}

const MOCK_PRODUCTS = generateMockProducts(500);

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderDiscount, setOrderDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [customerId, setCustomerId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cartSheetOpen, setCartSheetOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const bySearch = (p: ProductItem) => !q || p.name.toLowerCase().includes(q);
    const byCategory = (p: ProductItem) => !categoryFilter || p.category === categoryFilter;
    return MOCK_PRODUCTS.filter((p) => bySearch(p) && byCategory(p));
  }, [searchQuery, categoryFilter]);

  const addToCart = useCallback((id: string, name: string, price: number, variant?: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === id);
      if (existing) {
        return prev.map((i) =>
          i.productId === id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { productId: id, name, price, qty: 1, discount: 0, variant: variant ?? DEFAULT_VARIANT }];
    });
  }, []);

  const updateQty = useCallback((productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === productId ? { ...i, qty: Math.max(0, i.qty + delta) } : i
        )
        .filter((i) => i.qty > 0)
    );
  }, []);

  const setItemDiscount = useCallback((productId: string, value: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, discount: value } : i
      )
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, i) => sum + Math.max(0, i.price * i.qty - (i.discount || 0)),
        0
      ),
    [cart]
  );
  const grandTotal = Math.max(0, subtotal - orderDiscount);

  const resetCart = useCallback(() => {
    setCart([]);
    setOrderDiscount(0);
    setPaidAmount(0);
    setCustomerId("");
    setCartSheetOpen(false);
  }, []);

  const cartListContent = (
    <>
      {cart.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 py-6 sm:py-8 text-center px-2">
          Cart is empty. Add products from the list.
        </p>
      ) : (
        <ul className="space-y-3 sm:space-y-4">
          {cart.map((item) => (
            <li key={item.productId}>
              <PosCartItem
                name={item.name}
                image={PLACEHOLDER_IMAGE}
                variant={item.variant ?? DEFAULT_VARIANT}
                price={item.price}
                quantity={item.qty}
                discount={item.discount}
                onQuantityChange={(delta) => updateQty(item.productId, delta)}
                onDiscountChange={(value) => setItemDiscount(item.productId, value)}
                onRemove={() => removeItem(item.productId)}
                currency={CURRENCY}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );

  const orderFormContent = (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <Input
          label="Discount"
          labelClassName="text-xs"
          type="number"
          min={0}
          value={orderDiscount || ""}
          onChange={(e) => setOrderDiscount(Number(e.target.value) || 0)}
          className={INPUT_TOUCH_CLASS}
        />
        <Input
          label="Paid Amount"
          labelClassName="text-xs"
          type="number"
          min={0}
          value={paidAmount || ""}
          onChange={(e) => setPaidAmount(Number(e.target.value) || 0)}
          className={INPUT_TOUCH_CLASS}
        />
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-2 sm:gap-3 items-end">
        <div className="min-w-0">
          <SearchableDropdown
            label="Customer (Optional)"
            labelClassName="text-xs"
            placeholder="Select customer"
            searchPlaceholder="Search customer..."
            options={MOCK_CUSTOMERS}
            value={customerId}
            onChange={(v) => setCustomerId(v)}
            className="w-full [&_.relative>button]:min-h-[44px] sm:[&_.relative>button]:min-h-[36px]"
          />
        </div>
        <div className="flex flex-col min-w-0 gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Grand Total</span>
          <span className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] px-3 py-2 sm:py-1.5 rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100 tabular-nums w-fit">
            {CURRENCY}{grandTotal.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <Button variant="secondary" className={BUTTON_TOUCH_CLASS} onClick={resetCart}>
          Draft
        </Button>
        <Button variant="primary" className={BUTTON_TOUCH_CLASS}>
          Confirm
        </Button>
      </div>
    </>
  );

  return (
    <DashboardLayout>
      <div className="-m-4 sm:-m-6 flex flex-col flex-1 min-h-0 bg-[#FAFAFA] dark:bg-gray-950 safe-area-inset">
        <PosTopNavbar
          title="Enterprise UI"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search products..."
          categoryOptions={CATEGORY_OPTIONS}
          categoryValue={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        {/* Main: product list + cart — column on mobile (products then cart), row on sm+ */}
        <div className="flex-1 flex flex-col sm:flex-row min-h-0 w-full pb-16 sm:pb-0">
          <div className="flex-1 min-w-0 min-h-0 flex flex-col order-1">
            <PosProductList
              data={filteredProducts}
              getKey={(p) => p.id}
              renderItem={(p, context) => (
                <PosProductCard
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  stock={p.stock}
                  image={PLACEHOLDER_IMAGE}
                  onAddToCart={() => addToCart(p.id, p.name, p.price, DEFAULT_VARIANT)}
                  currency={CURRENCY}
                  listView={context?.listView}
                />
              )}
              columns={5}
              rowHeight={240}
              rowGap={8}
              height="90vh"
            />
          </div>

          {/* Cart sidebar: hidden on mobile (use sticky button + sheet instead), visible sm+ */}
          <aside className="hidden sm:flex w-full sm:w-[340px] md:w-[380px] lg:w-[400px] sm:h-[90dvh] sm:max-h-[90dvh] sm:min-h-0 sm:max-h-none shrink-0 sm:border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-col overflow-hidden order-2 safe-area-bottom-with-padding">
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 touch-manipulation">
              {cartListContent}
            </div>
            <div className="shrink-0 px-3 pt-3 sm:px-4 sm:pt-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
              {orderFormContent}
            </div>
          </aside>
        </div>

        {/* Mobile: sticky Cart button at bottom; opens full-screen cart bottom sheet */}
        <button
          type="button"
          onClick={() => setCartSheetOpen(true)}
          className="sm:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-3 px-4 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold shadow-[0_-2px_10px_rgba(0,0,0,0.1)] safe-area-bottom-with-padding touch-manipulation min-h-[56px]"
          aria-label="Open cart"
        >
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 shrink-0" />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] rounded-full bg-white/20 dark:bg-gray-900/20 text-sm">
                {cart.length}
              </span>
            )}
          </span>
          {cart.length > 0 && (
            <span className="tabular-nums">
              {CURRENCY}{grandTotal.toFixed(2)}
            </span>
          )}
        </button>

        <Sheet
          open={cartSheetOpen}
          onClose={() => setCartSheetOpen(false)}
          title="Cart & Order"
          position="bottom"
          maxHeight="90dvh"
        >
          <div className="flex flex-col h-[75dvh] min-h-0 bg-white dark:bg-gray-900 -mx-4 -mt-2">
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 pb-2 touch-manipulation">
              {cartListContent}
            </div>
            <div className="shrink-0 px-4 pt-3 pb-4 border-t border-gray-200 dark:border-gray-800 space-y-2 safe-area-bottom-with-padding bg-white dark:bg-gray-900">
              {orderFormContent}
            </div>
          </div>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
