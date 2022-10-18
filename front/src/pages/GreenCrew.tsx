import styled from "styled-components";
import { Wrapper, Container, Box, Title, Desc, SubTitle } from "@style/Layout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GreenCrewMap from "@components/greenCrew/GreenCrewMap";
import { useState, useEffect } from "react";
import { createGreenCrewMember, deleteGreenCrewMember, getGreenCrews } from "@api/greenCrew";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@atom/user";
import { getJSDocReturnTag } from "typescript";
import dayjs, { extend } from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export default function GreenCrew() {
  const [user, setUser] = useRecoilState(userAtom);
  const areas = ["강동", "강서", "강남", "강북"];
  const [selectedArea, setSelectedArea] = useState(0);
  const queryClient = useQueryClient();
  const [time, setTime] = useState<string>();
  const [isParticipate, setIsParticipate] = useState<boolean>();
  const [participateList, setParticipateList] = useState<string[]>();
  const { data: greenCrews } = useQuery<IGreenCrew[] | undefined>(["greenCrew"], getGreenCrews, {
    onSuccess(data) {
      console.log("GreenCrew Query성공", data);
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleClickEnter = async () => {
    console.log("handleclickenter", isParticipate);
    if (isParticipate) {
      // 참여상태
      if (window.confirm("정말 취소하시겠어요?")) {
        deleteGreenCrewMember(greenCrews![selectedArea].crewId);
        //setUser ????
        setIsParticipate(false);
      }
    } else {
      await createGreenCrewMember(greenCrews![selectedArea].crewId);
      queryClient.invalidateQueries(["greenCrew"]);
    }
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
  const DTime = (day: string) => {
    return (
      <Title style={{ fontSize: "40px" }}>
        <Desc as="span">남은시간 : </Desc> {day}
      </Title>
    );
  };

  function getTime() {
    let greenTime = dayjs(greenCrews![selectedArea].startAt); // 기준이 되는 시각
    let currentTime = dayjs(new Date());
    let diffTime = greenTime.unix() - currentTime.unix();
    let duration = dayjs.duration(diffTime * 1000, "milliseconds");
    setTime(duration.format("HH:mm:ss"));
  }

  useEffect(() => {
    //타이머 설정
    const timer = setInterval(getTime, 1000);

    //참여 유저
    setParticipateList(user?.greenCrews?.map(data => data.title));

    //타이머 reset
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log(participateList);
    setIsParticipate(participateList?.includes(greenCrews![selectedArea].title));
  }, [selectedArea, participateList]);

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
        <Title>{greenCrews![selectedArea]?.title!}</Title>
        <FirstContainer>
          <DescBox>
            {convertDate(greenCrews![selectedArea]?.startAt!)}
            <CourseBox>
              <DetailTitle>
                <IconImg src={"assets/icon/greencrew/course_icon.svg"} alt="#" />
                코스
              </DetailTitle>
              <DetailDescription>{greenCrews![selectedArea]!.course}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greencrew/distance_icon.svg" alt="#" />
                거리
              </DetailTitle>
              <DetailDescription>{greenCrews![selectedArea]!.distance}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greencrew/lead_time_icon.svg" alt="#" />
                소요시간
              </DetailTitle>
              <DetailDescription>{greenCrews![selectedArea]!.leadTime}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greencrew/max_member_icon.svg" alt="#" />
                모집인원
              </DetailTitle>
              <DetailDescription>{greenCrews![selectedArea]!.maxMember}</DetailDescription>
            </CourseBox>
            <CourseBox>
              <DetailTitle>
                <IconImg src="/assets/icon/greencrew/level_icon.svg" alt="#" />
                난이도
              </DetailTitle>
              <DetailDescription>{greenCrews![selectedArea]!.level}</DetailDescription>
            </CourseBox>
          </DescBox>

          <GreenCrewMap greenCrew={greenCrews![selectedArea]!} />
        </FirstContainer>
        <SecondContainer>
          <ContentBox>
            <Row>
              <Col>
                <StatusBox>
                  <div>{DTime(time!)}</div>
                  <Desc>
                    현재까지{" "}
                    <GreenAccent style={{ fontSize: "32px" }}>{greenCrews![selectedArea]?.curMember}명</GreenAccent>이
                    참여하고 있어요!
                  </Desc>
                </StatusBox>
              </Col>
              <Col>
                <EnterBtn onClick={handleClickEnter}>{isParticipate ? "취소" : "참여"}</EnterBtn>
              </Col>
            </Row>
          </ContentBox>
          <ContentBox>
            <ContentTitle>
              <img src="/assets/icon/greenCrew/content_icon.svg" alt="" />
              <Accent>"{greenCrews![selectedArea]?.course}"</Accent>은?
            </ContentTitle>
            <ContentDescription dangerouslySetInnerHTML={{ __html: `${greenCrews![selectedArea]?.content}` }} />
          </ContentBox>
          <ContentBox>
            <ContentTitle>
              <img src="/assets/icon/greenCrew/traffic_info_icon.svg" alt="" />
              <GreenAccent>교통편</GreenAccent>
            </ContentTitle>
            <ContentDescription
              dangerouslySetInnerHTML={{
                __html: `${greenCrews![selectedArea]?.trafficInfo}`,
              }}
            />
          </ContentBox>
        </SecondContainer>
        <Link to="/guide">
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
  overflow-y: auto;

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
