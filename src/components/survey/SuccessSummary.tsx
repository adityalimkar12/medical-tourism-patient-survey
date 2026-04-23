import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SurveyFormValues } from "./types";

interface Props {
  data: SurveyFormValues;
  onReset: () => void;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-border/60 py-2 last:border-0 sm:grid-cols-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground sm:col-span-2">{value || <span className="text-muted-foreground">—</span>}</dd>
    </div>
  );
}

export function SuccessSummary({ data, onReset }: Props) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="overflow-hidden border-success/30">
        <div className="flex flex-col items-center gap-3 bg-success/10 px-6 py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Submission Successful</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Thank you. The survey response has been recorded. A summary is shown below for your reference.
          </p>
          <Badge variant="secondary" className="mt-2">
            Survey ID: {data.surveyId}
          </Badge>
        </div>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Admin</h3>
          <dl>
            <Row label="Date" value={data.date} />
            <Row label="Interviewer" value={data.interviewerName} />
            <Row label="Location" value={data.location} />
            <Row label="Language" value={data.adminLanguage} />
            <Row label="Time" value={data.time} />
          </dl>

          <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-primary">Respondent Profile</h3>
          <dl>
            <Row label="Role" value={data.role} />
            <Row label="Full Name" value={data.fullName} />
            <Row label="Nationality" value={data.nationality} />
            <Row label="Gender" value={data.gender} />
            <Row label="Age Group" value={data.ageGroup} />
            <Row label="Language" value={data.language} />
            <Row label="Length of Stay" value={data.lengthOfStay} />
            <Row label="Area of Stay" value={data.areaOfStay} />
            <Row label="Reason for Visit" value={data.reasonForVisit} />
          </dl>

          <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-primary">Treatment</h3>
          <dl>
            <Row label="Status" value={data.treatmentStatus} />
            <Row label="Current Stage" value={data.currentStage} />
            <Row label="Specialties" value={data.specialties.join(", ")} />
            <Row label="Hospitals Visited" value={data.hospitalsVisited} />
            <Row label="Discovery Source" value={data.discoverySource} />
          </dl>

          <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-primary">Challenges & Support</h3>
          <dl>
            <Row label="Challenges" value={data.challenges.join(", ")} />
            <Row label="Satisfaction" value={`${data.satisfaction} / 5`} />
            <Row label="Top Support Needs" value={data.supportNeeds.join(", ")} />
          </dl>

          <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-primary">Follow-up</h3>
          <dl>
            <Row label="Follow-up Permission" value={data.followUpPermission} />
            <Row label="Preferred Language" value={data.preferredLanguage} />
            <Row label="WhatsApp" value={data.whatsapp} />
            <Row label="Email" value={data.email} />
          </dl>

          <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-primary">Internal Use</h3>
          <dl>
            <Row label="Lead Potential" value={data.leadPotential} />
            <Row label="Next Actions" value={data.nextActions} />
            <Row label="Notes" value={data.notes} />
          </dl>

          <div className="mt-8 flex justify-center">
            <Button onClick={onReset} variant="outline">
              Start New Survey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
