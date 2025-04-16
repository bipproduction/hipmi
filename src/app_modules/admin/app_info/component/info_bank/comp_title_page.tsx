import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component"; 
import { Button } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";

export function AdminAppInformation_ComponentTitlePageBank({
  onEventListener,
}: {
  onEventListener: (val: any) => void;
}) {
  return (
    <>
      <ComponentAdminGlobal_TitlePage
        name="Informasi Bank"
        // component={
        //   <Button
        //     w={120}
        //     leftIcon={<IconCirclePlus />}
        //     radius={"xl"}
        //     onClick={() => {
        //       onEventListener({
        //         isCreate: true,
        //         isUpdate: false,
        //       });
        //     }}
        //   >
        //     Tambah
        //   </Button>
        // }
      />
    </>
  );
}
