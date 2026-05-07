"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Calendar,
  Users,
  Dog,
  MessageSquare,
  Mail,
  Phone,
  User,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { WhatsappLogo } from "@phosphor-icons/react";
import SectionLabel from "./SectionLabel";
import {
  type BookingData,
  EMPTY_BOOKING,
  buildWhatsAppUrl,
} from "@/lib/booking";
import { captureLead } from "@/lib/leadCapture";
import { trackBookingEvent } from "@/lib/analytics";

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  children?: string;
  pets?: string;
  specialRequests?: string;
}

function validateForm(data: BookingData): FormErrors {
  const errors: FormErrors = {};
  const today = new Date().toISOString().split("T")[0];

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (
    !data.phone.trim() ||
    !/^[+]?[\d\s\-()]{10,15}$/.test(data.phone.trim())
  ) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (
    !data.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  ) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.checkIn) {
    errors.checkIn = "Please select a check-in date.";
  } else if (data.checkIn < today) {
    errors.checkIn = "Check-in date cannot be in the past.";
  }
  if (!data.checkOut) {
    errors.checkOut = "Please select a check-out date.";
  } else if (data.checkIn && data.checkOut <= data.checkIn) {
    errors.checkOut = "Check-out must be after check-in.";
  }
  if (!data.guests || parseInt(data.guests, 10) < 1) {
    errors.guests = "At least 1 guest required.";
  }
  if (data.children === "") {
    errors.children = "Enter 0 if no children.";
  }
  if (data.pets === "") {
    errors.pets = "Enter 0 if no pets.";
  }
  if (!data.specialRequests.trim()) {
    errors.specialRequests = "Please share any requests, or type 'None'.";
  }

  return errors;
}

function inputBase(hasError: boolean): string {
  return [
    "w-full bg-stone-50 dark:bg-surface-low border rounded-xl px-4 py-3",
    "text-stone-800 dark:text-on-surface text-sm font-light",
    "placeholder:text-stone-400 dark:placeholder:text-on-surface-dim/50",
    "focus:outline-none focus:ring-2 focus:ring-amber-400/50 dark:focus:ring-primary-bright/30",
    "transition-colors duration-150",
    hasError
      ? "border-red-400 dark:border-red-500/70"
      : "border-stone-200 dark:border-outline-faint/30 hover:border-stone-300 dark:hover:border-outline-faint/60",
  ].join(" ");
}

interface FieldProps {
  label: string;
  error?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Field({ label, error, icon, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-xs font-medium tracking-[0.08em] text-stone-500 dark:text-on-surface-dim uppercase">
        <span className="text-amber-600 dark:text-amber-400">{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 font-light">
          {error}
        </p>
      )}
    </div>
  );
}

