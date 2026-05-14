"use client";

import { useState } from "react";

const mono: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const sans: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };
const inputStyle: React.CSSProperties = {
  width: "100%", ...sans, fontSize: "0.875rem",
  background: "#13131A", border: "1px solid #1E1E2A",
  borderRadius: "0.75rem", padding: "0.75rem 1rem",
  color: "#E8E8F0", outline: "none", boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  ...mono, fontSize: "0.58rem", letterSpacing: "0.25em",
  color: "#6B6B80", textTransform: "uppercase",
  display: "block", marginBottom: "0.5rem",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", projectName: "", deliveryDate: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<{ token: string; url: string } | null>(null);

  const clients: { name: string; url: string; token: string }[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("portfolio_clients") ?? "[]")
      : [];

  const checkPassword = () => {
    // Simple local check — real auth is on the API route
    if (password.length >= 4) { setAuthed(true); setAuthError(false); }
    else setAuthError(true);
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResult(data);
      setStatus("done");

      // Store locally for convenience
      const prev = JSON.parse(localStorage.getItem("portfolio_clients") ?? "[]");
      localStorage.setItem("portfolio_clients", JSON.stringify([
        { name: form.name, projectName: form.projectName, url: data.url, token: data.token },
        ...prev,
      ]));
      setForm({ name: "", email: "", projectName: "", deliveryDate: "" });
    } catch {
      setStatus("error");
    }
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
        <div style={{ width: "100%", maxWidth: "24rem" }}>
          <p style={{ ...mono, fontSize: "0.58rem", color: "#7F77DD", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Espace admin</p>
          <h1 style={{ ...sans, fontSize: "1.5rem", fontWeight: 700, color: "#E8E8F0", marginBottom: "2rem" }}>Accès restreint</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Mot de passe admin</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkPassword()}
                placeholder="••••••••"
                style={inputStyle}
              />
              {authError && <p style={{ ...sans, fontSize: "0.8rem", color: "#f87171", marginTop: "0.5rem" }}>Mot de passe incorrect.</p>}
            </div>
            <button
              onClick={checkPassword}
              style={{ ...sans, fontWeight: 600, padding: "0.875rem", borderRadius: "9999px", background: "#7F77DD", color: "white", border: "none", cursor: "pointer" }}
            >
              Accéder
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "5rem 1.5rem 6rem" }}>
      <p style={{ ...mono, fontSize: "0.58rem", color: "#7F77DD", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Admin</p>
      <h1 style={{ ...sans, fontSize: "2rem", fontWeight: 700, color: "#E8E8F0", marginBottom: "3rem" }}>Créer un espace client</h1>

      {/* Form */}
      <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Nom du client *</label>
            <input required type="text" placeholder="Marie Dupont" value={form.name} onChange={set("name")} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input required type="email" placeholder="marie@exemple.fr" value={form.email} onChange={set("email")} style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Nom du projet *</label>
          <input required type="text" placeholder="Brand Film — Maison Dupont" value={form.projectName} onChange={set("projectName")} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Date de livraison prévue</label>
          <input type="date" value={form.deliveryDate} onChange={set("deliveryDate")} style={{ ...inputStyle, colorScheme: "dark" }} />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          style={{ ...sans, fontWeight: 600, padding: "0.875rem", borderRadius: "9999px", background: status === "loading" ? "#2E2E3A" : "#7F77DD", color: "white", border: "none", cursor: "pointer" }}
        >
          {status === "loading" ? "Création…" : "Créer l'espace client"}
        </button>
        {status === "error" && (
          <p style={{ ...sans, fontSize: "0.875rem", color: "#f87171" }}>
            Erreur. Vérifiez que NOTION_CLIENTS_DB et NOTION_API_KEY sont configurés dans .env.local.
          </p>
        )}
      </form>

      {/* Success */}
      {status === "done" && result && (
        <div style={{ border: "1px solid #4ade8030", borderRadius: "1rem", padding: "1.5rem", background: "#4ade8008", marginBottom: "2rem" }}>
          <p style={{ ...sans, fontWeight: 600, color: "#4ade80", marginBottom: "0.75rem" }}>Espace client créé ✓</p>
          <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>URL secrète à envoyer au client :</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "#13131A", border: "1px solid #1E1E2A", borderRadius: "0.75rem", padding: "0.75rem 1rem" }}>
            <code style={{ ...mono, fontSize: "0.8rem", color: "#7F77DD", flex: 1, wordBreak: "break-all" }}>{result.url}</code>
            <button
              onClick={() => navigator.clipboard.writeText(result.url)}
              style={{ ...mono, fontSize: "0.6rem", color: "#6B6B80", background: "none", border: "1px solid #1E1E2A", borderRadius: "0.5rem", padding: "0.375rem 0.75rem", cursor: "pointer" }}
            >
              Copier
            </button>
          </div>
        </div>
      )}

      {/* Client list */}
      {clients.length > 0 && (
        <div>
          <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Espaces créés récemment</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {clients.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", border: "1px solid #1E1E2A", borderRadius: "0.75rem", background: "#13131A30" }}>
                <div>
                  <p style={{ ...sans, fontWeight: 500, color: "#E8E8F0", fontSize: "0.875rem" }}>{c.name}</p>
                  <p style={{ ...mono, fontSize: "0.58rem", color: "#6B6B80" }}>{c.token}</p>
                </div>
                <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: "0.6rem", color: "#7F77DD", border: "1px solid #7F77DD30", padding: "0.3rem 0.75rem", borderRadius: "9999px" }}>
                  Voir →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
