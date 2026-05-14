import { NextRequest, NextResponse } from "next/server";
import { createClientSpace } from "@/lib/notion";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, projectName, deliveryDate } = await req.json();
  if (!name || !email || !projectName) {
    return NextResponse.json({ error: "name, email and projectName required" }, { status: 400 });
  }

  const token = nanoid(24);
  await createClientSpace({ token, name, email, projectName, deliveryDate });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  return NextResponse.json({ token, url: `${baseUrl}/client/${token}` });
}
