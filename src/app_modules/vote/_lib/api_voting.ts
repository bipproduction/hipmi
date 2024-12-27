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
