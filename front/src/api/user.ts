import axios from "axios";
import { UserLoginForm, UserRegisterForm } from "@type/user";
import { Cpi, IDodream } from "@type/dodream";

export const BASE_URL = `http://${window.location.hostname}:5001`;

export const axiosInstance = axios.create({
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
