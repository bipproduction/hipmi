"use server";

import prisma from "@/app/lib/prisma";

/**
 * 
 * @param statusId | string > 1 - 4
 * @returns jumlah dari donasi per status
 */
export default async function AdminEvent_funCountByStatusId(statusId: string) {
    if (statusId === "1") {
        const count = await prisma.event.count({
          where: {
            eventMaster_StatusId: "1",
            isArsip: false
          },
        });
        return count;
      }
  if (statusId === "2") {
    const count = await prisma.event.count({
      where: {
        eventMaster_StatusId: "2",
      },
    });
    return count;
  }
  if (statusId === "3") {
    const count = await prisma.event.count({
      where: {
        eventMaster_StatusId: "3",
      },
    });
    return count;
  }
  if (statusId === "4") {
    const count = await prisma.event.count({
      where: {
        eventMaster_StatusId: "4",
      },
    });
    return count;
  }
  if (statusId === undefined || statusId === null) {
    
    return {
        status: 400,
        message: "Parameter tidak sesuai"
    }
  }
}
