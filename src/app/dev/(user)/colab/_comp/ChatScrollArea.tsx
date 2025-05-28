/* eslint-disable react-hooks/exhaustive-deps */
// components/ChatScrollArea.tsx

import React, { useEffect, useRef, useState } from "react";
import { ScrollArea, Box, Button, Text } from "@mantine/core";
import { ChatMessage } from "./interface";
import { apiGetMessageByRoomId } from "@/app_modules/colab/_lib/api_collaboration";

interface ChatScrollAreaProps {
  initialMessages: ChatMessage[];
  currentUserId: string;
  chatRoomId: string;
}

export const ChatScrollArea: React.FC<ChatScrollAreaProps> = ({
  initialMessages,
  currentUserId,
  chatRoomId,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [hasMore, setHasMore] = useState(true);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const lastMessageIdRef = useRef<string | null>(null);

  //   Auto scroll to bottom on first render
  useEffect(() => {
    scrollToBottom();
  }, []);

  //   // Infinite Scroll Up - Load Older Messages
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMoreMessages();
        }
      },
      { root: scrollAreaRef.current }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" });
      }
    }, 100);
  };

  const [loadingMore, setLoadingMore] = useState(false);

const loadMoreMessages = async () => {
  console.log("Triggered loadMoreMessages");
  console.log("Current lastMessageId:", lastMessageIdRef.current);

  if (!hasMore || loadingMore) return;

  setLoadingMore(true);
  try {
    const result = await apiGetMessageByRoomId({
      id: chatRoomId,
      lastMessageId: lastMessageIdRef.current || undefined,
    });

    console.log("API Response:", result);

    if (!result.success || !result.data || result.data.length === 0) {
      console.log("No more data from API");
      setHasMore(false);
      return;
    }

    const olderMessages = result.data;
    const existingIds = new Set(messages.map((m) => m.id));
    const filtered = olderMessages.filter((msg: ChatMessage) => !existingIds.has(msg.id));

    console.log("Filtered Messages:", filtered);

    if (filtered.length === 0) {
      console.log("All messages already loaded");
      setHasMore(false);
      return;
    }

    lastMessageIdRef.current = filtered[0]?.id;
    setMessages((prev) => [...prev, ...filtered]);
  } catch (error) {
    console.error("Failed to load more messages", error);
    setHasMore(false);
  } finally {
    setLoadingMore(false);
  }
};;

  //   const sendMessage = async (content: string) => {
  //     try {
  //       const res = await fetch("/api/chat/send", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           content,
  //           chatRoomId,
  //         }),
  //       });

  //       const result = await res.json();

  //       if (result.success) {
  //         const newMessage = result.data;
  //         setMessages((prev) => [...prev, newMessage]);
  //         scrollToBottom();
  //       }
  //     } catch (error) {
  //       console.error("Error sending message", error);
  //     }
  //   };

  // const handleScrollToBottomClick = () => {
  //   scrollToBottom();
  //   setShowNewMessageIndicator(false);
  // };

  // Simulasi menerima pesan baru (misalnya via WebSocket atau polling)
  //   const handleIncomingMessage = (newMessage: ChatMessage) => {
  //     if (newMessage.User?.id !== currentUserId) {
  //       const isScrolledToBottom =
  //         scrollAreaRef.current &&
  //         scrollAreaRef.current.scrollHeight -
  //           scrollAreaRef.current.clientHeight <=
  //           scrollAreaRef.current.scrollTop + 100;

  //       if (!isScrolledToBottom) {
  //         setShowNewMessageIndicator(true);
  //       } else {
  //         setMessages((prev) => [...prev, newMessage]);
  //         scrollToBottom();
  //       }
  //     } else {
  //       setMessages((prev) => [...prev, newMessage]);
  //       scrollToBottom();
  //     }
  //   };

  

  return (
    <Box style={{ height: "100%" }}>
      {/* Scroll Area */}
      <ScrollArea viewportRef={scrollAreaRef} h="30vh">
        <Box style={{ display: "flex", flexDirection: "column-reverse" }}>
          {hasMore && (
            <Text align="center" ref={loaderRef}>
              {loadingMore ? "Loading..." : "Load more"}
            </Text>
          )}

          {messages.map((msg) => (
            <Box
              key={msg.id}
              p="sm"
              mb="xs"
              bg={msg.User?.id === currentUserId ? "blue.1" : "gray.1"}
              style={{
                alignSelf:
                  msg.User?.id === currentUserId ? "flex-end" : "flex-start",
                maxWidth: "70%",
                borderRadius: 8,
                padding: "8px 12px",
              }}
            >
              <Text>{msg.message}</Text>
            </Box>
          ))}

          <div ref={messagesEndRef} />
        </Box>
      </ScrollArea>

      {/* Tombol Scroll ke Bawah jika ada pesan baru */}
      {showNewMessageIndicator && (
        <Button
          //   onClick={handleScrollToBottomClick}
          fullWidth
          mt="md"
          color="blue"
        >
          New Messages
        </Button>
      )}

      {/* Form Kirim Pesan */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem(
            "message"
          ) as HTMLInputElement;
          if (input.value.trim()) {
            // sendMessage(input.value);
            input.value = "";
          }
        }}
      >
        <Box display="flex" p="sm" mt="md">
          <input
            name="message"
            placeholder="Type a message..."
            style={{ flex: 1 }}
          />
          <button type="submit">Send</button>
        </Box>
      </form>
    </Box>
  );
};
