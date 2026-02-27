"use client";

export interface StepperProps {
  steps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
      {Array.from({ length: steps }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onStepChange(i + 1)}
            className={`flex h-10 w-10 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors touch-manipulation cursor-pointer ${
              currentStep >= i + 1
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
          >
            {i + 1}
          </button>
          {i < steps - 1 && (
            <div
              className={`h-px w-4 sm:w-8 shrink-0 ${
                currentStep > i + 1
                  ? "bg-gray-900 dark:bg-gray-100"
                  : "bg-gray-200 dark:bg-gray-600"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
