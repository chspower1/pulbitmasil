import { axiosInstance } from "./user";

export async function getGreenCrews() {
  try {
    const { data } = await axiosInstance.get("greenCrew");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
