import React from "react";
import { useLocation } from "react-router-dom";

export default function NaverAuth() {
  const accessToken = new URL(window.location.href).searchParams.get("access_token");
  const stateToken = new URL(window.location.href).searchParams.get("state");
  const location = useLocation();
  console.log(location);
  console.log(accessToken, stateToken);
  return <div style={{ fontSize: "300px" }}>네이버</div>;
}
