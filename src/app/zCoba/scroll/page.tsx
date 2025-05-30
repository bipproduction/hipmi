"use client"

import React, { useState } from "react";
import InfiniteScroll from "./_comp/ui_scroll";
import { apiGetMessageByRoomId } from "@/app_modules/colab/_lib/api_collaboration";
import { ChatMessage } from "@/app/dev/(user)/colab/_comp/interface";

// Definisikan tipe data
interface User {
  id: number;
  name: string;
  email: string;
}



// Komponen App
function App() {
    const [data, setData] = useState<ChatMessage[]>([]);
  // Simulasi API call
  const fetchUsers = async (page: number): Promise<ChatMessage[]> => {
    const response = await apiGetMessageByRoomId({
      id: "cmb5x31dt0001tl7y7vj26pfy",
    });
    setData(response.data);
    return response.data;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Infinite Scroll with TypeScript</h1>
      <InfiniteScroll<ChatMessage>
        fetchFunction={fetchUsers}
        itemsPerPage={10}
        threshold={100}
        renderItem={(item) => (
          <div style={{ marginBottom: "10px" }}>
            <strong>{item.User?.Profile?.name}</strong> - {item.message}
          </div>
        )}
      />
    </div>
  );
}

export default App;
