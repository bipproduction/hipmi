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

export const apiGetOneCollaborationById = async ({
  id,
  kategori,
  page,
}: {
  id: string;
  kategori: "detail" | "list_partisipan" | "cek_partisipasi";
  page?: string;
}) => {
  const respone = await fetch(
    `/api/collaboration/${id}?kategori=${kategori}&page=${page}`
  );
  return await respone.json().catch(() => null);
};

export const apiGetDataGroupById = async ({
  id,
  kategori,
  page,
}: {
  id: string;
  kategori: "detail" | "info_group"
  page?: string;
}) => {
  const respone = await fetch(
    `/api/collaboration/group/${id}?kategori=${kategori}&page=${page}`
  );

  return await respone.json().catch(() => null)
}