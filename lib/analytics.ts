export type BookingEventName =
  | "booking_section_viewed"
  | "booking_form_started"
  | "booking_form_submitted"
  | "booking_whatsapp_launched"
  | "booking_lead_saved"
  | "booking_lead_failed";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackBookingEvent(
  name: BookingEventName,
  payload?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...payload });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }
}
