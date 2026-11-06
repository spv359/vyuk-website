import { discoveryRequests } from "../../../db/schema";
import { getDb } from "../../../db";

const DATA_LANDSCAPES = new Set([
  "erp-crm",
  "spreadsheets",
  "documents",
  "team-knowledge",
  "multiple",
  "not-sure",
  "discuss",
]);

type DiscoveryPayload = {
  fullName?: unknown;
  workEmail?: unknown;
  company?: unknown;
  workflow?: unknown;
  dataLandscape?: unknown;
  website?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as DiscoveryPayload;

    // Silently accept bot submissions caught by the hidden honeypot field.
    if (cleanText(payload.website, 200)) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const fullName = cleanText(payload.fullName, 100);
    const workEmail = cleanText(payload.workEmail, 180).toLowerCase();
    const company = cleanText(payload.company, 160);
    const workflow = cleanText(payload.workflow, 1600);
    const requestedLandscape = cleanText(payload.dataLandscape, 40);
    const dataLandscape = DATA_LANDSCAPES.has(requestedLandscape)
      ? requestedLandscape
      : null;

    if (!fullName || !workEmail || !company || !workflow) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      return Response.json(
        { error: "Please enter a valid work email." },
        { status: 400 }
      );
    }

    const db = getDb();
    await db.insert(discoveryRequests).values({
      fullName,
      workEmail,
      company,
      workflow,
      dataLandscape,
    });

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Discovery request submission failed", error);
    return Response.json(
      { error: "We could not send your request. Please try again." },
      { status: 500 }
    );
  }
}
