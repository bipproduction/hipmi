import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import _ from "lodash";

export { POST, GET };

async function POST(request: Request) {
  try {
    const { data } = await request.json();

    const create = await prisma.voting.create({
      data: {
        title: data.title,
        deskripsi: data.deskripsi,
        awalVote: data.awalVote,
        akhirVote: data.akhirVote,
        authorId: data.authorId,
      },
    });

    if (!create)
      return NextResponse.json({
        status: 400,
        message: "Gagal Membuat Vote",
      });

    for (let v of data.listVote) {
      const val = v.value;

      const namaVote = await prisma.voting_DaftarNamaVote.create({
        data: {
          value: val,
          votingId: create.id,
        },
      });

      if (!namaVote)
        return NextResponse.json({
          status: 400,
          message: "Gagal Membuat List",
        });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success create voting",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error create voting",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const authorId = searchParams.get("authorId");

  let fixData;

  try {
    if (category === "beranda") {
      fixData = await prisma.voting.findMany({
        orderBy: {
          awalVote: "asc"
        },
        where: {
          voting_StatusId: "1",
          isArsip: false,
          isActive: true,
          akhirVote: {
            gte: new Date(),
          },
          title: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        include: {
          Voting_DaftarNamaVote: {
            orderBy: {
              createdAt: "asc",
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
    } else if (category === "contribution") {
      const data = await prisma.voting_Kontributor.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          authorId: authorId,
        },
        include: {
          Voting: {
            select: {
              id: true,
              title: true,
              awalVote: true,
              akhirVote: true,
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
          },
        },
      });

      const result = data.map((item) => ({
        contributionId: item.id,
        isActive: item.isActive,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        votingId: item.votingId,
        authorId: item.authorId,
        voting_DaftarNamaVoteId: item.voting_DaftarNamaVoteId,
        id: item.Voting?.id,
        title: item.Voting?.title,
        awalVote: item.Voting?.awalVote,
        akhirVote: item.Voting?.akhirVote,
        Author: item.Voting?.Author,
      }));

      fixData = result;
    } else if (category === "all-history") {
      fixData = await prisma.voting.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          voting_StatusId: "1",
          isActive: true,
          akhirVote: {
            lte: new Date(),
          },
          title: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        include: {
          Voting_DaftarNamaVote: {
            orderBy: {
              createdAt: "asc",
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
    } else if (category === "my-history") {
      fixData = await prisma.voting.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          authorId: authorId as any,
          voting_StatusId: "1",
          isActive: true,
          akhirVote: {
            lte: new Date(),
          },
          title: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        include: {
          Voting_DaftarNamaVote: {
            orderBy: {
              createdAt: "asc",
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
    }

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: fixData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
