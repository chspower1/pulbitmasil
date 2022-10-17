import GreenCrew from "@pages/GreenCrew";
import { IGreenCrew } from "@type/greenCrew";
import { axiosInstance } from "./axiosInstance";

export async function getGreenCrews() {
  try {
    const { data } = await axiosInstance.get("greencrew");
    console.log(data);
    // data.map(greenCrew => {
    //   return { ...greenCrew };
    // });
    return data;
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
