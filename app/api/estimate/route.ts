import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name, email, videoType, duration, complexity,
    deadline, rushes, estimateLow, estimateHigh,
  } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "name and email required" }, { status: 400 });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("MAKE_WEBHOOK_URL not configured — skipping Make call");
    return NextResponse.json({ success: true, skipped: true });
  }

  const payload = {
    // Prospect identity
    name,
    email,
    // Project details
    videoType,
    duration,
    complexity,
    deadline,
    rushes,
    // Estimate
    estimateLow,
    estimateHigh,
    estimateLabel: `${estimateLow.toLocaleString("fr-FR")} – ${estimateHigh.toLocaleString("fr-FR")} €`,
    // Meta
    source: "Calculateur portfolio",
    submittedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Make webhook error:", res.status, await res.text());
      return NextResponse.json({ error: "webhook failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Make webhook fetch error:", err);
    return NextResponse.json({ error: "network error" }, { status: 500 });
  }
}
