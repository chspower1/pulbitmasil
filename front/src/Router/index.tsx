import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "@components/Nav";

import Home from "./Home";
import About from "./About";
import Map from "./Map";
import styled from "styled-components";
import Footer from "@components/Footer";
import Chart from "./Chart";

const ContentContainer = styled.section`
  padding-top: 60px;
  min-height: 100vh;
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
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </ContentContainer>
      <Footer />
    </BrowserRouter>
  );
}
