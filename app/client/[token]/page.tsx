import { getClientByToken, getFiles, getMessages } from "@/lib/notion";
import { DEMO_CLIENT, DEMO_FILES, DEMO_MESSAGES } from "@/lib/demo";
import ClientPortal from "./ClientPortal";

interface Props {
  params: Promise<{ token: string }>;
}

export const revalidate = 0; // always fresh

export default async function ClientPage({ params }: Props) {
  const { token } = await params;
  const isDemo = token === "demo";

  let client, files, messages;

  if (isDemo) {
    client   = DEMO_CLIENT;
    files    = DEMO_FILES;
    messages = DEMO_MESSAGES;
  } else {
    client   = await getClientByToken(token);
    files    = client ? await getFiles(token)    : [];
    messages = client ? await getMessages(token) : [];
  }

  if (!client) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", fontFamily: "var(--font-inter), sans-serif" }}>
        <p style={{ fontSize: "0.75rem", color: "#6B6B80", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.2em", textTransform: "uppercase" }}>404</p>
        <p style={{ fontSize: "1.1rem", color: "#E8E8F0", fontWeight: 600 }}>Espace client introuvable</p>
        <p style={{ fontSize: "0.875rem", color: "#6B6B80" }}>Vérifiez votre lien ou contactez votre prestataire.</p>
      </div>
    );
  }

  return (
    <ClientPortal
      client={client}
      files={files}
      initialMessages={messages}
      isDemo={isDemo}
    />
  );
}
