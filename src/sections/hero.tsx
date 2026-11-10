
import { useState } from "react";

const translations = {
  en: {
    badge: "YOUR CITY, YOUR ROUTE",
    title: "Explore Dhaka.",
    highlight: "Travel Smarter.",
    description:
      "Find the right bus, discover routes, and calculate your fare. Everything you need for a hassle-free journey across Dhaka.",
    planner: "Plan Your Journey",
    plannerDesc: "Where would you like to go today?",
    from: "Starting Point",
    to: "Destination",
    fromPlaceholder: "Where are you now?",
    toPlaceholder: "Where do you want to go?",
    search: "Find Buses",
    popular: "Popular destinations",
    features: ["Find bus routes", "Know your fare", "Explore Dhaka"],
  },
  bn: {
    badge: "আপনার শহর, আপনার যাত্রাপথ",
    title: "ঘুরে দেখুন ঢাকা।",
    highlight: "যাত্রা হোক সহজ।",
    description:
      "খুঁজে নিন সঠিক বাস, জেনে নিন বাসের রুট এবং ভাড়ার পরিমাণ। ঢাকায় আপনার প্রতিটি যাত্রা হোক আরও সহজ।",
    planner: "আপনার যাত্রা পরিকল্পনা করুন",
    plannerDesc: "আজ কোথায় যেতে চান?",
    from: "যাত্রা শুরু",
    to: "গন্তব্য",
    fromPlaceholder: "আপনি কোথায় আছেন?",
    toPlaceholder: "কোথায় যেতে চান?",
    search: "বাস খুঁজুন",
    popular: "জনপ্রিয় গন্তব্য",
    features: ["বাসের রুট খুঁজুন", "ভাড়া জানুন", "ঢাকা ঘুরে দেখুন"],
  },
};

const destinations = [
  "Mirpur",
  "Uttara",
  "Farmgate",
  "Motijheel",
  "Gulistan",
];

export default function Hero({ onSearch ,language}) {
  // const [language, setLanguage] = useState("en");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const t = translations[language];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!from.trim() || !to.trim()) return;

    onSearch?.({ from, to });
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">

        {/* Language switcher */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">

          {/* Left: Hero content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
              <span className="h-2 w-2 rounded-full bg-success" />
              {t.badge}
            </div>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
              {t.title}
              <span className="mt-2 block text-secondary">
                {t.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-text/70 sm:text-lg">
              {t.description}
            </p>

            {/* Features */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4">
              {t.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm font-medium text-text"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-success">
                    ✓
                  </span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Journey planner */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-secondary/10 blur-xl" />

            <div className="relative rounded-3xl border border-border bg-surface p-6 shadow-xl sm:p-8">

              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-2xl">
                    🚌
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-primary sm:text-2xl">
                      {t.planner}
                    </h2>
                    <p className="mt-1 text-sm text-text/60">
                      {t.plannerDesc}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSearch}>

                {/* Starting point */}
                <div>
                  <label
                    htmlFor="from"
                    className="mb-2 block text-sm font-semibold text-text"
                  >
                    {t.from}
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/10">
                    <span className="text-xl text-secondary">●</span>
                    <input
                      id="from"
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder={t.fromPlaceholder}
                      className="w-full bg-transparent py-4 text-sm text-text outline-none placeholder:text-text/40"
                      required
                    />
                  </div>
                </div>

                {/* Swap locations */}
                <div className="relative flex justify-end px-5">
                  <button
                    type="button"
                    onClick={swapLocations}
                    aria-label="Swap starting point and destination"
                    className="my-2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-secondary shadow-sm transition hover:bg-secondary hover:text-white"
                  >
                    ⇅
                  </button>
                </div>

                {/* Destination */}
                <div>
                  <label
                    htmlFor="to"
                    className="mb-2 block text-sm font-semibold text-text"
                  >
                    {t.to}
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/10">
                    <span className="text-xl text-error">●</span>
                    <input
                      id="to"
                      type="text"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder={t.toPlaceholder}
                      className="w-full bg-transparent py-4 text-sm text-text outline-none placeholder:text-text/40"
                      required
                    />
                  </div>
                </div>

                {/* Search */}
                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-secondary px-6 py-4 font-semibold text-white shadow-lg shadow-secondary/20 transition hover:-translate-y-0.5 hover:bg-primary hover:shadow-xl"
                >
                  <span>⌕</span>
                  {t.search}
                  <span>→</span>
                </button>
              </form>

              {/* Popular destinations */}
              <div className="mt-7 border-t border-border pt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text/50">
                  {t.popular}
                </p>

                <div className="flex flex-wrap gap-2">
                  {destinations.map((destination) => (
                    <button
                      key={destination}
                      type="button"
                      onClick={() => setTo(destination)}
                      className="rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-text transition hover:border-secondary hover:bg-secondary/10 hover:text-secondary"
                    >
                      {destination}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
