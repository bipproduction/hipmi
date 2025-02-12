"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import mqtt_client from "@/util/mqtt_client";
import {
  Affix,
  Button,
  Center,
  Loader,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import { IconSearchOff } from "@tabler/icons-react";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentForum_BerandaCardView from "../component/main_component/card_view";
import { forum_new_getAllPosting } from "../fun/get/new_get_all_posting";
import { MODEL_FORUM_POSTING } from "../model/interface";

export default function Forum_Beranda({
  listForum,
  userLoginId,
}: {
  listForum: any;
  userLoginId: string;
}) {
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();

  const [data, setData] = useState<MODEL_FORUM_POSTING[]>(listForum);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setIsSearch] = useState("");
  const [isNewPost, setIsNewPost] = useState(false);
  const [countNewPost, setCountNewPost] = useState(0);

  useShallowEffect(() => {
    onLoadAllData({
      onLoad(val) {
        setData(val);
      },
    });
  }, [setData]);

  async function onLoadAllData({ onLoad }: { onLoad: (val: any) => void }) {
    const loadData = await forum_new_getAllPosting({ page: 1 });
    onLoad(loadData);
  }

  useShallowEffect(() => {
    mqtt_client.subscribe("Forum_create_new");
    mqtt_client.subscribe("Forum_ganti_status");
    mqtt_client.subscribe("Forum_hapus_data");
    mqtt_client.subscribe("Forum_detail_ganti_status");

    mqtt_client.on("message", (topic: any, message: any) => {
      // console.log(topic);
      const cloneData = _.clone(data);

      if (topic === "Forum_create_new") {
        const newData = JSON.parse(message.toString());
        setIsNewPost(newData.isNewPost);
        const tambah = countNewPost + newData.count;
        setCountNewPost(tambah);
      }

      if (topic === "Forum_hapus_data") {
        const newData = JSON.parse(message.toString());
        setData(newData.data);
      }

      if (topic === "Forum_ganti_status") {
        const newData = JSON.parse(message.toString());
        setData(newData.data);
      }

      if (topic === "Forum_detail_ganti_status") {
        const newData = JSON.parse(message.toString());

        const updateOneData = cloneData.map((val) => ({
          ...val,
          ForumMaster_StatusPosting: {
            id:
              val.id === newData.id
                ? newData.data.id
                : val.ForumMaster_StatusPosting.id,
            status:
              val.id === newData.id
                ? newData.data.status
                : val.ForumMaster_StatusPosting.status,
          },
        }));

        setData(updateOneData as any);
      }
    });
  }, [countNewPost, data]);

  async function onSearch(text: string) {
    setIsSearch(text);
    const loadSearch = await forum_new_getAllPosting({
      page: activePage,
      search: text,
    });
    setData(loadSearch as any);
    setActivePage(1);
  }

  return (
    <>
      {isNewPost && (
        <Affix position={{ top: rem(100) }} w={"100%"}>
          <ButtonUpdateBeranda
            countNewPost={countNewPost}
            onSetData={(val) => setData(val)}
            onSetIsNewPost={(val) => {
              setIsNewPost(val);
            }}
            onSetCountNewPosting={(val) => {
              setCountNewPost(val);
            }}
          />
        </Affix>
      )}

      <ComponentGlobal_CreateButton path={RouterForum.create} />

      <Stack spacing={"xl"}>
        <TextInput
          radius={"xl"}
          placeholder="Topik forum apa yang anda cari hari ini ?"
          onChange={(val) => {
            onSearch(val.currentTarget.value);
          }}
        />

        {_.isEmpty(data) ? (
          <Stack align="center" justify="center" h={"80vh"}>
            <IconSearchOff size={80} color="white" />
            <Stack spacing={0} align="center">
              <Text color="white" fw={"bold"} fz={"xs"}>
                Tidak ada data
              </Text>
            </Stack>
          </Stack>
        ) : (
          // --- Main component --- //
          <ScrollOnly
            height="85vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await forum_new_getAllPosting({
                page: activePage + 1,
                search: isSearch,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentForum_BerandaCardView
                data={item}
                userLoginId={userLoginId}
                onLoadData={(val) => {
                  setData(val);
                }}
                allData={data}
              />
            )}
          </ScrollOnly>
        )}
      </Stack>
    </>
  );
}

function ButtonUpdateBeranda({
  countNewPost,
  onSetData,
  onSetIsNewPost,
  onSetCountNewPosting,
}: {
  countNewPost: number;
  onSetData: (val: any) => void;
  onSetIsNewPost: (val: any) => void;
  onSetCountNewPosting: (val: any) => void;
}) {
  const [scroll, scrollTo] = useWindowScroll();
  const [isLoading, setIsLoading] = useState(false);

  async function onLoadData() {
    setIsLoading(true);
    const loadData = await forum_new_getAllPosting({ page: 1 });

    if (loadData) {
      onSetData(loadData);
      onSetIsNewPost(false);
      setIsLoading(false);
      onSetCountNewPosting(0);
    }
  }

  return (
    <>
      <Center>
        <Button
          style={{
            transition: "0.5s",
            border: `1px solid ${AccentColor.skyblue}`,
          }}
          bg={AccentColor.blue}
          loaderPosition="center"
          loading={isLoading ? true : false}
          radius={"xl"}
          opacity={scroll.y > 0 ? 0.5 : 0.8}
          onClick={() => onLoadData()}
        >
          Update beranda + {countNewPost}
        </Button>
      </Center>
    </>
  );
}
