import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, DELETE, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let fixData;

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
        include: {
          Author: true,
          imageDonasi: true,
          CeritaDonasi: true,
          DonasiMaster_Ketegori: true,
          DonasiMaster_Durasi: true,
          DonasiMaster_Status: true,
          Donasi_Invoice: true,
          Donasi_Kabar: true,
          Donasi_PencairanDana: true,
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

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const checkData = await prisma.donasi.findUnique({
      where: {
        id: id,
      },
      include: {
        CeritaDonasi: {
          select: {
            imageId: true,
          },
        },
      },
    });

    const deleteStory = await prisma.donasi_Cerita.delete({
      where: {
        donasiId: id,
      },
    });

    if (!deleteStory)
      return NextResponse.json({
        status: 400,
        success: false,
        reason: "Gagal menghapus data cerita",
      });

    const deleteImageStory = await fetch(
      `https://wibu-storage.wibudev.com/api/files/${checkData?.CeritaDonasi?.imageId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.WS_APIKEY}`,
        },
      }
    );

    if (!deleteImageStory) {
      console.log("[DELETE IMAGE STORY]", deleteImageStory);
    }

    const res = await prisma.donasi.delete({
      where: {
        id: id,
      },
    });

    if (!res)
      return NextResponse.json({
        status: 400,
        success: false,
        reason: "Gagal menghapus donasi",
      });

    const deleteImageDonation = await fetch(
      `https://wibu-storage.wibudev.com/api/files/${checkData?.imageId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.WS_APIKEY}`,
        },
      }
    );

    if (!deleteImageDonation) {
      console.log("[DELETE IMAGE DONATION]", deleteImageDonation);
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Donasi berhasil dihapus",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal menghapus donasi",
      reason: (error as Error).message,
    });
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    if (category === "edit-donation") {
      if (data && data.newImageId) {
        await prisma.donasi.update({
          where: {
            id: id,
          },
          data: {
            imageId: data.newImageId,
          },
        });
      }

      const update = await prisma.donasi.update({
        where: {
          id: id,
        },
        data: {
          donasiMaster_KategoriId: data.donasiMaster_KategoriId,
          donasiMaster_DurasiId: data.donasiMaster_DurasiId,
          title: data.title,
          target: data.target,
        },
      });

      if (!update)
        return NextResponse.json({
          status: 400,
          success: false,
          reason: "Gagal mengupdate donasi",
        });

      const deleteImageDonasi = await fetch(
        `https://wibu-storage.wibudev.com/api/files/${data.imageId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`,
          },
        }
      );

      if (!deleteImageDonasi) {
        console.log("[DELETE IMAGE DONASI]", deleteImageDonasi);
      }

    } else if (category === "edit-story") {

      if (data && data.newImageId) {
        await prisma.donasi_Cerita.update({
          where: {
            donasiId: id,
          },
          data: {
            imageId: data.newImageId,
          },
        });
      }

      const update = await prisma.donasi_Cerita.update({
        where: {
          donasiId: id,
        },
        data: {
          pembukaan: data.pembukaan,
          cerita: data.cerita,
        },
      });

      if (!update)
        return NextResponse.json({
          status: 400,
          success: false,
          reason: "Gagal mengupdate cerita donasi",
        });

      const deleteImageStory = await fetch(
        `https://wibu-storage.wibudev.com/api/files/${data.imageId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`,
          },
        }
      );

      if (!deleteImageStory) {
        console.log("[DELETE IMAGE STORY]", deleteImageStory);
      }
    } else if (category === "edit-bank-account") {
      const update = await prisma.donasi.update({
        where: {
          id: id,
        },
        data: {
          namaBank: data.namaBank,
          rekening: data.rekening,
        },
      });

      if (!update)
        return NextResponse.json({
          status: 400,
          success: false,
          reason: "Gagal mengupdate bank donasi",
        });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Donasi berhasil diupdate",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal mengupdate donasi",
      reason: (error as Error).message,
    });
  }
}
