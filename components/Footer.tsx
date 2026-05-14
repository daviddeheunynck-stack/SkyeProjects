import Link from "next/link";

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
};

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1E1E2A", marginTop: "8rem" }}>
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        <p style={{ ...mono, color: "#6B6B80" }}>
          © {new Date().getFullYear()} — SkyeProjects · Monteur vidéo freelance
        </p>
        <nav style={{ display: "flex", gap: "1.5rem" }}>
          {[
            { href: "/works", label: "Travaux" },
            { href: "/services", label: "Services" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{ ...mono, color: "#6B6B80" }}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
