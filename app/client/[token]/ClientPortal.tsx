"use client";

import { useState } from "react";
import type { ClientData, FileItem, Message } from "@/lib/notion";
import MessageZone from "./MessageZone";

// ─── Status timeline ──────────────────────────────────────────────────────────

const STATUS_STEPS = [
  { id: "Brief",        label: "Brief & contrat"     },
  { id: "Production",   label: "Montage en cours"    },
  { id: "V1 prête",     label: "Version 1 disponible"},
  { id: "Révisions V2", label: "Révisions V2"        },
  { id: "Validation",   label: "Validation finale"   },
  { id: "Livré",        label: "Projet livré"        },
];

function statusIndex(status: string) {
  const idx = STATUS_STEPS.findIndex((s) => s.id === status);
  return idx === -1 ? 0 : idx;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const mono: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const sans: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / 86_400_000);
}

// ─── File type badge ──────────────────────────────────────────────────────────

const TYPE_COLORS: Record<string, string> = {
  Livrable: "#7F77DD",
  Facture:  "#378ADD",
  Contrat:  "#6B6B80",
  Archive:  "#4B4B5A",
};


// ─── Tab ─────────────────────────────────────────────────────────────────────

type Tab = "avancement" | "fichiers" | "discussion";

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  client: ClientData;
  files: FileItem[];
  initialMessages: Message[];
  isDemo: boolean;
}

