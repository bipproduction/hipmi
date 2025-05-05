import { Forum_EditPosting } from "@/app_modules/forum";
import Forum_V3_EditPosting from "@/app_modules/forum/edit/posting/V3_edit_posting";

export default async function Page() {
  return (
    <>
      {/* <Forum_EditPosting  /> */}
      <Forum_V3_EditPosting/>
    </>
  );
}
