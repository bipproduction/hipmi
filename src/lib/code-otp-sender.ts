const sendCodeOtp = async ({
  nomor,
  codeOtp,
  newMessage,
}: {
  nomor: string;
  codeOtp?: string;
  newMessage?: string;
}) => {
  const msg = newMessage || `HIPMI - Kode ini bersifat RAHASIA dan JANGAN DI BAGIKAN KEPADA SIAPAPUN, termasuk anggota ataupun pengurus HIPMI lainnya.\n\n>> Kode OTP anda: ${codeOtp}.`;
  const enCode = encodeURIComponent(msg);
  const res = await fetch(
    `https://cld-dkr-prod-wajs-server.wibudev.com/api/wa/code?nom=${nomor}&text=${enCode}`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${process.env.WA_SERVER_TOKEN}`,
      },
    },
  );
  // const res = await fetch(
  //   `https://wa.wibudev.com/code?nom=${nomor}&text=HIPMI - Kode ini bersifat RAHASIA dan JANGAN DI BAGIKAN KEPADA SIAPAPUN, termasuk anggota ataupun pengurus HIPMI lainnya.
  //     \n
  //     >> Kode OTP anda: ${codeOtp}.
  //     `,
  // );

  return res;
};

export { sendCodeOtp as funSendToWhatsApp };
