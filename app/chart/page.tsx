"use client";

import dynamic from "next/dynamic";
import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { Divider } from "@/app/components/ui";

const AreaChartSection = dynamic(
  () => import("@/app/components/showcase/sections/AreaChartSection").then((m) => ({ default: m.AreaChartSection })),
  { ssr: false }
);
const BarChartSection = dynamic(
  () => import("@/app/components/showcase/sections/BarChartSection").then((m) => ({ default: m.BarChartSection })),
  { ssr: false }
);
const LineChartSection = dynamic(
  () => import("@/app/components/showcase/sections/LineChartSection").then((m) => ({ default: m.LineChartSection })),
  { ssr: false }
);
const PieChartSection = dynamic(
  () => import("@/app/components/showcase/sections/PieChartSection").then((m) => ({ default: m.PieChartSection })),
  { ssr: false }
);
const DoughnutChartSection = dynamic(
  () => import("@/app/components/showcase/sections/DoughnutChartSection").then((m) => ({ default: m.DoughnutChartSection })),
  { ssr: false }
);

const importCode = `import {
  AreaChartRechart,
  BarChartRechart,
  LineChartRechart,
  PieChartRechart,
  DoughnutChartRechart,
} from "@/app/components/ui";`;

const dataCode = `const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 65 },
  { name: "Mar", value: 50 },
  { name: "Apr", value: 80 },
  { name: "May", value: 55 },
];`;

const areaChartCode = `<AreaChartRechart data={data} height={240} />

// With custom fill
<AreaChartRechart
  data={data}
  height={180}
  fillColor="rgb(16 185 129)"
  fillOpacity={0.35}
/>
<AreaChartRechart
  data={data}
  height={180}
  fillColor="rgb(59 130 246)"
  fillOpacity={0.4}
/>`;

const barChartCode = `<BarChartRechart data={data} height={240} />

// Custom bar color
<BarChartRechart data={data} height={240} barColor="rgb(34 197 94)" />`;

const lineChartCode = `<LineChartRechart data={data} height={220} />

// Custom stroke
<LineChartRechart data={data} height={220} strokeColor="rgb(59 130 246)" />`;

const pieChartCode = `const pieData = [
  { name: "A", value: 40 },
  { name: "B", value: 30 },
  { name: "C", value: 30 },
];

<PieChartRechart data={pieData} height={220} />

// Custom colors
<PieChartRechart
  data={pieData}
  height={220}
  colors={["rgb(34 197 94)", "rgb(59 130 246)", "rgb(234 179 8)"]}
/>`;

const doughnutChartCode = `const doughnutData = [
  { name: "Done", value: 45 },
  { name: "Pending", value: 35 },
  { name: "Cancel", value: 20 },
];

<DoughnutChartRechart data={doughnutData} height={220} />

// Custom colors and inner radius
<DoughnutChartRechart
  data={doughnutData}
  height={220}
  colors={["rgb(34 197 94)", "rgb(234 179 8)", "rgb(239 68 68)"]}
  innerRadiusPercent={60}
/>`;

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: importCode, language: "tsx" },
  { label: "Data shape", code: dataCode, language: "tsx" },
  { label: "AreaChartRechart", code: areaChartCode, language: "tsx" },
  { label: "BarChartRechart", code: barChartCode, language: "tsx" },
  { label: "LineChartRechart", code: lineChartCode, language: "tsx" },
  { label: "PieChartRechart", code: pieChartCode, language: "tsx" },
  { label: "DoughnutChartRechart", code: doughnutChartCode, language: "tsx" },
];

export default function ChartPage() {
  return (
    <DocPageLayout>
      <AreaChartSection />
      <Divider />
      <BarChartSection />
      <Divider />
      <LineChartSection />
      <Divider />
      <PieChartSection />
      <Divider />
      <DoughnutChartSection />
      <Divider />
      <HowToUseSection
        description="Charts use Recharts. AreaChartRechart, BarChartRechart, LineChartRechart, PieChartRechart, DoughnutChartRechart. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
