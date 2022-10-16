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
      <PageContainer bgColor="#E6E6E6">
        <SectionContainer>
          <Title>풀빛마실을 시작해볼까요?</Title>
        </SectionContainer>
        {contents1.map(content => (
          <SectionContainer>
            <GuideForm content={content} />
          </SectionContainer>
        ))}
      </PageContainer>
      <PageContainer bgColor="#F4F4F4">
        {contents2.map(content => (
          <SectionContainer>
            <GuideForm content={content} />
          </SectionContainer>
        ))}
      </PageContainer>
      <PageContainer bgColor="#FFFFFF">
        {contents3.map(content => (
          <SectionContainer>
            <GuideForm content={content} />
          </SectionContainer>
        ))}
        <SectionContainer />
      </PageContainer>
    </Wrap>
  );
}

const Wrap = styled(WrapGuide)`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  height: 300vh;
  overflow: scroll;
`;
const PageContainer = styled(ContainerGuide)<{ bgColor: string }>`
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.bgColor};
`;
const SectionContainer = styled(ContainerGuide)`
  width: 100%;
  height: 33.3%;
`;
