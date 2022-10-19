import styled from "styled-components";
import { Wrapper, Container, Box, Title, Desc, SubTitle } from "@style/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GreenCrewMap from "@components/greenCrew/GreenCrewMap";
import { useState, useEffect, startTransition } from "react";
import { createGreenCrewMember, deleteGreenCrewMember, getGreenCrews } from "@api/greenCrew";
import { IGreenCrew } from "@type/greenCrew";
import Moment from "react-moment";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
import { getUser } from "@api/user";
import { User, UserGreenCrew } from "@type/user";
import dayjs, { extend } from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function GreenCrew() {
  // Variable
  const areas = ["강동", "강서", "강남", "강북"];
  const [selectedArea, setSelectedArea] = useState(0);
  const queryClient = useQueryClient();
  const [time, setTime] = useState<string>();
  const [curMember, setCurMember] = useState(0);
  const [isParticipate, setIsParticipate] = useState<boolean>();
  const navigate = useNavigate();

  // Query
  const { data: greenCrews } = useQuery<IGreenCrew[] | undefined>(["greenCrew"], getGreenCrews, {
    onSuccess(data) {
      setCurMember(data![selectedArea].curMember);
      console.log("GreenCrew Query성공", data);
    },
    onError(err) {
      console.log(err);
    },
  });
  const { data: user } = useQuery<User | undefined>(["user"], getUser, {
    enabled: Boolean(sessionStorage.getItem("userToken")),
    onSuccess(data) {
      console.log("user query 작동", data);
    },
    onError(err) {
      console.log(err);
    },
  });

  // Mutation
  const userMutation = useMutation(getUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  const greenCrewMutation = useMutation(["greenCrew"], getGreenCrews, {
    onSuccess: () => {
      queryClient.invalidateQueries(["greenCrew"]);
    },
  });

  // Handle
  const handleClickEnter = async () => {
    setCurMember(cur => cur + 1);
    setIsParticipate(true);
    console.log("handleclickenter", isParticipate);
    await createGreenCrewMember(greenCrews![selectedArea].crewId);
    greenCrewMutation.mutate();
    userMutation.mutate();
  };
  const handleClickDelete = async () => {
    setCurMember(cur => cur - 1);
    console.log("handleClickDelete", isParticipate);
    if (window.confirm("정말 취소하시겠어요?")) {
      setIsParticipate(false);
      await deleteGreenCrewMember(greenCrews![selectedArea].crewId);
      greenCrewMutation.mutate();
      userMutation.mutate();
      setIsParticipate(false);
    }
  };

  const searchCrew = (userGreenCrew: UserGreenCrew[], greenCrew: IGreenCrew) => {
    const isParticipated = Boolean(userGreenCrew.find(userGreenCrew => userGreenCrew.crewId === greenCrew.crewId));
    console.log("=======================================", isParticipated);
    setIsParticipate(isParticipated);
  };
  const convertDate = (startAt: Date) => {
    const day = dayjs(new Date(startAt));
    const startTime = day.format("A HH:mm");

    return startTime;
  };
  const DTime = (day: string) => {
    return (
      <TimeDesc>
        <Desc as="span">남은시간 : </Desc> {day}
      </TimeDesc>
    );
  };

  function getTime() {
    const greenTime = dayjs(greenCrews![selectedArea].startAt); // 기준이 되는 시각
    const currentTime = dayjs(new Date());
    const diffTime = greenTime.unix() - currentTime.unix();
    const duration = dayjs.duration(diffTime * 1000, "milliseconds");
    setTime(duration.format("HH:mm:ss"));
  }

  // 타이머
  useEffect(() => {
    //타이머 설정
    let timer = setInterval(getTime, 1000);

    //타이머 reset
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCurMember(greenCrews![selectedArea].curMember);
    if (user) {
      searchCrew(user?.greenCrews!, greenCrews![selectedArea]);
    }
  }, [greenCrews, selectedArea]);
  return (
    <GreenCrewWrapper>
      <AreaNav>
        {[0, 1, 2, 3].map((area, idx) => (
          <AreaBtn className={selectedArea === area ? "active" : "normal"} onClick={() => setSelectedArea(area)}>
            {areas[area]}
          </AreaBtn>
        ))}

        <AreaBtn style={{ backgroundColor: "#E17055" }} onClick={() => navigate("/guide")}>
          풀빛마실 준비방법
        </AreaBtn>
      </AreaNav>
      <RootContainer>
        <CrewTitle>{greenCrews![selectedArea]?.title!}</CrewTitle>
        <NumDesc>
          현재 <GreenAccent>{curMember}명</GreenAccent>이 참여중!
        </NumDesc>
        <TopBox>
          <InfoBox>
            <DescBox>
              <CourseBox>
                <DetailTitle>
                  <IconImg src={"assets/icon/greencrew/course_icon.svg"} alt="#" />
                  일시 :
                </DetailTitle>
                <DetailDescription>{convertDate(greenCrews![selectedArea]?.startAt!)}</DetailDescription>
              </CourseBox>

              <CourseBox>
                <DetailTitle>
                  <IconImg src={"assets/icon/greencrew/course_icon.svg"} alt="#" />
                  코스 :
                </DetailTitle>
                <DetailDescription>{greenCrews![selectedArea]!.course}</DetailDescription>
              </CourseBox>
              <CourseBox>
                <DetailTitle>
                  <IconImg src="/assets/icon/greencrew/distance_icon.svg" alt="#" />
                  거리 :
                </DetailTitle>
                <DetailDescription>{greenCrews![selectedArea]!.distance}</DetailDescription>
              </CourseBox>
              <CourseBox>
                <DetailTitle>
                  <IconImg src="/assets/icon/greencrew/lead_time_icon.svg" alt="#" />
                  소요시간 :
                </DetailTitle>
                <DetailDescription>{greenCrews![selectedArea]!.leadTime}</DetailDescription>
              </CourseBox>
              <CourseBox>
                <DetailTitle>
                  <IconImg src="/assets/icon/greencrew/max_member_icon.svg" alt="#" />
                  모집인원 :
                </DetailTitle>
                <DetailDescription>{greenCrews![selectedArea]!.maxMember + "명"}</DetailDescription>
              </CourseBox>
              <CourseBox>
                <DetailTitle>
                  <IconImg src="/assets/icon/greencrew/level_icon.svg" alt="#" />
                  난이도 :
                </DetailTitle>
                <DetailDescription>{"Level " + greenCrews![selectedArea]!.level}</DetailDescription>
              </CourseBox>
            </DescBox>
          </InfoBox>
          <GreenCrewMap greenCrew={greenCrews![selectedArea]!} />
        </TopBox>
        <SecondBox>
          <TimeBox className="time">
            <Row style={{ marginLeft: "auto" }}>
              <StatusBox>{DTime(time!)}</StatusBox>

              {!isParticipate ? (
                <EnterBtn onClick={handleClickEnter}>참여하기</EnterBtn>
              ) : (
                <DeleteBtn onClick={handleClickDelete}>취소하기</DeleteBtn>
              )}
            </Row>
          </TimeBox>
          <ContentBox>
            <ContentTitle>
              <img src="/assets/icon/greenCrew/content_icon.svg" alt="" />
              <GreenAccent style={{ fontSize: "18px" }}>"{greenCrews![selectedArea]?.course}"</GreenAccent>은?
            </ContentTitle>
            <ContentDescription dangerouslySetInnerHTML={{ __html: `${greenCrews![selectedArea]?.content}` }} />
          </ContentBox>
          <ContentBox>
            <ContentTitle>
              <img src="/assets/icon/greenCrew/traffic_info_icon.svg" alt="" />
              <GreenAccent style={{ fontSize: "18px" }}>교통편</GreenAccent>
            </ContentTitle>
            <ContentDescription
              dangerouslySetInnerHTML={{
                __html: `${greenCrews![selectedArea]?.trafficInfo}`,
              }}
            />
          </ContentBox>
        </SecondBox>
      </RootContainer>
    </GreenCrewWrapper>
  );
}
const GreenCrewWrapper = styled(Wrapper)`
  background-image: url(${process.env.PUBLIC_URL}/assets/images/register_img.jpg);
  background-attachment: fixed;
  overflow: scroll;
  height: auto;
  position: relative;
`;
const AreaNav = styled(Box)`
  position: fixed;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
  height: 360px;
  justify-content: space-between;
  margin-top: 100px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    left: 0px;
    top: 0px;
    transform: translateY(0);
    height: 60px;
    margin-top: 65px;
    z-index: 1000;
  }
`;
const StatusBox = styled(Box)`
  flex-direction: column;
  width: 50%;
  height: 100%;
`;
const StartDate = styled(Desc)`
  font-family: "SebangBold";
  margin-bottom: 10px;
`;
const CrewTitle = styled(Title)`
  color: ${props => props.theme.accentColor};
  @media screen and (max-width: 768px) {
    margin-top: 30px;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 30px;
  }
`;

const TimeDesc = styled(Title)`
  color: ${props => props.theme.accentColor};
`;

const NumDesc = styled(Desc)`
  align-self: end;
  margin-right: 20px;
`;
const AreaBtn = styled.button`
  width: 150px;
  height: 60px;
  font-size: 18px;
  &.active {
    background-color: ${props => props.theme.mainColor};
  }
  &.normal {
    background-color: ${props => props.theme.weekColor};
  }
  &:hover {
    background-color: ${props => props.theme.mainColor};
  }

  @media screen and (max-width: 768px) {
    width: 25%;
    height: 50px;
    font-size: 14px;
  }
  @media screen and (max-width: 1024px) {
    width: 25%;
    height: 55px;
    font-size: 14px;
  }
`;
const RootContainer = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
  width: 700px;
  height: 100%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (min-width: 1024px) {
  }
`;
const TopBox = styled(Box)`
  @media screen and (max-width: 768px) {
    width: 90%;
    flex-direction: column-reverse;
  }
`;
const InfoBox = styled(Box)`
  width: 310px;
  height: 340px;
  margin-right: 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }
