"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const mono: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const sans: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

const projectTypes = [
  "Brand film / vidéo institutionnelle",
  "Clip musical",
  "Documentaire",
  "Spot publicitaire",
  "Corporate / interview",
  "Contenu réseaux sociaux",
  "Aftermovie / événementiel",
  "Autre",
];

const budgets = [
  "< 500 €",
  "500 – 1 000 €",
  "1 000 – 2 500 €",
  "2 500 – 5 000 €",
  "> 5 000 €",
  "À définir ensemble",
];

interface FormData {
  name: string;
  email: string;
  projectType: string;
  scope: string;
  deadline: string;
  budget: string;
  message: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#13131A",
  border: "1px solid #1E1E2A",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  color: "#E8E8F0",
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  ...mono,
  fontSize: "0.58rem",
  letterSpacing: "0.25em",
  color: "#6B6B80",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "0.5rem",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", projectType: "", scope: "", deadline: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#7F77DD10", border: "1px solid #7F77DD30", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#7F77DD" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ ...sans, fontSize: "1.5rem", fontWeight: 700, color: "#E8E8F0", marginBottom: "0.75rem" }}>Message envoyé !</h2>
          <p style={{ ...sans, color: "#6B6B80", lineHeight: 1.7 }}>Merci pour votre demande. Je vous réponds sous 48h avec un devis détaillé.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "9rem 1.5rem 6rem" }}>
      <AnimatedSection style={{ marginBottom: "4rem" }}>
        <p style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.3em", color: "#7F77DD", textTransform: "uppercase", marginBottom: "1rem" }}>Contact</p>
        <h1 style={{ ...sans, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#E8E8F0", marginBottom: "1.5rem", lineHeight: 1.15 }}>
          Parlons de<br />votre projet.
        </h1>
        <p style={{ ...sans, color: "#6B6B80", maxWidth: "400px", lineHeight: 1.7 }}>
          Remplissez ce formulaire, recevez un devis personnalisé sous 48h. Aucun engagement.
        </p>
      </AnimatedSection>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="contact-grid">
        <AnimatedSection delay={0.1}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="name-grid">
              <div>
                <label style={labelStyle}>Votre nom *</label>
                <input required type="text" placeholder="Marie Dupont" value={form.name} onChange={set("name")} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input required type="email" placeholder="marie@exemple.fr" value={form.email} onChange={set("email")} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Type de projet *</label>
              <select required value={form.projectType} onChange={set("projectType")} style={inputStyle}>
                <option value="">Sélectionnez un type</option>
                {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Périmètre du projet *</label>
              <textarea required rows={3} placeholder="Durée souhaitée, nombre de rushes, contexte, plateformes de diffusion..." value={form.scope} onChange={set("scope")} style={{ ...inputStyle, resize: "none" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="date-grid">
              <div>
                <label style={labelStyle}>Deadline souhaitée</label>
                <input type="date" value={form.deadline} onChange={set("deadline")} style={{ ...inputStyle, colorScheme: "dark" }} />
              </div>
              <div>
                <label style={labelStyle}>Budget approximatif</label>
                <select value={form.budget} onChange={set("budget")} style={inputStyle}>
                  <option value="">Non défini</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Message complémentaire</label>
              <textarea rows={4} placeholder="Références, contraintes techniques, vision créative..." value={form.message} onChange={set("message")} style={{ ...inputStyle, resize: "none" }} />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: "9999px", background: "#7F77DD", color: "white", ...sans, fontWeight: 500, border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.7 : 1, transition: "all 0.2s" }}
              >
                {status === "loading" ? (
                  <>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" style={{ opacity: 0.75 }} />
                    </svg>
                    Envoi en cours...
                  </>
                ) : "Envoyer ma demande de devis"}
              </button>
              {status === "error" && (
                <p style={{ ...sans, fontSize: "0.875rem", color: "#f87171", marginTop: "0.75rem" }}>
                  Erreur d&apos;envoi. Écrivez directement à <a href="mailto:votre@email.fr" style={{ textDecoration: "underline" }}>votre@email.fr</a>
                </p>
              )}
            </div>
          </form>
        </AnimatedSection>

        {/* Sidebar */}
        <AnimatedSection delay={0.2} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { label: "Réponse garantie", title: "Sous 48h ouvrées", body: "Toutes les demandes reçoivent une réponse, même si je ne suis pas disponible pour votre projet." },
          ].map(({ label, title, body }) => (
            <div key={label} style={{ border: "1px solid #1E1E2A", borderRadius: "1rem", background: "#13131A20", padding: "1.5rem" }}>
              <p style={{ ...mono, fontSize: "0.58rem", letterSpacing: "0.25em", color: "#6B6B80", textTransform: "uppercase", marginBottom: "1rem" }}>{label}</p>
              <p style={{ ...sans, fontWeight: 600, color: "#E8E8F0", marginBottom: "0.5rem" }}>{title}</p>
              <p style={{ ...sans, fontSize: "0.875rem", color: "#6B6B80", lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}

          <div style={{ border: "1px solid #1E1E2A", borderRadius: "1rem", background: "#13131A20", padding: "1.5rem" }}>
            <p style={{ ...mono, fontSize: "0.58rem", letterSpacing: "0.25em", color: "#6B6B80", textTransform: "uppercase", marginBottom: "1rem" }}>Contact direct</p>
            <a href="mailto:votre@email.fr" style={{ ...mono, fontSize: "0.875rem", color: "#7F77DD", display: "block", marginBottom: "0.5rem" }}>votre@email.fr</a>
            <a href="tel:+33600000000" style={{ ...mono, fontSize: "0.875rem", color: "#378ADD", display: "block" }}>+33 6 00 00 00 00</a>
          </div>

          <div style={{ border: "1px solid #1E1E2A", borderRadius: "1rem", background: "#13131A20", padding: "1.5rem" }}>
            <p style={{ ...mono, fontSize: "0.58rem", letterSpacing: "0.25em", color: "#6B6B80", textTransform: "uppercase", marginBottom: "1rem" }}>Disponibilité</p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 0 0 #4ade8040", animation: "pulse 2s infinite" }} />
              <p style={{ ...sans, fontSize: "0.875rem", color: "#E8E8F0" }}>Disponible pour de nouveaux projets</p>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 #4ade8040; } 50% { box-shadow: 0 0 0 6px #4ade8000; } }
        @media (min-width: 1024px) { .contact-grid { grid-template-columns: 3fr 2fr !important; } }
        @media (max-width: 480px) { .name-grid, .date-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
