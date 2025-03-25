import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { IconCircleCheck } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { gs_admin_event_menu_publish } from "../_lib/global_state";
import { Stack, Group, Button } from "@mantine/core";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import AdminEvent_ComponentDetailPublish from "../_component/comp_detail_publish";
import { AdminEvent_ViewDetailPeserta } from "./view_detail_peserta";

export function AdminEvent_ViewDetailPublish({ data }: { data: MODEL_EVENT }) {
  const [selectPage, setSelectPage] = useAtom(gs_admin_event_menu_publish);
  const listPage = [
    {
      id: "1",
      name: "Detail Event",
      icon: <IconCircleCheck />,
    },
    {
      id: "2",
      name: "Daftar Peserta",
      icon: <IconCircleCheck />,
    },
  ];

  return (
    <>
      <Stack mt={"lg"}>
        <Group>
          {listPage.map((e) => (
            <Button
              radius={"xl"}
              key={e.id}
              color={selectPage == e.id ? "green" : "gray"}
              onClick={() => setSelectPage(e.id)}
              style={{
                transition: "all 0.5s",
              }}
            >
              {e.name}
            </Button>
          ))}
        </Group>
        {selectPage == "1" && <AdminEvent_ComponentDetailPublish data={data} />}
        {selectPage == "2" && <AdminEvent_ViewDetailPeserta />}
      </Stack>
    </>
  );
}
