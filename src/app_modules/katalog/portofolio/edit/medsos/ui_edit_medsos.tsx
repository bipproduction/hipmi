"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Button, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  apiGetPortofolioById,
  apiUpdateMedsosPortofolioById,
} from "../../component/api_fetch_portofolio";
import { Portofolio_funEditMedsosById } from "../../fun/edit/fun_edit_medsos_bisnis_by_id";
import { MODEL_PORTOFOLIO_MEDSOS } from "../../model/interface";
import { clientLogger } from "@/util/clientLogger";

interface IUpdateMedson {
  facebook: string;
  instagram: string;
  tiktok: string;
  twitter: string;
  youtube: string;
}
export default function Portofolio_EditMedsosBisnis() {
  const params = useParams<{ id: string }>();
  const portofolioId = params.id;
  const router = useRouter();
  const [data, setData] = useState<MODEL_PORTOFOLIO_MEDSOS | null>(null);
  const [loading, setLoading] = useState(false);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetPortofolioById({ id: portofolioId });
      if (response.success) {
        setData(response.data.Portofolio_MediaSosial);
      }
    } catch (error) {
      clientLogger.error("Error Load Data Portofolio", error);
    }
  };

  const hanldeUpdateData = async (data: any) => {
    const newData: IUpdateMedson = {
      facebook: data.facebook,
      instagram: data.instagram,
      tiktok: data.tiktok,
      twitter: data.twitter,
      youtube: data.youtube,
    };

    const response = await apiUpdateMedsosPortofolioById({
      id: data.id,
      data: newData,
    });

    return response;
  };

  async function submitUpdate() {
    if (!data) {
      ComponentGlobal_NotifikasiGagal("Data tidak valid");
      return;
    }

    try {
      setLoading(true);

      const responseUpdate = await hanldeUpdateData(data);
      if (responseUpdate.success) {
        ComponentGlobal_NotifikasiBerhasil(responseUpdate.message);
        router.back();
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(responseUpdate.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error Update Medsos", error);
      ComponentGlobal_NotifikasiGagal("Error Update Medsos");
    }
  }

  if (!data) return <CustomSkeleton height={450} width={"100%"} />;

  return (
    <>
      {/* <pre>{JSON.stringify(dataMedsos, null, 2)}</pre> */}
      <ComponentGlobal_CardStyles>
        <Stack px={"sm"}>
          <TextInput
            styles={{
              label: {
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
            }}
            label="Facebook"
            value={data.facebook}
            placeholder="Facebook"
            onChange={(val) => {
              setData({
                ...data,
                facebook: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
            }}
            label="Instagram"
            value={data.instagram}
            placeholder="Instagram"
            onChange={(val) => {
              setData({
                ...data,
                instagram: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
            }}
            label="Tiktok"
            value={data.tiktok}
            placeholder="Tiktok"
            onChange={(val) => {
              setData({
                ...data,
                tiktok: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
            }}
            label="Twitter"
            value={data.twitter}
            placeholder="Twitter"
            onChange={(val) => {
              setData({
                ...data,
                twitter: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
            }}
            label="Youtube"
            value={data.youtube}
            placeholder="Youtube"
            onChange={(val) => {
              setData({
                ...data,
                youtube: val.target.value,
              });
            }}
          />

          <Button
            mt={"xl"}
            radius={"xl"}
            loading={loading ? true : false}
            loaderPosition="center"
            onClick={() => submitUpdate()}
            style={{
              backgroundColor: MainColor.yellow,
              border: `2px solid ${AccentColor.yellow}`,
              transition: "0.5s",
              color: "black",
            }}
          >
            Update
          </Button>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
