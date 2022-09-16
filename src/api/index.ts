import axios from "axios";

const rootUrl = "http://localhost:3005";

const apiClient = axios.create({
  baseURL: rootUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;