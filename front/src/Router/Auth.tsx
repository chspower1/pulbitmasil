import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { kakaoLogin } from "@api/api";
import { useRecoilState } from "recoil";
import { curUserAtom } from "@atom/atom";
import { data } from "@components/chart/LineChart";
export default function Auth() {
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigator = useNavigate();
  console.log(code);
  //   const navigator = useNavigate();
  //   const getToken = async () => {
  //     const payload = qs.stringify({
  //       grant_type: "authorization_code",
  //       client_id: REST_API_KEY,
  //       redirect_uri: REDIRECT_URI,
  //       code: code,
  //       client_secret: CLIENT_SECRET,
  //     });
  //     try {
  //       // access token 가져오기
  //       const res = await axios.post("https://kauth.kakao.com/oauth/token", payload);
  //       // Kakao Javascript SDK 초기화
  //       window.Kakao.init(REST_API_KEY);
  //       // access token 설정
  //       window.Kakao.Auth.setAccessToken(res.data.access_token);
  //       navigator("/profile");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  const [user, setUser] = useRecoilState(curUserAtom);
  useEffect(() => {
    async function inAuthPage() {
      const { name, email, token } = await kakaoLogin(code!);
      setUser({ email, name, token });
      console.log(name, email, token);
    }
    inAuthPage();
    navigator("/");
  }, []);

  return <div style={{ fontSize: "300px" }}>카카오</div>;
}
