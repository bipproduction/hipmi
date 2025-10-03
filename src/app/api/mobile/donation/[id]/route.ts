import { NextResponse } from "next/server";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let fixData;

  console.log("[ID]", id);
  console.log("[CATEGORY]", category);

  try {
    if (category === "temporary") {
      fixData = await prisma.donasi_TemporaryCreate.findUnique({
        where: {
          id: id,
        },
      });
    } else if (category === "permanent") {
      fixData = await prisma.donasi.findUnique({
        where: {
          id: id,
        },
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Data donasi berhasil diambil",
      data: fixData,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal mengambil data donasi",
      reason: (error as Error).message,
    });
  }
}
