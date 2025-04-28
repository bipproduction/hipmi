import { Admin_V3_ComponentBreakpoint } from "@/app_modules/admin/_components_v3/comp_simple_grid_breakpoint";
import Event_ComponentBoxDaftarPeserta from "../detail/comp_box_daftar_peserta";
import Event_ComponentBoxDaftarSponsor from "../detail/comp_box_sponsor";

export const Event_ComponentDaftarPesertaDanSponsor = () => {
  return (
    <>
      <Admin_V3_ComponentBreakpoint>
        <Event_ComponentBoxDaftarPeserta />
        {/* <Event_ComponentBoxDaftarSponsor /> */}
      </Admin_V3_ComponentBreakpoint>
    </>
  );
};
