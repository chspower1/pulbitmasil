import React from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

export default function SideBar() {
  return (
    <SideBarWrap>
      <Link to="1" spy={true} smooth={true}>
        01
      </Link>
      <Link to="2" spy={true} smooth={true}>
        02
      </Link>
      <Link to="3" spy={true} smooth={true}>
        03
      </Link>
    </SideBarWrap>
  );
}
const SideBarWrap = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  height: 100vh;
  width: 20%;
  background-color: red;
`;
