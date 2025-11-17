"use client";
import {
    Box,
    Button,
    Group,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    TextInput,
    Title
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBrandGmail, IconLocation } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export default function SupportCenter() {
  const [data, setData] = useState({
    email: "",
    title: "",
    description: "",
  });

  const handleSubmit = async () => {
    if (!data.email || !data.title || !data.description) {
      return notifications.show({
        title: "Error",
        color: "red",
        message: "Please fill in all fields.",
      });
    }

    const response = await fetch("/api/helper/support-center", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.success) {
      notifications.show({
        title: "Success",
        color: "green",
        message: "Message sent successfully.",
      });

      setData({
        email: "",
        title: "",
        description: "",
      });
    }

    if (!result.success) {
      notifications.show({
        title: "Error",
        color: "red",
        message: result.error,
      });
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Stack spacing={"lg"}>
        <Stack align="center">
          <Stack spacing={"xs"} align="center">
            <Group>
              <Image
                src="/aset/logo/hiconnect.png"
                alt="logo"
                width={50}
                height={50}
              />

              <Title>Support Center</Title>
            </Group>
            <Text align="center">
              Send us a message and we'll get back to you as soon as possible.
            </Text>
          </Stack>
        </Stack>

        <Paper style={{ padding: "20px" }} withBorder shadow="md">
          <SimpleGrid
            cols={2}
            // verticalSpacing={50}
            spacing={50}
            breakpoints={[
              { maxWidth: "md", cols: 2, spacing: "md" },
              { maxWidth: "sm", cols: 2, spacing: "sm" },
              { maxWidth: "xs", cols: 1, spacing: "sm" },
            ]}
          >
            <Stack>
              <Stack spacing={0}>
                <Title order={2}>Contact Information</Title>
                <Text>For general inquiries, please contact us !</Text>
              </Stack>
              <Group>
                <IconBrandGmail
                  size={40}
                  style={{
                    backgroundColor: "gray",
                    borderRadius: "10%",
                    padding: "5px",
                  }}
                />
                <Stack spacing={0}>
                  <Text fw={"bold"}>Email</Text>
                  <Text>bip.baliinteraktifperkasa@gmail.com</Text>
                </Stack>
              </Group>

              <Group>
                <IconLocation
                  size={40}
                  style={{
                    backgroundColor: "gray",
                    borderRadius: "10%",
                    padding: "5px",
                  }}
                />
                <Stack spacing={0}>
                  <Text fw={"bold"}>Location</Text>
                  <Text>Bali, Indonesia</Text>
                </Stack>
              </Group>
            </Stack>

            <Stack>
              <Title order={2}>Send a Message</Title>

              <TextInput
                label="Email"
                placeholder="Email"
                onChange={(e) => {
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
              />

              <TextInput
                label="Title"
                placeholder="Title"
                onChange={(e) => {
                  setData({
                    ...data,
                    title: e.target.value,
                  });
                }}
              />

              <Textarea
                label="Description"
                placeholder="Description"
                onChange={(e) => {
                  setData({
                    ...data,
                    description: e.target.value,
                  });
                }}
              />

              <Button color="yellow" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </Stack>
          </SimpleGrid>
        </Paper>
      </Stack>
    </Box>
  );
}
