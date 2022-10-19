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
  MainBtn,
} from "@style/Layout";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

export default function GuideForm({ content }: { content: Content }) {
  const navigate = useNavigate();
  const handleClickNavigate = () => {
    if (content.num === 6) {
      window.open(`${"http://news.seoul.go.kr/env/files/2018/11/601365c0483251.00291148.pdf"}`, "_blank");
    }
    navigate(content?.buttonURL!);
  };
  const isRight = content.num % 2 === 0;

  return (
    <Container isRight={isRight}>
      <Number>{`0${content.num}`}</Number>
      <LineBox isRight={isRight}>
        <Line src={`/assets/images/guide/tab_${isRight ? "right" : "left"}.png`} />
      </LineBox>
      <TextBox>
        <Title style={{ margin: "15px 0" }}>{content.title}</Title>
        <Desc>{content.description}</Desc>
        {content.type === "button" ? (
          <MainBtn width="auto" onClick={handleClickNavigate}>
            {content.buttonValue!}
          </MainBtn>
        ) : (
          ""
        )}
      </TextBox>
      <Img src={`assets/images/guide/guide${content.num}.png`} alt="guide photo" />
    </Container>
  );
}

const Number = styled(Title)`
  position: absolute;
  font-size: 40px;
`;
const TextBox = styled(Box)`
  justify-content: flex-start;
  width: 300px;
  flex-direction: column;
`;
const Img = styled.img`
  position: absolute;
  width: 230px;
`;
const Container = styled(ContainerGuide)<{ isRight: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  ${Number} {
    margin-right: ${props => (props.isRight ? "-200px" : "200px")};
  }
  ${TextBox} {
    margin-right: ${props => (props.isRight ? "500px" : "-500px")};
    align-items: ${props => (props.isRight ? "flex-end" : "flex-start")};
    width: 250px;
    ${Desc} {
      text-align: ${props => (props.isRight ? "right" : "left")};
      width: 230px;
      line-height: 22px;
      letter-spacing: 0.05em;
      white-space: pre-line;
    }
  }
  ${Img} {
    margin-right: ${props => (props.isRight ? "1100px" : "-1100px")};
  }
`;
const Line = styled.img`
  width: 50%;
  height: 100%;
`;
const LineBox = styled(Box)<{ isRight: boolean }>`
  position: absolute;
  width: 100px;
  height: 100%;
  justify-content: ${props => (props.isRight ? "flex-end" : "flex-start")};
`;
const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
`;
