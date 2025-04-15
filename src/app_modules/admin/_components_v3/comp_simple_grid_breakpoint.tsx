import { SimpleGrid } from "@mantine/core";

export function Admin_V3_ComponentBreakpoint({
  children,
  cols
}: {
  children: React.ReactNode;
  cols?: number;
}) {
  return (
    <>
      <SimpleGrid
        cols={cols || 2}
        breakpoints={[
          { maxWidth: "sm", cols: 1 },
          { maxWidth: "md", cols: 1 },
          { maxWidth: "lg", cols: 1 },
        ]}
        spacing={"lg"}
        verticalSpacing={"lg"}
      >
        {children}
      </SimpleGrid>
    </>
  );
}
