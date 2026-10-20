# Parossa website: ChatGPT image prompts

18 photos for the Parossa website: 10 scene photos and 8 dish photos. Generate them in ChatGPT, save each one under the exact filename shown, and put them in the website repo at `assets-src/images/`. Then ask Claude to run **Phase 10** of `docs/WEBSITE_UPDATE_PLAN.md`; it crops, compresses and places every image automatically.

**What is *not* on this list:** product screens (tablet menu, kitchen display, waiter app, pager, bill, dashboard). Image generators garble on-screen text, so Claude builds those screens in code instead. In every photo below, device screens are deliberately a soft, unreadable glow; the sharp, accurate screens are overlaid by the website.

---

## How to generate

1. **Use one ChatGPT conversation for all 18 images** so the style stays consistent. Start it by pasting the **Style message** below and wait for "Ready".
2. **One image per message.** Paste one prompt at a time. Each prompt starts with its orientation; if ChatGPT offers a size or aspect option, pick the one stated:
   - **Portrait (2:3)**: hero only.
   - **Landscape (3:2)**: scene photos.
   - **Square (1:1)**: dishes.
3. **Check it** against the "Accept only if" list under each prompt. If something is off, reply with a fix, for example:
   - "Same image, but make the tablet screen a soft abstract glow with no readable text or numbers."
   - "Same image, but remove the logo on the apron."
   - "Same image, but fix the hands: natural, five fingers."
   - "Same image, but make it look like a real photograph: less glossy, more natural skin texture and lighting."
4. **Download** at the highest quality offered (PNG is fine) and **rename to the exact filename**, e.g. `hero-table.png`. Lowercase, hyphens, no spaces.
5. **Put all files in** `assets-src/images/` in the repo (create the folder if needed). Then tell Claude: *"The photos are in assets-src/images/. Run Phase 10."*

**Tips:**
- Generate dishes last, in a row, so they share the same backdrop and light.
- If an image is close but not right, ask for one change at a time.
- Check the image tool's current terms before using the photos commercially. Don't use prompts that ask for a real person's likeness or a real restaurant.

---

## Style message (paste first)

```
I'm creating a set of photographs for the website of Parossa, a restaurant-technology company in India. Every image in this set must look like it came from the same professional editorial photo shoot. Follow these rules for every image I ask for in this chat:

- Photorealistic, natural documentary photography. Not an illustration, not a 3D render, no CGI or glossy "AI" look. Real skin texture, real fabric, real food.
- Setting: modern, upscale-casual Indian restaurants in a large Indian city. Warm wood, terracotta, brass and cane accents, soft pendant lighting, a few indoor plants. Clean, lively but calm.
- People: Indian adults of varied ages, genders and body types, natural expressions, contemporary clothing. They are not models posing; they are caught in real moments. Faces must look natural and must not resemble any celebrity or real public figure.
- Restaurant staff wear charcoal-indigo shirts or aprons with subtle saffron-coloured piping. No logos, badges or name tags.
- Light and colour: warm golden tungsten light balanced with soft daylight; palette leaning saffron/amber, deep indigo and cream; true-to-life skin tones; gentle contrast; no heavy filters, no HDR.
- Camera: full-frame camera, 35mm or 50mm lens, aperture around f/2–f/2.8, shallow depth of field, eye-level or slightly above.
- Devices (tablets, phones, screens, smartwatch-style pagers, laptops) are generic, sleek and unbranded. Their screens show only a soft, out-of-focus glow of colourful rounded cards. Never readable text, numbers, icons or logos on any screen.
- Never include: text, letters, numbers, logos, brand names, watermarks, signage with words, or menus with readable writing. No alcohol bottles.

Reply only "Ready" and wait for my image requests.
```

---

## Scene photos (10)

### 1. `hero-table.png`: Portrait (2:3)

**Used for:** the main hero image at the top of the home page. The website overlays small notification cards on it.

```
Portrait (2:3) photograph, Parossa style.
A table for four in a warm, modern Indian restaurant during a busy evening service. A slim, unbranded tablet stands upright on a small matte-black stand at the edge of the table, angled towards the diners; its screen glows with soft, abstract, colourful rounded cards (no readable text). On the table: paneer tikka on a cast-iron sizzler plate, a cane basket of butter naan, a copper bowl of dal makhani, brass glasses of water. Two friends in their late twenties (one woman, one man) sit in the foreground; the woman reaches out to tap the tablet, both relaxed and smiling naturally. Behind them, out of focus, a waiter in a charcoal-indigo apron carries plates between tables. Keep the top third calmer (soft bokeh of warm pendant lights) so small interface cards can be placed over it. Camera slightly above table height, 35mm lens, f/2.2.
```

