import { AccentColor } from "@/app_modules/_global/color";
import { clientLogger } from "@/util/clientLogger";
import { Center, Button } from "@mantine/core";
import { useState } from "react";
import { apiGetAllForum } from "../api_fetch_forum";

export function ButtonUpdateBeranda({
  countNewPost,
  onSetData,
  onSetIsNewPost,
  onSetCountNewPosting,
}: {
  countNewPost: number;
  onSetData: (val: any) => void;
  onSetIsNewPost: (val: any) => void;
  onSetCountNewPosting: (val: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadData = async (isSearch: string) => {
    try {
      setIsLoading(true);

      const response = await apiGetAllForum({
        page: `1`,
        search: isSearch,
      });

      if (response) {
        onSetData(response.data);
        onSetIsNewPost(false);
        setIsLoading(false);
        onSetCountNewPosting(0);
      }
    } catch (error) {
      setIsLoading(false);
      clientLogger.error("Error get data forum", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Center>
        <Button
          style={{
            transition: "0.5s",
            border: `1px solid ${AccentColor.skyblue}`,
          }}
          bg={AccentColor.blue}
          loaderPosition="center"
          loading={isLoading ? true : false}
          radius={"xl"}
          opacity={0.5}
          onClick={() => handleLoadData("")}
        >
          Update beranda + {countNewPost}
        </Button>
      </Center>
    </>
  );
}
