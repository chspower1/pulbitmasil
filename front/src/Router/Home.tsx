import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import BarChart from "@components/chart/BarChart";
import { getInfo } from "@api/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import homeImg from "@images/home.jpg";

export default function Home() {
  useEffect(() => {
    const URL = {
      name: "trash",
    };
    getInfo(URL);
  }, []);
  return (
    <HomeWrap>
      <Img src="https://cdn.pixabay.com/photo/2022/04/07/14/31/bottle-7117637_960_720.jpg" alt="#" />
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
