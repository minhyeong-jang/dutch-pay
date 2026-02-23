"use client";

import { useCallback } from "react";
import { CheckIcon } from "lucide-react";

import { cn } from "~/lib/utils";

// ─── Types ────────────────────────────────────────────

export interface ChipItem {
  id: string;
  label: string;
  color?: string;
}

interface ChipSelectBaseProps {
  items: ChipItem[];
  showColorDot?: boolean;
  size?: "sm" | "md";
  className?: string;
}

interface SingleSelectProps extends ChipSelectBaseProps {
  mode: "single";
  value: string;
  onChange: (id: string) => void;
  showSelectAll?: never;
  showCheck?: never;
}

interface MultiSelectProps extends ChipSelectBaseProps {
  mode: "multi";
  value: string[];
  onChange: (id: string) => void;
  showSelectAll?: boolean;
  onSelectAll?: () => void;
  showCheck?: boolean;
}

export type ChipSelectProps = SingleSelectProps | MultiSelectProps;

// ─── Size variants ────────────────────────────────────

const sizeClasses = {
  sm: "px-2.5 py-1 text-xs gap-1",
  md: "px-3 py-1.5 text-sm gap-1.5",
} as const;

const dotSizeClasses = {
  sm: "size-2",
  md: "size-2.5",
} as const;

// ─── Component ────────────────────────────────────────

export function ChipSelect(props: ChipSelectProps) {
  const {
    items,
    showColorDot = false,
    size = "md",
    className,
  } = props;

  const isSelected = useCallback(
    (id: string) => {
      if (props.mode === "single") {
        return props.value === id;
      }
      return props.value.includes(id);
    },
    [props.mode, props.value],
  );

  const allSelected =
    props.mode === "multi" && props.value.length === items.length;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Select All (multi mode only) */}
      {props.mode === "multi" && props.showSelectAll && props.onSelectAll && (
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={props.onSelectAll}
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span
              className={cn(
                "flex size-4 items-center justify-center rounded border transition-colors",
                allSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input",
              )}
            >
              {allSelected && <CheckIcon className="size-3" />}
            </span>
            전체 선택
          </button>
        </div>
      )}

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const selected = isSelected(item.id);
          const showCheck = props.mode === "multi" && props.showCheck !== false;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => props.onChange(item.id)}
              className={cn(
                "inline-flex items-center rounded-full border font-medium transition-colors",
                sizeClasses[size],
                selected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {showColorDot && item.color && (
                <span
                  className={cn("shrink-0 rounded-full", dotSizeClasses[size])}
                  style={{ backgroundColor: item.color }}
                />
              )}
              {item.label}
              {showCheck && selected && (
                <CheckIcon className={size === "sm" ? "size-3" : "size-3.5"} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
