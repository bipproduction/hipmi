"use client";

import { Stack } from "@mantine/core";
import { Admin_ComponentPreviewImageAdmin } from "../../_admin_global/comp_preview_image_admin";

export default function AdminDonasi_BuktiTransferPencairan({
  imageId,
}: {
  imageId: string;
}) {
  return (
    <>
      <Stack>
        <Admin_ComponentPreviewImageAdmin fileId={imageId} />
      </Stack>
    </>
  );
}
