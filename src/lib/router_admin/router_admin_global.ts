export const RouterAdminGlobal = {
    /**
     * @param fileId | file id from wibu storage , atau bisa diambil di DB
     * @type {string}
     */
  preview_image: ({ id }: { id: string }) => `/dev/admin/preview-image/${id}`,
};
