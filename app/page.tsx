"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import VideoCard from "@/components/VideoCard";

const featuredWorks = [
  {
    title: "Brand Film — Maison Dupont",
    category: "Brand",
    duration: "2:34",
    videoSrc: "/videos/brand-film.mp4",
  },
  {
    title: "Clip Officiel — Artiste X",
    category: "Musique",
    duration: "3:47",
    videoSrc: "/videos/clip.mp4",
  },
  {
    title: "Documentaire Court — Territoires",
    category: "Documentaire",
    duration: "8:12",
    videoSrc: "/videos/docu.mp4",
  },
];

const stats = [
  { value: "120+", label: "Projets livrés" },
  { value: "5 ans", label: "D'expérience" },
  { value: "98%", label: "Clients satisfaits" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-6xl mx-auto" style={{ position: "relative" }}>
        {/* Mid-page red orb — hero only */}
        <div style={{ position: "absolute", top: "30%", left: "55%", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, #FF2D2D0D 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#7F77DD", textTransform: "uppercase", marginBottom: "1.5rem" }}
          >
            Monteur vidéo freelance · Paris
          </p>
          <h1
            style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#E8E8F0", marginBottom: "2rem", textAlign: "center" }}
          >
            Je donne vie à
            <br />
            <span style={{ backgroundImage: "linear-gradient(135deg, #FF2D2D, #7F77DD, #378ADD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              vos histoires
            </span>
            <br />
            en images.
          </h1>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.1rem", color: "#6B6B80", maxWidth: "480px", lineHeight: 1.7, marginBottom: "3rem", textAlign: "center", margin: "0 auto 3rem" }}>
            Du brand film au clip musical, je monte des vidéos qui captivent, engagent et convertissent. Chaque projet est une collaboration créative de A à Z.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link
              href="/works"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: "9999px", background: "#7F77DD", color: "white", fontFamily: "var(--font-inter), sans-serif", fontWeight: 500, fontSize: "0.875rem" }}
            >
              Voir mes travaux
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", padding: "0.75rem 1.5rem", borderRadius: "9999px", border: "1px solid #1E1E2A", color: "#E8E8F0", fontFamily: "var(--font-inter), sans-serif", fontWeight: 500, fontSize: "0.875rem" }}
            >
              Demander un devis
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ marginTop: "6rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <div style={{ height: "1px", width: "48px", background: "#1E1E2A" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "#6B6B80", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
          <motion.svg
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6B6B80" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.div>
      </section>

      {/* Stats */}
      <AnimatedSection>
        <div style={{ maxWidth: "72rem", margin: "0 auto 8rem", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid #1E1E2A", borderRadius: "1rem", padding: "2rem", background: "#13131A50" }}>
            {stats.map(({ value, label }, i) => (
              <div key={i} style={{ textAlign: "center", borderRight: i < 2 ? "1px solid #1E1E2A" : "none" }}>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "2rem", fontWeight: 700, color: "#E8E8F0", marginBottom: "0.25rem" }}>{value}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#6B6B80", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured works */}
      <section style={{ maxWidth: "72rem", margin: "0 auto 8rem", padding: "0 1.5rem" }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem" }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#7F77DD", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Sélection</p>
              <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "#E8E8F0" }}>Mes meilleurs travaux</h2>
            </div>
            <Link href="/works" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#6B6B80", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Tout voir →
            </Link>
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {featuredWorks.map((work, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <VideoCard {...work} href="/works" />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <AnimatedSection>
        <div style={{ maxWidth: "72rem", margin: "0 auto 8rem", padding: "0 1.5rem" }}>
          <div style={{ borderRadius: "1.5rem", border: "1px solid #1E1E2A", background: "linear-gradient(135deg, #13131A, #0D0D16)", padding: "4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #7F77DD08, #378ADD08)" }} />
            <div style={{ position: "relative" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#7F77DD", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Votre prochain projet</p>
              <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, color: "#E8E8F0", marginBottom: "1.5rem", lineHeight: 1.3 }}>
                Prêt à créer quelque chose<br />de mémorable ?
              </h2>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", color: "#6B6B80", marginBottom: "2rem", maxWidth: "28rem", margin: "0 auto 2rem" }}>
                Parlez-moi de votre projet, recevez un devis sous 48h.
              </p>
              <Link
                href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: "9999px", background: "#7F77DD", color: "white", fontFamily: "var(--font-inter), sans-serif", fontWeight: 500 }}
              >
                Démarrer un projet
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
