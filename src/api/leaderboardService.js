import axiosInstance from "./axiosConfig";

export const fetchLeaderboard = async () => {
  const response = await axiosInstance.get("/leaderboard");
  return response.data;
};
