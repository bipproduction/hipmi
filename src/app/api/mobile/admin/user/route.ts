import { prisma } from "@/lib";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";
import { NextResponse } from "next/server";

export { GET };

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page"));
  const takeData = PAGINATION_DEFAULT_TAKE;
  const skipData = page * takeData - takeData;

  console.log("SEARCH", search);
  console.log("PAGE", page);

  let fixData;
  try {
    if (category === "only-user") {
      fixData = await prisma.user.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          masterUserRoleId: "1",
          username: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
      });
    } else if (category === "only-admin") {
      fixData = await prisma.user.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          masterUserRoleId: "2",
          username: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
      });
    } else if (category === "all-role") {
      fixData = await prisma.user.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          OR: [
            {
              masterUserRoleId: "1",
            },
            {
              masterUserRoleId: "2",
            },
          ],
          username: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Success get data user access",
      data: fixData,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error get data user access",
      reason: (error as Error).message,
    });
  }
}
