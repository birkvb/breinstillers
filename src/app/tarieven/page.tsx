import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, Users, MessageCircle } from "lucide-react";
import tarievenData from "../../../content/pages/tarieven.json";

export const metadata: Metadata = {
  title: "Tarieven | Breinstillers",
  description:
    "De tarieven van Breinstillers: de 3-daagse live training en individuele gesprekken. Helder en eerlijk, zonder verrassingen achteraf.",
  openGraph: {
    title: "Tarieven | Breinstillers",
    description:
      "Helder en eerlijk over de kosten van de 3-daagse training en individuele gesprekken.",
  },
};

interface Package {
  name: string;
  sessions: string;
  price: string;
  description: string;
}

export default function TarievenPage() {
  const { hero, training, individual, packagesTitle, packagesSubtitle, packages, finalCta } =
    tarievenData;
  const packageList = (packages ?? []) as Package[];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-to-b from-sage-50 to-warm-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/20 rounded-full text-sage-600 text-sm font-medium mb-6">
            {hero.label}
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-sage-800 leading-tight mb-6">
            {hero.title}
          </h1>
          <p className="text-lg text-sage-600/80 leading-relaxed">{hero.subtitle}</p>
        </div>
      </section>

      {/* Vaste tarieven */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Training */}
            <div className="flex flex-col rounded-3xl border border-sage-100 bg-sage-50 p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-500/10 rounded-full text-sage-600 text-sm font-medium mb-6 self-start">
                <Users size={14} />
                Groepstraining
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-sage-800 mb-3">
                {training.title}
              </h2>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-sage-800">{training.price}</span>
              </div>
              <p className="text-sage-600/80 leading-relaxed mb-8 flex-1">
                {training.description}
              </p>
              <Link
                href="/contact?onderwerp=training"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-sage-500 text-white rounded-full font-semibold hover:bg-sage-600 transition-all hover:scale-105 shadow-lg shadow-sage-500/25"
              >
                {training.ctaText}
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Individueel */}
            <div className="flex flex-col rounded-3xl border border-sage-100 bg-sage-50 p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-500/10 rounded-full text-sage-600 text-sm font-medium mb-6 self-start">
                <MessageCircle size={14} />
                1-op-1
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-sage-800 mb-3">
                {individual.title}
              </h2>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-sage-800">{individual.price}</span>
                <span className="text-sage-600/60">{individual.priceUnit}</span>
              </div>
              <p className="text-sage-600/80 leading-relaxed mb-8 flex-1">
                {individual.description}
              </p>
              <Link
                href="/contact?onderwerp=individueel"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-sage-500 text-white rounded-full font-semibold hover:bg-sage-600 transition-all hover:scale-105 shadow-lg shadow-sage-500/25"
              >
                {individual.ctaText}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pakketten (alleen tonen als er pakketten zijn) */}
      {packageList.length > 0 && (
        <section className="py-16 sm:py-24 bg-sage-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-sage-800 mb-4">
                {packagesTitle}
              </h2>
              <p className="text-lg text-sage-600/80 leading-relaxed">{packagesSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packageList.map((pkg, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-2xl bg-white border border-sage-100 p-8 shadow-sm"
                >
                  {pkg.sessions && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/20 rounded-full text-sage-600 text-sm font-medium mb-4 self-start">
                      <Star size={14} />
                      {pkg.sessions}
                    </div>
                  )}
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-sage-800 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-3xl font-bold text-sage-800 mb-4">{pkg.price}</div>
                  {pkg.description && (
                    <p className="text-sage-600/80 leading-relaxed mb-8 flex-1">
                      {pkg.description}
                    </p>
                  )}
                  <Link
                    href="/contact?onderwerp=individueel"
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-sage-300 text-sage-700 rounded-full font-semibold hover:bg-sage-100 transition-all mt-auto"
                  >
                    Aanvragen
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Afsluitende CTA */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-sage-800 mb-4">
            {finalCta.title}
          </h2>
          <p className="text-lg text-sage-600/80 leading-relaxed mb-8">{finalCta.text}</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sage-500 text-white rounded-full text-lg font-semibold hover:bg-sage-600 transition-all hover:scale-105 shadow-lg shadow-sage-500/25"
          >
            {finalCta.ctaText}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
