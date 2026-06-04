export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function hasMinLength(value: string, min: number): boolean {
  return value.length >= min;
}

export function isValidCpfLength(value: string): boolean {
  return value.replace(/\D/g, "").length === 11;
}