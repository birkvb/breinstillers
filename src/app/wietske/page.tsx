import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import wietskeData from "../../../content/pages/wietske.json";

export const metadata: Metadata = {
  title: "Over Wietske | Breinstillers",
  description:
    "Maak kennis met Wietske Hagg — betrokken gids met jarenlange ervaring in begeleiding bij chronische pijn. Culturele antropologie, systemisch werk, gestalt, ACT, yoga en meditatie.",
  openGraph: {
    title: "Over Wietske | Breinstillers",
    description:
      "Betrokken gids met oprechte belangstelling voor het leven zoals het zich aandient.",
  },
};

export default function WietskePage() {
  const { hero, background, whoIAm, training, cta } = wietskeData;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-sage-50 to-warm-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/20 rounded-full text-sage-600 text-sm font-medium mb-6">
                {hero.label}
              </div>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-sage-800 leading-tight mb-6">
                {hero.title}
              </h1>
              <p className="text-lg text-sage-600/80 leading-relaxed">
                {hero.text1}
              </p>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                <Image
                  src={hero.portrait}
                  alt="Wietske Hagg"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-3xl bg-sage-200/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Background & Approach */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-6 text-lg text-sage-600/80 leading-relaxed">
            <p>{background.text1}</p>
            <p>{background.text2}</p>
            <p>{background.text3}</p>
          </div>
        </div>
      </section>

      {/* Personal qualities */}
      <section className="py-20 sm:py-28 bg-sage-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-sage-800 mb-8">
                {whoIAm.title}
              </h2>
              <div className="space-y-6 text-lg text-sage-600/80 leading-relaxed">
                {whoIAm.text.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-sage-800 mb-8">
                {training.title}
              </h2>
              <div className="bg-white p-8 rounded-2xl border border-sage-100">
                <p className="text-lg text-sage-600/80 leading-relaxed mb-6">
                  Anderen zeggen dat ik onverwachte nieuwe invalshoeken geef en
                  dat ik verrassende perspectieven produceer. Een
                  antropologische blik, analytisch vermogen, gecombineerd met
                  sensitiviteit en een scherp oog en oor voor details. Dat
                  levert wat nieuws op.
                </p>

                <h3 className="font-semibold text-sage-800 mb-4">
                  Mijn achtergrond
                </h3>
                <ul className="space-y-3">
                  {training.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-lime/30 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-sage-600" />
                      </div>
                      <span className="text-sage-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-sage-700 to-sage-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-white mb-6">
            {cta.title}
          </h2>
          <p className="text-sage-200 text-lg leading-relaxed mb-10">
            {cta.text}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lime text-sage-800 rounded-full text-lg font-bold hover:bg-lime-dark transition-all hover:scale-105 shadow-xl"
            >
              Neem contact op
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/#training"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-sage-300/30 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Bekijk de Training
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
