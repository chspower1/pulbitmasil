import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "@components/layout/Nav";

import Home from "./Home";
import About from "./About";
import Register from "./Register";
import styled from "styled-components";
import Chart from "./Chart";
import Plogging from "./Plogging";
import ScrollBtn from "@components/ScrollBtn";
import NaverAuth from "./Auth/NaverAuth";
import KakaoAuth from "./Auth/KakaoAuth";
import Dodream from "./Dodream";
import UserInfo from "./UserInfo";
import MyGreenStroll from "./MyGreenStroll";
import WelcomeModal from "@components/modal/WelcomeModal";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
const ContentContainer = styled.section`
  margin-top: 70px;
  height: 100vh;
`;
export default function Router() {
  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <WelcomeModal />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/plogging" element={<Plogging />} />
          <Route path="/dodream" element={<Dodream />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/write" element={<ReviewForm />} />
          <Route path="/review/edit/:reviewId" element={<ReviewForm />} />
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/myGreenStroll" element={<MyGreenStroll />} />
          <Route path="/auth/naver/callback" element={<NaverAuth />} />
          <Route path="/auth/kakao/callback" element={<KakaoAuth />} />
        </Routes>
      </ContentContainer>
      {/* <ScrollBtn /> */}
    </BrowserRouter>
  );
}
