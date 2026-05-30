import axiosInstance from "./axiosConfig";

export const fetchContests = async () => {
  const response = await axiosInstance.get("/contests");
  return response.data;
};
