"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { FormFieldSection } from "@/app/components/showcase/sections/FormFieldSection";
import { InputSearchSection } from "@/app/components/showcase/sections/InputSearchSection";
import { TextareaSection } from "@/app/components/showcase/sections/TextareaSection";
import { SelectSection } from "@/app/components/showcase/sections/SelectSection";
import { CheckboxSwitchSection } from "@/app/components/showcase/sections/CheckboxSwitchSection";
import { RadioSection } from "@/app/components/showcase/sections/RadioSection";
import { RadioGroupSection } from "@/app/components/showcase/sections/RadioGroupSection";
import { FileUploadSection } from "@/app/components/showcase/sections/FileUploadSection";
import { SliderSection } from "@/app/components/showcase/sections/SliderSection";
import { ComboboxSection } from "@/app/components/showcase/sections/ComboboxSection";
import { Divider } from "@/app/components/ui";

const importCode = `import {
  FormField,
  Input,
  SearchInput,
  Textarea,
  Select,
  SearchableDropdown,
  Checkbox,
  Switch,
  Radio,
  RadioGroup,
  FileUpload,
  Slider,
  Combobox,
} from "@/app/components/ui";`;

const formFieldCode = `<FormField label="Field" hint="Optional hint">
  <Input placeholder="Inside FormField" />
</FormField>
<FormField label="Required" error="This field is required">
  <Input />
</FormField>`;

const inputCode = `<Input placeholder="Placeholder" />
<Input placeholder="Disabled" disabled />`;

const searchInputCode = `<SearchInput placeholder="Search..." />`;

const textareaCode = `<Textarea label="Message" placeholder="Enter text..." rows={3} />`;

const selectCode = `const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
];

<Select label="Choose" options={options} placeholder="Select..." />`;

const searchableDropdownCode = `const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

<SearchableDropdown
  label="Country"
  options={countryOptions}
  value={value}
  onChange={setValue}
  placeholder="Select country..."
  searchPlaceholder="Search..."
/>`;

const checkboxSwitchCode = `<Checkbox label="Accept terms" />
<Switch checked={checked} onCheckedChange={setChecked} label="Toggle" />`;

const radioCode = `<Radio
  name="demo"
  options={[
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
  ]}
  value={value}
  onChange={setValue}
/>`;

const radioGroupCode = `<RadioGroup
  name="radiogroup"
  label="Choose one"
  options={[
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
  ]}
  value={value}
  onChange={setValue}
  hint="Optional hint"
/>`;

const fileUploadCode = `<FileUpload label="Upload" hint="Drag and drop or click" />`;

const sliderCode = `<Slider value={value} onValueChange={setValue} min={0} max={100} />
<span>{value}</span>`;

const comboboxCode = `<Combobox
  value={value}
  onChange={setValue}
  open={open}
  onOpenChange={setOpen}
  options={["Apple", "Banana", "Cherry"]}
  placeholder="Type or choose..."
  label="Fruit"
/>`;

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: importCode, language: "tsx" },
  { label: "FormField", code: formFieldCode, language: "tsx" },
  { label: "Input", code: inputCode, language: "tsx" },
  { label: "SearchInput", code: searchInputCode, language: "tsx" },
  { label: "Textarea", code: textareaCode, language: "tsx" },
  { label: "Select", code: selectCode, language: "tsx" },
  { label: "SearchableDropdown", code: searchableDropdownCode, language: "tsx" },
  { label: "Checkbox & Switch", code: checkboxSwitchCode, language: "tsx" },
  { label: "Radio", code: radioCode, language: "tsx" },
  { label: "RadioGroup", code: radioGroupCode, language: "tsx" },
  { label: "FileUpload", code: fileUploadCode, language: "tsx" },
  { label: "Slider", code: sliderCode, language: "tsx" },
  { label: "Combobox", code: comboboxCode, language: "tsx" },
];

export default function FormPage() {
  return (
    <DocPageLayout>
      <FormFieldSection />
      <Divider />
      <InputSearchSection />
      <Divider />
      <TextareaSection />
      <Divider />
      <SelectSection />
      <Divider />
      <CheckboxSwitchSection />
      <Divider />
      <RadioSection />
      <Divider />
      <RadioGroupSection />
      <Divider />
      <FileUploadSection />
      <Divider />
      <SliderSection />
      <Divider />
      <ComboboxSection />
      <Divider />
      <HowToUseSection
        description="Form-related components from the UI library. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
