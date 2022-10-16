import { isLoginModalAtom } from "@atom/atom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { NaverLogin } from "./modal/LoginModal";

declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

interface User {
  name: string;
  email: string;
}

export default function NaverLoginBtn() {
  const naverRef = useRef<any>();
  const [data, setData] = useState<User>({ name: "", email: "" });
  const [isLoginModal, setIsLoginModal] = useRecoilState(isLoginModalAtom);
  useEffect(CDM, []);

  function CDM() {
    Naver();
    GetProfile();
  }

  function Naver() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "PI99uUj8actDtIRQqkH0",
      callbackUrl: "http://kdt-ai5-team09.elicecoding.com/auth/naver/callback",
      callbackHandle: true,
      isPopup: false,
      loginButton: {
        color: "green",
        type: 2,
        height: 50,
      },
    });
    naverLogin.init();
  }

  function GetProfile() {
    window.location.href.includes("access_token") && GetUser();
    function GetUser() {
      const location = window.location.href.split("=")[1].split("&")[0];
      const header = {
        Authorization: location,
      };
      fetch(
        `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&state=STATE_STRING&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}`,
        {
          method: "get",
          headers: header,
        },
      )
        .then(res => res.json())
        .then(res => {
          // console.log(res);
          localStorage.setItem("access_token", res.token);
          setData(res.user);
        });
    }
  }
  const handleNaverLogin = () => {
    naverRef?.current!.children[0].click();
    setIsLoginModal(false);
  };
  return (
    <>
      <div ref={naverRef} style={{ display: "none" }} id="naverIdLogin" />
      <NaverLogin src="/assets/images/naver_login_btn.png" onClick={handleNaverLogin} />
    </>
  );
}
