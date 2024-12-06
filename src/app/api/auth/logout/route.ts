import { prisma } from "@/app/lib";
import { cookies } from "next/headers";
export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const id = searchParams.get("id");

    const delToken = await prisma.userSession.delete({
      where: {
        userId: id as string,
      },
    });

  const del = cookies().delete(process.env.NEXT_PUBLIC_BASE_SESSION_KEY!);
  return new Response(JSON.stringify({ success: true, message: "Logout Berhasil" }), {status: 200});
}

// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//   cookies().set({
//     name: "mySession",
//     value: "",
//     maxAge: 0,
//   });

//   return NextResponse.json({ status: 200, message: "Logout" });
// }
