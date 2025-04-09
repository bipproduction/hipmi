import { cookies } from "next/headers";
import "colors";

export async function GET(req: Request) {
  //  const token = req.headers.get("Authorizationx")?.split(" ")[1];
  const token = cookies().get("hipmi-key")?.value;

  return new Response(token, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
