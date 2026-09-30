Patient & Caregiver Healthcare Assistance Survey (Front-end) This repository contains the functional front-end for the Paramount Colony / Tolichowki Outreach patient survey. The project is designed to help our team identify medical needs and navigate barriers for international patients seeking care in Hyderabad.

Technical Foundation Framework: React (Vite)

Styling: Tailwind CSS for responsive utility-first design

Components: shadcn/ui for accessible, consistent interface elements

Form Management: react-hook-form combined with Zod for client-side validation

Functional Highlights Multi-Step Workflow: Data is segmented into Profile, Treatment Stages, and Challenges to prevent form fatigue.

Consent Logic: Built-in mandatory checks for user consent and a redirect path for non-patient contacts.

Administrative Header: Standardized fields for Survey ID, Location, and Interviewer tracking.

Internal Use Section: A distinct, shaded card for lead scoring (Hot/Warm/Cold) and internal notes.

Information for the Backend Team Data Schema: The form uses Zod for validation. Please ensure your API endpoints are configured to match the data structure from Sections A through D.

API Connection: You can easily connect your preferred Axios or Fetch instance to the onSubmit handler within the main form component.
