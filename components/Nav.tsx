"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/calculator", label: "Calculateur" },
  { href: "/works", label: "Travaux" },
  { href: "/method", label: "Méthode" },
  { href: "/contact", label: "Contact" },
];

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
};

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s",
        background: scrolled ? "rgba(10,10,15,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1E1E2A" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "1.25rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ ...mono, color: "#7F77DD", fontWeight: 700 }}>
          SkyeProjects
        </Link>

        {/* Desktop links */}
        <ul style={{ display: "flex", alignItems: "center", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}
            className="desktop-nav"
        >
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  ...mono,
                  color: pathname === href ? "#7F77DD" : "#6B6B80",
                  transition: "color 0.2s",
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="cta-pill"
          style={{
            ...mono,
            padding: "0.5rem 1.25rem",
            borderRadius: "9999px",
            border: "1px solid #7F77DD",
            color: "#7F77DD",
            transition: "all 0.2s",
          }}
        >
          Devis gratuit
        </Link>

        {/* Burger — visible only on mobile via CSS */}
        <button
          className="burger-btn"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                height: "1px",
                width: "24px",
                background: "#E8E8F0",
                transition: "all 0.3s",
                transform:
                  open && i === 0 ? "rotate(45deg) translate(4px, 4px)"
                  : open && i === 2 ? "rotate(-45deg) translate(4px, -4px)"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden", background: "rgba(10,10,15,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1E1E2A" }}
          >
            <ul style={{ padding: "1rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", margin: 0 }}>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ ...mono, fontSize: "0.875rem", color: pathname === href ? "#7F77DD" : "#6B6B80" }}>
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" style={{ ...mono, padding: "0.5rem 1.25rem", borderRadius: "9999px", border: "1px solid #7F77DD", color: "#7F77DD", display: "inline-block" }}>
                  Devis gratuit
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .burger-btn { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } .cta-pill { display: none !important; } }
      `}</style>
    </header>
  );
}
