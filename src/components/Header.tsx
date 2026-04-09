"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-50/80 backdrop-blur-lg border-b border-sage-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-boom.png"
              alt="Breinstillers"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <span className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-sage-700">
              Breinstillers
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#aanbod"
              className="text-sage-600 hover:text-sage-700 transition-colors text-sm font-medium"
            >
              Aanbod
            </Link>
            <Link
              href="/wietske"
              className="text-sage-600 hover:text-sage-700 transition-colors text-sm font-medium"
            >
              Over Wietske
            </Link>
            <Link
              href="/contact"
              className="text-sage-600 hover:text-sage-700 transition-colors text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              href="/#training"
              className="inline-flex items-center px-5 py-2.5 bg-sage-500 text-white rounded-full text-sm font-semibold hover:bg-sage-600 transition-all hover:scale-105 shadow-lg shadow-sage-500/25"
            >
              Bekijk de Training
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-sage-600"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <nav className="md:hidden pb-6 border-t border-sage-100 pt-4 flex flex-col gap-4">
            <Link
              href="/#aanbod"
              onClick={() => setIsOpen(false)}
              className="text-sage-600 hover:text-sage-700 transition-colors font-medium"
            >
              Aanbod
            </Link>
            <Link
              href="/wietske"
              onClick={() => setIsOpen(false)}
              className="text-sage-600 hover:text-sage-700 transition-colors font-medium"
            >
              Over Wietske
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="text-sage-600 hover:text-sage-700 transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              href="/#training"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-sage-500 text-white rounded-full font-semibold hover:bg-sage-600 transition-all"
            >
              Bekijk de Training
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
