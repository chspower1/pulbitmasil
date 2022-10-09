import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import SideBar from "./SideBar";
import Content from "./Content";

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
