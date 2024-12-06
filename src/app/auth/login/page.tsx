"use client";
import { Button } from "@mantine/core";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  

  async function login() {
    setLoading(true);
    try {
      const res = await fetch("/auth/api/login", {
        method: "POST",
      });

      const dataText = await res.text();

      if (!res.ok) {
        console.error(dataText);
        throw new Error(res.statusText);
      }

      const dataJson = JSON.parse(dataText);
      console.log(dataJson);
    //   window.location.replace("/dev/home");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Button loading={loading} onClick={login}>
        Login
      </Button>
    </>
  );
}
