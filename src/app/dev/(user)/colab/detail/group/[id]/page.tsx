import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import adminColab_getOneRoomChatById from "@/app_modules/admin/colab/fun/get/get_one_room_chat_by_id";
import { Colab_GroupChatView } from "@/app_modules/colab";
import colab_getMessageByRoomId from "@/app_modules/colab/fun/get/room_chat/get_message_by_room_id";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  const roomId = params.id;
  const userLoginId = await funGetUserIdByToken();

  const getData = (await adminColab_getOneRoomChatById({ roomId: roomId }))
    .data;
  const dataRoom = _.omit(getData, [
    "ProjectCollaboration",
    "ProjectCollaboration_AnggotaRoomChat",
  ]);


  let listMsg = await colab_getMessageByRoomId({ roomId: roomId, page: 1 });
  const dataUserLogin = await user_getOneByUserId(userLoginId as string);

  return (
    <>
      {/* <Colab_DetailGrupDiskusi
        userLoginId={userLoginId}
        listMsg={listMsg}
        selectRoom={dataRoom as any}
        dataUserLogin={dataUserLogin as any}
        roomId={roomId}
      /> */}

      <Colab_GroupChatView
        userLoginId={userLoginId as string}
        listMsg={listMsg}
        selectRoom={dataRoom as any}
        dataUserLogin={dataUserLogin as any}
      />
    </>
  );
}
