# Design — Buon Design site

Direction is brief-pinned by the client: the brand assets (logo, renders, reel) set
the world, and the signature interaction (walk into a concept apartment on scroll)
was specified, so no concept roll was run.

## World

Plaster wall, lacquered ink door, brushed champagne brass, aubergine velvet, walnut,
low evening sun through linen and blinds. The site moves from a lit **plaster
entrance** into **warm rooms**, then to an **ink** evening ground for the studio's
work. The contact section is drenched **aubergine velvet**, the one saturated field.

Scene: visitors browse from Instagram on a phone in the evening, so most of the page
is dark. The entrance is light because you arrive from outside, in daylight.

## Tokens

| Role | Value | Notes |
| --- | --- | --- |
| `--ink` | `#1C1B16` | main ground, from the monogram "B" |
| `--ink-2` | `#26241E` | raised dark surface |
| `--plaster` | `#ECE5D9` | entrance and kitchen-tones ground |
| `--plaster-2` | `#E0D7C8` | |
| `--text-on-plaster` | `#2F2E25` | |
| `--muted-on-plaster` | `#5F584B` | ≥4.5:1 on plaster |
| `--cream` | `#EFE8DC` | text on ink |
| `--muted-on-ink` | `#A9A193` | ≥4.5:1 on ink |
| `--brass` | `#B79F7C` | lines, marks, large type only |
| `--brass-deep` | `#8C7556` | brass on plaster (large/decorative) |
| `--velvet` | `#4A2630` | contact field |
| `--slate` | `#2A333C` | label boxes (from the studio's Instagram captions) |

Type: **Noto Serif Display** (light, Didone — echoes the monogram) for display and
captions; **Montserrat** (wordmark match) for UI, labels and body. Both cover
Azerbaijani (ə, ğ, ı, İ, ş) and Cyrillic. The "Live Beautifully" script is the traced
logo SVG, never a font. Display max 6rem; labels uppercase tracked 0.18em.

## Motion grammar

- One authored moment: the pinned doorway walkthrough, scrubbed by scroll.
- Everything else is quieter and varied: words lighting up in the manifesto,
  slow parallax on the office photos, blur-crossfade on the kitchen tones.
- Curves: `--ease-out: cubic-bezier(0.23,1,0.32,1)`, `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`.
  UI responses ≤ 250 ms; scroll scenes are linear to the scroll.
- `prefers-reduced-motion`: no pinning or scaling; scenes stack as still images,
  loader is a short fade.

## Signature: the walkthrough

Plaster wall with a lacquered double door. The BD monogram is split across the
leaves as brass inlay. Scroll opens the doors, the camera pushes through the
doorway into the living room, then moves room to room. Each room has a name, one
line of copy, and annotation labels in the studio's Instagram style (slate box,
serif caption, thin leader line). A small floor plan in the corner tracks which room
you are in.

## Direction contract

- FIRST VIEWPORT: plaster wall, closed ink door centred, monogram split across the
  leaves, "Live Beautifully" headline and scroll cue. Header: monogram, nav,
  language switch, Instagram action.
- No eyebrows above headings, no card grids, no gradient text, no glass.
- Selection, focus rings and scrollbar themed from the palette.
