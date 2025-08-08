import instance from "./api.service"

export const getAllBooks = async () => {
  const response = await instance.get("books");
  return response.data;
}
