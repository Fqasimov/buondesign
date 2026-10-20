# Vendored skills

Copied from upstream on 2026-10-20. To update, re-copy the same directories from
the listed commit's successor.

| Skill(s) | Upstream | Commit | License |
| --- | --- | --- | --- |
| `ui-ux-pro-max`, `design-system` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (`.claude/skills/`) | `56ea9cf` | MIT |
| `impeccable` | https://github.com/pbakaus/impeccable (`.claude/skills/impeccable`) | `dad8dbb` | Apache-2.0 |
| `emil-design-eng`, `animate`, `improve-animations`, `review-animations`, `animation-performance`, `animation-vocabulary`, `find-animation-opportunities`, `break-ui` | https://github.com/emilkowalski/skill (`skills/`) | `2d22863` | MIT |
| `remotion-*` (all 12) | https://github.com/remotion-dev/skills (`skills/`) | `039e8a2` | MIT |

Left out as irrelevant to a web project: Emil's `animate-expo`, `write-swift`,
`mobile-native`, `apple-design`, `ask-sonner`, `pick-ui-library`, `prototype`;
ui-ux-pro-max's `banner-design`, `brand`, `design`, `slides`, `ui-styling`.

Notes:
- `ui-ux-pro-max` needs `python3` (stdlib only): `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`
- `impeccable/scripts/impeccable` downloads its engine binary from the project's
  GitHub releases on first use (sha256-checked).
