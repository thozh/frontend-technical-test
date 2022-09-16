import apiClient from ".";
import { User } from "../types/user";

const getUsers = () => {
  return apiClient.get<User[]>("/users");
};

const getUser = (userId: number) => {
  return apiClient.get<User[]>(`/users/${userId}`);
};

const usersService = {
  getUsers,
  getUser,
};

export default usersService;
