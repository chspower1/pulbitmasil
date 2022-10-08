import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "@components/Nav";

import Home from "./Home";
import About from "./About";
import Map from "./Map";
import Register from "./Register";
import styled from "styled-components";
import Footer from "@components/Footer";
import Chart from "./Chart";
import Plogging from "./Plogging";
import ScrollBtn from "@components/ScrollBtn";
import Naver from "./NaverAuth";
import KakaoAuth from "./KakaoAuth";
import Walking from "./Walking";

const ContentContainer = styled.section`
  min-height: 100vh;
  ::-webkit-scrollbar-track {
    display: none;
    width: 0;
  }
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<Map />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/plogging" element={<Plogging />} />
          <Route path="/walking" element={<Walking />} />
          <Route path="/user/naver/callback" element={<Naver />} />
          <Route path="/auth/kakao/callback" element={<KakaoAuth />} />
        </Routes>
      </ContentContainer>
      <ScrollBtn />
    </BrowserRouter>
  );
}
