"use client";

import { Card } from "@heroui/react";
import { PageCta } from "@/components/marketing-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const entries = [
  {
    date: "June 10, 2026",
    title: "HeroUI marketing shell",
    details: ["Landing page with auth controls", "Pricing, about, contact, security, privacy, and terms pages"],
  },
  {
    date: "June 10, 2026",
    title: "Local Supabase auth repair",
    details: ["Auth admin search path fixed", "Local signup verified through Kong"],
  },
  {
    date: "June 10, 2026",
    title: "Monorepo foundation",
    details: ["FastAPI backend", "Next.js frontend", "Docker Compose Supabase-compatible stack"],
  },
];

export default function ChangelogPage() {
  return (
    <main className="landing-page">
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Changelog</p>
        <h1>Product foundation updates.</h1>
        <p>Track visible product and local development changes as the RFP workspace takes shape.</p>
      </section>
      <section className="timeline" aria-label="Changelog entries">
        {entries.map((entry) => (
          <Card className="timeline-card" key={`${entry.date}-${entry.title}`}>
            <Card.Header>
              <Card.Title>{entry.title}</Card.Title>
              <Card.Description>{entry.date}</Card.Description>
            </Card.Header>
            <Card.Content>
              <ul className="check-list">
                {entry.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Card.Content>
          </Card>
        ))}
      </section>
      <PageCta />
      <SiteFooter />
    </main>
  );
}
