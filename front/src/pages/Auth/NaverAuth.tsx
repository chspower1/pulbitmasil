import { naverLogin } from "@api/api";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userAtom } from "@atom/user";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isWelcomeModalAtom } from "@atom/atom";

export default function NaverAuth() {
  const { hash } = useLocation();
  const navigator = useNavigate();
  const accessToken = hash.split("access_token=")[1].split("&state=")[0];
  const stateToken = hash.split("access_token=")[1].split("&state=")[1].split("&token_type=")[0];
  const setIsWelcomeModal = useSetRecoilState(isWelcomeModalAtom);
  const [user, setUser] = useRecoilState(userAtom);

  // console.log(stateToken);
  // console.log(accessToken);
  useEffect(() => {
    async function inAuthPage() {
      const { id, name, email, token } = await naverLogin(accessToken, stateToken);
      console.log("네이버 로그인, 넘어온 데이터\n", id, email, name, token);
      setUser({ id, email, name, token });
      console.log("네이버 User상태\n", user);
    }
    inAuthPage();
    setIsWelcomeModal(true);
    navigator("/");
  }, []);
  return <div style={{ fontSize: "300px" }}>네이버</div>;
}
