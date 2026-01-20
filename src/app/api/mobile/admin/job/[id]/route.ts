import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import _ from "lodash";
import {
  sendNotificationMobileToManyUser,
  sendNotificationMobileToOneUser,
} from "@/lib/mobile/notification/send-notification";
import { routeUserMobile } from "@/lib/mobile/route-page-mobile";
import { NotificationMobileBodyType, NotificationMobileTitleType } from "../../../../../../../types/type-mobile-notification";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const data = await prisma.job.findUnique({
      where: {
        id: id,
      },
      include: {
        Author: {
          select: {
            username: true,
            nomor: true,
            Profile: {
              select: {
                name: true,
                alamat: true,
              },
            },
          },
        },
        MasterStatus: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Success get data job-vacancy",
        data: data,
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

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  const { catatan, senderId } = data;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const fixStatus = _.startCase(status as string);

  let fixData;
  try {
    const checkStatus = await prisma.masterStatus.findFirst({
      where: {
        name: fixStatus,
      },
    });

    if (!checkStatus)
      return NextResponse.json(
        {
          success: false,
          message: "Error update data job-vacancy",
          reason: "Status not found",
        },
        { status: 500 }
      );

    if (fixStatus === "Reject") {
      const updt = await prisma.job.update({
        where: {
          id: id,
        },
        data: {
          masterStatusId: checkStatus.id,
          catatan: catatan,
        },
        select: {
          id: true,
          authorId: true,
          MasterStatus: {
            select: {
              name: true,
            },
          },
          title: true,
        },
      });

      await sendNotificationMobileToOneUser({
        recipientId: updt.authorId as any,
        senderId: senderId,
        payload: {
          title: "Pengajuan Review Ditolak",
          body: "Mohon perbaiki data sesuai catatan penolakan !",
          type: "announcement",
          kategoriApp: "JOB",
          deepLink: routeUserMobile.jobByStatus({ status: "reject" }),
        },
      });

      fixData = updt;
    } else if (fixStatus === "Publish") {
      const updt = await prisma.job.update({
        where: {
          id: id,
        },
        data: {
          masterStatusId: checkStatus.id,
        },
        select: {
          id: true,
          authorId: true,
          MasterStatus: {
            select: {
              name: true,
            },
          },
          title: true,
        },
      });

      await sendNotificationMobileToOneUser({
        recipientId: updt.authorId as any,
        senderId: senderId,
        payload: {
          title: "Review Selesai",
          body: "Selamat data anda telah terpublikasi",
          type: "announcement",
          kategoriApp: "JOB",
          deepLink: routeUserMobile.jobByStatus({ status: "publish" }),
        },
      });

      const adminUsers = await prisma.user.findMany({
        where: { masterUserRoleId: "1", NOT: { id: updt.authorId as any } },
        select: { id: true },
      });

      await sendNotificationMobileToManyUser({
        recipientIds: adminUsers.map((user) => user.id),
        senderId: data.authorId,
        payload: {
          title: "Ada Lowongan Kerja Baru" as NotificationMobileTitleType,
          body: `${updt.title}` as NotificationMobileBodyType,
          type: "announcement",
          deepLink: routeUserMobile.jobDetailPublised({ id: id }),
          kategoriApp: "JOB",
        },
      });

      fixData = updt;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success update data job-vacancy",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error update data job-vacancy",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
