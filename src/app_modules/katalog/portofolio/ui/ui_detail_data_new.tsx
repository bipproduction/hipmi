import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_LoadImage } from "@/app_modules/_global/component";
import {
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconBuildingSkyscraper,
  IconListDetails,
  IconMapPin,
  IconPhoneCall,
  IconPinned,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetOnePortofolioById } from "../lib/api_portofolio";
import { IDetailPortofolioBisnis } from "../lib/type_portofolio";
import SkeletonDetailBisnis from "./ui_skeleton_detail_bisnis";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import Link from "next/link";

export default function Portofolio_UiDetailDataNew() {
  const [loading, setLoading] = useState(true);
  const param = useParams<{ id: string }>();
  const [dataPorto, setDataPorto] = useState<IDetailPortofolioBisnis>();
  const [openModal, setOpenModal] = useState(false);

  async function funGetPortofolio() {
    try {
      setLoading(true);
      const response = await apiGetOnePortofolioById(param.id, "bisnis");
      if (response.success) {
        setDataPorto(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    funGetPortofolio();
  }, []);

  return (
    <>
      <Paper
        p={"sm"}
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: MainColor.white,
        }}
      >
        {loading ? (
          <SkeletonDetailBisnis />
        ) : (
          <Stack>
            <Group position="apart">
              <Title order={6}>Data Bisnis</Title>
              <Text color={MainColor.yellow} fw={"bold"}>
                id: {"  "}
                <Text span inherit>
                  #{dataPorto?.id_Portofolio}
                </Text>
              </Text>
            </Group>
            <Stack>
              <SimpleGrid
                cols={2}
                spacing={"md"}
                breakpoints={[
                  { maxWidth: "62rem", cols: 2, spacing: "md" },
                  { maxWidth: "48rem", cols: 1, spacing: "sm" },
                  { maxWidth: "36rem", cols: 1, spacing: "sm" },
                ]}
              >
                <Box>
                  <Paper>
                    <ComponentGlobal_LoadImage
                      fileId={String(dataPorto?.logoId)}
                    />
                  </Paper>
                </Box>

                <Box>
                  <Grid>
                    <Grid.Col span={2}>
                      <IconBuildingSkyscraper />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Text>{dataPorto?.namaBisnis}</Text>
                    </Grid.Col>
                  </Grid>
                  <Grid>
                    <Grid.Col span={2}>
                      <IconListDetails />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Text>{dataPorto?.bidangBisnis}</Text>
                    </Grid.Col>
                  </Grid>
                  <Grid>
                    <Grid.Col span={2}>
                      <IconPhoneCall />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Text
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        + {dataPorto?.tlpn}
                      </Text>
                    </Grid.Col>
                  </Grid>
                  <Grid>
                    <Grid.Col span={2}>
                      <IconMapPin />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Text>{dataPorto?.alamatKantor}</Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              </SimpleGrid>
            </Stack>

            <Divider color={AccentColor.softblue} />

            <Stack spacing={5}>
              <Group spacing={"xs"}>
                <IconPinned />
                <Text fz={"sm"} fw={"bold"}>
                  Tentang Kami
                </Text>
              </Group>
              <Text px={"sm"}>{dataPorto?.deskripsi}</Text>
            </Stack>
          </Stack>
        )}
      </Paper>

      <UIGlobal_Modal
        title={
          "Anda akan dialihkan ke WhatsApp untuk melanjutkan percakapan. Tekan 'Lanjutkan' untuk melanjutkan."
        }
        opened={openModal}
        close={() => {
          setOpenModal(false);
        }}
        buttonKanan={
          <Button radius={"xl"} color="yellow" c={MainColor.darkblue}>
            <Link
              style={{
                color: "white",
                textDecoration: "none",
              }}
              target="_blank"
              href={`https://wa.me/+${dataPorto?.tlpn}?text=Hallo  , saya tertarik dengan bisnis anda. Apa boleh saya minta informasi tentang bisnis ${dataPorto?.namaBisnis}.`}
            >
              Lanjutkan
            </Link>
          </Button>
        }
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
      />
    </>
  );
}
