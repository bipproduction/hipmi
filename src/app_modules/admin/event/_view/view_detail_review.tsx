import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { IconBan, IconCircleCheck } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { gs_admin_event_menu_publish } from "../_lib/global_state";
import { Stack, Group, Button } from "@mantine/core";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import AdminEvent_ComponentDetailPublish from "../_component/comp_detail_publish";
import { AdminEvent_ViewDetailPeserta } from "./view_detail_peserta";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import AdminEvent_ComponentDetailData from "../_component/comp_detail_data";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";

export function AdminEvent_ViewDetailReview({ data }: { data: MODEL_EVENT }) {
  return (
    <>
      <Admin_ComponentBoxStyle>
        <Stack>
          <AdminEvent_ComponentDetailData data={data} />

          <Group mt={100} spacing={"xl"} position="center">
            <Button
              color={"green"}
              leftIcon={<IconCircleCheck />}
              radius={"xl"}
              onClick={() => {
                //  setPublish(true);
                ComponentAdminGlobal_NotifikasiPeringatan("On Progress");
              }}
            >
              Publish
            </Button>

            <Button
              color={"red"}
              leftIcon={<IconBan />}
              radius={"xl"}
              onClick={() => {
                //  setReject(true);
                ComponentAdminGlobal_NotifikasiPeringatan("On Progress");
              }}
            >
              Reject
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentBoxStyle>
    </>
  );
}
