"use client";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { gs_nominal_sponsor } from "@/app_modules/event/global_state";
import {
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";
import {
  IconChevronRight,
  IconMoodSmile,
  IconMoodSmileBeam,
  IconMoodSmileDizzy,
  IconMoodXd,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const listNominal = [
  {
    id: 1,
    value: 25000,
    icon: <IconMoodSmile />,
  },
  {
    id: 2,
    value: 50000,
    icon: <IconMoodSmileBeam />,
  },
  {
    id: 3,
    value: 75000,
    icon: <IconMoodSmileDizzy />,
  },
  {
    id: 4,
    value: 100000,
    icon: <IconMoodXd />,
  },
];
function Event_PilihNominalSponsor() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [inputNominal, setInputNominal] = useState("");
  const [valueNominal, setValueNominal] = useState(0);
  const [fixNominal, setFixNominal] = useAtom(gs_nominal_sponsor);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingPaper, setLoadingPaper] = useState(false);
  const [chooseId, setChooseId] = useState(0);

  return (
    <>
      <Stack>
        <Box>
          {listNominal.map((e) => (
            <Paper
              key={e.id}
              style={{
                transition: "all 0.3s ease-in-out",
                backgroundColor: AccentColor.blue,
                border: `2px solid ${AccentColor.darkblue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
                marginBottom: "15px",
              }}
              onClick={() => {
                try {
                  setChooseId(e.id);
                  setLoadingPaper(true);
                  setFixNominal(e.value);
                  router.push(RouterEvent.metode_pembayaran({ id: params.id }));
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <Group position="apart">
                <Group>
                  {e.icon}
                  <Title order={4}>
                    Rp.
                    {new Intl.NumberFormat("id-ID", { currency: "IDR" }).format(
                      e.value
                    )}
                  </Title>
                </Group>
                {isLoadingPaper && e.id === chooseId ? (
                  <Loader size={20} color="yellow" />
                ) : (
                  <IconChevronRight />
                )}
              </Group>
            </Paper>
          ))}
        </Box>
        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Stack>
            <Text>Nominal Lainnya</Text>
            <TextInput
              icon={<Text fw={"bold"}>Rp.</Text>}
              placeholder="0"
              min={0}
              value={inputNominal}
              onChange={(val) => {
                const match = val.currentTarget.value
                  .replace(/\./g, "")
                  .match(/^[0-9]+$/);

                if (val.currentTarget.value === "")
                  return setInputNominal(0 + "");

                if (!match?.[0]) return null;

                const nilai = val.currentTarget.value.replace(/\./g, "");
                const target = Intl.NumberFormat("id-ID").format(+nilai);

                setValueNominal(+nilai);
                setInputNominal(target);
              }}
            />
           
          </Stack>
        </Paper>
        <Button
          disabled={valueNominal <= 0}
          loaderPosition="center"
          loading={isLoading}
          style={{ transition: " all 0.3s ease-in-out" }}
          radius={"xl"}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          onClick={() => {
            setLoading(true);
            setFixNominal(valueNominal);
            router.push(RouterEvent.metode_pembayaran({ id: params.id }));
          }}
        >
          Lanjutan Pembayaran
        </Button>
      </Stack>
    </>
  );
}

export default Event_PilihNominalSponsor;
