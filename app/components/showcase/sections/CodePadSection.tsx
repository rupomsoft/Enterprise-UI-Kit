"use client";

import { CodePad, Section } from "@/app/components/ui";

const exampleTsx = `import { Button } from "@/app/components/ui";

export function MyComponent() {
  return (
    <Button variant="primary" onClick={() => alert("Hi")}>
      Click me
    </Button>
  );
}`;

const exampleBash = `npm install
npm run dev`;

const exampleJson = `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true
}`;

export function CodePadSection() {
  return (
    <Section
      title="Code Pad"
      description="Reusable code block for documentation and examples. Optional language label, title, and copy-to-clipboard."
      block
    >
      <div className="space-y-4 w-full min-w-0 max-w-2xl">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Basic (copy only)
          </p>
          <CodePad code={exampleBash} showCopy />
        </div>

        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            With language label
          </p>
          <CodePad code={exampleJson} language="json" />
        </div>

        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            With title and language (e.g. usage example)
          </p>
          <CodePad
            code={exampleTsx}
            title="Button usage"
            language="tsx"
          />
        </div>

        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            No copy button
          </p>
          <CodePad code="const x = 1;" language="js" showCopy={false} />
        </div>
      </div>
    </Section>
  );
}
