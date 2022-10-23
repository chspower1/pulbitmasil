import axios from "axios";
import { User, PasswordForm, UserLoginForm, UserRegisterForm } from "@type/user";
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
    return data;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err) && err?.response?.status === 401) {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
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
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function registerUser(newUser: UserRegisterForm) {
  try {
    const bodyData = JSON.stringify(newUser);
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
  try {
    const { data } = await axiosInstance.get(`auth/kakao?code=${code}`);
    sessionStorage.setItem("userToken", data.token);
    return data;
  } catch (err) {
    console.log(err);
  }
}
export async function naverLogin(accessToken: string, stateToken: string) {
  try {
    const { data } = await axiosInstance.get(`auth/naver?access_token=${accessToken}&state_token=${stateToken}`);
    sessionStorage.setItem("userToken", data.token);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function changePassword(data: PasswordForm) {
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
  try {
    const { status } = await axiosInstance.put(`user/reset`, { email });
    return status;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status === 402) {
      return err?.response?.status;
    }
  }
}

export async function changeName(name: string) {
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
