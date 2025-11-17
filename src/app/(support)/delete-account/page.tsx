"use client";

import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteAccount() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [data, setData] = useState({
    description: "",
  });

  useEffect(() => {
    // Hanya di client, setelah mount
    const urlParams = new URLSearchParams(window.location.search);
    const phone = urlParams.get("phone");
    if (phone) {
      setPhoneNumber(phone);
    }
  }, []);

  const handlerSubmit = async () => {
    if (!phoneNumber || !data.description) {
      return notifications.show({
        title: "Error",
        message: "Please fill in description & phone number",
        color: "red",
      });
    }

    try {
      const response = await fetch("/api/helper/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: phoneNumber,
          description: data.description,
        }),
      });

      const result = await response.json();
      if (result.success) {
        notifications.show({
          title: "Success",
          message: "Account will process to delete",
          color: "green",
        });

        setData({
          description: "",
        });
      }

      if (!result.success) {
        notifications.show({
          title: "Error",
          message: result.error,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
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
      <Paper withBorder shadow="md" p={"lg"}>
        <Stack align="center">
          <Image
            src="/aset/logo/hiconnect.png"
            alt="logo"
            width={100}
            height={100}
          />
          <Title>Delete Account</Title>
          <Stack spacing={0} align="center">
            <Text align="center" fw={"lighter"}>
              To delete your account with phone number{" "}
              {phoneNumber ? `+${phoneNumber}` : ""}.
            </Text>
            <Text align="center" fw={"lighter"}>
              Type your message with subject ‘Delete Account’
            </Text>
          </Stack>

          <Grid w={"100%"}>
            <Grid.Col span={8}>
              <TextInput
                value={data.description}
                w={"100%"}
                placeholder="Type your subject here"
                onChange={(e) => {
                  setData({
                    ...data,
                    description: e.target.value,
                  });
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Button onClick={handlerSubmit} w={"100%"}>
                Submit
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </Box>
  );
}
