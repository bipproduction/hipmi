import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  Badge,
  Center,
  Group,
  Stack,
  Text,
  Loader,
  Paper,
  Box,
} from "@mantine/core";
import _ from "lodash";
import { MODEL_VOTE_KONTRIBUTOR } from "../model/interface";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetKontributorById } from "../_lib/api_voting";
import { useParams } from "next/navigation";
import { useState } from "react";
import { clientLogger } from "@/util/clientLogger";
import { Voting_ComponentSkeletonDaftarKontributor } from "../component/skeleton_view";
import { ScrollOnly } from "next-scroll-loader";

export function Voting_ViewDetailKontributorVoting() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_VOTE_KONTRIBUTOR[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetKontributorById({
        id: params.id,
        page: `${activePage}`,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data kontributor", error);
    }
  }

  if (_.isNull(data)) {
    return <Voting_ComponentSkeletonDaftarKontributor />;
  }

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData text="Tidak ada kontributor" />
      ) : (
        <Box>
          <ScrollOnly
            height="75vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={async () => {
              const respone = await apiGetKontributorById({
                id: params.id,
                page: `${activePage + 1}`,
              });

              setActivePage((val) => val + 1);

              return respone.data;
            }}
          >
            {(item) => (
              <ComponentGlobal_CardStyles>
                <ComponentGlobal_AvatarAndUsername
                  key={item}
                  profile={item.Author.Profile as any}
                  component={
                    <Group position="right">
                      <Badge w={130}>
                        <Text
                          lineClamp={1}
                          fz={
                            item.Voting_DaftarNamaVote.value.length > 10
                              ? 8
                              : 10
                          }
                        >
                          {item.Voting_DaftarNamaVote.value}
                        </Text>
                      </Badge>
                    </Group>
                  }
                />
              </ComponentGlobal_CardStyles>
            )}
          </ScrollOnly>

          {/* {data?.map((e, i) => (
              <ComponentGlobal_AvatarAndUsername
                key={e.id}
                profile={e.Author.Profile as any}
                component={
                  <Group position="right">
                    <Badge w={130}>
                      <Text
                        lineClamp={1}
                        fz={e.Voting_DaftarNamaVote.value.length > 10 ? 8 : 10}
                      >
                        {e.Voting_DaftarNamaVote.value}
                      </Text>
                    </Badge>
                  </Group>
                }
              />
            ))} */}
        </Box>
      )}
    </>
  );
}
