import React from "react";
import styled from "styled-components";
import * as C from "../style/Container";

export default function About() {
  return (
    <div>
      <C.Box>
        <Btn>Hello</Btn>
        <Btn>it's button</Btn>
        <Btn>주변 찾아보기</Btn>
        <Input />
      </C.Box>
    </div>
  );
}

const Btn = styled.button`
  margin-top: 100px;
`;

const Input = styled.input`
  margin: 50px;
`;
