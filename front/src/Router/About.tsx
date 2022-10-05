import React from "react";
import styled from "styled-components";

export default function About() {
  return (
    <div>
      <Btn>Hello</Btn>
      <Btn>it's button</Btn>
      <Btn>주변 찾아보기</Btn>
    </div>
  );
}

const Btn = styled.button`
  margin-top: 200px;
`;
