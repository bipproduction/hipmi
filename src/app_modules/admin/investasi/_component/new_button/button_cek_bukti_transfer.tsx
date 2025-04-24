import { RouterAdminGlobal } from "@/lib";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminInvestasi_ComponentCekBuktiTransfer({
  imageId,
}: {
  imageId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <Button
        loaderPosition="center"
        loading={isLoading}
        radius={"xl"}
        onClick={() => {
          setLoading(true);
          router.push(RouterAdminGlobal.preview_image({ id: imageId }));
        }}
      >
        Cek Transaksi
      </Button>
    </>
  );
}
