// components/ChatWindow.tsx
import {
    Box,
    Button,
    Flex,
    ScrollArea,
    Text,
    TextInput
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import React, { useRef, useState } from "react";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
}

// components/ChatWindow.tsx

type Props = {
  initialMessages: Message[];
  currentUserId: string;
  loadMoreMessages: () => Promise<Message[]>;
  sendMessage: (content: string) => Promise<void>;
};

const ChatWindow: React.FC<Props> = ({
  initialMessages,
  currentUserId,
  loadMoreMessages,
  sendMessage,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Cek apakah scroll berada di bawah
  const checkIfAtBottom = () => {
    if (!scrollAreaRef.current || !messageContainerRef.current) return true;

    const container = scrollAreaRef.current;
    const offsetBottom =
      messageContainerRef.current.clientHeight -
      container.clientHeight -
      container.scrollTop;

    return offsetBottom < 50; // toleransi 50px
  };

  // Scroll ke bawah
  const scrollToBottom = () => {
    if (messageContainerRef.current && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop =
        messageContainerRef.current.clientHeight -
        scrollAreaRef.current.clientHeight;
    }
  };

  // Handle infinite scroll up
  const handleScroll = async () => {
    if (!scrollAreaRef.current) return;

    const { scrollTop } = scrollAreaRef.current;

    if (scrollTop === 0) {
      const newMessages = await loadMoreMessages();
      setMessages((prev) => [...newMessages, ...prev]);
    }

    // Cek apakah user di bottom
    const atBottom = checkIfAtBottom();
    setIsAtBottom(atBottom);
    setShowNewMessageIndicator(!atBottom);
  };

  // Kirim pesan
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Simpan pesan baru ke state
    const tempMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content: newMessage,
      senderId: currentUserId,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, tempMessage]);

    // Reset input
    setNewMessage("");

    // Kirim ke server
    await sendMessage(newMessage);

    // Jika user di bawah, scroll otomatis
    if (checkIfAtBottom()) {
      scrollToBottom();
    }
  };

  // Scroll otomatis saat komponen pertama kali di-render
  useShallowEffect(() => {
    scrollToBottom();
  }, []);

  // Tambah event listener scroll
  useShallowEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    scrollArea.addEventListener("scroll", handleScroll);
    return () => {
      scrollArea.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll otomatis jika user di bottom dan ada pesan baru
  useShallowEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages.length]);

  return (
    <Box h="100%" display="flex" style={{ flexDirection: "column" }}>
      {/* Area Chat */}
      <ScrollArea
        ref={scrollAreaRef}
        style={{ flex: 1, position: "relative" }}
        onScrollPositionChange={() => {}}
      >
        <div ref={messageContainerRef}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              p="sm"
              style={{
                textAlign: msg.senderId === currentUserId ? "right" : "left",
              }}
            >
              <Text
                bg={msg.senderId === currentUserId ? "blue" : "gray"}
                c="white"
                px="md"
                py="xs"
                // radius="lg"
                display="inline-block"
              >
                {msg.content}
              </Text>
            </Box>
          ))}
        </div>
      </ScrollArea>

      {/* Notifikasi Pesan Baru */}
      {!isAtBottom && showNewMessageIndicator && (
        <Button
          onClick={() => {
            scrollToBottom();
            setShowNewMessageIndicator(false);
          }}
          color="blue"
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Ada pesan baru
        </Button>
      )}

      {/* Input Pengiriman */}
      <Flex gap="sm" p="md" align="center">
        <TextInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.currentTarget.value)}
          placeholder="Ketik pesan..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          //   flex={1}
          style={{
            flex: 1,
          }}
        />
        <Button onClick={handleSendMessage}>Kirim</Button>
      </Flex>
    </Box>
  );
};

export default ChatWindow;
