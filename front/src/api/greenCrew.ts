import { axiosInstance } from "./user";

export async function getGreenCrews() {
  try {
    const { data } = await axiosInstance.get("greencrew");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
