import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentInvestasi_CardStatus } from "../component/detail/card_status";
import { MODEL_INVESTASI } from "../_lib/interface";

export default function Reject({ data }: { data: MODEL_INVESTASI[] }) {
  const [investasi, setInvestasi] = useState(data);
  const router = useRouter();

  if (_.isEmpty(data)) return <ComponentGlobal_IsEmptyData />;

  return (
    <>
      {investasi.map((e) => (
        <Box key={e.id}>
          <ComponentInvestasi_CardStatus
            data={e}
            path={RouterInvestasi_OLD.detail_reject}
          />
        </Box>
      ))}
    </>
  );
}
