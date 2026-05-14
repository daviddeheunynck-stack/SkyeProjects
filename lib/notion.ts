import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const DB = {
  clients:  process.env.NOTION_CLIENTS_DB  ?? "",
  files:    process.env.NOTION_FILES_DB    ?? "",
  messages: process.env.NOTION_MESSAGES_DB ?? "",
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ClientData {
  token: string;
  name: string;
  email: string;
  projectName: string;
  status: string;
  progress: number;
  deliveryDate: string | null;
  freelanceMessage: string;
  frameioUrl: string | null;
  figmaUrl:   string | null;
  notionUrl:  string | null;
}

export interface FileItem {
  id: string;
  name: string;
  url: string;
  type: "Livrable" | "Facture" | "Contrat" | "Archive";
  date: string;
  size: string;
}

export interface Message {
  id: string;
  content: string;
  author: "Client" | "Monteur";
  date: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function txt(prop: any): string {
  return prop?.rich_text?.[0]?.plain_text ?? prop?.title?.[0]?.plain_text ?? "";
}

// ─── Queries (Notion client v5 — databases are now "dataSources") ─────────────

export async function getClientByToken(token: string): Promise<ClientData | null> {
  if (!DB.clients) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await (notion.dataSources as any).query({
    data_source_id: DB.clients,
    filter: { property: "Token", rich_text: { equals: token } },
  });

  if (!res.results.length) return null;
  const p = (res.results[0] as any).properties;

  return {
    token,
    name:             txt(p.Nom),
    email:            p.Email?.email ?? "",
    projectName:      txt(p.Projet),
    status:           p.Statut?.select?.name ?? "En cours",
    progress:         p.Avancement?.number ?? 0,
    deliveryDate:     p.Livraison?.date?.start ?? null,
    freelanceMessage: txt(p["Message freelance"]),
    frameioUrl:       p["Frame.io"]?.url ?? null,
    figmaUrl:         p.Figma?.url ?? null,
    notionUrl:        p.Notion?.url ?? null,
  };
}

export async function getFiles(token: string): Promise<FileItem[]> {
  if (!DB.files) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await (notion.dataSources as any).query({
    data_source_id: DB.files,
    filter: { property: "Token", rich_text: { equals: token } },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return res.results.map((page: any) => ({
    id:   page.id,
    name: txt(page.properties.Nom),
    url:  page.properties.URL?.url ?? "#",
    type: page.properties.Type?.select?.name ?? "Livrable",
    date: page.properties.Date?.date?.start ?? page.created_time,
    size: txt(page.properties.Taille),
  }));
}

export async function getMessages(token: string): Promise<Message[]> {
  if (!DB.messages) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await (notion.dataSources as any).query({
    data_source_id: DB.messages,
    filter: { property: "Token", rich_text: { equals: token } },
    sorts: [{ timestamp: "created_time", direction: "ascending" }],
  });

  return res.results.map((page: any) => ({
    id:      page.id,
    content: txt(page.properties.Contenu),
    author:  page.properties.Auteur?.select?.name ?? "Client",
    date:    page.created_time,
  }));
}

export async function addMessage(
  token: string,
  content: string,
  author: "Client" | "Monteur"
): Promise<void> {
  if (!DB.messages) return;

  await notion.pages.create({
    parent: { database_id: DB.messages } as any,
    properties: {
      Contenu: { title:     [{ text: { content } }] },
      Token:   { rich_text: [{ text: { content: token } }] },
      Auteur:  { select: { name: author } },
    } as any,
  });
}

export async function createClientSpace(data: {
  token: string;
  name: string;
  email: string;
  projectName: string;
  deliveryDate?: string;
}): Promise<void> {
  if (!DB.clients) throw new Error("NOTION_CLIENTS_DB not configured");

  await notion.pages.create({
    parent: { database_id: DB.clients } as any,
    properties: {
      Token:      { rich_text: [{ text: { content: data.token } }] },
      Nom:        { rich_text: [{ text: { content: data.name } }] },
      Email:      { email: data.email },
      Projet:     { rich_text: [{ text: { content: data.projectName } }] },
      Statut:     { select: { name: "Brief" } },
      Avancement: { number: 0 },
      ...(data.deliveryDate
        ? { Livraison: { date: { start: data.deliveryDate } } }
        : {}),
    } as any,
  });
}
