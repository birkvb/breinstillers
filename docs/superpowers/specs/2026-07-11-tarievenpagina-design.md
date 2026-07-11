# Tarievenpagina — ontwerp

Datum: 2026-07-11

## Doel
Een nieuwe pagina `/tarieven` met de tarieven van Breinstillers, waarop Wietske via
het bestaande admin-panel zelf teksten, prijzen én pakketten van individuele
gesprekken kan beheren.

## Route & navigatie
- Nieuwe server component `src/app/tarieven/page.tsx` die `content/pages/tarieven.json` inleest (zelfde patroon als home/wietske/contact).
- "Tarieven" toegevoegd aan het header-menu (desktop + mobiel) als gewone `<Link href="/tarieven">`.

## Pagina-indeling
1. **Hero** — label, titel, intro (bewerkbaar).
2. **Twee vaste tarieven** als kaarten naast elkaar:
   - 3-Daagse Live Training — prijs €799, omschrijving, knop → `/contact?onderwerp=training`.
   - Individueel gesprek — prijs €90, eenheid "per uur", omschrijving, knop → `/contact?onderwerp=individueel`.
3. **Pakketten individuele gesprekken** — titel + ondertitel + grid van pakketkaarten.
   Sectie rendert **alleen als er ≥1 pakket** is (start leeg/onzichtbaar).
4. **Afsluitende CTA** — verwijzing naar contact.

## Content-model (`content/pages/tarieven.json`)
```
hero:       { label, title, subtitle }
training:   { title, price, description, ctaText }
individual: { title, price, priceUnit, description, ctaText }
packagesTitle, packagesSubtitle
packages:   [ { name, sessions, price, description } ]   // start: []
finalCta:   { title, text, ctaText }
```

## Admin-koppeling
- `"tarieven"` toevoegen aan de toegestane pagina's in `src/app/api/content/route.ts` (GET + PUT).
- `tarievenFields`-schema toevoegen in `src/app/admin/page.tsx` en de pagina aan de `pages`-lijst.
- Pakketten via de bestaande `array`-editor: subvelden naam (text), aantal gesprekken (text), prijs (text), omschrijving (textarea).

## Contactformulier-voorselectie
Het contactformulier leest nu geen query-parameter uit. Toevoegen: bij mount het
`onderwerp` uit `?onderwerp=` lezen (via `URLSearchParams` op `window.location.search`,
geen Suspense nodig) en voorselecteren in de dropdown. Toegestane waarden:
`algemeen`, `training`, `individueel`, `kennismaking`. Dit repareert meteen de
bestaande `/contact?onderwerp=training`-links elders op de site.

## Buiten scope
Geen "populair"-badge, geen automatische prijs-per-gesprek. Geen concrete pakketten
vooraf ingevuld (Wietske doet dat later zelf).
