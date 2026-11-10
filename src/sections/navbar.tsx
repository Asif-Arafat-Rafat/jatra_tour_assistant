
import { useState } from "react";

const navigation = {
  en: [
    { label: "Home", href: "#home" },
    { label: "Find Routes", href: "#routes" },
    { label: "Bus Directory", href: "#buses" },
    { label: "Fare Calculator", href: "#fare" },
    { label: "Explore Map", href: "#map" },
  ],
  bn: [
    { label: "হোম", href: "#home" },
    { label: "বাসের রুট", href: "#routes" },
    { label: "বাস তালিকা", href: "#buses" },
    { label: "ভাড়া হিসাব", href: "#fare" },
    { label: "মানচিত্র", href: "#map" },
  ],
};

export default function Navbar({
  language = "en",
  onLanguageChange,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const isBangla = language === "bn";

  const t = {
    en: {
      brand: "Dhaka Bus Finder",
      tagline: "TRAVEL MADE SIMPLE",
      plan: "Plan a Journey",
      menu: "Open navigation menu",
      close: "Close navigation menu",
    },
    bn: {
      brand: "ঢাকা বাস ফাইন্ডার",
      tagline: "যাতায়াত হোক সহজ",
      plan: "যাত্রা পরিকল্পনা",
      menu: "মেনু খুলুন",
      close: "মেনু বন্ধ করুন",
    },
  }[language];

  const links = navigation[language];

  const handleNavigation = (href) => {
    setActiveLink(href);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-surface/90 shadow-sm backdrop-blur-xl">

      <nav
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        {/* BRAND */}
        <a
          href="#home"
          onClick={() => handleNavigation("#home")}
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-2xl shadow-md transition duration-300 group-hover:-rotate-6 group-hover:scale-105">
            🚌
          </div>

          <div className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-primary sm:text-lg">
              {t.brand}
            </span>

            <span className="mt-1 block text-[9px] font-bold tracking-[0.18em] text-text/50">
              {t.tagline}
            </span>
          </div>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavigation(item.href)}
              className={`relative rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                activeLink === item.href
                  ? "bg-secondary/10 text-secondary"
                  : "text-text/70 hover:bg-background hover:text-primary"
              }`}
            >
              {item.label}

              {activeLink === item.href && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-secondary" />
              )}
            </a>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Language */}
          <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
            <button
              type="button"
              onClick={() => onLanguageChange?.("en")}
              aria-pressed={!isBangla}
              className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                !isBangla
                  ? "bg-primary text-white shadow-sm"
                  : "text-text/60 hover:text-primary"
              }`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => onLanguageChange?.("bn")}
              aria-pressed={isBangla}
              className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                isBangla
                  ? "bg-primary text-white shadow-sm"
                  : "text-text/60 hover:text-primary"
              }`}
            >
              বাংলা
            </button>
          </div>

          {/* Primary CTA */}
          <a
            href="#hero-from"
            className="group flex items-center gap-2 rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-white shadow-md shadow-secondary/15 transition duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg"
          >
            {t.plan}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-3 lg:hidden">

          <button
            type="button"
            onClick={() =>
              onLanguageChange?.(isBangla ? "en" : "bn")
            }
            className="rounded-lg border border-border px-3 py-2 text-xs font-bold text-primary transition hover:bg-background"
            aria-label="Change language"
          >
            {isBangla ? "EN" : "বাংলা"}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t.close : t.menu}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-primary transition hover:bg-background"
          >
            {mobileOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6L18 18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 7H20M4 12H20M4 17H20" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      <div
        className={`overflow-hidden border-t border-border bg-surface transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "max-h-[450px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl space-y-2 px-5 py-5 sm:px-8">

          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavigation(item.href)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                activeLink === item.href
                  ? "bg-secondary/10 text-secondary"
                  : "text-text hover:bg-background"
              }`}
            >
              {item.label}
              <span>→</span>
            </a>
          ))}

          <a
            href="#hero-from"
            onClick={() => setMobileOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-4 font-bold text-white transition hover:bg-primary"
          >
            {t.plan}
            <span>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
