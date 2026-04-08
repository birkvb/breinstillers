"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type ContentData = Record<string, unknown>;

// ─── Icon list (must match iconMap in page.tsx) ───
const AVAILABLE_ICONS = [
  { name: "Brain", label: "Brein" },
  { name: "Heart", label: "Hart" },
  { name: "Eye", label: "Oog" },
  { name: "Sparkles", label: "Sterretjes" },
  { name: "Shield", label: "Schild" },
  { name: "Users", label: "Mensen" },
  { name: "Compass", label: "Kompas" },
  { name: "Flame", label: "Vlam" },
  { name: "Star", label: "Ster" },
  { name: "Sun", label: "Zon" },
  { name: "Leaf", label: "Blad" },
  { name: "Hand", label: "Hand" },
  { name: "Lightbulb", label: "Lamp" },
  { name: "Target", label: "Doel" },
  { name: "Smile", label: "Smiley" },
  { name: "TreePine", label: "Boom" },
  { name: "Mountain", label: "Berg" },
];

// ─── Field config types ───
interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "icon" | "group" | "array";
  fields?: FieldConfig[];
  itemLabel?: string; // For arrays: label prefix per item
}

// ─── Page field definitions ───
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
      { key: "backgroundImage", label: "Achtergrondafbeelding", type: "image" },
    ],
  },
  {
    key: "painPoints",
    label: "Herken je dit? sectie",
    type: "group",
    fields: [
      { key: "title", label: "Titel", type: "text" },
      { key: "subtitle", label: "Ondertitel", type: "textarea" },
      {
        key: "items",
        label: "Blokken",
        type: "array",
        itemLabel: "Blok",
        fields: [
          { key: "title", label: "Titel", type: "text" },
          { key: "text", label: "Tekst", type: "textarea" },
          { key: "icon", label: "Icoon", type: "icon" },
        ],
      },
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
      { key: "image", label: "Afbeelding", type: "image" },
      {
        key: "bulletPoints",
        label: "Opsommingspunten",
        type: "array",
        fields: [{ key: "_value", label: "Punt", type: "text" }],
      },
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
      { key: "portrait", label: "Portretfoto", type: "image" },
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
      {
        key: "items",
        label: "Voordelen",
        type: "array",
        itemLabel: "Voordeel",
        fields: [
          { key: "title", label: "Titel", type: "text" },
          { key: "text", label: "Tekst", type: "text" },
          { key: "icon", label: "Icoon", type: "icon" },
        ],
      },
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
      {
        key: "features",
        label: "Kenmerken",
        type: "array",
        fields: [{ key: "_value", label: "Kenmerk", type: "text" }],
      },
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
    label: "Reviews",
    type: "group",
    fields: [
      { key: "title", label: "Titel", type: "text" },
      { key: "subtitle", label: "Ondertitel", type: "textarea" },
      {
        key: "items",
        label: "Reviews",
        type: "array",
        itemLabel: "Review",
        fields: [
          { key: "quote", label: "Citaat", type: "textarea" },
          { key: "name", label: "Naam", type: "text" },
          { key: "role", label: "Rol", type: "text" },
        ],
      },
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
      { key: "portrait", label: "Portretfoto", type: "image" },
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
    key: "training",
    label: "Achtergrond & opleiding",
    type: "group",
    fields: [
      { key: "title", label: "Titel", type: "text" },
      {
        key: "items",
        label: "Opleidingen",
        type: "array",
        fields: [{ key: "_value", label: "Opleiding", type: "text" }],
      },
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

// ─── Data helpers ───
function getValue(data: ContentData, path: string): unknown {
  const keys = path.split(".");
  let val: unknown = data;
  for (const k of keys) {
    if (val && typeof val === "object") val = (val as Record<string, unknown>)[k];
    else return undefined;
  }
  return val;
}

function setValue(data: ContentData, path: string, value: unknown): ContentData {
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

// ─── Collapsible section ───
function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-lg">{title}</span>
        <svg className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">{children}</div>}
    </div>
  );
}

// ─── Image upload ───
function ImageUpload({ value, onChange, password, label }: { value: string; onChange: (p: string) => void; password: string; label: string }) {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalPreview(URL.createObjectURL(file));
    setUploading(true);
    setUploadSuccess(false);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", headers: { "x-admin-password": password }, body: fd });
      if (!res.ok) throw new Error();
      const result = await res.json();
      onChange(result.path);
      setUploadSuccess(true);
    } catch {
      setLocalPreview(null);
      alert("Afbeelding uploaden mislukt. Probeer het opnieuw.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-start gap-4">
        {(localPreview || value) && (
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={localPreview || value} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-2 truncate max-w-xs">{value || "Geen afbeelding"}</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
            {uploading ? "Uploaden..." : value ? "Andere afbeelding" : "Afbeelding uploaden"}
          </button>
          {uploadSuccess ? (
            <p className="text-xs text-green-600 font-medium mt-1">Gelukt! Klik op &quot;Opslaan&quot; om door te voeren.</p>
          ) : (
            <p className="text-xs text-gray-400 mt-1">Na uploaden nog op &quot;Opslaan&quot; klikken.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Icon picker ───
function IconPicker({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
      >
        {AVAILABLE_ICONS.map((icon) => (
          <option key={icon.name} value={icon.name}>
            {icon.label} ({icon.name})
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Array field (reorder, add, remove) ───
function ArrayField({
  field,
  path,
  data,
  onChange,
  password,
}: {
  field: FieldConfig;
  path: string;
  data: ContentData;
  onChange: (path: string, value: unknown) => void;
  password: string;
}) {
  const arr = (getValue(data, path) as unknown[]) || [];
  const isStringArray = field.fields?.length === 1 && field.fields[0].key === "_value";

  const setArray = (newArr: unknown[]) => onChange(path, newArr);

  const moveItem = (index: number, direction: -1 | 1) => {
    const newArr = [...arr];
    const target = index + direction;
    if (target < 0 || target >= newArr.length) return;
    [newArr[index], newArr[target]] = [newArr[target], newArr[index]];
    setArray(newArr);
  };

  const removeItem = (index: number) => {
    if (!confirm("Weet je zeker dat je dit item wilt verwijderen?")) return;
    setArray(arr.filter((_, i) => i !== index));
  };

  const addItem = () => {
    if (isStringArray) {
      setArray([...arr, ""]);
    } else {
      const newItem: Record<string, string> = {};
      field.fields?.forEach((f) => { newItem[f.key] = f.type === "icon" ? "Heart" : ""; });
      setArray([...arr, newItem]);
    }
  };

  const updateItem = (index: number, key: string, value: string) => {
    const newArr = [...arr];
    if (isStringArray) {
      newArr[index] = value;
    } else {
      newArr[index] = { ...(newArr[index] as Record<string, unknown>), [key]: value };
    }
    setArray(newArr);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
      <div className="space-y-3">
        {arr.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                {field.itemLabel ? `${field.itemLabel} ${index + 1}` : `#${index + 1}`}
              </span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 text-gray-500" title="Omhoog">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button type="button" onClick={() => moveItem(index, 1)} disabled={index === arr.length - 1} className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 text-gray-500" title="Omlaag">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <button type="button" onClick={() => removeItem(index)} className="p-1 rounded hover:bg-red-100 text-red-400 hover:text-red-600 ml-1" title="Verwijderen">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {isStringArray ? (
              <input
                type="text"
                value={typeof item === "string" ? item : ""}
                onChange={(e) => updateItem(index, "_value", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            ) : (
              <div className="space-y-3">
                {field.fields?.map((subField) => {
                  const itemData = item as Record<string, unknown>;
                  const val = typeof itemData[subField.key] === "string" ? (itemData[subField.key] as string) : "";

                  if (subField.type === "icon") {
                    return <IconPicker key={subField.key} value={val || "Heart"} onChange={(v) => updateItem(index, subField.key, v)} label={subField.label} />;
                  }
                  if (subField.type === "image") {
                    return <ImageUpload key={subField.key} value={val} onChange={(v) => updateItem(index, subField.key, v)} password={password} label={subField.label} />;
                  }

                  return (
                    <div key={subField.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{subField.label}</label>
                      {subField.type === "textarea" ? (
                        <textarea
                          value={val}
                          onChange={(e) => updateItem(index, subField.key, e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      ) : (
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => updateItem(index, subField.key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-green-500 hover:text-green-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        Toevoegen
      </button>
    </div>
  );
}

// ─── Recursive field renderer ───
function FieldInput({ field, prefix, data, onChange, password }: { field: FieldConfig; prefix: string; data: ContentData; onChange: (path: string, value: unknown) => void; password: string }) {
  const path = prefix ? `${prefix}.${field.key}` : field.key;

  if (field.type === "group") {
    return (
      <Section title={field.label}>
        {field.fields?.map((f) => (
          <FieldInput key={f.key} field={f} prefix={path} data={data} onChange={onChange} password={password} />
        ))}
      </Section>
    );
  }

  if (field.type === "array") {
    return <ArrayField field={field} path={path} data={data} onChange={onChange} password={password} />;
  }

  const value = getValue(data, path);
  const strVal = typeof value === "string" ? value : "";

  if (field.type === "image") {
    return <ImageUpload value={strVal} onChange={(v) => onChange(path, v)} password={password} label={field.label} />;
  }

  if (field.type === "icon") {
    return <IconPicker value={strVal || "Heart"} onChange={(v) => onChange(path, v)} label={field.label} />;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
      {field.type === "textarea" ? (
        <textarea
          value={strVal}
          onChange={(e) => onChange(path, e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
        />
      ) : (
        <input
          type="text"
          value={strVal}
          onChange={(e) => onChange(path, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
        />
      )}
    </div>
  );
}

// ─── Main admin page ───
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
      const res = await fetch(`/api/content?page=${pageId}`, { headers: { "x-admin-password": password } });
      if (!res.ok) {
        if (res.status === 401) { setAuthenticated(false); return; }
        throw new Error();
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
      const res = await fetch(`/api/content?page=home`, { headers: { "x-admin-password": password } });
      if (res.ok) setAuthenticated(true);
      else setError("Onjuist wachtwoord");
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
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ page: activePage, content: data, sha }),
      });
      if (!res.ok) throw new Error();
      setMessage("Opgeslagen! De website wordt binnen 1 minuut bijgewerkt.");
      await loadPage(activePage);
    } catch {
      setError("Opslaan mislukt. Probeer het opnieuw.");
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (path: string, value: unknown) => {
    if (data) setData(setValue(data, path, value));
  };

  // ─── Login screen ───
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
          <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Inloggen
          </button>
        </form>
      </div>
    );
  }

  // ─── Admin interface ───
  const activePageConfig = pages.find((p) => p.id === activePage)!;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">Breinstillers Admin</h1>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 text-sm">
            {saving ? "Opslaan..." : "Opslaan"}
          </button>
        </div>
      </header>

      {/* Page tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 flex gap-1">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activePage === page.id ? "border-green-600 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

        {loading ? (
          <p className="text-gray-500">Laden...</p>
        ) : data ? (
          <div className="space-y-4">
            {activePageConfig.fields.map((field) => (
              <FieldInput key={field.key} field={field} prefix="" data={data} onChange={handleFieldChange} password={password} />
            ))}
          </div>
        ) : null}
      </div>

      {/* Bottom save bar (visible when scrolling) */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 md:hidden">
        <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50">
          {saving ? "Opslaan..." : "Opslaan"}
        </button>
      </div>
    </div>
  );
}
