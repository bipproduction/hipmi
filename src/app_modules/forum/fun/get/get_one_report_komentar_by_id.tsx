"use server";

import prisma from "@/lib/prisma";
import _ from "lodash";
import { MODEL_FORUM_KOMENTAR } from "../../model/interface";
import { group } from "console";

export default async function forum_funGetOneReportKomentarById({
  komentarId,
}: {
  komentarId: string;
}) {
  const data = await prisma.forum_Komentar.findFirst({
    where: {
      id: komentarId,
    },
    select: {
      id: true,
      komentar: true,
      Forum_Posting: {
        select: {
          id: true,
          diskusi: true,
          Author: {
            select: {
              username: true,
            },
          },
        },
      },

      Forum_ReportKomentar: {
        select: {
          deskripsi: true,
          ForumMaster_KategoriReport: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });

  const group = _.groupBy(
    data?.Forum_ReportKomentar,
    (v) => v.ForumMaster_KategoriReport?.title
  );

  const getKey = _.keys(group);
  const filterGroup = getKey.map((e) => e.replace("undefined", "Lainnya"));

  const allData = {
    data: data,
    list: filterGroup,
  };

  return allData;
}
