"use server";

import prisma from "@/lib/prisma";

export async function AdminVote_getListTableByStatusId(statusId: string) {
  if (statusId === "0") {
    const getData = await prisma.voting.findMany({
      where: {
        voting_StatusId: "1",
        isActive: true,
        akhirVote: {
          lte: new Date(),
        },
      },
      select: {
        id: true,
        title: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deskripsi: true,
        awalVote: true,
        akhirVote: true,
        catatan: true,
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        voting_StatusId: true,
        Voting_DaftarNamaVote: true,
      },
    });

    return getData;
  }

  if (statusId === "1") {
    const getData = await prisma.voting.findMany({
      where: {
        voting_StatusId: "1",
        isActive: true,
        akhirVote: {
          gte: new Date(),
        },
      },
      select: {
        id: true,
        title: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deskripsi: true,
        awalVote: true,
        akhirVote: true,
        catatan: true,
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        voting_StatusId: true,
        Voting_DaftarNamaVote: true,
      },
    });

    return getData;
  }

  if (statusId === "2") {
    const getData = await prisma.voting.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        voting_StatusId: "2",
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deskripsi: true,
        awalVote: true,
        akhirVote: true,
        catatan: true,
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        voting_StatusId: true,
        Voting_DaftarNamaVote: true,
      },
    });

    return getData;
  }

  if (statusId === "4") {
    const getData = await prisma.voting.findMany({
      where: {
        voting_StatusId: "4",
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deskripsi: true,
        awalVote: true,
        akhirVote: true,
        catatan: true,
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        voting_StatusId: true,
        Voting_DaftarNamaVote: true,
      },
    });

    return getData;
  }
}
