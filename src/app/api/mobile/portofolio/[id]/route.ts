import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET, DELETE, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const data = await prisma.portofolio.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        id_Portofolio: true,
        namaBisnis: true,
        alamatKantor: true,
        tlpn: true,
        deskripsi: true,
        logoId: true,
        masterBidangBisnisId: true,
        Profile: {
          select: {
            id: true,
            userId: true,
          },
        },
        MasterBidangBisnis: {
          select: {
            id: true,
            name: true,
            active: true,
          },
        },
        Portofolio_MediaSosial: {
          select: {
            id: true,
            facebook: true,
            instagram: true,
            tiktok: true,
            twitter: true,
            youtube: true,
          },
        },
        Portofolio_BidangDanSubBidangBisnis: {
          select: {
            id: true,
            MasterSubBidangBisnis: {
              select: {
                id: true,
                name: true,
                masterBidangBisnisId: true,
              },
            },
          },
        },
        BusinessMaps: {
          select: {
            id: true,
            namePin: true,
            latitude: true,
            longitude: true,
            imageId: true,
            pinId: true,
          },
        },
      },
    });

    if (!data)
      return NextResponse.json(
        {
          success: false,
          message: "Data tidak ditemukan",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "API Error Get Data Potofolio",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const data = await prisma.portofolio.findUnique({
      where: {
        id: id,
      },
      include: {
        BusinessMaps: {
          select: {
            id: true,
            pinId: true,
            imageId: true,
          },
        },
      },
    });

    try {
      if (data?.logoId != null) {
        const id = data?.logoId;
        const deleteLogo = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${id}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );

        if (deleteLogo.ok) {
          console.log("Success delete logo");
        }
      }

      if (data?.BusinessMaps) {
        const pinId = data?.BusinessMaps?.pinId;

        if (pinId) {
          const deletePin = await fetch(
            `https://wibu-storage.wibudev.com/api/files/${pinId}/delete`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${process.env.WS_APIKEY}`,
              },
            }
          );

          if (deletePin.ok) {
            console.log(`Success delete business map pin`);
          }
        }

        const mapImageId = data?.BusinessMaps?.imageId;

        if (mapImageId) {
          const deleteImage = await fetch(
            `https://wibu-storage.wibudev.com/api/files/${mapImageId}/delete`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${process.env.WS_APIKEY}`,
              },
            }
          );

          if (deleteImage.ok) {
            console.log(`Success delete business map image `);
          }
        }
      }

      const deletePortoMedsos = await prisma.portofolio_MediaSosial.delete({
        where: {
          portofolioId: id,
        },
      });

      const deleteMap = await prisma.businessMaps.delete({
        where: {
          portofolioId: id,
        },
      });

      const deletePortofolio = await prisma.portofolio.delete({
        where: {
          id: id,
        },
      });

    } catch (error) {
      console.error("Error delete logo", error);
    }

    return NextResponse.json(
      { success: true, message: "Berhasil menghapus data" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data, coba lagi nanti (error: 500)",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { data } = await request.json();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let message;

    if (category === "detail") {
      const checkData = await prisma.portofolio.findUnique({
        where: { id },
        include: {
          Portofolio_BidangDanSubBidangBisnis: true,
        },
      });

      if (!checkData) {
        return NextResponse.json({
          success: false,
          message: "Data tidak ditemukan",
        });
      }

      const updateDetail = await prisma.portofolio.update({
        where: { id },
        data: {
          namaBisnis: data.namaBisnis,
          alamatKantor: data.alamatKantor,
          tlpn: data.tlpn,
          deskripsi: data.deskripsi,
          masterBidangBisnisId: data.masterBidangBisnisId,
        },
      });

      if (!updateDetail) {
        return NextResponse.json({
          success: false,
          message: "Gagal mengupdate detail portofolio",
        });
      }

      const bidangBerubah =
        checkData.masterBidangBisnisId !== data.masterBidangBisnisId;

      if (bidangBerubah) {
        // Bidang berubah → hapus semua sub bidang lama
        await prisma.portofolio_BidangDanSubBidangBisnis.deleteMany({
          where: { portofolioId: id },
        });

        // Tambahkan sub bidang baru
        for (const sub of data.subBidang) {
          await prisma.portofolio_BidangDanSubBidangBisnis.create({
            data: {
              portofolioId: id,
              masterBidangBisnisId: data.masterBidangBisnisId,
              masterSubBidangBisnisId: sub.MasterSubBidangBisnis.id,
            },
          });
        }
      } else {
        // Bidang tidak berubah → sinkronisasi sub bidang

        const existingSub = checkData.Portofolio_BidangDanSubBidangBisnis;

        const incomingIds = data.subBidang.map(
          (sub: any) => sub.MasterSubBidangBisnis.id
        );

        const existingIds = existingSub.map(
          (item) => item.masterSubBidangBisnisId
        );

        // 1. Hapus sub bidang yang sudah tidak dipilih
        const toDelete = existingSub.filter(
          (item) => !incomingIds.includes(item.masterSubBidangBisnisId)
        );

        await prisma.portofolio_BidangDanSubBidangBisnis.deleteMany({
          where: {
            id: {
              in: toDelete.map((item) => item.id),
            },
          },
        });

        // 2. Tambahkan sub bidang baru yang belum ada di DB
        const toCreate = data.subBidang.filter(
          (sub: any) => !existingIds.includes(sub.MasterSubBidangBisnis.id)
        );

        for (const sub of toCreate) {
          await prisma.portofolio_BidangDanSubBidangBisnis.create({
            data: {
              portofolioId: id,
              masterBidangBisnisId: data.masterBidangBisnisId,
              masterSubBidangBisnisId: sub.MasterSubBidangBisnis.id,
            },
          });
        }
      }

      message = "Berhasil mengupdate detail portofolio";
    } else if (category === "medsos") {
      const updateMedsos = await prisma.portofolio_MediaSosial.update({
        where: { portofolioId: id },
        data: {
          facebook: data.facebook,
          instagram: data.instagram,
          tiktok: data.tiktok,
          twitter: data.twitter,
          youtube: data.youtube,
        },
      });

      if (!updateMedsos) {
        return NextResponse.json({
          success: false,
          message: "Gagal mengupdate medsos portofolio",
        });
      }
      message = "Berhasil mengupdate medsos portofolio";
    } else if (category === "logo") {
      const updateLogo = await prisma.portofolio.update({
        where: { id },
        data: {
          logoId: data.fileId,
        },
      });
      if (!updateLogo) {
        return NextResponse.json({
          success: false,
          message: "Gagal mengupdate logo portofolio",
        });
      }
      message = "Berhasil mengupdate logo portofolio";
    }

    return NextResponse.json(
      {
        success: true,
        message: message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error update data portofolio", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengupdate data, coba lagi nanti (error: 500)",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
