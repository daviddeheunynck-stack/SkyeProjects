"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Tarification monteur vidéo ──────────────────────────────────────────────

const VIDEO_TYPES = [
  { id: "reel",       label: "Reel / Short",           sub: "Vidéo verticale courte",       rate: 80  },
  { id: "youtube",    label: "YouTube / Long format",   sub: "Documentaire, vlog, éducatif", rate: 150 },
  { id: "pub",        label: "Publicité / Spot",        sub: "TV, réseaux, display",         rate: 250 },
  { id: "aftermovie", label: "Aftermovie",              sub: "Événement, festival, soirée",  rate: 180 },
  { id: "corporate",  label: "Vidéo d'entreprise",      sub: "Institutionnel, marque",       rate: 200 },
  { id: "tuto",       label: "Tutoriel / Formation",    sub: "E-learning, tuto produit",     rate: 120 },
];

const DURATIONS = [
  { id: "xs", label: "Moins d'1 minute",   sub: "Reel, teaser, bumper",    min: 0.5, max: 1  },
  { id: "s",  label: "1 à 3 minutes",      sub: "Court format classique",  min: 1,   max: 3  },
  { id: "m",  label: "3 à 10 minutes",     sub: "Vidéo web standard",      min: 3,   max: 10 },
  { id: "l",  label: "10 à 30 minutes",    sub: "Long format, interview",  min: 10,  max: 30 },
  { id: "xl", label: "Plus de 30 minutes", sub: "Documentaire, formation", min: 30,  max: 60 },
];

const COMPLEXITIES = [
  { id: "simple",   label: "Simple",   sub: "Cuts, J-cuts, transitions standard",          coeff: 1.0 },
  { id: "standard", label: "Standard", sub: "Motion design léger, étalonnage, SFX",        coeff: 1.4 },
  { id: "complex",  label: "Complexe", sub: "VFX, animations avancées, sound design full", coeff: 1.8 },
  { id: "premium",  label: "Premium",  sub: "Compositing, 3D, IA génératif, full motion",  coeff: 2.5 },
];

const DEADLINES = [
  { id: "flex",     label: "Flexible", sub: "Plus de 3 semaines",  coeff: 1.0 },
  { id: "standard", label: "Standard", sub: "1 à 3 semaines",      coeff: 1.2 },
  { id: "urgent",   label: "Urgent",   sub: "Moins d'1 semaine",   coeff: 1.5 },
  { id: "express",  label: "Express",  sub: "Moins de 48 heures",  coeff: 2.0 },
];

