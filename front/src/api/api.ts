import axios from "axios";

const BASE_URL = "http://localhost:5001";

interface getProps {
  name: string;
  option?: string;
}
export async function getInfo({ name, option }: getProps) {
  try {
    if (!option) option = "";
    console.log(`${BASE_URL}/${name}/${option}`);
    const { data } = await (await fetch(`${BASE_URL}/${name}/${option}`)).json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

interface User {
  email: string;
  password: string;
  name?: string;
}

//토큰을 가지고있음을 헤더에 알려주는코드
// function setAuthorizationToken(token: any) {
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete axios.defaults.headers.common["Authorization"];
//   }
// }

export async function requestLogin(loginInfo: User) {
  const bodyData = JSON.stringify(loginInfo);

  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    sessionStorage.setItem("userToken", data.token);
    console.log("풀빛마실로그인", data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function registerUser(newUser: User) {
  const bodyData = JSON.stringify(newUser);
  console.log(`%cGET 요청 ${BASE_URL + "/user/register"}`, "color: #a25cd1;");

  // endpoint 백엔드와 상의필요
  return axios.post(`${BASE_URL}/user/register`, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function kakaoLogin(code: string) {
  console.log(`%cGET 요청 ${BASE_URL}/auth/kakao?code=${code}`, "color: #a25cd1;");
  const { data } = await axios.get(`${BASE_URL}/auth/kakao?code=${code}`);
  sessionStorage.setItem("userToken", data.token);
  console.log("카카오로그인", data);
  return data;
}
export async function naverLogin(accessToken: string, stateToken: string) {
  const { data } = await axios.get(`${BASE_URL}/auth/naver?access_token=${accessToken}&state_token=${stateToken}`);
  sessionStorage.setItem("userToken", data.token);
  console.log("네이버로그인", data);
  return data;
}
