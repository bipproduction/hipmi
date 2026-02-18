import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { GET };

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const fixToStatus = _.startCase(category || "");

  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = PAGINATION_DEFAULT_TAKE;
  const skipData = Number(page) * takeData - takeData;
  let fixData;

  try {
    if (category === "dashboard") {
      const publish = await prisma.voting.count({
        where: {
          Voting_Status: {
            name: "Publish",
          },
          isActive: true,
          isArsip: false,
          akhirVote: {
            gte: new Date(),
          },
        },
      });

      const review = await prisma.voting.count({
        where: {
          Voting_Status: {
            name: "Review",
          },
          isActive: true,
          isArsip: false,
          akhirVote: {
            gte: new Date(),
          },
        },
      });

      const reject = await prisma.voting.count({
        where: {
          Voting_Status: {
            name: "Reject",
          },
          isActive: true,
          isArsip: false,
          akhirVote: {
            gte: new Date(),
          },
        },
      });

      const history = await prisma.voting.count({
        where: {
          Voting_Status: {
            name: "Publish",
          },
          isActive: true,
          isArsip: false,
          akhirVote: {
            lte: new Date(),
          },
        },
      });

      fixData = {
        publish,
        review,
        reject,
        history,
      };
    } else if (category === "history") {
      fixData = await prisma.voting.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          Voting_Status: {
            name: "Publish",
          },
          isActive: true,
          isArsip: false,
          akhirVote: {
            lte: new Date(),
          },
          title: {
            contains: search ? search : "",
            mode: "insensitive",
          },
        },
        include: {
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          Voting_Kontributor: true,
          Voting_DaftarNamaVote: true,
        },
      });
    } else {
      // ====== Status Publish Start ====== //
      if (fixToStatus === "Publish") {
        const getAllData = await prisma.voting.findMany({
          where: {
            Voting_Status: {
              name: "Publish",
            },
            isActive: true,
            isArsip: false,
            akhirVote: {
              gte: new Date(),
            },
          },
        });

        for (let i of getAllData) {
          if (moment(i.akhirVote).diff(moment(), "minutes") < 0) {
            await prisma.voting.update({
              where: {
                id: i.id,
              },
              data: {
                isArsip: true,
              },
            });
          }
        }

        const data = await prisma.voting.findMany({
          take: page ? takeData : undefined,
          skip: page ? skipData : undefined,
          orderBy: {
            createdAt: "desc",
          },
          where: {
            Voting_Status: {
              name: "Publish",
            },
            isActive: true,
            title: {
              contains: search ? search : "",
              mode: "insensitive",
            },
            akhirVote: {
              gte: new Date(),
            },
            isArsip: false,
          },
          include: {
            Author: {
              select: {
                id: true,
                username: true,
                Profile: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            Voting_Kontributor: true,
            Voting_DaftarNamaVote: true,
          },
        });

        fixData = data;

        // ====== Status Publish End ====== //
      } else {
        // ====== Status Other Start ====== //
        const data = await prisma.voting.findMany({
          take: page ? takeData : undefined,
          skip: page ? skipData : undefined,
          orderBy: {
            createdAt: "desc",
          },
          where: {
            Voting_Status: {
              name: fixToStatus,
            },
            isActive: true,
            title: {
              contains: search ? search : "",
              mode: "insensitive",
            },
            isArsip: false,
          },
          include: {
            Author: {
              select: {
                id: true,
                username: true,
                Profile: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            Voting_Kontributor: true,
            Voting_DaftarNamaVote: true,
          },
        });

        fixData = data;

        // ====== Status Other End ====== //
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Success get data voting ${category}`,
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`[ERROR GET DATA VOTING: ${category}]`, error);
    return NextResponse.json(
      {
        success: false,
        message: `Error get data voting ${category}`,
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