**Accept only if:** both faces look natural; the tablet screen has no readable text; the food looks real and appetising; there's calm space in the upper area; no logos.

### 2. `og-background.png`: Landscape (3:2)

**Used for:** the social-share image (WhatsApp, LinkedIn previews). The website puts the Parossa name and tagline on the left side.

```
Landscape (3:2) photograph, Parossa style.
An atmospheric view of a modern Indian restaurant at dusk. The right half holds the subject: a wooden dining table set with a slim unbranded tablet on a stand (soft abstract glowing screen, no text), a copper handi of butter chicken, naan in a cane basket and brass water glasses, lit by a warm pendant lamp. The left 45% of the frame is calm and darker: softly blurred restaurant interior in deep indigo and warm amber tones, with no important detail, so text can be placed over it. No people in sharp focus. 35mm lens, f/2.
```

**Accept only if:** the left side is quiet and dark enough for white text; there's no text anywhere; the table is on the right.

### 3. `guest-tablet.png`: Landscape (3:2)

**Used for:** the "Table tablet" feature (Water / Waiter / Bill / Cancel buttons).

```
Landscape (3:2) photograph, Parossa style.
A close, over-the-shoulder shot at a restaurant table: a woman in her thirties taps one of four large rounded buttons on an unbranded tablet standing on the table. The screen shows four big softly glowing rounded buttons in saffron, indigo and green, with no readable text or icons. Across the table, slightly out of focus, her parents in their sixties smile and chat. On the table: a brass pot of vegetable biryani, a bowl of raita, brass water glasses. Warm evening light, 50mm lens, f/2.
```

**Accept only if:** the hand and fingers look natural; there's no text on the screen; the people look like a real family moment, not posed.

### 4. `guest-qr.png`: Landscape (3:2)

**Used for:** the "QR menu" feature.

```
Landscape (3:2) photograph, Parossa style.
Daytime at a bright, plant-filled modern Indian café-restaurant with cane chairs and a large window. A man in his mid-twenties holds up his phone to scan a small acrylic table stand that shows a square black-and-white QR-style pattern (abstract; no text, no logo). His phone screen shows a soft, blurred layout of food photos with no readable text. His friend beside him leans in, smiling. Soft daylight from the window, 35mm lens, f/2.5.
```

**Accept only if:** there's no readable text on the stand or the phone; the phone is held naturally; the hands look right.

### 5. `kitchen-display.png`: Landscape (3:2)

**Used for:** the "Kitchen display" feature.

```
Landscape (3:2) photograph, Parossa style.
A busy, spotless commercial Indian restaurant kitchen. A head chef (woman, forties, white chef's jacket) and a sous-chef (man, twenties, charcoal-indigo apron) look up at a wall-mounted horizontal screen above the pass. The screen shows a dark interface with rows of colourful rectangular cards (green, amber, one red), softly out of focus, with no readable text or numbers. In the background, steam rises from a tandoor and a kadhai; stainless-steel counters; plated dishes waiting under warm heat lamps at the pass. Realistic kitchen lighting, 35mm lens, f/2.8.
```

**Accept only if:** the screen has no readable text; the kitchen looks clean and real; no logos on uniforms.

### 6. `waiter-pager.png`: Landscape (3:2)

**Used for:** the "Waiter app & wrist pager" feature.

```
Landscape (3:2) photograph, Parossa style.
A mid-shot of a waiter in his twenties wearing a charcoal-indigo shirt and apron, carrying two plates of food on the restaurant floor. He glances down at a slim, black, unbranded smartwatch-style device on his left wrist; its small screen glows soft saffron with no readable text or numbers. Behind him, the warm restaurant floor and diners are softly out of focus. A natural, candid mid-step moment, 50mm lens, f/2.
```

**Accept only if:** the wrist device is clearly visible and unbranded; there's no text on it; the plates and hands look natural.

### 7. `cashier-billing.png`: Landscape (3:2)

**Used for:** the "POS & billing" feature.

```
Landscape (3:2) photograph, Parossa style.
At a modern restaurant billing counter, a female cashier in her thirties wearing a charcoal-indigo uniform smiles as she hands a printed paper receipt to a guest, whose hand is visible reaching for it. On the warm wooden counter: an unbranded touchscreen point-of-sale monitor (screen softly blurred, no readable text), a compact white thermal receipt printer and a small brass bell. Shelves with plants and brass vessels softly blurred behind. 35mm lens, f/2.8.
```

**Accept only if:** the receipt shows no readable text; there are no logos on the devices; the cashier looks natural.

### 8. `owner-reports.png`: Landscape (3:2)

**Used for:** the "Analytics & reports" section.

