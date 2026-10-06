export const USERNAME_PATTERN = /^[a-z0-9_]{3,24}$/;

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

export function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateUsername(value: string) {
  return USERNAME_PATTERN.test(value);
}

export function validatePassword(value: string) {
  return value.length >= 10 && value.length <= 128;
}

export function validateDisplayName(value: string) {
  const length = value.trim().length;
  return length >= 2 && length <= 40;
}
