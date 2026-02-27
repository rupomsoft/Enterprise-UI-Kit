"use client";

import { Card, ProgressBar, ProgressCard, ProgressRing, Section } from "@/app/components/ui";

export function ProgressSection() {
  return (
    <Section title="ProgressBar & ProgressRing">
      <div className="flex flex-wrap items-stretch gap-6">
        {/* Left: ProgressBar + ProgressRing */}
        <Card className="w-56 shrink-0 shadow-sm">
          <div className="space-y-5">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-2">
                ProgressBar
              </h3>
              <ProgressBar value={60} label="Default" />
              <ProgressBar value={80} variant="success" />
            </div>
            <div className="space-y-4 pt-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-2">
                ProgressRing
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <ProgressRing value={75} />
                <ProgressRing value={40} variant="success" size={48} />
              </div>
            </div>
          </div>
        </Card>

        {/* Middle: ProgressCard examples */}
        <Card className="min-w-[220px] shrink-0 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-2 mb-4">
            ProgressCard
          </h3>
          <div className="space-y-3 flex-1">
            <ProgressCard title="Project progress" value={70} variant="default" />
            <ProgressCard title="Tasks completed" value={90} variant="success" />
          </div>
        </Card>

        {/* Right: Extra variants / placeholder card */}
        <Card className="w-56 shrink-0 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-2 mb-4">
            Variants
          </h3>
          <div className="space-y-4">
            <ProgressBar value={45} variant="info" label="Info" />
            <ProgressBar value={30} variant="warning" label="Warning" />
            <ProgressBar value={20} variant="error" label="Error" />
          </div>
        </Card>
      </div>
    </Section>
  );
}
