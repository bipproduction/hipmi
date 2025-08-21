// types/message.ts
export interface ChatUser {
  id: string;
  Profile: {
    id: string;
    name: string;
  };
}

export interface ChatMessage {
  id: string;
  message: string;
  isActive: boolean;
  createdAt: Date;
  isFile?: boolean | null;
  User: ChatUser | null;
}
