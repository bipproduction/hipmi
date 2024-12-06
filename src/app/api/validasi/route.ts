export async function GET(req: Request) {
  const auth = req.headers.get("Authorization");
  const token = auth?.split(" ")[1];
  if (!token)
    return new Response(JSON.stringify({ success: false }), { status: 401 });
  return new Response(JSON.stringify({ success: true }));
}
