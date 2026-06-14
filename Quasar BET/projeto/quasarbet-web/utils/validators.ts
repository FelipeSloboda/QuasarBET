export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function hasUppercase(value: string): boolean {
  return /[A-Z]/.test(value);
}

export function hasLowercase(value: string): boolean {
  return /[a-z]/.test(value);
}

export function hasNumber(value: string): boolean {
  return /\d/.test(value);
}

export function isOnlyLetters(value: string): boolean {
  return /^[\p{L}]+$/u.test(value);
}

export function isOnlyLettersAndSpaces(value: string): boolean {
  return /^[\p{L} ]+$/u.test(value);
}

export function hasMinLength(value: string, min: number): boolean {
  return value.length >= min;
}

export function hasLength(value: string, expected: number): boolean {
  return value.length === expected;
}

export function isValidCpfLength(value: string): boolean {
  return value.replace(/\D/g, "").length === 11;
}

export function isPastDateBr(value: string): boolean {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return false;
  }

  const [dayStr, monthStr, yearStr] = value.split("/");
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  const date = new Date(year, month - 1, day);
  const isValidDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

  if (!isValidDate) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minimumAllowedDate = new Date(today);
  minimumAllowedDate.setFullYear(minimumAllowedDate.getFullYear() - 120);

  return date >= minimumAllowedDate && date < today;
}