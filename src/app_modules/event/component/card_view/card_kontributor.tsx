import { RouterEvent } from "@/lib/router_hipmi/router_event";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoaderAvatar,
} from "@/app_modules/_global/component";
import {
  Box,
  Card,
  Group,
  Stack,
  Title
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_EVENT_PESERTA } from "../../_lib/interface";

export function ComponentEvent_CardKontributor({
  data,
}: {
  data: MODEL_EVENT_PESERTA;
}) {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"16px"}>
        <Card.Section px={"md"} pt={"sm"}>
          <ComponentGlobal_AvatarAndUsername
            profile={data?.Event.Author.Profile as any}
          />
          {/* <ComponentGlobal_AuthorNameOnHeader
            profileId={data?.Event.Author.Profile.id}
            imagesId={data?.Event.Author.Profile.imagesId}
            authorName={data?.Event.Author.Profile.name}
            isPembatas
          /> */}
        </Card.Section>
        <Card.Section
          p={"sm"}
          pt={"lg"}
          onClick={() => {
            setEventId(data?.id), setVisible(true);
            router.push(RouterEvent.detail_kontribusi + data.Event.id);
          }}
        >
          <Stack>
            <Title align="center" order={4} lineClamp={1}>
              {data?.Event.title}
            </Title>

            <Group position="center">
              {data?.Event.Event_Peserta.map((e, i) => (
                <Box key={i}>
                  <ComponentGlobal_LoaderAvatar
                    fileId={e.User.Profile.imageId as any}
                    sizeAvatar={60}
                  />
                  {/* <Avatar
                    size={"lg"}
                    radius={"xl"}
                    sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                    src={
                      RouterProfile.api_foto_profile +
                      val?.User?.Profile.imagesId
                    }
                  /> */}
                </Box>
              ))}
            </Group>
          </Stack>
        </Card.Section>
        {visible && eventId === data?.id ? (
          <ComponentGlobal_CardLoadingOverlay />
        ) : (
          ""
        )}
      </ComponentGlobal_CardStyles>
      {/* <Card
        style={{
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          color: "white",
          borderRadius: "10px",
          marginBottom: "20px",
          padding: "15px",
        }}
      >
       
      </Card> */}
    </>
  );
}
