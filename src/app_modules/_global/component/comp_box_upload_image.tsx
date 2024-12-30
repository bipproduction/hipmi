import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Box } from "@mantine/core";
import { MainColor } from "../color";

/**
 * 
 * @param  children
 * @tutorial | 
* <AspectRatio ratio={1 / 1}  mt={5} maw={300} mx={"auto"} >
<Image
style={{ maxHeight: 250 }}
alt="Avatar"
src={image ? image : APIs.GET({ fileId: <imageId> })}/>
* </AspectRatio> 
 * @returns folllow like this
 */
export function ComponentGlobal_BoxUploadImage({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles height={height ? height : 300} >
        <Box
          style={{
            height: "100%",
            borderStyle: "dashed",
            borderRadius: "5px",
            borderColor: MainColor.white,
          }}
        >
          {children}
        </Box>
      </ComponentGlobal_CardStyles>
    </>
  );
}
