"use client";

import { useState, useCallback } from "react";
import {
  BorderedListTable,
  Button,
  IconButton,
  Section,
} from "@/app/components/ui";
import type { BorderedListTableActionMenuItem } from "@/app/components/ui";
import { Plus, Package, ShoppingCart } from "lucide-react";

type ProductRow = {
  id: number;
  name: string;
  category: string;
  sku: string;
  price: string;
};

const listTableData: ProductRow[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Home", "Sports", "Books"][i % 5],
  sku: `SKU-${String(10000 + i).padStart(5, "0")}`,
  price: (19.99 + (i % 50) * 2.5).toFixed(2),
}));

export function BorderedListTableSection() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);

  const getRowKey = useCallback((row: ProductRow) => row.id, []);
  const actionColumnMenu = useCallback(
    (row: ProductRow): BorderedListTableActionMenuItem<ProductRow>[] => [
      { label: "Edit", onClick: () => console.log("Edit", row.id) },
      { label: "Duplicate", onClick: () => console.log("Duplicate", row.id) },
      { label: "Delete", onClick: () => console.log("Delete", row.id), variant: "danger" },
    ],
    []
  );

  return (
    <Section
      title="BorderedListTable"
      description="List-style table with product rows (image, name, price, action). Toolbar, search, pagination, sort, selection, and row actions like BorderedTable."
      block
    >
      <div className="w-full min-w-0 max-w-7xl overflow-x-auto">
        <BorderedListTable<ProductRow>
          data={listTableData}
          getRowKey={getRowKey}
          renderItem={(row) => (
            <div className="flex items-center gap-3 min-w-0 w-full py-1">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                <Package className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {row.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {row.category} · {row.sku}
                </p>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 shrink-0">
                ${row.price}
              </span>
              <div className="shrink-0 flex items-center gap-1">
                <IconButton
                  aria-label={`Add ${row.name} to cart`}
                  icon={<ShoppingCart className="w-4 h-4" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Add to cart", row.id);
                  }}
                />
                <Button
                  variant="secondary"
                  className="!min-h-8 !h-8 !py-1.5 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("View", row.id);
                  }}
                >
                  View
                </Button>
              </div>
            </div>
          )}
          rowHeight={56}
          stripe
          title="Products"
          subtitle="List of products with search, sort, and pagination."
          searchKeys={["name", "category", "sku"]}
          searchPlaceholder="Search products..."
          sortKey="name"
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
          actionColumnMenu={actionColumnMenu}
          toolbarAction={
            <div className="flex items-center gap-2">
              <Button variant="primary" onClick={() => {}}>
                Add product
              </Button>
              <IconButton aria-label="Add" icon={<Plus className="w-4 h-4" />} onClick={() => {}} />
            </div>
          }
        />
      </div>
    </Section>
  );
}
