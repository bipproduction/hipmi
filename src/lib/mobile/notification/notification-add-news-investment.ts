import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../types/type-mobile-notification";
import { sendNotificationMobileToManyUser } from "./send-notification";
import { routeUserMobile } from "../route-page-mobile";
import prisma from "@/lib/prisma";

export const sendNotificationInvestmentAddNews = async ({
  invesmentId,
  senderId,
  title,
}: {
  invesmentId: string;
  senderId: string;
  title: string;
}) => {
  const findInvestor = await prisma.investasi_Invoice.findMany({
    where: {
      investasiId: invesmentId,
      StatusInvoice: {
        name: "Berhasil",
      },
    },
    select: {
      authorId: true,
    },
  });

  console.log("[FIND INVESTOR]", findInvestor);

  // SEND NOTIFICATION
  await sendNotificationMobileToManyUser({
    recipientIds: findInvestor.map((e) => e.authorId!),
    senderId: senderId,
    payload: {
      title: "Berita terbaru" as NotificationMobileTitleType,
      body: `Ada berita yang terupdate pada ${title}` as NotificationMobileBodyType,
      type: "announcement",
      kategoriApp: "INVESTASI",
      deepLink: routeUserMobile.investmentDetailPublish({
        id: invesmentId,
      }),
    },
  });
};
