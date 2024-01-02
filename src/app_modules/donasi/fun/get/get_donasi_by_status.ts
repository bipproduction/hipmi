"use server";

import prisma from "@/app/lib/prisma";

/**
 *
 * @param authorId string
 * @param status string | masukan angka 1 - 4
 * @returns List data donasi by status
 */
export default async function Donasi_getByStatus(
  authorId: string,
  status: string
) {
  if (status === "1") {
    const getReview = await prisma.donasi.findMany({
      where: {
        authorId: authorId,
        donasiMaster_StatusDonasiId: "1",
      },
    });
    return getReview;
  }

  if (status === "2") {
    const getReview = await prisma.donasi.findMany({
      where: {
        authorId: authorId,
        donasiMaster_StatusDonasiId: "2",
      },
    });
    return getReview;
  }

  if (status === "3") {
    const getReview = await prisma.donasi.findMany({
      where: {
        authorId: authorId,
        donasiMaster_StatusDonasiId: "3",
      },
    });
    return getReview;
  }

  if (status === "4") {
    const getReview = await prisma.donasi.findMany({
      where: {
        authorId: authorId,
        donasiMaster_StatusDonasiId: "4",
      },
    });
    return getReview;
  }

  if (status === undefined) {
    return {
      status: 400,
      message: "Not Found",
    };
  }
}
