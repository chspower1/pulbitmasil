import axios from "axios";
import { PasswordForm, UserLoginForm, UserRegisterForm } from "@type/user";
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
    console.log(err);
    if (axios.isAxiosError(err) && err?.response?.status === 401) {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  }
}

export async function registerUser(newUser: UserRegisterForm) {
  try {
    const bodyData = JSON.stringify(newUser);
    console.log(`%cGET 요청 ${BASE_URL + "user/register"}`, "color: #a25cd1;");
    const { status } = await axiosInstance.post(`user/register`, bodyData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return status;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err) && err.response?.status === 400) {
      return err.response.status;
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

export async function changePassword(data: PasswordForm) {
  console.log(`%cPUT 요청 ${BASE_URL}/user/password`, "color: #a25cd1;");
  const { newPassword, password } = data;

  try {
    const { status } = await axiosInstance.put(
      `/user/password`,
      { newPassword, password },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      },
    );
    return status;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status === 406) {
      return err?.response?.status;
    }
  }
}
export async function resetPassword(email: string) {
  console.log(`%cPUT 요청 ${BASE_URL}/user/reset`, "color: #a25cd1;");

  try {
    const { status } = await axiosInstance.put(`/user/reset`, { email });
    return status;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status === 402) {
      return err?.response?.status;
    }
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
