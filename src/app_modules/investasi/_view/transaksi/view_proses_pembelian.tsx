import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  Box,
  Button,
  Center,
  Divider,
  Group,
  NumberInput,
  Text,
} from "@mantine/core";
import { useFocusTrap, useLocalStorage } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NEW_RouterInvestasi } from "../../../../lib/router_hipmi/router_investasi";
import { MODEL_INVESTASI } from "../../_lib/interface";
import { gs_investas_menu } from "../../g_state";

export function Investasi_ViewProsesPembelian({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const focusTrapRef = useFocusTrap();
  const [data, setData] = useState(dataInvestasi);
  const [maxPembelian, setMaxPembelian] = useState(Number(data.sisaLembar));
  const [total, setTotal] = useLocalStorage({
    key: "total_investasi",
    defaultValue: 0,
  });
  const [jumlah, setJumlah] = useLocalStorage({
    key: "jumlah_investasi",
    defaultValue: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Box
        style={{
          padding: "15px",
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px",
          color: "white",
          marginBottom: "15px",
        }}
      >
        {/* Sisa Lembar Saham */}
        <Group position="apart" mb={"md"}>
          <Text c={MainColor.white}>Sisa Lembar Saham</Text>
          <Text c={MainColor.white} fz={23}>
            {new Intl.NumberFormat("id-ID", {
              maximumFractionDigits: 10,
            }).format(+data.sisaLembar)}{" "}
          </Text>
        </Group>

        {/* Harga perlembar saham */}
        <Group position="apart" mb={"md"}>
          <Text c={MainColor.white}>Harga Perlembar</Text>
          <Text c={MainColor.white} fz={23}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID", {
              maximumFractionDigits: 10,
            }).format(+data.hargaLembar)}{" "}
          </Text>
        </Group>

        {/* Lembar saham */}
        <Group position="apart" mb={"md"}>
          <Box>
            <Text c={MainColor.white}>Jumlah Pembelian</Text>
            <Text c={"blue"} fs={"italic"} fz={10}>
              minimal pembelian 10 lembar
            </Text>
          </Box>
          <NumberInput
            styles={{ input: { backgroundColor: MainColor.white } }}
            type="number"
            ref={focusTrapRef}
            w={100}
            max={maxPembelian}
            min={0}
            value={jumlah}
            onChange={(val: any) => {
              setTotal(val * +data.hargaLembar);
              setJumlah(val);
              // console.log(val);
            }}
          />
        </Group>

        <Divider color={MainColor.white} my={"lg"} />

        <Group position="apart" mb={"md"}>
          <Box>
            <Text c={MainColor.white}>Total Harga</Text>
          </Box>
          <Text c={MainColor.white} fz={25}>
            Rp.{" "}
            {new Intl.NumberFormat("id-ID", {
              maximumFractionDigits: 10,
            }).format(total)}
          </Text>
        </Group>

        <Center>
          <Button
            loaderPosition="center"
            loading={isLoading}
            disabled={jumlah < 10}
            w={350}
            radius={50}
            onClick={() => {
              router.push(NEW_RouterInvestasi.metode_pembayaran + data.id, {
                scroll: false,
              });
              setIsLoading(true)
            }}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            style={{
              transition: "0.5s",
            }}
          >
            Beli
          </Button>
        </Center>
      </Box>
    </>
  );
}
