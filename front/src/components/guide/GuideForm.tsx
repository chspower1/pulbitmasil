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
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

export default function GuideForm({ pos, content }: { pos: POS; content: Content }) {
  const navigate = useNavigate();
  const handleClickNavigate = () => {
    navigate(content?.buttonURL!);
  };
  return (
    <TabContainer pos={pos}>
      {pos === POS.left ? (
        <>
          <div>
            <img src={`assets/images/guide/guide1.png`}></img>
          </div>
          <NumberBox pos={pos} style={{ backgroundColor: "red" }}>
            <Number>{"0" + content.num}</Number>
          </NumberBox>
          <ImageBox pos={pos} style={{ backgroundColor: "red" }}>
            <img src={`assets/images/guide/tab_${pos}.png`}></img>
          </ImageBox>
          <TextBox style={{ backgroundColor: "red" }}>
            <GuideTitle>{content.title}</GuideTitle>
            <GuideDescription>{content?.description}</GuideDescription>
            {content.type === "button" && <Btn onClick={handleClickNavigate}>{content?.buttonValue}</Btn>}
          </TextBox>
        </>
      ) : (
        <>
          <TextBox style={{ backgroundColor: "yellow" }}>
            <GuideTitle>{content.title}</GuideTitle>
            <GuideDescription>{content.description}</GuideDescription>
            {content.type === "button" && <Btn onClick={handleClickNavigate}>{content?.buttonValue}</Btn>}
          </TextBox>
          <ImageBox pos={pos} style={{ backgroundColor: "yellow" }}>
            <img src={`assets/images/guide/tab_${pos}.png`}></img>
          </ImageBox>
          <NumberBox pos={pos} style={{ backgroundColor: "yellow" }}>
            <Number>{"0" + content.num}</Number>
          </NumberBox>
          <img src={`assets/images/guide/guide1.png`}></img>
        </>
      )}
    </TabContainer>
  );
}

const TabContainer = styled.div<{ pos: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: row;
  position: relative;
  margin-left: ${props => (props.pos === POS.right ? "172px" : "0px")};
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
  width: 100px;
  height: 190px;
  justify-content: ${props => (props.pos === POS.left ? "end" : "start")};
  align-items: center;
`;

const ImageBox = styled(Box)<{ pos: string }>`
  margin: 0 30px;
  justify-content: ${props => (props.pos === POS.left ? "start" : "end")};
  width: 80px;
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
