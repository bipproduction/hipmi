import { AdminVote_Main } from "@/app_modules/admin/vote";
import AdminVote_funCountByStatusId from "@/app_modules/admin/vote/fun/count/fun_count_vote_by_status_id";

export default async function Page() {
    // const countPublish = await AdminVote_funCountByStatusId("1");
    // const countReview = await AdminVote_funCountByStatusId("2");
    // const countDraft = await AdminVote_funCountByStatusId("0");
    // const countReject = await AdminVote_funCountByStatusId("4");

  return (
    <>
      <AdminVote_Main
        // countPublish={countPublish as number}
        // countReview={countReview as number}
        // countDraft={countDraft as number}
        // countReject={countReject as number}
      />
    </>
  );
}
