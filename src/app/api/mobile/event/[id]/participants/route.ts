import { sendNotificationMobileToOneUser } from "@/lib/mobile/notification/send-notification";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../types/type-mobile-notification";
import { routeUserMobile } from "@/lib/mobile/route-page-mobile";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { GET, POST };

async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { userId } = await request.json();

    const createJoin = await prisma.event_Peserta.create({
      data: {
        eventId: id,
        userId: userId,
      },
    });

    const findEvent = await prisma.event.findUnique({
      where: { id: id },
      select: { authorId: true, title: true },
    });

    // SEND NOTIFICATION
    if (userId !== findEvent?.authorId) {
      await sendNotificationMobileToOneUser({
        recipientId: findEvent?.authorId as string,
        senderId: userId,
        payload: {
          title: "Peserta Baru Join" as NotificationMobileTitleType,
          body: `Ada peserta baru dalam event: ${findEvent?.title}` as NotificationMobileBodyType,
          type: "announcement",
          deepLink: routeUserMobile.eventDetailPublised({ id: id }),
          kategoriApp: "EVENT",
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success join event",
        data: createJoin,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error join event",
        reason: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const takeData = PAGINATION_DEFAULT_TAKE
    const skipData = page * takeData - takeData;

    const data = await prisma.event_Peserta.findMany({
      where: {
        eventId: id,
      },
      select: {
        id: true,
        eventId: true,
        userId: true,
        isPresent: true,
        User: {
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
      take: takeData,
      skip: skipData,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get participants",
        data: data,
        meta: {
          page,
          take: takeData,
          total: await prisma.event_Peserta.count({ where: { eventId: id } }),
          totalPages: Math.ceil(await prisma.event_Peserta.count({ where: { eventId: id } }) / takeData),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get participants",
        reason: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
