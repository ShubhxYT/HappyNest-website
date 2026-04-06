# Add Missing Content from Blanc Belle MD

## Goal

Bring the website in line with the full `happynest_blanc_belle.md` spec by adding Meals & Add-On Pricing, House Rules, 6th bedroom, pool dimensions, missing amenities, terrace, and updated footer details.

## Prerequisites

- [x] Create and switch to branch: `git checkout -b feat/content-additions`
- [x] Run `npm install` to ensure dependencies are up to date
- [x] Run `npm run dev` to confirm the site builds and runs cleanly

---

## Step 1: Add Meals & Add-On Pricing Section

### 1.1 Create `components/Meals.tsx`

- [x] Create new file `components/Meals.tsx` with the following complete content:

```tsx
"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  CookingPot,
  Fire,
  MonitorPlay,
  TShirt,
  Flashlight,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface AddOnItem {
  icon: Icon;
  label: string;
  cost: string;
}

const ADD_ONS: AddOnItem[] = [
  { icon: Fire, label: "Bonfire", cost: "₹2,000 for 3 hrs · ₹1,000/extra hr" },
  { icon: CookingPot, label: "BBQ / Barbeque Grill", cost: "₹1,000" },
  { icon: MonitorPlay, label: "Projector", cost: "₹1,500" },
  { icon: TShirt, label: "Washing Machine & Iron", cost: "Complimentary" },
  { icon: Flashlight, label: "Torch & Clothes Dryer", cost: "Complimentary" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const MEAL_NOTES = [
  "All rates are per person, per day",
  "Vegetarian and non-vegetarian available",
  "Breakfast charged separately if no package",
  "Inform meal preference at least 48 hours before check-in",
  "Meals served subject to availability",
  "All food & beverage costs subject to 18% GST",
  "Guests do not have access to the villa kitchen",
];

export default function Meals() {
  return (
    <section className="bg-stone-100 py-24 md:py-36 border-y border-stone-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Dining & Add-Ons
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950">
            Savour Every Moment
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Meal Packages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-outfit text-lg text-stone-950 tracking-tight mb-6">
              Meal Packages
            </h3>

            <div className="space-y-4 mb-8">
              {/* Half Board */}
              <div className="rounded-xl border border-stone-200 bg-cream p-6">
                <h4 className="font-outfit text-xl tracking-tight text-stone-950 mb-2">
                  Half Board
                </h4>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Breakfast + one major meal (lunch or dinner). Perfect for
                  guests who prefer to keep their dining flexible.
                </p>
                <p className="text-sm text-gold font-medium mt-3">
                  Contact us for pricing
                </p>
              </div>

              {/* Full Board */}
              <div className="rounded-xl border border-stone-200 bg-cream p-6">
                <h4 className="font-outfit text-xl tracking-tight text-stone-950 mb-2">
                  Full Board
                </h4>
                <p className="text-sm text-stone-500 leading-relaxed">
                  All meals included — breakfast, lunch, and dinner. Ideal for a
                  completely carefree stay.
                </p>
                <p className="text-sm text-gold font-medium mt-3">
                  Contact us for pricing
                </p>
              </div>
            </div>

            {/* Meal Notes */}
            <ul className="space-y-2">
              {MEAL_NOTES.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2 text-sm text-stone-400"
                >
                  <span className="text-gold mt-1 text-xs">●</span>
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Add-On Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-outfit text-lg text-stone-950 tracking-tight mb-6">
              Add-On Services
            </h3>

            <motion.div
              className="space-y-0"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {ADD_ONS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-center gap-4 py-4 border-t border-stone-200"
                >
                  <item.icon
                    size={22}
                    weight="regular"
                    className="text-stone-500 flex-shrink-0"
                  />
                  <span className="text-base text-stone-950 font-medium">
                    {item.label}
                  </span>
                  <span className="text-xs text-stone-400 ml-auto text-right">
                    {item.cost}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <p className="text-xs text-stone-400 mt-6 leading-relaxed">
              All add-on food &amp; event costs subject to 18% GST. Prices may
              vary during peak season.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

### 1.2 Add `<Meals />` to `app/page.tsx`

- [x] Edit `app/page.tsx` — add import and component between `<Amenities />` and `<Experiences />`:

**Add import** after the `Amenities` import line:

```tsx
import Meals from "@/components/Meals";
```

**Add component** between `<Amenities />` and `<Experiences />`:

```tsx
        <Amenities />
        <Meals />
        <Experiences />
