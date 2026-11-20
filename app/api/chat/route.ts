// The Groq API address (OpenAI-compatible format)
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";
const SYSTEM_PROMPT =
  "You are a friendly support assistant for the ShewingBy website. " +
  "Answer in 2-3 short sentences. If you don't know something, say so honestly. " +
  "Only answer questions about ShewingBy: its products, orders, shipping, returns, accounts and using the website. " +
  "You may reply to greetings and thanks. " +
  "For anything else, politely say you can only help with ShewingBy questions, and do not answer it.";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY is missing. Add it to .env.local and restart.");
    return Response.json(
      { reply: "The server is missing its API key." },
      { status: 500 },
    );
  }

  const body = await request.json();
  const history: ChatMessage[] = (body.messages ?? []).map(
    (m: ChatMessage) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content),
    }),
  );

  const messages = [{ role: "system", content: SYSTEM_PROMPT }, ...history];

  try {
    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`, // the key: proves who we are
        "Content-Type": "application/json", // we're sending JSON
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7, // creativity: 0 = strict, 2 = very random
        max_completion_tokens: 500, // maximum length of the reply
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq error:", groqResponse.status, errorText); // see details in your terminal

      const reply =
        groqResponse.status === 429
          ? "I'm getting too many messages right now. Please wait a moment and try again."
          : "Sorry, something went wrong. Please try again.";
      return Response.json({ reply }, { status: 502 });
    }

    const data = await groqResponse.json();
    const reply =
      data.choices?.[0]?.message?.content ?? "Sorry, I don't have an answer.";

    return Response.json({ reply });
  } catch (error) {
    console.error(error);
    return Response.json(
      { reply: "Sorry, I couldn't reach the AI service." },
      { status: 500 },
    );
  }
}
