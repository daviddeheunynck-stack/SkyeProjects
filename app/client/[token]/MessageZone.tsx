"use client";

import { useEffect, useRef, useState } from "react";
import type { Message } from "@/lib/notion";

const mono: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const sans: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

interface Props {
  token: string;
  initialMessages: Message[];
  isDemo: boolean;
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

export default function MessageZone({ token, initialMessages, isDemo }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Poll every 20 seconds for new messages
  useEffect(() => {
    if (isDemo) return;
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/api/client/${token}/messages`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages);
        }
      } catch { /* silent */ }
    }, 20_000);
    return () => clearInterval(id);
  }, [token, isDemo]);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!text.trim() || isDemo) return;
    setSending(true);
    setError(false);

    // Optimistic
    const optimistic: Message = {
      id: `opt-${Date.now()}`,
      content: text.trim(),
      author: "Client",
      date: new Date().toISOString(),
    };
    setMessages((m) => [...m, optimistic]);
    setText("");

    try {
      const res = await fetch(`/api/client/${token}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: optimistic.content }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Roll back optimistic
      setMessages((m) => m.filter((msg) => msg.id !== optimistic.id));
      setText(optimistic.content);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {isDemo && (
        <div style={{ ...mono, fontSize: "0.62rem", color: "#facc15", letterSpacing: "0.1em", background: "#facc1510", border: "1px solid #facc1520", borderRadius: "0.5rem", padding: "0.625rem 1rem" }}>
          Mode démo — l'envoi de messages est désactivé.
        </div>
      )}

      {/* Messages */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", minHeight: "300px" }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <p style={{ ...mono, fontSize: "0.8rem", color: "#6B6B80" }}>Aucun message pour le moment.</p>
            <p style={{ ...sans, fontSize: "0.8rem", color: "#4B4B5A", marginTop: "0.5rem" }}>Posez votre première question ci-dessous.</p>
          </div>
        )}
        {messages.map((msg) => {
          const isClient = msg.author === "Client";
          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: isClient ? "row-reverse" : "row",
                gap: "0.75rem",
                alignItems: "flex-end",
              }}
            >
              {/* Avatar */}
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                background: isClient ? "#378ADD20" : "#7F77DD20",
                border: `1px solid ${isClient ? "#378ADD40" : "#7F77DD40"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                ...mono, fontSize: "0.55rem", color: isClient ? "#378ADD" : "#7F77DD", fontWeight: 700,
              }}>
                {isClient ? "C" : "VM"}
              </div>

              {/* Bubble */}
              <div style={{ maxWidth: "70%" }}>
                <div style={{
                  padding: "0.75rem 1rem",
                  borderRadius: isClient ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                  background: isClient ? "#378ADD15" : "#7F77DD12",
                  border: `1px solid ${isClient ? "#378ADD20" : "#7F77DD20"}`,
                }}>
                  <p style={{ ...sans, fontSize: "0.9rem", color: "#E8E8F0", lineHeight: 1.6 }}>{msg.content}</p>
                </div>
                <p style={{
                  ...mono, fontSize: "0.55rem", color: "#4B4B5A",
                  marginTop: "0.3rem",
                  textAlign: isClient ? "right" : "left",
                }}>
                  {isClient ? "Vous" : "Votre monteur"} · {fmtTime(msg.date)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!isDemo && (
        <div style={{ border: "1px solid #1E1E2A", borderRadius: "1rem", overflow: "hidden", background: "#13131A" }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Écrivez votre message… (Entrée pour envoyer)"
            rows={3}
            style={{
              width: "100%", ...sans, fontSize: "0.9rem",
              background: "transparent", border: "none", outline: "none",
              color: "#E8E8F0", padding: "1rem", resize: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid #1E1E2A", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ ...mono, fontSize: "0.58rem", color: "#4B4B5A" }}>Réponse sous 24h ouvrées</p>
            <button
              onClick={send}
              disabled={sending || !text.trim()}
              style={{
                ...sans, fontWeight: 600, fontSize: "0.8rem",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1.25rem", borderRadius: "9999px",
                background: sending || !text.trim() ? "#2E2E3A" : "#7F77DD",
                color: "white", border: "none",
                cursor: sending || !text.trim() ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {sending ? "Envoi…" : "Envoyer"}
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {error && (
        <p style={{ ...sans, fontSize: "0.8rem", color: "#f87171" }}>
          Erreur d&apos;envoi. Réessayez ou contactez votre prestataire par email.
        </p>
      )}
    </div>
  );
}
