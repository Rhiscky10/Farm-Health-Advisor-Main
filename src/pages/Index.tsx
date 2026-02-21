import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, ShieldCheck, Zap, Leaf, ArrowRight, Bug, Droplets, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingIcons } from "@/components/FloatingIcons";
import { useI18n } from "@/lib/i18n";

const featureKeys = [
  { icon: Camera, titleKey: "feature.snap.title", descKey: "feature.snap.desc" },
  { icon: ShieldCheck, titleKey: "feature.disease.title", descKey: "feature.disease.desc" },
  { icon: Zap, titleKey: "feature.treatment.title", descKey: "feature.treatment.desc" },
  { icon: Bug, titleKey: "feature.pest.title", descKey: "feature.pest.desc" },
  { icon: Droplets, titleKey: "feature.weather.title", descKey: "feature.weather.desc" },
  { icon: Thermometer, titleKey: "feature.severity.title", descKey: "feature.severity.desc" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Index() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-24">
      {/* Hero */}
      <section className="relative px-4 py-16 md:py-24 overflow-hidden">
        <FloatingIcons />
        <div className="bg-gradient-hero absolute inset-0 -z-10" />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            <Leaf className="h-4 w-4" />
            {t("hero.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-extrabold leading-tight mb-6"
          >
            {t("hero.title1")}{" "}
            <span className="text-gradient-primary">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="text-base gap-2 rounded-xl shadow-lg shadow-primary/25">
              <Link to="/scan">
                <Camera className="h-5 w-5" />
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base rounded-xl">
              <Link to="/history">{t("hero.history")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            {t("features.heading")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("features.subheading")}</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {featureKeys.map((f) => (
            <motion.div key={f.titleKey} variants={item}>
              <Card className="glass-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{t(f.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(f.descKey)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-primary/5 border border-primary/20 rounded-3xl p-10 md:p-14"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{t("cta.heading")}</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{t("cta.subtext")}</p>
          <Button asChild size="lg" className="gap-2 rounded-xl shadow-lg shadow-primary/25">
            <Link to="/scan">
              <Camera className="h-5 w-5" />
              {t("cta.button")}
            </Link>
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
