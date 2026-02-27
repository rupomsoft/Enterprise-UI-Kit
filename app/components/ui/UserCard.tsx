"use client";

import { type ReactNode } from "react";
import { Card } from "./Card";

export interface UserCardProps {
  /** Avatar (e.g. Avatar with initials or image) */
  avatar: ReactNode;
  /** Display name */
  name: string;
  /** Role, email, or other subtitle */
  roleOrEmail?: string;
  /** Action buttons or links */
  actions?: ReactNode;
  className?: string;
}

export function UserCard({
  avatar,
  name,
  roleOrEmail,
  actions,
  className = "",
}: UserCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start gap-3">
        <div className="shrink-0">{avatar}</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{name}</p>
          {roleOrEmail != null && roleOrEmail !== "" && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">{roleOrEmail}</p>
          )}
          {actions != null && (
            <div className="flex flex-wrap items-center gap-2 mt-3">{actions}</div>
          )}
        </div>
      </div>
    </Card>
  );
}
