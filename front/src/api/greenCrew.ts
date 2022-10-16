import { axiosInstance } from "./axiosInstance";

export async function getGreenCrews() {
  try {
    const { data } = await axiosInstance.get("greencrew");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
