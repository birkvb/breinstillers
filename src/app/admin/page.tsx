"use client";

import { useState, useEffect, useCallback } from "react";

type ContentData = Record<string, unknown>;

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "list" | "group";
  fields?: FieldConfig[];
}

const homeFields: FieldConfig[] = [
  {
    key: "hero",
    label: "Hero (bovenkant pagina)",
    type: "group",
    fields: [
      { key: "badge", label: "Badge tekst", type: "text" },
      { key: "titleLine1", label: "Titel regel 1", type: "text" },
      { key: "titleLine2", label: "Titel regel 2 (groen)", type: "text" },
      { key: "subtitle1", label: "Ondertitel 1", type: "textarea" },
      { key: "subtitle2", label: "Ondertitel 2", type: "textarea" },
      { key: "ctaPrimary", label: "Primaire knop", type: "text" },
      { key: "ctaSecondary", label: "Secundaire knop", type: "text" },
      { key: "socialProof", label: "Social proof tekst", type: "text" },
    ],
  },
  {
    key: "painPoints",
    label: "Herken je dit? sectie",
    type: "group",
    fields: [
      { key: "title", label: "Titel", type: "text" },
      { key: "subtitle", label: "Ondertitel", type: "textarea" },
    ],
  },
  {
    key: "approach",
    label: "Werkwijze sectie",
    type: "group",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "title", label: "Titel", type: "text" },
      { key: "text1", label: "Tekst 1", type: "textarea" },
      { key: "text2", label: "Tekst 2", type: "textarea" },
    ],
  },
  {
    key: "aboutBrief",
    label: "Over Wietske (kort)",
    type: "group",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "title", label: "Titel", type: "text" },
      { key: "text1", label: "Tekst 1", type: "textarea" },
      { key: "text2", label: "Tekst 2", type: "textarea" },
      { key: "text3", label: "Tekst 3", type: "textarea" },
    ],
  },
  {
    key: "benefits",
    label: "Voordelen sectie",
    type: "group",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "title", label: "Titel", type: "text" },
      { key: "subtitle", label: "Ondertitel", type: "textarea" },
    ],
  },
  {
    key: "training",
    label: "Training aanbod",
    type: "group",
    fields: [
      { key: "badge", label: "Badge tekst", type: "text" },
      { key: "title", label: "Titel", type: "text" },
      { key: "text1", label: "Tekst 1", type: "textarea" },
      { key: "text2", label: "Tekst 2", type: "textarea" },
      { key: "price", label: "Prijs", type: "text" },
      { key: "priceSubtext", label: "Prijs ondertekst", type: "text" },
      { key: "dates", label: "Data", type: "text" },
      { key: "location", label: "Locatie", type: "text" },
      { key: "groupSize", label: "Groepsgrootte", type: "text" },
      { key: "schedule", label: "Programma", type: "text" },
      { key: "ctaText", label: "Aanmeld knop tekst", type: "text" },
    ],
  },
  {
    key: "testimonials",
    label: "Testimonials",
    type: "group",
    fields: [
      { key: "title", label: "Titel", type: "text" },
      { key: "subtitle", label: "Ondertitel", type: "textarea" },
    ],
  },
  {
    key: "finalCta",
    label: "Afsluitende sectie",
    type: "group",
    fields: [
      { key: "title", label: "Titel", type: "text" },
      { key: "text", label: "Tekst", type: "textarea" },
      { key: "ctaPrimary", label: "Primaire knop", type: "text" },
      { key: "ctaSecondary", label: "Secundaire knop", type: "text" },
    ],
  },
];

const wietskeFields: FieldConfig[] = [
  {
    key: "hero",
    label: "Hero sectie",
    type: "group",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "title", label: "Titel", type: "text" },
      { key: "text1", label: "Tekst", type: "textarea" },
    ],
  },
  {
    key: "background",
    label: "Achtergrond",
    type: "group",
    fields: [
      { key: "text1", label: "Tekst 1", type: "textarea" },
      { key: "text2", label: "Tekst 2", type: "textarea" },
      { key: "text3", label: "Tekst 3", type: "textarea" },
    ],
  },
  {
    key: "whoIAm",
    label: "Wie ik ben",
    type: "group",
    fields: [
      { key: "title", label: "Titel", type: "text" },
      { key: "text", label: "Tekst", type: "textarea" },
    ],
  },
  {
    key: "cta",
    label: "Call-to-action",
    type: "group",
    fields: [
      { key: "title", label: "Titel", type: "text" },
      { key: "text", label: "Tekst", type: "textarea" },
    ],
  },
];

