import { Register } from "@/app_modules/auth";
import { auth_getCodeOtpByNumber } from "@/app_modules/auth/fun/get_kode_otp_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let otpId = params.id;
  const dataOtp = await auth_getCodeOtpByNumber({ kodeId: otpId });
  return <Register />;
}
