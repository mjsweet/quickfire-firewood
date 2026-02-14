// Utility functions

/**
 * Combines class names, filtering out falsy values
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a phone number for display
 */
export function formatPhone(phone: string): string {
  // Format 1300 numbers: 1300 XXX XXX
  if (phone.startsWith("1300")) {
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  }
  return phone;
}

/**
 * Generates a phone link from a phone number
 */
export function phoneToLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

/**
 * Truncates text to a maximum length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + "...";
}

/**
 * Formats a date for display in Australian format
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Creates a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}
