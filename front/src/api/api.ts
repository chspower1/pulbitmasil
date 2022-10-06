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

  return axios
    .post(`${BASE_URL}/user/login`, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    })
    .then(res => {
      const token = res.data.token;
      sessionStorage.setItem("userToken", token);
      console.log("token", token);
      // setAuthorizationToken(token);
    });
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
