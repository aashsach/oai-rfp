"use client";

import { Card, Link } from "@heroui/react";
import { PageCta } from "@/components/marketing-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "For solo proposal owners organizing small RFP queues.",
    features: ["5 active RFPs", "Response library basics", "Email/password workspace access"],
  },
  {
    name: "Team",
    price: "$99",
    description: "For teams coordinating drafts, reviews, and reusable answers.",
    features: ["Unlimited active RFPs", "Shared answer library", "Review workflow", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with strict security and procurement requirements.",
    features: ["SSO roadmap planning", "Custom data retention", "Security review support", "Dedicated onboarding"],
  },
];

export default function PricingPage() {
  return (
    <main className="landing-page">
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Pricing</p>
        <h1>Plans for proposal teams before the workflow gets heavy.</h1>
        <p>
          Start with the core authenticated workspace and scale into richer document automation,
          review controls, and response-library management as the product matures.
        </p>
      </section>
      <section className="pricing-grid" aria-label="Pricing plans">
        {plans.map((plan) => (
          <Card className="pricing-card" variant={plan.name === "Team" ? "tertiary" : "default"} key={plan.name}>
            <Card.Header>
              <Card.Title>{plan.name}</Card.Title>
              <Card.Description>{plan.description}</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="price-line">
                <span>{plan.price}</span>
                {plan.price !== "Custom" ? <small>/month</small> : null}
              </div>
              <ul className="check-list">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </Card.Content>
            <Card.Footer>
              <Link className="button button--md button--primary no-underline" href="/contact">
                {plan.name === "Enterprise" ? "Talk to us" : "Start setup"}
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
