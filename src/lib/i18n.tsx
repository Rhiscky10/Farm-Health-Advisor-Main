import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Language = "en" | "tw" | "ee";

export const languageNames: Record<Language, string> = {
  en: "English",
  tw: "Twi",
  ee: "Ewe",
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.scan": "Scan",
    "nav.history": "History",

    // Landing page
    "hero.badge": "AI-Powered Agricultural Assistant",
    "hero.title1": "Your Crops & Livestock,",
    "hero.title2": "Diagnosed in Seconds",
    "hero.subtitle": "Snap a photo of any plant disease, pest damage, or sick animal. AgriScan AI delivers instant diagnoses, treatment plans, and prevention tips — right from your phone.",
    "hero.cta": "Start Scanning",
    "hero.history": "View Past Diagnoses",

    "features.heading": "Everything Your Farm Needs",
    "features.subheading": "Smart tools designed for modern farmers in Africa and beyond.",
    "feature.snap.title": "Snap & Diagnose",
    "feature.snap.desc": "Take a photo or upload an image of your crop or livestock for instant AI analysis.",
    "feature.disease.title": "Disease Detection",
    "feature.disease.desc": "Identify diseases, pests, and nutrient deficiencies with confidence scores.",
    "feature.treatment.title": "Instant Treatment",
    "feature.treatment.desc": "Get affordable, practical treatment plans tailored for small-scale farmers.",
    "feature.pest.title": "Pest Alerts",
    "feature.pest.desc": "Stay ahead with seasonal disease warnings and outbreak notifications.",
    "feature.weather.title": "Weather Insights",
    "feature.weather.desc": "See how current weather conditions affect disease risk for your farm.",
    "feature.severity.title": "Severity Tracking",
    "feature.severity.desc": "Color-coded severity levels with progress tracking over time.",

    "cta.heading": "Ready to Protect Your Farm?",
    "cta.subtext": "Join thousands of farmers using AI to detect diseases early, reduce losses, and grow healthier crops.",
    "cta.button": "Scan Your First Image",

    // Scan page
    "scan.title": "Scan Your Crop or Animal",
    "scan.subtitle": "Upload a photo or use your camera to get an instant AI diagnosis.",
    "scan.dropzone": "Drag & drop your image here",
    "scan.browse_hint": "or click to browse files",
    "scan.gallery": "Browse Gallery",
    "scan.camera": "Take Photo",
    "scan.preview_title": "Preview",
    "scan.preview_subtitle": "Review your image before analyzing.",
    "scan.retake": "Retake",
    "scan.analyze": "Analyze Now",
    "scan.scan_another": "Scan Another Image",
    "scan.invalid_file": "Invalid file",
    "scan.invalid_file_desc": "Please upload an image file.",
    "scan.analysis_failed": "Analysis Failed",
    "scan.analysis_failed_desc": "Something went wrong. Please try again.",

    // Diagnosis results
    "diagnosis.what_means": "What This Means for You",
    "diagnosis.professional": "Professional Help Recommended",
    "diagnosis.symptoms": "Visible Symptoms",
    "diagnosis.causes": "Possible Causes",
    "diagnosis.treatment": "Treatment Recommendations",
    "diagnosis.prevention": "Prevention Tips",
    "diagnosis.confidence.low": "Low Confidence",
    "diagnosis.confidence.moderate": "Moderate Confidence",
    "diagnosis.confidence.high": "High Confidence",
    "diagnosis.severity.mild": "Mild",
    "diagnosis.severity.moderate": "Moderate",
    "diagnosis.severity.severe": "Severe",
    "diagnosis.severity.critical": "Critical",

    // History page
    "history.title": "Diagnosis History",
    "history.count": "past analyses",
    "history.clear": "Clear",
    "history.search": "Search by disease or species…",
    "history.empty_title": "No Diagnoses Yet",
    "history.empty_desc": "Your scan history will appear here.",
    "history.back": "← Back to History",

    // Scanning animation
    "scanning.msg1": "Analyzing image composition…",
    "scanning.msg2": "Identifying subject type…",
    "scanning.msg3": "Examining leaf texture…",
    "scanning.msg4": "Checking for fungal patterns…",
    "scanning.msg5": "Detecting color abnormalities…",
    "scanning.msg6": "Scanning for pest damage…",
    "scanning.msg7": "Evaluating symptom severity…",
    "scanning.msg8": "Consulting agricultural database…",
    "scanning.msg9": "Generating treatment plan…",
    "scanning.msg10": "Preparing your diagnosis…",
    "scanning.complete": "complete",
  },
  tw: {
    "nav.home": "Fie",
    "nav.scan": "Hwehwɛ",
    "nav.history": "Abakɔsɛm",

    "hero.badge": "AI Afuom Boafo",
    "hero.title1": "Wo Nnɔbae ne Mmoa,",
    "hero.title2": "Yɛbɛhwehwɛ Ntɛm",
    "hero.subtitle": "Fa wo fɔn so foto nnɔbae yare, mmoa anaa mmoawa. AgriScan AI de ayaresahwɛ, ano aduro, ne boasetɔ nyansahyɛ brɛ wo ntɛm.",
    "hero.cta": "Hyɛ Aseɛ Hwehwɛ",
    "hero.history": "Hwɛ Nea Atwam Ayaresahwɛ",

    "features.heading": "Nea Wo Afuom Hia Nyinaa",
    "features.subheading": "Adwinnade a wɔayɛ ama nnɛ mua afuomfuɔ wɔ Africa ne wiase nyinaa.",
    "feature.snap.title": "Foto na Hwehwɛ",
    "feature.snap.desc": "Fa foto anaa upload mfonini a wode bɛma AI ahwehwɛ ntɛm.",
    "feature.disease.title": "Yare Nhwehwɛmu",
    "feature.disease.desc": "Hu nyarewa, mmoawa, ne aduan a ɛhia ne gyidie nkontaabu.",
    "feature.treatment.title": "Ntɛm Ayaresa",
    "feature.treatment.desc": "Nya ayaresa nhyehyɛe a ɛfata afuomfuɔ nketewa.",
    "feature.pest.title": "Mmoawa Kɔkɔbɔ",
    "feature.pest.desc": "Di kan wɔ bere nyarewa kɔkɔbɔ ne mmɔborɔ nsɛm ho.",
    "feature.weather.title": "Ewiem Nsɛm",
    "feature.weather.desc": "Hwɛ sɛnea ewiem tebea yi bɛtumi de yare aba wo afuom.",
    "feature.severity.title": "Yare Kɛseyɛ",
    "feature.severity.desc": "Ahoɔden nhyehyɛe a wɔde ahoɔ akyerɛ ne nkɔsoɔ hwɛ.",

    "cta.heading": "Woasiesie Wo Ho Abɔ Wo Afuom Ho Ban?",
    "cta.subtext": "Ka afuomfuɔ mpempem ho a wɔde AI hwehwɛ nyarewa ntɛm, tew ahwere so, na ɛma nnɔbae nyin yie.",
    "cta.button": "Hwehwɛ Wo Mfonini a Edi Kan",

    "scan.title": "Hwehwɛ Wo Nnɔbae Anaa Wo Mmoa",
    "scan.subtitle": "Upload foto anaa fa wo kamera so na nya AI ayaresahwɛ ntɛm.",
    "scan.dropzone": "Twe mfonini no bra ha",
    "scan.browse_hint": "anaa klik na hwehwɛ fael",
    "scan.gallery": "Hwehwɛ Gallery",
    "scan.camera": "Fa Foto",
    "scan.preview_title": "Hwɛ Kan",
    "scan.preview_subtitle": "Hwɛ wo mfonini ansa na woahwehwɛ.",
    "scan.retake": "San Fa Bio",
    "scan.analyze": "Hwehwɛ Seesei",
    "scan.scan_another": "Hwehwɛ Mfonini Foforɔ",
    "scan.invalid_file": "Fael no nyɛ",
    "scan.invalid_file_desc": "Yɛsrɛ upload mfonini fael.",
    "scan.analysis_failed": "Nhwehwɛmu no Anni Yie",
    "scan.analysis_failed_desc": "Biribi kɔɔ basaa. Yɛsrɛ bɔ mmɔden bio.",

    "diagnosis.what_means": "Nea Eyi Kyerɛ Wo",
    "diagnosis.professional": "Ɔdɔkotani Mmoa Hia",
    "diagnosis.symptoms": "Nsɛnkyerɛnne a Wɔhu",
    "diagnosis.causes": "Nneɛma a Ebetumi Adi Nkyerɛ",
    "diagnosis.treatment": "Ayaresa Nhyehyɛe",
    "diagnosis.prevention": "Boasetɔ Nyansahyɛ",
    "diagnosis.confidence.low": "Gyidie Kakra",
    "diagnosis.confidence.moderate": "Gyidie Pɔtee",
    "diagnosis.confidence.high": "Gyidie Kɛse",
    "diagnosis.severity.mild": "Ketewa",
    "diagnosis.severity.moderate": "Pɔtee",
    "diagnosis.severity.severe": "Kɛse",
    "diagnosis.severity.critical": "Ahokeka",

    "history.title": "Ayaresahwɛ Abakɔsɛm",
    "history.count": "nhwehwɛmu a atwam",
    "history.clear": "Pepa",
    "history.search": "Hwehwɛ yare anaa aboa din…",
    "history.empty_title": "Nhwehwɛmu Biara Nni Hɔ",
    "history.empty_desc": "Wo nhwehwɛmu abakɔsɛm bɛba ha.",
    "history.back": "← San Kɔ Abakɔsɛm",

    "scanning.msg1": "Yɛrehwehwɛ mfonini no…",
    "scanning.msg2": "Yɛrehu nea ɛwɔ mfonini no mu…",
    "scanning.msg3": "Yɛrehwɛ nhaban ho…",
    "scanning.msg4": "Yɛrehwehwɛ fungi nsɛnkyerɛnne…",
    "scanning.msg5": "Yɛrehu ahoɔ a ɛnsɛ…",
    "scanning.msg6": "Yɛrehwehwɛ mmoawa ɔsɛe…",
    "scanning.msg7": "Yɛresusuw yare ahoɔden…",
    "scanning.msg8": "Yɛrebisa afuom database…",
    "scanning.msg9": "Yɛreyɛ ayaresa nhyehyɛe…",
    "scanning.msg10": "Yɛresiesie wo ayaresahwɛ…",
    "scanning.complete": "awie",
  },
  ee: {
    "nav.home": "Acasa",
    "nav.scan": "Dze Fia",
    "nav.history": "Nutinya",

    "hero.badge": "AI Agbleme Kpekpeɖenula",
    "hero.title1": "Wò Nukunyanu kple Lãwo,",
    "hero.title2": "Woakpɔe Ɖe Go Me Kaba",
    "hero.subtitle": "Tsɔ wò fɔn dze foto nukunyanu dɔlele, lãwo alo kakawo. AgriScan AI ana dɔyɔyɔ, atikegbale, kple dzɔdzɔme nyatakaka — tso wò fɔn me.",
    "hero.cta": "Dze Egɔme Kpɔ",
    "hero.history": "Kpɔ Dɔlele Si Wòkpɔ Xoxo",

    "features.heading": "Nu Siwo Katã Wò Agble Hia",
    "features.subheading": "Dɔwɔnu siwo woɖo ɖi na egbe agbledela siwo le Africa kple xexeame blibo.",
    "feature.snap.title": "Tsɔ Foto Eye Wòakpɔe",
    "feature.snap.desc": "Tsɔ foto alo upload nukunyanu alo lã ƒe nɔnɔme na AI akpɔe.",
    "feature.disease.title": "Dɔlele Didi",
    "feature.disease.desc": "Kpɔ dɔlelewo, kakawo, kple nuɖuɖu ƒe dɔmeɖeɖe kple dzɔdzɔme xexlẽme.",
    "feature.treatment.title": "Atikegbale Kaba",
    "feature.treatment.desc": "Xɔ atikegbale dodowo siwo wòateŋu axɔe be wòatsɔ akpe na agbledela suewo.",
    "feature.pest.title": "Kaka Nunyaɖeɖe",
    "feature.pest.desc": "Nànya be dɔlele kple kaka aɖewo le abadze ge kple ɣeyiɣi ƒe nunyaɖeɖe.",
    "feature.weather.title": "Yame Nyatakaka",
    "feature.weather.desc": "Kpɔ alesi yame nɔnɔme ateŋu adze dɔlele ƒe xaxa ɖe wò agble dzi.",
    "feature.severity.title": "Dɔlele Ƒe Sesẽ",
    "feature.severity.desc": "Kɔda siwo xɔ ahoɔ vovovowo kple nɔnɔmetata akɔntabubu.",

    "cta.heading": "Nèsɔ Gbɔgblɔ Be Nàdzra Wò Agble Ɖa?",
    "cta.subtext": "Ka ɖokuiwò ɖe agbledela akpe mɔkpɔkpɔ si zãa AI ɖe dɔlele didi kaba me, ɖea ahatsyoe dzi, eye wotsɔa nukunyanu nyuiewo.",
    "cta.button": "Kpɔ Wò Foto Gbãtɔ",

    "scan.title": "Kpɔ Wò Nukunyanu Alo Wò Lã",
    "scan.subtitle": "Upload foto alo zã wò kamera be nàxɔ AI dɔyɔyɔ kaba.",
    "scan.dropzone": "Drae nɔnɔme ɖe afisia",
    "scan.browse_hint": "alo zi edzi be nàdi",
    "scan.gallery": "Di Le Gallery Me",
    "scan.camera": "Tsɔ Foto",
    "scan.preview_title": "Kpɔ Gbã",
    "scan.preview_subtitle": "Kpɔ wò nɔnɔme hafi wòadze egɔme.",
    "scan.retake": "Gagbugbɔ Tsɔe",
    "scan.analyze": "Kpɔe Fifia",
    "scan.scan_another": "Kpɔ Nɔnɔme Bubu",
    "scan.invalid_file": "Faɛl mava o",
    "scan.invalid_file_desc": "Taflatse upload nɔnɔme faɛl.",
    "scan.analysis_failed": "Didime Meɖi O",
    "scan.analysis_failed_desc": "Nane gble. Taflatse gatrɔ awɔe.",

    "diagnosis.what_means": "Nu Si Esia Fia Nàwò",
    "diagnosis.professional": "Ele Be Nàkpɔ Dɔkita",
    "diagnosis.symptoms": "Dzesi Siwo Wokpɔ",
    "diagnosis.causes": "Nu Siwo Ateŋu Ava Eme",
    "diagnosis.treatment": "Atikegbale Dodowo",
    "diagnosis.prevention": "Dzɔdzɔme Nyatakaka",
    "diagnosis.confidence.low": "Dziɖeɖe Sue",
    "diagnosis.confidence.moderate": "Dziɖeɖe Titina",
    "diagnosis.confidence.high": "Dziɖeɖe Gã",
    "diagnosis.severity.mild": "Sue",
    "diagnosis.severity.moderate": "Titina",
    "diagnosis.severity.severe": "Gã",
    "diagnosis.severity.critical": "Vɔ Ŋutɔ",

    "history.title": "Dɔyɔyɔ Nutinya",
    "history.count": "didi siwo wòwɔ xoxo",
    "history.clear": "Tutu",
    "history.search": "Di dɔlele alo lã…",
    "history.empty_title": "Didi Aɖeke Meli O",
    "history.empty_desc": "Wò didi nutinya ava afisia.",
    "history.back": "← Trɔ Yi Nutinya",

    "scanning.msg1": "Miele nɔnɔme dim…",
    "scanning.msg2": "Miele nu sia ƒe ɖoɖo dim…",
    "scanning.msg3": "Miele ama ƒe aɖaŋu kpɔm…",
    "scanning.msg4": "Miele fungi dzesiwo dim…",
    "scanning.msg5": "Miele kɔda gbegblẽwo dim…",
    "scanning.msg6": "Miele kaka ƒe ɖeɖe kpɔm…",
    "scanning.msg7": "Miele dɔlele ƒe sesẽ susɔm…",
    "scanning.msg8": "Miele agbleme database biam…",
    "scanning.msg9": "Miele atikegbale ƒe dɔ wɔm…",
    "scanning.msg10": "Miele wò dɔyɔyɔ sɔm…",
    "scanning.complete": "ewɔ vɔ",
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem("agriscan-lang");
    return (stored as Language) || "en";
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem("agriscan-lang", l);
  }, []);

  const t = useCallback(
    (key: string) => translations[lang]?.[key] ?? translations.en[key] ?? key,
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
