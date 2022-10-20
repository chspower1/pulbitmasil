import { Content } from "@pages/Guide";
import {
  Container as ContainerGuide,
  Title,
  Desc,
  Box,
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
        <GuideTitle style={{ margin: "15px 0" }}>{content.title}</GuideTitle>
        <Desc>{content.description}</Desc>
        {content.type === "button" ? (
          <GuideMainBtn width="auto" onClick={handleClickNavigate}>
            {content.buttonValue!}
          </GuideMainBtn>
        ) : (
          ""
        )}
      </TextBox>
      <Img src={`assets/images/guide/guide${content.num}.png`} alt="guide photo" />
    </Container>
  );
}

const GuideTitle = styled(Title)`
  @media screen and (max-width: 1024px) {
    font-size: 24px;
  };
`;
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

  @media screen and (max-width: 1024px) {
    justify-content: flex-start;
  }

  ${Number} {
    margin-right: ${props => (props.isRight ? "-200px" : "200px")};

    @media screen and (max-width: 1024px) {
      margin-left: 18%;
    };
    @media screen and (max-width: 767px) {
      margin-left: ${props => (props.isRight ? "1%" : "15%")};
    };
    @media screen and (max-width: 550px) {
      margin-left: ${props => (props.isRight ? "5%" : "21%")};
    };
  }
  ${TextBox} {
    margin-right: ${props => (props.isRight ? "500px" : "-500px")};
    align-items: ${props => (props.isRight ? "flex-end" : "flex-start")};
    width: 250px;

    @media screen and (max-width: 1024px) {
      margin-left: 32%;
      align-items: center;
    };
    @media screen and (max-width: 767px) {
      margin-left: 25%;
    }
    @media screen and (max-width: 550px) {
      margin-left: 45%;
      align-items: flex-start;
    };

    ${Desc} {
      text-align: ${props => (props.isRight ? "right" : "left")};
      width: 230px;
      line-height: 22px;
      letter-spacing: 0.05em;
      white-space: pre-line;

      @media screen and (max-width: 1024px) {
        text-align: center;
      }
      @media screen and (max-width: 767px) {
        font-size: 13px;       
      };
      @media screen and (max-width: 550px) {
        text-align: left;
        width: 190px;
      };
    }
  }
  ${Img} {
    margin-right: ${props => (props.isRight ? "1100px" : "-1100px")};
    @media screen and (max-width: 1024px) {
      margin-left: 70%;
    };
    @media screen and (max-width: 767px) {
      width: 150px;
    }
    @media screen and (max-width: 550px) {
      display: none;
    };
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

  @media screen and (max-width: 1024px) {
    margin-left: 3%;
  };
  @media screen and (max-width: 550px) {
    margin-left: 7%;
  };
`;
const GuideMainBtn = styled(MainBtn)`
  margin: 10px 0;
`;
