import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "@components/layout/Nav";

import Home from "./Home";
import About from "./About";
import Map from "./Map";
import Register from "./Register";
import styled from "styled-components";
import Footer from "@components/layout/Footer";
import Chart from "./Chart";
import Plogging from "./Plogging";
import ScrollBtn from "@components/ScrollBtn";
import Naver from "./NaverAuth";
import KakaoAuth from "./KakaoAuth";
import Walking from "./Walking";
import UserInfo from "./UserInfo";
import MyGreenStroll from "./MyGreenStroll";
import WelcomeModal from "@components/modal/WelcomeModal";
import Test from "./Test";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

const ContentContainer = styled.section`
  min-height: 100vh;
`;
export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <WelcomeModal />
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
          <Route path="/review" element={<Review />} />
          <Route path="/review/write" element={<ReviewForm />} />
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/myGreenStroll" element={<MyGreenStroll />} />
          <Route path="/user/naver/callback" element={<Naver />} />
          <Route path="/auth/kakao/callback" element={<KakaoAuth />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </ContentContainer>
      <ScrollBtn />
    </BrowserRouter>
  );
}
