import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Modal } from "@mantine/core";

export function Admin_ComponentModal({
  children,
  opened,
  onClose,
  title,
  size,
  withCloseButton,
  closeOnClickOutside,
}: {
  children: React.ReactNode;
  opened: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  title?: any;
  withCloseButton?: boolean | undefined;
  closeOnClickOutside?: boolean | undefined;
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
        size={size ? size : "sm"}
        centered
        title={title}
        withCloseButton={withCloseButton ? withCloseButton : false}
        closeOnClickOutside={closeOnClickOutside ? closeOnClickOutside : false}
      >
        {children}
      </Modal>
    </>
  );
}
