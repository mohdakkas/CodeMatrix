import axiosInstance from "./axiosConfig";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const register = async (payload) => {
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};
