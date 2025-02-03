import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from '@/app_modules/_global/ui';
import { ActionIcon } from '@mantine/core';
import React from 'react';

function Event_LayoutNominalSponsor({ children }: { children: React.ReactNode }) {
    return (
        <>
            <UIGlobal_LayoutTamplate
                header={<UIGlobal_LayoutHeaderTamplate title="Masukkan Nominal Sponsor"
                />}>
                {children}
            </UIGlobal_LayoutTamplate>
        </>
    );
}

export default Event_LayoutNominalSponsor;
