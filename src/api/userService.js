import axiosInstance from "./axiosConfig";

export const fetchCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const fetchMySubmissions = async () => {
  const response = await axiosInstance.get("/submissions/my");
  return response.data;
};
