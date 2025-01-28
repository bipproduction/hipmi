"use client";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconChevronRight,
  IconMoodSmile,
  IconMoodSmileBeam,
  IconMoodSmileDizzy,
  IconMoodXd,
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const listNominal = [
  {
    id: 1,
    jumlah: " 25.000",
    icon: <IconMoodSmile />,
  },
  {
    id: 2,
    jumlah: " 50.000",
    icon: <IconMoodSmileBeam />,
  },
  {
    id: 3,
    jumlah: " 75.000",
    icon: <IconMoodSmileDizzy />,
  },
  {
    id: 4,
    jumlah: " 100.000",
    icon: <IconMoodXd />,
  },
];
function Event_PilihNominalSponsor() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  
  return (
    <>
      <Stack>
        <Box>
          {listNominal.map((e) => (
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
              <Group position="apart">
                <Group>
                  {e.icon}
                  <Title order={4}>Rp.{e.jumlah}</Title>
                </Group>
                <IconChevronRight />
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
            />
            <Text c={"gray"} fz={"xs"}>
              Minimal Donasi Rp. 10.000
            </Text>
          </Stack>
        </Paper>
        <Button
          style={{ transition: "0.5s" }}
          radius={"xl"}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          onClick={() =>
            router.push("/dev/event/detail/sponsor/metode_pembayaran")
          }
        >
          Lanjutan Pembayaran
        </Button>
      </Stack>
    </>
  );
}

export default Event_PilihNominalSponsor;
