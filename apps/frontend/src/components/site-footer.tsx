"use client";

import NextLink from "next/link";

const footerGroups = [
  {
    title: "Product",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/security", label: "Security" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <div className="brand-mark">
          <span className="brand-icon" aria-hidden="true">
            R
          </span>
          <span>RFP Tool</span>
        </div>
        <p>Authenticated proposal workflows for teams that need cleaner RFP execution.</p>
      </div>
      <div className="footer-links">
        {footerGroups.map((group) => (
          <div className="footer-group" key={group.title}>
            <strong>{group.title}</strong>
            {group.links.map((link) => (
              <NextLink href={link.href} key={link.href}>
                {link.label}
              </NextLink>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
