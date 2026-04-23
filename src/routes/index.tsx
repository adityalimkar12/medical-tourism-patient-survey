import { createFileRoute } from "@tanstack/react-router";
import { SurveyForm, SurveyHeader } from "@/components/survey/SurveyForm";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Healtour Patient Survey · Paramount Colony / Tolichowki Outreach" },
      {
        name: "description",
        content:
          "International patient & caregiver healthcare assistance survey for Healtour's medical tourism outreach in Hyderabad.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SurveyHeader />
      <main className="px-4 py-8 sm:py-10">
        <SurveyForm />
      </main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Healtour · Hyderabad · Confidential field survey instrument
      </footer>
    </div>
  );
}
