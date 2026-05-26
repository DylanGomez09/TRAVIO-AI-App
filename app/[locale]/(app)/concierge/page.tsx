"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ConciergePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F9F9] pt-20" />}>
      <ConciergeContent />
    </Suspense>
  );
}

function ConciergeContent() {
  const t = useTranslations("concierge");

  const suggestions = [
    t("suggestion1"),
    t("suggestion2"),
    t("suggestion3"),
    t("suggestion4"),
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t("welcome"),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/concierge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        history: messages,
      }),
    });

    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.response },
    ]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col pt-20">
      {/* Title */}
      <div className="px-6 pt-8 pb-4 max-w-2xl mx-auto w-full">
        <h1
          className="text-3xl font-bold text-[#092634]"
          style={{ fontFamily: "var(--font-literata)" }}
        >
          {t("title")}
        </h1>
        <p
          className="text-sm text-gray-400 mt-1"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {t("subtitle")}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 pb-40 max-w-2xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-[#092634] flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <span className="text-white text-xs">✦</span>
                </div>
              )}
              <div
                className={`max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#092634] text-white rounded-tr-sm"
                    : "bg-white border border-gray-100 text-[#092634] rounded-tl-sm"
                }`}
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-[#092634] flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <span className="text-white text-xs">✦</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center">
                  <div
                    className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F9F9F9] border-t border-gray-100 px-6 py-4 md:pb-6">
        <div className="max-w-2xl mx-auto">
          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:border-[#FF6E42] hover:text-[#FF6E42] whitespace-nowrap transition-colors bg-white"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={t("placeholder")}
              className="flex-1 outline-none text-sm text-[#092634] placeholder:text-gray-300 bg-transparent"
              style={{ fontFamily: "var(--font-manrope)" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-full bg-[#FF6E42] flex items-center justify-center hover:bg-[#e85e35] transition-colors disabled:opacity-40"
            >
              <span className="text-white text-sm">↑</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
