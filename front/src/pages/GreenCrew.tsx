import styled from "styled-components";
import { Wrapper, Container, Box, Title, Desc, SubTitle } from "@style/Layout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GreenCrewMap from "@components/greenCrew/GreenCrewMap";
import { useState } from "react";
import { createGreenCrewMember, getGreenCrews } from "@api/greenCrew";
import { IGreenCrew } from "@type/greenCrew";
import { Link } from "react-router-dom";
import testData from "../test_data/greenCrewTest.json";

export default function GreenCrew() {
  const areas = ["강동", "강서", "강남", "강북"];
  const [selectedArea, setSelectedArea] = useState(0);
  const queryClient = useQueryClient();
  const { isLoading, data: greenCrew } = useQuery<IGreenCrew[]>(["greenCrew"], getGreenCrews, {
    onSuccess(data) {
      console.log("GreenCrew Query성공", data);
    },
  });
  const handleClickEnter = async () => {
    await createGreenCrewMember(greenCrew![selectedArea].id);
    queryClient.invalidateQueries(["greenCrew"]);
  };

  if (!greenCrew) return null;
  return (
    <GreenCrewWrapper>
      <AreaNav>
        {[0, 1, 2, 3].map(area => (
          <AreaBtn className={selectedArea === area ? "active" : "normal"} onClick={() => setSelectedArea(area)}>
            {areas[area]}
          </AreaBtn>
        ))}
      </AreaNav>
      <RootContainer>
        <Title style={{ marginTop: "60px" }}>풀빛마실 참여하기</Title>
        <FirstContainer>
          <DescBox>
            <Title>{greenCrew[selectedArea]?.title!}</Title>
            <Date>{greenCrew[selectedArea]?.startAt!}</Date>
            <CourseBox>
              <DetailTitle>
                <IconImg src={"assets/icon/greenCrew/course_icon.svg"} alt="#" />
                코스
              </DetailTitle>
              <DetailDescription>{greenCrew[selectedArea]?.course}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greenCrew/distance_icon.svg" alt="#" />
                거리
              </DetailTitle>
              <DetailDescription>{greenCrew[selectedArea]?.distance}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greenCrew/lead_time_icon.svg" alt="#" />
                소요시간
              </DetailTitle>
              <DetailDescription>{greenCrew[selectedArea]?.leadTime}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greenCrew/max_member_icon.svg" alt="#" />
                모집인원
              </DetailTitle>
              <DetailDescription>{greenCrew[selectedArea]?.maxMember}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greenCrew/level_icon.svg" alt="#" />
                난이도
              </DetailTitle>
              <DetailDescription>{greenCrew[selectedArea]?.level}</DetailDescription>
            </CourseBox>
          </DescBox>
          {/* 카카오맵 오류동안 임시 박스 */}
          <div style={{ width: "50%", height: "100%", backgroundColor: "teal" }}>지도자리</div>
          {/* <GreenCrewMap greenCrew={greenCrew!} /> */}
          {/* <GreenCrewMap /> */}
        </FirstContainer>
        <SecondContainer>
          <Row>
            <Col>
              <div>현재까지 {greenCrew[selectedArea]?.curMember}명이 참여하고 있어요!</div>
              <div> 남은시간</div>
            </Col>
            <EnterBtn onClick={handleClickEnter}>참여하기</EnterBtn>
          </Row>
          <ContentBox>
            <ContentTitle>
              <img src="/assets/icon/greenCrew/content_icon.svg" alt="" />
              <Accent>"{greenCrew[selectedArea]?.course}"</Accent>은?
            </ContentTitle>
            <ContentDescription>{greenCrew[selectedArea]?.content}</ContentDescription>
          </ContentBox>
          <ContentBox>
            <ContentTitle>
              <img src="/assets/icon/greenCrew/traffic_info_icon.svg" alt="" />
              교통편
            </ContentTitle>
            <ContentDescription>{greenCrew[selectedArea]?.trafficInfo}</ContentDescription>
          </ContentBox>
          <Link to="/">
            <ReadyBtn>풀빛마실 준비하는 법</ReadyBtn>
          </Link>
        </SecondContainer>
      </RootContainer>
    </GreenCrewWrapper>
  );
}
const GreenCrewWrapper = styled(Wrapper)`
  background-image: url(${process.env.PUBLIC_URL}/assets/images/register_img.jpg);
`;
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
  &:hover {
    background-color: ${props => props.theme.mainColor};
  }
`;
const RootContainer = styled(Container)`
  flex-direction: column;
  width: 800px;
  height: 100%;
  background-color: white;
  padding: 0px 40px;
`;
const FirstContainer = styled(Container)`
  position: relative;
  width: 100%;
  height: 34%;
  /* margin-top: 65px; */
`;
const SecondContainer = styled(Container)`
  position: relative;
  flex-direction: column;
  height: 50%;
  justify-content: flex-start;
  align-items: space-between;
`;
const Row = styled(Box)`
  width: 100%;
  justify-content: space-between;
`;
const Col = styled(Box)``;
const DescBox = styled(Box)`
  flex-direction: column;
  width: 50%;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
`;
const IconImg = styled.img`
  margin-right: 10px;
`;
const CourseBox = styled(Box)`
  width: 70%;
  justify-content: space-between;
`;
const EnterBtn = styled.button`
  width: 200px;
  min-width: 130px;
  height: 80px;
  max-height: 70px;
  font-size: 32px;
`;
const Date = styled.div``;
const DetailTitle = styled(Desc)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DetailDescription = styled(SubTitle)`
  color: ${props => props.theme.mainColor};
`;
const ContentBox = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
`;
const ContentTitle = styled(Box)``;
const Accent = styled.h3`
  font-family: "SebangBold";
  font-size: 18px;
  color: ${props => props.theme.mainColor};
`;
const ContentDescription = styled.p``;
const ReadyBtn = styled.button`
  position: absolute;
  bottom: 30px;
  right: 0px;
  width: 150px;
  height: 40px;
  background-color: ${props => props.theme.dangerColor};
`;
