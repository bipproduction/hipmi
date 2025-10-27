import _ from "lodash";
import { NextResponse } from "next/server";

export { GET };

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;

  console.log("[CATEGORY]", category);

  let fixData;
  try {
    if (category === "dashboard") {
      const publish = await prisma.donasi.count({
        where: {
          DonasiMaster_Status: {
            name: "Publish",
          },
        },
      });

      const review = await prisma.donasi.count({
        where: {
          DonasiMaster_Status: {
            name: "Review",
          },
        },
      });

      const reject = await prisma.donasi.count({
        where: {
          DonasiMaster_Status: {
            name: "Reject",
          },
        },
      });

      const countCategoryDonation = await prisma.donasiMaster_Kategori.findMany(
        {
          orderBy: {
            createdAt: "asc",
          },
          where: {
            active: true,
          },
        }
      );

      const categoryDonation = countCategoryDonation.length;

      fixData = {
        publish,
        review,
        reject,
        categoryDonation,
      };
    } else {
      const fixCategory = _.startCase(category || "");

      const checkStatus = await prisma.donasiMaster_StatusDonasi.findFirst({
        where: {
          name: fixCategory,
        },
      });

      console.log("[STATUS]", checkStatus);

      if (!checkStatus) {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to get data donation",
            reason: "Status not found",
          },
          { status: 500 }
        );
      }

      fixData = await prisma.donasi.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          DonasiMaster_Status: {
            name: checkStatus.name,
          },
          active: true,
          title: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
          Author: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      console.log("[LIST]", fixData);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Success get data donation ${category}`,
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error get data donation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get data donation",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
