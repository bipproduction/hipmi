import { ICategoryapp } from "@/app_modules/notifikasi/model/interface";

export const API_RouteNotifikasi = {
  get_all_by_category: ({
    category,
    page,
  }: {
    category: ICategoryapp;
    page: number;
  }) => `/api/notifikasi/get-all-by-category?category=${category}&page=${page}`,

  get_master_kategori: () => `/api/notifikasi/master`,

  get_count_by_id: () => `/api/notifikasi/count`,
};
