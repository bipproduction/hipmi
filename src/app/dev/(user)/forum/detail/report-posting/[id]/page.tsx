import { Forum_DetailReportPosting } from "@/app_modules/forum";
import forum_funGetOneReportedPostingById from "@/app_modules/forum/fun/get/get_one_posting_reported_by_id";

export default async function Page({params}: {params: {id: string}}) {
  const postingId = params.id
  const dataPosting = await forum_funGetOneReportedPostingById({postingId: postingId})
  return (
    <>
      <Forum_DetailReportPosting dataPosting={dataPosting} />
    </>
  );
}
