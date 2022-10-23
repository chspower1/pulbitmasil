import GreenCrew from "@pages/GreenCrew";
import { IGreenCrew } from "@type/greenCrew";
import { axiosInstance } from "./axiosInstance";

export async function getGreenCrews() {
  try {
    const { data }: { data: IGreenCrew[] } = await axiosInstance.get("greencrew");
    const result = data.map(greenCrew => {
      const newTrafficInfo = greenCrew.trafficInfo.replace(/\\r|\\n/g, "");
      const newContent = greenCrew.content.replace(/\\r|\\n/g, "");
      const newGreenCrew = { ...greenCrew, trafficInfo: newTrafficInfo, content: newContent };
      return newGreenCrew;
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}
export async function createGreenCrewMember(crewId: number) {
  try {
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
    return await axiosInstance.delete(`greencrew/${crewId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function getSummaryGreenCrews() {
  try {
    const { data } = await axiosInstance.get("greencrew/summary");
    return data;
  } catch (err) {
    console.log(err);
  }
}
