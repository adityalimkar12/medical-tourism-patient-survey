import { useState } from "react";
import { useForm, Controller, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/v4";
import { ArrowLeft, ArrowRight, Send, Stethoscope, ShieldCheck, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

import { ProgressSteps } from "./ProgressSteps";
import { SuccessSummary } from "./SuccessSummary";
import {
  surveySchema,
  type SurveyFormValues,
  ROLES,
  GENDERS,
  AGE_GROUPS,
  STAY_LENGTHS,
  TREATMENT_STATUS,
  STAGES,
  SPECIALTIES,
  DISCOVERY_SOURCES,
  CHALLENGES,
  SUPPORT_NEEDS,
  LEAD_POTENTIAL,
  LANGUAGES,
} from "./types";

type StepFields = (keyof SurveyFormValues)[];

const STEP_FIELDS: Record<number, StepFields> = {
  1: ["role", "fullName", "nationality", "gender", "ageGroup", "language", "lengthOfStay", "areaOfStay", "reasonForVisit"],
  2: ["treatmentStatus", "currentStage", "specialties", "discoverySource"],
  3: ["challenges", "satisfaction", "supportNeeds"],
  4: ["followUpPermission", "preferredLanguage", "whatsapp", "email", "leadPotential"],
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs font-medium text-destructive">{msg}</p>;
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <Label className="mb-1.5 block text-sm font-medium text-foreground">
      {children}
      {required && <span className="ml-0.5 text-destructive">*</span>}
    </Label>
  );
}

function MultiSelectGrid({
  options,
  value,
  onChange,
  max,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  max?: number;
}) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      if (max && value.length >= max) return;
      onChange([...value, opt]);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((opt) => {
        const checked = value.includes(opt);
        const disabled = !checked && max !== undefined && value.length >= max;
        return (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border bg-card px-3 py-2.5 text-sm transition-colors ${
              checked ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40"
            } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <Checkbox checked={checked} disabled={disabled} onCheckedChange={() => toggle(opt)} />
            <span className="text-foreground">{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

function Step1({ form }: { form: UseFormReturn<SurveyFormValues> }) {
  const { register, control, formState: { errors } } = form;
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <FieldLabel required>Role</FieldLabel>
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {ROLES.map((r) => (
                <label
                  key={r}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    field.value === r ? "border-primary bg-primary-soft" : "border-border"
                  }`}
                >
                  <RadioGroupItem value={r} />
                  {r}
                </label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError msg={errors.role?.message} />
      </div>

      <div>
        <FieldLabel required>Full Name</FieldLabel>
        <Input {...register("fullName")} placeholder="e.g. Ahmed Hassan" />
        <FieldError msg={errors.fullName?.message} />
      </div>
      <div>
        <FieldLabel required>Nationality</FieldLabel>
        <Input {...register("nationality")} placeholder="e.g. Nigerian" />
        <FieldError msg={errors.nationality?.message} />
      </div>

      <div>
        <FieldLabel required>Gender</FieldLabel>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                {GENDERS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError msg={errors.gender?.message} />
      </div>
      <div>
        <FieldLabel required>Age Group</FieldLabel>
        <Controller
          control={control}
          name="ageGroup"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger><SelectValue placeholder="Select age group" /></SelectTrigger>
              <SelectContent>
                {AGE_GROUPS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError msg={errors.ageGroup?.message} />
      </div>

      <div>
        <FieldLabel required>Language</FieldLabel>
        <Input {...register("language")} placeholder="Primary language spoken" />
        <FieldError msg={errors.language?.message} />
      </div>
      <div>
        <FieldLabel required>Length of stay in Hyderabad</FieldLabel>
        <Controller
          control={control}
          name="lengthOfStay"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
              <SelectContent>
                {STAY_LENGTHS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError msg={errors.lengthOfStay?.message} />
      </div>

      <div className="md:col-span-2">
        <FieldLabel required>Area of stay</FieldLabel>
        <Input {...register("areaOfStay")} placeholder="e.g. Tolichowki, Mehdipatnam" />
        <FieldError msg={errors.areaOfStay?.message} />
      </div>
      <div className="md:col-span-2">
        <FieldLabel required>Reason for visit</FieldLabel>
        <Textarea {...register("reasonForVisit")} rows={3} placeholder="Briefly describe the medical reason for visiting Hyderabad" />
        <FieldError msg={errors.reasonForVisit?.message} />
      </div>
    </div>
  );
}

function Step2({ form }: { form: UseFormReturn<SurveyFormValues> }) {
  const { register, control, formState: { errors } } = form;
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <FieldLabel required>Treatment status</FieldLabel>
        <Controller
          control={control}
          name="treatmentStatus"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                {TREATMENT_STATUS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError msg={errors.treatmentStatus?.message} />
      </div>
      <div>
        <FieldLabel required>Current stage</FieldLabel>
        <Controller
          control={control}
          name="currentStage"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger><SelectValue placeholder="Exploring → Follow-up" /></SelectTrigger>
              <SelectContent>
                {STAGES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError msg={errors.currentStage?.message} />
      </div>

      <div className="md:col-span-2">
        <FieldLabel required>Specialty (select all that apply)</FieldLabel>
        <Controller
          control={control}
          name="specialties"
          render={({ field }) => (
            <MultiSelectGrid options={SPECIALTIES} value={field.value || []} onChange={field.onChange} />
          )}
        />
        <FieldError msg={errors.specialties?.message as string | undefined} />
      </div>

      <div className="md:col-span-2">
        <FieldLabel>Hospitals visited</FieldLabel>
        <Textarea {...register("hospitalsVisited")} rows={2} placeholder="List hospitals consulted or visited so far" />
      </div>

      <div className="md:col-span-2">
        <FieldLabel required>Discovery source</FieldLabel>
        <Controller
          control={control}
          name="discoverySource"
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {DISCOVERY_SOURCES.map((r) => (
                <label
                  key={r}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    field.value === r ? "border-primary bg-primary-soft" : "border-border"
                  }`}
                >
                  <RadioGroupItem value={r} />
                  {r}
                </label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError msg={errors.discoverySource?.message} />
      </div>
    </div>
  );
}

function Step3({ form }: { form: UseFormReturn<SurveyFormValues> }) {
  const { control, watch, formState: { errors } } = form;
  const satisfaction = watch("satisfaction") || 3;
  const supportCount = (watch("supportNeeds") || []).length;
  return (
    <div className="space-y-6">
      <div>
        <FieldLabel required>Challenges faced (select all that apply)</FieldLabel>
        <Controller
          control={control}
          name="challenges"
          render={({ field }) => (
            <MultiSelectGrid options={CHALLENGES} value={field.value || []} onChange={field.onChange} />
          )}
        />
        <FieldError msg={errors.challenges?.message as string | undefined} />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <FieldLabel required>Overall satisfaction</FieldLabel>
          <Badge variant="secondary" className="text-sm">{satisfaction} / 5</Badge>
        </div>
        <Controller
          control={control}
          name="satisfaction"
          render={({ field }) => (
            <Slider
              min={1}
              max={5}
              step={1}
              value={[field.value || 3]}
              onValueChange={(v) => field.onChange(v[0])}
            />
          )}
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Very Dissatisfied</span>
          <span>Very Satisfied</span>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <FieldLabel required>Top 3 Support Needs</FieldLabel>
          <Badge variant="outline">{supportCount}/3 selected</Badge>
        </div>
        <Controller
          control={control}
          name="supportNeeds"
          render={({ field }) => (
            <MultiSelectGrid options={SUPPORT_NEEDS} value={field.value || []} onChange={field.onChange} max={3} />
          )}
        />
        <FieldError msg={errors.supportNeeds?.message as string | undefined} />
      </div>
    </div>
  );
}

function Step4({ form }: { form: UseFormReturn<SurveyFormValues> }) {
  const { register, control, formState: { errors } } = form;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <FieldLabel required>Permission to follow-up?</FieldLabel>
          <Controller
            control={control}
            name="followUpPermission"
            render={({ field }) => (
              <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-3">
                {["Yes", "No"].map((r) => (
                  <label
                    key={r}
                    className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm ${
                      field.value === r ? "border-primary bg-primary-soft" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value={r} />
                    {r}
                  </label>
                ))}
              </RadioGroup>
            )}
          />
          <FieldError msg={errors.followUpPermission?.message} />
        </div>
        <div>
          <FieldLabel required>Preferred Language</FieldLabel>
          <Controller
            control={control}
            name="preferredLanguage"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError msg={errors.preferredLanguage?.message} />
        </div>
        <div>
          <FieldLabel required>WhatsApp Number</FieldLabel>
          <Input {...register("whatsapp")} inputMode="tel" placeholder="+91XXXXXXXXXX" />
          <FieldError msg={errors.whatsapp?.message} />
        </div>
        <div>
          <FieldLabel required>Email</FieldLabel>
          <Input {...register("email")} type="email" placeholder="name@example.com" />
          <FieldError msg={errors.email?.message} />
        </div>
      </div>

      <Card className="border-accent/60 bg-accent/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="h-4 w-4 text-primary" /> Internal Use Only
          </CardTitle>
          <CardDescription>For Healtour outreach team — not visible to respondent.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <FieldLabel required>Lead Potential</FieldLabel>
            <Controller
              control={control}
              name="leadPotential"
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-3 gap-2">
                  {LEAD_POTENTIAL.map((r) => {
                    const colors: Record<string, string> = {
                      Hot: "border-destructive/50 data-[checked=true]:bg-destructive/10",
                      Warm: "border-chart-4/60",
                      Cold: "border-primary/40",
                    };
                    const active = field.value === r;
                    return (
                      <label
                        key={r}
                        data-checked={active}
                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 bg-background px-3 py-2.5 text-sm font-medium ${colors[r]} ${active ? "ring-2 ring-primary/30" : ""}`}
                      >
                        <RadioGroupItem value={r} className="sr-only" />
                        {r}
                      </label>
                    );
                  })}
                </RadioGroup>
              )}
            />
            <FieldError msg={errors.leadPotential?.message} />
          </div>
          <div>
            <FieldLabel>Next Actions</FieldLabel>
            <Textarea {...register("nextActions")} rows={2} placeholder="e.g. Send hospital shortlist, Schedule call" />
          </div>
          <div>
            <FieldLabel>Notes</FieldLabel>
            <Textarea {...register("notes")} rows={3} placeholder="Additional observations" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SurveyForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState<SurveyFormValues | null>(null);

  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    mode: "onTouched",
    defaultValues: {
      surveyId: `HT-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().slice(0, 10),
      interviewerName: "",
      location: "Paramount Colony / Tolichowki",
      adminLanguage: "English",
      time: new Date().toTimeString().slice(0, 5),
      consent: undefined as unknown as true,
      role: "",
      fullName: "",
      nationality: "",
      gender: "",
      ageGroup: "",
      language: "",
      lengthOfStay: "",
      areaOfStay: "",
      reasonForVisit: "",
      treatmentStatus: "",
      currentStage: "",
      specialties: [],
      hospitalsVisited: "",
      discoverySource: "",
      challenges: [],
      satisfaction: 3,
      supportNeeds: [],
      followUpPermission: "",
      preferredLanguage: "English",
      whatsapp: "",
      email: "",
      leadPotential: "",
      nextActions: "",
      notes: "",
    },
  });

  const consent = form.watch("consent");

  const next = async () => {
    const fields = STEP_FIELDS[step];
    const valid = await form.trigger(fields as never);
    if (valid) setStep((s) => Math.min(4, s + 1));
  };

  const onSubmit = (values: SurveyFormValues) => {
    setSubmitted(values);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setSubmitted(null);
    setStep(1);
    form.reset();
  };

  if (submitted) return <SuccessSummary data={submitted} onReset={reset} />;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Admin Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4 text-primary" /> Survey Administration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <FieldLabel required>Survey ID</FieldLabel>
              <Input {...form.register("surveyId")} />
              <FieldError msg={form.formState.errors.surveyId?.message} />
            </div>
            <div>
              <FieldLabel required>Date</FieldLabel>
              <Input type="date" {...form.register("date")} />
              <FieldError msg={form.formState.errors.date?.message} />
            </div>
            <div>
              <FieldLabel required>Time</FieldLabel>
              <Input type="time" {...form.register("time")} />
              <FieldError msg={form.formState.errors.time?.message} />
            </div>
            <div>
              <FieldLabel required>Interviewer Name</FieldLabel>
              <Input {...form.register("interviewerName")} placeholder="Field worker name" />
              <FieldError msg={form.formState.errors.interviewerName?.message} />
            </div>
            <div>
              <FieldLabel required>Location</FieldLabel>
              <Input {...form.register("location")} />
              <FieldError msg={form.formState.errors.location?.message} />
            </div>
            <div>
              <FieldLabel required>Language</FieldLabel>
              <Controller
                control={form.control}
                name="adminLanguage"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consent */}
      <Card className="border-primary/30">
        <CardContent className="space-y-3 p-5">
          <div className="flex items-start gap-3">
            <Controller
              control={form.control}
              name="consent"
              render={({ field }) => (
                <Checkbox
                  id="consent"
                  checked={field.value === true}
                  onCheckedChange={(v) => field.onChange(v === true ? true : undefined)}
                  className="mt-1"
                />
              )}
            />
            <div className="flex-1">
              <Label htmlFor="consent" className="cursor-pointer text-sm font-medium text-foreground">
                I agree to participate in this survey conducted by Healtour. I understand my responses will be used to improve healthcare assistance services for international patients in Hyderabad.
              </Label>
              <FieldError msg={form.formState.errors.consent?.message} />
            </div>
          </div>
          <Alert className="border-accent bg-accent/30">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Field note:</strong> If respondent is a student or community contact, redirect to <em>Referrer Form</em>.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {consent === true && (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <ProgressSteps current={step} />
              <Separator className="my-4" />
              <CardTitle className="text-lg">
                {step === 1 && "Step 1 · Respondent Profile"}
                {step === 2 && "Step 2 · Treatment & Stages"}
                {step === 3 && "Step 3 · Challenges & Support"}
                {step === 4 && "Step 4 · Follow-up & Internal"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Capture basic demographic and visit information."}
                {step === 2 && "Document the patient's treatment journey and discovery channel."}
                {step === 3 && "Identify pain points and prioritize support requirements."}
                {step === 4 && "Contact preferences and internal lead qualification."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && <Step1 form={form} />}
              {step === 2 && <Step2 form={form} />}
              {step === 3 && <Step3 form={form} />}
              {step === 4 && <Step4 form={form} />}

              <Separator className="my-6" />

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="sm:w-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                {step < 4 ? (
                  <Button type="button" onClick={next} className="sm:w-auto">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-success text-success-foreground hover:bg-success/90 sm:w-auto">
                    <Send className="mr-2 h-4 w-4" /> Submit Survey
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  );
}

export function SurveyHeader() {
  return (
    <header className="border-b border-border bg-[image:var(--gradient-hero)] text-primary-foreground">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Healtour · Hyderabad</p>
            <p className="text-xs text-white/70">Medical Tourism Outreach</p>
          </div>
        </div>
        <h1 className="mt-5 text-balance text-2xl font-semibold leading-tight sm:text-3xl">
          International Patient & Caregiver Healthcare Assistance Survey
        </h1>
        <p className="mt-1 text-sm text-white/85 sm:text-base">
          Paramount Colony / Tolichowki Outreach
        </p>
      </div>
    </header>
  );
}
