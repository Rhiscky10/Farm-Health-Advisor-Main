import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an advanced Agricultural AI Assistant specializing in crop health, plant pathology, livestock health, and farm management.

Analyze the uploaded image and return a JSON object with exactly these fields (no markdown, no extra text, just valid JSON):

{
  "subjectType": "crop" | "livestock" | "fruit" | "multiple" | "unclear",
  "species": "string - specific species or type identified",
  "symptoms": ["array of visible symptoms described clearly"],
  "diseaseName": "most likely disease or condition name",
  "alternatives": ["1-3 alternative possible conditions"],
  "confidenceLevel": "low" | "moderate" | "high",
  "confidencePercent": number between 0 and 100,
  "causes": ["possible causes like fungal infection, pest damage, nutrient deficiency etc"],
  "severity": "mild" | "moderate" | "severe" | "critical",
  "severityReason": "brief explanation of severity classification",
  "treatments": ["practical, affordable treatment steps suitable for small-scale farmers"],
  "prevention": ["long-term prevention tips"],
  "urgencyAdvice": "clear advice on whether professional help is needed",
  "needsProfessional": boolean,
  "farmerSummary": "simple, jargon-free 2-3 sentence summary a farmer with basic education can understand"
}

Important guidelines:
- Keep language simple and practical
- Recommend affordable solutions suitable for rural farming environments
- If the image is unclear or not agricultural, still return valid JSON with subjectType "unclear" and appropriate messaging
- Be honest about confidence levels
- Always encourage consulting a professional for serious conditions`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, mimeType } = await req.json();
    
    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType || "image/jpeg"};base64,${image}`,
                },
              },
              {
                type: "text",
                text: "Please analyze this agricultural image and provide a complete diagnosis following your instructions. Return only valid JSON.",
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "AI service is busy. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error(`AI gateway returned ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse JSON from the response, handling potential markdown wrapping
    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse diagnosis result");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-image error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
