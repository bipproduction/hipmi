"use client";

import { Card, Divider, Spoiler, Stack, Text } from "@mantine/core";
import { MODEL_FORUM_KOMENTAR } from "../../model/interface";
import ComponentForum_KomentarAuthorNameOnHeader from "../komentar_component/komentar_author_header_name";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";

export default function ComponentForum_KomentarView({
  data,
  setKomentar,
  postingId,
  userLoginId,
}: {
  data: MODEL_FORUM_KOMENTAR;
  setKomentar: any;
  postingId: string;
  userLoginId: string;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <ComponentForum_KomentarAuthorNameOnHeader
          tglPublish={data?.createdAt}
          userId={data?.Author?.id}
          komentarId={data?.id}
          isMoreButton={true}
          setKomentar={setKomentar}
          postingId={postingId}
          userLoginId={userLoginId}
          profile={data.Author.Profile}
        />

        <Stack spacing={"xs"} sx={{ zIndex: 0 }} p={"sm"}>
          <Text fz={"sm"} lineClamp={4} c={"white"}>
            {data.komentar ? (
              <Spoiler
                hideLabel="sembunyikan"
                maxHeight={100}
                showLabel="tampilkan"
              >
                <div dangerouslySetInnerHTML={{ __html: data.komentar }} />
              </Spoiler>
            ) : (
              ""
            )}
          </Text>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
