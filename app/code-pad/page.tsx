"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { CodePadSection } from "@/app/components/showcase/sections/CodePadSection";
import { Divider } from "@/app/components/ui";

const basicCode = `<CodePad code={codeString} />`;

const withLanguageCode = `<CodePad code={codeString} language="tsx" />
<CodePad code={codeString} language="json" />
<CodePad code={codeString} language="bash" />
<CodePad code={codeString} language="js" />
<CodePad code={codeString} language="css" />
<CodePad code={codeString} language="html" />`;

const withTitleCode = `<CodePad code={codeString} title="Button usage" language="tsx" />
<CodePad code={codeString} title="config.json" language="json" />`;

const showCopyCode = `<CodePad code={codeString} showCopy />
<CodePad code={codeString} showCopy={false} language="js" />`;

const withClassNameCode = `<CodePad code={codeString} language="tsx" className="max-w-xl" />`;

const allPropsCode = `<CodePad
  code={codeString}
  language="tsx"
  title="Example.tsx"
  showCopy={true}
  className="max-w-2xl"
/>`;

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: `import { CodePad } from "@/app/components/ui";`, language: "tsx" },
  { label: "Basic (code only)", code: basicCode, language: "tsx" },
  {
    label: "With language",
    code: withLanguageCode,
    language: "tsx",
    title: "Language variants",
  },
  { label: "With title and language", code: withTitleCode, language: "tsx" },
  { label: "showCopy true / false", code: showCopyCode, language: "tsx" },
  { label: "With className", code: withClassNameCode, language: "tsx" },
  { label: "All props", code: allPropsCode, language: "tsx" },
];

export default function CodePadPage() {
  return (
    <DocPageLayout>
      <CodePadSection />
      <Divider />
      <HowToUseSection
        description="CodePad props: code, language?, title?, showCopy? (default true), className?. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
