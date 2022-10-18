import GreenCrew from "@pages/GreenCrew";
import { IGreenCrew } from "@type/greenCrew";
import { axiosInstance } from "./axiosInstance";

export async function getGreenCrews() {
  try {
    const { data }: { data: IGreenCrew[] } = await axiosInstance.get("greencrew");
    console.log("API", data);
    const result = data.map(greenCrew => {
      const newTrafficInfo = greenCrew.trafficInfo.replaceAll("\\r", "").replaceAll("\\n", "");
      console.log("old : ", greenCrew.trafficInfo);
      console.log("new : ", newTrafficInfo);
      const newGreenCrew = { ...greenCrew, trafficInfo: newTrafficInfo };
      return newGreenCrew;
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}
export async function createGreenCrewMember(crewId: number) {
  try {
    console.log(crewId);
    console.log(sessionStorage.getItem("userToken"));
    return await axiosInstance.get(`greencrew/${crewId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
export async function deleteGreenCrewMember(crewId: number) {
  try {
    console.log(crewId);
    console.log(sessionStorage.getItem("userToken"));
    return await axiosInstance.delete(`greencrew/${crewId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
