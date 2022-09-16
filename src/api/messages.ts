import { Message } from "../types/message";
import apiClient from "./index";

const getMessages = (conversationId: string) => {
  return apiClient.get<Message[]>(`/messages/${conversationId}`);
};

const sendMessage = ({
  conversationId,
  body,
  authorId,
}: Omit<Message, "id" | "timestamp">) => {
  return apiClient.post(`/messages/${conversationId}`, {
    authorId,
    body,
    timestamp: Date.now(),
    conversationId,
  });
};

const deleteMessage = (messageId: string) => {
  return apiClient.delete(`/messages/${messageId}`);
};

const messagesService = {
  getMessages,
  sendMessage,
  deleteMessage,
};

export default messagesService;
