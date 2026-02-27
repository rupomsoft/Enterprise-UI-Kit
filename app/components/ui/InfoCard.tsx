"use client";

import { type ReactNode } from "react";
import { Card } from "./Card";

export interface InfoCardProps {
  /** Short contextual message */
  children: ReactNode;
  /** Optional icon shown before the message */
  icon?: ReactNode;
  className?: string;
}

export function InfoCard({ children, icon, className = "" }: InfoCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start gap-3">
        {icon && (
          <span className="text-gray-500 dark:text-gray-400 shrink-0 mt-0.5">{icon}</span>
        )}
        <p className="text-sm text-gray-700 dark:text-gray-300">{children}</p>
      </div>
    </Card>
  );
}
