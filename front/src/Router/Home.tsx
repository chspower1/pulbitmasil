import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getInfo } from "@api/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import homeImg from "@style/images/home.jpg";

export default function Home() {
  useEffect(() => {
    const URL = {
      name: "trash",
    };
    getInfo(URL);
  }, []);
  return (
    <HomeWrap>
      <Img src="#" alt="#" />
      <div></div>
    </HomeWrap>
  );
}
const HomeWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 100vw;
  object-fit: cover;
`;
