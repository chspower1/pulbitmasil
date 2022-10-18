import axios from "axios";
import { UserLoginForm, UserRegisterForm } from "@type/user";
import { Cpi, IDodream } from "@type/dodream";
import { axiosInstance, BASE_URL } from "./axiosInstance";

export async function requestLogin(loginInfo: UserLoginForm) {
  const bodyData = JSON.stringify(loginInfo);

  try {
    const { data } = await axiosInstance.post(`user/login`, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`, // 왜넣어줬지?
      },
    });
    console.log("test------------", data);
    if (!data) return false;
    sessionStorage.setItem("userToken", data.token);
    // console.log("풀빛마실로그인", data);
    return data;
  } catch (err) {
    console.log(err)
    if (axios.isAxiosError(err) && err?.response?.status === 401) {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  }
}

export async function registerUser(newUser: UserRegisterForm) {
  try {
    const bodyData = JSON.stringify(newUser);
    console.log(`%cGET 요청 ${BASE_URL + "user/register"}`, "color: #a25cd1;");
    return await axiosInstance.post(`user/register`, bodyData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err) && err.response?.status === 400) {
      alert("이미 가입된 이메일 입니다. 다른 이메일로 가입해 주세요.");
    }
  }
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
  try {
    console.log(`%cPUT 요청 ${BASE_URL}/user/reset`, "color: #a25cd1;");

    const { data } = await axiosInstance.put(`/user/reset`, { email });
    alert("이메일이 발송되었습니다.")
    return data.success;

  } catch (err) {
    console.log(err);
  }
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
