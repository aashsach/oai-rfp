import { MarketingPage } from "@/components/marketing-page";

export default function AboutPage() {
  return (
    <MarketingPage
      eyebrow="About"
      title="Built for proposal work that starts messy and gets urgent."
      description="RFP Tool is being built as an authenticated workspace for teams that need to turn source documents, existing answers, and review cycles into complete proposal responses."
      sections={[
        {
          title: "Product focus",
          description: "The app centers on the operational parts of proposal work.",
          items: ["Document intake", "Draft section tracking", "Reusable response management"],
        },
        {
          title: "Engineering approach",
          description: "The foundation favors typed contracts and local reproducibility.",
          items: ["FastAPI backend", "Generated TypeScript API client", "Supabase-backed auth and data"],
        },
        {
          title: "Near-term direction",
          description: "The next product layer is document CRUD and route protection.",
          items: ["Authenticated document workflows", "Database migrations", "Workspace session handling"],
        },
      ]}
    />
  );
}
