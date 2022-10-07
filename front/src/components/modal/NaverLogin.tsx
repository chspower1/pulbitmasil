import { useEffect } from "react";
import { useState } from "react";


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

export default function NaverLoginFunction() {
  const [data, setData] = useState<User>({name:'', email:''});
  useEffect(CDM, []);

  function CDM() {
    Naver();
    GetProfile();
  }

  function Naver() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'PI99uUj8actDtIRQqkH0',
      callbackUrl: 'http://localhost:3000/user/naver/callback',
      callbackHandle: true,
      isPopup: false,
      loginButton: {
        color: 'green',
        type: 2,
        height: 50
      }
    });
    naverLogin.init();
  }

  function GetProfile() {
    window.location.href.includes('access_token') && GetUser();

    function GetUser() {
      const location = window.location.href.split('=')[1].split('&')[0];
      const header = {
        Authorization: location,
      };

      // fetch('', {
      //   method: 'get',
      //   headers: header,
      // })
      //   .then((res) => res.json())
      //   .then((res) => {
      //     localStorage.setItem('wtw-token', res.token);
      //     setData(res.user);
      //   });
    }
  }

  return (
    <>
      <div id="naverIdLogin" ></div>
    </>
  )
}


