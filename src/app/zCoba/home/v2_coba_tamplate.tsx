"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  ActionIcon,
  BackgroundImage, // Import BackgroundImage dari Mantine
  Box,
  Button,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { createStyles } from "@mantine/styles";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { ReactNode, useEffect, useState } from "react";

// Styling langsung didefinisikan di dalam komponen
const useStyles = createStyles((theme) => ({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100dvh", // dynamic viewport height untuk mobile
    width: "100%",
    maxWidth: "500px", // Batasi lebar maksimum
    margin: "0 auto", // Pusatkan layout
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Tambahkan shadow untuk efek mobile-like
    backgroundColor: MainColor.darkblue, // Warna latar belakang fallback

    [`@media (max-width: 768px)`]: {
      maxWidth: "100%", // Pada layar mobile, gunakan lebar penuh
      boxShadow: "none", // Hilangkan shadow pada mobile
    },
  },

  header: {
    position: "sticky",
    top: 0,
    width: "100%",
    maxWidth: "500px", // Batasi lebar header sesuai container
    margin: "0 auto", // Pusatkan header
    backgroundColor: MainColor.darkblue,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    zIndex: 1000, // Pastikan z-index tinggi
    transition: "all 0.3s ease",
    color: MainColor.yellow,
  },

  scrolled: {
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },

  headerContainer: {
    height: "8vh",
    display: "flex",
    alignItems: "center",
    padding: "0 16px", // Padding untuk mobile view

    [`@media (max-width: 768px)`]: {
      height: "8vh",
    },
    borderBottom: `1px solid ${AccentColor.blue}`,
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },

  content: {
    flex: 1,
    width: "100%",
    overflowY: "auto", // Izinkan scrolling pada konten
    paddingBottom: "15vh", // Sesuaikan dengan tinggi footer
  },

  footer: {
    width: "100%",
    backgroundColor: MainColor.darkblue,
    borderTop: `1px solid ${AccentColor.blue}`,
    height: "10vh", // Tinggi footer
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    bottom: 0,
    left: "50%", // Pusatkan footer
    transform: "translateX(-50%)", // Pusatkan footer
    maxWidth: "500px", // Batasi lebar footer
    color: MainColor.white,
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
}));

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { classes, cx } = useStyles();

  // Effect untuk mendeteksi scroll
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <Box className={classes.pageContainer}>
      {/* Header - tetap di atas */}
      <Box
        className={cx(classes.header, { [classes.scrolled]: scrolled })}
        component="header"
      >
        <Container size="xl" className={classes.headerContainer}>
          <Group position="apart" w={"100%"}>
            <ActionIcon>
              <IconSearch />
            </ActionIcon>
            <Title order={4}>Home Test</Title>
            <ActionIcon>
              <IconBell />
            </ActionIcon>
          </Group>
        </Container>
      </Box>

      {/* Konten utama - bisa di-scroll */}
      <Box className={classes.content}>
        <Container>{children}</Container>
      </Box>

      {/* Footer - tetap di bawah */}
      <Box className={classes.footer} component="footer">
        <Container size="xl">
          <Group position="apart" py="md">
            <Text size="sm">© 2025 Nama Perusahaan</Text>
            <Group spacing="xs">
              <Button variant="subtle" size="xs">
                Privasi
              </Button>
              <Button variant="subtle" size="xs">
                Syarat
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
