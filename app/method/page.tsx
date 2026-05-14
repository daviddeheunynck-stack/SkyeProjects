"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

const mono: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const sans: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

const steps = [
  {
    num: "01",
    title: "Le Brief",
    sub: "Comprendre avant de créer",
    desc: "On commence par un appel de 30 à 45 minutes. Je prends le temps de comprendre votre projet, vos objectifs, votre audience cible, et les références visuelles qui vous inspirent. Ce cadrage évite les malentendus et pose les bases d'une collaboration réussie.",
    deliverable: "Brief validé + moodboard",
    timing: "J+1",
  },
  {
    num: "02",
    title: "La Sélection",
    sub: "Trier pour mieux raconter",
    desc: "Je visionne l'intégralité de vos rushes et opère une sélection rigoureuse. Chaque plan retenu doit justifier sa place dans le montage. Cette étape est invisible mais déterminante — c'est ici que le film commence à prendre forme.",
    deliverable: "Dossier de sélection annoté",
    timing: "J+2 à J+3",
  },
  {
    num: "03",
    title: "L'Assemblage",
    sub: "Construire le rythme",
    desc: "Je construis le premier montage rough, en testant plusieurs structures narratives. L'objectif : valider le rythme global et la logique du récit avant de se concentrer sur les détails.",
    deliverable: "Rough cut à valider",
    timing: "J+4 à J+6",
  },
  {
    num: "04",
    title: "Les Finitions",
    sub: "Soigner chaque détail",
    desc: "Une fois le montage validé, je passe à l'étalonnage colorimétrique, au design sonore, aux titres et animations. Chaque élément est affiné pour servir la cohérence visuelle et émotionnelle du film.",
    deliverable: "Fine cut + étalonnage",
    timing: "J+7 à J+9",
  },
  {
    num: "05",
    title: "La Livraison",
    sub: "Prêt à diffuser",
    desc: "Après vos retours et les derniers ajustements, je livre les fichiers dans tous les formats dont vous avez besoin — web, réseaux sociaux, diffusion TV. Chaque canal a ses spécifications, je m'en occupe.",
    deliverable: "Exports multi-formats + archives",
    timing: "J+10",
  },
];

export default function MethodPage() {
  return (
    <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "9rem 1.5rem 6rem" }}>
      <AnimatedSection style={{ marginBottom: "5rem" }}>
        <p style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.3em", color: "#7F77DD", textTransform: "uppercase", marginBottom: "1rem" }}>Méthode</p>
        <h1 style={{ ...sans, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#E8E8F0", lineHeight: 1.15, marginBottom: "1.5rem" }}>
          Du brief à la livraison —<br />un process sans friction.
        </h1>
        <p style={{ ...sans, color: "#6B6B80", maxWidth: "480px", lineHeight: 1.7 }}>
          5 étapes structurées pour un résultat maîtrisé. Vous savez toujours où on en est.
        </p>
      </AnimatedSection>

      <div style={{ position: "relative" }}>
        {/* Vertical timeline line */}
        <div style={{ position: "absolute", left: "2rem", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, #7F77DD80, #378ADD30, transparent)" }} className="timeline-line" />

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {steps.map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 0.1}>
              <div style={{ paddingLeft: "0" }} className="step-row">
                {/* Number bubble — hidden on mobile, shown on desktop via class */}
                <div className="step-bubble" style={{ display: "none", position: "absolute", left: 0, top: "2rem", width: "64px", height: "64px", borderRadius: "50%", border: "1px solid #1E1E2A", background: "#0A0A0F", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ ...mono, fontSize: "0.875rem", fontWeight: 700, color: "#7F77DD" }}>{step.num}</span>
                </div>

                <div style={{ borderRadius: "1.25rem", border: "1px solid #1E1E2A", background: "#13131A20", padding: "2rem", transition: "border-color 0.3s" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <span style={{ ...mono, fontSize: "0.65rem", color: "#7F77DD" }} className="step-num-mobile">{step.num}. </span>
                      <h2 style={{ ...sans, fontSize: "1.25rem", fontWeight: 700, color: "#E8E8F0", display: "inline" }}>{step.title}</h2>
                      <p style={{ ...sans, fontSize: "0.875rem", color: "#6B6B80", marginTop: "0.25rem" }}>{step.sub}</p>
                    </div>
                    <span style={{ ...mono, fontSize: "0.65rem", color: "#6B6B80", background: "#0A0A0F", border: "1px solid #1E1E2A", padding: "0.25rem 0.75rem", borderRadius: "9999px", flexShrink: 0 }}>
                      {step.timing}
                    </span>
                  </div>

                  <p style={{ ...sans, fontSize: "0.875rem", color: "#6B6B80", lineHeight: 1.8, marginBottom: "1.5rem" }}>{step.desc}</p>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#378ADD" strokeWidth={2} style={{ flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style={{ ...mono, fontSize: "0.6rem", color: "#378ADD" }}>Livrable : {step.deliverable}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <AnimatedSection delay={0.6} style={{ marginTop: "5rem", textAlign: "center" }}>
        <p style={{ ...sans, color: "#6B6B80", marginBottom: "1.5rem" }}>Prêt à démarrer votre projet ?</p>
        <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "1rem 2rem", borderRadius: "9999px", background: "#7F77DD", color: "white", ...sans, fontWeight: 500 }}>
          Parler de mon projet
        </Link>
      </AnimatedSection>

      <style>{`
        @media (min-width: 768px) {
          .step-row { padding-left: 5.5rem !important; position: relative; }
          .step-bubble { display: flex !important; }
          .timeline-line { display: block; }
          .step-num-mobile { display: none; }
        }
        @media (max-width: 767px) {
          .timeline-line { display: none; }
        }
      `}</style>
    </div>
  );
}
