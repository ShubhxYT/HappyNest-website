# High-End Editorial: Design System Document
 
## 1. Overview & Creative North Star
The **Creative North Star** for this design system is **"The Nocturnal Sanctuary."** 
 
This system rejects the utilitarian flatness of standard hospitality websites in favor of a high-end editorial experience. It is designed to feel like a limited-edition coffee table book—expensive, tactile, and deeply immersive. We move beyond "templates" by employing intentional asymmetry, expansive negative space, and a tonal depth that mimics the transition from dusk to midnight. The goal is to evoke the feeling of an opulent retreat before the guest even arrives.
 
### Key Principles:
*   **Asymmetric Sophistication:** Eschew rigid, centered grids. Use off-kilter text placements and overlapping imagery to create a sense of bespoke curation.
*   **Tonal Atmosphere:** Depth is created through light and shadow, not lines and borders.
*   **Generous Breathing Room:** White space (or in this case, "Dark Space") is the ultimate luxury. It signals that we are not in a rush to sell, but rather inviting the user to linger.
 
---
 
## 2. Colors
Our palette is rooted in deep, earthy charcoals and punctuated by the glow of refined gold. 
 
### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Traditional "dividers" are a sign of lazy UI. 
*   **Boundary Definition:** Separate sections through background color shifts. Transition from `surface` (#131313) to `surface_container_low` (#1C1B1B) to define a new content area.
*   **Soft Transitions:** Use subtle vertical spacing to let the eye naturally perceive the change in context.
 
### Surface Hierarchy & Nesting
Treat the UI as physical layers.
*   **Base:** `surface` (#131313) or `surface_container_lowest` (#0E0E0E) for the deepest background.
*   **Elevated Content:** Place `surface_container` (#201F1F) cards on top of the base.
*   **High-Priority Elements:** Use `surface_bright` (#393939) for floating navigation or interactive modals to create a "lifted" feel.
 
### The "Glass & Gradient" Rule
To add "soul" to the digital interface:
*   **Glassmorphism:** For overlays or navigation bars, use `surface` tokens with 70-80% opacity and a `backdrop-filter: blur(20px)`. This creates a frosted-glass effect that allows the rich photography of the farm to bleed through.
*   **Signature Gradients:** Use a subtle linear gradient from `primary` (#F2CA50) to `primary_container` (#D4AF37) for primary CTAs to avoid a "flat yellow" look and instead mimic the sheen of polished brass or gold.
 
---
 
## 3. Typography
The typographic pairing is a conversation between heritage and modernity.
 
*   **Display & Headlines (Noto Serif):** These are your "Editorial Voices." Use them large and with tight letter-spacing for a dramatic, authoritative impact. This font carries the "Luxury" weight of the brand.
*   **Body & Labels (Plus Jakarta Sans):** These provide functional clarity. Plus Jakarta Sans offers a geometric precision that balances the ornate nature of the serif.
 
**Scale Philosophy:**
*   **High Contrast:** Use `display-lg` (3.5rem) immediately followed by `body-md` (0.875rem) to create visual tension and interest.
*   **The "Lead" Paragraph:** Use `title-lg` for introductory sentences to bridge the gap between headlines and body text.
 
---
 
## 4. Elevation & Depth
In "The Nocturnal Sanctuary," depth is felt, not seen.
 
*   **The Layering Principle:** Stack `surface_container` tiers. A `surface_container_high` (#2A2A2A) element sitting on `surface_dim` (#131313) creates a natural, soft lift.
*   **Ambient Shadows:** If an element must float, use a shadow with a blur radius of 40px-60px and an opacity of 6%. The shadow color should be `#000000` to ground it in the dark environment.
*   **The "Ghost Border":** If a container requires definition for accessibility, use `outline_variant` (#4D4635) at **15% opacity**. It should be a mere whisper of a line, barely visible to the naked eye.
*   **Verticality:** Use the **Roundedness Scale** (0.25rem for subtle cards, 0.75rem for high-impact imagery) to soften the "Brutalist" edges of the dark mode.
 
---
 
## 5. Components
 
### Buttons
*   **Primary:** A gradient fill (`primary` to `primary_container`) with `on_primary` text. No border. Roundedness: `md`.
*   **Secondary:** No fill. A "Ghost Border" using `outline` at 20% opacity. Text in `primary`.
*   **Tertiary:** Purely typographic. `label-md` in `primary` with a 1px underline that expands on hover.
 
### Cards & Lists
*   **Card Design:** Forbid dividers. Use `surface_container_low` for the card background and `surface_container_highest` for a hover state.
*   **List Items:** Increase vertical padding (e.g., 24px) to separate items instead of using lines. Use `on_surface_variant` for metadata.
 
### Input Fields
*   **State:** The default state is a `surface_container_highest` background with no border. On focus, use a `primary` "Ghost Border" (20% opacity) and transition the label color to `primary`.
 
### Specialized Components
*   **Image Overlays:** For the "lavish bedrooms" section, use large-scale imagery with an 80% black-to-transparent vertical gradient at the bottom. Place `headline-sm` text inside the gradient.
*   **Booking Bar:** A persistent, glassmorphic (`surface` + blur) footer bar that houses the primary CTA, ensuring "Luxury" meets "Conversion."
 
---
 
## 6. Do's and Don'ts
 
### Do:
*   **Do** use asymmetrical margins. For example, a 15% left margin for a headline and a 25% left margin for the following body text.
*   **Do** lean into "Tonal Layering." If a card is too hard to see, don't add a border; make the background one step lighter using the `surface_container` tokens.
*   **Do** use high-quality, warm-toned photography. The UI is designed to frame the imagery, not compete with it.
 
### Don't:
*   **Don't** use pure white (#FFFFFF) for text. Use `on_surface` (#E5E2E1) to reduce eye strain and maintain the "warm" luxury feel.
*   **Don't** use 1px solid dividers or borders. This is the fastest way to make a premium design look like a generic template.
*   **Don't** cram content. If a section feels "busy," increase the vertical spacing by 50%. Space is luxury.
*   **Don't** use "Drop Shadows" that are visible as distinct shapes. Shadows must be ambient and felt as a soft glow/lift.