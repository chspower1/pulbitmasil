import { Cpi, IDodream } from "@type/dodream";
import { axiosInstance } from "./axiosInstance";

export async function getDodream() {
  try {
    const { data } = await axiosInstance.get(`dodream`);
    console.log(data);
    const dodream: IDodream[] = [];
    data.map((road: any) => {
      const nameArr = Object.keys(road.course_name) as string[];
      nameArr.map((name, mapIndex) => {
        // console.log(road.course_category_nm, index, name);
        const index = mapIndex;
        const course_category_nm = road.course_category_nm as string;
        const course_name = name as string;
        const distance = String(Math.round(road.course_name[name][0].distance * 10) / 10) + "km";
        const area_gu = road.course_name[name][0].area_gu as string;
        const lead_time = road.course_name[name][0].lead_time as number;
        const course_level = road.course_name[name][0].course_level as number;
        const content = road.course_name[name][0].content as string;
        const detail_course = road.course_name[name][0].detail_course as string;
        const reg_date = road.course_name[name][0].reg_date as number;
        const relate_subway = road.course_name[name][0].relate_subway as string;
        const traffic_info = road.course_name[name][0].traffic_info as string;
        const cpi = road.course_name[name][0].CPI as Cpi[];
        const newRoad = {
          index,
          course_category_nm,
          course_name,
          area_gu,
          content,
          course_level,
          detail_course,
          distance,
          lead_time,
          reg_date,
          relate_subway,
          traffic_info,
          cpi,
        };
        dodream.push(newRoad);
      });
    });
    return dodream;
  } catch (err) {
    console.log("getDodream Error", err);
  }
}
