import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Brain,
  Sparkles,
  Shield,
  Users,
  Eye,
  Compass,
  Flame,
  Check,
  Star,
  Calendar,
  MapPin,
  Clock,
  Sun,
  Leaf,
  Hand,
  Lightbulb,
  Target,
  Smile,
  TreePine,
  Mountain,
  type LucideIcon,
} from "lucide-react";
import homeData from "../../content/pages/home.json";

const iconMap: Record<string, LucideIcon> = {
  Heart, Brain, Sparkles, Shield, Users, Eye, Compass, Flame, Star,
  Sun, Leaf, Hand, Lightbulb, Target, Smile, TreePine, Mountain,
  Calendar, MapPin, Clock, Check,
};

export default function Home() {
  const { hero, painPoints, approach, aboutBrief, benefits, training, testimonials, finalCta } = homeData;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-sage-800/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-sage-900/80 via-sage-800/50 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8 animate-fade-up backdrop-blur-sm">
              <Sparkles size={16} />
              <span>{hero.badge}</span>
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up">
              {hero.titleLine1}
              <br />
              <span className="text-lime">{hero.titleLine2}</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-4 max-w-2xl animate-fade-up">
              {hero.subtitle1}
            </p>

            <p className="text-lg sm:text-xl text-white leading-relaxed mb-10 max-w-2xl font-medium animate-fade-up">
              {hero.subtitle2}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
              <Link
                href="#training"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lime text-sage-800 rounded-full text-lg font-bold hover:bg-lime-dark transition-all hover:scale-105 shadow-xl"
              >
                {hero.ctaPrimary}
                <ArrowRight size={20} />
              </Link>
              <Link
                href="#werkwijze"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
              >
                {hero.ctaSecondary}
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-4 animate-fade-up">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center backdrop-blur-sm"
                  >
                    <Heart size={14} className="text-lime" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/80">
                <span className="font-semibold text-white">{hero.socialProof}</span>{" "}
                vonden hun weg terug naar levendigheid
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAIN POINTS / EMPATHY ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-sage-800 mb-6">
              {painPoints.title}
            </h2>
            <p className="text-lg text-sage-600/80 leading-relaxed">
              {painPoints.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.items.map((item) => {
              const Icon = iconMap[item.icon] || Brain;
              return (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl bg-sage-50/50 border border-sage-100 hover:border-sage-200 transition-all hover:shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sage-500/10 flex items-center justify-center mb-5 group-hover:bg-sage-500/20 transition-colors">
                    <Icon size={24} className="text-sage-500" />
                  </div>
                  <h3 className="font-semibold text-sage-800 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sage-600/70 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SOLUTION / APPROACH ===== */}
      <section id="werkwijze" className="py-20 sm:py-28 bg-sage-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                <Image
                  src={approach.image}
                  alt="Zonsondergang met vetplant"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-700/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-[240px]">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={20} className="text-sage-500" />
                  <span className="font-semibold text-sage-800">
                    Veilig & vertrouwd
                  </span>
                </div>
                <p className="text-sm text-sage-600/70">
                  Geen focus op schijnbaar optimisme, maar op erkenning.
                </p>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/20 rounded-full text-sage-600 text-sm font-medium mb-6">
                {approach.label}
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-sage-800 mb-6">
                {approach.title}
              </h2>
              <p className="text-lg text-sage-600/80 leading-relaxed mb-6">
                {approach.text1}
              </p>
              <p className="text-lg text-sage-600/80 leading-relaxed mb-8">
                {approach.text2}
              </p>

              <ul className="space-y-4">
                {approach.bulletPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-lime/30 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-sage-600" />
                    </div>
                    <span className="text-sage-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT WIETSKE (BRIEF) ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/20 rounded-full text-sage-600 text-sm font-medium mb-6">
                {aboutBrief.label}
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-sage-800 mb-6">
                {aboutBrief.title}
              </h2>
              <p className="text-lg text-sage-600/80 leading-relaxed mb-4">
                {aboutBrief.text1}
              </p>
              <p className="text-lg text-sage-600/80 leading-relaxed mb-4">
                {aboutBrief.text2}
              </p>
              <p className="text-lg text-sage-600/80 leading-relaxed mb-8">
                {aboutBrief.text3}
              </p>
              <Link
                href="/wietske"
                className="inline-flex items-center gap-2 text-sage-500 font-semibold hover:text-sage-600 transition-colors"
              >
                Lees meer over Wietske
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden relative bg-sage-50">
                <Image
                  src={aboutBrief.portrait}
                  alt="Wietske Hagg"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-3xl bg-sage-200/50" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section id="aanbod" className="py-20 sm:py-28 bg-sage-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/20 rounded-full text-sage-600 text-sm font-medium mb-6">
              {benefits.label}
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-sage-800 mb-6">
              {benefits.title}
            </h2>
            <p className="text-lg text-sage-600/80">
              {benefits.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {benefits.items.map((item) => {
              const Icon = iconMap[item.icon] || Heart;
              return (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl border border-sage-100 hover:border-sage-200 hover:shadow-lg transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-lime/20 flex items-center justify-center mb-4 group-hover:bg-lime/30 transition-colors">
                    <Icon size={20} className="text-sage-600" />
                  </div>
                  <h3 className="font-semibold text-sage-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-sage-600/70">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TRAINING OFFER (PRIMARY CTA) ===== */}
      <section id="training" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-700 via-sage-600 to-sage-800 p-8 sm:p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-sage-500/20 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/20 rounded-full text-lime text-sm font-medium mb-6">
                  <Star size={14} />
                  {training.badge}
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {training.title}
                </h2>
                <p className="text-sage-200 text-lg leading-relaxed mb-6">
                  {training.text1}
                </p>
                <p className="text-sage-200 text-lg leading-relaxed mb-8">
                  {training.text2}
                </p>

                <ul className="space-y-3 mb-8">
                  {training.features.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sage-100"
                    >
                      <Check
                        size={18}
                        className="text-lime shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-2xl">
                <div className="text-center mb-8">
                  <p className="text-sage-500 font-semibold text-sm uppercase tracking-wider mb-2">
                    3-Daagse Live Training
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl sm:text-6xl font-bold text-sage-800">
                      {training.price}
                    </span>
                  </div>
                  <p className="text-sage-600/60 mt-2">
                    {training.priceSubtext}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sage-700">
                    <Calendar size={18} className="text-sage-400 shrink-0" />
                    <span>{training.dates}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sage-700">
                    <MapPin size={18} className="text-sage-400 shrink-0" />
                    <span>{training.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sage-700">
                    <Users size={18} className="text-sage-400 shrink-0" />
                    <span>{training.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sage-700">
                    <Clock size={18} className="text-sage-400 shrink-0" />
                    <span>{training.schedule}</span>
                  </div>
                </div>

                <Link
                  href="/contact?onderwerp=training"
                  className="block w-full text-center px-8 py-4 bg-sage-500 text-white rounded-full text-lg font-semibold hover:bg-sage-600 transition-all hover:scale-105 shadow-lg shadow-sage-500/25 mb-4"
                >
                  {training.ctaText}
                </Link>
                <p className="text-center text-sm text-sage-600/60">
                  Of neem eerst{" "}
                  <Link
                    href="/contact"
                    className="text-sage-500 underline hover:text-sage-600"
                  >
                    vrijblijvend contact
                  </Link>{" "}
                  op voor meer informatie
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 sm:py-28 bg-sage-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-sage-800 mb-6">
              {testimonials.title}
            </h2>
            <p className="text-lg text-sage-600/80">
              {testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.items.map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-sage-100"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className="text-lime-dark fill-lime-dark"
                    />
                  ))}
                </div>
                <p className="text-sage-600/80 leading-relaxed mb-6 italic">
                  &quot;{item.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage-100" />
                  <div>
                    <p className="font-semibold text-sage-800 text-sm">
                      {item.name}
                    </p>
                    <p className="text-sage-600/60 text-xs">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <Image
          src="/images/zonsondergang-vetplant.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-sage-800/70" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {finalCta.title}
          </h2>
          <p className="text-sage-200 text-lg sm:text-xl leading-relaxed mb-10">
            {finalCta.text}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?onderwerp=training"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lime text-sage-800 rounded-full text-lg font-bold hover:bg-lime-dark transition-all hover:scale-105 shadow-xl"
            >
              {finalCta.ctaPrimary}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-sage-300/30 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
            >
              {finalCta.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STRUCTURED DATA ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Breinstillers",
            description:
              "Persoonlijke begeleiding bij chronische pijn. Van overleven naar levendigheid.",
            url: "https://breinstillers.nl",
            telephone: "+31611119986",
            email: "Wietske@breinstillers.nl",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Gorssel",
              addressCountry: "NL",
            },
            founder: {
              "@type": "Person",
              name: "Wietske Hagg",
            },
          }),
        }}
      />
    </>
  );
}
