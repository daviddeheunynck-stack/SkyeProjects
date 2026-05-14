"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

const skills = [
  "Adobe Premiere Pro", "DaVinci Resolve", "After Effects",
  "Color Grading", "Sound Design", "Motion Design",
  "Brand Films", "Clips musicaux", "Documentaire",
];

const mono: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const sans: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "9rem 1.5rem 6rem" }}>
      <AnimatedSection>
        <p style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.3em", color: "#7F77DD", textTransform: "uppercase", marginBottom: "1rem" }}>À propos</p>
        <h1 style={{ ...sans, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#E8E8F0", marginBottom: "1.5rem", lineHeight: 1.15 }}>
          L&apos;œil et le rythme,<br />au service de votre récit.
        </h1>
      </AnimatedSection>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", marginTop: "4rem" }} className="about-grid">
        <AnimatedSection delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              "Monteur vidéo freelance depuis 5 ans, je me spécialise dans la narration visuelle pour les marques, les artistes et les créateurs de contenu. Mon approche mêle rigueur technique et sensibilité artistique.",
              "Formé aux Arts Décoratifs de Paris, j'ai travaillé pour des agences de communication, des maisons de disques et des entreprises du CAC 40 avant de créer mon activité indépendante.",
              "Je crois qu'une bonne vidéo n'est pas qu'une succession d'images bien montées — c'est un voyage émotionnel construit avec intention.",
            ].map((text, i) => (
              <p key={i} style={{ ...sans, color: "#6B6B80", lineHeight: 1.8 }}>{text}</p>
            ))}

            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #1E1E2A" }}>
              <p style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.25em", color: "#6B6B80", textTransform: "uppercase", marginBottom: "1rem" }}>Outils & compétences</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {skills.map((skill) => (
                  <span key={skill} style={{ ...mono, fontSize: "0.65rem", padding: "0.375rem 0.75rem", borderRadius: "9999px", border: "1px solid #1E1E2A", color: "#E8E8F0", background: "#13131A" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {/* Portrait placeholder */}
          <div style={{ aspectRatio: "3/4", borderRadius: "1.25rem", background: "linear-gradient(135deg, #13131A, #0A0A0F)", border: "1px solid #1E1E2A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#7F77DD10", border: "1px solid #7F77DD20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#7F77DD40" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p style={{ ...mono, fontSize: "0.65rem", color: "#6B6B80" }}>Votre photo ici</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              { label: "Disponible", value: "Immédiatement" },
              { label: "Basé à", value: "Paris, France" },
              { label: "Remote", value: "Oui, partout" },
              { label: "Délai moyen", value: "5–10 jours" },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "1rem", borderRadius: "0.75rem", border: "1px solid #1E1E2A", background: "#13131A50" }}>
                <p style={{ ...mono, fontSize: "0.58rem", letterSpacing: "0.2em", color: "#6B6B80", textTransform: "uppercase", marginBottom: "0.25rem" }}>{label}</p>
                <p style={{ ...sans, fontSize: "0.875rem", color: "#E8E8F0" }}>{value}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.3} style={{ marginTop: "5rem", textAlign: "center" }}>
        <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "1rem 2rem", borderRadius: "9999px", background: "#7F77DD", color: "white", ...sans, fontWeight: 500 }}>
          Travaillons ensemble
        </Link>
      </AnimatedSection>

      <style>{`
        @media (min-width: 768px) { .about-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  );
}
