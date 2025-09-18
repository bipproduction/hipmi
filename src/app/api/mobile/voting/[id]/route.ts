import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, DELETE, PUT, POST };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log("[ID]", id);

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

    console.log("[DELETE LIST VOTE NAME]", deleteListVoteName);

    const deleteData = await prisma.voting.delete({
      where: {
        id: id,
      },
    });

    console.log("[DELETE DATA]", deleteData);

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
  try {
    const { id } = params;
    const { data } = await request.json();

    console.log("[ID]", id);
    console.log("[DATA]", data);

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

    console.log("[UPDATE VOTING]", updateVoting);

    if (!updateVoting)
      return NextResponse.json({ status: 400, message: "Gagal Update" });

    const deleatePrevPilihan = await prisma.voting_DaftarNamaVote.deleteMany({
      where: {
        votingId: id,
      },
    });

    console.log("[DELETE PREV PILIHAN]", deleatePrevPilihan);

    if (!deleatePrevPilihan)
      return NextResponse.json({
        status: 400,
        message: "Gagal Update Pilihan",
      });

    for (let v of data.listVote) {
      console.log("[VOTING LIST >>]", v);
      const namaPilihan = await prisma.voting_DaftarNamaVote.create({
        data: {
          value: v,
          votingId: id,
        },
      });

      console.log("[NAMA PILIHAN]", namaPilihan);

      if (!namaPilihan)
        return NextResponse.json({
          status: 400,
          message: "Gagal Membuat List",
        });
    }

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

async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  console.log("[ID]", id);
  console.log("[CHOOSE ID]", data);

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

    console.log("[UPDATE DATA]", updateData);

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

    console.log("[CREATE KONTRIBUTOR]", createKontributor);

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
