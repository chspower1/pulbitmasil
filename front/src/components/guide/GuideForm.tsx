import { Content, POS } from "@pages/Guide";
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

export default function GuideForm({ pos, content }: { pos: POS; content: Content }) {
  return (
    <TabContainer pos={pos}>
      {pos === POS.left ? (
        <>
          <NumberBox pos={pos}>
            <Number>{"0" + content.num}</Number>
          </NumberBox>
          <ImageBox>
            <img src={`assets/images/guide/tab_${pos}.png`}></img>
          </ImageBox>
          <TextBox>
            <GuideTitle>{content.title}</GuideTitle>
            <GuideDescription>{content?.description}</GuideDescription>
            {content.type === "button" && <Btn>{content?.buttonValue}</Btn>}
          </TextBox>
        </>
      ) : (
        <>
          <TextBox>
            <GuideTitle>{content.title}</GuideTitle>
            <GuideDescription>{content.description}</GuideDescription>
            {content.type === "button" && <Btn>{content?.buttonValue}</Btn>}
          </TextBox>
          <ImageBox>
            <img src={`assets/images/guide/tab_${pos}.png`}></img>
          </ImageBox>
          <NumberBox pos={pos}>
            <Number>{"0" + content.num}</Number>
          </NumberBox>
        </>
      )}
    </TabContainer>
  );
}

const TabContainer = styled.div<{ pos: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1620px;
  height: 374px;
  flex-direction: row;
  position: relative;
  margin-left: ${props => (props.pos === POS.right ? "100px" : "0px")};
`;

const ImgContainer = styled.div`
  /* width:400px */
  background-color: beige;
`;
const Number = styled.p`
  font-size: 64px;
  font-weight: bold;
  color: ${props => props.theme.accentColor};
`;
const TextBox = styled(Box)`
  flex-direction: column;
  width: 250px;
  height: 190px;
`;
const NumberBox = styled(Box)<{ pos: string }>`
  width: 250px;
  height: 190px;
  justify-content: ${props => (props.pos === POS.left ? "end" : "start")};
  align-items: center;
`;

const ImageBox = styled(Box)`
  margin: 0 30px;
  width: 60px;
`;

const GuideTitle = styled(Title)``;
const GuideDescription = styled(Desc)`
  margin-top: 10px;
`;

const Btn = styled.button`
  padding: 0 10px;
  height: 50px;

  margin-top: 50px;
`;
