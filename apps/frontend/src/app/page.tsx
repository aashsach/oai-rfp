"use client";

import { Button, Card } from "@heroui/react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main className="landing-page">
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Authenticated proposal workspace</p>
          <h1>Land every RFP draft in one organized workflow.</h1>
          <p>
            Upload source documents, draft response sections, and reuse approved answers from a
            secure workspace built for proposal teams.
          </p>
          <div className="hero-actions">
            <a className="button button--lg button--primary no-underline" href="/pricing">
              See plans
            </a>
            <a className="button button--lg button--secondary no-underline" href="/about">
              Learn more
            </a>
          </div>
          <p className="hero-status">Sign in from the top-right to call the backend workspace.</p>
        </div>

        <aside className="preview-panel" aria-label="Workspace preview">
          <div className="preview-header">
            <div className="preview-title">
              <strong>Proposal command center</strong>
              <span>Current workspace</span>
            </div>
            <Button size="sm" variant="secondary">
              New RFP
            </Button>
          </div>

          <div className="preview-grid">
            <div className="metric">
              <span className="metric-value">12</span>
              <span className="metric-label">Open sections</span>
            </div>
            <div className="metric">
              <span className="metric-value">84%</span>
              <span className="metric-label">Draft coverage</span>
            </div>
            <div className="metric">
              <span className="metric-value">31</span>
              <span className="metric-label">Library matches</span>
            </div>
          </div>

          <div className="document-list">
            <article className="document-row">
              <div>
                <strong>RFP intake</strong>
                <p>Document upload and answer generation will start here.</p>
              </div>
              <Button size="sm">New</Button>
            </article>
            <article className="document-row">
              <div>
                <strong>Response library</strong>
                <p>Reusable approved answers will be backed by Supabase.</p>
              </div>
              <Button size="sm" variant="secondary">
                View
              </Button>
            </article>
          </div>
        </aside>
      </section>

      <section className="feature-grid" aria-label="RFP workflow features">
        <Card className="feature-card">
          <Card.Header>
            <Card.Title>Secure intake</Card.Title>
            <Card.Description>
              Keep uploads and proposal drafts tied to authenticated user sessions.
            </Card.Description>
          </Card.Header>
        </Card>
        <Card className="feature-card">
          <Card.Header>
            <Card.Title>Draft workspace</Card.Title>
            <Card.Description>
              Track sections, ownership, and backend session status from a single view.
            </Card.Description>
          </Card.Header>
        </Card>
        <Card className="feature-card">
          <Card.Header>
            <Card.Title>Reusable answers</Card.Title>
            <Card.Description>
              Prepare the response library that future CRUD endpoints will power.
            </Card.Description>
          </Card.Header>
        </Card>
      </section>
      <SiteFooter />
    </main>
  );
}
