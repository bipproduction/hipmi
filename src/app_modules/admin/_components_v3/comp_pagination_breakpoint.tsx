import { Pagination } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function Admin_V3_ComponentPaginationBreakpoint({
  value,
  total,
  onChange,
}: {
  value: number;
  total: number;
  onChange: (val: number) => void;
}) {
  // Dalam komponen Anda
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Pagination
      mt={"xs"}
        value={value}
        total={total}
        onChange={(val) => {
          onChange(val);
        }}
        position="center"
        size={isMobile ? "xs" : isTablet ? "sm" : "md"}
        radius={isMobile ? "xl" : "md"}
        siblings={isMobile ? 0 : 1}
        boundaries={isMobile ? 1 : 2}
        withEdges
      />
    </>
  );
}