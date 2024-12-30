import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Vote_MainDetail } from "@/app_modules/vote";

export default async function Page({ params }: { params: { id: string } }) {
  const voteId = params.id;
  const userLoginId = await funGetUserIdByToken();
  return (
    <>
      <Vote_MainDetail
        userLoginId={userLoginId as string}
      />
    </>
  );
}
