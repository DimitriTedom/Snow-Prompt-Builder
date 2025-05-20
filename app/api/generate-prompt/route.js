import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const POST = async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { prompt } = await req.json();

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Based on the following user request, write a clear and engaging prompt suitable for an AI prompt-sharing platform. The prompt should be useful, creative, and actionable.\n
                    User Request:\n
                    ${prompt}\n\n
                    Then, on a new line, suggest relevant hashtags based on the content of the generated prompt (e.g., #AI, #Productivity, #WebDev, #UXDesign).
                    `,
        },
      ],
      model: "llama-3.3-70b-versatile", // or llama3-70b if available
      temperature: 0.8,
      max_tokens: 1024, //approx 205 words
    });
    console.log(completion);
    const text = completion.choices[0]?.message?.content?.trim() || "";
    console.log(text);
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const tagsLine = lines.pop();
    const generatedPrompt = lines.join(" ");
    const tags =
      tagsLine
        ?.split(",")
        .map((t) => t.trim())
        .join(",") || "";
    console.log(generatedPrompt, "Generated prompt");
    console.log(tags, "generated tags");
    return new Response(JSON.stringify({ prompt: generatedPrompt, tags }), {
      status: 200,
    });
  } catch (err) {
    console.error("Groq API error:", err);
    return new Response(JSON.stringify({ error: "Groq API call failed" }), {
      status: 500,
    });
  }
};
