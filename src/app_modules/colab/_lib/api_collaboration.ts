export const apiGetAllCollaboration = async ({
  kategori,
  page,
}: {
  kategori: "beranda" | "partisipasi" | "proyeksaya" | "grup";
  page: string;
}) => {
  const respone = await fetch(
    `/api/collaboration/get?kategori=${kategori}&page=${page}`
  );
  return await respone.json().catch(() => null);
};

export const apiGetOneCollaborationById = async ({ id }: { id: string }) => {
  const respone = await fetch(`/api/collaboration/${id}`);
  return await respone.json().catch(() => null);
};