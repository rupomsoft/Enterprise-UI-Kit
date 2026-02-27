"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { Section } from "@/app/components/ui";

export default function HomePage() {
  return (
    <DocPageLayout maxWidth="narrow">
      <Section
          title="Enterprise Dashboard UI Kit"
          description="A lightweight, AI-friendly component library built to supercharge how you build dashboards with AI-assisted development."
          block
        >
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <p className="text-base leading-relaxed">
              This is a Dashboard UI Kit designed to make AI-assisted coding more effective. Every reusable UI component is kept lightweight and AI-friendly, so both humans and AI can work with the same patterns and less noise.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-3">Why this kit?</h3>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 mt-2 shrink-0" />
                <span><strong>Empower AI-assisted coding.</strong> Components are consistent, well-named, and documented so AI can suggest and generate code that fits the kit.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 mt-2 shrink-0" />
                <span><strong>Cut code review and refactor time by 40–50%.</strong> Shared patterns and a single source of truth mean less back-and-forth and fewer surprises.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 mt-2 shrink-0" />
                <span><strong>Reduce AI mistakes.</strong> When the kit is the reference, the model is less likely to write inefficient or wrong code.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 mt-2 shrink-0" />
                <span><strong>Lower AI token usage by 60–70%.</strong> Smaller, predictable components and clear APIs mean shorter prompts and responses.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 mt-2 shrink-0" />
                <span><strong>Increase project build speed by 40–50% with AI.</strong> Pick from the kit, wire with your logic, and ship faster.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 mt-2 shrink-0" />
                <span><strong>Front-end efficiency and scalability are built in.</strong> You focus on product and flow; the kit handles structure and patterns.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 mt-2 shrink-0" />
                <span><strong>The kit is part of your project architecture.</strong> Choose your architecture, plug in the kit, and you’re ready to go.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 mt-2 shrink-0" />
                <span><strong>Choose your project architecture, then build in moments.</strong> The kit and the architecture work together so you can move from idea to UI quickly.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 mt-2 shrink-0" />
                <span><strong>Clear ownership.</strong> The kit and the project system are designed together, so whatever you build on top stays consistent and maintainable.</span>
              </li>
            </ul>

            <p className="text-base leading-relaxed mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              Use the <strong>Components</strong> menu in the sidebar to explore each component, its variants, and copy-paste examples. Every component is documented with usage and code you can reuse or adapt.
            </p>
          </div>
        </Section>
    </DocPageLayout>
  );
}
