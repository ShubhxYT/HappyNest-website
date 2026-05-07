import type { BookingData } from "./booking";
import { buildBookingMessage } from "./booking";

export async function captureLead(data: BookingData): Promise<boolean> {
  try {
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        message: buildBookingMessage(data),
        timestamp: new Date().toISOString(),
        source: typeof window !== "undefined" ? window.location.href : "",
      }),
    });
    return res.ok;
  } catch {
    // Never block the user from WhatsApp because storage failed
    return false;
  }
}
