"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

export interface ActionCardProps {
  /** Card title (e.g. Create New Order) */
  title: string;
  /** Short description below the title */
  description?: string;
  /** Primary action: label and either href or onClick */
  primaryAction: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Optional icon above or beside the title */
  icon?: ReactNode;
  className?: string;
}

export function ActionCard({
  title,
  description,
  primaryAction,
  icon,
  className = "",
}: ActionCardProps) {
  return (
    <Card className={className}>
      <div className="flex flex-col gap-3">
        <div>
          {icon && (
            <span className="inline-flex text-gray-500 dark:text-gray-400 mb-2">{icon}</span>
          )}
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          {description != null && description !== "" && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
        {primaryAction.href ? (
          <Link href={primaryAction.href}>
            <Button variant="primary">{primaryAction.label}</Button>
          </Link>
        ) : (
          <Button variant="primary" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
        )}
      </div>
    </Card>
  );
}
