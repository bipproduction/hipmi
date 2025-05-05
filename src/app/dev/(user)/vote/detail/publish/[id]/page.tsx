import { Vote_DetailPublish } from "@/app_modules/vote";
import { Vote_getListKontributorById } from "@/app_modules/vote/fun/get/get_list_kontributor_by_id";
import { voting_funGetOneVotingbyId } from "@/app_modules/vote/fun/get/fun_get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let voteId = params.id;
  const dataVote = await voting_funGetOneVotingbyId(voteId);

  return (
    <>
      <Vote_DetailPublish dataVote={dataVote as any} />
    </>
  );
}
