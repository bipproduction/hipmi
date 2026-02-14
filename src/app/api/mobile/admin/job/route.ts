import _ from "lodash";
import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { GET };

async function GET(request: Request, { params }: { params: { name: string } }) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const page = Number(searchParams.get("page")) || 1;
  const takeData = PAGINATION_DEFAULT_TAKE;
  const skipData = page * takeData - takeData;
  let fixData;

  try {
    if (category === "dashboard") {
      const publish = await prisma.job.count({
        where: {
          MasterStatus: {
            name: "Publish",
          },
          isArsip: false,
        },
      });

      const review = await prisma.job.count({
        where: {
          MasterStatus: {
            name: "Review",
          },
          isArsip: false,
        },
      });

      const reject = await prisma.job.count({
        where: {
          MasterStatus: {
            name: "Reject",
          },
          isArsip: false,
        },
      });

      fixData = {
        publish,
        review,
        reject,
      };
    } else {
      const fixToStatus = _.startCase(category || "");
      fixData = await prisma.job.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          isActive: true,
          isArsip: false,
          MasterStatus: {
            name: fixToStatus,
          },
          title: {
            contains: search ? search : "",
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
          Author: true,
        },
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get data job-vacancy dashboard",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get data job-vacancy dashboard",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
