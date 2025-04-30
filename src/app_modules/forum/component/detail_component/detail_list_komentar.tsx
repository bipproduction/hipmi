"use client";

import { Box, Card, Divider, Spoiler, Stack, Text } from "@mantine/core";
import { MODEL_FORUM_KOMENTAR } from "../../model/interface";
import ComponentForum_KomentarAuthorNameOnHeader from "../komentar_component/komentar_author_header_name";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { useShallowEffect } from "@mantine/hooks";
import { Comp_V3_SetInnerHTML } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { MainColor } from "@/app_modules/_global/color";

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
        <Stack>
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

          <Box
            style={{
              backgroundColor: MainColor.soft_darkblue,
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Text fz={"sm"} lineClamp={4} c={"white"}>
              {data.komentar ? (
                <Spoiler
                  hideLabel="sembunyikan"
                  maxHeight={100}
                  showLabel="tampilkan"
                >
                  <Comp_V3_SetInnerHTML
                    props={data?.komentar}
                    className="chat-content"
                  />
                </Spoiler>
              ) : (
                ""
              )}
            </Text>
          </Box>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
