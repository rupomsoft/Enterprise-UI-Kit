"use client";

import { useState, useMemo } from "react";
import { VirtualizedDataTable, Button, IconButton, Section } from "@/app/components/ui";
import { Plus } from "lucide-react";

/** YYYY-MM-DD dates spread across 50 rows (Jan–Feb 2025) */
function dateForIndex(i: number) {
  const d = new Date(2025, 0, 1);
  d.setDate(d.getDate() + Math.floor((i * 17) % 58));
  return d.toISOString().slice(0, 10);
}

const virtualizedDemoData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  engine: ["Gecko", "KHTML", "Trident", "Webkit", "Presto"][i % 5],
  browser: "Browser " + (i + 1),
  platform: ["Win", "OSX", "Linux"][i % 3],
  version: String((i % 10) + 1) + "." + (i % 5),
  grade: ["A", "B", "C"][i % 3],
  createdAt: dateForIndex(i),
}));

const virtualizedDemoColumns = [
  { key: "engine", header: "Engine", minWidth: "100px" },
  { key: "browser", header: "Browser", minWidth: "120px" },
  { key: "platform", header: "Platform", minWidth: "80px" },
  { key: "version", header: "Version", minWidth: "80px" },
  { key: "grade", header: "Grade", minWidth: "60px" },
  { key: "createdAt", header: "Created", minWidth: "100px" },
];

export function VirtualizedDataTableSection() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" });

  const filteredData = useMemo(() => {
    if (!dateRange.from && !dateRange.to) return virtualizedDemoData;
    return virtualizedDemoData.filter((row) => {
      const d = row.createdAt;
      if (dateRange.from && d < dateRange.from) return false;
      if (dateRange.to && d > dateRange.to) return false;
      return true;
    });
  }, [dateRange]);

  return (
    <Section title="VirtualizedDataTable" description="Toolbar, sortable columns, Options column, row selection (single or multiple + select all). Windowing: only visible rows rendered." block>
      <div className="w-full min-w-0 max-w-7xl overflow-x-auto">
        <VirtualizedDataTable
          columns={virtualizedDemoColumns}
          data={filteredData}
          getRowKey={(row) => row.id}
          containerHeight={320}
          title="Virtualized table"
          subtitle={`${filteredData.length} rows · only visible rows rendered`}
          searchKeys={["engine", "browser", "platform"]}
          searchPlaceholder="Search"
          onDateFilterChange={(from, to) => setDateRange({ from, to })}
          sortable
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
          actionColumnMenu={(row) => [
            { label: "Edit", onClick: () => console.log("Edit", row.id) },
            { label: "Duplicate", onClick: () => console.log("Duplicate", row.id) },
            { label: "Delete", onClick: () => console.log("Delete", row.id), variant: "danger" as const },
          ]}
          toolbarAction={
            <div className="flex items-center gap-2">
              <Button variant="primary" onClick={() => {}}>
                Add row
              </Button>
              <IconButton aria-label="Add" icon={<Plus className="w-4 h-4" />} onClick={() => {}} />
            </div>
          }
        />
      </div>
    </Section>
  );
}
