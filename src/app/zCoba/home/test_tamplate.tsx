"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  BackgroundImage,
  Box,
  Container,
  rem,
  ScrollArea,
} from "@mantine/core";

export function Test_Tamplate({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        style={{
          backgroundColor: MainColor.black,
        }}
      >
        <Container mih={"100vh"} p={0} size={rem(500)} bg={MainColor.green}>
          {/* <BackgroundImage
            src={"/aset/global/main_background.png"}
            h={"100vh"}
            // style={{ position: "relative" }}
          > */}
            <TestHeader header={header} />

            <TestChildren footer={footer}>{children}</TestChildren>

            <TestFooter footer={footer} />
          {/* </BackgroundImage> */}
        </Container>
      </Box>
    </>
  );
}

export function TestHeader({ header }: { header: React.ReactNode }) {
  return (
    <>
      <Box
        h={"8vh"}
        style={{
          zIndex: 10,
          alignContent: "center",
        }}
        w={"100%"}
        pos={"sticky"}
        top={0}
      >
        {header}
      </Box>
    </>
  );
}

export function TestChildren({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <>
      <Box
        style={{ zIndex: 0 }}
        px={"md"}
        h={footer ? "82vh" : "92vh"}
      >
        {children}
      </Box>
    </>
  );
}

function TestFooter({ footer }: { footer: React.ReactNode }) {
  return (
    <>
      {footer ? (
        <Box
          // w dihilangkan kalau relative
          w={"100%"}
          style={{
            // position: "relative",
            position: "fixed",
            bottom: 0,
            height: "10vh",
            zIndex: 10,
            borderRadius: "20px 20px 0px 0px",
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
            // maxWidth dihilangkan kalau relative
            maxWidth: rem(500),
          }}
          bg={AccentColor.darkblue}
        >
          <Box
            h={"100%"}
            // maw dihilangkan kalau relative
            maw={rem(500)}
            style={{
              borderRadius: "20px 20px 0px 0px",
              width: "100%",
            }}
            // pos={"absolute"}
          >
            {footer}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
