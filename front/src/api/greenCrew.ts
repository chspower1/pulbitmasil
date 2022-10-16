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
export async function createGreenCrewMember(crewId: number) {
  try {
    console.log(crewId);
    console.log(sessionStorage.getItem("userToken"));
    return await axiosInstance.post(`greencrew/${crewId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
