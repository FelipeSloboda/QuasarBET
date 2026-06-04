import type { InputHTMLAttributes } from "react";

export default function BaseInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;

  return <input {...rest} className={`input-base w-full rounded-md pl-10 pr-4 py-3 ${className}`.trim()} />;
}
