# MPLUS — Style Reference
> navy stage, mist plinth. Stage full-bleed event photography behind large light-weight headlines, then drop into a white catalogue of work set on pale mist.

**Theme:** mixed (Theme A light by default, Theme B navy via the floating toggle)

The layout and type system come from a gallery-style showroom reference. The colours are MPLUS's own, the same values as the `@theme` tokens in `app/globals.css`, which come from `MPLUS Design System.dc.html`. Token names are given in the Colors table so each colour can be traced to code.

Marketing Plus is a Thai event, media and real-estate launch agency. The home page opens on a full-bleed scene of event photography with a centred white Prompt headline over a Night Stage scrim. The rest of the page is Paper #ffffff with work set on Mist Plinth #f4f6fa. Plus Navy #33456f carries headings, the logo, icons and solid secondary buttons. Plus Gold #f0c85a is the one warm accent: the primary "ขอใบเสนอราคา" action, the selected state and the small + marks. Plus Blue #2f5da8 fills one editorial band and is also the link colour. Depth comes from photography and scrims. Soft shadows are kept for pills and floating cards.

## Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Plus Navy | `#33456f` | `brand-navy` | Headings, logo, line icons, solid secondary buttons, and the label on gold buttons. A soft navy that stays gentle beside mist |
| Paper | `#ffffff` | — | Main canvas, header once scrolled, form card, drawers, film pills, and all type on dark scenes |
| Mist Plinth | `#f4f6fa` | `surface` | Work-card media fill, service blocks, tile hover, and alternating section fields. The cool gallery plinth |
| Mist Alt | `#f9fafc` | `surface-alt` | Very pale rows inside panels (cookie categories) |
| Night Stage | `#1e2740` | `dark-page` | Scrim under hero type and the fill behind scenes while media loads. Also the Theme B page field |
| Footer Night | `#19213a` | `dark-footer` | Site footer field. A near-black navy that closes the page in one block |
| Plus Blue | `#2f5da8` | `brand-primary` | The editorial split panel (Why section). It is the only large saturated field. Also used for links and focus rings |
| Plus Gold | `#f0c85a` | `brand-accent` | Primary action fill, selected-state rings, and + marks. Hover `#e8bb3f` (`brand-accent-hover`) |
| Warm Cream | `#fff6da` | `warm` | Testimonial cards and the success notice. A warm tint for selection instead of a bright fill |
| Tint Blue | `#eef3fb` | `tint-blue` | Small icon wells and hover fills on Paper |
| Body Ink | `#333333` | `ink` | Running body text |
| Slate | `#5b6577` | `ink-muted` | Breadcrumbs, eyebrows, secondary paragraphs and metadata |
| Faint | `#8a93a5` | `ink-faint` | Placeholder text, legal small print, captions |
| Line | `#e4e9f2` | `line` | 1px borders on spec rows, the form card and floating cards |
| Line Strong | `#d6deec` | `line-strong` | Field borders, and the 1px rule between primary and secondary links |
| Hair Line | `#dce3ef` | `line-fade` | Thin dividers between process steps |
| On-Navy | `#c6cee0` | `on-navy` | Eyebrow and body copy on Plus Blue and Footer Night |
| On-Navy Muted | `#a9b3ca` | `on-navy-muted` | Footer legal links, and the 1px inset ring of outlined pills on dark |

### Theme B (navy)

Theme B swaps the light fields for the navy ramp, from lightest at the top of the page to darkest at the footer: page `#1e2740`, alt section `#26314f`, card/plinth `#2c3860`, field `#1a2238`, footer `#19213a`. Lines are `#3e4e7a`. Text is `#e7ebf4`, muted `#b4bfd6`, faint `#9aa5c1`. Plus Blue gets brighter for links on dark: `#8fb3e8` (`dark-primary`). Gold stays the same in both themes.

## Typography

The site is in Thai, so the reference faces are replaced with Google fonts that have Thai glyphs. Each role keeps its size, weight and tracking. Thai has no uppercase, and Thai glyphs look smaller than Latin at the same size. So Thai text never goes below 13px, and Latin-only labels keep the uppercase treatment.

### Prompt — Display and interface voice (stands in for SangBleu Sans)
A geometric Thai/Latin sans used light. 400 for headlines, 300 for large titles and product-style names. Never 600–700 for headlines.
- **Weights:** 300, 400, 500
- **Sizes:** 15px, 17px, 22px, 26px, 30px, 48px, clamp(40px, 6vw, 77px)
- **Line height:** 1.2 for display (Thai needs room for its upper and lower marks), 1.3 for titles
- **Letter spacing:** -0.02em on display and titles; 0 on interface text