`;
const SecondBox = styled(Box)`
  flex-direction: column;
`;
const Row = styled(Box)`
  width: 100%;
  @media screen and (max-width: 768px) {
    /* flex-direction: column; */
  }
`;
const DescBox = styled(Box)`
  background-color: white;
  flex-direction: column;
  width: 320px;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const IconImg = styled.img`
  margin-right: 10px;
`;
const CourseBox = styled(Box)`
  width: 100%;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 5px;
`;

const EnterBtn = styled.button`
  width: 50%;
  min-width: 130px;
  height: 50px;
  max-height: 70px;
  font-size: 28px;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    width: 150px;
    height: 40px;
    font-size: 18px;
  }
`;
const DeleteBtn = styled(EnterBtn)`
  background-color: ${props => props.theme.dangerColor};
  &:hover {
    background-color: ${props => props.theme.accentDangerColor};
  }
`;
const StartAt = styled.div``;
const DetailTitle = styled(Desc)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DetailDescription = styled(SubTitle)`
  color: ${props => props.theme.accentColor};
  font-weight: bold;
  justify-self: flex-end;
`;

const TimeBox = styled(Box)`
  width: 100%;
  height: 100px;
`;
const ContentBox = styled(Box)`
  width: 670px;
  overflow-y: scroll;
  height: auto;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
const ContentTitle = styled(Box)`
  margin-bottom: 10px;
`;

const ContentDescription = styled(Desc)`
  overflow-y: auto;
  width: 100%;
  padding: 10px;
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
