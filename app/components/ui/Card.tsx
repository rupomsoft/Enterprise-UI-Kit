import { cn } from "@/app/lib/utils";
import { type CSSProperties, type ReactNode } from "react";
import { cardClass } from "./styles";

export interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  style?: CSSProperties;
}

export function Card({
  children,
  className,
  noPadding,
  style,
}: CardProps) {
  return (
    <div
      className={cn("min-w-0", cardClass, noPadding && "!p-0 overflow-hidden", className)}
      style={style}
    >
      {children}
    </div>
  );
}
