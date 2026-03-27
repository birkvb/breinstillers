import { defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "home",
        label: "Homepagina",
        path: "content/pages",
        format: "json",
        match: {
          include: "home",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // Hero
          {
            type: "object",
            name: "hero",
            label: "Hero sectie",
            fields: [
              { type: "string", name: "badge", label: "Badge tekst" },
              { type: "string", name: "titleLine1", label: "Titel regel 1" },
              { type: "string", name: "titleLine2", label: "Titel regel 2 (groen)" },
              { type: "string", name: "subtitle1", label: "Ondertitel 1", ui: { component: "textarea" } },
              { type: "string", name: "subtitle2", label: "Ondertitel 2", ui: { component: "textarea" } },
              { type: "string", name: "ctaPrimary", label: "Primaire knop tekst" },
              { type: "string", name: "ctaSecondary", label: "Secundaire knop tekst" },
              { type: "string", name: "socialProof", label: "Social proof tekst" },
              { type: "image", name: "backgroundImage", label: "Achtergrondafbeelding" },
            ],
          },
          // Pain points
          {
            type: "object",
            name: "painPoints",
            label: "Herken je dit? sectie",
            fields: [
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "subtitle", label: "Ondertitel", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Pijnpunten",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          // Approach
          {
            type: "object",
            name: "approach",
            label: "Werkwijze sectie",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "text1", label: "Tekst 1", ui: { component: "textarea" } },
              { type: "string", name: "text2", label: "Tekst 2", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Afbeelding" },
              {
                type: "string",
                name: "bulletPoints",
                label: "Opsomming",
                list: true,
              },
            ],
          },
          // About Wietske (brief)
          {
            type: "object",
            name: "aboutBrief",
            label: "Over Wietske (kort)",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "text1", label: "Tekst 1", ui: { component: "textarea" } },
              { type: "string", name: "text2", label: "Tekst 2", ui: { component: "textarea" } },
              { type: "string", name: "text3", label: "Tekst 3", ui: { component: "textarea" } },
              { type: "image", name: "portrait", label: "Portretfoto" },
            ],
          },
          // Benefits
          {
            type: "object",
            name: "benefits",
            label: "Voordelen sectie",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "subtitle", label: "Ondertitel", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Voordelen",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "text", label: "Tekst" },
                ],
              },
            ],
          },
          // Training offer
          {
            type: "object",
            name: "training",
            label: "Training aanbod",
            fields: [
              { type: "string", name: "badge", label: "Badge tekst" },
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "text1", label: "Tekst 1", ui: { component: "textarea" } },
              { type: "string", name: "text2", label: "Tekst 2", ui: { component: "textarea" } },
              {
                type: "string",
                name: "features",
                label: "Kenmerken",
                list: true,
              },
              { type: "string", name: "price", label: "Prijs" },
              { type: "string", name: "priceSubtext", label: "Prijs ondertekst" },
              { type: "string", name: "dates", label: "Data" },
              { type: "string", name: "location", label: "Locatie" },
              { type: "string", name: "groupSize", label: "Groepsgrootte" },
              { type: "string", name: "schedule", label: "Programma" },
              { type: "string", name: "ctaText", label: "Aanmeld knop tekst" },
            ],
          },
          // Testimonials
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials",
            fields: [
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "subtitle", label: "Ondertitel", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Testimonials",
                list: true,
                fields: [
                  { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
                  { type: "string", name: "name", label: "Naam" },
                  { type: "string", name: "role", label: "Rol/omschrijving" },
                ],
              },
            ],
          },
          // Final CTA
          {
            type: "object",
            name: "finalCta",
            label: "Afsluitende call-to-action",
            fields: [
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
              { type: "string", name: "ctaPrimary", label: "Primaire knop tekst" },
              { type: "string", name: "ctaSecondary", label: "Secundaire knop tekst" },
            ],
          },
        ],
      },
      {
        name: "wietske",
        label: "Over Wietske pagina",
        path: "content/pages",
        format: "json",
        match: {
          include: "wietske",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero sectie",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "text1", label: "Tekst 1", ui: { component: "textarea" } },
              { type: "string", name: "text2", label: "Tekst 2", ui: { component: "textarea" } },
              { type: "image", name: "portrait", label: "Portretfoto" },
            ],
          },
          {
            type: "object",
            name: "background",
            label: "Achtergrond & aanpak",
            fields: [
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "text1", label: "Tekst 1", ui: { component: "textarea" } },
              { type: "string", name: "text2", label: "Tekst 2", ui: { component: "textarea" } },
              { type: "string", name: "text3", label: "Tekst 3", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "whoIAm",
            label: "Wie ik ben",
            fields: [
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "training",
            label: "Opleidingen",
            fields: [
              { type: "string", name: "title", label: "Titel" },
              {
                type: "string",
                name: "items",
                label: "Opleidingen",
                list: true,
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Call-to-action",
            fields: [
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
            ],
          },
        ],
      },
      {
        name: "contact",
        label: "Contactpagina",
        path: "content/pages",
        format: "json",
        match: {
          include: "contact",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: "string", name: "title", label: "Pagina titel" },
          { type: "string", name: "subtitle", label: "Ondertitel", ui: { component: "textarea" } },
          { type: "string", name: "email", label: "E-mailadres" },
          { type: "string", name: "phone", label: "Telefoonnummer" },
          { type: "string", name: "address", label: "Adres" },
          { type: "string", name: "city", label: "Plaats" },
        ],
      },
    ],
  },
});
