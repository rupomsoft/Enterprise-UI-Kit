"use client";

import { PieChartRechart } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function PieChartSection() {
  return (
    <Section title="Pie Chart (Rechart)" description="Reusable pie chart with Recharts." block>
      <div className="w-full min-w-0 max-w-3xl rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-4">
        <PieChartRechart
          data={[
            { name: "A", value: 40 },
            { name: "B", value: 30 },
            { name: "C", value: 30 },
          ]}
          height={220}
        />
      </div>
    </Section>
  );
}
