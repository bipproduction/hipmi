"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { Button, Center, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { MODEL_JOB } from "../../model/interface";

export default function Job_MainDetail({ dataJob }: { dataJob: MODEL_JOB }) {
  return (
    <>
      <Stack>
        <ComponentJob_DetailData data={dataJob} />
        <ButtonAction jobId={dataJob.id} />
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
