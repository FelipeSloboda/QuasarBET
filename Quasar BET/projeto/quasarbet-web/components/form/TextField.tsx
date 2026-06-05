"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import BaseInput from "@/components/ui/BaseInput";

export type ValidationState = "default" | "success" | "error";

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  icon: LucideIcon;
  value: string;
  onValueChange: (value: string) => void;
  validationState: ValidationState;
  isFocused: boolean;
  isEmpty: boolean;
  errorMessage?: string;
  rightSlot?: ReactNode;
}

const borderColor: Record<ValidationState, string> = {
  default: "var(--color-input-border)",
  success: "var(--color-input-success)",
  error: "var(--color-input-error)",
};

export default function TextField({
  icon: Icon,
  value,
  onValueChange,
  validationState,
  isFocused,
  isEmpty,
  errorMessage,
  rightSlot,
  className = "",
  ...props
}: TextFieldProps) {
  const currentBorderColor = isFocused && isEmpty
    ? "var(--color-input-focus)"
    : borderColor[validationState];

  return (
    <div className="w-full">
      <div className="relative w-full">
        <Icon className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
        <BaseInput
          {...props}
          value={value}
          onChange={(event) => onValueChange(event.currentTarget.value)}
          className={`pl-10 ${rightSlot ? "pr-10" : "pr-4"} ${className}`.trim()}
          style={{ borderColor: currentBorderColor }}
        />
        {rightSlot ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        ) : null}
      </div>
      {errorMessage ? <p className="mt-1 text-xs text-red-400">{errorMessage}</p> : null}
    </div>
  );
}