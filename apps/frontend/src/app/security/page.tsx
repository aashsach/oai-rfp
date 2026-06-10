import { MarketingPage } from "@/components/marketing-page";

export default function SecurityPage() {
  return (
    <MarketingPage
      eyebrow="Security"
      title="A security foundation for authenticated proposal work."
      description="The current product foundation keeps browser-safe keys in the frontend, validates Supabase JWTs in the backend, and separates local Supabase services behind Docker Compose."
      sections={[
        {
          title: "Authentication",
          description: "User sessions are handled through Supabase Auth.",
          items: ["Email/password signup", "JWT-backed backend calls", "No service-role keys in browser code"],
        },
        {
          title: "Application boundaries",
          description: "The app keeps generated client calls and backend validation explicit.",
          items: ["OpenAPI-generated frontend client", "FastAPI authenticated /me route", "CORS scoped to local frontend"],
        },
        {
          title: "Operational posture",
          description: "Security hardening remains a planned product track.",
          items: ["Production JWT validation strategy", "Route protection", "Data retention and audit policies"],
        },
      ]}
    />
  );
}
