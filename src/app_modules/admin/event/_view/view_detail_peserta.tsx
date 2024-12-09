"use client";

import { MODEL_EVENT_PESERTA } from "@/app_modules/event/model/interface";
import {
  Badge,
  Button,
  Center,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
} from "@mantine/core";
import { useState } from "react";
import { adminEvent_getListPesertaById } from "../fun";
import _ from "lodash";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";

export function AdminEvent_ViewDetailPeserta({
  dataPeserta,
  eventId,
}: {
  dataPeserta: any;
  eventId: string;
}) {
  const [data, setData] = useState<MODEL_EVENT_PESERTA[]>(dataPeserta.data);
  const [isNPage, setNPage] = useState(dataPeserta.nPage);
  const [isActivePage, setActivePage] = useState(1);


  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminEvent_getListPesertaById({
      eventId: eventId,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const tableRow = _.isEmpty(data)
    ? []
    : data.map((e, i) => (
        <tr key={i}>
          <td>
            <Center>{e?.User?.username}</Center>
          </td>
          <td>
            <Center>{e?.User?.Profile?.name}</Center>
          </td>
          <td>
            <Center>+{e?.User?.nomor}</Center>
          </td>
          <td>
            <Center>{e?.User?.Profile?.email}</Center>
          </td>
          <td>
            <Center>
              {e.isPresent ? (
                <Badge color="green">Hadir</Badge>
              ) : (
                <Badge color="red">Tidak Hadir</Badge>
              )}
            </Center>
          </td>
        </tr>
      ));

  return (
    <>
      <Paper p={"md"} withBorder shadow="lg" h={"75vh"}>
        <ScrollArea w={"100%"} h={"90%"}>
          <Table
            verticalSpacing={"md"}
            horizontalSpacing={"md"}
            p={"md"}
            w={"100%"}
            striped
            highlightOnHover
          >
            <thead>
              <tr>
                <th>
                  <Center>Username</Center>
                </th>
                <th>
                  <Center>Name</Center>
                </th>
                <th>
                  <Center>Nomor</Center>
                </th>
                <th>
                  <Center>Email</Center>
                </th>
                <th>
                  <Center>Konfirmasi Kehadiran</Center>
                </th>
              </tr>
            </thead>
            <tbody>{tableRow}</tbody>
          </Table>
          {_.isEmpty(data) ? (
            <ComponentAdminGlobal_IsEmptyData
              text="Tidak ada peserta"
              marginTop={100}
            />
          ) : (
            ""
          )}
        </ScrollArea>

        <Center mt={"xl"}>
          <Pagination
            value={isActivePage}
            total={isNPage}
            onChange={(val) => {
              onPageClick(val);
            }}
          />
        </Center>
      </Paper>

      {/* <pre>{JSON.stringify(dataPeserta, null, 2)}</pre> */}
    </>
  );
}
