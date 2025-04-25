import { Text } from "@mantine/core";
import dynamic from "next/dynamic";

export const ReactQuillDynamic = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // Tidak perlu import CSS dengan import statement
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
    loading: () => (
      <Text fs={"italic"} c={"gray.8"} fz={12}>
        Ketik pesan di sini atau tambahkan stiker...
      </Text>
    ),
  }
);
