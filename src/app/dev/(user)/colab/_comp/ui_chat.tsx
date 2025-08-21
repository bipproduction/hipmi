// app/chat/[id]/page.tsx
"use client";

import { apiGetMessageByRoomId } from "@/app_modules/colab/_lib/api_collaboration";
import { useShallowEffect } from "@mantine/hooks";
import { ChatMessage } from "./interface";
import { useState } from "react";
import { ChatScrollArea } from "./ChatScrollArea";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";

export default function ChatPage({ params }: { params: { id: string } }) {
  const roomId = params.id;
  const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

   const [userLoginId, setUserLoginId] = useState<string | null>(null);
  
    useShallowEffect(() => {
      handleGetUserLoginId();
    }, []);
  
    async function handleGetUserLoginId() {
      try {
        const response = await apiNewGetUserIdByToken();
        if (response.success) {
          setUserLoginId(response.userId);
        } else {
          setUserLoginId(null);
        }
      } catch (error) {
        setUserLoginId(null);
      }
    }

  async function handleGetDataMessage() {
    try {
      const result = await apiGetMessageByRoomId({ id: roomId });
      setInitialMessages(result.data || []);
    } catch (error) {
      console.error("Failed to load messages", error);
    } finally {
      setLoading(false);
    }
  }
  useShallowEffect(() => {
    handleGetDataMessage();
  }, [roomId]);

  if (loading || !userLoginId) {
    return <div>Loading chat...</div>;
  }

  return (
    <ChatScrollArea
      initialMessages={initialMessages}
      currentUserId={userLoginId} // ganti dengan auth dinamis
      chatRoomId={roomId}
    />
  );
}
