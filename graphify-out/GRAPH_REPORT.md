# Graph Report - .  (2026-05-05)

## Corpus Check
- Large corpus: 206 files · ~3,695,641 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 206 nodes · 222 edges · 36 communities detected
- Extraction: 70% EXTRACTED · 25% INFERRED · 1% AMBIGUOUS · INFERRED: 56 edges (avg confidence: 0.85)
- Token cost: 7,198 input · 2,458 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Garden Images|Garden Images]]
- [[_COMMUNITY_Hero Frames|Hero Frames]]
- [[_COMMUNITY_Hero Animation|Hero Animation]]
- [[_COMMUNITY_Grey Sofa|Grey Sofa]]
- [[_COMMUNITY_Hero Sequence|Hero Sequence]]
- [[_COMMUNITY_Svg Next|Svg Next]]
- [[_COMMUNITY_Grey Blue|Grey Blue]]
- [[_COMMUNITY_Sofa Dining|Sofa Dining]]
- [[_COMMUNITY_Happy Nest|Happy Nest]]
- [[_COMMUNITY_Happy Nest|Happy Nest]]
- [[_COMMUNITY_Statsbar Tsx|Statsbar Tsx]]
- [[_COMMUNITY_Videohero Tsx|Videohero Tsx]]
- [[_COMMUNITY_Navbar Tsx|Navbar Tsx]]
- [[_COMMUNITY_Sitemap|Sitemap]]
- [[_COMMUNITY_Page Tsx|Page Tsx]]
- [[_COMMUNITY_Whatsappfab Tsx|Whatsappfab Tsx]]
- [[_COMMUNITY_Bedrooms Tsx|Bedrooms Tsx]]
- [[_COMMUNITY_Location Tsx|Location Tsx]]
- [[_COMMUNITY_Themetoggle Tsx|Themetoggle Tsx]]
- [[_COMMUNITY_Sectionlabel Tsx|Sectionlabel Tsx]]
- [[_COMMUNITY_Amenities Tsx|Amenities Tsx]]
- [[_COMMUNITY_Garden Images|Garden Images]]
- [[_COMMUNITY_Bathroom Images|Bathroom Images]]
- [[_COMMUNITY_Next Env|Next Env]]
- [[_COMMUNITY_Next Config|Next Config]]
- [[_COMMUNITY_Layout Tsx|Layout Tsx]]
- [[_COMMUNITY_Meals Tsx|Meals Tsx]]
- [[_COMMUNITY_Navbar Tsx|Navbar Tsx]]
- [[_COMMUNITY_Houserules Tsx|Houserules Tsx]]
- [[_COMMUNITY_Poolgarden Tsx|Poolgarden Tsx]]
- [[_COMMUNITY_Spaces Tsx|Spaces Tsx]]
- [[_COMMUNITY_Livingareas Tsx|Livingareas Tsx]]
- [[_COMMUNITY_Experiences Tsx|Experiences Tsx]]
- [[_COMMUNITY_Commonareas Tsx|Commonareas Tsx]]
- [[_COMMUNITY_Footer Tsx|Footer Tsx]]
- [[_COMMUNITY_About Tsx|About Tsx]]

## God Nodes (most connected - your core abstractions)
1. `Hero Frames Chunk 06` - 22 edges
2. `Lime1` - 13 edges
3. `Sofa Up` - 8 edges
4. `Happy Nest 4Cc357` - 2 edges
5. `Dining Entrance` - 1 edges
6. `Sofa Ground` - 1 edges
7. `Entrance` - 1 edges
8. `Main Dining` - 1 edges
9. `Tt Table Sofa Up` - 1 edges
10. `Sofa Ground2` - 1 edges

## Surprising Connections (you probably didn't know these)
- `Dining Entrance` --conceptually_related_to--> `Sofa Up`  [INFERRED]
  happynest/single/dining-entrance.jpg → happynest/single/sofa-up.jpg
- `Sofa Ground` --conceptually_related_to--> `Sofa Up`  [INFERRED]
  happynest/single/sofa-ground.jpg → happynest/single/sofa-up.jpg
