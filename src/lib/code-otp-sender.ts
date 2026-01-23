const sendCodeOtp = async ({
  nomor,
  codeOtp,
}: {
  nomor: string;
  codeOtp: string;
}) => {
  const msg = `HIPMI%20-%20Kode%20ini%20bersifat%20RAHASIA%20dan%20JANGAN%20DI%20BAGIKAN%20KEPADA%20SIAPAPUN%2C%20termasuk%20anggota%20ataupun%20pengurus%20HIPMI%20lainnya.%20Kode%20OTP%20anda%3A%20${codeOtp}.`;
  const res = await fetch(
    `https://cld-dkr-prod-wajs-server.wibudev.com/api/wa/code?nom=${nomor}&text=${msg}`,
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

export { sendCodeOtp };
