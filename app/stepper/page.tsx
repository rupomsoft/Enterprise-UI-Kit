"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { StepperSection } from "@/app/components/showcase/sections/StepperSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: `import { Stepper } from "@/app/components/ui";`, language: "tsx" },
  {
    label: "Basic usage",
    code: `<Stepper
  steps={3}
  currentStep={step}
  onStepChange={setStep}
/>`,
    language: "tsx",
  },
];

export default function StepperPage() {
  return (
    <DocPageLayout>
      <StepperSection />
      <Divider />
      <HowToUseSection
        description="Import Stepper. Pass steps, currentStep, and onStepChange. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
