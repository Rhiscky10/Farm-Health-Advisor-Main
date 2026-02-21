import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, Image as ImageIcon, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScanningAnimation } from "@/components/ScanningAnimation";
import { DiagnosisResults } from "@/components/DiagnosisResults";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import type { DiagnosisResult } from "@/lib/diagnosis-types";

type Stage = "upload" | "preview" | "scanning" | "results";

export default function ScanPage() {
  const [stage, setStage] = useState<Stage>("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useI18n();

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: t("scan.invalid_file"), description: t("scan.invalid_file_desc"), variant: "destructive" });
      return;
    }
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setStage("preview");
  }, [toast, t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const reset = () => {
    setStage("upload");
    setImageFile(null);
    setImageUrl("");
    setResult(null);
  };

  const analyzeImage = async () => {
    if (!imageFile) return;
    setStage("scanning");

    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });

      const { data, error } = await supabase.functions.invoke("analyze-image", {
        body: { image: base64, mimeType: imageFile.type },
      });

      if (error) throw error;

      const diagnosis: DiagnosisResult = {
        ...data,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        imageUrl,
      };

      const history = JSON.parse(localStorage.getItem("agriscan-history") || "[]");
      history.unshift(diagnosis);
      if (history.length > 50) history.pop();
      localStorage.setItem("agriscan-history", JSON.stringify(history));

      setResult(diagnosis);
      setStage("results");
    } catch (err: any) {
      console.error("Analysis error:", err);
      toast({
        title: t("scan.analysis_failed"),
        description: err.message || t("scan.analysis_failed_desc"),
        variant: "destructive",
      });
      setStage("preview");
    }
  };

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {stage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="font-display text-3xl font-bold mb-2">{t("scan.title")}</h1>
                <p className="text-muted-foreground">{t("scan.subtitle")}</p>
              </div>

              <Card
                className={`glass-card border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50"
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{t("scan.dropzone")}</p>
                    <p className="text-sm text-muted-foreground">{t("scan.browse_hint")}</p>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2 rounded-xl" onClick={() => fileInputRef.current?.click()}>
                  <ImageIcon className="h-4 w-4" />
                  {t("scan.gallery")}
                </Button>
                <Button className="flex-1 gap-2 rounded-xl" onClick={() => cameraInputRef.current?.click()}>
                  <Camera className="h-4 w-4" />
                  {t("scan.camera")}
                </Button>
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </motion.div>
          )}

          {stage === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="font-display text-2xl font-bold mb-1">{t("scan.preview_title")}</h2>
                <p className="text-muted-foreground text-sm">{t("scan.preview_subtitle")}</p>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src={imageUrl} alt="Preview" className="w-full max-h-[400px] object-contain bg-muted" />
                <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-background/80 backdrop-blur rounded-full" onClick={reset}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2 rounded-xl" onClick={reset}>
                  <RotateCcw className="h-4 w-4" />
                  {t("scan.retake")}
                </Button>
                <Button className="flex-1 gap-2 rounded-xl shadow-lg shadow-primary/25" onClick={analyzeImage}>
                  <Zap className="h-4 w-4" />
                  {t("scan.analyze")}
                </Button>
              </div>
            </motion.div>
          )}

          {stage === "scanning" && (
            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScanningAnimation imageUrl={imageUrl} />
            </motion.div>
          )}

          {stage === "results" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <DiagnosisResults result={result} />
              <div className="flex justify-center">
                <Button variant="outline" className="gap-2 rounded-xl" onClick={reset}>
                  <Camera className="h-4 w-4" />
                  {t("scan.scan_another")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
