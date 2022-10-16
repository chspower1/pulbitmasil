import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "@api/user";
import {  useSetRecoilState } from "recoil";
import { userAtom } from "@atom/user";
import { isWelcomeModalAtom } from "@atom/atom";

export default function KakaoAuth() {
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigator = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const setIsWelcomeModal = useSetRecoilState(isWelcomeModalAtom);
  useEffect(() => {
    async function inAuthPage() {
      const newUser = await kakaoLogin(code!);
      setUser(newUser);
    }
    inAuthPage();
    setIsWelcomeModal(true);
    navigator("/");
  }, []);

  return <div></div>;
}
