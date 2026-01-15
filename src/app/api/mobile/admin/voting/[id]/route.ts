import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import _ from "lodash";
import {
  sendNotificationMobileToManyUser,
  sendNotificationMobileToOneUser,
} from "@/lib/mobile/notification/send-notification";
import { routeUserMobile } from "@/lib/mobile/route-page-mobile";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../types/type-mobile-notification";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const data = await prisma.voting.findUnique({
      where: {
        id: id,
      },
      include: {
        Author: true,
        Voting_Status: true,
        Voting_DaftarNamaVote: true,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Success get data voting",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR GET DATA VOTING]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data voting",
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

  console.log("catatan", catatan);
  console.log("senderId", senderId);

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const fixStatus = _.startCase(status as string);
  let fixData;

  try {
    const checkStatus = await prisma.voting_Status.findFirst({
      where: {
        name: fixStatus,
      },
    });

    if (!checkStatus)
      return NextResponse.json(
        {
          success: false,
          message: "Error update data voting",
          reason: "Status not found",
        },
        { status: 500 }
      );

    if (fixStatus === "Reject") {
      const updateStatus = await prisma.voting.update({
        where: {
          id: id,
        },
        data: {
          voting_StatusId: checkStatus.id,
          catatan: catatan,
        },
      });

      // SEND NOTIFICATION
      await sendNotificationMobileToOneUser({
        recipientId: updateStatus.authorId as any,
        senderId: senderId,
        payload: {
          title: "Pengajuan Review Ditolak",
          body: "Mohon perbaiki data sesuai catatan penolakan !",
          type: "announcement",
          kategoriApp: "VOTING",
          deepLink: routeUserMobile.votingByStatus({ status: "reject" }),
        },
      });

      fixData = updateStatus;
    } else if (fixStatus === "Publish") {
      const updateStatus = await prisma.voting.update({
        where: {
          id: id,
        },
        data: {
          voting_StatusId: checkStatus.id,
        },
      });

      await sendNotificationMobileToOneUser({
        recipientId: updateStatus.authorId as any,
        senderId: senderId,
        payload: {
          title: "Review Selesai",
          body: "Voting kamu telah dipublikasikan !" as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "VOTING",
          deepLink: routeUserMobile.votingByStatus({ status: "publish" }),
        },
      });

      const adminUsers = await prisma.user.findMany({
        where: {
          masterUserRoleId: "1",
          NOT: { id: updateStatus.authorId as any },
        },
        select: { id: true },
      });

      await sendNotificationMobileToManyUser({
        recipientIds: adminUsers.map((user) => user.id),
        senderId: senderId,
        payload: {
          title: "Cek Voting Baru Terpublikasi" as NotificationMobileTitleType,
          body: `${updateStatus.title}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "VOTING",
          deepLink: routeUserMobile.votingDetailPublised({ id: id }),
        },
      });

      fixData = updateStatus;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success update data voting",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR UPDATE DATA VOTING]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error update data voting",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
