"use client";

import {
  Card,
  Divider,
  Spoiler,
  Stack,
  Text
} from "@mantine/core";
import { MODEL_FORUM_KOMENTAR } from "../../model/interface";
import ComponentForum_KomentarAuthorNameOnHeader from "../komentar_component/komentar_author_header_name";

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
      <Card mb={"xs"} bg={"transparent"}>
        <Card.Section>
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
        </Card.Section>
        <Card.Section sx={{ zIndex: 0 }} p={"sm"}>
          <Stack spacing={"xs"}>
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
        </Card.Section>

        <Card.Section>
          <Stack>
            <Divider />
          </Stack>
        </Card.Section>
      </Card>

      {/* <Stack>
        {_.isEmpty(data) ? (
          <Center>
            <Text fw={"bold"} fz={"xs"} c={"white"}>
              Belum ada komentar
            </Text>
          </Center>
        ) : (
          <Box>
            <Center>
              <Text fw={"bold"} fz={"xs"} c={"white"}>
                {" "}
                Komentar
              </Text>
            </Center>
            {data.map((e, i) => (
             
            ))}
          </Box>
        )}
      </Stack> */}
    </>
  );
}
