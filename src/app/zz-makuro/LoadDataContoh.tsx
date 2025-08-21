"use client";
import { Stack } from "@mantine/core";
import useSwr from "swr";

const fether = (url: string) =>
  fetch("https://jsonplaceholder.typicode.com" + url, {
    cache: "force-cache",
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

export default function LoadDataContoh() {
  const { data, isLoading, error, mutate, isValidating } = useSwr(
    "/posts/1",
    fether,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
     refreshInterval: 1000,
    }
  );
  return (
    <Stack>
      {isLoading && <div>Loading...</div>}
      LoadDataContoh
      {JSON.stringify(data, null, 2)}
    </Stack>
  );
}
