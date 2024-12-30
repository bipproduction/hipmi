"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  Avatar,
  Button,
  Center,
  FileButton,
  Paper,
  Stack,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useState } from "react";
import { DIRECTORY_ID } from "../lib";

export default function Page() {
  const [data, setData] = useState({
    name: "bagas",
    hobi: [
      {
        id: "1",
        name: "mancing",
      },
      {
        id: "2",
        name: "game",
      },
    ],
  });

  return (
    <>
      <Stack align="center" justify="center" h={"100vh"}>
        <pre>{JSON.stringify(data, null, 2)}</pre>

        <Button
          onClick={() => {
            const newData = [
              {
                id: "1",
                name: "sepedah",
              },
              {
                id: "2",
                name: "berenang",
              },
            ];

            setData({
              ...data,
              hobi: newData,
            });
          }}
        >
          Ganti
        </Button>
      </Stack>
    </>
  );
}
