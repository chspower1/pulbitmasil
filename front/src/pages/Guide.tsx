import React from "react";
import {
  Wrapper as WrapGuide,
  AboutContent,
  Container as ContainerGuide,
  Title,
  SubTitle as SubTitleGuide,
  GreenAccent,
  Desc,
  Box,
  Row,
  DangerAccent,
} from "@style/Layout";
import styled from "styled-components";

export default function Guide() {
  return (
    <Wrap>
      <Container bgColor="#bdaaaa"></Container>
      <Container bgColor="#dff2f7"></Container>
      <Container bgColor="#f7eaea"></Container>
    </Wrap>
  );
}
const Wrap = styled(WrapGuide)`
  flex-direction: column;
  height: 300vh;
  overflow: scroll;
`;
const Container = styled(ContainerGuide)<{ bgColor: string }>`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.bgColor};
`;
