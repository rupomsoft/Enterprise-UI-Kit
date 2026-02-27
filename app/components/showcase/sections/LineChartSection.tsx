"use client";

import { LineChartRechart } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function LineChartSection() {
  return (
    <Section title="Line Chart (Rechart)" description="Reusable line chart with Recharts." block>
      <div className="w-full min-w-0 max-w-3xl rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-4">
        <LineChartRechart
          data={[
            { name: "Mon", value: 12 },
            { name: "Tue", value: 19 },
            { name: "Wed", value: 8 },
            { name: "Thu", value: 24 },
          ]}
          height={220}
        />
      </div>
    </Section>
  );
}
