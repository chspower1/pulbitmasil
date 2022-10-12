import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { kakaoLogin } from "@api/api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { data } from "@components/chart/LineChart";
import { userAtom } from "@atom/user";
import { isWelcomeModalAtom } from "@atom/atom";

export default function KakaoAuth() {
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigator = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const setIsWelcomeModal = useSetRecoilState(isWelcomeModalAtom);
  useEffect(() => {
    async function inAuthPage() {
      const { id, name, email, token } = await kakaoLogin(code!);
      // console.log("카카오 로그인, 넘어온 데이터\n", email, name, token);
      setUser(prev => {
        const newUser = { id, name, email, token };
        return { ...newUser };
      });
      // console.log("카카오 User상태\n", user);
    }
    inAuthPage();
    setIsWelcomeModal(true);
    navigator("/");
  }, []);

  return <div style={{ fontSize: "300px" }}>카카오</div>;
}
