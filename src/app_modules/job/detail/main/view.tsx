"use client";

import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { clientLogger } from "@/util/clientLogger";
import { Button, Center, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetJobById } from "../../lib/api_fetch_job";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { MODEL_JOB } from "../../model/interface";

export default function Job_MainDetail() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_JOB | null>(null);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetJobById({
        id: param.id,
      });

      if (response.success) {

        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      clientLogger.error("Error get data job", error);
      setData(null);
    }
  };

  return (
    <>
      <Stack>
        <ComponentJob_DetailData data={data as any} />

        {/* {!data ? (
          <Center>
            <CustomSkeleton height={40} width={"50%"} radius={"xl"} />
          </Center>
        ) : (
          <ButtonAction jobId={param.id} />
        )} */}
      </Stack>
    </>
  );
}

function ButtonAction({ jobId }: { jobId: string }) {
  const [origin, setOrigin] = useState("");

  useShallowEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <>
      <Center>
        <Button
          radius={"xl"}
          color="teal"
          my={"lg"}
          leftIcon={<IconBrandWhatsapp />}
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            href={`whatsapp://send?text=Job Vacancy HIPMI BADUNG : ${origin}${RouterJob.job_vacancy_non_user({ id: jobId })}`}
          >
            Bagikan ke WhatsApp
          </Link>
        </Button>
      </Center>
    </>
  );
}
