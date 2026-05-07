export const WHATSAPP_NUMBER = "919167928471";

export interface BookingData {
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  children: string;
  pets: string;
  budget: string;
  specialRequests: string;
}

export const EMPTY_BOOKING: BookingData = {
  fullName: "",
  phone: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: "",
  children: "",
  pets: "",
  budget: "",
  specialRequests: "",
};

export const BUDGET_OPTIONS = [
  "Under ₹1,00,000",
  "₹1,00,000 – ₹1,50,000",
  "₹1,50,000 – ₹2,00,000",
  "₹2,00,000 – ₹2,50,000",
  "₹2,50,000+",
] as const;

export function buildBookingMessage(data: BookingData): string {
  return `Hello HappyNest team, I would like to book Blanc Belle.

Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}
Guests: ${data.guests}
Children: ${data.children}
Pets: ${data.pets}
Budget: ${data.budget}
Special requests: ${data.specialRequests}

Please share availability and total pricing. Thank you.`;
}

export function buildWhatsAppUrl(data: BookingData): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildBookingMessage(data)
  )}`;
}
