'use client';
import { MainColor } from '@/app_modules/_global/color';
import { ComponentGlobal_BoxInformation, ComponentGlobal_BoxUploadImage } from '@/app_modules/_global/component';
import { Investasi_ComponentButtonCreateNewInvestasi } from '@/app_modules/investasi/_component';
import { Box, Stack, Loader, AspectRatio, Image, Button, TextInput, Group, Title } from '@mantine/core';
import { IconCamera, IconPhoto } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Event_CreateSponsor() {
  const router = useRouter();
  const [img, setImg] = useState<any | null>(null);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  return (
    <>
      <Stack px={"xs"} spacing={0}>
        <Stack spacing={0}>
          <Box mb={"sm"}>
            <ComponentGlobal_BoxInformation
              informasi='Gambar sponsor bisa berupa ilustrasti, 
              logo atau foto terkait sponsor'/>
          </Box>
          <ComponentGlobal_BoxUploadImage>
            {isLoadingImg ? (
              <Stack justify='center' align='center' h={"100%"}>
                <Loader size={150} color="yellow" />
              </Stack>
            ) : img ? (
              <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
                <Image
                  style={{ maxHeight: 250, margin: "auto", padding: "5px" }}
                  alt="Foto"
                  height={250}
                  src={URL.createObjectURL(img)}
                />
              </AspectRatio>

            ) : (
              <Stack justify='center' align='center' h={"100%"}>
                <IconPhoto size={150} color='gray' />
              </Stack>
            )}
          </ComponentGlobal_BoxUploadImage>
          <Group position="center">
            <Button radius={"xl"} leftIcon={<IconCamera color='black' />} color='yellow' c={"black"} bg={MainColor.yellow}>Upload Gambar</Button>
          </Group>
          <Stack mt={30}>
            <TextInput
              styles={{
                label: {
                  color: MainColor.white,
                },
                required: {
                  color: MainColor.red,
                },
                input: {
                  backgroundColor: MainColor.white,
                }
              }}
              withAsterisk
              label="Nama Sponsor"
              placeholder="Masukan nama sponsor"

            />
            <Title order={4} color={MainColor.white}>Sosial Media</Title>
            <TextInput
              styles={{
                label: {
                  color: MainColor.white,
                },
                required: {
                  color: MainColor.red,
                },
                input: {
                  backgroundColor: MainColor.white,
                }
              }}
              withAsterisk
              label="Facebook"
              placeholder="Masukan facebook"

            />
            <TextInput
              styles={{
                label: {
                  color: MainColor.white,
                },
                required: {
                  color: MainColor.red,
                },
                input: {
                  backgroundColor: MainColor.white,
                }
              }}
              withAsterisk
              label="WhatsApp"
              placeholder="Masukan whatsapp"

            />         
              <Button mt={90} mb={20}  radius={"xl"} color='yellow' c={"black"} bg={MainColor.yellow} onClick={() => router.push("/dev/event/detail/sponsor/nominal_sponsor")}>
                Simpan
              </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default Event_CreateSponsor;