const contactFields: FieldConfig[] = [
  { key: "title", label: "Pagina titel", type: "text" },
  { key: "subtitle", label: "Ondertitel", type: "textarea" },
  { key: "email", label: "E-mailadres", type: "text" },
  { key: "phone", label: "Telefoonnummer", type: "text" },
  { key: "address", label: "Adres", type: "text" },
  { key: "city", label: "Plaats", type: "text" },
];

const pages = [
  { id: "home", label: "Homepagina", fields: homeFields },
  { id: "wietske", label: "Over Wietske", fields: wietskeFields },
  { id: "contact", label: "Contact", fields: contactFields },
];

function getValue(data: ContentData, path: string): string {
  const keys = path.split(".");
  let val: unknown = data;
  for (const k of keys) {
    if (val && typeof val === "object") val = (val as Record<string, unknown>)[k];
    else return "";
  }
  return typeof val === "string" ? val : "";
}

function setValue(data: ContentData, path: string, value: string): ContentData {
  const result = JSON.parse(JSON.stringify(data));
  const keys = path.split(".");
  let obj: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!obj[keys[i]] || typeof obj[keys[i]] !== "object") obj[keys[i]] = {};
    obj = obj[keys[i]] as Record<string, unknown>;
  }
  obj[keys[keys.length - 1]] = value;
  return result;
}

function FieldInput({
  field,
  prefix,
  data,
  onChange,
}: {
  field: FieldConfig;
  prefix: string;
  data: ContentData;
  onChange: (path: string, value: string) => void;
}) {
  const path = prefix ? `${prefix}.${field.key}` : field.key;

  if (field.type === "group") {
    return (
      <div className="border border-gray-200 rounded-lg p-5 space-y-4 bg-white">
        <h3 className="font-semibold text-gray-800 text-lg">{field.label}</h3>
        {field.fields?.map((f) => (
          <FieldInput key={f.key} field={f} prefix={path} data={data} onChange={onChange} />
        ))}
      </div>
    );
  }

  const value = getValue(data, path);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
      {field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
        />
      )}
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [data, setData] = useState<ContentData | null>(null);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadPage = useCallback(async (pageId: string) => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch(`/api/content?page=${pageId}`, {
        headers: { "x-admin-password": password },
      });
      if (!res.ok) {
        if (res.status === 401) { setAuthenticated(false); return; }
        throw new Error("Kon pagina niet laden");
      }
      const result = await res.json();
      setData(result.content);
      setSha(result.sha);
    } catch {
      setError("Kon pagina niet laden. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (authenticated) loadPage(activePage);
  }, [authenticated, activePage, loadPage]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/content?page=home`, {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        setAuthenticated(true);
      } else {
        setError("Onjuist wachtwoord");
      }
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ page: activePage, content: data, sha }),
      });
      if (!res.ok) throw new Error("Opslaan mislukt");
      setMessage("Opgeslagen! De website wordt binnen 1 minuut bijgewerkt.");
      // Reload to get new sha
      await loadPage(activePage);
    } catch {
      setError("Opslaan mislukt. Probeer het opnieuw.");
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (path: string, value: string) => {
    if (data) setData(setValue(data, path, value));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Breinstillers Admin</h1>
          <p className="text-gray-500 text-sm mb-6">Voer het wachtwoord in om de website te bewerken.</p>
          {error && <p className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none mb-4"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Inloggen
          </button>
        </form>
      </div>
    );
  }

  const activePageConfig = pages.find((p) => p.id === activePage)!;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Breinstillers Admin</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Opslaan..." : "Opslaan"}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 flex gap-1">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activePage === page.id
                  ? "border-green-600 text-green-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {message && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Laden...</p>
        ) : data ? (
          <div className="space-y-6">
            {activePageConfig.fields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                prefix=""
                data={data}
                onChange={handleFieldChange}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
