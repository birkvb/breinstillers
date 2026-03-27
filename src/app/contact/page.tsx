"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import contactData from "../../../content/pages/contact.json";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    telefoon: "",
    onderwerp: "algemeen",
    bericht: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Breinstillers: ${formData.onderwerp === "training" ? "Aanmelding 3-Daagse Training" : "Contactverzoek"}`
    );
    const body = encodeURIComponent(
      `Naam: ${formData.naam}\nEmail: ${formData.email}\nTelefoon: ${formData.telefoon}\n\n${formData.bericht}`
    );
    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-to-b from-sage-50 to-warm-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-sage-800 leading-tight mb-6">
            {contactData.title}
          </h1>
          <p className="text-lg text-sage-600/80 leading-relaxed">
            {contactData.subtitle}
          </p>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="naam"
                      className="block text-sm font-medium text-sage-700 mb-2"
                    >
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="naam"
                      required
                      value={formData.naam}
                      onChange={(e) =>
                        setFormData({ ...formData, naam: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 outline-none transition-all bg-warm-50"
                      placeholder="Je naam"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-sage-700 mb-2"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 outline-none transition-all bg-warm-50"
                      placeholder="je@email.nl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="telefoon"
                      className="block text-sm font-medium text-sage-700 mb-2"
                    >
                      Telefoon
                    </label>
                    <input
                      type="tel"
                      id="telefoon"
                      value={formData.telefoon}
                      onChange={(e) =>
                        setFormData({ ...formData, telefoon: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 outline-none transition-all bg-warm-50"
                      placeholder="06 - ..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="onderwerp"
                      className="block text-sm font-medium text-sage-700 mb-2"
                    >
                      Onderwerp
                    </label>
                    <select
                      id="onderwerp"
                      value={formData.onderwerp}
                      onChange={(e) =>
                        setFormData({ ...formData, onderwerp: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 outline-none transition-all bg-warm-50"
                    >
                      <option value="algemeen">Algemene vraag</option>
                      <option value="training">
                        3-Daagse Training ({contactData.email ? "€1.199" : "€1.199"})
                      </option>
                      <option value="individueel">Individueel gesprek</option>
                      <option value="kennismaking">
                        Kennismakingsgesprek
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bericht"
                    className="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Je bericht *
                  </label>
                  <textarea
                    id="bericht"
                    required
                    rows={6}
                    value={formData.bericht}
                    onChange={(e) =>
                      setFormData({ ...formData, bericht: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 outline-none transition-all bg-warm-50 resize-none"
                    placeholder="Vertel me wat je bezighoudt of stel je vraag..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sage-500 text-white rounded-full text-lg font-semibold hover:bg-sage-600 transition-all hover:scale-105 shadow-lg shadow-sage-500/25"
                >
                  <Send size={18} />
                  Verstuur bericht
                </button>
              </form>
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-sage-50 rounded-2xl p-8 sticky top-28">
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-sage-800 mb-6">
                  Contactgegevens
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-lime/20 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-sage-600" />
                    </div>
                    <div>
                      <p className="text-sm text-sage-600/60 mb-1">E-mail</p>
                      <a
                        href={`mailto:${contactData.email}`}
                        className="text-sage-700 font-medium hover:text-sage-500 transition-colors"
                      >
                        {contactData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-lime/20 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-sage-600" />
                    </div>
                    <div>
                      <p className="text-sm text-sage-600/60 mb-1">Telefoon</p>
                      <a
                        href={`tel:${contactData.phone.replace(/[^+\d]/g, "")}`}
                        className="text-sage-700 font-medium hover:text-sage-500 transition-colors"
                      >
                        {contactData.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-lime/20 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-sage-600" />
                    </div>
                    <div>
                      <p className="text-sm text-sage-600/60 mb-1">Locatie</p>
                      <p className="text-sage-700 font-medium">
                        {contactData.address}
                        <br />
                        {contactData.city}
                      </p>
                      <p className="text-sm text-sage-600/60 mt-1">
                        Ook online of telefonisch mogelijk
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-sage-200 pt-6">
                  <p className="text-sage-600/70 text-sm leading-relaxed mb-4">
                    Interesse in de 3-Daagse Training? Meld je direct aan of
                    stel eerst je vragen.
                  </p>
                  <Link
                    href="/#training"
                    className="inline-flex items-center gap-2 text-sage-500 font-semibold text-sm hover:text-sage-600 transition-colors"
                  >
                    Meer over de Training
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