export default function BookingSection() {
  const [form, setForm] = useState<BookingData>(EMPTY_BOOKING);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);
  const hasTrackedStart = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          trackBookingEvent("booking_section_viewed");
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;

      if (!hasTrackedStart.current) {
        hasTrackedStart.current = true;
        trackBookingEvent("booking_form_started");
      }

      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorEl = sectionRef.current?.querySelector(
        "[data-field-error='true']"
      );
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("loading");
    trackBookingEvent("booking_form_submitted", {
      guests: form.guests,
      budget: form.budget,
    });

    // Open WhatsApp immediately while still in the user gesture context
    window.open(buildWhatsAppUrl(form), "_blank", "noopener,noreferrer");
    trackBookingEvent("booking_whatsapp_launched");

    // Save lead without blocking the success state
    captureLead(form).then((ok) => {
      trackBookingEvent(ok ? "booking_lead_saved" : "booking_lead_failed");
    });

    setStatus("success");
    setForm(EMPTY_BOOKING);
    setErrors({});
    hasTrackedStart.current = false;
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream dark:bg-surface"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex justify-center mb-4">
          <SectionLabel>Reserve Your Stay</SectionLabel>
        </div>
        <h2 className="font-outfit text-4xl lg:text-5xl font-light text-stone-800 dark:text-on-surface text-center mt-4 mb-4">
          Plan Your{" "}
          <span className="italic text-amber-600 dark:text-primary-bright">
            Perfect Getaway
          </span>
        </h2>
        <p className="text-stone-500 dark:text-on-surface-dim text-center max-w-xl mx-auto mb-12 font-light leading-relaxed">
          Fill in your details and we&apos;ll confirm availability, pricing, and
          everything in between — straight on WhatsApp.
        </p>

        {status === "success" ? (
          <div className="max-w-xl mx-auto bg-white dark:bg-surface-container rounded-2xl p-10 shadow-sm border border-stone-100 dark:border-transparent text-center">
            <div className="w-16 h-16 bg-amber-50 dark:bg-amber-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle
                size={32}
                className="text-amber-600 dark:text-amber-400"
              />
            </div>
            <h3 className="font-outfit text-2xl font-light text-stone-800 dark:text-on-surface mb-3">
              WhatsApp Opened!
            </h3>
            <p className="text-stone-500 dark:text-on-surface-dim font-light leading-relaxed mb-8">
              Your booking inquiry has been pre-filled in WhatsApp. Just hit
              send and we&apos;ll get back to you within a few hours to confirm
              availability.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="px-6 py-2.5 border border-stone-200 dark:border-outline-faint/50 text-stone-600 dark:text-on-surface-dim text-sm rounded-xl hover:bg-stone-50 dark:hover:bg-surface-bright transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="max-w-3xl mx-auto bg-white dark:bg-surface-container rounded-2xl p-8 lg:p-10 shadow-sm border border-stone-100 dark:border-transparent"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div data-field-error={!!errors.fullName}>
                <Field
                  label="Full Name"
                  error={errors.fullName}
                  icon={<User size={15} />}
                >
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    className={inputBase(!!errors.fullName)}
                  />
                </Field>
              </div>

              {/* Phone */}
              <div data-field-error={!!errors.phone}>
                <Field
                  label="Phone Number"
                  error={errors.phone}
                  icon={<Phone size={15} />}
                >
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className={inputBase(!!errors.phone)}
                  />
                </Field>
              </div>

              {/* Email — full width */}
              <div className="md:col-span-2" data-field-error={!!errors.email}>
                <Field
                  label="Email Address"
                  error={errors.email}
                  icon={<Mail size={15} />}
                >
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputBase(!!errors.email)}
                  />
                </Field>
              </div>

              {/* Check-in */}
              <div data-field-error={!!errors.checkIn}>
                <Field
                  label="Check-in Date"
                  error={errors.checkIn}
                  icon={<Calendar size={15} />}
                >
                  <input
                    type="date"
                    name="checkIn"
                    value={form.checkIn}
                    onChange={handleChange}
                    min={today}
                    className={inputBase(!!errors.checkIn)}
                  />
                </Field>
              </div>

              {/* Check-out */}
              <div data-field-error={!!errors.checkOut}>
                <Field
                  label="Check-out Date"
                  error={errors.checkOut}
                  icon={<Calendar size={15} />}
                >
                  <input
                    type="date"
                    name="checkOut"
                    value={form.checkOut}
                    onChange={handleChange}
                    min={form.checkIn || today}
                    className={inputBase(!!errors.checkOut)}
                  />
                </Field>
              </div>

              {/* Guests / Children / Pets */}
              <div className="md:col-span-2 grid grid-cols-3 gap-4">
                <div data-field-error={!!errors.guests}>
                  <Field
                    label="Guests"
                    error={errors.guests}
                    icon={<Users size={15} />}
                  >
                    <input
                      type="number"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      placeholder="e.g. 8"
                      min="1"
                      max="18"
                      className={inputBase(!!errors.guests)}
                    />
                  </Field>
                </div>
                <div data-field-error={!!errors.children}>
                  <Field
                    label="Children"
                    error={errors.children}
                    icon={<Users size={15} />}
                  >
                    <input
                      type="number"
                      name="children"
                      value={form.children}
                      onChange={handleChange}
                      placeholder="e.g. 2"
                      min="0"
                      className={inputBase(!!errors.children)}
                    />
                  </Field>
                </div>
                <div data-field-error={!!errors.pets}>
                  <Field
                    label="Pets"
                    error={errors.pets}
                    icon={<Dog size={15} />}
                  >
                    <input
                      type="number"
                      name="pets"
                      value={form.pets}
                      onChange={handleChange}
                      placeholder="e.g. 1"
                      min="0"
                      className={inputBase(!!errors.pets)}
                    />
                  </Field>
                </div>
              </div>

              {/* Special Requests — full width */}
              <div
                className="md:col-span-2"
                data-field-error={!!errors.specialRequests}
              >
                <Field
                  label="Special Requests"
                  error={errors.specialRequests}
                  icon={<MessageSquare size={15} />}
                >
                  <textarea
                    name="specialRequests"
                    value={form.specialRequests}
                    onChange={handleChange}
                    placeholder="Early check-in, dietary preferences, occasions to celebrate — or type 'None'."
                    rows={3}
                    className={`${inputBase(!!errors.specialRequests)} resize-none`}
                  />
                </Field>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2.5 px-8 py-4 bg-amber-600 hover:bg-amber-700 dark:bg-primary-bright dark:text-surface dark:hover:opacity-90 text-white font-semibold text-sm tracking-[0.12em] uppercase rounded-xl transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Opening WhatsApp…
                  </>
                ) : (
                  <>
                    <WhatsappLogo size={20} weight="fill" />
                    Send Booking Inquiry on WhatsApp
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-stone-400 dark:text-on-surface-dim font-light">
                Your details will open pre-filled in WhatsApp. We reply within a
                few hours.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
