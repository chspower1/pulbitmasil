import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { kakaoLogin } from "@api/api";
import { useRecoilState } from "recoil";
import { data } from "@components/chart/LineChart";
import { userAtom } from "@atom/user";

export default function KakaoAuth() {
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigator = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    async function inAuthPage() {
      const { name, email, token } = await kakaoLogin(code!);
      console.log("카카오 로그인, 넘어온 데이터\n", email, name, token);
      setUser({ email, name, token });
      console.log("카카오 User상태\n", user);
    }
    inAuthPage();
    navigator("/");
  }, []);

  return <div style={{ fontSize: "300px" }}>카카오</div>;
}
