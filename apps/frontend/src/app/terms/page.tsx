import { LegalPage } from "@/components/marketing-page";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="These draft terms are placeholders for the local product shell and should be replaced with counsel-reviewed terms before external use."
      sections={[
        {
          title: "Use of the service",
          description: "The service is intended for teams managing proposal documents and reusable response content.",
          items: ["Use accurate account information", "Only upload content you are allowed to process", "Do not attempt to bypass workspace access controls"],
        },
        {
          title: "Customer content",
          description: "Proposal documents and drafts remain customer-provided content.",
          items: ["Users are responsible for uploaded materials", "Sensitive proposal content should follow organizational policy", "Production export/deletion policies remain to be defined"],
        },
        {
          title: "Service changes",
          description: "The current application is an early implementation and will evolve.",
          items: ["Features may change", "Pricing may change before launch", "Security and compliance terms require production review"],
        },
      ]}
    />
  );
}
