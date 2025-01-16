'use client';
import { AccentColor, MainColor } from '@/app_modules/_global/color';
import { ComponentGlobal_CardStyles } from '@/app_modules/_global/component';
import { Box, Flex, Image, Stack, Text, Title } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import React from 'react';
import { TfiFacebook } from 'react-icons/tfi';

function DetailSponsor_Event() {
  return (
    <>
      <Stack pb={"lg"}>
        <Stack
          spacing={0}
          style={{
            padding: "15px",
            border: `2px solid ${AccentColor.blue}`,
            backgroundColor: AccentColor.darkblue,
            borderRadius: "10px",
            color: "white",
          }}
          align='center'
        >
          <Text>Nominal Sponsor:</Text>
          <Title order={4} c={MainColor.yellow}>
            Rp. 100.000
          </Title>
        </Stack>
        <ComponentGlobal_CardStyles>
          <Stack>
            <Image src={"https://job-portal.niramasutama.com/images/Banner-INACO.png"} alt='' />
            <Flex justify={"space-between"} >
              <Box>
                <Title order={4}>INACO</Title>
              </Box>
              <Box>
                <Title order={4}>Sosial Media:</Title>
                <Flex align={"center"} gap={"sm"}>
                  <TfiFacebook size={10}/>
                  <Text fz={"sm"}>InacoJellyku</Text>
                </Flex>
                <Flex align={"center"} gap={"sm"}>
                  <IconBrandWhatsapp size={10}/>
                  <Text fz={"sm"}>+6289647038426</Text>
                </Flex>
              </Box>
            </Flex>
          </Stack>
        </ComponentGlobal_CardStyles>
      </Stack>
    </>
  );
}

export default DetailSponsor_Event;