- `Entrance` --conceptually_related_to--> `Sofa Up`  [INFERRED]
  happynest/single/entrance.jpg → happynest/single/sofa-up.jpg
- `Main Dining` --conceptually_related_to--> `Sofa Up`  [INFERRED]
  happynest/single/main-dining.jpg → happynest/single/sofa-up.jpg
- `Tt Table Sofa Up` --conceptually_related_to--> `Sofa Up`  [INFERRED]
  happynest/single/tt-table-sofa-up.jpg → happynest/single/sofa-up.jpg

## Hyperedges (group relationships)
- **hyperedge:core-property-docs** —  [EXTRACTED 0.94]
- **hyperedge:design-governance** —  [INFERRED 0.89]
- **hyperedge:garden-visual-cluster** —  [EXTRACTED 0.96]
- **hyperedge:static-brand-assets** —  [INFERRED 0.86]
- **hyperedge_bathroom_semantic_cluster** —  [INFERRED 0.90]
- **hyperedge_hero_sequence_cluster** —  [EXTRACTED 0.98]
- **hero_frame_sequence_chunk_04** — frame_0003, frame_0004, frame_0012, frame_0019, frame_0023, frame_0024, frame_0028, frame_0032, frame_0035, frame_0039, frame_0045, frame_0053, frame_0054, frame_0058, frame_0062, frame_0065, frame_0069, frame_0074, frame_0078, frame_0081, frame_0086, frame_0090 [EXTRACTED]
- **hero_sequence_chunk_06** —  [INFERRED]
- **Single Unit Living Spaces** — single_sofa_up, single_dining_entrance, single_sofa_ground, single_entrance, single_main_dining, single_tt_table_sofa_up, single_sofa_ground2, single_main_big_balcony [INFERRED 0.84]
- **Bedrooms Gallery Set** — bedrooms_lime1, bedrooms_lime2, bedrooms_brown2, bedrooms_blue2, bedrooms_green1, bedrooms_brown1, bedrooms_blue1, bedrooms_green2, bedrooms_grey4, bedrooms_grey1, bedrooms_grey2, bedrooms_grey3 [INFERRED 0.84]
- **Bathrooms Gallery Set** — bathrooms_happy_nest_4cc357, bathrooms_happy_nest_cfb710 [INFERRED 0.88]
- **hyperedge:bathroom-image-group-09** —  [high 0.94]

## Communities

### Community 0 - "Garden Images"
Cohesion: 0.1
Nodes (26): Outdoor jacuzzi, Lawn and gazebo, Meals at additional cost, Pet friendly, Private swimming pool, README.md, happynest_blanc_belle.md, public/images/garden/drone-1.jpg (+18 more)

### Community 1 - "Hero Frames"
Cohesion: 0.09
Nodes (1): Hero Frames Chunk 04

### Community 2 - "Hero Animation"
Cohesion: 0.09
Nodes (2): Hero Animation Sequence, Hero Frames Chunk 06

### Community 3 - "Grey Sofa"
Cohesion: 0.09
Nodes (22): Happy Nest 4Cc357, Happy Nest Cfb710, Blue1, Blue2, Brown1, Brown2, Green1, Green2 (+14 more)

### Community 4 - "Hero Sequence"
Cohesion: 0.3
Nodes (2): Hero Frame Sequence, Hero Video Storyboard

### Community 5 - "Svg Next"
Cohesion: 0.13
Nodes (17): Luxury getaway travelers, Next.js logo asset, Vercel logo asset, The Nocturnal Sanctuary, AGENTS.md, CLAUDE.md, DESIGN.md, plans/redesign-happynest/implementation.md (+9 more)

### Community 6 - "Grey Blue"
Cohesion: 0.15
Nodes (1): bedroom images

### Community 7 - "Sofa Dining"
Cohesion: 0.22
Nodes (1): single-floor images

### Community 8 - "Happy Nest"
Cohesion: 0.52
Nodes (2): Bathroom Image Collection, Bathroom Interior

