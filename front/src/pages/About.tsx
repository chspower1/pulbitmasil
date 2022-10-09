import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import SideBar from "@components/about/SideBar";
import Content from "@components/about/Content";
import ReactFullpage from "@fullpage/react-fullpage";
const anchors = ["firstPage", "secondPage", "thirdPage"];
export default function About() {
  return (
    <AboutWrap>
      <SideBar />
      <Content />
    </AboutWrap>
  );
}
const AboutWrap = styled.div`
  display: flex;
  height: 300vh;
`;
