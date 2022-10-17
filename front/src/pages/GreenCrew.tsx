import styled from "styled-components";
import { Wrapper, Container, Box, Title, Desc, SubTitle } from "@style/Layout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GreenCrewMap from "@components/greenCrew/GreenCrewMap";
import { useState, useEffect } from "react";
import { createGreenCrewMember, getGreenCrews } from "@api/greenCrew";
import { IGreenCrew } from "@type/greenCrew";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import testData from "../test_data/greenCrewTest.json";
import moment from "moment";
import { useInterval } from "react-use";
import { data } from "@components/chart/LineChart";
export default function GreenCrew() {
  const areas = ["강동", "강서", "강남", "강북"];
  const [selectedArea, setSelectedArea] = useState(0);
  const queryClient = useQueryClient();
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("");
  const { data: greenCrew } = useQuery<IGreenCrew[] | undefined>(["greenCrew"], getGreenCrews, {
    onSuccess(data) {
      console.log("GreenCrew Query성공", data);
    },
    onError(err) {
      console.log(err);
    },
  });
  const handleClickEnter = async () => {
    await createGreenCrewMember(greenCrew![selectedArea].crewId);
    queryClient.invalidateQueries(["greenCrew"]);
  };
  const convertDate = (startAt: Date) => {
    const date = new Date(startAt);
    const time = date.toLocaleDateString();
    const a = date.toLocaleTimeString();
    return (
      <StartAt>
        {time}
        {a}
      </StartAt>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setCount(cur => cur + 1);
    }, 1000);

    const startAt = new Date(greenCrew![selectedArea].startAt);
    const now = new Date(Date.now());
    const hours = startAt.getHours() - now.getHours();
    const minutes = startAt.getMinutes() - now.getMinutes();
    const seconds = startAt.getSeconds() - now.getSeconds();
    setTime(`${hours}시간 ${minutes}분 ${seconds}초`);
  }, [count]);
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
        <Title>{greenCrew![selectedArea]?.title!}</Title>
        <FirstContainer>
          <DescBox>
            <div>{time}</div>
            {convertDate(greenCrew![selectedArea]?.startAt!)}
            <CourseBox>
              <DetailTitle>
                <IconImg src={"assets/icon/greenCrew/course_icon.svg"} alt="#" />
                코스
              </DetailTitle>
              <DetailDescription>{greenCrew![selectedArea]!.course}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greenCrew/distance_icon.svg" alt="#" />
                거리
              </DetailTitle>
              <DetailDescription>{greenCrew![selectedArea]!.distance}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greenCrew/lead_time_icon.svg" alt="#" />
                소요시간
              </DetailTitle>
              <DetailDescription>{greenCrew![selectedArea]!.leadTime}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greenCrew/max_member_icon.svg" alt="#" />
                모집인원
              </DetailTitle>
              <DetailDescription>{greenCrew![selectedArea]!.maxMember}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greenCrew/level_icon.svg" alt="#" />
                난이도
              </DetailTitle>
              <DetailDescription>{greenCrew![selectedArea]!.level}</DetailDescription>
            </CourseBox>
          </DescBox>

          <GreenCrewMap greenCrew={greenCrew![selectedArea]!} />
        </FirstContainer>
        <SecondContainer>
          <Row>
            <Col>
              <div>현재까지 {greenCrew![selectedArea]?.curMember}명이 참여하고 있어요!</div>
            </Col>
            <EnterBtn onClick={handleClickEnter}>참여하기</EnterBtn>
          </Row>
          <ContentBox>
            <ContentTitle>
              <img src="/assets/icon/greenCrew/content_icon.svg" alt="" />
              <Accent>"{greenCrew![selectedArea]?.course}"</Accent>은?
            </ContentTitle>
            <ContentDescription dangerouslySetInnerHTML={{ __html: `${greenCrew![selectedArea]?.content}` }} />
          </ContentBox>
          <ContentBox>
            <ContentTitle>
              <img src="/assets/icon/greenCrew/traffic_info_icon.svg" alt="" />
              교통편
            </ContentTitle>
            <ContentDescription
              dangerouslySetInnerHTML={{
                __html: `${greenCrew![selectedArea]?.trafficInfo.replace("\\n", "").replace("\\r", "")}`,
              }}
            />
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
const StartAt = styled.div``;
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
const ContentDescription = styled(Desc)``;
const ReadyBtn = styled.button`
  position: absolute;
  bottom: 30px;
  right: 0px;
  width: 150px;
  height: 40px;
  background-color: ${props => props.theme.dangerColor};
`;
