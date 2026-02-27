"use client";

import { DoughnutChartRechart } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function DoughnutChartSection() {
  return (
    <Section title="Doughnut Chart (Rechart)" description="Reusable doughnut chart with Recharts." block>
      <div className="w-full min-w-0 max-w-3xl rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-4">
        <DoughnutChartRechart
          data={[
            { name: "Done", value: 45 },
            { name: "Pending", value: 35 },
            { name: "Cancel", value: 20 },
          ]}
          height={220}
        />
      </div>
    </Section>
  );
}
