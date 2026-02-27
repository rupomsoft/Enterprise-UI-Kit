"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { BorderedTableSection } from "@/app/components/showcase/sections/BorderedTableSection";
import { BorderedListTableSection } from "@/app/components/showcase/sections/BorderedListTableSection";
import { VirtualizedDataTableSection } from "@/app/components/showcase/sections/VirtualizedDataTableSection";
import { VirtualizedListViewSection } from "@/app/components/showcase/sections/VirtualizedListViewSection";
import { TableSkeletonSection } from "@/app/components/showcase/sections/TableSkeletonSection";
import { Divider } from "@/app/components/ui";

const importCode = `import {
  BorderedTable,
  BorderedListTable,
  VirtualizedDataTable,
  VirtualizedListView,
  TableSkeleton,
  Button,
  IconButton,
} from "@/app/components/ui";
import type {
  TableColumn,
  BorderedTableActionMenuItem,
  BorderedListTableActionMenuItem,
  VirtualizedDataTableActionMenuItem,
} from "@/app/components/ui";`;

const borderedTableCode = `type TaskRow = { id: number; task: string; progress: number; createdAt: string };

const columns: TableColumn<TaskRow>[] = [
  { id: "task", header: "Task" },
  { id: "progress", header: "Progress", cell: (row) => \`\${row.progress}%\`, sortValue: (row) => row.progress },
  { id: "createdAt", header: "Created" },
];

const actionMenu = (row: TaskRow): BorderedTableActionMenuItem<TaskRow>[] => [
  { label: "Edit", onClick: () => {} },
  { label: "Delete", onClick: () => {}, variant: "danger" },
];

<BorderedTable
  columns={columns}
  data={data}
  getRowKey={(row) => row.id}
  actionColumnMenu={actionMenu}
  fixedHeader
  stripe
  sortable
  selectable
  selectionMode="multiple"
  selectedRowKeys={selectedRowKeys}
  onSelectionChange={setSelectedRowKeys}
  searchKeys={["task"]}
  searchPlaceholder="Search"
  selectionBar={<><span>{selectedRowKeys.length} selected</span><Button onClick={() => setSelectedRowKeys([])}>Clear</Button></>}
/>`;

const borderedListTableCode = `type ProductRow = { id: number; name: string; category: string; price: string };

const actionMenu = (row: ProductRow): BorderedListTableActionMenuItem<ProductRow>[] => [
  { label: "Edit", onClick: () => {} },
  { label: "Delete", onClick: () => {}, variant: "danger" },
];

<BorderedListTable<ProductRow>
  data={data}
  getRowKey={(row) => row.id}
  renderItem={(row) => (
    <div className="flex items-center gap-3">
      <span>{row.name}</span>
      <span>{row.category}</span>
      <span>$\{row.price}</span>
    </div>
  )}
  actionColumnMenu={actionMenu}
  searchKeys={["name", "category"]}
  selectable
  selectionMode="multiple"
  selectedRowKeys={selectedRowKeys}
  onSelectionChange={setSelectedRowKeys}
  stripe
/>`;

const virtualizedDataTableCode = `const columns = [
  { key: "engine", header: "Engine", minWidth: "100px" },
  { key: "browser", header: "Browser", minWidth: "120px" },
  { key: "platform", header: "Platform", minWidth: "80px" },
];

<VirtualizedDataTable
  columns={columns}
  data={data}
  getRowKey={(row) => row.id}
  containerHeight={320}
  title="Virtualized table"
  subtitle="Only visible rows rendered"
  searchKeys={["engine", "browser"]}
  searchPlaceholder="Search"
  sortable
  selectable
  selectionMode="multiple"
  selectedRowKeys={selectedRowKeys}
  onSelectionChange={setSelectedRowKeys}
  actionColumnMenu={(row) => [
    { label: "Edit", onClick: () => {} },
    { label: "Delete", onClick: () => {}, variant: "danger" },
  ]}
/>`;

const virtualizedListViewCode = `type Item = { id: number; name: string; category: string; price: string };

<VirtualizedListView<Item>
  data={data}
  getRowKey={(item) => item.id}
  rowHeight={56}
  containerHeight={400}
  renderItem={(item) => (
    <div className="flex items-center gap-3">
      <span>{item.name}</span>
      <span>{item.category}</span>
      <span>$\{item.price}</span>
    </div>
  )}
  searchKeys={["name", "category"]}
  selectable
  selectionMode="multiple"
  selectedRowKeys={selectedRowKeys}
  onSelectionChange={setSelectedRowKeys}
/>`;

const tableSkeletonCode = `<TableSkeleton rows={5} cols={4} />`;

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: importCode, language: "tsx" },
  { label: "BorderedTable", code: borderedTableCode, language: "tsx" },
  { label: "BorderedListTable", code: borderedListTableCode, language: "tsx" },
  { label: "VirtualizedDataTable", code: virtualizedDataTableCode, language: "tsx" },
  { label: "VirtualizedListView", code: virtualizedListViewCode, language: "tsx" },
  { label: "TableSkeleton", code: tableSkeletonCode, language: "tsx" },
];

export default function TablePage() {
  return (
    <DocPageLayout>
      <BorderedTableSection />
      <Divider />
      <BorderedListTableSection />
      <Divider />
      <VirtualizedDataTableSection />
      <Divider />
      <VirtualizedListViewSection />
      <Divider />
      <TableSkeletonSection />
      <Divider />
      <HowToUseSection
        description="BorderedTable, BorderedListTable, VirtualizedDataTable, VirtualizedListView, TableSkeleton. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
