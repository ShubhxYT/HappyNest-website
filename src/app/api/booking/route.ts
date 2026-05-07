import { promises as fs } from "fs";
import path from "path";

const CSV_PATH = path.join(process.cwd(), "data", "leads.csv");

const CSV_HEADERS = [
  "timestamp",
  "fullName",
  "phone",
  "email",
  "checkIn",
  "checkOut",
  "guests",
  "children",
  "pets",
  "budget",
  "specialRequests",
  "source",
] as const;

function escapeCSV(value: string): string {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    await fs.mkdir(path.dirname(CSV_PATH), { recursive: true });

    let fileExists = false;
    try {
      await fs.access(CSV_PATH);
      fileExists = true;
    } catch {
      // file doesn't exist yet — create it with headers
    }

    if (!fileExists) {
      await fs.writeFile(CSV_PATH, CSV_HEADERS.join(",") + "\n", "utf8");
    }

    const row = CSV_HEADERS.map((h) => escapeCSV(String(body[h] ?? "")));
    await fs.appendFile(CSV_PATH, row.join(",") + "\n", "utf8");

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[booking] CSV write failed:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
