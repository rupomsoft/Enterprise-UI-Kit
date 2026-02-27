"use client";

import { useState, useCallback, useMemo } from "react";
import { BorderedTable, Button, IconButton, Section } from "@/app/components/ui";
import type { TableColumn, BorderedTableActionMenuItem } from "@/app/components/ui";
import { Plus } from "lucide-react";

type TaskRow = { id: number; task: string; progress: number; label: string; createdAt: string };

const showcaseTaskData: TaskRow[] = [
  { id: 1, task: "Update software", progress: 55, label: "55%", createdAt: "2025-01-05" },
  { id: 2, task: "Clean database", progress: 70, label: "70%", createdAt: "2025-01-12" },
  { id: 3, task: "Cron job running", progress: 30, label: "30%", createdAt: "2025-01-18" },
  { id: 4, task: "Fix bugs", progress: 90, label: "90%", createdAt: "2025-02-01" },
  { id: 5, task: "Deploy staging", progress: 100, label: "100%", createdAt: "2025-02-08" },
  { id: 6, task: "Run migrations", progress: 45, label: "45%", createdAt: "2025-02-14" },
  { id: 7, task: "Sync assets", progress: 20, label: "20%", createdAt: "2025-02-20" },
  { id: 8, task: "Backup data", progress: 80, label: "80%", createdAt: "2025-02-22" },
  { id: 9, task: "Update dependencies", progress: 60, label: "60%", createdAt: "2025-02-24" },
  { id: 10, task: "Refactor module A", progress: 35, label: "35%", createdAt: "2025-02-25" },
  { id: 11, task: "Write tests", progress: 75, label: "75%", createdAt: "2025-02-26" },
  { id: 12, task: "Code review", progress: 50, label: "50%", createdAt: "2025-02-27" },
  { id: 13, task: "Optimize queries", progress: 65, label: "65%", createdAt: "2025-01-22" },
  { id: 14, task: "Fix accessibility", progress: 40, label: "40%", createdAt: "2025-02-10" },
  { id: 15, task: "Document API", progress: 85, label: "85%", createdAt: "2025-02-15" },
  { id: 16, task: "Setup CI/CD", progress: 95, label: "95%", createdAt: "2025-02-18" },
  { id: 17, task: "Security audit", progress: 25, label: "25%", createdAt: "2025-01-28" },
  { id: 18, task: "Load testing", progress: 15, label: "15%", createdAt: "2025-02-05" },
  { id: 19, task: "Localization", progress: 72, label: "72%", createdAt: "2025-02-12" },
  { id: 20, task: "Performance tuning", progress: 88, label: "88%", createdAt: "2025-02-25" },
];

const showcaseTaskColumns: TableColumn<TaskRow>[] = [
  { id: "id", header: "#", cell: (row) => `${row.id}.` },
  { id: "task", header: "Task" },
  { id: "progress", header: "Progress", cell: (row) => `${row.progress}%`, sortValue: (row) => row.progress },
  { id: "label", header: "Label", align: "right" },
  { id: "createdAt", header: "Created", cell: (row) => row.createdAt },
];

export function BorderedTableSection() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" });

  const filteredData = useMemo(() => {
    if (!dateRange.from && !dateRange.to) return showcaseTaskData;
    return showcaseTaskData.filter((row) => {
      const d = row.createdAt;
      if (dateRange.from && d < dateRange.from) return false;
      if (dateRange.to && d > dateRange.to) return false;
      return true;
    });
  }, [dateRange]);

  const getRowKey = useCallback((row: TaskRow) => row.id, []);
  const actionColumnMenu = useCallback((row: TaskRow): BorderedTableActionMenuItem<TaskRow>[] => [
    { label: "Edit", onClick: () => console.log("Edit", row.id) },
    { label: "Duplicate", onClick: () => console.log("Duplicate", row.id) },
    { label: "Delete", onClick: () => console.log("Delete", row.id), variant: "danger" },
  ], []);

  return (
    <Section title="BorderedTable" description="Borders, search, pagination, sortable, row selection (single or multiple + select all)." block>
      <div className="w-full min-w-0 max-w-7xl overflow-x-auto">
        <BorderedTable
          fixedHeader
          stripe
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
          scrollHeight="350px"
          title="Tasks"
          subtitle="Manage your tasks and progress."
          columns={showcaseTaskColumns}
          data={filteredData}
          getRowKey={getRowKey}
          searchKeys={["task", "label"]}
          searchPlaceholder="Search tasks"
          onDateFilterChange={(from, to) => setDateRange({ from, to })}
          actionColumnMenu={actionColumnMenu}
          toolbarAction={
            <div className="flex items-center gap-2">
              <Button variant="primary" onClick={() => {}}>
                Add task
              </Button>
              <IconButton aria-label="Add" icon={<Plus className="w-4 h-4" />} onClick={() => {}} />
            </div>
          }
        />
      </div>
    </Section>
  );
}
