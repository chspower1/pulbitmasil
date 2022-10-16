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
import { contents1, contents2, contents3 } from "../data/guide_data";

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
  buttonURL?: string;
}

export default function Guide() {
  return (
    <Wrap>
      <Container bgColor="#bdaaaa">
        {/* {contents1.map(content => {
          content.num % 2 === 0 ? (
            <GuideContainer>
            <GuideForm pos={POS.left} content={content}/>
            </GuideContainer>
          ) : (
            <GuideContainer>
            <GuideForm pos={POS.right} content={content}/>
            </GuideContainer>
          );
        })} */}
        <GuideContainer>
          <GuideForm pos={POS.left} content={contents1[0]}></GuideForm>
        </GuideContainer>
        <GuideContainer>
          <GuideForm pos={POS.right} content={contents1[1]}></GuideForm>
        </GuideContainer>
      </Container>
      <Container bgColor="#060707">
        <GuideContainer>
          <GuideForm pos={POS.left} content={contents2[0]}></GuideForm>
        </GuideContainer>
        <GuideContainer>
          <GuideForm pos={POS.right} content={contents2[1]}></GuideForm>
        </GuideContainer>
        <GuideContainer>
          <GuideForm pos={POS.left} content={contents2[2]}></GuideForm>
        </GuideContainer>
      </Container>
      <Container bgColor="#f7eaea">
        <GuideForm pos={POS.right} content={contents3[0]}></GuideForm>
        <GuideForm pos={POS.left} content={contents3[1]}></GuideForm>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  height: 100vh;
  /* padding-top: 70px; */
  overflow: hidden;

  flex-direction: column;
  height: 300vh;
  overflow: scroll;
`;
const Container = styled(ContainerGuide)<{ bgColor: string }>`
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.bgColor};
  /* padding-top: 200px; */
`;
const GuideContainer = styled.div`
  width: 1620px;
  height: 374px;
`;
