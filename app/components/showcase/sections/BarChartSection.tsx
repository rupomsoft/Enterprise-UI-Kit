"use client";

import { BarChartRechart } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function BarChartSection() {
  return (
    <Section title="Bar Chart (Rechart)" description="Reusable bar chart with Recharts." block>
      <div className="w-full min-w-0 max-w-xl rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-4">
        <BarChartRechart
          data={[
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
          ]}
          height={240}
        />
      </div>
    </Section>
  );
}
