import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { Button, Group, Stack } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import AdminEvent_ComponentDetailData from "../_component/comp_detail_data";

export function AdminEvent_ViewDetailReject({ data }: { data: MODEL_EVENT }) {
  return (
    <>
      <Admin_ComponentBoxStyle>
        <Stack>
          <AdminEvent_ComponentDetailData data={data} />

          <Group mt={100} spacing={"xl"} position="center">
            <Button
              color={"red"}
              leftIcon={<IconPencilPlus />}
              radius={"xl"}
              //   onClick={openReject}
            >
              Tambah catatan
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentBoxStyle>
    </>
  );
}
