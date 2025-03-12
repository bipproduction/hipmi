"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
    zIndex: 100, // Pastikan z-index tinggi
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
    overflowY: "hidden", // Izinkan scrolling pada konten
    paddingBottom: "8vh", // Sesuaikan dengan tinggi footer
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

export default function UI_NewLayoutTamplate({ children }: ClientLayoutProps) {
  const { classes } = useStyles();

  return <Box className={classes.pageContainer}>{children}</Box>;
}

export function UI_NewHeader({ children }: { children: ReactNode }) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState<boolean>(false);

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
    <Box
      className={cx(classes.header, { [classes.scrolled]: scrolled })}
      component="header"
    >
      <Container size="xl" className={classes.headerContainer}>
        {children}
      </Container>
    </Box>
  );
}

export function UI_NewChildren({ children }: { children: ReactNode }) {
  const { classes } = useStyles();
  return (
    <Box className={classes.content}>
      <Container size="xl" py="md">
        {children}
      </Container>
    </Box>
  );
}

export function UI_NewFooter({ children }: { children: ReactNode }) {
  const { classes } = useStyles();
  return (
    <Box className={classes.footer} component="footer">
      {children}
    </Box>
  );
}
