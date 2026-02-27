"use client";

import { useState, useMemo } from "react";
import { VirtualizedListView, Button, IconButton, Section } from "@/app/components/ui";
import { Plus, Package, ShoppingCart } from "lucide-react";

/** YYYY-MM-DD spread across items (Jan–Feb 2025) */
function dateForIndex(i: number) {
  const d = new Date(2025, 0, 1);
  d.setDate(d.getDate() + (i % 58));
  return d.toISOString().slice(0, 10);
}

const listDemoData = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Home", "Sports", "Books"][i % 5],
  sku: `SKU-${String(10000 + i).padStart(5, "0")}`,
  price: (19.99 + (i % 50) * 2.5).toFixed(2),
  createdAt: dateForIndex(i),
}));

export function VirtualizedListViewSection() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" });

  const filteredData = useMemo(() => {
    if (!dateRange.from && !dateRange.to) return listDemoData;
    return listDemoData.filter((row) => {
      const d = row.createdAt;
      if (dateRange.from && d < dateRange.from) return false;
      if (dateRange.to && d > dateRange.to) return false;
      return true;
    });
  }, [dateRange]);

  return (
    <Section
      title="VirtualizedListView"
      description="Virtualized list with toolbar, search, and row selection. Product-style rows: image, name, price, action."
      block
    >
      <div className="w-full min-w-0 max-w-7xl overflow-x-auto">
        <VirtualizedListView
          data={filteredData}
          getRowKey={(item) => item.id}
          rowHeight={56}
          renderItem={(item) => (
            <div className="flex items-center gap-3 min-w-0 w-full">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                <Package className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {item.category} · {item.sku}
                </p>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 shrink-0">
                ${item.price}
              </span>
              <div className="shrink-0 flex items-center gap-1">
                <IconButton
                  aria-label={`Add ${item.name} to cart`}
                  icon={<ShoppingCart className="w-4 h-4" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Add to cart", item.id);
                  }}
                />
                <Button
                  variant="secondary"
                  className="!min-h-8 !h-8 !py-1.5 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("View", item.id);
                  }}
                >
                  View
                </Button>
              </div>
            </div>
          )}
          containerHeight={320}
          title="Virtualized list"
          subtitle={`${filteredData.length} items · only visible rows rendered`}
          searchKeys={["name", "category", "sku"]}
          searchPlaceholder="Search items..."
          onDateFilterChange={(from, to) => setDateRange({ from, to })}
          selectable
          selectionMode="multiple"
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          selectionBar={
            <>
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                {selectedRowKeys.length} selected
              </span>
              <Button variant="secondary" onClick={() => setSelectedRowKeys([])}>
                Clear
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  console.log("Delete selected:", selectedRowKeys);
                  setSelectedRowKeys([]);
                }}
              >
                Delete selected
              </Button>
            </>
          }
          toolbarAction={
            <div className="flex items-center gap-2">
              <Button variant="primary" onClick={() => {}}>
                Add item
              </Button>
              <IconButton aria-label="Add" icon={<Plus className="w-4 h-4" />} onClick={() => {}} />
            </div>
          }
        />
      </div>
    </Section>
  );
}
