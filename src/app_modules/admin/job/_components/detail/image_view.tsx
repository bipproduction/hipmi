import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Admin_ComponentBoxStyle } from "@/app_modules/admin/_admin_global/_component/comp_admin_boxstyle";
import { APIs } from "@/lib";
import { Center, Image } from "@mantine/core";
import { data } from "autoprefixer";
import { useState } from "react";

export function AdminJob_ComponentImageView({ imageId }: { imageId: string }) {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Admin_ComponentBoxStyle>
        <Center h={"100%"}>
          <Image
            onLoad={() => setLoading(false)}
            alt="Foto"
            src={APIs.GET({ fileId: imageId })}
            mah={500}
            maw={300}
          />
        </Center>
        {isLoading ? (
          <Center h={"100%"}>
            <ComponentGlobal_Loader size={30} variant="dots" />
          </Center>
        ) : (
          ""
        )}
      </Admin_ComponentBoxStyle>
    </>
  );
}