export default function ClientPortal({ client, files, initialMessages, isDemo }: Props) {
  const [tab, setTab] = useState<Tab>("avancement");
  const currentStep = statusIndex(client.status);
  const days = client.deliveryDate ? daysUntil(client.deliveryDate) : null;

  const invoices   = files.filter((f) => f.type === "Facture");
  const livrables  = files.filter((f) => f.type !== "Facture");

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F" }}>
      {/* Top bar */}
      <header style={{
        borderBottom: "1px solid #1E1E2A",
        background: "#0A0A0F",
        position: "sticky", top: 0, zIndex: 10,
        backdropFilter: "blur(8px)",
      }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <p style={{ ...mono, fontSize: "0.58rem", color: "#7F77DD", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.2rem" }}>
              Espace client {isDemo && "· démo"}
            </p>
            <p style={{ ...sans, fontWeight: 700, color: "#E8E8F0", fontSize: "1rem" }}>{client.projectName}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {days !== null && (
              <div style={{ textAlign: "right" }}>
                <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.1em", textTransform: "uppercase" }}>Livraison</p>
                <p style={{ ...sans, fontWeight: 600, color: days <= 3 ? "#f97316" : days <= 7 ? "#facc15" : "#4ade80", fontSize: "0.875rem" }}>
                  {days <= 0 ? "Aujourd'hui" : `dans ${days} jour${days > 1 ? "s" : ""}`}
                </p>
              </div>
            )}
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#7F77DD20", border: "1px solid #7F77DD40",
              display: "flex", alignItems: "center", justifyContent: "center",
              ...mono, fontSize: "0.75rem", color: "#7F77DD", fontWeight: 700,
            }}>
              {client.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem", display: "flex", gap: "0" }}>
          {(["avancement", "fichiers", "discussion"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                ...mono, fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "0.75rem 1.25rem",
                background: "none", border: "none", cursor: "pointer",
                color: tab === t ? "#E8E8F0" : "#6B6B80",
                borderBottom: tab === t ? "2px solid #7F77DD" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {t === "fichiers" ? `Fichiers (${files.length})` : t === "discussion" ? `Discussion` : t}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1.5rem 6rem" }}>

        {/* ── TAB: Avancement ─────────────────────────────────────────────── */}
        {tab === "avancement" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Freelance message */}
            {client.freelanceMessage && (
              <div style={{ border: "1px solid #7F77DD20", borderRadius: "1rem", background: "#7F77DD08", padding: "1.25rem 1.5rem", display: "flex", gap: "1rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#7F77DD", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", ...mono, fontSize: "0.65rem", color: "white", fontWeight: 700 }}>VM</div>
                <div>
                  <p style={{ ...mono, fontSize: "0.58rem", color: "#7F77DD", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Message de votre monteur</p>
                  <p style={{ ...sans, fontSize: "0.9rem", color: "#E8E8F0", lineHeight: 1.7 }}>{client.freelanceMessage}</p>
                </div>
              </div>
            )}

            {/* Progress bar */}
            <div style={{ border: "1px solid #1E1E2A", borderRadius: "1rem", padding: "1.5rem", background: "#13131A30" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.2em", textTransform: "uppercase" }}>Avancement global</p>
                <p style={{ ...sans, fontWeight: 700, color: "#E8E8F0" }}>{client.progress}%</p>
              </div>
              <div style={{ height: "6px", borderRadius: "9999px", background: "#1E1E2A", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${client.progress}%`, background: "linear-gradient(90deg, #7F77DD, #378ADD)", borderRadius: "9999px", transition: "width 0.6s ease" }} />
              </div>
            </div>

            {/* Timeline */}
            <div style={{ border: "1px solid #1E1E2A", borderRadius: "1rem", padding: "1.5rem", background: "#13131A30" }}>
              <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Étapes du projet</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {STATUS_STEPS.map((step, i) => {
                  const done    = i < currentStep;
                  const current = i === currentStep;
                  const future  = i > currentStep;
                  return (
                    <div key={step.id} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", paddingBottom: i < STATUS_STEPS.length - 1 ? "1.25rem" : "0", position: "relative" }}>
                      {/* Connector line */}
                      {i < STATUS_STEPS.length - 1 && (
                        <div style={{ position: "absolute", left: "11px", top: "24px", width: "2px", height: "calc(100% - 4px)", background: done ? "#7F77DD" : "#1E1E2A", transition: "background 0.3s" }} />
                      )}
                      {/* Dot */}
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0, border: `2px solid ${done || current ? "#7F77DD" : "#2E2E3A"}`, background: done ? "#7F77DD" : current ? "#7F77DD20" : "#0A0A0F", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, transition: "all 0.3s" }}>
                        {done && (
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {current && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7F77DD" }} />}
                      </div>
                      {/* Label */}
                      <div style={{ paddingTop: "2px" }}>
                        <p style={{ ...sans, fontWeight: current ? 700 : 500, color: future ? "#4B4B5A" : "#E8E8F0", fontSize: "0.9rem" }}>
                          {step.label}
                        </p>
                        {current && (
                          <p style={{ ...mono, fontSize: "0.58rem", color: "#7F77DD", letterSpacing: "0.1em", marginTop: "0.2rem" }}>En cours</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tool integrations */}
            {(client.frameioUrl || client.figmaUrl || client.notionUrl) && (
              <div style={{ border: "1px solid #1E1E2A", borderRadius: "1rem", padding: "1.5rem", background: "#13131A30" }}>
                <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Outils de validation</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  {client.frameioUrl && (
                    <ToolCard href={client.frameioUrl} name="Frame.io" desc="Visionner & annoter la vidéo" color="#5B6EB5" icon={<FrameioIcon />} />
                  )}
                  {client.figmaUrl && (
                    <ToolCard href={client.figmaUrl} name="Figma" desc="Consulter les maquettes" color="#A259FF" icon={<FigmaIcon />} />
                  )}
                  {client.notionUrl && (
                    <ToolCard href={client.notionUrl} name="Notion" desc="Voir le document de suivi" color="#E8E8F0" icon={<NotionIcon />} />
                  )}
                </div>
              </div>
            )}

            {/* Delivery date */}
            {client.deliveryDate && (
              <div style={{ border: "1px solid #1E1E2A", borderRadius: "1rem", padding: "1.25rem 1.5rem", background: "#13131A30", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Date de livraison prévue</p>
                  <p style={{ ...sans, fontWeight: 600, color: "#E8E8F0" }}>{fmtDate(client.deliveryDate)}</p>
                </div>
                {days !== null && days > 0 && (
                  <div style={{ ...mono, fontSize: "0.65rem", padding: "0.375rem 0.875rem", borderRadius: "9999px", border: "1px solid #1E1E2A", color: days <= 3 ? "#f97316" : days <= 7 ? "#facc15" : "#4ade80" }}>
                    J–{days}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: Fichiers ───────────────────────────────────────────────── */}
        {tab === "fichiers" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {files.length === 0 ? (
              <Empty label="Aucun fichier disponible pour le moment." />
            ) : (
              <>
                {livrables.length > 0 && (
                  <FileSection title="Livrables & fichiers" items={livrables} />
                )}
                {invoices.length > 0 && (
                  <FileSection title="Facturation" items={invoices} />
                )}
              </>
            )}
          </div>
        )}

        {/* ── TAB: Discussion ─────────────────────────────────────────────── */}
        {tab === "discussion" && (
          <MessageZone
            token={client.token}
            initialMessages={initialMessages}
            isDemo={isDemo}
          />
        )}
      </main>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ToolCard({ href, name, desc, color, icon }: { href: string; name: string; desc: string; color: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: "0.875rem",
        padding: "0.875rem 1.25rem",
        border: "1px solid #1E1E2A", borderRadius: "0.75rem",
        background: "#13131A", textDecoration: "none",
        transition: "border-color 0.2s",
        flex: "1 1 200px",
      }}
    >
      <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 600, color: "#E8E8F0", fontSize: "0.9rem" }}>{name}</p>
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.08em" }}>{desc}</p>
      </div>
      <svg style={{ marginLeft: "auto", color: "#6B6B80", flexShrink: 0 }} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

function FileSection({ title, items }: { title: string; items: FileItem[] }) {
  return (
    <div>
      <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {items.map((f) => (
          <a
            key={f.id}
            href={f.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "1rem",
              padding: "0.875rem 1.25rem",
              border: "1px solid #1E1E2A", borderRadius: "0.75rem",
              background: "#13131A30", textDecoration: "none",
              transition: "border-color 0.2s",
            }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6B6B80" strokeWidth={1.5} style={{ flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", color: "#E8E8F0", fontSize: "0.875rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color: "#6B6B80", marginTop: "0.15rem" }}>
                {new Date(f.date).toLocaleDateString("fr-FR")} {f.size && `· ${f.size}`}
              </p>
            </div>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", border: `1px solid ${TYPE_COLORS[f.type] ?? "#6B6B80"}40`, color: TYPE_COLORS[f.type] ?? "#6B6B80", flexShrink: 0 }}>
              {f.type}
            </span>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#6B6B80" strokeWidth={2} style={{ flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center", padding: "4rem 0" }}>
      <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.8rem", color: "#6B6B80" }}>{label}</p>
    </div>
  );
}

// ─── Tool icons (inline SVG) ──────────────────────────────────────────────────

function FrameioIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#5B6EB5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 38 57" fill="none">
      <path d="M19 28.5A9.5 9.5 0 1028.5 19 9.5 9.5 0 0019 28.5z" fill="#1ABCFE" />
      <path d="M9.5 47.5A9.5 9.5 0 0019 38V28.5H9.5a9.5 9.5 0 000 19z" fill="#0ACF83" />
      <path d="M9.5 19H19V.5H9.5a9.5 9.5 0 000 19z" fill="#FF7262" />
      <path d="M19 .5h9.5a9.5 9.5 0 010 19H19V.5z" fill="#F24E1E" />
      <path d="M28.5 19H19v19h9.5a9.5 9.5 0 000-19z" fill="#A259FF" />
    </svg>
  );
}

function NotionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 100 100" fill="#E8E8F0">
      <path d="M6 9.25C6 7.15 7.6 5.36 9.7 5.1l56.7-7.2a10 10 0 0 1 1.6-.1l18.6 1.3C89 -0.6 91 1.2 91 3.6v83.2c0 1.9-1.1 3.6-2.8 4.4l-57.8 25.4a10 10 0 0 1-5 1.2H10a4 4 0 0 1-4-4V9.25z" />
    </svg>
  );
}