```

### Step 1 Verification Checklist

- [x] `npm run build` completes with no errors
- [x] Meals section appears between Amenities and Experiences on the page
- [x] Two meal package cards display side by side on desktop, stacked on mobile
- [x] Add-On Services table shows 5 items with icons, labels, and pricing
- [x] All 7 meal notes render as a bulleted list
- [x] GST disclaimer text shows below add-on items
- [x] Section uses `bg-stone-100` background (alternating with surrounding `bg-cream` sections)

#### STOP & COMMIT

```
git add components/Meals.tsx app/page.tsx
git commit -m "feat: add Meals & Add-On Pricing section"
```

---

## Step 2: Add House Rules & Policies Section

### 2.1 Create `components/HouseRules.tsx`

- [x] Create new file `components/HouseRules.tsx` with the following complete content:

```tsx
"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Clock,
  PawPrint,
  Users,
  CookingPot,
  Warning,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface Rule {
  icon: Icon;
  title: string;
  detail: string;
}

const RULES: Rule[] = [
  {
    icon: Clock,
    title: "Check-in & Check-out",
    detail: "Check-in: 2:00 PM | Check-out: 2:00 PM",
  },
  {
    icon: ArrowsClockwise,
    title: "Early / Late Flexibility",
    detail:
      "Early check-in and late check-out subject to availability (additional fee may apply)",
  },
  {
    icon: PawPrint,
    title: "Pets Welcome",
    detail: "Pets are welcome at the property",
  },
  {
    icon: Users,
    title: "Visitor Charges",
    detail:
      "Non-staying guests: ₹1,000 + taxes per person per day (up to 4 hours)",
  },
  {
    icon: CookingPot,
    title: "Kitchen Access",
    detail: "Guests do not have access to the villa kitchen",
  },
  {
    icon: Warning,
    title: "Policies",
    detail:
      "Please read all Home Truths, House Rules, and Policies thoroughly before your stay",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HouseRules() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            House Rules & Policies
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950">
            Before You Arrive
          </h2>
        </motion.div>

        {/* Rules grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {RULES.map((rule) => (
            <motion.div
              key={rule.title}
              variants={itemVariants}
              className="flex items-start gap-4 p-6 rounded-xl border border-stone-200 bg-stone-100/50"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cream flex items-center justify-center">
                <rule.icon size={20} weight="regular" className="text-gold" />
              </div>
              <div>
                <h3 className="font-outfit text-base tracking-tight text-stone-950 mb-1">
                  {rule.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {rule.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

### 2.2 Add `<HouseRules />` to `app/page.tsx`

- [x] Edit `app/page.tsx` — add import and component after `<Location />`, before `</main>`:

**Add import** after the `Location` import line:

```tsx
import HouseRules from "@/components/HouseRules";
```

**Add component** after `<Location />`:

```tsx
        <Location />
        <HouseRules />
      </main>
```

### Step 2 Verification Checklist

- [x] `npm run build` completes with no errors
- [x] House Rules section appears between Location and Footer
- [x] 6 rule cards display in a 3-column grid on desktop, single column on mobile
- [x] Each card has an icon in a gold circle, title, and description
- [x] Visitor charges show specific amount: ₹1,000 + taxes
- [x] Cards use stagger animation on scroll

#### STOP & COMMIT

```
git add components/HouseRules.tsx app/page.tsx
git commit -m "feat: add House Rules & Policies section"
```

---

## Step 3: Add 6th Bedroom + Missing Details to Existing Components

### 3.1 Update `components/Spaces.tsx` — Add 6th bedroom

- [x] Add a 6th room to the `ROOMS` array. Since there is no dedicated 6th bedroom image, reuse `grey3.jpg` / `grey4.jpg` (existing grey room alternate angles).

Find the existing `ROOMS` array and add the 6th room entry after the Lime Room:

```tsx
const ROOMS: Room[] = [
  {
    name: "The Blue Room",
    color: "blue",
    floor: "Ground Floor",
    features: ["King-size bed", "Ensuite bathroom", "AC, TV, Wi-Fi"],
    image1: "/images/bedrooms/blue1.jpg",
    image2: "/images/bedrooms/blue2.jpg",
  },
  {
    name: "The Green Room",
    color: "green",
    floor: "Ground Floor",
    features: ["King-size bed", "Ensuite with jacuzzi", "AC, TV, Wi-Fi"],
    image1: "/images/bedrooms/green1.jpg",
    image2: "/images/bedrooms/green2.jpg",
  },
  {
    name: "The Grey Room",
    color: "grey",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite with jacuzzi"],
    image1: "/images/bedrooms/grey1.jpg",
    image2: "/images/bedrooms/grey2.jpg",
  },
  {
    name: "The Brown Room",
    color: "brown",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite bathroom"],
    image1: "/images/bedrooms/brown1.jpg",
    image2: "/images/bedrooms/brown2.jpg",
  },
  {
    name: "The Lime Room",
    color: "lime",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite bathroom"],
    image1: "/images/bedrooms/lime1.jpg",
    image2: "/images/bedrooms/lime2.jpg",
  },
  {
    name: "The Pearl Room",
    color: "pearl",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite bathroom"],
    image1: "/images/bedrooms/grey3.jpg",
    image2: "/images/bedrooms/grey4.jpg",
  },
];
```

### 3.2 Update `components/PoolGarden.tsx` — Add pool dimensions and lawn info

- [x] Add descriptive text below the pinned title. Replace the existing pinned title block:

Find the current pinned title `<div>`:

```tsx
      {/* Pinned title */}
      <div className="absolute top-8 md:top-12 left-6 md:left-10 z-10">
        <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold-light mb-3">
          Pool & Garden
        </p>
        <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-cream">
          Immerse & Unwind
        </h2>
      </div>
```

Replace with:

```tsx
      {/* Pinned title */}
      <div className="absolute top-8 md:top-12 left-6 md:left-10 z-10">
        <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold-light mb-3">
          Pool & Garden
        </p>
        <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-cream mb-3">
          Immerse & Unwind
        </h2>
        <p className="text-sm text-cream/60 max-w-[45ch] leading-relaxed">
          Private pool — 50 × 10 metres, 4 ft deep. Lawn spanning approx.
          400 sq. ft. with gazebo &amp; al fresco seating.
        </p>
      </div>
```

### 3.3 Update `components/Amenities.tsx` — Add pricing and missing items

- [x] Update the `AMENITY_GROUPS` data array to include pricing on add-on items and add missing amenities.

Replace the entire `AMENITY_GROUPS` array with:

```tsx
const AMENITY_GROUPS: AmenityGroup[] = [
  {
    title: "Outdoor",
    items: [
      { icon: SwimmingPool, label: "Private Swimming Pool" },
      { icon: Bathtub, label: "Outdoor Jacuzzi" },
      { icon: Warehouse, label: "Lawn & Gazebo" },
      { icon: Fire, label: "Bonfire", note: "₹2,000 / 3 hrs" },
      { icon: CookingPot, label: "BBQ / Barbeque", note: "₹1,000" },
    ],
  },
  {
    title: "Indoor",
    items: [
      { icon: Snowflake, label: "AC in all rooms" },
      { icon: WifiHigh, label: "Wi-Fi throughout" },
      { icon: Television, label: "TV in all rooms" },
      { icon: Flame, label: "Fireplace" },
      { icon: Thermometer, label: "Heater" },
      { icon: Cube, label: "Refrigerator" },
      { icon: MonitorPlay, label: "Projector", note: "₹1,500" },
      { icon: SpeakerHigh, label: "Music System" },
      { icon: GameController, label: "Indoor & Outdoor Games" },
    ],
  },
  {
    title: "Convenience",
    items: [
      { icon: Lockers, label: "Wardrobe in all rooms" },
      { icon: Coffee, label: "Electric Kettle" },
      { icon: Drop, label: "Geyser in all bathrooms" },
      { icon: Towel, label: "Towels & Basic Toiletries" },
      { icon: TShirt, label: "Washing Machine, Iron & Clothes Dryer", note: "Complimentary" },
      { icon: Flashlight, label: "Torch", note: "Complimentary" },
      { icon: SecurityCamera, label: "CCTV Security" },
      { icon: Wheelchair, label: "Wheelchair Friendly" },
    ],
  },
];
```

- [x] Update imports at the top of `Amenities.tsx` to include the new icons. Replace the existing icon imports:

```tsx
import {
  SwimmingPool,
  Bathtub,
  Fire,
  CookingPot,
  WifiHigh,
  Television,
  Snowflake,
  MonitorPlay,
  SpeakerHigh,
  GameController,
  TShirt,
  Flashlight,
  SecurityCamera,
  Wheelchair,
  Flame,
  Warehouse,
  Coffee,
  Lockers,
  Thermometer,
  Cube,
  Drop,
  Towel,
} from "@phosphor-icons/react";
```

- [x] Add a GST note at the very end of the Amenities section, after the closing `</div>` of the grid and before the section's final `</div></section>`:

After the grid `</div>` (the one with `className="grid grid-cols-1 md:grid-cols-[2fr_1fr]..."`), add:

```tsx
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs text-stone-400 mt-10"
        >
          All add-on costs subject to 18% GST.
        </motion.p>
```

### 3.4 Update `components/Footer.tsx` — Add specific visitor charges and early check-in note

- [x] Replace the House Rules list in the Footer:

Find the existing `<ul>`:

```tsx
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Check-in: 2:00 PM</li>
              <li>Check-out: 2:00 PM</li>
              <li>Pets welcome</li>
              <li>No access to villa kitchen</li>
              <li>Visitor charges apply</li>
            </ul>
```

Replace with:

```tsx
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Check-in: 2:00 PM</li>
              <li>Check-out: 2:00 PM</li>
              <li>Early check-in / late check-out subject to availability</li>
              <li>Pets welcome</li>
              <li>No access to villa kitchen</li>
              <li>Visitor charges: ₹1,000 + taxes per person per day (up to 4 hrs)</li>
            </ul>
```

### Step 3 Verification Checklist

- [x] `npm run build` completes with no errors
- [x] 6th bedroom ("The Pearl Room") appears in the Spaces accordion on desktop and mobile
- [x] Pool dimensions text ("50 × 10 metres, 4 ft deep") is visible in the PoolGarden section
- [x] Lawn area text ("400 sq. ft.") is visible in the PoolGarden section
- [x] Amenities section shows pricing next to Bonfire (₹2,000/3 hrs), BBQ (₹1,000), Projector (₹1,500)
- [x] New amenities visible: Heater, Refrigerator, Geyser, Towels & Basic Toiletries, Clothes Dryer
- [x] Washing Machine/Iron/Clothes Dryer shows "Complimentary" label
- [x] Torch shows "Complimentary" label
- [x] GST note appears at bottom of Amenities section
- [x] Footer shows updated visitor charges with ₹1,000 amount
- [x] Footer shows early check-in/late check-out note

#### STOP & COMMIT

```
git add components/Spaces.tsx components/PoolGarden.tsx components/Amenities.tsx components/Footer.tsx
git commit -m "feat: add 6th bedroom, pool dimensions, missing amenities, updated footer"
```

---

## Step 4: Add Terrace to Living Areas

### 4.1 Update `components/LivingAreas.tsx` — Add Terrace as 4th area

- [x] Add a 4th entry to the `AREAS` array. Since there is no dedicated terrace image, use `main-big-balcony.jpeg` (existing balcony/terrace angle).

Replace the entire `AREAS` array with:

```tsx
const AREAS: AreaBlock[] = [
  {
    title: "Living Area",
    description:
      "An expansive living room that seamlessly extends to the outdoor pool area. Comfortably seats up to 15 people, furnished with sofas and equipped with AC, Wi-Fi, TV, a cosy fireplace, and a portable music system.",
    image: "/images/single/sofa-ground.jpg",
    imageAlt: "Ground floor living area with sofas and fireplace",
    imageFirst: true,
  },
  {
    title: "Dining",
    description:
      "Positioned adjacent to the living room, this cosy space seats up to 10 people. The perfect setting for long conversations over home-cooked meals, equipped with AC and TV.",
    image: "/images/single/main-dining.jpg",
    imageAlt: "Dining area with seating for ten guests",
    imageFirst: false,
  },
  {
    title: "Lounge & Game Room",
    description:
      "A first-floor lounge featuring a game centre with table tennis and carrom. Seats up to 15 people, equipped with AC, Wi-Fi, TV, a wired music system. The ideal spot for spirited game tournaments.",
    image: "/images/single/tt-table-sofa-up.jpg",
    imageAlt: "First floor lounge with table tennis and seating",
    imageFirst: true,
  },
  {
    title: "Terrace",
    description:
      "A beautiful and expansive private terrace with alfresco seating. Perfect for midnight stargazing and tranquil dewy mornings, offering breathtaking views of the surrounding landscape.",
    image: "/images/single/main-big-balcony.jpeg",
    imageAlt: "Expansive private terrace with alfresco seating and views",
    imageFirst: false,
  },
];
```

### Step 4 Verification Checklist

- [x] `npm run build` completes with no errors
- [x] Terrace card appears as the 4th entry in the LivingAreas section
- [x] Terrace image loads correctly (uses `main-big-balcony.jpeg`)
- [x] Layout alternates correctly — Terrace has text-left / image-right (same as Dining)
- [x] Mobile layout stacks properly with image above text
- [x] All 4 living area blocks have proper spacing (`space-y-20 md:space-y-32`)

#### STOP & COMMIT

```
git add components/LivingAreas.tsx
git commit -m "feat: add Terrace to Living Areas section"
```

---

## Final Verification

- [x] `npm run build` — zero errors, zero warnings
- [x] Full page scroll-through: VideoHero → About → StatsBar → Spaces (6 rooms) → LivingAreas (4 areas) → PoolGarden (with dimensions) → Amenities (with pricing + GST) → Meals → Experiences → Location → HouseRules → Footer (updated rules)
- [x] Mobile responsiveness: all new sections stack properly on small screens
- [x] All Framer Motion animations fire on scroll into view
- [x] No console errors in browser dev tools
