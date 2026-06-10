"use client";

import { Card, Link } from "@heroui/react";
import { PageCta } from "@/components/marketing-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const contactOptions = [
  {
    title: "Sales",
    description: "Plan a rollout for proposal teams, business development, or capture operations.",
    action: "sales@rfptool.local",
  },
  {
    title: "Support",
    description: "Get help with local setup, auth, document workflow, or workspace access.",
    action: "support@rfptool.local",
  },
  {
    title: "Security",
    description: "Ask about data handling, Supabase Auth, deployment posture, and review needs.",
    action: "security@rfptool.local",
  },
];

export default function ContactPage() {
  return (
    <main className="landing-page">
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Talk through your proposal workflow.</h1>
        <p>
          Use the channel that matches the conversation. These addresses are placeholders for the
          local product shell and can be swapped when deployment details are settled.
        </p>
      </section>
      <section className="content-grid" aria-label="Contact options">
        {contactOptions.map((option) => (
          <Card className="content-card" key={option.title}>
            <Card.Header>
              <Card.Title>{option.title}</Card.Title>
              <Card.Description>{option.description}</Card.Description>
            </Card.Header>
            <Card.Footer>
              <Link href={`mailto:${option.action}`}>
                {option.action}
                <Link.Icon />
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </section>
      <PageCta />
      <SiteFooter />
    </main>
  );
}
