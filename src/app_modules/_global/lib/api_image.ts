export const apiDeleteImageById = async ({
  fileId,
  dirId,
}: {
  fileId: string;
  dirId?: string;
}) => {
  const response = await fetch(`/api/image/delete`, {
    method: "DELETE",
    body: JSON.stringify({ fileId, dirId }),
  });

  console.log("delete api =>", await response.json());

  return await response.json().catch(() => null);
};
