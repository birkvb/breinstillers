import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sage-700 text-sage-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-3">
              Breinstillers
            </h3>
            <p className="text-sage-200 text-sm leading-relaxed">
              Van overleven naar levendigheid. Persoonlijke begeleiding voor
              mensen die leven met chronische pijn.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigatie</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-sage-200 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#aanbod"
                  className="text-sage-200 hover:text-white transition-colors"
                >
                  Aanbod
                </Link>
              </li>
              <li>
                <Link
                  href="/wietske"
                  className="text-sage-200 hover:text-white transition-colors"
                >
                  Over Wietske
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sage-200 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-lime shrink-0" />
                <a
                  href="mailto:Wietske@breinstillers.nl"
                  className="text-sage-200 hover:text-white transition-colors"
                >
                  Wietske@breinstillers.nl
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-lime shrink-0" />
                <a
                  href="tel:+31611119986"
                  className="text-sage-200 hover:text-white transition-colors"
                >
                  +31(0)6 11 11 99 86
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-lime shrink-0 mt-0.5" />
                <span className="text-sage-200">
                  Ravensweerdweg 19, Gorssel
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-600 mt-10 pt-6 text-center text-xs text-sage-300">
          &copy; {new Date().getFullYear()} Breinstillers &mdash; Wietske Hagg.
          Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
