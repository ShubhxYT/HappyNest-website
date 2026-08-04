import type { BookingData } from "./booking";

export async function captureLead(data: BookingData): Promise<boolean> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        check_in: data.checkIn,
        check_out: data.checkOut,
        guests: data.guests ? Number(data.guests) : undefined,
        children: data.children ? Number(data.children) : undefined,
        pets: data.pets ? Number(data.pets) : undefined,
        budget: data.budget || undefined,
        special_requests: data.specialRequests || undefined,
        source: typeof window !== "undefined" ? window.location.href : "",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
