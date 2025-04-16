import { SimpleGrid } from "@mantine/core";

export function Admin_V3_ComponentBreakpoint({
  children,
  cols,
  sm,
  md,
  lg,
}: {
  children: React.ReactNode;
  cols?: number;
  sm?: number;
  md?: number;
  lg?: number;
}) {
  return (
    <>
      <SimpleGrid
        cols={cols || 2}
        breakpoints={[
          { maxWidth: "sm", cols: sm || 1 },
          { maxWidth: "md", cols: md || 1 },
          { maxWidth: "lg", cols: lg || 1 },
        ]}
        spacing={"lg"}
        verticalSpacing={"lg"}
      >
        {children}
      </SimpleGrid>
    </>
  );
}
