import { SimpleGrid } from "@mantine/core";

export function Admin_V3_ComponentBreakpoint({
  children,
  cols,
  sm,
  md,
  lg,
  allCols,
}: {
  children: React.ReactNode;
  cols?: number;
  sm?: number;
  md?: number;
  lg?: number;
  allCols?: number;
}) {
  return (
    <>
      <SimpleGrid
        cols={ allCols || cols || 2}
        breakpoints={[
          { maxWidth: "sm", cols: allCols || sm || 1 },
          { maxWidth: "md", cols: allCols || md || 1 },
          { maxWidth: "lg", cols: allCols || lg || 1 },
        ]}
        spacing={"lg"}
        verticalSpacing={"lg"}
      >
        {children}
      </SimpleGrid>
    </>
  );
}
