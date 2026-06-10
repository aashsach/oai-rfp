"use client";

import { Card, Link } from "@heroui/react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageSection = {
  title: string;
  description: string;
  items: string[];
};

export function MarketingPage({
  eyebrow,
  title,
  description,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: PageSection[];
}) {
  return (
    <main className="landing-page">
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <section className="content-grid" aria-label={`${title} details`}>
        {sections.map((section) => (
          <Card className="content-card" key={section.title}>
            <Card.Header>
              <Card.Title>{section.title}</Card.Title>
              <Card.Description>{section.description}</Card.Description>
            </Card.Header>
            <Card.Content>
              <ul className="check-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
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

export function LegalPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: PageSection[];
}) {
  return (
    <main className="landing-page">
      <SiteHeader />
      <article className="legal-layout">
        <header className="page-hero legal-hero">
          <p className="eyebrow">Policy</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <div className="legal-content">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              <ul className="check-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}

export function PageCta() {
  return (
    <section className="page-cta">
      <div>
        <p className="eyebrow">Ready when your next RFP lands</p>
        <h2>Start organizing proposal work before the deadline pressure hits.</h2>
      </div>
      <Link className="button button--md button--primary no-underline" href="/">
        Open the workspace
      </Link>
    </section>
  );
}