const RUSHES = [
  { id: "yes",     label: "Oui, rushes fournis",      sub: "Fichiers prêts à monter",       coeff: 1.0  },
  { id: "partial", label: "Partiellement",             sub: "Mix rushes + tournage partiel", coeff: 1.25 },
  { id: "no",      label: "Non, tournage à prévoir",   sub: "Coordination avec caméraman",   coeff: 1.5  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Answers {
  videoType: string;
  duration: string;
  complexity: string;
  deadline: string;
  rushes: string;
  name: string;
  email: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return Math.round(n).toLocaleString("fr-FR");
}

function computeRange(answers: Answers) {
  const vt   = VIDEO_TYPES.find((v) => v.id === answers.videoType);
  const dur  = DURATIONS.find((d) => d.id === answers.duration);
  const cx   = COMPLEXITIES.find((c) => c.id === answers.complexity);
  const dl   = DEADLINES.find((d) => d.id === answers.deadline);
  const rsh  = RUSHES.find((r) => r.id === answers.rushes);
  if (!vt || !dur || !cx || !dl || !rsh) return null;

  const base_min = dur.min * vt.rate * cx.coeff * dl.coeff * rsh.coeff;
  const base_max = dur.max * vt.rate * cx.coeff * dl.coeff * rsh.coeff;
  return {
    low:  Math.max(80, base_min * 0.9),
    high: base_max * 1.1,
  };
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const mono: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const sans: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

// ─── Option card ─────────────────────────────────────────────────────────────

function Option({ label, sub, selected, onClick }: { label: string; sub: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "1rem 1.25rem",
        borderRadius: "0.875rem",
        border: `1px solid ${selected ? "#7F77DD" : "#1E1E2A"}`,
        background: selected ? "#7F77DD12" : "#13131A30",
        cursor: "pointer",
        transition: "all 0.18s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <div>
        <p style={{ ...sans, fontWeight: 600, color: selected ? "#E8E8F0" : "#B0B0C0", fontSize: "0.9rem", marginBottom: "0.2rem" }}>{label}</p>
        <p style={{ ...mono, fontSize: "0.6rem", color: selected ? "#7F77DD" : "#6B6B80", letterSpacing: "0.1em" }}>{sub}</p>
      </div>
      <div style={{
        width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
        border: `1.5px solid ${selected ? "#7F77DD" : "#2E2E3A"}`,
        background: selected ? "#7F77DD" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.18s",
      }}>
        {selected && (
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const STEPS = ["Type", "Durée", "Complexité", "Délai", "Rushes", "Résultat"];

export default function CalculatorPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const [answers, setAnswers] = useState<Answers>({
    videoType: "", duration: "", complexity: "", deadline: "", rushes: "",
    name: "", email: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);

  const set = (key: keyof Answers) => (val: string) =>
    setAnswers((a) => ({ ...a, [key]: val }));

  const next = () => { setDir(1); setStep((s) => s + 1); };
  const back = () => { setDir(-1); setStep((s) => s - 1); };

  const canNext = [
    !!answers.videoType,
    !!answers.duration,
    !!answers.complexity,
    !!answers.deadline,
    !!answers.rushes,
  ][step] ?? true;

  const range = step === 5 ? computeRange(answers) : null;

  // Auto-advance when an option is selected on steps 0–4
  const pick = (key: keyof Answers, val: string) => {
    set(key)(val);
    setTimeout(() => { setDir(1); setStep((s) => s + 1); }, 240);
  };

  const handleSend = async () => {
    if (!answers.name || !answers.email) return;
    setSending(true);
    setSendError(false);
    try {
      const vt  = VIDEO_TYPES.find((v) => v.id === answers.videoType);
      const dur = DURATIONS.find((d) => d.id === answers.duration);
      const cx  = COMPLEXITIES.find((c) => c.id === answers.complexity);
      const dl  = DEADLINES.find((d) => d.id === answers.deadline);
      const rsh = RUSHES.find((r) => r.id === answers.rushes);

      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name,
          email: answers.email,
          videoType: vt?.label ?? answers.videoType,
          duration: dur?.label ?? answers.duration,
          complexity: cx?.label ?? answers.complexity,
          deadline: dl?.label ?? answers.deadline,
          rushes: rsh?.label ?? answers.rushes,
          estimateLow:  range ? Math.round(range.low)  : 0,
          estimateHigh: range ? Math.round(range.high) : 0,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
  };

  const questions: React.ReactNode[] = [
    // Step 0 — type
    <StepShell key="0" title="Quel type de vidéo ?" step={0} total={5}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }} className="options-grid">
        {VIDEO_TYPES.map((v) => (
          <Option key={v.id} label={v.label} sub={`${v.sub} · ${v.rate} €/min`}
            selected={answers.videoType === v.id}
            onClick={() => pick("videoType", v.id)} />
        ))}
      </div>
    </StepShell>,

    // Step 1 — duration
    <StepShell key="1" title="Quelle durée finale visez-vous ?" step={1} total={5}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {DURATIONS.map((d) => (
          <Option key={d.id} label={d.label} sub={d.sub}
            selected={answers.duration === d.id}
            onClick={() => pick("duration", d.id)} />
        ))}
      </div>
    </StepShell>,

    // Step 2 — complexity
    <StepShell key="2" title="Niveau de complexité technique ?" step={2} total={5}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {COMPLEXITIES.map((c) => (
          <Option key={c.id} label={c.label} sub={c.sub}
            selected={answers.complexity === c.id}
            onClick={() => pick("complexity", c.id)} />
        ))}
      </div>
    </StepShell>,

    // Step 3 — deadline
    <StepShell key="3" title="Quel est votre délai ?" step={3} total={5}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {DEADLINES.map((d) => (
          <Option key={d.id} label={d.label} sub={d.sub}
            selected={answers.deadline === d.id}
            onClick={() => pick("deadline", d.id)} />
        ))}
      </div>
    </StepShell>,

    // Step 4 — rushes
    <StepShell key="4" title="Avez-vous déjà les rushes ?" step={4} total={5}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {RUSHES.map((r) => (
          <Option key={r.id} label={r.label} sub={r.sub}
            selected={answers.rushes === r.id}
            onClick={() => pick("rushes", r.id)} />
        ))}
      </div>
    </StepShell>,

    // Step 5 — result
    <div key="5" style={{ width: "100%" }}>
      {range && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Price card */}
          <div style={{
            borderRadius: "1.5rem",
            border: "1px solid #7F77DD40",
            background: "linear-gradient(135deg, #7F77DD08 0%, #378ADD05 100%)",
            padding: "2.5rem",
            textAlign: "center",
          }}>
            <p style={{ ...mono, fontSize: "0.6rem", color: "#7F77DD", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Estimation budgétaire
            </p>
            <p style={{ ...sans, fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 800, color: "#E8E8F0", lineHeight: 1 }}>
              {fmt(range.low)} – {fmt(range.high)} €
            </p>
            <p style={{ ...mono, fontSize: "0.6rem", color: "#6B6B80", marginTop: "0.5rem" }}>HT · hors frais de tournage</p>

            <div style={{ height: "1px", background: "#1E1E2A", margin: "2rem 0" }} />

            <p style={{ ...sans, fontSize: "0.875rem", color: "#6B6B80", lineHeight: 1.7 }}>
              Cette fourchette est indicative. Le{" "}
              <span style={{ color: "#E8E8F0", fontWeight: 600 }}>devis personnalisé final</span>{" "}
              vous sera envoyé après un{" "}
              <span style={{ color: "#7F77DD", fontWeight: 600 }}>appel découverte de 30 min</span>{" "}
              — gratuit, sans engagement.
            </p>
          </div>

          {/* Recap */}
          <div style={{ border: "1px solid #1E1E2A", borderRadius: "1rem", padding: "1.25rem", background: "#13131A30" }}>
            <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.875rem" }}>Récapitulatif</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {[
                VIDEO_TYPES.find((v) => v.id === answers.videoType)?.label,
                DURATIONS.find((d) => d.id === answers.duration)?.label,
                COMPLEXITIES.find((c) => c.id === answers.complexity)?.label,
                DEADLINES.find((d) => d.id === answers.deadline)?.label,
                RUSHES.find((r) => r.id === answers.rushes)?.label,
              ].filter(Boolean).map((tag, i) => (
                <span key={i} style={{ ...mono, fontSize: "0.65rem", padding: "0.3rem 0.7rem", borderRadius: "9999px", border: "1px solid #1E1E2A", color: "#E8E8F0", background: "#13131A" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Lead capture */}
          {!sent ? (
            <div style={{ border: "1px solid #1E1E2A", borderRadius: "1rem", padding: "1.5rem", background: "#13131A30" }}>
              <p style={{ ...sans, fontWeight: 600, color: "#E8E8F0", marginBottom: "0.25rem" }}>
                Recevoir cette estimation par email
              </p>
              <p style={{ ...sans, fontSize: "0.8rem", color: "#6B6B80", marginBottom: "1.25rem" }}>
                Je créerai votre fiche prospect et vous contacterai sous 48h.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <input
                  type="text"
                  placeholder="Votre prénom et nom"
                  value={answers.name}
                  onChange={(e) => set("name")(e.target.value)}
                  style={{ ...sans, fontSize: "0.875rem", width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #1E1E2A", background: "#13131A", color: "#E8E8F0", outline: "none", boxSizing: "border-box" }}
                />
                <input
                  type="email"
                  placeholder="votre@email.fr"
                  value={answers.email}
                  onChange={(e) => set("email")(e.target.value)}
                  style={{ ...sans, fontSize: "0.875rem", width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #1E1E2A", background: "#13131A", color: "#E8E8F0", outline: "none", boxSizing: "border-box" }}
                />
                <button
                  onClick={handleSend}
                  disabled={sending || !answers.name || !answers.email}
                  style={{
                    ...sans, fontWeight: 600, fontSize: "0.875rem",
                    padding: "0.875rem", borderRadius: "9999px",
                    background: sending || !answers.name || !answers.email ? "#2E2E3A" : "#7F77DD",
                    color: "white", border: "none", cursor: sending || !answers.name || !answers.email ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {sending ? "Envoi en cours…" : "Envoyer mon estimation → Parler avec le monteur"}
                </button>
                {sendError && (
                  <p style={{ ...sans, fontSize: "0.8rem", color: "#f87171" }}>
                    Erreur d&apos;envoi. Contactez-moi directement sur{" "}
                    <a href="/contact" style={{ color: "#7F77DD", textDecoration: "underline" }}>la page contact</a>.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div style={{ border: "1px solid #4ade8030", borderRadius: "1rem", padding: "1.5rem", background: "#4ade8008", textAlign: "center" }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2} style={{ margin: "0 auto 0.75rem", display: "block" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p style={{ ...sans, fontWeight: 600, color: "#E8E8F0", marginBottom: "0.5rem" }}>Fiche créée !</p>
              <p style={{ ...sans, fontSize: "0.875rem", color: "#6B6B80" }}>Je vous réponds sous 48h pour confirmer et fixer l&apos;appel découverte.</p>
            </div>
          )}

          {/* CTA full quote */}
          <div style={{ textAlign: "center" }}>
            <Link href="/contact" style={{ ...sans, fontSize: "0.875rem", color: "#6B6B80", textDecoration: "underline" }}>
              Préférer le formulaire de devis complet →
            </Link>
          </div>
        </div>
      )}
    </div>,
  ];

  return (
    <div style={{ minHeight: "100vh", maxWidth: "42rem", margin: "0 auto", padding: "7rem 1.5rem 6rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <p style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.3em", color: "#7F77DD", textTransform: "uppercase", marginBottom: "0.75rem" }}>Calculateur</p>
        <h1 style={{ ...sans, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "#E8E8F0", lineHeight: 1.2, marginBottom: "0.75rem" }}>
          Estimez votre projet<br />en 2 minutes.
        </h1>
        <p style={{ ...sans, fontSize: "0.9rem", color: "#6B6B80" }}>5 questions · résultat instantané · sans engagement</p>
      </div>

      {/* Progress bar */}
      {step < 5 && (
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Question {step + 1} sur 5
            </p>
            <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80" }}>
              {STEPS[step]}
            </p>
          </div>
          <div style={{ height: "3px", borderRadius: "9999px", background: "#1E1E2A", overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${((step + 1) / 5) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ height: "100%", background: "linear-gradient(90deg, #7F77DD, #378ADD)", borderRadius: "9999px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                flex: 1, height: "2px", borderRadius: "9999px",
                background: i <= step ? "#7F77DD" : "#1E1E2A",
                transition: "background 0.3s",
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {questions[step]}
        </motion.div>
      </AnimatePresence>

      {/* Back button */}
      {step > 0 && step < 5 && (
        <button
          onClick={back}
          style={{ ...mono, fontSize: "0.65rem", color: "#6B6B80", background: "none", border: "none", cursor: "pointer", marginTop: "1.5rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: 0 }}
        >
          ← Retour
        </button>
      )}
      {step === 5 && (
        <button
          onClick={() => { setDir(-1); setStep(4); }}
          style={{ ...mono, fontSize: "0.65rem", color: "#6B6B80", background: "none", border: "none", cursor: "pointer", marginTop: "1.5rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: 0 }}
        >
          ← Modifier mes réponses
        </button>
      )}

      <style>{`
        @media (max-width: 500px) { .options-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

// ─── Step shell ───────────────────────────────────────────────────────────────

function StepShell({ title, children }: { title: string; step: number; total: number; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#E8E8F0", marginBottom: "1.5rem", lineHeight: 1.3 }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
