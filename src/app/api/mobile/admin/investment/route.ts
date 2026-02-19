import _ from "lodash";
import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { GET };

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = PAGINATION_DEFAULT_TAKE;
  const skipData = Number(page) * takeData - takeData;

  let fixData;
  try {
    if (category === "dashboard") {
      const publish = await prisma.investasi.count({
        where: {
          MasterStatusInvestasi: {
            name: "Publish",
          },
        },
      });

      const review = await prisma.investasi.count({
        where: {
          MasterStatusInvestasi: {
            name: "Review",
          },
        },
      });

      const reject = await prisma.investasi.count({
        where: {
          MasterStatusInvestasi: {
            name: "Reject",
          },
        },
      });

      fixData = {
        publish,
        review,
        reject,
      };
    } else {
      const fixCategoryToStatus = _.startCase(category || "");

      const data = await prisma.investasi.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          active: true,
          MasterStatusInvestasi: {
            name: fixCategoryToStatus,
          },
          title: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
          targetDana: true,
          MasterPencarianInvestor: {
            select: {
              name: true,
            },
          },
          author: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      fixData = data;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get data investment",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR GET DATA INVESTMENT]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data investment",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
