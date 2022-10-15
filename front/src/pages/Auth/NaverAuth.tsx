import { naverLogin } from "@api/user";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userAtom } from "@atom/user";
import { useSetRecoilState } from "recoil";
import { isWelcomeModalAtom } from "@atom/atom";

export default function NaverAuth() {
  const { hash } = useLocation();
  const navigator = useNavigate();
  const accessToken = hash.split("access_token=")[1].split("&state=")[0];
  const stateToken = hash.split("access_token=")[1].split("&state=")[1].split("&token_type=")[0];
  const setIsWelcomeModal = useSetRecoilState(isWelcomeModalAtom);
  const setUser = useSetRecoilState(userAtom);
  useEffect(() => {
    async function inAuthPage() {
      const loginUser = await naverLogin(accessToken, stateToken);
      setUser(loginUser);
    }
    inAuthPage();
    setIsWelcomeModal(true);
    navigator("/");
  }, []);
  return <div></div>;
}
