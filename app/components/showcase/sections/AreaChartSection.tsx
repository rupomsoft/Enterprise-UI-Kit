"use client";

import { AreaChartRechart, Section } from "@/app/components/ui";

const sampleData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 65 },
  { name: "Mar", value: 50 },
  { name: "Apr", value: 80 },
  { name: "May", value: 55 },
  { name: "Jun", value: 72 },
  { name: "Jul", value: 60 },
  { name: "Aug", value: 88 },
  { name: "Sep", value: 45 },
  { name: "Oct", value: 70 },
  { name: "Nov", value: 65 },
  { name: "Dec", value: 90 },
];

export function AreaChartSection() {
  return (
    <Section
      title="Area Chart (Rechart)"
      description="Reusable area chart with gradient fill. Supports custom fill color and opacity."
      block
    >
      <div className="w-full min-w-0 space-y-6">
        <div className="w-full min-w-0 max-w-3xl rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-4">
          <AreaChartRechart data={sampleData} height={240} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
          <div className="rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Revenue trend</p>
            <AreaChartRechart
              data={sampleData}
              height={180}
              fillColor="rgb(16 185 129)"
              fillOpacity={0.35}
            />
          </div>
          <div className="rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Traffic</p>
            <AreaChartRechart
              data={sampleData.map((d, i) => ({ ...d, value: d.value + (i % 3) * 10 }))}
              height={180}
              fillColor="rgb(59 130 246)"
              fillOpacity={0.4}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
