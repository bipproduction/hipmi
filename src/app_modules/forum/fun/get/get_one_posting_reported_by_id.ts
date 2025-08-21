"use server";

import prisma from "@/lib/prisma";
import _ from "lodash";

export default async function forum_funGetOneReportedPostingById({
  postingId,
}: {
  postingId: string;
}) {
  const data = await prisma.forum_Posting.findFirst({
    where: {
      id: postingId,
    },
    select: {
      id: true,
      diskusi: true,
      Forum_ReportPosting: {
        select: {
          id: true,
          deskripsi: true,
          forumMaster_KategoriReportId: true,
          ForumMaster_KategoriReport: true,
        },
      },
    },
  });

  // console.log(data)

  const group = _.groupBy(
    data?.Forum_ReportPosting,
    (val) => val.ForumMaster_KategoriReport?.title
  );
  const getKey = _.keys(group);
  const filterGroup = getKey.map((e) => e.replace("undefined", "Lainnya"));

  const allData = {
    data: data,
    list: filterGroup,
  };

  // console.log(allData);

  return allData;
}
