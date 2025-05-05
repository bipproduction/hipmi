import { Vote_DetailRiwayatSaya } from "@/app_modules/vote";
import { Vote_getListKontributorById } from "@/app_modules/vote/fun/get/get_list_kontributor_by_id";
import { Vote_getOnePublishbyId } from "@/app_modules/vote/fun/get/get_one_publish_by_id";

export default async function Page({params}: {params: {id: string}}) {
  let voteId = params.id;
  const dataVote = await Vote_getOnePublishbyId(voteId);
  const listKontributor = await Vote_getListKontributorById(voteId);


  return (
    <>
      <Vote_DetailRiwayatSaya
        dataVote={dataVote as any}
        listKontributor={listKontributor}
      />
    </>
  );
}
