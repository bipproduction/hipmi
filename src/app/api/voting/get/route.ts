import { prisma } from "@/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    let fixData;

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const kategori = searchParams.get("kategori");
    const status = searchParams.get("status");
    const page = searchParams.get("page");

    const takeData = 5;
    const skipData = Number(page) * 5 - 5;

    const userLoginId = await funGetUserIdByToken();

    if (userLoginId == null) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mendapatkan data, user id tidak ada",
        },
        { status: 500 }
      );
    }

    if (kategori == "beranda" && search != null && search != "") {
      fixData = await prisma.voting.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          voting_StatusId: "1",
          isArsip: false,
          isActive: true,
          akhirVote: {
            gte: new Date(),
          },
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          deskripsi: true,
          awalVote: true,
          akhirVote: true,
          catatan: true,
          authorId: true,
          voting_StatusId: true,
          Voting_DaftarNamaVote: {
            orderBy: {
              createdAt: "asc",
            },
            include: {
              Voting_Kontributor: {
                include: {
                  Author: true,
                },
              },
            },
          },
          Author: {
            select: {
              id: true,
              username: true,
              nomor: true,
              Profile: true,
            },
          },
        },
      });
    } else if (kategori == "beranda") {
      fixData = await prisma.voting.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          voting_StatusId: "1",
          isArsip: false,
          isActive: true,
          akhirVote: {
            gte: new Date(),
          },
          title: {
            // contains: search,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          deskripsi: true,
          awalVote: true,
          akhirVote: true,
          catatan: true,
          authorId: true,
          voting_StatusId: true,
          Voting_DaftarNamaVote: {
            orderBy: {
              createdAt: "asc",
            },
            include: {
              Voting_Kontributor: {
                include: {
                  Author: true,
                },
              },
            },
          },
          Author: {
            select: {
              id: true,
              username: true,
              nomor: true,
              Profile: true,
            },
          },
        },
      });
    } else if (kategori == "status" && status == "1") {
      fixData = await prisma.voting.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          voting_StatusId: status,
          authorId: userLoginId as string,
          isActive: true,
          akhirVote: {
            gte: new Date(),
          },
        },
        include: {
          Voting_DaftarNamaVote: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    } else if (kategori == "status" && status != "1") {
      fixData = await prisma.voting.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          voting_StatusId: status,
          authorId: userLoginId as string,
          isActive: true,
        },
      });
    } else if (kategori == "kontribusi") {
      fixData = await prisma.voting_Kontributor.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          authorId: userLoginId,
        },
        select: {
          id: true,
          Voting: {
            select: {
              id: true,
              title: true,
              isActive: true,
              awalVote: true,
              akhirVote: true,
              Voting_DaftarNamaVote: {
                orderBy: {
                  createdAt: "asc",
                },
              },
              Author: {
                select: {
                  Profile: true,
                },
              },
            },
          },
          Voting_DaftarNamaVote: true,
          Author: true,
        },
      });
    } else if (kategori == "riwayat" && status == "1") {
      fixData = await prisma.voting.findMany({
        take: takeData,
        skip: skipData,

        orderBy: {
          createdAt: "asc",
        },
        where: {
          voting_StatusId: "1",
          isActive: true,
          akhirVote: {
            lte: new Date(),
          },
        },
        select: {
          id: true,
          title: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          deskripsi: true,
          awalVote: true,
          akhirVote: true,
          catatan: true,
          authorId: true,
          voting_StatusId: true,
          Voting_DaftarNamaVote: {
            orderBy: {
              createdAt: "asc",
            },
          },
          Author: {
            select: {
              id: true,
              username: true,
              nomor: true,
              Profile: true,
            },
          },
        },
      });
    } else if (kategori == "riwayat" && status == "2") {
      fixData = await prisma.voting.findMany({
        take: takeData,
        skip: skipData,

        orderBy: {
          createdAt: "asc",
        },
        where: {
          voting_StatusId: "1",
          authorId: userLoginId as string,
          isActive: true,
          akhirVote: {
            lte: new Date(),
          },
        },
        select: {
          id: true,
          title: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          deskripsi: true,
          awalVote: true,
          akhirVote: true,
          catatan: true,
          authorId: true,
          voting_StatusId: true,
          Voting_DaftarNamaVote: {
            orderBy: {
              createdAt: "asc",
            },
          },
          Author: {
            select: {
              id: true,
              username: true,
              nomor: true,
              Profile: true,
            },
          },
        },
      });
    }

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get voting: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
