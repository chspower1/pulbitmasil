import axios from "axios";
import { UserLoginForm, UserRegisterForm } from "@type/user";
import { Cpi, IDodream } from "@type/dodream";

const BASE_URL = `http://${window.location.hostname}:5001`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function requestLogin(loginInfo: UserLoginForm) {
  const bodyData = JSON.stringify(loginInfo);

  try {
    const { data } = await axiosInstance.post(`user/login`, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    if (!data) return false;
    sessionStorage.setItem("userToken", data.token);
    // console.log("풀빛마실로그인", data);
    return data;
  } catch (err) {
    // alert("로그인 정보가 옳지 않습니다!");
    console.log(err);
  }
}

export async function registerUser(newUser: UserRegisterForm) {
  const bodyData = JSON.stringify(newUser);
  // console.log(`%cGET 요청 ${BASE_URL + "user/register"}`, "color: #a25cd1;");

  return axiosInstance.post(`user/register`, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function kakaoLogin(code: string) {
  // console.log(`%cGET 요청 ${BASE_URL}auth/kakao?code=${code}`, "color: #a25cd1;");
  const { data } = await axiosInstance.get(`auth/kakao?code=${code}`);
  sessionStorage.setItem("userToken", data.token);
  // console.log("카카오로그인", data);
  return data;
}
export async function naverLogin(accessToken: string, stateToken: string) {
  const { data } = await axiosInstance.get(`auth/naver?access_token=${accessToken}&state_token=${stateToken}`);
  sessionStorage.setItem("userToken", data.token);
  // console.log("네이버로그인", data);
  return data;
}

export async function WalkingData(params: any) {
  const { data } = await axiosInstance.get(`walk`);
  // console.log(data);
  return data;
}

export async function getDodream() {
  try {
    const { data } = await axiosInstance.get(`dodream`);
    console.log("get", data);
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
