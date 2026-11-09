# LINKit – DESIGN.md

Reference image: docs/design reference/profile_Showcase.png (source of truth for look and layout)
Product feel: monochrome, minimal, premium, friendly. Black and white with soft grays.
Tagline: Tap. Link. Connect.
Core idea: the profile is the product. NFC, QR and URL are just ways in.

## Brand
- Wordmark: "LINK" in heavy weight + "it" in light weight, with a phone + NFC waves icon.
- Tagline set in wide letter-spacing, light weight.
- NFC cards: one white, one black, same wordmark and NFC mark.

## Color (monochrome)
- Starting values, sample exact ones from the reference image and lock them once:
  - ink: #111111 (text, primary buttons on light)
  - paper: #FFFFFF
  - surface: #F4F4F4 (icon buttons, page wash)
  - line: #E6E6E6 (borders, dividers)
  - muted: #6B6B6B (secondary text)
  - dark-bg: #121212, dark-surface: #1E1E1E
- No brand color. Color appears only in third-party platform icons and in non-monochrome profile themes.

## Tokens (required)
- Define semantic CSS variables, not raw colors: --bg, --surface, --text, --muted, --line, --accent, --accent-contrast.
- Tailwind maps to these variables. Components never use raw hex.
- Every profile theme is a set of overrides on these variables via data-theme.

## Public profile layout (mobile-first, 360px minimum)
- Top: full-bleed photo, rounded sheet overlaps the bottom of the photo.
- Top-left: two circular icon buttons (personal / business) — **[post-MVP]** (hidden in MVP). Top-right: "Exchange" pill — **[post-MVP]** (hidden in MVP).
- Sheet: name + verified badge (controlled by `is_verified` boolean), one-line title (e.g. role | role).
- Action row: four circular icon buttons (call, email, link, QR). Only show actions the user has filled in.
- Primary action: full-width pill "Save Contact". Black on light themes, white on dark.
- Link list: rows with icon tile, title, one-line subtitle, chevron. Whole row is the tap target.
- Large radii (sheet ~28px, rows ~16px, buttons fully round), soft shadows only, generous spacing.

## Themes (from reference)
- Profile theme field: string key, default `"professional"`. Built-in options: `professional` (clean, modern monochrome), `minimal` (simple, elegant), `dark` (premium, bold), `creative`, `nature`, `playful`.
- Free vs Premium split: TBD.
- All themes must pass contrast. Failing combinations are rejected or auto-adjusted.

## Dashboard
- Same monochrome system. Simple sidebar on desktop, bottom or drawer nav on mobile.
- Theme picker shows live preview cards like the "Profile Themes" strip in the reference.

## Marketing / Tap or Scan section
- Three short steps: Tap the card, Or scan the QR code, Connect.
- No invented stats, testimonials, ratings or user counts.

## Content rules
- The people, photos and names in the reference image are mockup content. Never ship them as seed data or placeholders.
- Empty states say what is empty and what to do next.
- Plain sentences. No emoji bullets, hype words or fake numbers.
- Analytics show real zeros, not sample charts.