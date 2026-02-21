export interface DiagnosisResult {
  id: string;
  timestamp: string;
  imageUrl: string;

  // Step 1: Identification
  subjectType: "crop" | "livestock" | "fruit" | "multiple" | "unclear";
  species: string;

  // Step 2: Symptoms
  symptoms: string[];

  // Step 3: Diagnosis
  diseaseName: string;
  alternatives: string[];
  confidenceLevel: "low" | "moderate" | "high";
  confidencePercent: number;

  // Step 4: Causes
  causes: string[];

  // Step 5: Severity
  severity: "mild" | "moderate" | "severe" | "critical";
  severityReason: string;

  // Step 6: Treatment
  treatments: string[];

  // Step 7: Prevention
  prevention: string[];

  // Step 8: Urgency
  urgencyAdvice: string;
  needsProfessional: boolean;

  // Step 9: Summary
  farmerSummary: string;
}

export const SCANNING_MESSAGES = [
  "Analyzing image composition…",
  "Identifying subject type…",
  "Examining leaf texture…",
  "Checking for fungal patterns…",
  "Detecting color abnormalities…",
  "Scanning for pest damage…",
  "Evaluating symptom severity…",
  "Consulting agricultural database…",
  "Generating treatment plan…",
  "Preparing your diagnosis…",
];

export function getSeverityColor(severity: string) {
  switch (severity) {
    case "mild": return "severity-mild";
    case "moderate": return "severity-moderate";
    case "severe": return "severity-severe";
    case "critical": return "severity-critical";
    default: return "severity-mild";
  }
}
