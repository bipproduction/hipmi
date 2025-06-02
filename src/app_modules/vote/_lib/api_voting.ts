/**
 * Mengambil daftar semua voting dari API berdasarkan filter yang diberikan.
 *
 * @param {Object} params - Parameter untuk permintaan data voting.
 * @param {"beranda"|"status"} params.kategori - Kategori voting yang diminta, hanya dapat berupa "beranda" atau "status".
 * @param {string} params.page - Nomor halaman untuk pagination.
 * @param {string|null|undefined} [params.search] - Kata kunci pencarian untuk memfilter voting (opsional).
 * @param {"1"|"2"|"3"|"4"|undefined} [params.status] - Status voting, di mana:
 *   - "1": Publish,
 *   - "2": Review,
 *   - "3": Draft,
 *   - "4": Reject.
 *   Parameter ini bersifat opsional.
 * @returns {Promise<Object|null>} Mengembalikan objek hasil permintaan dalam bentuk JSON jika berhasil,
 *   atau `null` jika terjadi kesalahan dalam parsing respons.
 *
 * @example
 * // Contoh penggunaan:
 * apiGetAllVoting({
 *   kategori: "beranda",
 *   page: "1",
 *   search: "pemilu",
 *   status: "1",
 * }).then(data => console.log(data));
 */

export const apiGetAllVoting = async ({
  kategori,
  page,
  search,
  status,
}: {
  kategori: "beranda" | "status" | "kontribusi" | "riwayat";
  page: string;
  search?: string | null;
  status?: "1" | "2" | "3" | "4";
}) => {
  const respone = await fetch(
    `/api/voting/get?kategori=${kategori}&page=${page}&search=${search || ""}&status=${status || ""}`
  );
  return await respone.json().catch(() => null);
};

export const apiGetOneVotingById = async ({ id }: { id: string }) => {
  const respone = await fetch(`/api/voting/${id}`);
  return await respone.json().catch(() => null);
};

export const apiCheckKontributorToOneVoting = async ({
  id,
  kategori,
}: {
  id: string;
  kategori: "isKontributor" | "pilihan";
}) => {
  const respone = await fetch(
    `/api/voting/check?id=${id}&kategori=${kategori}`
  );
  return await respone.json().catch(() => null);
};

export const apiGetHasilVotingById = async ({ id }: { id: string }) => {
  const respone = await fetch(`/api/voting/hasil?id=${id}`);
  return await respone.json().catch(() => null);
};

export const apiGetKontributorById = async ({
  id,
  page,
}: {
  id: string;
  page: string;
}) => {
  const respone = await fetch(`/api/voting/kontributor?id=${id}&page=${page}`);
  return await respone.json().catch(() => null);
};

export const apiGetDaftarPilihanById = async ({ id }: { id: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/voting/${id}/daftar-pilihan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Failed to get daftar pilihan:",
        response.statusText,
        errorData
      );
      throw new Error(errorData?.message || "Failed to get daftar pilihan");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error get daftar pilihan", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
