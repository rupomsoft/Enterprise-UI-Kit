"use client";

import dynamic from "next/dynamic";
import { Divider } from "@/app/components/ui";
import { ButtonSection } from "./sections/ButtonSection";
import { BadgeSection } from "./sections/BadgeSection";
import { ButtonGroupSection } from "./sections/ButtonGroupSection";
import { CalendarSection } from "./sections/CalendarSection";
import { CardSection } from "./sections/CardSection";
import { CarouselSection } from "./sections/CarouselSection";
import { InputSearchSection } from "./sections/InputSearchSection";
import { SelectSection } from "./sections/SelectSection";
import { CheckboxSwitchSection } from "./sections/CheckboxSwitchSection";
import { TextareaSection } from "./sections/TextareaSection";
import { FormFieldSection } from "./sections/FormFieldSection";
import { AlertSection } from "./sections/AlertSection";
import { AlertDialogSection } from "./sections/AlertDialogSection";
import { AvatarSection } from "./sections/AvatarSection";
import { BreadcrumbSection } from "./sections/BreadcrumbSection";
import { ProgressSection } from "./sections/ProgressSection";
import { PaginationSection } from "./sections/PaginationSection";
import { TagSection } from "./sections/TagSection";
import { TabsSection } from "./sections/TabsSection";
import { BorderedTableSection } from "./sections/BorderedTableSection";
import { BorderedListTableSection } from "./sections/BorderedListTableSection";
import { VirtualizedDataTableSection } from "./sections/VirtualizedDataTableSection";
import { VirtualizedListViewSection } from "./sections/VirtualizedListViewSection";
import { EmptyStateSection } from "./sections/EmptyStateSection";
import { AccordionSection } from "./sections/AccordionSection";
import { RadioSection } from "./sections/RadioSection";
import { SliderSection } from "./sections/SliderSection";
import { SkeletonSection } from "./sections/SkeletonSection";
import { SpinnerSection } from "./sections/SpinnerSection";
import { TimelineSection } from "./sections/TimelineSection";
import { LinkSection } from "./sections/LinkSection";
import { IconButtonIconBoxSection } from "./sections/IconButtonIconBoxSection";
import { DropdownMenuSection } from "./sections/DropdownMenuSection";
import { ContextMenuSection } from "./sections/ContextMenuSection";
import { ModalSection } from "./sections/ModalSection";
import { DrawerSection } from "./sections/DrawerSection";
import { PopoverSection } from "./sections/PopoverSection";
import { ToastSection } from "./sections/ToastSection";
import { ComboboxSection } from "./sections/ComboboxSection";
import { StepperSection } from "./sections/StepperSection";
import { ToggleButtonSection } from "./sections/ToggleButtonSection";
import { TooltipSection } from "./sections/TooltipSection";
import { FileUploadSection } from "./sections/FileUploadSection";
import { TypographySection } from "./sections/TypographySection";
import { RadioGroupSection } from "./sections/RadioGroupSection";
import { AvatarSkeletonSection } from "./sections/AvatarSkeletonSection";
import { CardSkeletonSection } from "./sections/CardSkeletonSection";
import { TextSkeletonSection } from "./sections/TextSkeletonSection";
import { FormSkeletonSection } from "./sections/FormSkeletonSection";
import { TableSkeletonSection } from "./sections/TableSkeletonSection";

const RichTextEditorSection = dynamic(
  () => import("./sections/RichTextEditorSection").then((m) => ({ default: m.RichTextEditorSection })),
  { ssr: false }
);

const AreaChartSection = dynamic(
  () => import("./sections/AreaChartSection").then((m) => ({ default: m.AreaChartSection })),
  { ssr: false }
);

const BarChartSection = dynamic(
  () => import("./sections/BarChartSection").then((m) => ({ default: m.BarChartSection })),
  { ssr: false }
);

const LineChartSection = dynamic(
  () => import("./sections/LineChartSection").then((m) => ({ default: m.LineChartSection })),
  { ssr: false }
);

const PieChartSection = dynamic(
  () => import("./sections/PieChartSection").then((m) => ({ default: m.PieChartSection })),
  { ssr: false }
);

const DoughnutChartSection = dynamic(
  () => import("./sections/DoughnutChartSection").then((m) => ({ default: m.DoughnutChartSection })),
  { ssr: false }
);

export function UIKitShowcase() {
  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
      <ButtonSection />
      <Divider />
      <ButtonGroupSection />
      <Divider />
      <BadgeSection />
      <Divider />
      <CalendarSection />
      <Divider />
      <CardSection />
      <Divider />
      <CarouselSection />
      <Divider />
      <InputSearchSection />
      <Divider />
      <SelectSection />
      <Divider />
      <CheckboxSwitchSection />
      <Divider />
      <AlertSection />
      <Divider />
      <AlertDialogSection />
      <Divider />
      <AvatarSection />
      <Divider />
      <BreadcrumbSection />
      <Divider />
      <ProgressSection />
      <Divider />
      <TagSection />
      <Divider />
      <TabsSection />
      <Divider />
      <BorderedTableSection />
      <Divider />
      <BorderedListTableSection />
      <Divider />
      <VirtualizedDataTableSection />
      <Divider />
      <VirtualizedListViewSection />
      <Divider />
      <EmptyStateSection />
      <Divider />
      <AccordionSection />
      <Divider />
      <RadioSection />
      <Divider />
      <SliderSection />
      <Divider />
      <TextareaSection />
      <Divider />
      <RichTextEditorSection />
      <Divider />
      <SkeletonSection />
      <Divider />
      <SpinnerSection />
      <Divider />
      <TimelineSection />
      <Divider />
      <LinkSection />
      <Divider />
      <IconButtonIconBoxSection />
      <Divider />
      <DropdownMenuSection />
      <Divider />
      <ContextMenuSection />
      <Divider />
      <ModalSection />
      <Divider />
      <DrawerSection />
      <Divider />
      <PopoverSection />
      <Divider />
      <ToastSection />
      <Divider />
      <ComboboxSection />
      <Divider />
      <StepperSection />
      <Divider />
      <ToggleButtonSection />
      <Divider />
      <TooltipSection />
      <Divider />
      <FormFieldSection />
      <Divider />
      <FileUploadSection />
      <Divider />
      <AreaChartSection />
      <Divider />
      <BarChartSection />
      <Divider />
      <LineChartSection />
      <Divider />
      <PieChartSection />
      <Divider />
      <DoughnutChartSection />
      <Divider />
      <TypographySection />
      <Divider />
      <RadioGroupSection />
      <Divider />
      <AvatarSkeletonSection />
      <Divider />
      <CardSkeletonSection />
      <Divider />
      <TextSkeletonSection />
      <Divider />
      <FormSkeletonSection />
      <Divider />
      <TableSkeletonSection />
    </div>
  );
}
