

# 🌾 AgriScan AI — Smart Agricultural Assistant

An AI-powered agricultural diagnostic platform that helps farmers identify crop diseases and livestock health issues through image analysis.

---

## Phase 1: Foundation & Core Experience

### Landing Page & Navigation
- Modern green-themed landing page with hero section, feature highlights, and call-to-action
- Responsive mobile-first layout with bottom navigation on mobile
- Dark mode toggle
- Agricultural-themed branding with floating icons and smooth animations

### Image Upload & Camera Capture
- Drag-and-drop image upload zone with camera capture option
- Image preview before submission with option to retake/re-upload
- Support for crop, plant, fruit, vegetable, and livestock images

### AI-Powered Disease Detection
- Integration with Gemini AI (via Lovable AI gateway) for image analysis
- Structured diagnosis output including:
  - Subject identification (crop vs. livestock, species)
  - Visible symptom analysis
  - Disease/condition name with confidence percentage
  - Severity level (mild/moderate/severe/critical) with color-coded badges
  - Causes, treatment recommendations, and prevention tips
  - Urgency advice (professional consultation needed or not)
- Animated scanning effect during analysis with dynamic status messages (e.g., "Analyzing leaf texture…", "Checking for fungal patterns…")
- Confidence & risk meter with visual percentage bar

### Farmer-Friendly Summary
- Simple, jargon-free summary section for each diagnosis
- Clear action steps formatted with icons and easy-to-read cards

---

## Phase 2: Intelligence & Interaction

### Follow-Up AI Chat
- Contextual chat interface that maintains awareness of the uploaded image and diagnosis
- Streaming AI responses for real-time feel
- Farmers can ask questions like "What organic options are available?" or "Is this contagious?"

### Diagnosis History Dashboard
- Grid/list view of past analyses with image thumbnails
- Filter by date, crop/animal type, severity
- Tap to reopen full diagnosis reports
- Local storage for history (no account required)

### Multi-Language Support
- Language toggle supporting English, Twi, and Ewe
- UI labels and AI responses adapted to selected language

---

## Phase 3: Smart Features

### Weather Integration
- Current weather display (temperature, humidity, rainfall) using a free weather API
- AI-generated insights on how current weather affects disease risk for the user's crops/livestock

### Before & After Comparison
- Side-by-side image comparison tool
- Upload a follow-up image to track recovery or progression
- Visual diff with AI commentary on changes

### Smart Alerts System
- Users select their crop/livestock types
- Seasonal disease warnings and prevention tips
- Regional outbreak notifications displayed as alert cards

---

## Phase 4: Advanced Enhancements (Future)
- Offline access to past diagnoses
- AI voice output (text-to-speech for diagnosis summaries)
- Location-based disease heat map
- Nearby agro-shop recommendations
- Organic vs. chemical treatment comparison
- Push notifications for alerts
- User accounts for cross-device sync

---

## Design & Feel
- **Theme**: Green agricultural palette with earth tones, soft shadows, and rounded cards
- **Animations**: Smooth page transitions, scanning effects, progress indicators, and floating icons using Framer Motion
- **AI Avatar**: Friendly assistant character that guides users through the experience
- **Mobile-first**: Optimized for farmers using smartphones in the field

## Technical Approach
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Lovable Cloud edge functions for secure AI API calls
- **AI**: Gemini vision model via Lovable AI gateway for image analysis and chat
- **Storage**: Local storage for history initially; Lovable Cloud database for persistence when accounts are added

