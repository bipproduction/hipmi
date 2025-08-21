import { MainColor } from "@/app_modules/_global/color";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { ComponentGlobal_NotifikasiBerhasil, ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global";
import { clientLogger } from "@/util/clientLogger";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { forum_funEditPostingById } from "../../fun/edit/fun_edit_posting_by_id";

export default function Forum_ButtonUpdatePosting({
  postingId,
  diskusi,
}: {
  postingId: string;
  diskusi: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onUpdate() {
    try {
      setLoading(true);
      const update = await forum_funEditPostingById(postingId, diskusi);

      if (update.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(update.message);
        router.back();
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(update.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error update forum", error);
    }
  }

  return (
    <>
      <Button
        style={{
          transition: "0.5s",
        }}
        disabled={
          diskusi === "<p><br></p>" ||
          diskusi === "" ||
          funReplaceHtml({ html: diskusi }).length > maxInputLength
        }
        loaderPosition="center"
        loading={loading}
        radius={"xl"}
        bg={MainColor.yellow}
        color={"yellow"}
        c={"black"}
        onClick={() => {
          onUpdate();
        }}
      >
        Update
      </Button>
    </>
  );
}
