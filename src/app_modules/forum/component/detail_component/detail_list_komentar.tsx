"use client";

import { Card, Divider, Spoiler, Stack, Text } from "@mantine/core";
import { MODEL_FORUM_KOMENTAR } from "../../model/interface";
import ComponentForum_KomentarAuthorNameOnHeader from "../komentar_component/komentar_author_header_name";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { useShallowEffect } from "@mantine/hooks";

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
  useShallowEffect(() => {
   
    // Add custom style for stickers inside Quill editor
    const style = document.createElement("style");
    style.textContent = `
    // .ql-editor img {
    //   max-width: 40px !important;
    //   max-height: 40px !important;
    // }
      .chat-content img {
      max-width: 70px !important;
      max-height: 70px !important;
    }
  `;
    document.head.appendChild(style);

    //  setQuillLoaded(true);

    return () => {
      // Clean up when component unmounts
      document.head.removeChild(style);
    };
  }, []);

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
                <div
                  className="chat-content"
                  dangerouslySetInnerHTML={{ __html: data.komentar }}
                />
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
