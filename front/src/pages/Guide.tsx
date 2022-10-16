import React, { ReactNode } from "react";
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
import GuideForm from "@components/guide/GuideForm";
import { contents1, contents2, contents3 } from "./guide_data";

export enum POS {
  left = "left",
  right = "right",
}

export interface Content {
  num: number;
  title: string;
  description: string;
  type: "normal" | "button";
  buttonValue?: string;
}

export default function Guide() {
  return (
    <Wrap>
      <Container bgColor="#bdaaaa">
        <Title style={{ color: "black" }}>풀빛마실을 시작해 볼까요?</Title>

        {/* 에러나는 부분 */}
        {/* {contents1.map(content => {
          content.num % 2 === 0 ? (
            <GuideForm pos={POS.left} content={content}></GuideForm>
          ) : (
            <GuideForm pos={POS.right} content={content}></GuideForm>
          );
        })} */}

        <GuideForm pos={POS.left} content={contents1[0]}></GuideForm>
        <GuideForm pos={POS.right} content={contents1[1]}></GuideForm>
      </Container>
      <Container bgColor="#060707">
        <GuideForm pos={POS.left} content={contents2[0]}></GuideForm>
        <GuideForm pos={POS.right} content={contents2[1]}></GuideForm>
        <GuideForm pos={POS.left} content={contents2[2]}></GuideForm>
      </Container>
      <Container bgColor="#f7eaea">
        <GuideForm pos={POS.right} content={contents3[0]}></GuideForm>
        <GuideForm pos={POS.left} content={contents3[1]}></GuideForm>
      </Container>
    </Wrap>
  );
}

const Wrap = styled(WrapGuide)`
  flex-direction: column;
  height: 300vh;
  overflow: scroll;
`;
const Container = styled(ContainerGuide)<{ bgColor: string }>`
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.bgColor};
`;
