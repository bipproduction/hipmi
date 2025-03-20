import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Admin_ComponentBoxStyle } from "@/app_modules/admin/_admin_global/_component/comp_admin_boxstyle";
import { APIs, pathAssetImage } from "@/lib";
import { Center, Image } from "@mantine/core";
import { IconError404 } from "@tabler/icons-react";
import { data } from "autoprefixer";
import { useState } from "react";

export function AdminJob_ComponentImageView({ imageId }: { imageId: string }) {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  return (
    <>
      <Admin_ComponentBoxStyle>
        <Center h={"100%"}>
          {isError ? (
            <Image
              height={100}
              width={100}
              alt="Error image"
              src={pathAssetImage.no_image}
            />
          ) : (
            <Image
              onLoad={() => setLoading(false)}
              onError={() => {
                setError(true);
              }}
              alt="Foto"
              src={APIs.GET({ fileId: imageId })}
              mah={500}
              maw={300}
            />
          )}
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
