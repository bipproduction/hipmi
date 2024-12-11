import { ViewKatalogNew } from "@/app_modules/katalog";

export default async function Page({ params }: { params: { id: string } }) {
  // let profileId = params.id;
  // const userLoginId = await funGetUserIdByToken();

  // const listPorto = await funGetListPortofolio(profileId);
  // const dataProfile = await Profile_getOneProfileAndUserById(profileId);

  return (
    <>
      {/* <Katalog_MainView
        profile={dataProfile as any}
        listPorto={listPorto as any}
        userLoginId={userLoginId as any}
      /> */}

      <ViewKatalogNew />
    </>
  );
}
