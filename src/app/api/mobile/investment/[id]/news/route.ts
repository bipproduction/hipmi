import _ from "lodash";
import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export { POST, GET, DELETE };

async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  let fixData;

  console.log("id", id);
  console.log("data", data);

  try {
    if (data && data.imageId) {
      const createWithFile = await prisma.beritaInvestasi.create({
        data: {
          investasiId: id,
          title: _.startCase(data.title),
          deskripsi: data.deskripsi,
          imageId: data.imageId,
        },
      });

      fixData = createWithFile;
    }

    const createWitOutFile = await prisma.beritaInvestasi.create({
      data: {
        investasiId: id,
        title: _.startCase(data.title),
        deskripsi: data.deskripsi,
      },
    });

    fixData = createWitOutFile;

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berita berhasil ditambahkan",
      data: fixData,
    });
  } catch (error) {
    console.log(["ERROR"], error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Gagal menambah berita",
    });
  }
}

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log("id", id);
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let fixData;
  try {
    if (category === "one-news") {
      const data = await prisma.beritaInvestasi.findFirst({
        where: {
          id: id,
        },
        include: {
          investasi: {
            select: {
              authorId: true,
            },
          },
        },
      });

      const authorId = data?.investasi?.authorId;
      const newData = {
        ...data,
        authorId,
      };

      fixData = newData;
    } else if (category === "all-news") {
      fixData = await prisma.beritaInvestasi.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          investasiId: id,
          active: true,
        },
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berita berhasil diambil",
      data: fixData,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Gagal mengambil berita",
    });
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log("id", id);
  try {
    const deleteData = await prisma.beritaInvestasi.delete({
      where: {
        id: id,
      },
    });

    console.log("DELETE", deleteData);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berita berhasil dihapus",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Gagal menghapus berita",
    });
  }
}
