import adminColab_getOneRoomChatById from "@/app_modules/admin/colab/fun/get/get_one_room_chat_by_id";
import Colab_NewGroupChatView from "@/app_modules/colab/detail/group/new_detail_group";
import colab_getMessageByRoomId from "@/app_modules/colab/fun/get/room_chat/get_message_by_room_id";
import _ from "lodash";
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const roomId = params.id;
  // const userLoginId = await funGetUserIdByToken();
  // const dataUserLogin = await user_getOneByUserId(userLoginId as string);

  const getData = (await adminColab_getOneRoomChatById({ roomId: roomId }))
    .data;
  const dataRoom = _.omit(getData, [
    "ProjectCollaboration",
    "ProjectCollaboration_AnggotaRoomChat",
  ]);

  let listMsg = await colab_getMessageByRoomId({ roomId: roomId, page: 1 });

  return (
    <>
      {/* <Colab_GroupChatView
        userLoginId={userLoginId as string}
        listMsg={listMsg}
        selectRoom={dataRoom as any}
        dataUserLogin={dataUserLogin as any}
      /> */}

      <Colab_NewGroupChatView selectRoom={dataRoom as any} listMsg={listMsg} />
      {/* <ChatPage params={{ id: roomId }} /> */}
    </>
  );
}
