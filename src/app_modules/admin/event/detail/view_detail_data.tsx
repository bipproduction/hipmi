import { SimpleGrid } from '@mantine/core';
import React from 'react';
import ComponentEvent_DetailDataAuthor from '../_component/detail_data_author';
import ComponentEvent_DetailDataEvent from '../_component/detail_data_event';

function AdminEvent_ViewDetailData({ }) {
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
        <ComponentEvent_DetailDataAuthor />
        
        {/* Data Event */}
        <ComponentEvent_DetailDataEvent/>

      </SimpleGrid> 
    </>
  );
}

export default AdminEvent_ViewDetailData;
