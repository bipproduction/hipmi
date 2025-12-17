import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import _ from "lodash";

export { POST, GET, PUT, DELETE };

async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { data } = await request.json();


  try {
    if (data && data?.imageId) {
      const createWithFile = await prisma.donasi_Kabar.create({
        data: {
          title: data.title,
          deskripsi: data.deskripsi,
          donasiId: id,
          imageId: data.imageId,
        },
      });

      if (!createWithFile)
        return NextResponse.json({ status: 400, message: "Gagal disimpan" });
    } else {
      const create = await prisma.donasi_Kabar.create({
        data: {
          title: data.title,
          deskripsi: data.deskripsi,
          donasiId: id,
        },
      });

      if (!create)
        return NextResponse.json({ status: 400, message: "Gagal disimpan" });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil membuat kabar",
    });
  } catch (error) {
    console.error("[ERROR CREATE NEWS]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Create Donation News",
      reason: (error as Error).message,
    });
  }
}

async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let fixData;

  try {
    if (category === "get-all") {
      fixData = await prisma.donasi_Kabar.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          donasiId: id,
          active: true,
        },
        select: {
          id: true,
          title: true,
          deskripsi: true,
          createdAt: true,
        },
      });
    } else if (category === "get-one") {
      const data = await prisma.donasi_Kabar.findUnique({
        where: {
          id: id,
        },
        include: {
          Donasi: {
            select: {
              authorId: true,
            },
          },
        },
      });

      const authorId = data?.Donasi?.authorId;

      fixData = {
        ..._.omit(data, ["Donasi"]),
        authorId: authorId,
      };
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mengambil kabar",
      data: fixData,
    });
  } catch (error) {
    console.error("[ERROR GET NEWS]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Get Donation News",
      reason: (error as Error).message,
    });
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  try {
    if (data && data.newImageId) {
      const updateWithImage = await prisma.donasi_Kabar.update({
        where: {
          id: id,
        },
        data: {
          title: data.title,
          deskripsi: data.deskripsi,
          imageId: data.newImageId,
        },
      });

      if (!updateWithImage)
        return NextResponse.json({
          status: 400,
          success: false,
          message: "Gagal Update",
        });
    } else {
      const updateData = await prisma.donasi_Kabar.update({
        where: {
          id: id,
        },
        data: {
          title: data.title,
          deskripsi: data.deskripsi,
        },
      });

      if (!updateData)
        return NextResponse.json({
          status: 400,
          success: false,
          message: "Gagal Update",
        });
    }
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Update",
    });
  } catch (error) {
    console.error("[ERROR UPDATE NEWS]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Update Donation News",
      reason: (error as Error).message,
    });
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deleteData = await prisma.donasi_Kabar.delete({
      where: {
        id: id,
      },
      select: {
        imageId: true,
      },
    });

    const deleteImage = await fetch(
      `https://wibu-storage.wibudev.com/api/files/${deleteData?.imageId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.WS_APIKEY}`,
        },
      }
    );

    if (!deleteImage) {
      console.log("[FAILED DELETE IMAGE]", deleteImage);
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Delete",
    });
  } catch (error) {
    console.error("[ERROR DELETE NEWS]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Delete Donation News",
      reason: (error as Error).message,
    });
  }
}
