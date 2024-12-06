import { LayoutKatalogNew } from "@/app_modules/katalog/main";

export default async function Layout({ children, params, }: { children: any; params: { id: string } }) {
  // const profileId = params.id;
  // const dataProfile = await Profile_getOneProfileAndUserById(profileId);
  // const authorId = dataProfile?.userId;

  // const userLoginId = await funGetUserIdByToken();
  // const userRoleId = dataProfile?.User?.masterUserRoleId;

  return (
    <>
      {/* <KatalogLayout
        profileId={profileId}
        userLoginId={userLoginId as string}
        authorId={authorId as any}
        userRoleId={userRoleId as string}
      >
        {children}
      </KatalogLayout> */}
      <LayoutKatalogNew>{children}</LayoutKatalogNew>
    </>
  );
}
