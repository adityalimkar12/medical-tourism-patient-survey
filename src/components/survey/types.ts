import { z } from "zod";

export const surveySchema = z.object({
  // Admin
  surveyId: z.string().trim().min(1, "Survey ID required").max(50),
  date: z.string().min(1, "Date required"),
  interviewerName: z.string().trim().min(1, "Interviewer name required").max(100),
  location: z.string().trim().min(1, "Location required").max(100),
  adminLanguage: z.string().min(1, "Language required"),
  time: z.string().min(1, "Time required"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required to proceed" }) }),

  // Step 1
  role: z.string().min(1, "Role required"),
  fullName: z.string().trim().min(1, "Full name required").max(100),
  nationality: z.string().trim().min(1, "Nationality required").max(60),
  gender: z.string().min(1, "Gender required"),
  ageGroup: z.string().min(1, "Age group required"),
  language: z.string().trim().min(1, "Language required").max(60),
  lengthOfStay: z.string().min(1, "Length of stay required"),
  areaOfStay: z.string().trim().min(1, "Area required").max(100),
  reasonForVisit: z.string().trim().min(1, "Reason required").max(300),

  // Step 2
  treatmentStatus: z.string().min(1, "Treatment status required"),
  currentStage: z.string().min(1, "Current stage required"),
  specialties: z.array(z.string()).min(1, "Select at least one specialty"),
  hospitalsVisited: z.string().trim().max(500).optional().default(""),
  discoverySource: z.string().min(1, "Discovery source required"),

  // Step 3
  challenges: z.array(z.string()).min(1, "Select at least one challenge"),
  satisfaction: z.number().min(1).max(5),
  supportNeeds: z.array(z.string()).min(1, "Select at least one").max(3, "Select up to 3"),

  // Step 4
  followUpPermission: z.string().min(1, "Required"),
  preferredLanguage: z.string().trim().min(1, "Required").max(60),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{7,15}$/, "Enter a valid numeric WhatsApp number"),
  email: z.string().trim().email("Invalid email").max(255),

  // Internal
  leadPotential: z.string().min(1, "Required"),
  nextActions: z.string().trim().max(500).optional().default(""),
  notes: z.string().trim().max(1000).optional().default(""),
});

export type SurveyFormValues = z.infer<typeof surveySchema>;

export const ROLES = ["Patient", "Caregiver", "Family Member", "Companion", "Other"];
export const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];
export const AGE_GROUPS = ["18–24", "25–34", "35–44", "45–54", "55+"];
export const STAY_LENGTHS = ["< 1 week", "1–4 weeks", "1–3 months", "3–6 months", "6+ months"];
export const TREATMENT_STATUS = ["Not started", "Exploring options", "Under treatment", "Post-treatment", "Follow-up"];
export const STAGES = ["Exploring", "Consultation Booked", "Diagnostics", "Treatment", "Recovery", "Follow-up"];
export const SPECIALTIES = [
  "Cardiology",
  "Oncology",
  "Orthopedics",
  "Neurology",
  "Fertility/IVF",
  "Cosmetic Surgery",
  "Organ Transplant",
  "Dental",
  "Ophthalmology",
  "General Surgery",
];
export const DISCOVERY_SOURCES = ["Friend/Family", "Social Media", "Google Search", "Agent/Facilitator", "Doctor Referral", "Embassy", "Other"];
export const CHALLENGES = [
  "Language barrier",
  "Cost transparency",
  "Accommodation",
  "Travel/Visa",
  "Hospital coordination",
  "Food preferences",
  "Translation services",
  "Insurance/Payments",
];
export const SUPPORT_NEEDS = [
  "Hospital Shortlist",
  "Appointment Booking",
  "Translator",
  "Accommodation",
  "Local Transport",
  "Insurance Help",
  "Visa Assistance",
  "Post-care Support",
];
export const LEAD_POTENTIAL = ["Hot", "Warm", "Cold"];
export const LANGUAGES = ["English", "Arabic", "French", "Swahili", "Bengali", "Hindi", "Urdu", "Russian", "Other"];
