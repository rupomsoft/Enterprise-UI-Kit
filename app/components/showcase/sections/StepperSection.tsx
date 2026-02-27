"use client";

import { useState } from "react";
import { Stepper } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function StepperSection() {
  const [step, setStep] = useState(1);
  return (
    <Section title="Stepper">
      <Stepper steps={3} currentStep={step} onStepChange={setStep} />
    </Section>
  );
}
