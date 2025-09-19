import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import _ from "lodash";

export { GET, DELETE, PUT, POST };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const data = await prisma.voting.findUnique({
      where: {
        id: id,
      },
      include: {
        Voting_DaftarNamaVote: {
          orderBy: {
            createdAt: "asc",
          },
          where: {
            isActive: true,
          },
        },
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                name: true,
                imageId: true,
              },
            },
          },
        },
      },
    });

    const listNamaVote = data?.Voting_DaftarNamaVote || [];

    for (let v of listNamaVote) {

      const kontributor = await prisma.voting_Kontributor.findMany({
        where: {
          voting_DaftarNamaVoteId: v.id,
        },
      });

      const updateData = await prisma.voting_DaftarNamaVote.update({
        where: {
          id: v.id,
        },
        data: {
          jumlah: kontributor.length,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Success get voting",
      data: data,
    });
  } catch (error) {
    console.log("[ERROR VOTING]", error);
    return NextResponse.json({
      success: false,
      message: "Error get voting",
      reason: (error as Error).message,
    });
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const deleteListVoteName = await prisma.voting_DaftarNamaVote.deleteMany({
      where: {
        votingId: id,
      },
    });

    const deleteData = await prisma.voting.delete({
      where: {
        id: id,
      },
    });


    return NextResponse.json({
      success: true,
      message: "Berhasil menghapus data",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Gagal menghapus data",
      reason: (error as Error).message,
    });
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let fixData;

  try {
    if (category === "edit") {
      const updateVoting = await prisma.voting.update({
        where: {
          id: id,
        },
        data: {
          title: data.title,
          deskripsi: data.deskripsi.trim(),
          awalVote: data.awalVote,
          akhirVote: data.akhirVote,
        },
        select: {
          Voting_DaftarNamaVote: {
            where: {
              isActive: true,
            },
          },
        },
      });

      if (!updateVoting)
        return NextResponse.json({ status: 400, message: "Gagal Update" });

      const deleatePrevPilihan = await prisma.voting_DaftarNamaVote.deleteMany({
        where: {
          votingId: id,
        },
      });

      if (!deleatePrevPilihan)
        return NextResponse.json({
          status: 400,
          message: "Gagal Update Pilihan",
        });

      for (let v of data.listVote) {
        const namaPilihan = await prisma.voting_DaftarNamaVote.create({
          data: {
            value: v,
            votingId: id,
          },
        });

        if (!namaPilihan)
          return NextResponse.json({
            status: 400,
            message: "Gagal Membuat List",
          });
      }
    } else if (category === "archive") {
      const updateVoting = await prisma.voting.update({
        where: {
          id: id,
        },
        data: {
          isArsip: data,
        },
      });


      if (!updateVoting)
        return NextResponse.json({ status: 400, message: "Gagal Update" });
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mengupdate data",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Gagal mengupdate data",
      reason: (error as Error).message,
    });
  }
}

// Voting masuk melalui API ini
async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  try {
    const findData = await prisma.voting_DaftarNamaVote.findFirst({
      where: {
        id: data.chooseId,
      },
      select: {
        jumlah: true,
        value: true,
      },
    });

    if (!findData)
      return NextResponse.json({
        success: false,
        message: "Data tidak ditemukan",
      });

    const updateData = await prisma.voting_DaftarNamaVote.update({
      where: {
        id: data.chooseId,
      },
      data: {
        jumlah: findData.jumlah + 1,
      },
    });


    if (!updateData)
      return NextResponse.json({
        success: false,
        message: "Gagal Update Data",
      });

    const createKontributor = await prisma.voting_Kontributor.create({
      data: {
        votingId: id,
        authorId: data.userId,
        voting_DaftarNamaVoteId: data.chooseId,
      },
      select: {
        Voting: {
          select: {
            id: true,
            title: true,
            authorId: true,
          },
        },
      },
    });

    if (!createKontributor)
      return NextResponse.json({
        success: false,
        message: "Gagal Menjadi Kontributor",
      });

    return NextResponse.json({
      success: true,
      message: "Berhasil Voting",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal menghapus data",
      reason: (error as Error).message,
    });
  }
}
