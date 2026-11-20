"use client";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to the newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  async function send() {
    const text = input.trim();
    if (!text || typing) return; // ignore empty input, or a click while waiting

    // The full conversation, including the new message
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    try { 
      const response = await axios.post<{ reply: string }>(
  "/api/chat",
  { messages: newMessages },
); 

console.log(response.data.reply);


      setMessages((m) => [...m, { role: "assistant", content: response.data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I couldn't connect. Please try again." },
      ]);
    } finally {
      setTyping(false); // runs whether it worked or failed
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-9999 flex flex-col items-end gap-3 font-sans">
      {open && (
        <div className="flex h-110 w-85 max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 px-4 py-3 font-semibold text-white">
            <span>Chat with us</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:opacity-80"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto bg-gray-50 p-3">
            {/* Greeting: shown on screen only, never sent to the AI */}
            <div className="max-w-[80%] self-start rounded-xl bg-gray-200 px-3 py-2 text-sm leading-snug text-gray-900">
              Hi! 👋 Ask me anything.
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-snug ${
                  msg.role === "user"
                    ? "self-end bg-indigo-600 text-white"
                    : "self-start bg-gray-200 text-gray-900"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {typing && (
              <div className="max-w-[80%] self-start rounded-xl bg-gray-200 px-3 py-2 text-sm italic text-gray-500">
                typing…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t border-gray-200 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={send}
              disabled={typing}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Round button in the corner */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow-lg transition hover:scale-105 hover:bg-indigo-700"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}