import { Paper, Stack, Title } from "@mantine/core";
import { Admin_ComponentLoadImageLandscape } from "../../_admin_global";
import { AccentColor, AdminColor } from "@/app_modules/_global/color/color_pallet";

export function ComponentAdminInvestasi_DetailGambar({imagesId}: {imagesId: any}) {
    return (
      <>
        <Paper bg={AdminColor.softBlue}  p={"lg"}>
          <Stack>
            <Title c={AdminColor.white} align="center" order={3}>
              Gambar Proyek
            </Title>

            <Admin_ComponentLoadImageLandscape fileId={imagesId} />

            {/* <AspectRatio ratio={1 / 1} mah={300}>
              <Center>
                <Image
                  style={{ borderRadius: "10px" }}
                  radius={"md"}
                  width={200}
                  alt=""
                  src={RouterInvestasi_OLD.api_gambar + `${imagesId}`}
                />
              </Center>
            </AspectRatio> */}
          </Stack>
        </Paper>
      </>
    );
}