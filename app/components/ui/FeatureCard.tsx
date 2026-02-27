"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

export interface FeatureCardProps {
  /** Icon for the feature (e.g. module or product icon) */
  icon: ReactNode;
  /** Feature or module name */
  title: string;
  /** Short description */
  description?: string;
  /** Call-to-action: label and either href or onClick */
  cta: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  cta,
  className = "",
}: FeatureCardProps) {
  return (
    <Card className={className}>
      <div className="flex flex-col gap-4">
        <div className="inline-flex w-10 h-10 items-center justify-center rounded-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          {description != null && description !== "" && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        {cta.href ? (
          <Link href={cta.href}>
            <Button variant="primary-outline" className="w-full sm:w-auto">
              {cta.label}
            </Button>
          </Link>
        ) : (
          <Button variant="primary-outline" onClick={cta.onClick} className="w-full sm:w-auto">
            {cta.label}
          </Button>
        )}
      </div>
    </Card>
  );
}
