// ============================================
// Booking Types
// ============================================

export interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  children: number;
  pets: boolean;
  budget: string;
  specialRequests: string;
}

export const EMPTY_BOOKING: BookingData = {
  fullName: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  guests: 2,
  children: 0,
  pets: false,
  budget: "",
  specialRequests: "",
};

// ============================================
// Lead Types
// ============================================

export interface LeadData {
  timestamp: string;
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  children: number;
  pets: boolean;
  budget: string;
  specialRequests: string;
  source: string;
}

// ============================================
// Analytics Types
// ============================================

export type AnalyticsEvent =
  | "page_view"
  | "booking_start"
  | "booking_submit"
  | "booking_success"
  | "whatsapp_click"
  | "section_view";

export interface AnalyticsData {
  event: AnalyticsEvent;
  timestamp: string;
  path?: string;
  metadata?: Record<string, unknown>;
}

// ============================================
// Component Prop Types
// ============================================

export interface SectionProps {
  className?: string;
  id?: string;
}

export interface ThemeToggleProps {
  className?: string;
}

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}