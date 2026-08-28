// Small display-formatting helpers shared across components.
// Kept separate from the data layer — this is presentation, not data access.

export function formatPrice(price: number): string {
  return `Rp${price.toLocaleString("id-ID")}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
