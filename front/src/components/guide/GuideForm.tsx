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

export default function GuideForm({ content }: { content: Content }) {
  const navigate = useNavigate();
  const handleClickNavigate = () => {
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
        <Title>{content.title}</Title>
        <Desc>{content.description}</Desc>
      </TextBox>
      <Img
        src="https://images.unsplash.com/photo-1665884304501-a65e6ff95b35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=670&q=80"
        alt=""
      />
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
  width: 100px;
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
    ${Desc} {
      text-align: ${props => (props.isRight ? "right" : "left")};
    }
  }
  ${Img} {
    margin-right: ${props => (props.isRight ? "1000px" : "-1000px")};
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
