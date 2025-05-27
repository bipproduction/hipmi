// app/chat/[id]/page.tsx
"use client";

import React, { useState, useCallback } from "react";
import ChatWindow from "./chat_window";
import { useShallowEffect } from "@mantine/hooks";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
}

type Props = {
  params: {
    id: string;
  };
};

export default function ChatPage({ params }: Props) {
  const chatId = params.id;
  const currentUserId = "user_123"; // Ganti dengan dynamic user ID dari auth

  const [messages, setMessages] = useState<Message[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Load initial messages
  const loadInitialMessages = useCallback(async () => {
    const res = await fetch(`/api/messages?chatId=${chatId}`);
    const data = await res.json();
    if (data.length > 0) {
      setCursor(data[0]?.id); // Simpan cursor dari pesan pertama
    } else {
      setHasMore(false);
    }
    setMessages(data);
  }, [chatId]);

  // Load more messages (scroll up)
  const loadMoreMessages = useCallback(async () => {
    if (!hasMore || !cursor) return [];

    const res = await fetch(`/api/messages?chatId=${chatId}&cursor=${cursor}`);
    const data = await res.json();

    if (data.length < 20) setHasMore(false);
    if (data.length > 0) setCursor(data[0]?.id);

    setMessages((prev) => [...data, ...prev]);
    return data;
  }, [chatId, cursor, hasMore]);

  // Send message
  const sendMessage = useCallback(
    async (content: string) => {
      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          content,
          senderId: currentUserId,
          chatId,
        }),
      });
    },
    [chatId, currentUserId]
  );

  // Load pesan saat pertama kali
  useShallowEffect(() => {
    loadInitialMessages();
  }, [loadInitialMessages]);

  return (
    <ChatWindow
      initialMessages={messages}
      currentUserId={currentUserId}
      loadMoreMessages={loadMoreMessages}
      sendMessage={sendMessage}
    />
  );
}
