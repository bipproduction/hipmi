import { Colab_Edit } from "@/app_modules/colab";
import colab_getOneCollaborationById from "@/app_modules/colab/fun/get/get_one_by_id";
import colab_funGetMasterIndustri from "@/app_modules/colab/fun/master/fun_get_master_industri";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  const colabId = params.id;
  const dataColab = await colab_getOneCollaborationById(colabId);
  const selectedData = _.omit(dataColab, [
    "ProjectCollaboration_Partisipasi",
    "Author",
  ]);
//   console.log(selectedData);
const listIndustri = await colab_funGetMasterIndustri()

  return (
    <>
      <Colab_Edit selectedData={selectedData as any} listIndustri={listIndustri as any} />
    </>
  );
}
