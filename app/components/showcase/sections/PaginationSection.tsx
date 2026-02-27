"use client";

import { Pagination } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function PaginationSection({
  page,
  setPage,
}: {
  page: number;
  setPage: (p: number) => void;
}) {
  return (
    <Section title="Pagination">
      <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
    </Section>
  );
}
