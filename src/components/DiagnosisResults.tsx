import { motion } from "framer-motion";
import {
  ShieldCheck, AlertTriangle, Stethoscope, Bug, Pill,
  Shield, Phone, MessageSquare, ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import type { DiagnosisResult } from "@/lib/diagnosis-types";

const severityKeys: Record<string, string> = {
  mild: "diagnosis.severity.mild",
  moderate: "diagnosis.severity.moderate",
  severe: "diagnosis.severity.severe",
  critical: "diagnosis.severity.critical",
};

const severityColors: Record<string, string> = {
  mild: "bg-severity-mild text-white",
  moderate: "bg-severity-moderate text-white",
  severe: "bg-severity-severe text-white",
  critical: "bg-severity-critical text-white",
};

const confidenceKeys: Record<string, string> = {
  low: "diagnosis.confidence.low",
  moderate: "diagnosis.confidence.moderate",
  high: "diagnosis.confidence.high",
};

const confidenceColors: Record<string, string> = {
  low: "text-severity-severe",
  moderate: "text-severity-moderate",
  high: "text-severity-mild",
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export function DiagnosisResults({ result }: { result: DiagnosisResult }) {
  const { t } = useI18n();

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="space-y-4 max-w-2xl mx-auto"
    >
      {/* Summary card */}
      <motion.div custom={0} variants={fadeIn}>
        <Card className="glass-card border-primary/30 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <img src={result.imageUrl} alt="Analyzed" className="w-full sm:w-40 h-40 object-cover" />
            <div className="p-5 flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={severityColors[result.severity]}>{t(severityKeys[result.severity])}</Badge>
                <Badge variant="outline" className="capitalize">{result.subjectType}</Badge>
                <Badge variant="secondary">{result.species}</Badge>
              </div>
              <h2 className="font-display text-xl font-bold mb-1">{result.diseaseName}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-sm font-semibold ${confidenceColors[result.confidenceLevel]}`}>
                  {t(confidenceKeys[result.confidenceLevel])}
                </span>
                <div className="flex-1 max-w-[120px]">
                  <Progress value={result.confidencePercent} className="h-2" />
                </div>
                <span className="text-sm font-bold">{result.confidencePercent}%</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Farmer-friendly summary */}
      <motion.div custom={1} variants={fadeIn}>
        <Card className="glass-card border-l-4 border-l-primary">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-bold mb-1">{t("diagnosis.what_means")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.farmerSummary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Urgency */}
      {result.needsProfessional && (
        <motion.div custom={2} variants={fadeIn}>
          <Card className="glass-card border-l-4 border-l-destructive">
            <CardContent className="p-5 flex items-start gap-3">
              <Phone className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-bold mb-1 text-destructive">{t("diagnosis.professional")}</h3>
                <p className="text-sm text-muted-foreground">{result.urgencyAdvice}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Detailed accordion sections */}
      <motion.div custom={3} variants={fadeIn}>
        <Accordion type="multiple" defaultValue={["symptoms", "treatment"]} className="space-y-2">
          <AccordionItem value="symptoms" className="glass-card rounded-lg border px-4">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2 font-display font-bold">
                <Stethoscope className="h-4 w-4 text-primary" /> {t("diagnosis.symptoms")}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5">
                {result.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="causes" className="glass-card rounded-lg border px-4">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2 font-display font-bold">
                <Bug className="h-4 w-4 text-agri-warning" /> {t("diagnosis.causes")}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5">
                {result.causes.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-agri-warning shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="treatment" className="glass-card rounded-lg border px-4">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2 font-display font-bold">
                <Pill className="h-4 w-4 text-agri-sky" /> {t("diagnosis.treatment")}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5">
                {result.treatments.map((tx, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-agri-sky shrink-0" />
                    {tx}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="prevention" className="glass-card rounded-lg border px-4">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2 font-display font-bold">
                <Shield className="h-4 w-4 text-agri-success" /> {t("diagnosis.prevention")}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5">
                {result.prevention.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-agri-success shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </motion.div>
  );
}
