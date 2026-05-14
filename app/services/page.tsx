"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

const mono: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const sans: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

const packs = [
  {
    name: "Essentiel",
    price: "690",
    desc: "Parfait pour un contenu ponctuel ou une première collaboration.",
    features: ["Jusqu'à 3 min de montage", "2 allers-retours", "Export HD 1080p", "Musique libre de droits", "Livraison 7 jours"],
    accent: "#378ADD",
    popular: false,
  },
  {
    name: "Pro",
    price: "1 490",
    desc: "Pour les projets ambitieux qui demandent soin et finition.",
    features: ["Jusqu'à 8 min de montage", "Étalonnage colorimétrique", "Motion design intégré", "3 allers-retours", "Multi-formats (web, TV, réseaux)", "Livraison 10 jours"],
    accent: "#7F77DD",
    popular: true,
  },
  {
    name: "Premium",
    price: "Sur devis",
    desc: "Projets longs, séries ou partenariats récurrents.",
    features: ["Durée illimitée", "Sound design avancé", "Collaboration sur le script", "Révisions illimitées", "Suivi prioritaire", "Droits commerciaux complets"],
    accent: "#7F77DD",
    popular: false,
  },
];

const faqs = [
  { q: "Comment se passe le premier contact ?", a: "Un appel découverte de 30 min pour cerner votre projet, objectifs et budget. Devis sous 48h." },
  { q: "Quels formats de fichiers livrez-vous ?", a: "MP4 H.264/H.265 par défaut. Sur demande : ProRes pour post-prod ou formats diffuseurs TV." },
  { q: "Vous travaillez avec des rushes fournis ou vous filmez aussi ?", a: "Les deux ! Je monte vos rushes existants, ou je collabore avec votre équipe de tournage." },
];

export default function ServicesPage() {
  return (
    <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "9rem 1.5rem 6rem" }}>
      <AnimatedSection style={{ textAlign: "center", marginBottom: "5rem" }}>
        <p style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.3em", color: "#7F77DD", textTransform: "uppercase", marginBottom: "1rem" }}>Tarifs</p>
        <h1 style={{ ...sans, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#E8E8F0", marginBottom: "1.5rem" }}>Des packs clairs,<br />sans surprise.</h1>
        <p style={{ ...sans, color: "#6B6B80", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
          Chaque projet est unique. Ces packs sont un point de départ — contactez-moi pour un devis sur mesure.
        </p>
      </AnimatedSection>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", marginBottom: "6rem" }} className="packs-grid">
        {packs.map((pack, i) => (
          <AnimatedSection key={pack.name} delay={i * 0.1}>
            <div style={{
              height: "100%",
              position: "relative",
              borderRadius: "1.25rem",
              border: `1px solid ${pack.popular ? "#7F77DD50" : "#1E1E2A"}`,
              background: pack.popular ? "linear-gradient(180deg, #7F77DD08 0%, transparent 100%)" : "#13131A20",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s",
            }}>
              {pack.popular && (
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)" }}>
                  <span style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "0.25rem 1rem", borderRadius: "9999px", background: "#7F77DD", color: "white" }}>
                    Recommandé
                  </span>
                </div>
              )}

              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.2em", color: "#6B6B80", textTransform: "uppercase", marginBottom: "0.5rem" }}>{pack.name}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  {pack.price === "Sur devis" ? (
                    <span style={{ ...sans, fontSize: "1.75rem", fontWeight: 700, color: "#E8E8F0" }}>Sur devis</span>
                  ) : (
                    <>
                      <span style={{ ...sans, fontSize: "2.5rem", fontWeight: 700, color: "#E8E8F0" }}>{pack.price} €</span>
                      <span style={{ ...mono, fontSize: "0.65rem", color: "#6B6B80" }}>HT</span>
                    </>
                  )}
                </div>
                <p style={{ ...sans, fontSize: "0.875rem", color: "#6B6B80", lineHeight: 1.6 }}>{pack.desc}</p>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {pack.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={pack.accent} strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ ...sans, fontSize: "0.875rem", color: "#E8E8F0CC" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "0.75rem",
                  borderRadius: "9999px",
                  ...sans,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  transition: "all 0.2s",
                  background: pack.popular ? "#7F77DD" : "transparent",
                  color: pack.popular ? "white" : "#E8E8F0",
                  border: pack.popular ? "none" : "1px solid #1E1E2A",
                }}
              >
                Demander un devis
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Calculator CTA */}
      <AnimatedSection style={{ marginBottom: "5rem" }}>
        <div style={{
          borderRadius: "1.5rem",
          border: "1px solid #7F77DD30",
          background: "linear-gradient(135deg, #7F77DD08 0%, #378ADD05 100%)",
          padding: "3rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
        }}>
          <div>
            <p style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.3em", color: "#7F77DD", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Pas sûr du budget ?
            </p>
            <h3 style={{ ...sans, fontSize: "1.4rem", fontWeight: 700, color: "#E8E8F0", marginBottom: "0.5rem" }}>
              Estimez votre projet en 2 minutes.
            </h3>
            <p style={{ ...sans, fontSize: "0.875rem", color: "#6B6B80", maxWidth: "380px", lineHeight: 1.6 }}>
              5 questions, résultat instantané. Le calculateur adapte le tarif à votre type de vidéo, sa durée, sa complexité et votre délai.
            </p>
          </div>
          <Link
            href="/calculator"
            style={{
              ...sans, fontWeight: 600, fontSize: "0.9rem",
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.875rem 1.75rem", borderRadius: "9999px",
              background: "#7F77DD", color: "white", flexShrink: 0,
            }}
          >
            Lancer le calculateur
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection>
        <p style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.3em", color: "#7F77DD", textTransform: "uppercase", marginBottom: "2rem" }}>FAQ</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: "1px solid #1E1E2A", borderRadius: "0.75rem", padding: "1.5rem", background: "#13131A20" }}>
              <p style={{ ...sans, fontWeight: 600, color: "#E8E8F0", marginBottom: "0.75rem" }}>{faq.q}</p>
              <p style={{ ...sans, fontSize: "0.875rem", color: "#6B6B80", lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <style>{`
        @media (min-width: 768px) { .packs-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </div>
  );
}
