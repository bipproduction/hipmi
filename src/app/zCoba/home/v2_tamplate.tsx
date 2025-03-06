"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  ActionIcon,
  Box,
  Group,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { IconBell, IconChevronLeft, IconUserCircle } from "@tabler/icons-react";

export function MobileAppLayout() {
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: MainColor.black,
        position: "relative",
        maxWidth: "500px", // Batasi lebar maksimum untuk tampilan mobile
        margin: "0 auto", // Pusatkan di tengah layar desktop
        border: "1px solid #ccc", // Garis tepi untuk visualisasi
      }}
    >
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1, // Pastikan background di belakang konten
          backgroundImage: "url(/aset/global/main_background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: "500px", // Batasi lebar maksimum untuk tampilan mobile
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "8vh",
            zIndex: 100,
            backgroundColor: MainColor.darkblue,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            maxWidth: "500px", // Batasi lebar maksimum untuk tampilan mobile
            margin: "0 auto", // Pusatkan di tengah layar desktop
          }}
        >
          <ActionIcon
            c={MainColor.white}
            variant="transparent"
            radius="xl"
            onClick={() => {}}
          >
            <IconChevronLeft />
          </ActionIcon>
          <Title order={5} c={MainColor.yellow}>
            Test Template
          </Title>
          <ActionIcon c="white" variant="transparent" onClick={() => {}}>
            <IconBell />
          </ActionIcon>
        </Box>

        {/* Konten Utama (Bisa Di-scroll) */}
        <Box
          style={{
            position: "fixed",
            top: "8vh", // Mulai di bawah header
            bottom: "10vh", // Berakhir di atas footer
            left: 0,
            right: 0,
            overflowY: "auto", // Bisa di-scroll
            padding: "16px",
            maxWidth: "500px", // Batasi lebar maksimum untuk tampilan mobile
            margin: "0 auto", // Pusatkan di tengah layar desktop
          }}
        >
          {/* Logo */}
          <Image
            src={"/aset/home/home-hipmi-new.png"}
            alt="logo"
            height={140}
            fit="cover"
            style={{
              borderRadius: "10px",
              border: `2px solid ${AccentColor.blue}`,
              marginBottom: "16px",
            }}
          />

          {/* Dummy Content untuk Testing Scroll */}
          {Array.from({ length: 20 }).map((_, i) => (
            <Paper
              key={i}
              p="md"
              bg={MainColor.darkblue}
              style={{
                borderRadius: "10px",
                border: `2px solid ${AccentColor.blue}`,
                marginBottom: "8px",
              }}
            >
              <Text c={MainColor.white}>Item {i + 1}</Text>
            </Paper>
          ))}
        </Box>

        {/* Footer */}
        <Box
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "10vh",
            zIndex: 100,
            backgroundColor: AccentColor.darkblue,
            borderTop: `2px solid ${AccentColor.blue}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "500px", // Batasi lebar maksimum untuk tampilan mobile
            margin: "0 auto", // Pusatkan di tengah layar desktop
          }}
        >
          <Group spacing="xl">
            <ActionIcon variant="transparent" onClick={() => {}}>
              <IconUserCircle color="white" />
            </ActionIcon>
            <Text fz={10} c={MainColor.white}>
              Profile
            </Text>
          </Group>
        </Box>
      </Box>
    </Box>
  );
}
