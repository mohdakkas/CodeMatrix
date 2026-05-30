import axiosInstance from "./axiosConfig";

export const submitCode = async ({ problemId, code, language }) => {
  const response = await axiosInstance.post("/submissions", {
    problemId,
    code,
    language,
  });
  return response.data;
};