### Community 9 - "Happy Nest"
Cohesion: 0.53
Nodes (6): Bathroom, Happynest, happy-nest-0d2ec5.jpg, happy-nest-4dd6f7.jpg, happy-nest-9bfae4.jpg, happy-nest-dc6a2e.jpg

### Community 10 - "Statsbar Tsx"
Cohesion: 0.67
Nodes (0): 

### Community 11 - "Videohero Tsx"
Cohesion: 0.67
Nodes (0): 

### Community 12 - "Navbar Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Sitemap"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Page Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Whatsappfab Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Bedrooms Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Location Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Themetoggle Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Sectionlabel Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Amenities Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Garden Images"
Cohesion: 1.0
Nodes (1): garden images

### Community 22 - "Bathroom Images"
Cohesion: 1.0
Nodes (1): bathroom images

### Community 23 - "Next Env"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Next Config"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Layout Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Meals Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Navbar Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Houserules Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Poolgarden Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Spaces Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Livingareas Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Experiences Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Commonareas Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Footer Tsx"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "About Tsx"
Cohesion: 1.0
Nodes (0): 

## Ambiguous Edges - Review These
- `HappyNest Website` → `public/vercel.svg`  [AMBIGUOUS]
   · relation: supports_platform_branding
- `Outdoor jacuzzi` → `public/images/garden/pool3.jpg`  [AMBIGUOUS]
   · relation: visualizes_amenity

## Knowledge Gaps
- **19 isolated node(s):** `Dining Entrance`, `Sofa Ground`, `Entrance`, `Main Dining`, `Tt Table Sofa Up` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Navbar Tsx`** (2 nodes): `Navbar()`, `Navbar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sitemap`** (2 nodes): `sitemap.ts`, `sitemap()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Page Tsx`** (2 nodes): `page.tsx`, `onScroll()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Whatsappfab Tsx`** (2 nodes): `WhatsAppFab.tsx`, `WhatsAppFab()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bedrooms Tsx`** (2 nodes): `Bedrooms()`, `Bedrooms.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Location Tsx`** (2 nodes): `Location.tsx`, `Location()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Themetoggle Tsx`** (2 nodes): `ThemeToggle.tsx`, `ThemeToggle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sectionlabel Tsx`** (2 nodes): `SectionLabel.tsx`, `SectionLabel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Amenities Tsx`** (2 nodes): `Amenities()`, `Amenities.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Garden Images`** (2 nodes): `garden images`, `pool2.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bathroom Images`** (2 nodes): `bathroom images`, `happy-nest-4cc357.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next Env`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next Config`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Layout Tsx`** (1 nodes): `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meals Tsx`** (1 nodes): `Meals.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Navbar Tsx`** (1 nodes): `Navbar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Houserules Tsx`** (1 nodes): `HouseRules.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Poolgarden Tsx`** (1 nodes): `PoolGarden.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Spaces Tsx`** (1 nodes): `Spaces.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Livingareas Tsx`** (1 nodes): `LivingAreas.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Experiences Tsx`** (1 nodes): `Experiences.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Commonareas Tsx`** (1 nodes): `CommonAreas.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Footer Tsx`** (1 nodes): `Footer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Tsx`** (1 nodes): `About.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `HappyNest Website` and `public/vercel.svg`?**
  _Edge tagged AMBIGUOUS (relation: supports_platform_branding) - confidence is low._
- **What is the exact relationship between `Outdoor jacuzzi` and `public/images/garden/pool3.jpg`?**
  _Edge tagged AMBIGUOUS (relation: visualizes_amenity) - confidence is low._
- **Are the 18 inferred relationships involving `Hero Video Storyboard` (e.g. with `Hero Frame Sequence` and `frame-0087.webp`) actually correct?**
  _`Hero Video Storyboard` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `HappyNest Website` (e.g. with `DESIGN.md` and `public/robots.txt`) actually correct?**
  _`HappyNest Website` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Dining Entrance`, `Sofa Ground`, `Entrance` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Garden Images` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Hero Frames` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._