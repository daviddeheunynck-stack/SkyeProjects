import { NextRequest, NextResponse } from "next/server";
import { getMessages, addMessage } from "@/lib/notion";

interface Ctx { params: Promise<{ token: string }> }

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { token } = await params;
  const messages = await getMessages(token);
  return NextResponse.json({ messages });
}

export async function POST(req: NextRequest, { params }: Ctx) {
  const { token } = await params;
  const { content } = await req.json();

  if (!content?.trim()) {
    return NextResponse.json({ error: "content required" }, { status: 400 });
  }

  await addMessage(token, content.trim(), "Client");

  // Notify via Make
  const webhook = process.env.MAKE_WEBHOOK_URL;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "client_message",
        token,
        content: content.trim(),
        sentAt: new Date().toISOString(),
      }),
    }).catch(() => {});
  }

  return NextResponse.json({ success: true });
}
