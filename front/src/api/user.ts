import axios from "axios";
import { User, UserLoginForm, UserRegisterForm } from "@type/user";
import { Cpi, IDodream } from "@type/dodream";
import { axiosInstance, BASE_URL } from "./axiosInstance";

export async function requestLogin(loginInfo: UserLoginForm) {
  const bodyData = JSON.stringify(loginInfo);

  try {
    const { data } = await axiosInstance.post(`user/login`, bodyData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    sessionStorage.setItem("userToken", data.token);
    console.log("풀빛마실로그인", data);
    return data;
  } catch (err) {
    // alert("로그인 정보가 옳지 않습니다!");
    console.log(err);
  }
}
export async function getUser() {
  try {
    const { data: user }: { data: User } = await axiosInstance.get(`user/mypage`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    console.log("유저정보 받아오기 ", user);
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function registerUser(newUser: UserRegisterForm) {
  const bodyData = JSON.stringify(newUser);
  console.log(`%cGET 요청 ${BASE_URL + "user/register"}`, "color: #a25cd1;");

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

export async function changePassword(password: string) {
  console.log(`%cPUT 요청 ${BASE_URL}/user/password`, "color: #a25cd1;");

  return axiosInstance.put(
    `/user/password`,
    { password },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    },
  );
}
export async function resetPassword(email: string) {
  console.log(`%cPUT 요청 ${BASE_URL}/user/reset`, "color: #a25cd1;");

  const { data } = await axiosInstance.put(`/user/reset`, { email });
  return data.success;
}

export async function changeName(name: string) {
  console.log(`%cPUT 요청 ${BASE_URL}/user/name`, "color: #a25cd1;");

  return axiosInstance.put(
    `user/name`,
    { name },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    },
  );
}
