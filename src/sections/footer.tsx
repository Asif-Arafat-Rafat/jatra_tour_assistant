
import type { ReactNode } from "react";

const Icon = ({
  children,
}: {
  children: ReactNode;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const BusIcon = () => (
  <Icon>
    <rect x="3" y="4" width="18" height="15" rx="3" />
    <path d="M3 10h18M7 19v2M17 19v2M7 15h.01M17 15h.01M7 7h10" />
  </Icon>
);

const ArrowIcon = () => (
  <Icon>
    <path d="M7 17 17 7M7 7h10v10" />
  </Icon>
);

const MailIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);

const LocationIcon = () => (
  <Icon>
    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

const Footer = () => {
  const exploreLinks = [
    { name: "Home", href: "#home" },
    { name: "Find a Bus", href: "#finder" },
    { name: "Route Planner", href: "#planner" },
    { name: "Fare Calculator", href: "#fare" },
  ];

  const informationLinks = [
    { name: "About Us", href: "#about" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Contact Us", href: "#contact" },
    { name: "Privacy Policy", href: "#privacy" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: "f" },
    { name: "Instagram", href: "#", icon: "◎" },
    { name: "GitHub", href: "#", icon: "⌘" },
  ];

  return (
    <footer className="bg-background text-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <a href="#home" className="inline-flex items-center gap-3">
              <div className="bg-accent text-primary p-2.5 rounded-xl">
                <BusIcon />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Dhaka Bus Finder
              </span>
            </a>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight max-w-md">
              Your city, your route.
              <span className="text-accent"> Travel smarter.</span>
            </h2>

            <p className="text-text/70 max-w-md leading-relaxed">
              Explore Dhaka with confidence. Discover bus routes,
              plan your journey, and know your expected fare
              before you travel.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 flex items-center justify-center
                  rounded-xl border border-secondary/45 text-text/70
                  hover:bg-accent hover:text-primary hover:border-accent
                  transition-all duration-300 font-semibold"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-lg mb-6">
              Explore
            </h3>

            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-lg mb-6">
              Information
            </h3>

            <ul className="space-y-4">
              {informationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-accent/25 border border-white/10 rounded-2xl
        p-6 sm:p-8 flex flex-col sm:flex-row items-center
        justify-between gap-6 mb-12">

          <div>
            <h3 className="text-xl text-secondary font-bold mb-2">
              Ready to explore Dhaka?
            </h3>

            <p className="text-text/70 text-sm">
              Find your route and make every journey easier.
            </p>
          </div>

          <a
            href="#planner"
            className="inline-flex items-center gap-2 bg-secondary
            text-white font-semibold px-6 py-3 rounded-xl
            hover:brightness-110 transition-all whitespace-nowrap"
          >
            Plan Your Journey
            <ArrowIcon />
          </a>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-x-8 gap-y-4
        text-sm text-text/70 pb-8 border-b border-primary/15">

          <a
            href="mailto:hello@example.com"
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <MailIcon />
            hello@example.com
          </a>

          <div className="flex items-center gap-2">
            <LocationIcon />
            Dhaka, Bangladesh
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center
        justify-between gap-4 pt-7 text-sm text-text/70">

          <p>
            © {new Date().getFullYear()} Dhaka Bus Finder.
            All rights reserved.
          </p>

          <p className="font-medium">
            Made for the people of Dhaka 🇧🇩
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
