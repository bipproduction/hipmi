import { Event_StatusPage } from "@/app_modules/event";
import {
  event_getAllByStatusId,
  event_getMasterStatus,
} from "@/app_modules/event/fun";

async function Page({ params }: { params: { id: string } }) {
  // let statusId = params.id;
  // const listStatus = await event_getMasterStatus();

  // const dataStatus = await event_getAllByStatusId({
  //   page: 1,
  //   statusId: statusId,
  // });

  return (
    <>
      <Event_StatusPage />
    </>
  );
}

export default Page;
