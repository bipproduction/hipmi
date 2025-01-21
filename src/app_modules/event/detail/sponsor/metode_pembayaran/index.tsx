'use client';

import { AccentColor, MainColor } from '@/app_modules/_global/color';
import { MODEL_MASTER_BANK } from '@/app_modules/investasi/_lib/interface';
import { Button, Paper, Radio, Stack, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const bank = [
  {
    id: 1,
    namaBank: "BRI",
  },
  {
    id: 2,
    namaBank: "BCA",
  },
  {
    id: 3,
    namaBank: "BNI",
  },
  {
    id: 4,
    namaBank: "BSI",
  }
]

function Event_MetodePembayaran() {
  const [pilihBank, setPilihBank] = useState("");
  const router = useRouter();
  return (
    <>
      <Stack>
        <Radio.Group
          value={pilihBank}
          onChange={setPilihBank}
          withAsterisk
          color='yellow'
        >
          {bank.map((e) => (
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
                  color: "yellow"
                },
              }}
              value={e.id}
              label={
                <Title order={6} color='white'>
                  {e.namaBank}
                </Title>
              }
            />
          </Paper>
          ))}
        </Radio.Group>
        <Button
          style={{ transition: "0.5s" }}
          radius={"xl"}
          bg={MainColor.yellow}
          color='yellow'
          c={"black"}
          onClick={() => router.push("/dev/event/invoice")}
        >
          Pilih
        </Button>
      </Stack>
    </>
  );
}

export default Event_MetodePembayaran;