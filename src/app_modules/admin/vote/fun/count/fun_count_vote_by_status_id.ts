"use server";

import prisma from "@/lib/prisma";

/**
 *
 * @param statusId 0: Riwayat , 1: Publish, 2:Review, 4:Reject
 * @type string
 * @returns jumlah dari voting per status
 */
export default async function AdminVote_funCountByStatusId(statusId: string) {
  if (statusId === "0") {
    const count = await prisma.voting.count({
      where: {
        voting_StatusId: "1",
        isActive: true,
        akhirVote: {
          lte: new Date(),
        },
      },
    });
    return count;
  }
  if (statusId === "1") {
    const count = await prisma.voting.count({
      where: {
        voting_StatusId: "1",
        akhirVote: {
          gte: new Date(),
        },
      },
    });
    return count;
  }
  if (statusId === "2") {
    const count = await prisma.voting.count({
      where: {
        voting_StatusId: "2",
        // akhirVote: {
        //   gte: new Date(),
        // },
      },
    });
    return count;
  }

  if (statusId === "4") {
    const count = await prisma.voting.count({
      where: {
        voting_StatusId: "4",
        isActive: true,

        // akhirVote: {
        //   gte: new Date(),
        // },
      },
    });
    return count;
  }


  if (statusId === undefined || statusId === null) {
    return {
      status: 400,
      message: "Parameter tidak sesuai",
    };
  }
}
