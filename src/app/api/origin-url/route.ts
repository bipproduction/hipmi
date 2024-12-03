import { headers } from "next/headers";
export async function GET(req: Request) {
  const origin = new URL(req.url).origin;

  return new Response(JSON.stringify({ success: true, origin }));
}
