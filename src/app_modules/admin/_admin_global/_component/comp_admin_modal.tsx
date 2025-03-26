import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Modal } from "@mantine/core";
import { reject } from "lodash";

export function Admin_ComponentModal({
  children,
  opened,
  onClose,
  title,
  size,
}: {
  children: React.ReactNode;
  opened: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  title: string
}) {
  return (
    <>
      <Modal
        styles={{
          header: { backgroundColor: AdminColor.softBlue },
          body: { backgroundColor: AdminColor.softBlue },
          title: { color: AdminColor.white },
        }}
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        size={size ? size : "sm"}
        centered
        title={title}
      >
        {children}
      </Modal>
    </>
  );
}
