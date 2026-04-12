# Design System Document: The Monolithic Ether
 
## 1. Overview & Creative North Star
**Creative North Star: "The Digital Obsidian"**
 
This design system is engineered to move away from the "standard SaaS" aesthetic into a realm of high-end, editorial precision. Inspired by the meticulous craftsmanship of Linear and Vercel, the goal is to create a UI that feels carved out of a single block of dark glass and basalt. 
 
The system rejects the "box-inside-a-box" mentality. Instead, it leans into **intentional asymmetry, extreme tonal depth, and atmospheric layering.** By utilizing sophisticated glassmorphism and subtle background shifts, we create an interface that breathes. The experience should feel like a premium physical tool: sharp, weighty, and authoritative.
 
---
 
## 2. Colors & Surface Logic
 
The palette is rooted in deep obsidian tones (`#0e0e0e`) and elevated by a striking "Electric Blue" accent (`#aec6ff`).
 
### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. To separate a sidebar from a main feed, use `surface-container-low` against a `surface` background. Let the change in tone define the edge.
 
### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, semi-translucent materials. 
- **Base Layer:** `surface` (#0e0e0e)
- **Primary Containers:** `surface-container-low` (#131313)
- **Nested Content/Cards:** `surface-container` (#191a1a) or `surface-container-high` (#1f2020)
- **Elevated Modals:** `surface-container-highest` (#252626)
 
### The "Glass & Gradient" Rule
Floating elements (Popovers, Command Menus, Navigation Bars) must utilize **Glassmorphism**. Use `surface_variant` at 60% opacity with a `backdrop-blur-md` (12px-16px) effect. 
 
**Signature Texture:** For Hero CTAs and high-impact states, apply a subtle linear gradient from `primary` (#aec6ff) to `primary_container` (#004397) at a 135-degree angle. This provides a "soul" to the component that flat color cannot replicate.
 
---
 
## 3. Typography
 
The typography uses a single, highly-versatile sans-serif (Inter) to maintain a technical, engineered feel. The hierarchy is driven by extreme contrast in scale and weight.
 
*   **Display (lg/md):** Use for high-impact hero sections. Set with tight tracking (-0.02em) and `on_surface` color. These are your "Editorial Statements."
*   **Headlines & Titles:** Bold and concise. These guide the user through the information architecture.
*   **Body (lg/md):** Use `on_surface_variant` (#acabaa) for secondary body text to reduce visual noise and create a sophisticated "dimmed" effect. Use `on_surface` (#e7e5e4) only for primary reading material.
*   **Labels (md/sm):** Always uppercase with +0.05em letter spacing. These are functional signposts, acting as the "meta-data" of the UI.
 
---
 
## 4. Elevation & Depth
 
We eschew traditional shadows in favor of **Tonal Layering** and **Atmospheric Diffusion.**
 
*   **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-lowest` (#000000) card inside a `surface-container-high` (#1f2020) section to create a "recessed" or "punched-out" effect.
*   **Ambient Shadows:** For floating glass elements, use an extra-diffused shadow: `0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow must never look "grey"; it should feel like the absence of light beneath a physical object.
*   **The "Ghost Border" Fallback:** Where a border is required for extreme accessibility, use the `outline_variant` (#484848) at **15% opacity**. It should be felt, not seen.
*   **Sharpness:** All corners must adhere to the **Roundedness Scale**. Use `sm` (0.125rem) or `none` for a professional, "sharp" aesthetic. Only use `full` for interactive pills/chips.
 
---
 
## 5. Components
 
### Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`). White text (`on_primary`). Sharp corners (`sm`).
*   **Secondary:** Glass-filled. `surface_variant` at 20% opacity with a 1px "Ghost Border."
*   **Tertiary:** Ghost style. No background. `primary` text. Transitions to `surface_container_low` on hover.
 
### Input Fields
*   **Style:** Minimalist. No bottom border. Instead, use a `surface-container-lowest` background with a subtle `outline_variant` ghost border. 
*   **Focus State:** The ghost border transitions to 100% opacity `primary` blue. 
 
### Cards & Lists
*   **Prohibition:** Forbid divider lines. Use vertical whitespace (1.5rem - 2rem) or `surface` color shifts to separate items.
*   **Interaction:** On hover, a card should shift from `surface-container` to `surface-container-high`.
 
### The "Command Menu" (Signature Component)
A center-screen modal using `surface_variant` at 70% opacity, `backdrop-blur-xl`, and a `primary` glow (5% opacity) emanating from the top edge. This is the heart of the "SaaS Power User" experience.
 
---
 
## 6. Do's and Don'ts
 
### Do
*   **DO** use whitespace as a structural element. If a layout feels cluttered, increase the gap before adding a line.
*   **DO** use `on_surface_variant` for all non-essential text to maintain a hierarchy of "importance."
*   **DO** ensure all glass elements have a `backdrop-blur` to maintain legibility over moving backgrounds.
 
### Don't
*   **DON'T** use pure `#000000` for backgrounds unless you are creating a recessed "inner-shadow" effect. Use `#0e0e0e` as the floor.
*   **DON'T** use 100% opaque borders. They break the "Ether" illusion and make the UI feel like a template.
*   **DON'T** use traditional "Drop Shadows" on buttons. If you need lift, use a subtle glow of the button's own color (`primary`).
*   **DON'T** use icons with varying stroke weights. Stick to a 1.5px or 2px linear icon set to match the "Sharp" design language.
 
---
 
## 7. Spacing & Rhythm
Layouts should be driven by a rigid 4px/8px grid but broken intentionally by **Asymmetric Hero Placements.** For example, a Title might be offset to the left by 15%, while the body text remains centered, creating an editorial, high-fashion layout that defies the standard "centered SaaS" landing page.