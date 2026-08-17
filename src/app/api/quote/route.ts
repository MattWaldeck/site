import { NextResponse } from "next/server";

type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  serviceType: string;
  loadType?: string;
  urgency: string;
  message?: string;
};

function isValid(body: unknown): body is QuotePayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const required = ["name", "email", "phone", "pickup", "dropoff", "serviceType", "urgency"];
  const hasRequired = required.every(
    (key) => typeof b[key] === "string" && (b[key] as string).trim().length > 0,
  );
  return hasRequired && /\S+@\S+\.\S+/.test(b.email as string);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Please fill in all required fields with a valid email address." },
      { status: 400 },
    );
  }

  // No database or email provider is wired up yet — this just confirms the
  // submission was received. Next step when ready: persist to Postgres
  // (e.g. Neon or Supabase) and/or send via a transactional email API
  // (e.g. Resend), keyed off env vars set in Vercel.
  console.log("[quote request]", {
    ...body,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