### Noto Sans Thai — Small-label and body layer (stands in for Gill Sans MT)
Eyebrows, captions, prices and metadata, plus running body text.
- **Weights:** 400, 500, 600
- **Sizes:** 13px, 14px, 15px, 16px, 17px
- **Letter spacing:** +0.12em on uppercase Latin eyebrows; +0.04em on Thai eyebrows

### Noto Serif Thai — Short descriptive paragraphs (stands in for Tiempos Text)
Used for section introductions and testimonial quotes. It adds a printed-catalogue note under the much larger Prompt titles.
- **Weights:** 400
- **Sizes:** 16px, 17px
- **Line height:** 1.7

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing |
|------|--------|--------|------|-------------|----------------|
| meta | Noto Sans Thai | 500 | 13px | 1.4 | 0.04em |
| eyebrow | Noto Sans Thai | 500 | 14px | 1.2 | 0.04em (Thai) / 0.12em uppercase (Latin) |
| card-title | Prompt | 400 | 18px | 1.35 | 0 |
| caption | Noto Serif Thai | 400 | 17px | 1.7 | 0 |
| nav | Prompt | 400 | 15px | 1 | 0 |
| button | Prompt | 400 | 17px | 1 | 0 |
| drawer-link | Prompt | 400 | 22px | 1.2 | -0.01em |
| footer-link | Prompt | 400 | 26px | 1.2 | -0.02em |
| product-title | Prompt | 300 | 30px | 1.3 | -0.02em |
| collection-title | Prompt | 400 | 48px | 1.2 | -0.02em |
| display | Prompt | 400 | clamp(40px, 6vw, 77px) | 1.2 | -0.02em |

## Spacing & Layout

**Base unit:** 4px

**Density:** spacious

- **Page max-width:** 1422px (20px gutters on phones, 44px on desktop)
- **Section gap:** clamp(80px, 10vw, 132px)
- **Card padding:** 8px
- **Element gap:** 32px

### Border Radius

- **pills:** 999px
- **buttons / fields:** 6px
- **floating-card:** 19px
- **tiles:** 10px (hover state only)
- **tags:** 4px
- **images / cards / sections:** 0px
- **dots:** 9999px

## Components

### Transparent Header Bar
**Role:** Site navigation over the hero and pages

Overlay header: logo at left, Prompt 15px/400 links and the phone number at right, then a gold primary button. White over the hero scene. Once scrolled, Paper at 95% with Plus Navy text (Night Stage in Theme B). It hides on scroll down and returns on scroll up, with no shadow and no 1px rule. On phones the menu opens as a Paper drawer with 22px links.

### Full-Bleed Scene Block
**Role:** Home-page hero

A crossfading carousel of event photography, clamp(600px, 92svh, 1000px) tall, on a Night Stage fallback, with a Night Stage scrim (35% → 70%). Centred white stack: On-Navy eyebrow at 14px/500, Prompt display headline 400 with the middle line in Plus Gold, a 17px body line, then a Gold Primary Button and a Film Pill Button. Small round prev/next controls sit at lower left.

### Film Pill Button
**Role:** Secondary link over dark scenes

A Paper #ffffff pill, 48px high with 0 24px padding. Plus Navy Prompt 17px/400 and the soft offset shadow `rgba(0,0,0,0.1) 3px 3px 10px`.

### Gold Primary Button
**Role:** The one primary action ("ขอใบเสนอราคา")

Plus Gold #f0c85a fill and Plus Navy Prompt 17px/500 label, 48px high, 6px radius, with the tactile inset shadow. Hover goes to `#e8bb3f`. As a pill over scenes, it uses the film-pill radius.

### Navy Solid Button
**Role:** Secondary solid action (e.g. "โทรหาเรา")

Plus Navy fill, white 17px/500 label, 48px high, 6px radius, tactile inset shadow. An outlined variant has a 1px Plus Navy border on Paper.

### Section Heading
**Role:** Opens each catalogue section

Centred stack: Slate eyebrow (14px/500, a small gold + before it), Prompt 48px/400 collection title in Plus Navy, then a Noto Serif Thai 17px paragraph in Slate, max 704px wide.

### Service Plinth Block
**Role:** Service list item

A Mist Plinth block with square corners and 40px padding. A 28px Plus Navy line icon, a Prompt 30px/300 title, and a short Slate line. Below that, spec rows split by 1px Line borders. Flat, no shadow. On hover the field darkens slightly.

### Plinth Work Card
**Role:** Catalogue grid item

