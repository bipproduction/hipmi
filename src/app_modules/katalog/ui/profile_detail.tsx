import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { apiGetUserProfile, IUserProfile } from "@/app_modules/user";
import {
  Box,
  Button,
  Center,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconBrandGmail,
  IconGenderFemale,
  IconGenderMale,
  IconHome,
  IconPhone,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Profile_ComponentAvatarProfile,
  Profile_ComponentLoadBackgroundImage,
} from "../profile/_component";
import SkeletonProfile from "./skeleton_profile";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import Link from "next/link";

export default function ProfileDetail() {
  const param = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [dataProfile, setDataProfile] = useState<IUserProfile>();
  const [openModal, setOpenModal] = useState(false);

  const listInformation = [
    {
      icon: <IconPhone color={MainColor.white} />,
      value: (
        <Text span inherit onClick={() => setOpenModal(true)}>
          {"+" + dataProfile?.nomor}
        </Text>
      ),
    },
    {
      icon: <IconBrandGmail color={MainColor.white} />,
      value: dataProfile?.email,
    },
    {
      icon: <IconHome color={MainColor.white} />,
      value: dataProfile?.alamat,
    },
    {
      icon:
        dataProfile?.jenisKelamin === "Laki-laki" ? (
          <IconGenderMale color={MainColor.white} />
        ) : (
          <IconGenderFemale color={MainColor.white} />
        ),
      value: dataProfile?.jenisKelamin,
    },
  ];

  async function getProfile() {
    try {
      setLoading(true);
      const response = await apiGetUserProfile(`?profile=${param.id}`);
      if (response) {
        setDataProfile(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Stack
        spacing={0}
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: MainColor.white,
        }}
      >
        {loading ? (
          <SkeletonProfile />
        ) : (
          <>
            <Box>
              <Profile_ComponentLoadBackgroundImage
                fileId={dataProfile?.imageBackgroundId as any}
                size={500}
              />

              <Box
                sx={{
                  position: "relative",
                  bottom: 60,
                  margin: "auto",
                  width: "100%",
                  marginBottom: -30,
                }}
              >
                <Center>
                  <Profile_ComponentAvatarProfile
                    fileId={dataProfile?.imageId as any}
                    style={{
                      borderStyle: "solid",
                      borderColor: AccentColor.darkblue,
                      borderWidth: "2px",
                    }}
                  />
                </Center>
                <Stack align="center" c={MainColor.white} mt={"xs"} spacing={0}>
                  <Text fw={"bold"} lineClamp={1} c={MainColor.white}>
                    {dataProfile?.name}
                  </Text>
                  <Text
                    fs={"italic"}
                    fz={"sm"}
                    c={MainColor.white}
                    lineClamp={1}
                  >
                    @{dataProfile?.username}
                  </Text>
                </Stack>
              </Box>
            </Box>
            <Box>
              <Stack spacing={"xs"}>
                {listInformation.map((e, i) => (
                  <Group key={i} align="flex-start">
                    <ThemeIcon
                      style={{
                        backgroundColor: "transparent",
                      }}
                    >
                      {e.icon}
                    </ThemeIcon>
                    <Box w={"85%"}>
                      <Text c={MainColor.white} fw={"bold"}>
                        {e?.value}
                      </Text>
                    </Box>
                  </Group>
                ))}
              </Stack>
            </Box>
          </>
        )}
      </Stack>

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
              color="white"
              style={{
                color: "white",
                textDecoration: "none",
              }}
              target="_blank"
              href={`https://wa.me/+${dataProfile?.nomor}?text=Hallo  , saya tertarik dengan profile anda sebagai rekan HIPMI. Apakah saya bisa melanjutkan percakapan?`}
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
