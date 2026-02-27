"use client";

import dynamic from "next/dynamic";
import { Divider } from "@/app/components/ui";
import { ButtonSection } from "@/app/components/showcase/sections/ButtonSection";
import { BadgeSection } from "@/app/components/showcase/sections/BadgeSection";
import { ButtonGroupSection } from "@/app/components/showcase/sections/ButtonGroupSection";
import { CalendarSection } from "@/app/components/showcase/sections/CalendarSection";
import { CardSection } from "@/app/components/showcase/sections/CardSection";
import { CarouselSection } from "@/app/components/showcase/sections/CarouselSection";
import { InputSearchSection } from "@/app/components/showcase/sections/InputSearchSection";
import { SelectSection } from "@/app/components/showcase/sections/SelectSection";
import { CheckboxSwitchSection } from "@/app/components/showcase/sections/CheckboxSwitchSection";
import { TextareaSection } from "@/app/components/showcase/sections/TextareaSection";
import { FormFieldSection } from "@/app/components/showcase/sections/FormFieldSection";
import { AlertSection } from "@/app/components/showcase/sections/AlertSection";
import { AlertDialogSection } from "@/app/components/showcase/sections/AlertDialogSection";
import { AvatarSection } from "@/app/components/showcase/sections/AvatarSection";
import { BreadcrumbSection } from "@/app/components/showcase/sections/BreadcrumbSection";
import { ProgressSection } from "@/app/components/showcase/sections/ProgressSection";
import { PaginationSection } from "@/app/components/showcase/sections/PaginationSection";
import { TagSection } from "@/app/components/showcase/sections/TagSection";
import { TabsSection } from "@/app/components/showcase/sections/TabsSection";
import { BorderedTableSection } from "@/app/components/showcase/sections/BorderedTableSection";
import { BorderedListTableSection } from "@/app/components/showcase/sections/BorderedListTableSection";
import { VirtualizedDataTableSection } from "@/app/components/showcase/sections/VirtualizedDataTableSection";
import { VirtualizedListViewSection } from "@/app/components/showcase/sections/VirtualizedListViewSection";
import { EmptyStateSection } from "@/app/components/showcase/sections/EmptyStateSection";
import { AccordionSection } from "@/app/components/showcase/sections/AccordionSection";
import { RadioSection } from "@/app/components/showcase/sections/RadioSection";
import { SliderSection } from "@/app/components/showcase/sections/SliderSection";
import { SkeletonSection } from "@/app/components/showcase/sections/SkeletonSection";
import { SpinnerSection } from "@/app/components/showcase/sections/SpinnerSection";
import { TimelineSection } from "@/app/components/showcase/sections/TimelineSection";
import { LinkSection } from "@/app/components/showcase/sections/LinkSection";
import { IconButtonIconBoxSection } from "@/app/components/showcase/sections/IconButtonIconBoxSection";
import { DropdownMenuSection } from "@/app/components/showcase/sections/DropdownMenuSection";
import { ContextMenuSection } from "@/app/components/showcase/sections/ContextMenuSection";
import { ModalSection } from "@/app/components/showcase/sections/ModalSection";
import { DrawerSection } from "@/app/components/showcase/sections/DrawerSection";
import { PopoverSection } from "@/app/components/showcase/sections/PopoverSection";
import { ToastSection } from "@/app/components/showcase/sections/ToastSection";
import { ComboboxSection } from "@/app/components/showcase/sections/ComboboxSection";
import { StepperSection } from "@/app/components/showcase/sections/StepperSection";
import { ToggleButtonSection } from "@/app/components/showcase/sections/ToggleButtonSection";
import { TooltipSection } from "@/app/components/showcase/sections/TooltipSection";
import { FileUploadSection } from "@/app/components/showcase/sections/FileUploadSection";
import { TypographySection } from "@/app/components/showcase/sections/TypographySection";
import { RadioGroupSection } from "@/app/components/showcase/sections/RadioGroupSection";
import { AvatarSkeletonSection } from "@/app/components/showcase/sections/AvatarSkeletonSection";
import { CardSkeletonSection } from "@/app/components/showcase/sections/CardSkeletonSection";
import { TextSkeletonSection } from "@/app/components/showcase/sections/TextSkeletonSection";
import { FormSkeletonSection } from "@/app/components/showcase/sections/FormSkeletonSection";
import { TableSkeletonSection } from "@/app/components/showcase/sections/TableSkeletonSection";

const RichTextEditorSection = dynamic(
  () => import("@/app/components/showcase/sections/RichTextEditorSection").then((m) => ({ default: m.RichTextEditorSection })),
  { ssr: false }
);

const AreaChartSection = dynamic(
  () => import("@/app/components/showcase/sections/AreaChartSection").then((m) => ({ default: m.AreaChartSection })),
  { ssr: false }
);

const BarChartSection = dynamic(
  () => import("@/app/components/showcase/sections/BarChartSection").then((m) => ({ default: m.BarChartSection })),
  { ssr: false }
);

const LineChartSection = dynamic(
  () => import("@/app/components/showcase/sections/LineChartSection").then((m) => ({ default: m.LineChartSection })),
  { ssr: false }
);

const PieChartSection = dynamic(
  () => import("@/app/components/showcase/sections/PieChartSection").then((m) => ({ default: m.PieChartSection })),
  { ssr: false }
);

const DoughnutChartSection = dynamic(
  () => import("@/app/components/showcase/sections/DoughnutChartSection").then((m) => ({ default: m.DoughnutChartSection })),
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
