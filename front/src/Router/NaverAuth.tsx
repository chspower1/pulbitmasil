import { naverLogin } from "@api/api";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NaverAuth() {
  const { hash } = useLocation();
  const accessToken = hash.split("access_token=")[1].split("&state=")[0];
  const stateToken = hash.split("access_token=")[1].split("&state=")[1].split("&token_type=")[0];

  // console.log(stateToken);
  // console.log(accessToken);
  useEffect(() => {
    // naverLogin(accessToken, stateToken);
  }, []);
  return <div style={{ fontSize: "300px" }}>네이버</div>;
}
