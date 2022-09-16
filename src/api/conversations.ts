import { Conversation } from "../types/conversation";
import apiClient from "./index";

const getConversations = (userId: number) => {
  return apiClient.get<Conversation[]>(`/conversations/${userId}`);
};

const createConversation = (userId: number, recipientId: number) => {
  return apiClient.post(`/conversations/${userId}`, { recipientId });
};

const deleteConversation = (conversationId: number) => {
  return apiClient.delete(`/conversations/${conversationId}`);
};

const conversationsService = {
  getConversations,
  createConversation,
  deleteConversation,
};

export default conversationsService;
