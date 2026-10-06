export function formatDate(value: string | null) {
  if (!value) return "Ongoing";
  const date = new Date(value.includes("T") ? value : value + "T12:00:00Z");
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
