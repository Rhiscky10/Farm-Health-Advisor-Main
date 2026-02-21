import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { History, Trash2, Calendar, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DiagnosisResults } from "@/components/DiagnosisResults";
import { useI18n } from "@/lib/i18n";
import type { DiagnosisResult } from "@/lib/diagnosis-types";

const severityColors: Record<string, string> = {
  mild: "bg-severity-mild text-white",
  moderate: "bg-severity-moderate text-white",
  severe: "bg-severity-severe text-white",
  critical: "bg-severity-critical text-white",
};

export default function HistoryPage() {
  const [history, setHistory] = useState<DiagnosisResult[]>([]);
  const [selected, setSelected] = useState<DiagnosisResult | null>(null);
  const [search, setSearch] = useState("");
  const { t } = useI18n();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("agriscan-history") || "[]");
    setHistory(stored);
  }, []);

  const filtered = history.filter(
    (h) =>
      h.diseaseName.toLowerCase().includes(search.toLowerCase()) ||
      h.species.toLowerCase().includes(search.toLowerCase())
  );

  const clearHistory = () => {
    localStorage.removeItem("agriscan-history");
    setHistory([]);
  };

  if (selected) {
    return (
      <main className="min-h-screen pt-20 md:pt-24 pb-24 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <Button variant="ghost" onClick={() => setSelected(null)} className="gap-2">
            {t("history.back")}
          </Button>
          <DiagnosisResults result={selected} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-24 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold flex items-center gap-2">
              <History className="h-7 w-7 text-primary" />
              {t("history.title")}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{history.length} {t("history.count")}</p>
          </div>
          {history.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearHistory} className="gap-1 text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
              {t("history.clear")}
            </Button>
          )}
        </div>

        {history.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("history.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        )}

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <History className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">{t("history.empty_title")}</h2>
            <p className="text-muted-foreground text-sm">{t("history.empty_desc")}</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="glass-card hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
                  onClick={() => setSelected(item)}
                >
                  <div className="flex">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt="" className="w-24 h-24 object-cover shrink-0" />
                    )}
                    <CardContent className="p-3 flex-1 min-w-0">
                      <div className="flex gap-1.5 mb-1.5 flex-wrap">
                        <Badge className={`${severityColors[item.severity]} text-[10px] px-1.5 py-0`}>
                          {item.severity}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {item.confidencePercent}%
                        </Badge>
                      </div>
                      <p className="font-semibold text-sm truncate">{item.diseaseName}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.species}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