```
Landscape (3:2) photograph, Parossa style.
After closing time in an empty, softly lit modern Indian restaurant. The owner, a woman in her forties in a smart casual kurta, sits at a table reviewing charts on an unbranded laptop; the screen shows soft, blurred bar and line charts in saffron, indigo and green, with no readable text or numbers. A cup of chai beside the laptop, chairs neatly tucked in, pendant lights dimmed, a calm, satisfied expression. 50mm lens, f/2.
```

**Accept only if:** the laptop screen has no readable text or numbers; the restaurant looks closed for the night; there's no logo on the laptop.

### 9. `onboarding-setup.png`: Landscape (3:2)

**Used for:** the "Live in a day" onboarding section.

```
Landscape (3:2) photograph, Parossa style.
A restaurant before opening, bright daylight. A young setup specialist (woman, twenties, plain navy polo shirt, no logos) helps the restaurant manager (man, thirties, charcoal-indigo shirt) set up an unbranded tablet on a table stand; both look at the tablet, whose screen shows a soft abstract glow with no readable text. On a nearby table, several identical tablets stand in a neat charging rack. Chairs neatly arranged, a friendly, collaborative mood. 35mm lens, f/2.8.
```

**Accept only if:** there's no text or logos anywhere; both people look engaged and natural.

### 10. `restaurant-interior.png`: Landscape (3:2)

**Used for:** a wide background banner (the "Founding restaurants" section), with a dark overlay on top.

```
Landscape (3:2) photograph, Parossa style.
A wide establishing shot of a thriving, modern Indian casual-dining restaurant during evening service: warm pendant lights, wooden tables, terracotta and brass accents, indoor plants. Diners at several tables (soft focus, no recognisable faces), two waiters in charcoal-indigo aprons moving between tables, and small unbranded tablets on stands at a few tables. Keep the important detail in the middle horizontal band of the frame (the top and bottom will be cropped for a wide banner). 24mm lens, f/4.
```

**Accept only if:** the middle band holds the scene; no faces are in sharp focus; there's no signage text.

---

## Dish photos (8, all square 1:1)

These appear as small thumbnails inside the website's tablet and QR-menu screens, so they must match each other. **Paste this dish style note once before the first dish prompt:**

```
For the next 8 images, use one consistent food-photography setup: square (1:1) photograph, Parossa style; the dish shot at a 45-degree angle, centred, filling about 70% of the frame; on a matte warm-beige stone surface; soft directional window light from the left; shallow depth of field; a few natural garnish crumbs or herbs; no hands, no cutlery clutter, no text, no logos. Real, appetising food with natural texture. Reply "Ready".
```

| # | Filename | Prompt |
|---|---|---|
| 11 | `dish-paneer-tikka.png` | `Square (1:1). Paneer tikka: charred, smoky cubes of paneer with onion and capsicum on a cast-iron sizzler plate, a small bowl of mint chutney and a lemon wedge beside it.` |
| 12 | `dish-seekh-kebab.png` | `Square (1:1). Chicken seekh kebabs: four glistening, charred kebabs on a white ceramic plate with onion rings, green chutney and a lemon wedge.` |
| 13 | `dish-butter-chicken.png` | `Square (1:1). Butter chicken in a small copper handi: glossy orange-red gravy with a swirl of cream and a little chopped coriander on top.` |
| 14 | `dish-dal-makhani.png` | `Square (1:1). Dal makhani in a dark clay bowl: rich, creamy black lentils with a knob of butter melting on top and a drizzle of cream.` |
| 15 | `dish-garlic-naan.png` | `Square (1:1). Two garlic naan, blistered and brushed with butter, topped with chopped garlic and coriander, in a cloth-lined cane basket.` |
| 16 | `dish-veg-biryani.png` | `Square (1:1). Vegetable dum biryani in a small brass pot with its lid tilted to one side: fragrant long-grain rice with vegetables, fried onions and mint, a small bowl of raita beside it.` |
| 17 | `dish-mango-lassi.png` | `Square (1:1). Mango lassi in a tall glass, thick and golden, topped with a few saffron strands and chopped pistachio, light condensation on the glass.` |
| 18 | `dish-gulab-jamun.png` | `Square (1:1). Three gulab jamun in a small brass bowl with glistening syrup, garnished with slivered pistachios.` |

**Accept only if:** each dish is centred, on the same beige surface, with the same light; the food looks real; there's no text.

---

## Final checklist before handing over to Claude

- [ ] 18 files in `assets-src/images/`, named exactly as above (lowercase, hyphens).
- [ ] No readable text, numbers or logos in any image, including on screens, aprons, receipts and table stands.
- [ ] Hands and faces look natural; nothing looks obviously AI-generated.
- [ ] The dish photos look like one set.
- [ ] Tell Claude: *"The photos are in assets-src/images/. Run Phase 10."*
