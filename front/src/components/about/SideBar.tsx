import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
export default function SideBar() {
  const navigator = useNavigate();
  return (
    <SideBarWrap>
      <button onClick={() => navigator("/about#firstPage")}>01</button>
      <button>02</button>
      <button>03</button>
      <button>03</button>
      <button>03</button>
      <button>03</button>
      <button>03</button>
      <button>03</button>
      <button>03</button>
      <button>03</button>
      <button>03</button>
    </SideBarWrap>
  );
}
const SideBarWrap = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  /* padding-top: 70px; */
  height: 100vh;
  width: 20%;
  background-color: white;
  border-right: solid 1px rgba(0, 0, 0, 0.1);
`;
