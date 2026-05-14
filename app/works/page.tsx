"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import VideoCard from "@/components/VideoCard";

const mono: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const sans: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

const categories = ["Tous", "Brand", "Musique", "Documentaire", "Corporate", "Social"];

const projects = [
  { title: "Brand Film — Maison Dupont", category: "Brand", duration: "2:34", videoSrc: "/videos/brand-film.mp4" },
  { title: "Clip Officiel — Artiste X", category: "Musique", duration: "3:47", videoSrc: "/videos/clip.mp4" },
  { title: "Documentaire Court — Territoires", category: "Documentaire", duration: "8:12", videoSrc: "/videos/docu.mp4" },
  { title: "Campagne Automne — Marque Y", category: "Brand", duration: "0:30", videoSrc: "/videos/campagne.mp4" },
  { title: "Interview CEO — Startup Z", category: "Corporate", duration: "4:55", videoSrc: "/videos/interview.mp4" },
  { title: "Reel Instagram — Influenceur", category: "Social", duration: "0:15", videoSrc: "/videos/reel.mp4" },
  { title: "Aftermovie — Festival Été", category: "Documentaire", duration: "5:20", videoSrc: "/videos/aftermovie.mp4" },
  { title: "Spot TV — Produit Grand Public", category: "Corporate", duration: "0:45", videoSrc: "/videos/spot.mp4" },
  { title: "Session Live — Groupe de Jazz", category: "Musique", duration: "6:10", videoSrc: "/videos/live.mp4" },
];

export default function WorksPage() {
  const [active, setActive] = useState("Tous");
  const filtered = active === "Tous" ? projects : projects.filter((p) => p.category === active);

  return (
    <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "9rem 1.5rem 6rem" }}>
      <AnimatedSection style={{ marginBottom: "3rem" }}>
        <p style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.3em", color: "#7F77DD", textTransform: "uppercase", marginBottom: "1rem" }}>Galerie</p>
        <h1 style={{ ...sans, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#E8E8F0" }}>Mes travaux</h1>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection delay={0.1} style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                ...mono,
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                border: `1px solid ${active === cat ? "#7F77DD" : "#1E1E2A"}`,
                background: active === cat ? "#7F77DD" : "transparent",
                color: active === cat ? "white" : "#6B6B80",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="works-grid">
        {filtered.map((project, i) => (
          <AnimatedSection key={project.title} delay={i * 0.05}>
            <VideoCard {...project} />
          </AnimatedSection>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "6rem 0" }}>
          <p style={{ ...mono, fontSize: "0.875rem", color: "#6B6B80" }}>Aucun projet dans cette catégorie.</p>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) { .works-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { .works-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </div>
  );
}
