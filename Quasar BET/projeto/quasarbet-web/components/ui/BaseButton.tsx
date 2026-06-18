import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function BaseButton({ children, className = "", ...props }: BaseButtonProps) {
  return (
    <button
      {...props}
      className={`btn-primary text-white font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2 ${className}`.trim()}
    >
      {children}
    </button>
  );
}
