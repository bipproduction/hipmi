import { sendNotificationMobileToManyUser } from "@/lib/mobile/notification/send-notification";
import { routeAdminMobile } from "@/lib/mobile/route-page-mobile";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export { POST, GET };

async function POST(request: Request) {
  try {
    const { data } = await request.json();

    const create = await prisma.job.create({
      data: {
        title: data.title,
        content: data.content,
        deskripsi: data.deskripsi,
        authorId: data.authorId,
        imageId: data.imageId || null,
      },
    });

    // kirim notifikasi ke semua admin untuk mengetahui ada job baru yang harus di review

    const adminUsers = await prisma.user.findMany({
      where: { masterUserRoleId: "2", NOT: { id: data.authorId } },
      select: { id: true },
    });

    await sendNotificationMobileToManyUser({
      recipientIds: adminUsers.map((user) => user.id),
      senderId: data.authorId,
      payload: {
        title: "Pengajuan Review",
        body: "Terdapat pengajuan baru yang perlu direview",
        type: "announcement",
        deepLink: routeAdminMobile.jobByStatus({ status: "review" }),
        kategoriApp: "JOB",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil disimpan",
        data: create,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error create job",
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
    if (category === "archive") {
      const data = await prisma.job.findMany({
        where: {
          authorId: authorId,
          isActive: true,
          isArsip: true,
          MasterStatus: {
            name: "Publish",
          },
          //   title: {
          //     contains: search || "",
          //     mode: "insensitive",
          //   },
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          deskripsi: true,
          authorId: true,
          MasterStatus: {
            select: {
              name: true,
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

      fixData = data;
    } else if (category === "beranda") {
      const data = await prisma.job.findMany({
        where: {
          isActive: true,
          isArsip: false,
          MasterStatus: {
            name: "Publish",
          },
          title: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          deskripsi: true,
          authorId: true,
          MasterStatus: {
            select: {
              name: true,
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

      fixData = data;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get data job-vacancy",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get data job-vacancy",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
