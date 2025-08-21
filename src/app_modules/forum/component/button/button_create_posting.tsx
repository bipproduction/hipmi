import { MainColor } from "@/app_modules/_global/color";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { forum_funCreate } from "../../fun/create/fun_create";
import mqtt_client from "@/util/mqtt_client";

interface ButtonActionProps {
  value: string;
}

export default function Forum_ButtonCreatePosting({
  value,
}: ButtonActionProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  async function onCreate() {
    try {
      setLoading(true);
      const create = await forum_funCreate(value);
      if (create.status === 201) {
        ComponentGlobal_NotifikasiBerhasil(create.message);
        router.back();

        mqtt_client.publish(
          "Forum_create_new",
          JSON.stringify({ isNewPost: true, count: 1 })
        );
      } else {
        ComponentGlobal_NotifikasiGagal(create.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Button
      style={{ transition: "all 0.5s" }}
      disabled={
        value === "<p><br></p>" ||
        value === "" ||
        funReplaceHtml({ html: value }).length > maxInputLength
      }
      bg={MainColor.yellow}
      color="yellow"
      c="black"
      radius="xl"
      loading={loading}
      loaderPosition="center"
      onClick={onCreate}
    >
      Posting
    </Button>
  );
}
