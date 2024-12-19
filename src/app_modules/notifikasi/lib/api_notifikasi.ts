import { API_RouteNotifikasi } from "@/app/lib/api_user_router/route_api_notifikasi";
import { ICategoryapp } from "../model/interface";

export const apiGetAllNotifikasiByCategory = async ({category, page}: {category: ICategoryapp; page: number}) => {
    const respone = await fetch(
      `/api/notifikasi/get-all-by-category?category=${category}&page=${page}`
    );

    return await respone.json().catch(() => null);
}