Mist Plinth media at 0px radius with 8px padding. On hover the image scales slowly to 1.04. Below, a centred caption: Slate 13px eyebrow tag, Prompt 18px/400 title in Plus Navy, and a 14px Slate note. The grid is mixed-width: the first card spans two columns and two rows on desktop.

### Plus Blue Split Panel
**Role:** Editorial "why us" band

A full-width band in two halves. Event photograph at left with square corners. Plus Blue text column at right: On-Navy eyebrow, white Prompt 48px/400 headline, then four points with gold line icons, white 22px/400 titles and On-Navy 16px copy. Square corners.

### Process Steps
**Role:** Numbered timeline

Four columns split by a 1px Hair Line top border. Each has an outlined number pill (34px tall, 1px inset ring in Line Strong, Prompt 17px), a Prompt 22px/400 title and a Slate 16px paragraph.

### Testimonial Card
**Role:** Client quote

A Warm Cream block with square corners and 32px padding. A gold + mark, the quote in Noto Serif Thai 17px, and a Slate 13px caption.

### Floating Card
**Role:** Form card, cookie banner

A Paper card with a 19px radius, a 1px Line border and the shadow `rgba(0,0,0,0.1) 8px 3px 8px`. Fields inside are 48px high, 6px radius, with a 1px Line Strong border and a Plus Blue focus ring.

### Night Link Footer
**Role:** Closing site map

A Footer Night #19213a block with 66px 44px 30px padding. It opens with the white logo and a gold primary button. Below are two columns of white Prompt 26px/400 links at -0.02em. Contact details are in On-Navy, and small On-Navy Muted legal links sit at the bottom, above a 1px white/15% rule.

## Do's and Don'ts

### Do
- Open the home page on a full-bleed scene with a centred white Prompt headline over a Night Stage scrim.
- Put every work image on Mist Plinth #f4f6fa with 8px padding and square corners, on a Paper #ffffff page.
- Keep Plus Gold #f0c85a for the single primary action and for selection. Its label is always Plus Navy.
- Use Plus Navy for solid secondary actions on a 6px radius, 48px high.
- Pair section titles with a Noto Serif Thai introduction paragraph.

### Don't
- Do not set catalogue sections on a dark field in Theme A. Dark belongs to the hero scene, the footer and the single Plus Blue band.
- Do not round images or catalogue cards. Use 999px only for pills and 19px only for floating cards.
- Do not use 600–700 weights for Prompt headlines. Use 400 for headlines and 300 for large titles.
- Do not spread Plus Blue fills across controls. It fills one editorial panel; elsewhere it is only links and focus rings.
- Do not put drop shadows on catalogue cards. Keep them flat. The soft offset shadow is only for floating cards and film pills.
- Do not letter-space Thai text wider than 0.04em. It breaks up vowel and tone marks.

## Elevation

- **Floating Card:** `rgba(0, 0, 0, 0.1) 8px 3px 8px 0px`
- **Film Pill:** `rgba(0, 0, 0, 0.1) 3px 3px 10px 0px`
- **Tactile Button:** `rgba(0, 0, 0, 0.18) 0px -1px 3px 0px inset, rgba(255, 255, 255, 0.18) 0px 1px 3px 0px inset`
- **Outlined Pill:** `#d6deec 0px 0px 0px 1px inset`
- **Selected Pill:** `#f0c85a 0px 0px 0px 1px inset`

## Surfaces

- **Paper** (`#ffffff`) — Main canvas, header once scrolled, form card and drawers.
- **Mist Plinth** (`#f4f6fa`) — Work media, service blocks, alternating sections.
- **Warm Cream** (`#fff6da`) — Testimonials and success notices.
- **Plus Blue** (`#2f5da8`) — The single editorial split panel.
- **Night Stage** (`#1e2740`) — Scrim and fallback beneath the hero scene.
- **Footer Night** (`#19213a`) — Closing footer block.

## Imagery

Photography does the storytelling: launch-event stages, sales galleries, open houses and brand activations. It runs full-bleed and moody in the hero and the Plus Blue band, and sits clean and centred on Mist Plinth in the work grid. Icons are thin lucide line glyphs in Plus Navy, white or gold. Images are never rounded.

## Layout

The home page opens on a full-bleed hero under the transparent header. Next come a centred-heading services row on Paper, a mixed-width work grid on Mist Plinth, the Plus Blue split band, process steps on Paper, clients and testimonials, and contact (form card plus spec rows and map). It closes on the Footer Night block. Inner pages (work detail, privacy) use a Paper header, a centred breadcrumb, a 48px title and a 704px serif introduction. Sizes scale with viewport, and at 390px every grid drops to one or two columns.
