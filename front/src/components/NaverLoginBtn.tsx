import { useEffect, useRef } from "react";
import { useState } from "react";
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

const CLIENT_ID = "PI99uUj8actDtIRQqkH0";
const CALLBACK_URL = "http://localhost:3000/auth/naver/callback";

export default function NaverLoginBtn() {
  const naverRef = useRef<any>();
  const [data, setData] = useState<User>({ name: "", email: "" });
  useEffect(CDM, []);

  function CDM() {
    Naver();
    GetProfile();
  }

  function Naver() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "PI99uUj8actDtIRQqkH0",
      callbackUrl: "http://localhost:3000/auth/naver/callback",
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
        `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=STATE_STRING&redirect_uri=${CALLBACK_URL}`,
        {
          method: "get",
          headers: header,
        },
      )
        .then(res => res.json())
        .then(res => {
          console.log(res);
          localStorage.setItem("access_token", res.token);
          setData(res.user);
        });
    }
  }
  const handleNaverLogin = () => {
    naverRef?.current!.children[0].click();
  };
  return (
    <>
      <div ref={naverRef} style={{ display: "none" }} id="naverIdLogin" />
      <NaverLogin onClick={handleNaverLogin}>네이버 로그인</NaverLogin>
    </>
  );
}
