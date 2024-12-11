import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get("id");

  // const delToken = await prisma.userSession.delete({
  //   where: {
  //     userId: id as string,
  //   },
  // });

  const del = cookies().delete(process.env.NEXT_PUBLIC_BASE_SESSION_KEY!);
  return NextResponse.json(
    { success: true, message: "Logout Berhasil" },
    { status: 200 }
  );
}
