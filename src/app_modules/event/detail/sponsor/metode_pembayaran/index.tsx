"use client";

import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { apiGetMasterBank } from "@/app_modules/_global/lib/api_fetch_master";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import {
  gs_event_bank_id,
  gs_nominal_sponsor,
} from "@/app_modules/event/global_state";
import { MODEL_MASTER_BANK } from "@/app_modules/investasi/_lib/interface";
import { clientLogger } from "@/util/clientLogger";
import { Button, Paper, Radio, Stack, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

function Event_MetodePembayaran() {
  const params = useParams<{ id: string }>();
  const [pilihBank, setPilihBank] = useState("");
  const router = useRouter();
  const [nominal, setNominal] = useAtom(gs_nominal_sponsor);
  const [bankId, setBankId] = useAtom(gs_event_bank_id);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<MODEL_MASTER_BANK[] | null>(null);
  useShallowEffect(() => {
    onLoadBank();
  }, []);

  async function onLoadBank() {
    try {
      const respone = await apiGetMasterBank();

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data bank", error);
    }
  }

  if (!data) {
    return (
      <>
        <Stack>
          {Array.from({ length: 2 }).map((e, i) => (
            <CustomSkeleton key={i} height={50} width={"100%"} />
          ))}
        </Stack>
      </>
    );
  }

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Stack>
          <Radio.Group
            value={pilihBank}
            onChange={setPilihBank}
            withAsterisk
            color="yellow"
          >
            {data.map((e) => (
              <Paper
                key={e.id}
                style={{
                  backgroundColor: AccentColor.blue,
                  border: `2px solid ${AccentColor.darkblue}`,
                  padding: "15px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  color: "white",
                  marginBottom: "15px",
                }}
              >
                <Radio
                  styles={{
                    radio: {
                      color: "yellow",
                    },
                  }}
                  value={e.id}
                  label={
                    <Title order={6} color="white">
                      {e.namaBank}
                    </Title>
                  }
                />
              </Paper>
            ))}
          </Radio.Group>

          <Button
            loading={isLoading}
            loaderPosition="center"
            disabled={pilihBank === ""}
            style={{ transition: "0.5s" }}
            radius={"xl"}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            onClick={() => {
              try {
                setIsLoading(true);
                setBankId(pilihBank);
                router.push(RouterEvent.invoice({ id: params.id }), {
                  scroll: false,
                });
              } catch (error) {
                console.log(error);
              } 
            }}
          >
            Pilih
          </Button>
        </Stack>
      )}
    </>
  );
}

export default Event_MetodePembayaran;
