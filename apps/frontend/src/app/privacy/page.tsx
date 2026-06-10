import { LegalPage } from "@/components/marketing-page";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This draft policy describes the intended data posture for the local RFP Tool product shell. Replace it with counsel-reviewed language before production use."
      sections={[
        {
          title: "Information we handle",
          description: "The app is designed to store account and workspace information needed for proposal workflows.",
          items: ["Account email and authentication identifiers", "Uploaded RFP source documents", "Draft response and response-library content"],
        },
        {
          title: "How information is used",
          description: "Data is used to provide authenticated proposal drafting and workspace management.",
          items: ["Maintain sessions", "Power document workflows", "Improve workspace reliability"],
        },
        {
          title: "Data controls",
          description: "Production controls still need to be finalized before deployment.",
          items: ["Retention policy", "Export and deletion workflow", "Audit and access review process"],
        },
      ]}
    />
  );
}
