"use client";

import { Box, ScrollArea } from "@mantine/core";

export function V2_Children({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <>
      <Box
        style={{ zIndex: 0 }}
        px={"md"}
        h={height ? "82vh" : "92vh"}
        pos={"static"}
      >
          {children}
        {/* <ScrollArea h={"100%"} px={"md"} bg={"cyan"}>
        </ScrollArea> */}
      </Box>
    </>
  );
}
