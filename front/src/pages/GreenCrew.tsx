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
import { Node } from "react-markdown/lib/rehype-filter";
import { GreenAccent } from "./../style/Layout";
import { timeEnd, timeLog } from "console";
export default function GreenCrew() {
  const areas = ["강동", "강서", "강남", "강북"];
  const [selectedArea, setSelectedArea] = useState(0);
  const queryClient = useQueryClient();
  const [count, setCount] = useState(0);
  const [time, setTime] = useState<number[]>([]);
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
    const newDate = date.toLocaleDateString();
    const time = date.toLocaleTimeString();
    return (
      <StartAt>
        <StartDate>{newDate.slice(0, newDate.length - 1)}</StartDate>
        <StartTime>
          <Desc as="span">시작시간 : </Desc>
          {time}
        </StartTime>
      </StartAt>
    );
  };
  const DTime = (arr: number[]) => {
    const [hours, minutes, seconds] = arr;
    // const hours = Math.abs(hours < 10 ? `0${hours}` : hours)

    return (
      <Title style={{ fontSize: "40px" }}>
        <Desc as="span">남은시간 : </Desc>{" "}
        {`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
      </Title>
    );
  };

  function getTime() {
    const setDate = new Date(greenCrew![selectedArea].startAt); // 기준이 되는 시각
    const now = new Date();
    const distance = now.getTime() - setDate.getTime();
    const hours = Math.abs(Math.floor((distance / (1000 * 60 * 60)) % 24));
    const minutes = Math.abs(Math.floor((distance / (1000 * 60)) % 60));
    const seconds = Math.abs(Math.floor((distance / 1000) % 60));

    setTime([hours, minutes, seconds]);
  }

  function init() {
    setInterval(getTime, 1000);
  }

  useEffect(() => {
    setTime([0, 0, 0]);
    init();
  }, []);

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
          <ContentBox>
            <Row>
              <Col>
                <StatusBox>
                  <div>{DTime(time)}</div>
                  <Desc>
                    현재까지{" "}
                    <GreenAccent style={{ fontSize: "32px" }}>{greenCrew![selectedArea]?.curMember}명</GreenAccent>이
                    참여하고 있어요!
                  </Desc>
                </StatusBox>
              </Col>
              <Col>
                <EnterBtn onClick={handleClickEnter}>참여하기</EnterBtn>
              </Col>
            </Row>
          </ContentBox>
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
              <GreenAccent>교통편</GreenAccent>
            </ContentTitle>
            <ContentDescription
              dangerouslySetInnerHTML={{
                __html: `${greenCrew![selectedArea]?.trafficInfo}`,
              }}
            />
          </ContentBox>
        </SecondContainer>
        <Link to="/">
          <ReadyBtn>풀빛마실 준비하는 법</ReadyBtn>
        </Link>
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
const StatusBox = styled(Box)`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100px;
  margin: 20px 0px;
`;
const StartDate = styled(Desc)`
  font-family: "SebangBold";
  margin-bottom: 10px;
`;
const StartTime = styled(Title)`
  color: ${props => props.theme.textColor};
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
  margin-top: 30px;
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
const Col = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
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
  width: 100%;
  height: 33.3%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const ContentTitle = styled(Box)``;
const Accent = styled.h3`
  font-family: "SebangBold";
  font-size: 18px;
  color: ${props => props.theme.mainColor};
`;
const ContentDescription = styled(Desc)`
  overflow: scroll;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  border: solid 1px #f1f1f1;
`;
const ReadyBtn = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 150px;
  height: 40px;
  background-color: ${props => props.theme.dangerColor};
`;
