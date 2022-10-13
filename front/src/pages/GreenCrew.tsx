import styled from "styled-components";
import { Wrapper as GreenCrewWrapper, Container, Box, Title } from "@style/Layout";
import { useQuery } from "@tanstack/react-query";
import GreenCrewMap from "@components/greenCrew/GreenCrewMap";
import { useState } from "react";
import { getGreenCrews } from "@api/greenCrew";
import { IGreenCrew } from "@type/greenCrew";
import { Link } from "react-router-dom";
type Area = "강남" | "강서" | "강북" | "강동";
export default function GreenCrew() {
  const areas: Area[] = ["강동", "강서", "강남", "강북"];
  const { isLoading } = useQuery<IGreenCrew>(["greenCrew"], getGreenCrews, {
    onSuccess(data) {
      setGreenCrew(data);
    },
  });
  const [greenCrew, setGreenCrew] = useState<IGreenCrew>();
  const [selectedArea, setSelectedArea] = useState<Area>("강동");
  if (isLoading) return <>로딩중</>;
  return (
    <GreenCrewWrapper>
      <AreaNav>
        {areas.map(area => (
          <AreaBtn className={selectedArea === area ? "active" : "normal"} onClick={() => setSelectedArea(area)}>
            {area}
          </AreaBtn>
        ))}
      </AreaNav>
      <RootContainer>
        <Title>풀빛마실 참여하기</Title>
        <FirstContainer>
          <DescBox>
            <Title>{greenCrew?.title!}</Title>
            <Date>{greenCrew?.date!}</Date>
            <CourseBox>
              <DetailTitle>
                <img src="#" alt="#" />
                코스
              </DetailTitle>
              <DetailTitle>{greenCrew?.course}</DetailTitle>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <img src="#" alt="#" />
                거리
              </DetailTitle>
              <DetailTitle>{greenCrew?.distance}</DetailTitle>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <img src="#" alt="#" />
                소요시간
              </DetailTitle>
              <DetailTitle>{greenCrew?.leadTime}</DetailTitle>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <img src="#" alt="#" />
                모집인원
              </DetailTitle>
              <DetailTitle>{greenCrew?.maxMember}</DetailTitle>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <img src="#" alt="#" />
                난이도
              </DetailTitle>
              <DetailTitle>{greenCrew?.level}</DetailTitle>
            </CourseBox>
          </DescBox>
          <GreenCrewMap />
        </FirstContainer>
        <SecondContainer>
          <Row>
            <Col>
              <div>현재까지 {greenCrew?.curMember}명이 참여하고 있어요!</div>
              <div> 남은시간</div>
            </Col>
            <button>참여하기</button>
          </Row>
          <ContentBox>
            <ContentTitle>"{greenCrew?.course}"은?</ContentTitle>
            <ContentDescription>{greenCrew?.content}</ContentDescription>
          </ContentBox>
          <ContentBox>
            <ContentTitle>교통편</ContentTitle>
            <ContentDescription>{greenCrew?.trafficInfo}</ContentDescription>
          </ContentBox>
        </SecondContainer>
        <Link to="/">
          <button>풀빛마실 준비하는 법</button>
        </Link>
      </RootContainer>
    </GreenCrewWrapper>
  );
}
const AreaNav = styled(Box)`
  position: fixed;
  left: 0px;
  flex-direction: column;
  height: 360px;
  justify-content: space-between;
`;
const AreaBtn = styled.button`
  width: 150px;
  height: 60px;
  &.active {
    background-color: ${props => props.theme.mainColor};
  }
  &.normal {
    background-color: ${props => props.theme.weekColor};
  }
`;
const RootContainer = styled(Container)``;
const FirstContainer = styled(Container)``;
const SecondContainer = styled(Container)``;
const Row = styled(Box)``;
const Col = styled(Box)``;
const DescBox = styled(Box)`
  flex-direction: column;
`;
const CourseBox = styled(Box)``;
const Date = styled.div``;
const DetailTitle = styled.h5``;
const ContentBox = styled(Box)``;
const ContentTitle = styled.h5``;
const ContentDescription = styled.p``;
