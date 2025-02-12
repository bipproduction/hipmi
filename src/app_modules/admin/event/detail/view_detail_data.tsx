import { SimpleGrid } from '@mantine/core';
import React, { useState } from 'react';
import ComponentEvent_DetailDataAuthor from '../_component/detail_data_author';
import ComponentEvent_DetailDataEvent from '../_component/detail_data_event';
import { useParams } from 'next/navigation';
import { apiGetAdminDetailEventById } from '../_lib/api_fecth_admin_event';
import { MODEL_EVENT } from '@/app_modules/event/_lib/interface';
import { clientLogger } from '@/util/clientLogger';
import { useShallowEffect } from '@mantine/hooks';

function AdminEvent_ViewDetailData({ }) {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MODEL_EVENT | null>(null);

  useShallowEffect(() => {
    getDetailData();
  }, [])
  async function getDetailData() {
    try {
      setLoading(true);
      const response = await apiGetAdminDetailEventById({
        id: params.id,
      })

      if (response?.success && response?.data) {
        setTimeout(() => {
          setData(response.data);
        }, 1000)
      } else {
        console.error("Invalid data format received:", response);
        setData(null);
      }
    } catch (error) {
      clientLogger.error("Error get data table detail publish", error);
      setData(null);
    }
  }
  return (
    <>
      <SimpleGrid
        cols={2}
        breakpoints={[
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {/* //Data Author */}
        <ComponentEvent_DetailDataAuthor data={data}/>

        {/* Data Event */}
        <ComponentEvent_DetailDataEvent data={data} />

      </SimpleGrid>
    </>
  );
}

export default AdminEvent_ViewDetailData;
