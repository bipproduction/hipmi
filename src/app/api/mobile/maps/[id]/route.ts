import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const data = await prisma.businessMaps.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data pin map",
      data: data,
    });
  } catch (error) {
    console.error("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mendapatkan data pin map",
      reason: (error as Error).message,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { data } = await request.json();

  try {
    let fixData;

    const ceheckData = await prisma.businessMaps.findUnique({
      where: {
        id: id,
      },
    });

    if (!ceheckData) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    if (data.newImageId) {
      const updated = await prisma.businessMaps.update({
        where: {
          id: id,
        },
        data: {
          namePin: data.namePin,
          latitude: data.latitude,
          longitude: data.longitude,
          imageId: data.newImageId,
        },
      });

      if (updated) {
        const deleteImage = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${ceheckData.imageId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );
      }

      fixData = updated;
    } else {
      const updated = await prisma.businessMaps.update({
        where: {
          id: id,
        },
        data: {
          namePin: data.namePin,
          latitude: data.latitude,
          longitude: data.longitude,
        },
      });

      fixData = updated;
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mengupdate data pin map",
      data: data,
    });
  } catch (error) {
    console.error("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mengupdate data pin map",
      reason: (error as Error).message,
    });
  }
}
