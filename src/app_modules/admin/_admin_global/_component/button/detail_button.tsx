import { Button } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin_DetailButton({ path }: { path: string }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Button
        loading={isLoading}
        loaderPosition="center"
        color={"green"}
        variant="filled"
        radius={"xl"}
        leftIcon={<IconEye size={25} color={"white"} />}
        onClick={() => {
          setLoading(true);
          router.push(path || "");
        }}
      >
        Detail
      </Button>
    </>
  );
}
