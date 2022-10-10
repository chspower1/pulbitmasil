import axios from "axios";
import { Review } from "src/types/review";
import { UserLoginForm, UserRegisterForm } from "src/types/user";

const BASE_URL = "http://localhost:5001";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// interface getProps {
//   name: string;
//   option?: string;
// }
// export async function getInfo({ name, option }: getProps) {
//   try {
//     if (!option) option = "";
//     console.log(`${BASE_URL}/${name}/${option}`);
//     const { data } = await (await axiosInstance.get(`${name}/${option}`)).json();
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

//토큰을 가지고있음을 헤더에 알려주는코드
// function setAuthorizationToken(token: any) {
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete axios.defaults.headers.common["Authorization"];
//   }
// }

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
    console.log("풀빛마실로그인", data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function registerUser(newUser: UserRegisterForm) {
  const bodyData = JSON.stringify(newUser);
  console.log(`%cGET 요청 ${BASE_URL + "user/register"}`, "color: #a25cd1;");

  return axiosInstance.post(`/user/register`, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function kakaoLogin(code: string) {
  console.log(`%cGET 요청 ${BASE_URL}/auth/kakao?code=${code}`, "color: #a25cd1;");
  const { data } = await axiosInstance.get(`auth/kakao?code=${code}`);
  sessionStorage.setItem("userToken", data.token);
  console.log("카카오로그인", data);
  return data;
}
export async function naverLogin(accessToken: string, stateToken: string) {
  const { data } = await axiosInstance.get(`auth/naver?access_token=${accessToken}&state_token=${stateToken}`);
  sessionStorage.setItem("userToken", data.token);
  console.log("네이버로그인", data);
  return data;
}


export async function getReview() {
  console.log(`%cGET 요청 ${BASE_URL}/review/select`, "color: #a25cd1;");
  const { data } = await axiosInstance.get(`review/select`);
  return data;
}

export async function uploadReview(contents: Review) {
  const bodyData = JSON.stringify(contents);
  console.log(`%cPOST 요청 ${BASE_URL + "user/review"}`, "color: #a25cd1;");
  console.log(bodyData);

  return axiosInstance.post(`/review/create`, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

export async function WalkingData(params:any) {
  const { data } = await axiosInstance.get(`/walk`);
  console.log(data);
  return data;
}

