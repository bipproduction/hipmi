import { cookies } from "next/headers";
export async function GET() {
  const del = cookies().delete(process.env.NEXT_PUBLIC_BASE_SESSION_KEY!);
  return new Response(JSON.stringify({ success: true }));
}
