export const GTM_ID = "GTM-54RZX6VV";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function sendGTMEvent(data: Record<string, unknown>): void {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(data);
  }
}
