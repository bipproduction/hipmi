import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Stack } from "@mantine/core";
import { MODEL_COLLABORATION } from "../../model/interface";
import ComponentColab_CardSectionData from "./card_section_data";
import ComponentColab_CardSectionHeaderAuthorName from "./card_section_header_author_name";
import ComponentColab_JumlahPartisipan from "./card_section_jumlah_partisipan";

export function ComponentColab_CardBeranda({
  data,
  userLoginId,
}: {
  data: MODEL_COLLABORATION;
  userLoginId: string;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"15px"}>
        <Stack>
          <ComponentColab_CardSectionHeaderAuthorName
            isAuthor={userLoginId === data.Author.id ? true : false}
            colabId={data.id}
            profile={data.Author.Profile as any}
          />
          <ComponentColab_CardSectionData
            colabId={data.id}
            path={RouterColab.main_detail}
            data={data}
          />
          <ComponentColab_JumlahPartisipan
            jumlah={data.ProjectCollaboration_Partisipasi}
          />
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
