"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import { Box, Button, Center, Group, Stack, Text, Title } from "@mantine/core";

/** Logo "G" resmi Google (4 warna) sesuai panduan brand Google Sign-In. */
function GoogleIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export default function Login({ version }: { version: string }) {
  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack align="center" justify="center" h={"100vh"} spacing={64}>
          <Stack spacing={0}>
            <Stack align="center" spacing={0}>
              <Title order={3} c={MainColor.yellow}>
                WELCOME TO
              </Title>
              <Title order={2} c={MainColor.yellow}>
                HIPMI BADUNG APPS
              </Title>
            </Stack>
            <Group position="right" w={"100%"}>
              <Text c={MainColor.white} ff={"serif"} fz={10}>
                powered by muku.id
              </Text>
            </Group>
          </Stack>
          <Stack w={300} spacing={16}>
            <Center>
              <Text c={MainColor.white} fw={600} fz={12}>
                Masuk dengan akun Google untuk melanjutkan
              </Text>
            </Center>

            <Button
              variant="white"
              radius={"xl"}
              size="md"
              fullWidth
              leftIcon={<GoogleIcon />}
              styles={{
                root: {
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #DADCE0",
                  height: 44,
                  "&:hover": { backgroundColor: "#F7F8F8" },
                },
                label: {
                  color: "#3C4043",
                  fontWeight: 500,
                  fontSize: 14,
                },
              }}
              onClick={() => {
                window.location.href = "/api/auth/google";
              }}
            >
              Continue with Google
            </Button>
          </Stack>

          <Box pos={"fixed"} bottom={10}>
            <Text fw={"bold"} c={MainColor.white} fs={"italic"} fz={"xs"}>
              v {version}
            </Text>
          </Box>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
