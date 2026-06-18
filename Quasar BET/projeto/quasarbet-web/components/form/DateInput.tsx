"use client";

export default function DateInput() {
  return (
    <input
      type="text"
      placeholder="Data de nascimento"
      className="input-base w-full rounded-md pl-10 pr-4 py-3"
      onFocus={(e) => (e.currentTarget.type = "date")}
      onBlur={(e) => {
        if (!e.currentTarget.value) e.currentTarget.type = "text";
      }}
    />
  );
}