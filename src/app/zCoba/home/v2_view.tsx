// app/page.tsx
"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ClientLayout from "./v2_coba_tamplate";

export default function ViewV2() {
  return (
    <ClientLayout>
      <Stack spacing="xl" c={"white"}>
        <Title order={1} ta="center" my="lg" size="h2">
          Selamat Datang
        </Title>

        <Text size="md" ta="center" mb="lg">
          Aplikasi dengan layout yang dioptimalkan untuk tampilan mobile
        </Text>

        <Stack spacing="md">
          {[...Array(5)].map((_, index) => (
            <Card
              opacity={0.3}
              key={index}
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
            >
              <Card.Section>
                <Image
                  src={`/api/placeholder/400/200`}
                  height={160}
                  alt={`Produk ${index + 1}`}
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text fw={500}>Produk {index + 1}</Text>
                <Badge color="blue" variant="light">
                  Baru
                </Badge>
              </Group>

              <Text size="sm" color="dimmed" lineClamp={2}>
                Deskripsi produk yang singkat dan padat untuk tampilan mobile.
                Fokus pada informasi penting saja.
              </Text>

              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Lihat Detail
              </Button>
            </Card>
          ))}
        </Stack>

        <Stack spacing="md">
          {[...Array(5)].map((_, index) => (
            <Box key={index} mb="xl" h="100px" bg={"gray"}>
              Test
            </Box>
          ))}
        </Stack>

        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "gray",
              marginBottom: "15px",
              height: "100px",
            }}
          >
            Test
          </div>
        ))}

        <Paper
          shadow="md"
          p="md"
          withBorder
          radius="md"
          style={{
            backgroundImage: "linear-gradient(45deg, #228be6, #4c6ef5)",
            color: "white",
          }}
        >
          <Text fw={700} size="lg" ta="center">
            Promo Spesial
          </Text>
          <Text ta="center" my="sm">
            Dapatkan diskon 20% untuk pembelian pertama
          </Text>
          <Button variant="white" color="blue" fullWidth>
            Klaim Sekarang
          </Button>
        </Paper>
      </Stack>
    </ClientLayout>
  );
}
