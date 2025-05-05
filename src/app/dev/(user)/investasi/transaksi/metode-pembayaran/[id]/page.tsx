import { funGlobal_getAllBank } from "@/app_modules/_global/fun/get/fun_get_all_bank";
import { Investasi_UiMetodePembayaran } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;
  const listBank = await funGlobal_getAllBank();

  return (
    <>
      <Investasi_UiMetodePembayaran listBank={listBank} investasiId={investasiId}  />
    </>
  );
}
